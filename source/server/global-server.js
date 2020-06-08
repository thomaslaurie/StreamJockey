// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //G CRUD MAP
    Create = add
    Retrieve = get
    Update = edit
    Delete = remove

    //R CRUD DATA FORMAT
		get functions will be allowed to get multiple resources (just a simple query based on matches), for example getting a playlist with only userId will get all playlists by that user
		
		there is some confusion about what is 'known' information - because playlists hold data on the tracks they contain, but users don't hold data on the playlists they have. get needs the ability for multiple matches because it is not 'known' by the client what it contains (playlist is only able to do this because the multiple query is done manually server-side when getting the original playlist, this is not done for user)
	
		two directions - either make user retrieve all of it's containing playlists (lots of data being passed around here, no way to do a different query for playlists or tracks separated from user), or allow multiple querying (creates a difference between get and the other CRUD methods (add, edit, and remove could be done in multiple but these are all methods where the client 'knows' the exact resource they're manipulating and can be done iteratively on the client-side)
	
		maybe make all CRUD methods multiply possible (for admin stuff? remove all tracks in a playlist (at once) without doing them iteratively client-side), all of these would have to fail if any one part fails (using that postgres thing (transaction commit?))

		all CRUD will return an array of any number of rows

		GET should be the only method used for search/query. EDIT & DELETE (& ADD) should not, therefore, editing or deleting a resource should only be done when it's id is known (after probably GETing it), (this clears up confusion: say we want to edit a track where its property is x, this is done in the GET method, but here is an issue when determining what data is the replacement data and what data is the query data - therefore only the id should be used as the query data (because it cant be changed), an the rest is the replacement data)

		because of this it becomes: get | add, edit, remove   or   get, remove | add, edit    (because it could make sense for remove to query too because it doesn't have replacement data, but not add because it doesn't need a query), it comes down to consistency, get could take a single object, add, edit, remove, could take an array of objects (and return single success/failure?), what about get taking an array and returning an array
		
		//L multiple resources with one request: https://stackoverflow.com/questions/32098423/rest-updating-multiple-resources-with-one-request-is-it-standard-or-to-be-avo


	//R ErrList
		ErrorList should not be a wrapper for a list of errors, ErrorList should be a version of a single error that has multiple 'parallel' parts (ie: adding a user and having an issue with multiple fields - its still a single error with one resource (a user) but there are multiple parts to the error that need to be evaluated in parallel not in sequence)
		
		would this not mean that requests are also evaluated in parallel? that response arrays should all have Success or ErrorList wrappers?, wouldn't this be redundant - if everything is already an array why have a wrapper for it? what would be the default wrapper for request data like editTracks([{}, {}, ...]) ?

	//G JAVASCRIPT GUIDELINES
		when returning a promise / async function, use return await Promise()
		//L https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
		//L https://www.reddit.com/r/javascript/comments/7idasp/await_vs_return_vs_return_await/ 
		
		//L proper use of array methods: https://medium.com/front-end-weekly/stop-array-foreach-and-start-using-filter-map-some-reduce-functions-298b4dabfa09
	
	//R CLASS NAMESPACES
		I started using Object.assign() to supplement sj.Entity (and other classes) for server-specific functionality, however it was limiting me to shallow assignment - which required a bunch of functions to have prefixes (addPrepare, getPrepare, etc.), and I really wanted to avoid calling these functions like: this[`${method}Prepare`](), I wanted functional assignment much like class constructors, so I decided to switch to using  (function () {}).call()  which acts kind of reverse to how its used as 'super' in function classes, basically calling another constructor(?) later
		
		two ways to implement: namespace within the class - this requires those namespaced functions to be called via this.namespace.fn.call(this, ...), or just prefix the functions which requires them to be called via this[`${namespace}Fn`](...), still not sure which is better
		
		actually - don't do that namespace thing, as the namespace is still a reference to an object, so if a child class changes one of its properties, it changes it for all classes with that same namespace

	//G FUNCTION MODIFICATION VS RETURN NEW
		modifying & returning passed objects in functions, in general I'm deciding to modify passed objects in functions and return the same reference, however when the data-structure changes (nesting, cloning, etc.), the passed object should not be modified. this can be seen in sj.Entity.common() validation, where any nested validated properties are flattened into a root object
*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝  

