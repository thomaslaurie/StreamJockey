import database from './database.js';
import propagate from '../../shared/propagate.js';
import {InvalidStateError} from '../../shared/errors/index.js';

export default async () => database.tx(async (t) => {
	//TODO This will not alter tables if they do already exist (save this for migration).

	//L schema: https://www.postgresql.org/docs/9.3/static/sql-createschema.html
	//L constraints: https://www.postgresql.org/docs/9.4/static/ddl-constraints.html
	// foreign keys - REFERENCES otherTable (column) *if the column is omitted then the primary key of the referenced table is used
	// ON DELETE CASCADE also removes any referencing rows when the referenced row is removed
	//TODO CHECK constraint that visibility, source matches possible  states
	//L quotes: https://stackoverflow.com/questions/41396195/what-is-the-difference-between-single-quotes-and-double-quotes-in-postgresql
	//L default constraint names: https://stackoverflow.com/questions/4107915/postgresql-default-constraint-names

	/* //! Resets the database.
		await t.none(`DROP SCHEMA IF EXISTS "sj" CASCADE`).catch((rejected) => {
			throw new InvalidStateError({
				userMessage: 'database error',
				message: rejected.message,
				state: rejected,
			});
		});
	*/

	// SCHEMA
	//TODO add self, public, & private VIEWs for tables (if relevant).
	//! Remember to add error messages for constraint violations to parsePostgresError() in functions.js
	//! Column names are camelCase (because they get converted to properties), everything else is underscore.
	await t.none(`CREATE SCHEMA IF NOT EXISTS "sj"`);

	// USERS
	//L https://www.postgresql.org/docs/9.1/static/sql-createtable.html
	//! spotifyRefreshToken is specifically pascal case to match object property names
	await t.none(`
		CREATE TABLE IF NOT EXISTS "sj"."users" (
			"id" SERIAL CONSTRAINT "users_id_pkey" PRIMARY KEY,
			"name" text CONSTRAINT "users_name_key" UNIQUE,
			"password" text,
			"email" text CONSTRAINT "users_email_key" UNIQUE,
			"spotifyRefreshToken" text
		);
	`);
	//L views: https://www.postgresql.org/docs/8.1/static/tutorial-views.html
	//L create or replace: https://stackoverflow.com/questions/48662843/what-is-the-equivalent-of-create-view-if-not-exists-in-postresql
	await t.none(`
		CREATE OR REPLACE VIEW "sj"."users_self" AS
			SELECT id, name, email 
			FROM "sj"."users"
		;
	`);
	await t.none(`
		CREATE OR REPLACE VIEW "sj"."users_public" AS
			SELECT id, name
			FROM "sj"."users"
		;
	`);

	// PLAYLISTS
	await t.none(`
		CREATE TABLE IF NOT EXISTS "sj"."playlists" (
			"id" SERIAL CONSTRAINT "playlists_id_pkey" PRIMARY KEY,
			"userId" integer CONSTRAINT "playlists_userId_fkey" REFERENCES "sj"."users" ON DELETE CASCADE ON UPDATE CASCADE,
			"name" text,
			"visibility" text,
			"description" text,
			"image" text,
			"color" text,
			
			CONSTRAINT "playlists_userId_name_key" UNIQUE ("userId", "name")
		);
	`);

	// TRACKS
	await t.none(`
		CREATE TABLE IF NOT EXISTS "sj"."tracks" (
			"id" SERIAL CONSTRAINT "tracks_id_pkey" PRIMARY KEY,
			"playlistId" integer CONSTRAINT "tracks_playlistId_fkey" REFERENCES "sj"."playlists" ON DELETE CASCADE ON UPDATE CASCADE,
			"position" integer,
			"source" text,
			"sourceId" text,
			"name" text,
			"duration" integer,
			"artists" text ARRAY DEFAULT ARRAY[]::text[],

			CONSTRAINT "tracks_playlistId_position_key" UNIQUE ("playlistId", "position") DEFERRABLE INITIALLY IMMEDIATE 
		);
	`);
}).catch((rejected) => {
	throw new InvalidStateError({
		userMessage: 'database error',
		message: rejected.message,
		state: rejected,
	});
}).catch(propagate);

//TODO Should a better error be used than InvalidStateError?
//TODO Is propagate required here?