/*
	// PRODUCTION
		tree-shake any objects that don't need to be exported (remove from sj.x, just hae them locally defined)
		after functions are mostly debugged - remove a lot of the .catch(propagate) - this is mainly tracing and unhandled error

	// BEST PRACTICE
		//L best practices: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
		//L review common pg-promise mistakes: https://github.com/vitaly-t/pg-promise/wiki/Common-Mistakes#invalid-query-formatting-with-manual-string-concatenation-and-es6-template-strings

	// SECURITY

		issue for private query variables (eg password), if someone queries for users where password = x, the passwords wont be returned, but they will still receive a list of users that that query matches

		//? user id being in the session.user object is basically the user's access key -> how do I ensure this is secure too? (aside from using a secure connection), it has to do with koa-session and how the session keys work - figure this out - I think this info is never sent to the client, just stored in the server and accessed via cookie key
		
		permissions: [admin, self, password, link, public, etc.]

		track names that don't fit the requirements (too short, too long, etc. will throw an error when trying to add, this isn't desirable because all the track names will be external) should use casting if those restrictions are necesary

	// CONSIDER
    	delegating unexpected error catches to only top-level entry points, (so that catchUnexpected() doesn't have to be repeated for every single 

	// GENERAL
		//! IMPORTANT //! check any CRUD functions (like addTrack()) that rely on the current state of the database for information - because asyncMap() functions are executed in parallel, and not in series, this could cause collisions
		replace all database variables, column names, etc. with constants inside this file (or the db file)
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝ 

// BUILT-IN

// EXTERNAL
// import fetch from 'node-fetch'; //C global.js uses fetch
import bcrypt from 'bcryptjs';

// INTERNAL
import {
	pick,
	stableSort,
	asyncMap,
	any,
	rules,
} from '../shared/utility/index.js';
import database, {pgp} from './db.js';
import liveData from './live-data-server.js';
import { 
	ErrorList, 
	Err,
} from '../shared/legacy-classes/error.js';
import {
	Success,
	SuccessList,
} from '../shared/legacy-classes/success.js';
import Rule1 from '../shared/legacy-classes/rule1.js';
import Source from '../shared/source.js';
import {
	Entity,
	User,
	Playlist,
	Track,
} from '../shared/entities/index.js';
import propagate from '../shared/propagate.js';
import parsePostgresError from './parse-postgres-error.js';
import {
	buildValues,
	buildWhere,
	buildSet,
} from './database/sql-builders.js';
import {
	PASSWORD_SALT_ROUNDS,
} from './constants.js';
import isEmpty from './legacy/is-empty.js';

const sj = {};


//  ██╗   ██╗████████╗██╗██╗     
//  ██║   ██║╚══██╔══╝██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝ 

// POSTGRES
//? this should be called once on startup, where should this go?
(async () => {
	/*
		const schema = {
			name: 'sj',
			tables: {
				users: {
					name: 'users',
					columns: {
						id: {
							name: 'id',
						},
						name: {
							name: 'name',
						},
						password: {
							name: 'password',
						},
						email: {
							name: 'email',
						},
						spotifyRefreshToken: {
							name: 'spotifyRefreshToken',
						},
					},
				},
			},
		};
	*/

    // initialize
    return database.tx(async function (t) {
        // TODO this will not alter tables if they do already exist (save this for migration)
        
        // schema: https://www.postgresql.org/docs/9.3/static/sql-createschema.html
        // constraints: https://www.postgresql.org/docs/9.4/static/ddl-constraints.html
        // foreign keys - REFERENCES otherTable (column) *if the column is omitted then the primary key of the referenced table is used
        // ON DELETE CASCADE also removes any referencing rows when the referenced row is removed
        // TODO CHECK constraint that visibility, source matches possible  states
        // quotes: https://stackoverflow.com/questions/41396195/what-is-the-difference-between-single-quotes-and-double-quotes-in-postgresql
        
        // default constraint names: https://stackoverflow.com/questions/4107915/postgresql-default-constraint-names

        if (false) {
            await t.none(`DROP SCHEMA IF EXISTS "sj" CASCADE`).catch(rejected => {
                throw new Err({
                    log: true,
                    origin: 'schema initialization',
                    message: 'database error',
                    reason: rejected.message,
                    content: rejected,
                    target: 'notify',
                    cssClass: 'notifyError',
                });
            });
        }

        // TODO add self, public, & private VIEWs for tables (if relevant)
        // !!!  remember to add error messages for constraint violations to parsePostgresError() in functions.js
        // !!! column names are camelCase (because they get converted to properties), everything else is underscore
        return t.none(`CREATE SCHEMA IF NOT EXISTS "sj"`).catch(rejected => {
            throw new Err({
                log: true,
                origin: 'schema initialization',
                message: 'database error',
                reason: rejected.message,
                content: rejected,
                target: 'notify',
                cssClass: 'notifyError',
            });
        }).then(resolved => {
			// https://www.postgresql.org/docs/9.1/static/sql-createtable.html
			//! spotifyRefreshToken is specifically pascal case to match object property names
            return t.none(`CREATE TABLE IF NOT EXISTS "sj"."users" (
				"id" SERIAL CONSTRAINT "users_id_pkey" PRIMARY KEY,
                "name" text CONSTRAINT "users_name_key" UNIQUE,
                "password" text,
				"email" text CONSTRAINT "users_email_key" UNIQUE,
				"spotifyRefreshToken" text
            );`).catch(rejected => {
                throw new Err({
                    log: true,
                    origin: 'users table initialization',
                    message: 'database error',
                    reason: rejected.message,
                    content: rejected,
                    target: 'notify',
                    cssClass: 'notifyError',
                });
            });
        }).then(resolved => {
            //L views: https://www.postgresql.org/docs/8.1/static/tutorial-views.html
            //L create or replace: https://stackoverflow.com/questions/48662843/what-is-the-equivalent-of-create-view-if-not-exists-in-postresql
            return t.none(`CREATE OR REPLACE VIEW "sj"."users_self" AS
                SELECT id, name, email 
                FROM "sj"."users"
            ;`).catch(rejected => {
                throw new Err({
                    log: true,
                    origin: 'users_self initialization',
                    message: 'database error',
                    reason: rejected.message,
                    content: rejected,
                    target: 'notify',
                    cssClass: 'notifyError',
                });
            });
        }).then(resolved => {
            return t.none(`CREATE OR REPLACE VIEW "sj"."users_public" AS
                SELECT id, name
                FROM "sj"."users"
            ;`).catch(rejected => {
                throw new Err({
                    log: true,
                    origin: 'users_public initialization',
                    message: 'database error',
                    reason: rejected.message,
                    content: rejected,
                    target: 'notify',
                    cssClass: 'notifyError',
                });
            });
        }).then(resolved => {
            return t.none(`CREATE TABLE IF NOT EXISTS "sj"."playlists" (
                "id" SERIAL CONSTRAINT "playlists_id_pkey" PRIMARY KEY,
                "userId" integer CONSTRAINT "playlists_userId_fkey" REFERENCES "sj"."users" ON DELETE CASCADE ON UPDATE CASCADE,
                "name" text,
                "visibility" text,
                "description" text,
                "image" text,
                "color" text,
                
                CONSTRAINT "playlists_userId_name_key" UNIQUE ("userId", "name")
            );`).catch(rejected => {
                throw new Err({
                    log: true,
                    origin: 'playlists table initialization',
                    message: 'database error',
                    reason: rejected.message,
                    content: rejected,
                    target: 'notify',
                    cssClass: 'notifyError',
                });
            });
        }).then(resolved => {
            return t.none(`CREATE TABLE IF NOT EXISTS "sj"."tracks" (
                "id" SERIAL CONSTRAINT "tracks_id_pkey" PRIMARY KEY,
                "playlistId" integer CONSTRAINT "tracks_playlistId_fkey" REFERENCES "sj"."playlists" ON DELETE CASCADE ON UPDATE CASCADE,
                "position" integer,
                "source" text,
                "sourceId" text,
                "name" text,
                "duration" integer,
                "artists" text ARRAY DEFAULT ARRAY[]::text[],

                CONSTRAINT "tracks_playlistId_position_key" UNIQUE ("playlistId", "position") DEFERRABLE INITIALLY IMMEDIATE 
            );`).catch(rejected => {
                throw new Err({
                    log: true,
                    origin: 'tracks table initialization',
                    message: 'database error',
                    reason: rejected.message,
                    content: rejected,
                    target: 'notify',
                    cssClass: 'notifyError',
                });
            });
        }).catch(rejected => {
            throw propagate(rejected);
        });
    }).catch(rejected => {
        throw propagate(rejected);
    });
})().then(resolved => {
    new Success({
        origin: 'initialize database',
        message: 'database initialized',
    });
}).catch(rejected => {
    console.log(rejected);
});


//   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝ 

Entity.augmentClass({
	prototypeProperties: parent => ({
		async add(db) {
			return await this.constructor.add(this, db);
		},
		async get(db) {
			return await this.constructor.get(this, db);
		},
		async edit(db) {
			return await this.constructor.edit(this, db);
		},
		async remove(db) {
			return await this.constructor.remove(this, db);
		},
	}),
	staticProperties(parent) {
		// CRUD METHODS
		this.add = async function (query, db = database) {
			return await this.frame(db, query, 'add');
		};
		this.get = async function (query, db = database) {
			return await this.frame(db, query, 'get');
		};
		this.edit = async function (query, db = database) {
			return await this.frame(db, query, 'edit');
		};
		this.remove = async function (query, db = database) {
			return await this.frame(db, query, 'remove');
		};
		this.getMimic = async function (query, db = database) {
			//C getMimic runs a query through the main database function to be formatted the exact same as any result from a get query, the difference is that it doesn't execute any SQL and returns the data that would be set off in liveData.notify()
			return await this.frame(db, query, 'getMimic');
		};


		// FRAME
		this.frame = async function (db, anyEntities, methodName) {
			//C catch Entity
			if (this === Entity) throw new Err({
				origin: 'Entity.[CRUD]',
				reason: `cannot call CRUD method directly on Entity`,
			});

			//C cast as array
			const entities = any(anyEntities);

			//C shorthand
			const isGetMimic = methodName === 'getMimic'; //C store getMimic
			if (isGetMimic) methodName = 'get'; //C 'getMimic' === 'get' for functions: [methodName+'Function']
			const isGet = methodName === 'get';

			const accessory = {};
			

			const after = await db.tx(async t => {
				//C process
				const beforeEntities = await this[methodName+'Before'](t, entities, accessory);

				//C validate
				const validatedEntities = await asyncMap(beforeEntities, async entity => await this.validate(entity, methodName).catch(propagate));

				//C prepare
				const preparedEntities = await asyncMap(validatedEntities, async entity => await this[methodName+'Prepare'](t, entity, accessory).catch(propagate));

				//C accommodate
				const influencedEntities = !isGet ? await this[methodName+'Accommodate'](t, preparedEntities, accessory).catch(propagate) : [];

				//C map
				const inputMapped = this.mapColumns(preparedEntities);
				const influencedMapped = !isGet ? this.mapColumns(influencedEntities) : [];


				//C execute SQL for inputs
				const inputBefore = [];
				const inputAfter = isGetMimic ? inputMapped : [];
				if (!isGetMimic) {
					await asyncMap(inputMapped, async entity => {
						//C before, ignore add
						if (!isGet && methodName !== 'add') {
							const before = await this.getQuery(t, pick(entity, this.filters.id)).then(any).catch(propagate)
							inputBefore.push(...before);
						}

						//C after, ignore remove (still needs to execute though)
						const after = await this[methodName+'Query'](t, entity).then(any).catch(propagate);
						if (methodName !== 'remove') inputAfter.push(...after);
					}).catch(rejected => {
						throw propagate(new ErrorList({
							...this[methodName+'Error'](),
							content: rejected,
						}));
					});
				}

				//C execute SQL for influenced
				const influencedBefore = [];
				const influencedAfter = [];
				if (!isGet) {
					await asyncMap(influencedMapped, async influencedEntity => {
						const before = await this.getQuery(t, pick(influencedEntity, this.filters.id)).then(any).catch(propagate);
						influencedBefore.push(...before);

						const after = await this.editQuery(t, influencedEntity).then(any).catch(propagate);
						influencedAfter.push(...after);
					}).catch(rejected => {
						throw propagate(new ErrorList({
							...this[methodName+'Error'](),
							content: rejected,
						}));
					});
				}


				//C group for iteration
				const all = [inputBefore, inputAfter, influencedBefore, influencedAfter];

				//C unmap
				const unmapped = all.map(list => this.unmapColumns(list));

				//C process
				return await asyncMap(unmapped, async list => await this[methodName+'After'](t, list, accessory).catch(propagate));
			}).catch(propagate); //! finish the transaction here so that notify won't be called before the database has updated

			//C shake for subscriptions with getOut filter
			const shookGet = after.map(list => any(list).map((item) => pick(item, this.filters.getOut)));

			//C timestamp, used for ignoring duplicate notifications in the case of before and after edits, and overlapping queries
			const timestamp = Date.now();

			//C if get, don't notify
			if (!isGet) shookGet.forEach(list => liveData.notify(this, list, timestamp, methodName));
			//C if getMimic, return shookGet-after
			else if (isGetMimic) return shookGet[1]; 

			//C shake for return
			const shook = after.map(list => any(list).map((item) => pick(item, this.filters[methodName+'Out'])));

			//C rebuild
			const built = shook.map(list => list.map(entity => new this(entity)));

			return new SuccessList({
				...this[methodName+'Success'](),
				//R content is the inputAfter, for removals this will be an empty array, if in the future some 'undo' functionality is needed consider: returned data should still be filtered by removeOut, and therefore might destroy data if this returned data is used to restore it
				content: built[1], 
				timestamp,
			});
		};


		// FRAME PARTS
		//G all of these parts are dependant on each other (eg. accessory), so it is ok to make assumptions between these functions

		//C processes all before validation
		this.addBefore = 
		this.getBefore = 
		this.editBefore = 
		this.removeBefore = async function (t, entities, accessory) {
			return entities.slice();
		};

		//C validates each using Entity.schema
		this.validate = async function (entity, methodName) {
			const validated = {};
			await asyncMap(Object.keys(this.schema), async key => {
				const prop = this.schema[key];

				//C catches
				if (!(prop.rule instanceof Rule1)) { // Rule1
					throw new Err({
						log: true,
						origin: 'Entity.validate()',
						message: 'validation error',
						reason: `${key}'s rule is not an Rule1`,
						content: prop,
					});
				}

				//C check if optional and not empty, or if required
				if ((prop[methodName].check && !isEmpty(entity[key])) || prop[methodName].check === 2) {
					//G the against property can be specified in the schema and then assigned to the entity[againstName] before validation
					const checked = await prop.rule.check(entity[key], entity[prop.against]);
					validated[key] = checked.content;
					return checked;
				} else {
					//C don't pack into validated
					return new Success({
						origin: 'Entity.validate()',
						message: `optional ${key} is empty, skipped validation`,
					});
				}
			}).catch(rejected => {
				throw new ErrorList({
					origin: 'Entity.validate()',
					message: 'one or more issues with properties',
					reason: 'validating properties returned one or more errors',
					content: rejected,
				});
			});

			return validated;
		};

		//C modifies each after validation
		this.addPrepare =
		this.getPrepare =
		this.editPrepare = 
		this.removePrepare = async function (t, entity, accessory) {
			return Object.assign({}, entity);
		}

		//C modifies input entities, returns other influenced entities. checks validated entities against each other and the database to avoid property collisions, calculates the changes required to accommodate the input entities
		this.addAccommodate =
		this.getAccommodate =
		this.editAccommodate =
		this.removeAccommodate = async function (t, entities, accessory) {
			return [];
		};

		//C maps js property names to database column names
		this.mapColumns = function (entities) {
			//C switches entities' js named keys for column named keys based on schema
			return entities.map(entity => { //C for each entity
				let mappedEntity = {};
				Object.keys(entity).forEach(key => { //C for each property
					if (rules.object.test(this.schema[key]) && rules.string.test(this.schema[key].columnName)) { //C if schema has property 
						mappedEntity[this.schema[key].columnName] = entity[key]; //C set mappedEntity[columnName] as property value
					} else {
						console.warn(`Entity.mapColumns() - property ${key} in entity not found in schema`);
					}
				});
				return mappedEntity;
			});
		};
		this.unmapColumns = function (mappedEntities) {
			//C inverse of mapColumns()
			return mappedEntities.map(mappedEntity => { //C for each entity
				let entity = {};
				Object.keys(mappedEntity).forEach(columnName => { //C for each columnName
					let key = Object.keys(this.schema).find(key => this.schema[key].columnName === columnName); //C find key in schema with same columnName
					if (rules.string.test(key)) {
						//C set entity[key] as value of mappedEntity[columnName]
						entity[key] = mappedEntity[columnName];
					} else {
						console.warn(`Entity.unmapColumns() - column ${columnName} in mappedEntity not found in schema`);
					}
				});
				return entity;
			});
		};

		//! this should be overwritten with different ORDER BY columns
		this.queryOrder = `ORDER BY "id" ASC`; 

		//C executes SQL queries
		this.addQuery = async function (t, mappedEntity) {
			let values = buildValues(mappedEntity);

			//? is returning * still needed when a final SELECT will be called? //TODO also remember to shake off undesired columns, like passwords
			//L use where clause as raw: https://github.com/vitaly-t/pg-promise#raw-text
			let row = await t.one(`
				INSERT INTO "sj"."${this.table}" 
				$1:raw 
				RETURNING *
			`, [values]).catch(rejected => { 
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `sj.${this.name}.add()`,
					message: `could not add ${this.name}s`,
				}));
			});

			return row;
		};
		this.getQuery = async function (t, mappedEntity) {
			let where = buildWhere(mappedEntity);

			let rows = await t.any(`
				SELECT * 
				FROM "sj"."${this.table}" 
				WHERE $1:raw
				${this.queryOrder}
			`, [where]).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `sj.${this.name}.get()`,
					message: `could not get ${this.name}s`,
				}));
			});

			return rows;
		};
		this.editQuery = async function (t, mappedEntity) {
			let {id, ...mappedEntitySet} = mappedEntity;
			let set = buildSet(mappedEntitySet);
			let where = buildWhere({id});

			let row = await t.one(`
				UPDATE "sj"."${this.table}" 
				SET $1:raw 
				WHERE $2:raw 
				RETURNING *
			`, [set, where]).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `sj.${this.name}.edit()`,
					message: `could not edit ${this.names}`,
				}));
			});

			return row;
		};
		this.removeQuery = async function (t, mappedEntity) {
			let where = buildWhere(mappedEntity);

			let row = await t.one(`
				DELETE FROM "sj"."${this.table}" 
				WHERE $1:raw 
				RETURNING *
			`, where).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: `sj.${this.name}.remove()`,
					message: `could not remove ${this.names}s`,
				}));
			});
			
			return row;
		};

		//C processes all after execution
		this.addAfter = 
		this.getAfter = 
		this.editAfter = 
		this.removeAfter = async function (t, entities, accessory) {
			return entities.slice();
		};

		//C custom SuccessList and ErrorList
		this.addSuccess = function () { return {
			origin: `sj.${this.name}.add()`,
			message: `added ${this.name}s`,
		}};
		this.getSuccess = function () { return {
			origin: `sj.${this.name}.get()`,
			message: `retrieved ${this.name}s`,
		}};
		this.editSuccess = function () { return {
			origin: `sj.${this.name}.edit()`,
			message: `edited ${this.name}s`,
		}};
		this.removeSuccess = function () { return {
			origin: `sj.${this.name}.get()`,
			message: `removed ${this.name}s`,
		}};

		this.addError = function () { return {
			origin: `sj.${this.name}.add()`,
			message: `failed to add ${this.name}s`,
		}};
		this.getError = function () { return {
			origin: `sj.${this.name}.get()`,
			message: `failed to retrieve ${this.name}s`,
		}};
		this.editError = function () { return {
			origin: `sj.${this.name}.edit()`,
			message: `failed to edit ${this.name}s`,
		}};
		this.removeError = function () { return {
			origin: `sj.${this.name}.remove()`,
			message: `failed to remove ${this.name}s`,
		}};
	},
});

Source.augmentClass({
	constructorProperties: parent => ({
		defaults: {
			serverTestProp: null,
		},
	}),
});

//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝ 

User.augmentClass({
	staticProperties(parent) {
		// CRUD
		this.addPrepare = 
		this.editPrepare = async function (t, user) {
			let newUser = Object.assign([], user);
	
			//C hash password
			//TODO might be a vulnerability here with this string check
			if (rules.string.test(newUser.password)) {
				newUser.password = await bcrypt.hash(newUser.password, PASSWORD_SALT_ROUNDS).catch(rejected => {
					throw new Err({
						log: true,
						origin: 'User.add()',
						message: 'failed to add user',
						reason: 'hash failed',
						content: rejected,
					});
				});
			}
	
			return newUser;
		};
	
		this.queryOrder = 'ORDER BY "id" ASC';
	},
});


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝    

Playlist.augmentClass({
	staticProperties: parent => ({
		// CRUD
		queryOrder: 'ORDER BY "userId" ASC, "id" ASC',
	}),
});


//  ████████╗██████╗  █████╗  ██████╗██╗  ██╗
//  ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//     ██║   ██████╔╝███████║██║     █████╔╝ 
//     ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ 
//     ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
//     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ 

Track.augmentClass({
	prototypeProperties(parent) {
		this.order = async function (db = database) {
			return await this.constructor.order(db, any(this));
		};
	},
	staticProperties(parent) {
		// CRUD
		this.addBefore = 
		this.getBefore = 
		this.editBefore = 
		this.removeBefore = async function (t, entities) {
			let newEntities = entities.slice();
			newEntities.forEach(entity => {
				//TODO Possible issue here where the condition following && could evaluate first. Not sure what the precedense is.
				entity.source = rules.object.test(entity.source) && rules.string.test(entity.source.name)
				? entity.source.name
				: undefined;
			});
			return newEntities;
		};
	
		this.addPrepare = async function (t, track) {
			//C set id of tracks to be added as a temporary symbol, so that Track.order() is able to identify tracks
			let newTrack = {...track, id: Symbol()};
			if (!rules.integer.test(newTrack.position)) {
				let existingTracks = await Track.get({playlistId: newTrack.playlistId}, t).then((result) => result.content);
				newTrack.position = existingTracks.length;
			}
			return newTrack;
		};
		this.removePrepare = async function (t, track) {
			//C set position of tracks to be removed as null, so that Track.order() recognizes them as tracks to remove
			return {...track, position: null};
		};
	
		this.queryOrder = 'ORDER BY "playlistId" ASC, "position" ASC';
	
		this.addAccommodate = 
		this.editAccommodate =
		this.removeAccommodate = async function (t, tracks) {
			//L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
			//L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
			//L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
			await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
				throw parsePostgresError(rejected, new Err({
					log: false,
					origin: 'Track.move()',
					message: 'could not order tracks, database error',
					target: 'notify',
					cssClass: 'notifyError',
				}));
			});
			return await this.order(t, tracks).then((result) => result.content).catch(propagate);
		};
	
		this.addAfter =
		this.getAfter =
		this.editAfter = 
		this.deleteAfter = async function (t, entities) {
			let newEntities = entities.slice();

			newEntities.forEach(entity => {
				entity.source = Source.instances.find(source => source.name === entity.source);
			});
			
			return newEntities;
		};

		// UTIL
		this.order = async function (db, tracks) {
			//C takes a list of input tracks for an INSERT, UPDATE, or DELETE query
			//! properties should be validated at this point
			//! tracks to be added must have a Symbol() id, this will be removed
			//! tracks to be deleted must have a null position, this will be removed
	
			//C modifies the input track's positions, if needed
			//C returns a list of influenced tracks with modified positions, if needed
	
			//C out-of-bounds positions will be repositioned at the start or end of the playlist
			//C duplicate positions will be repositioned in order of input order
			//C in the case of repositioned tracks that still overlap with other input tracks, all will be repositioned in order of input position
			
	
			//C filter out tracks
			let inputTracks = tracks.filter(track => 
				//C without an id (including symbol)
				(!isEmpty(track.id) || typeof track.id === 'symbol') 
				//C and without a position (including null) or playlistId
				&& (!isEmpty(track.position) || track.position === null || !isEmpty(track.playlistId))); 
			//C filter out duplicate tracks (by id, keeping last), by filtering for tracks where every track after does not have the same id
			inputTracks = inputTracks.filter((track, index, self) => self.slice(index+1).every(trackAfter => track.id !== trackAfter.id));
	
			//C return early if none are moving
			if (inputTracks.length === 0) {
				return new SuccessList({
					origin: 'Track.order()',
					message: 'track positions did not need to be set',
				});
			}
	
			//console.log('inputTracks.length:', inputTracks.length, '\n ---');
	
			return await db.tx(async t => {
				const playlists = [];
				const influencedTracks = [];
				const inputIndex = Symbol();
	
				//C retrieve track's playlist, group each track by playlist & moveType
				await asyncMap(inputTracks, async (track, index) => {
					const storePlaylist = function (playlistId, existingTracks) {
						if (!rules.integer.test(playlistId)) throw new Err({
							origin: 'Track.order()',
							reason: `playlistId is not an integer: ${playlistId}`,
						});
						if (!rules.array.test(existingTracks)) throw new Err({
							origin: 'Track.order()',
							reason: `existingTracks is not an array: ${existingTracks}`,
						});
	
						//C stores playlist in playlists if not already stored
						let existingPlaylist = playlists.find(playlist => playlist.id === playlistId);
						if (!existingPlaylist) {
							playlists.push({
								id: playlistId,
		
								original: existingTracks,
		
								//C move actions, these have priority positioning
								inputsToMove: [],
								inputsToAdd: [], 
								inputsToRemove: [],
							});
	
							existingPlaylist = playlists[playlists.length-1];
						}
						return existingPlaylist;
					};
	
					//C temporarily store inputIndex on track, this is required as the input order is lost when tracks are grouped by playlist
					track[inputIndex] = index;
	
					//C determine move action
					const action =
					typeof track.id === 'symbol' 	? 'Add' 	:
					track.position === null 		? 'Remove' 	: 'Move';
	
	
					//C get current playlist by playlistId if action === 'add', else by track.id using a sub-query
					//L sub-query = vs IN: https://stackoverflow.com/questions/13741582/differences-between-equal-sign-and-in-with-subquery
					const currentQuery = action === 'Add' 
					? pgp.as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = $1
					`, track.playlistId)
					: pgp.as.format(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = (
							SELECT "playlistId"
							FROM "sj"."tracks"
							WHERE "id" = $1
						)
					`, track.id);
					const currentPlaylist = await t.any('$1:raw', currentQuery).catch(rejected => {
						throw parsePostgresError(rejected, new Err({
							log: false,
							origin: 'Track.order()',
							message: 'could not move tracks',
						}));
					});
	
	
					//C store
					const currentPlaylistStored = storePlaylist(action === 'Add' ? track.playlistId : currentPlaylist[0].playlistId, currentPlaylist); //! track.playlistId might not be currentPlaylistId
					//C strip playlistId from playlist, this is done so that only modified properties will remain on the track objects
					currentPlaylistStored.original.forEach(t => {
						delete t.playlistId;
					});
	
					
					if (!rules.integer.test(track.playlistId) || track.playlistId === currentPlaylistStored.id) { 
						//C if not switching playlists
						//C group by action
						currentPlaylistStored['inputsTo'+action].push(track);
					} else { 
						//C if switching playlists
						//C this should catch tracks with playlistIds but no position
						const anotherPlaylist = await t.any(`
							SELECT "id", "position", "playlistId"
							FROM "sj"."tracks" 
							WHERE "playlistId" = $1
						`, track.playlistId).catch(rejected => {
							throw parsePostgresError(rejected, new Err({
								log: false,
								origin: 'Track.order()',
								message: 'could not move tracks',
							}));
						});
	
						const anotherPlaylistStored = storePlaylist(track.playlistId, anotherPlaylist);
						anotherPlaylistStored.original.forEach(t => {
							delete t.playlistId;
						});
	
						//C track is removed from its current playlist, and added to another playlist
						currentPlaylistStored.inputsToRemove.push(track);
						anotherPlaylistStored.inputsToAdd.push(track);
					}
	
					return new Success({
						origin: 'Track.order()',
						message: "retrieved track's playlist",
					});
				}).catch(rejected => {
					throw new ErrorList({
						origin: 'Track.order() - movingTracks iterator',
						message: `could not retrieve some track's playlist`,
						content: rejected,
					});
				});
	
				//console.log('playlists.length:', playlists.length, '\n ---');
	
				//C calculate new track positions required to accommodate input tracks' positions
				playlists.forEach(playlist => {
					//C populate others with tracks in original that are not in inputsTo Add, Remove, or Move
					//! inputsToRemove can be ignored from this point on, these tracks aren't included in others and wont be added to the final ordered list
					playlist.others = playlist.original.filter(originalTrack => 
						!playlist.inputsToAdd.some(addingTrack => addingTrack.id === originalTrack.id) &&
						!playlist.inputsToRemove.some(trackToRemove => trackToRemove.id === originalTrack.id) &&
						!playlist.inputsToMove.some(movingTrack => movingTrack.id === originalTrack.id)
					);
	
					//console.log('playlist.others.length:', playlist.others.length);
	
					//C combine both adding and moving, 
					playlist.inputsToPosition = [...playlist.inputsToAdd, ...playlist.inputsToMove];
					//C give tracks with no position an Infinite position so they get added to the bottom of the playlist
					playlist.inputsToPosition.forEach(trackToPosition => {
						if (!rules.number.test(trackToPosition.position)) {
							trackToPosition.position === Infinity;
						}
					});
	
	
					//C sort
					stableSort(playlist.others, (a, b) => a.position - b.position);
					//C stable sort by inputIndex then position to resolve clashes by position then inputIndex
					stableSort(playlist.inputsToPosition, (a, b) => a[inputIndex] - b[inputIndex]);
					stableSort(playlist.inputsToPosition, (a, b) => a.position - b.position);
	
					//console.log('playlist.inputsToAdd.length:', playlist.inputsToAdd.length);
					//console.log('playlist.inputsToRemove.length:', playlist.inputsToRemove.length);
					//console.log('playlist.inputsToMove.length:', playlist.inputsToMove.length, '\n ---');
					//console.log('playlist.inputsToPosition.length:', playlist.inputsToPosition.length, '\n ---');
					
	
					//C inputIndex is no longer needed, remove it from anything it was added to
					playlist.inputsToPosition.forEach(trackToPosition => {
						delete trackToPosition[inputIndex];
					});
					playlist.inputsToRemove.forEach(trackToRemove => {
						delete trackToRemove[inputIndex];
					});
	
	
					//C populate merged by filling others tracks around combined tracks
					playlist.merged = [];
					//! these are copies that will be emptied below
					playlist.inputsToPositionCopy = [...playlist.inputsToPosition];
					playlist.othersCopy = [...playlist.others];
					let i = 0;
					while (playlist.othersCopy.length > 0) {
						if (playlist.inputsToPositionCopy.length > 0 && playlist.inputsToPositionCopy[0].position <= i) {
							//C if the next adding or moving track's position is at (or before, in the case of a duplicated position) the current index, transfer it to the merged list
							//C this will properly handle negative and duplicate positions
							//G shift removes the first item of an array and returns that item
							playlist.merged.push(playlist.inputsToPositionCopy.shift());
						} else {
							//C else - transfer the next others track
							playlist.merged.push(playlist.othersCopy.shift());
						}
						i++;
					}
	
					//C push rest of combined tracks
					//R this method was chosen over including combined.length > 0 in the while condition to prevent needless loops caused by ridiculously high positions, this was also chosen over original.length because adding + moving tracks could be greater the playlist length
					//L .push() and spread: https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating
					playlist.merged.push(...playlist.inputsToPositionCopy);
					playlist.inputsToPositionCopy.length = 0; //! remove combined tracks for consistent behavior
	
	
					//C populate playlist.influenced with all non-input tracks that have moved
					playlist.influenced = playlist.merged.filter((mergedTrack, index) => {
						let inOthers = playlist.others.find(otherTrack => otherTrack.id === mergedTrack.id);
						let influenced = inOthers && index !== inOthers.position;
	
						//C assign new positions (inputTracks too)
						mergedTrack.position = index;
						
						return influenced;
					});
	
					//console.log('playlist.merged.length:', playlist.merged.length);
					//console.log('playlist.merged:\n', playlist.merged, '\n ---');
	
					//console.log('playlist.influenced.length:', playlist.influenced.length);
					//console.log('playlist.influenced:\n', playlist.influenced, '\n ---');
	
					influencedTracks.push(...playlist.influenced);
				});
	
				//C remove temporary symbol id from add tracks and null position from delete tracks
				inputTracks.forEach(inputTrack => {
					if (typeof inputTrack.id === 'symbol') {
						delete inputTrack.id;
					}
					if (inputTrack.position === null) {
						delete inputTrack.position;
					}
				});
	
				return new SuccessList({
					origin: 'Track.order()',
					message: 'influenced tracks calculated',
					content: influencedTracks,
				});
			});
	
			/* Thought Process
	
				if any tracks have position set,
					do the move function
					order
				after deleting tracks
					order
		
				idea: get the tracklist, then do the moving and ordering outside, at the same time - then update all at once
				the fetched array won't have holes in it, just the position numbers (which is good?)
		
				//R initial idea wrong: 
				tracks must be in order of their positions for the move to be applied properly (ie tracks with positions: 3, 4, 5 will all be inserted inbetween tracks 2 and 3) - updating in the order 5, 4, 3 would result in later tracks pushing the already placed tracks down (so their positions end up being 7, 5, 3)
				it needs to go in decending order because of the nature of how the move function works - affecting only tracks below it
		
		
				//R wrong, because this done simultaneously (not in sequence) it will separate adjacent inserted positions (0i, 1i) will insert into a full list (o) as (0i, 0o, 1i, 1o), doing this in sequence would require reordering (updating of new positions) the tracks after each insert (might be resource intensive)
				get input
					stable sort by position
				get tracks
					stable sort by position
					prepend item with position -Infinity
					append item with position Infinity
		
				for each input (in reverse order, so that inputs with same positions do not get their order reversed)
					find where position is greater than i.position and less than or equal to i+1.position
					splice(i+1, 0, input)
				
		
				final idea: 
					get the existing list, remove tracks to be inserted
					sort each list
					for the length of the combined lists, for integers 0 to length
						if there is a track in the input list at (or less than) the index - push the next one
						else push the next track in the existing list
					if there are any remaining tracks in the input list (for example a big hole that makes the last few tracks larger than the sum of both lists), push them in order to the end of the list
					lastly do a order to remove duplicates and holes
		
					this essentially 'fills' the existing tracks around the set positions of the input tracks
	
	
					for Track.order()
						there is a recursive loop hazard in here (basically if Track.get() is the function that calls sj.Track.order() - sj.Track.order() itself needs to call sj.Track.get(), therefore a loop), however if everything BUT sj.Track.get() calls sj.Track.order(), then sj.Track.order() can safely call sj.Track.get(), no, the same thing happens with sj.Track.edit() - so just include manual queries, no have it so: sj.Track.get() doesn't use either moveTracks() or orderTracks(), these two methods are then free to use sj.Track.get(), and then have each use their own manual update queries - basically add, edit, remove can use these and sj.Track.get() but not each other - this is written down in that paper chart
	
	
					//R moveTracks() cannot be done before INSERT (as in editTracks()) because the tracks don't exist yet, and the input tracks do not have their own id properties yet. the result tracks of the INSERT operation cannot be used for moveTracks() as they only have their current positions, so the result ids and input positions need to be combined for use in moveTracks(), but we don't want to position tracks don't have a custom position (1 to reduce cost, 2 to maintain the behavior of being added to the end of the list (if say n later tracks are positioned ahead of m former tracks, those m former tracks will end up being n positions from the end - not at the very end). so:
	
					//C for tracks with a custom position, give the input tracks their result ids and the result tracks their custom positions
					//! requires the INSERT command to be executed one at at a time for each input track
					//R there is no way to pair input tracks with their output rows based on data because tracks have no unique properties (aside from the automatically assigned id), but because the INSERT statements are executed one at a time, the returned array is guaranteed to be in the same order as the input array, therefore we can use this to pair tracks
			*/
		};
	},	
});


export default sj;