// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //? user id being in the session.user object is basically the user's access key -> how do I ensure this is secure too? (aside from using a secure connection), it has to do with koa-session and how the session keys work - figure this out - I think this info is never sent to the client, just stored in the server and accessed via cookie key

    //? is a check to see if a to-be-removed item necessary? should the user be made aware if it doesn't exist? will this actually ever happen?

    //G
    Create -> add
    Retrieve -> get
    Update -> edit
    Delete -> remove

    //! right now the CRUD functions are called with sj.Bases with some set of parameters (not always id, even for get) - these parameters are all ones that are fine to publicly carry around with the object (except in particular cases like passwords) and so should always be with the object. If theres a point in the future where these have to be called with a consistent argument (id) then the next step would be to make all these consistent about using that parameter and then also maybe have fallbacks for incase that parameter doesn't exist but other sufficient ones do (playlistId, position). This would be an order of properties and their respective validation checks and query modifications.

    //G basic query functions: any(manyOrNone) many none one oneOrNone

    //! all CRUD functions have a ctx parameter for consistency (regardless if it is used (most of them use it though))

    

    TODO
    //C get functions will be allowed to get multiple resources (just a simple query based on matches), for example getting a playlist with only userId will get all playlists by that user
    //C there is some confusion about what is 'known' information - because playlists hold data on the tracks they contain, but users don't hold data on the playlists they have. get needs the ability for multiple matches because it is not 'known' by the client what it contains (playlist is only able to do this because the multiple query is done manually server-side when getting the original playlist, this is not done for user)
    //C two directions - either make user retrieve all of it's containing playlists (lots of data being passed around here, no way to do a different query for playlists or tracks separated from user), or allow multiple querying (creates a difference between get and the other CRUD methods (add, edit, and remove could be done in multiple but these are all methods where the client 'knows' the exact resource they're manipulating and can be done iteratively on the client-side)
    //C maybe make all CRUD methods multiply possible (for admin stuff? remove all tracks in a playlist (at once) without doing them iteratively client-side), all of these would have to fail if any one part fails (using that postgres thing (transaction commit?))
    //TODO also consider then including a light version of tracks/playlists that only includes ids?

    //TODO add admin privacy level: [admin, self, password, link, public, etc.]

    //R all CRUD will return an array of any number of rows

    //R GET should be the only method used for search/query. EDIT & DELETE (& ADD) should not, therefore, editing or deleting a resource should only be done when it's id is known (after probably GETing it), (this clears up confusion: say we want to edit a track where its property is x, this is done in the GET method, but here is an issue when determining what data is the replacement data and what data is the query data - therefore only the id should be used as the query data (because it cant be changed), an the rest is the replacement data)

    because of this it becomes: get | add, edit, remove   or   get, remove | add, edit    (because it could make sense for remove to query too because it doesn't have replacement data, but not add because it doesn't need a query), it comes down to consistency, get could take a single object, add, edit, remove, could take an array of objects (and return single success/failure?), what about get taking an array and returning an array

    
    //C ErrorList should not be a wrapper for a list of errors, ErrorList should be a version of a single error that has multiple 'parallel' parts (ie: adding a user and having an issue with multiple fields - its still a single error with one resource (a user) but there are multiple parts to the error that need to be evaluated in parallel not in sequence)
    //TODO would this not mean that requests are also evaluated in parallel? that response arrays should all have Success or ErrorList wrappers?, wouldn't this be redundant - if everything is already an array why have a wrapper for it? what would be the default wrapper for request data like editTracks([{}, {}, ...]) ?

    //L multiple resources with one request: https://stackoverflow.com/questions/32098423/rest-updating-multiple-resources-with-one-request-is-it-standard-or-to-be-avo

    //L return Promise vs return await Promise (theres no difference, except for try-catch blocks): https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
    // therefore, do not use await when returning a promise - so that the return syntax can mirror returning inside .then() chains (which cant use await)
    //L actually no: https://www.reddit.com/r/javascript/comments/7idasp/await_vs_return_vs_return_await/ 
    //R DO use return await
    //? can async arrow functions that have a single line return omit 'return await' ? 

	//L proper use of array methods: https://medium.com/front-end-weekly/stop-array-foreach-and-start-using-filter-map-some-reduce-functions-298b4dabfa09
	
	//R I started using Object.assign() to supplement sj.Entity (and other classes) for server-specific functionality, however it was limiting me to shallow assignment - which required a bunch of functions to have prefixes (addPrepare, getPrepare, etc.), and I really wanted to avoid calling these functions like: this[`${method}Prepare`](), I wanted functional assignment much like class constructors, so I decided to switch to using  (function () {}).call()  which acts kind of reverse to how its used as 'super' in function classes, basically calling another constructor(?) later
	//R two ways to implement: namespace within the class - this requires those namespaced functions to be called via this.namespace.fn.call(this, ...), or just prefix the functions which requires them to be called via this[`${namespace}Fn`](...), still not sure which is better
	//R actually - don't do that namespace thing, as the namespace is still a reference to an object, so if a child class changes one of its properties, it changes it for all classes with that same namespace


	//G modifying & returning passed objects in functions, in general I'm deciding to modify passed objects in functions and return the same reference, however when the data-structure changes (nesting, cloning, etc.), the passed object should not be modified. this can be seen in sj.Entity.common() validation, where any nested validated properties are flattened into a root object
*/

/* deep property access //! this is broken - must fix
	const get = (p, o) =>
	p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o);

	let bar = {
	bar: true,
	}

	console.log(get(['bar', 'bar'], bar));

	// let foo = function (root, path) {
	//   return path.reduce((dir, next) => {
	//     if (dir && dir[next]) {
	//       return dir[next];
	//     } else {
	//       return undefined;
	//     }
		
		
	//     if (current && current[next]) {
	//       return current[next];
	//     } else {
	//       return 
	//     }
	//   }, root};
	// }
*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
    //TODO tree-shake any objects that don't need to be exported (remove from sj.x, just hae them locally defined)

    //TODO session_regenerate_id() ? if using, add in same locations as php version

    //TODO other stuff from top.php

    last page history (I think this goes in routing or something???)

    const exclusionList = [
        // since pages are no longer php and the page/code difference is bigger, this isnt really relevant
    ]
    let excluded = false;
    exclusionList.forEach(item => {
        if (false  strpos($_SERVER['REQUEST_URI'], $uri) ) {
            excluded = true;
        }
    });

    // if this page is not excluded, shift page history
    if (!excluded) {
        ctx.session.pastPage = ctx.session.currentPage !== 'undefined' ? ctx.session.currentPage : 'index.html';
        ctx.session.currentPage = '';  $_SESSION['currentPage'] = $_SERVER['REQUEST_URI']; 
    }

    review common pg-promise mistakes: //L https://github.com/vitaly-t/pg-promise/wiki/Common-Mistakes#invalid-query-formatting-with-manual-string-concatenation-and-es6-template-strings

    //TODO consider delegating unexpected error catches to only top-level entry points, (so that catchUnexpected() doesn't have to be repeated for every single async function call? (but this is also what prevents things from silently failing in the first place))

    //TODO move other crud functions over to array results (or not?), get CRUD functions are done 

    //L //TODO best practices: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

    //TODO replace all database variables, column names, etc. with constants inside this file (or the db file)

    //TODO complete all parameters on database functions

	//TODO after functions are mostly debugged - remove a lot of the .catch(sj.propagate) - this is mainly tracing and unhandled error
	

	//TODO //! IMPORTANT //! check any CRUD functions (like addTrack()) that rely on the current state of the database for information - because asyncForEach() functions are executed in parallel, and not in series, this could cause collisions

	//TODO consider changing CRUD 'delete' method to 'remove' to avoid that naming collision

	//TODO security issue for private query variables (eg password), if someone queries for users where password = x, the passwords wont be returned, but they will still receive a list of users that that query matches
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// builtin

// external
import fetch from 'node-fetch'; //C global.mjs uses fetch
import bcrypt from 'bcrypt';

// internal
import sj from '../public/js/global.mjs';
import database, {pgp} from './db.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

sj.fetch = fetch;

// bcrypt
const saltRounds = 10; 

// database
sj.db = database; //C for use of db with globals so that db doesn't have to be imported twice


//  ██╗   ██╗████████╗██╗██╗     
//  ██║   ██║╚══██╔══╝██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝

// postgres
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
    return sj.db.tx(async function (t) {
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
                throw new sj.Error({
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
            throw new sj.Error({
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
                throw new sj.Error({
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
                throw new sj.Error({
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
                throw new sj.Error({
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
                throw new sj.Error({
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
                throw new sj.Error({
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
            throw sj.propagate(rejected);
        });
    }).catch(rejected => {
        throw sj.propagate(rejected);
    });
})().then(resolved => {
    new sj.Success({
        origin: 'initialize database',
        message: 'database initialized',
    });
}).catch(rejected => {
    console.log(rejected);
});

sj.parsePostgresError = function (pgError, sjError) {
    // TODO any validation needed here?
    // TODO consider separating insertion checks into Conditions so multiple parameters are checked
    // TODO add targets and cssClasses to each violation case too

    sjError.code = pgError.code;
    sjError.reason = pgError.message;
    sjError.content = pgError;

    // https://www.postgresql.org/docs/9.6/static/errcodes-appendix.html

    // Class 23 — Integrity Constraint Violation
    if (pgError.code === '23505') { // unique_violation
        // users
        if (pgError.constraint === 'users_name_key') {
            sjError.message = 'this user name is already taken';
        }
        if (pgError.constraint === 'users_email_key') {
            sjError.message = 'this email is already in use';
        }
        // playlists
        if (pgError.constraint === 'playlists_userId_name_key') {
            sjError.message = 'you already have a playlist with this name';
        }
        // tracks
        if (pgError.constraint === 'tracks_position_key') {
            sjError.message = 'a track already exists at this position';
        }
    }

    if (pgError.code === '23503') { // foreign_key_violation
        // playlists
        if (pgError.constraint === 'playlists_userId_fkey') {
            sjError.message = 'cannot add a playlist for an unknown user';
        }
        // tracks
        if (pgError.constraint === 'tracks_playlistId_fkey') {
            sjError.message = 'cannot add a track for an unknown playlist';
        }
    }

    sjError.announce();
    return sjError;
}

// random key generation
sj.makeKey = function (length) {
    //C use only characters allowed in URLs
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    for (let i = 0; i < length; i++) {
        key += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return key;
};
sj.addKey = async function (list, timeout) {
    let pack = {};
    let defaultTimeout = 300000; //C default 5 minutes

    pack.key = await sj.recursiveSyncCount(100, (key) => {
        let found = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].key === key) {
                found = true;
                break;
            }
        }
        return found;
    }, sj.makeKey, 10);

    pack.timestamp = Date.now();
    pack.timeout = pack.timestamp;
    sj.isType(timeout, 'number') ? pack.timeout += timeout : pack.timeout += defaultTimeout;

    list.push(pack);
    return pack;
};
sj.checkKey = async function (list, key) {
    //C checks a list for a key, will remove and return if found, will clean up timed-out keys
    
    for(let i = 0; i < list.length; i++) {
        //C check if timed out
        let fresh = list[i].timeout > Date.now() ? true : false;
        
        //C if the key is found and not timed out, take it out and return it
        if (list[i].key === key && fresh) {
            return list.splice(i, 1)[0];
        }

        //C remove timed-out keys //TODO check that this works
        if (!fresh) {
            list.splice(i, 1);
        }
    }

    throw new sj.Error({
        log: true,
        origin: 'checkKey()',
        message: 'request timeout, or just an invalid key',
    });
};

/* //OLD
	sj.mapColumns = function (entities, columnMap) {
		//C switches entities' js named keys for column named keys based on columnMap
		//C this is so that database column names can even be any valid string
		return entities.map(entity => {
			let mappedEntity = {};
			Object.keys(entity).forEach(key => {
				if (columnMap[key] !== undefined) mappedEntity[columnMap[key]] = entity[key];
			});
			return mappedEntity;
		});
	};
	sj.unmapColumns = function (mappedEntities, columnMap) {
		//C inverse of mapColumns()
		return mappedEntities.map(mappedEntity => {
			let entity = {};
			Object.keys(mappedEntity).forEach(columnName => {
				let key = Object.keys(columnMap).find(key => key === columnName);
				if (key !== undefined) entity[key] = mappedEntity[columnName];
			});
			return entity;
		});
	}
*/

sj.buildValues = function (mappedEntity) {
	if (Object.keys(mappedEntity).length === 0) {
		//C this shouldn't insert anything
		return `("id") SELECT 0 WHERE 0 = 1`;
	} else {
		let columns = [];
		let values = [];
		let placeholders = [];

		Object.keys(mappedEntity).forEach((key, i) => {
			columns.push(key);
			values.push(mappedEntity[key]);
			placeholders.push(`$${i+1}`); //C $1 based placeholders
		});

		columns = columns.join('", "'); //C inner delimiter
		columns = `("${columns}")`; //C outer

		placeholders = placeholders.join(', ');
		placeholders = `(${placeholders})`;

		//? this should be able to format arrays just as any other value, otherwise the format is: ARRAY[value1, value2, ...]
		return pgp.as.format(`${columns} VALUES ${placeholders}`, values);
	}
};
sj.buildWhere = function (mappedEntity) {
	if (Object.keys(mappedEntity).length === 0) { //TODO hacky
		//C return a false clause
		return '0 = 1';
	} else {
		//C pair as formatted string
		let pairs = [];
		pairs = Object.keys(mappedEntity).map(key => {
			//C wrap array in another array so that pgp doesn't think its values are for separate placeholders
			let input = sj.isType(mappedEntity[key], Array) ? [mappedEntity[key]] : mappedEntity[key];
			return pgp.as.format(`"${key}" = $1`, input); //! if the value here is undefined, it wont format, it will simply leave the string as '"key" = $1'
		});

		//C join with ' AND '
		return pairs.join(' AND ');
	}
};
sj.buildSet = function (mappedEntity) {
	if (Object.keys(mappedEntity).length === 0) { //TODO hacky
		//C don't make any change
		//! this does have to reference a column that always exists (id)
		return '"id" = "id"';
	} else {
		let pairs = [];
		//C pair as formatted string
		pairs = Object.keys(mappedEntity).map(key => {
			let input = sj.isType(mappedEntity[key], Array) ? [mappedEntity[key]] : mappedEntity[key];
			return pgp.as.format(`"${key}" = $1`, input);
		});
		//C join with ', '
		return pairs.join(', ');
	}
};


//  ██╗     ██╗██╗   ██╗███████╗
//  ██║     ██║██║   ██║██╔════╝
//  ██║     ██║██║   ██║█████╗  
//  ██║     ██║╚██╗ ██╔╝██╔══╝  
//  ███████╗██║ ╚████╔╝ ███████╗
//  ╚══════╝╚═╝  ╚═══╝  ╚══════╝

sj.subscriptions = {
	[sj.User.table]: [],
	[sj.Playlist.table]: [],
	[sj.Track.table]: [],
	add: async function (table, query, user) {
		let Entity = sj.tableToEntity(table); //! this[Entity.table] is used over this[table] because sj.tableToEntity() is the validator for table
		let processedQuery = await Entity.getMimic(query);

		//C find or add query 
		let subscription = this[Entity.table].find(subscription => sj.deepMatch(processedQuery, subscription.query)); //! not a super-set
		if (!subscription) {
			subscription = new sj.QuerySubscription({query: processedQuery});
			this[Entity.table].push(subscription);
		};
		
		//C find or add subscriber
		let subscriber = subscription.subscribers.find(subscriber => subscriber.id === user.id);
		if (!subscriber) {
			subscriber = user;
			subscription.subscribers.push(subscriber);
		}
		Object.assign(subscriber, user); //C update user if any info has changed

		return new sj.Success({
			origin: 'sj.addSubscriber()',
			message: 'added subscriber',
			content: processedQuery,
		});
	},
	remove: async function (table, query, user) {
		let Entity = sj.tableToEntity(table);
		let processedQuery = await Entity.getMimic(query);
	
		let subscriptionIndex = -1;
		let subscription = this[Entity.table].find((subscription, i) => {
			if (sj.deepMatch(processedQuery, subscription.query)) {
				subscriptionIndex = i;
				return true;
			}
			return false;
		});
		if (!subscription) {
			return new sj.Warn({
				origin: 'sj.removeSubscriber()',
				message: 'no subscription found for this query',
				content: {query: processedQuery, tableSubscriptions: this[Entity.table]},
			});
		}
	
		//C find or add subscriber
		let subscriberIndex = -1;
		let subscriber = subscription.subscribers.find((subscriber, i) => {
			if (subscriber.id === user.id) {
				subscriberIndex = i;
				return true;
			}
			return false;
		});
		if (!subscriber) {
			return new sj.Warn({
				origin: 'sj.removeSubscriber()',
				message: 'no subscriber found for this user',
				content: {user, subscribers: subscription.subscribers},
			});
		}
	
		//C remove subscriber
		subscription.subscribers.splice(subscriberIndex, 1);
	
		//C if no more subscribers, remove subscription
		if (subscription.subscribers.length <= 0) {
			this[Entity.table].splice(subscriptionIndex, 1);
		}
	
		return new sj.Success({
			origin: 'sj.removeSubscriber()',
			message: 'removed subscriber',
			content: user,
		});
	},
	notify: async function (table, entities, timestamp, change) {
		let Entity = sj.tableToEntity(table);

		//C for each changed entity
		entities.forEach(entity => { 
			console.log('notified called for:', entity);
			//console.log('table length:', this[Entity.table].length, 'table is array:', Array.isArray(this[Entity.table]));
			//C for each subscription
			this[Entity.table].forEach(subscription => { 
				//C for each query that matches as a subset && if notification is new
				if (sj.deepMatch(subscription.query, entity, {matchIfSubset: true, matchIfTooDeep: true}) && timestamp > subscription.timestamp) {
					//C set new timestamp
					subscription.timestamp = timestamp;

					//C for each subscriber
					subscription.subscribers.forEach(subscriber => {
						console.log('notifying subscriber:', subscriber.name);

						//TODO see if the subscriber has the permission to see any changes - this should be similar to if not the same as the validate function for CRUD methods

						//C emit socket notification to subscriber
						sj.databaseSockets.to(subscriber.socketId).emit('NOTIFY', {query: subscription.query, changed: entity, timestamp});
					});
				}
			});
		});
	},
};


//   ██████╗██╗      █████╗ ███████╗███████╗
//  ██╔════╝██║     ██╔══██╗██╔════╝██╔════╝
//  ██║     ██║     ███████║███████╗███████╗
//  ██║     ██║     ██╔══██║╚════██║╚════██║
//  ╚██████╗███████╗██║  ██║███████║███████║
//   ╚═════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝

// entity
(function () { // static
	this.add = async function (query, db = sj.db) {
		return await this.main(db, query, 'add');
	};
	this.get = async function (query, db = sj.db) {
		return await this.main(db, query, 'get');
	};
	this.edit = async function (query, db = sj.db) {
		return await this.main(db, query, 'edit');
	};
	this.remove = async function (query, db = sj.db) {
		return await this.main(db, query, 'remove');
	};

	//C getMimic runs a query through the main database function to be formatted the exact same as any result from a get query, the difference is that it doesn't execute any SQL and returns the data that would be set off in sj.notifyChange()
	this.getMimic = async function (query, db = sj.db) {
		return await this.main(db, query, 'getMimic');
	};

	this.main = async function (db, anyEntities, methodName) {
		//C catch sj.Entity
		if (this === sj.Entity) {
			throw new sj.Error({
				origin: 'sj.Entity.[CRUD]',
				reason: `cannot call CRUD method directly on sj.Entity`,
			});
		}


		//C shorthand
		let isGetMimic = methodName === 'getMimic'; //C store getMimic
		if (isGetMimic) methodName = 'get'; //C 'getMimic' === 'get' for functions: [methodName+'Function']
		let isGet = methodName === 'get';

		//C cast as array
		let entities = sj.any(anyEntities);
		return await db.tx(async t => {
			let accessory = {};


			//C process list before iteration
			let beforeEntities = await this[methodName+'Before'](t, entities, accessory);

			//C validate
			let validatedEntities = await sj.asyncForEach(beforeEntities, async entity => {
				return await this.validate(entity, methodName).catch(sj.propagate);
			});

			//C prepare
			let preparedEntities = await sj.asyncForEach(validatedEntities, async entity => {
				return await this[methodName+'Prepare'](t, entity, accessory).catch(sj.propagate);
			});


			//C accommodate other influenced entities
			if (!isGet) var influencedEntities = await this[methodName+'Accommodate'](t, preparedEntities, accessory).catch(sj.propagate);

			//C map properties to columns
			let inputMapped = this.mapColumns(preparedEntities);
			if (!isGet) var influencedMapped = this.mapColumns(influencedEntities);

			let before = [];
			let after = !isGetMimic ? [] : inputMapped;
			if (!isGetMimic) {
				//C execute SQL
				await sj.asyncForEach(inputMapped, async entity => {
					//C before, ignore add
					if (!isGet && methodName !== 'add') {
						let inputBefore = await this.getQuery(t, sj.shake(entity, this.filters.id)).then(sj.any).catch(sj.propagate);
						before.push(...inputBefore);
					}

					//C after, ignore remove (still needs to execute though)
					let inputAfter = await this[methodName+'Query'](t, entity).then(sj.any).catch(sj.propagate);
					if (methodName !== 'remove') after.push(...inputAfter);
				}).catch(rejected => {
					throw sj.propagate(new sj.ErrorList({
						...this[methodName+'Error'](),
						content: rejected,
					}));
				});
				if (!isGet) {
					await sj.asyncForEach(influencedMapped, async influencedEntity => {
						let influencedBefore = await this.getQuery(t, sj.shake(entity, this.filters.id)).then(sj.any).catch(sj.propagate);
						let influencedAfter = await this.editQuery(t, influencedEntity).then(sj.any).catch(sj.propagate);

						before.push(...influencedBefore);
						after.push(...influencedAfter);
					}).catch(rejected => {
						throw sj.propagate(new sj.ErrorList({
							...this[methodName+'Error'](),
							content: rejected,
						}));
					});
				}
			}


			//C unmap columns to properties
			let unmappedBefore = this.unmapColumns(before);
			let unmappedAfter = this.unmapColumns(after);

			//C process list after iteration
			let afterBefore = await this[methodName+'After'](t, unmappedBefore, accessory).catch(sj.propagate);
			let afterAfter = await this[methodName+'After'](t, unmappedAfter, accessory).catch(sj.propagate);


			//C notify subscribers, entities should be shook according to their getOut filter here
			let getShookBefore = sj.shake(afterBefore, this.filters.getOut);
			let getShookAfter = sj.shake(afterAfter, this.filters.getOut);

			//C timestamp, used for ignoring duplicate notify in the case of edit
			let timestamp = Date.now();

			if (!isGet) { //C no changes for get
				sj.subscriptions.notify(this.table, getShookBefore, timestamp, methodName);
				sj.subscriptions.notify(this.table, getShookAfter, timestamp, methodName);
			} else if (isGetMimic) { //C return getMimic here to mimic entity notification, entity is a single query object 
				return sj.one(getShookAfter);
			}


			//C shake for return
			let shookBefore = sj.shake(afterBefore, this.filters[methodName+'Out']);
			let shookAfter = sj.shake(afterAfter, this.filters[methodName+'Out']);

			//C rebuild
			let builtAfter = shookAfter.map(entity => new this(entity));

			return new sj.SuccessList({
				...this[methodName+'Success'](),
				content: builtAfter, 
			});
		}).catch(sj.propagate);
	};

	//C process before execution
	this.addBefore = 
	this.getBefore = 
	this.editBefore = 
	this.removeBefore = async function (t, entities, accessory) {
		return entities.slice();
	};

	//C validate using sj.Entity.schema
	this.validate = async function (entity, methodName) {
		let validated = {};
		await sj.asyncForEach(Object.keys(this.schema), async key => {
			let prop = this.schema[key];

			//C catches
			if (!(prop.rule instanceof sj.Rule)) { // sj.Rule
				throw new sj.Error({
					log: true,
					origin: 'sj.Rule.checkRuleSet()',
					message: 'validation error',
					reason: `${key}'s rule is not an sj.Rule`,
					content: prop,
				});
			}

			//C check if optional and not empty, or if required
			if ((prop[methodName].check && !sj.isEmpty(entity[key])) || prop[methodName].check === 2) {
				//G the against property can be specified in the schema and then assigned to the entity[againstName] before validation
				let checked = await prop.rule.check(entity[key], entity[prop.against]);
				validated[key] = sj.content(checked);
				return checked;
			} else {
				//C don't pack into validated
				return new sj.Success({
					origin: 'sj.Entity.validate()',
					message: `optional ${key} is empty, skipped validation`,
				});
			}
		}).catch(rejected => {
			throw new sj.ErrorList({
				origin: 'sj.Entity.validate()',
				message: 'one or more issues with properties',
				reason: 'validating properties returned one or more errors',
				content: rejected,
			});
		});

		return validated;
	};

	//C modifies each entity after validation
	this.addPrepare =
	this.getPrepare =
	this.editPrepare = 
	this.removePrepare = async function (t, entity, accessory) {
		return Object.assign({}, entity);
	}

	//C modifies input entities, returns other entities - checks validated entities against each other and the database to avoid property collisions, calculates the changes required to accommodate the input entities
	this.addAccommodate =
	this.getAccommodate =
	this.editAccommodate =
	this.removeAccommodate = async function (t, entities, accessory) {
		return [];
	};

	//C map js property names to database column names
	this.mapColumns = function (entities) {
		//C switches entities' js named keys for column named keys based on schema
		return entities.map(entity => { //C for each entity
			let mappedEntity = {};
			Object.keys(entity).forEach(key => { //C for each property
				if (sj.isType(this.schema[key], Object) && sj.isType(this.schema[key].columnName, String)) { //C if schema has property 
					mappedEntity[this.schema[key].columnName] = entity[key]; //C set mappedEntity[columnName] as property value
				} else {
					console.warn(`sj.Entity.mapColumns() - property ${key} in entity not found in schema`);
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
				if (sj.isType(key, String)) {
					//C set entity[key] as value of mappedEntity[columnName]
					entity[key] = mappedEntity[columnName];
				} else {
					console.warn(`sj.Entity.mapColumns() - column ${columnName} in mappedEntity not found in schema`);
				}
			});
			return entity;
		});
	};

	this.queryOrder = `ORDER BY "id" ASC`; //! this should be overwritten with different ORDER BY columns

	//C query executors
	this.addQuery = async function (t, mappedEntity) {
		let values = sj.buildValues(mappedEntity);

		//? is returning * still needed when a final SELECT will be called? //TODO also remember to shake off undesired columns, like passwords
		let row = await t.one(`
			INSERT INTO "sj"."${this.table}" 
			$1:raw 
			RETURNING *
		`, [values]).catch(rejected => { 
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: `sj.${this.name}.add()`,
				message: `could not add ${this.name}s`,
			}));
		});

		return row;
	};
	this.getQuery = async function (t, mappedEntity) {
		let where = sj.buildWhere(mappedEntity);

		let rows = await t.any(`
			SELECT * 
			FROM "sj"."${this.table}" 
			WHERE $1:raw
			${this.queryOrder}
		`, [where]).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: `sj.${this.name}.get()`,
				message: `could not get ${this.name}s`,
			}));
		});

		return rows;
	};
	this.editQuery = async function (t, mappedEntity) {
		let {id, ...mappedEntitySet} = mappedEntity;
		let set = sj.buildSet(mappedEntitySet);
		let where = sj.buildWhere({id});

		let row = await t.one(`
			UPDATE "sj"."${this.table}" 
			SET $1:raw 
			WHERE $2:raw 
			RETURNING *
		`, [set, where]).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: `sj.${this.name}.edit()`,
				message: `could not edit ${this.names}`,
			}));
		});

		return row;
	};
	this.removeQuery = async function (t, mappedEntity) {
		let where = sj.buildWhere(mappedEntity);

		let row = await t.one(`
			DELETE FROM "sj"."${this.table}" 
			WHERE $1:raw 
			RETURNING *
		`, where).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: `sj.${this.name}.remove()`,
				message: `could not remove ${this.names}s`,
			}));
		});
		
		return row;
	};

	//C process after execution
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
}).call(sj.Entity);
(function () { // instance
	this.add = async function (db) {
		return await this.constructor.add(this, db);
	};
	this.get = async function (db) {
		return await this.constructor.get(this, db);
	};
	this.edit = async function (db) {
		return await this.constructor.edit(this, db);
	};
	this.remove = async function (db) {
		return await this.constructor.remove(this, db);
	};
}).call(sj.Entity.prototype);

/* //OLD
	sj.Rule.checkRuleSet = async function (ruleSet) {
		//C checks a ruleSet and returns a sj.Success with a list of formated strings pairing columns to propertyNames
		//C takes a 2D array: [[isRequired,  sj.Rule, object, propertyName, against], [], ...]
		//! nested object properties can be referenced: entity.nest[propertyName], however the validated properties will be flattened to the root object: validated[propertyName]

		let validated = {};
		await sj.asyncForEach(ruleSet, async ([isRequired, rule, obj, propertyName, against]) => {
			//C validate arguments
			if (!sj.isType(isRequired, Boolean)) {
				throw new sj.Error({
					log: true,
					origin: 'sj.Rule.checkRuleSet()',
					message: 'validation error',
					reason: `isRequired is not a boolean`,
					content: isRequired,
				});
			}
			// //OLD column
			// if (!sj.isType(column, 'string') | sj.isEmpty(column)){
			// 	throw new sj.Error({
			// 		log: true,
			// 		origin: 'sj.Rule.checkRuleSet()',
			// 		message: 'validation error',
			// 		reason: `column is not a string or is empty`,
			// 		content: column,
			// 	});
			// }
			
			if (!rule instanceof this) {
				throw new sj.Error({
					log: true,
					origin: 'sj.Rule.checkRuleSet()',
					message: 'validation error',
					reason: `rule is not an sj.Rule`,
					content: rule,
				});
			}
			if (!sj.isType(obj, Object)) {
				throw new sj.Error({
					log: true,
					origin: 'sj.Rule.checkRuleSet()',
					message: 'validation error',
					reason: `obj is not an object`,
					content: obj,
				});
			}
			if (isRequired && obj && !(propertyName in obj)) { //? shouldn't rule.check just catch this case as undefined?
				throw new sj.Error({
					log: true,
					origin: 'sj.Rule.checkRuleSet()',
					message: 'validation error',
					reason: `${propertyName} is not a property name of the passed object`,
					content: obj,
				});
			}

			//C if propertyName is required or is not required but has a value
			if (isRequired || (obj && !sj.isEmpty(obj[propertyName]))) {
				//C validate propertyName 
				let checked = await rule.check(obj[propertyName], against);
				
				//C pack into validated as	propertyName: {value: v, column: c}
				validated[propertyName] = sj.content(checked);
				//OLD validated[propertyName] = {column, value: sj.content(checked)};

				return checked;

				// //OLD
				// //C validate propertyNameerty, possibly modify obj[propertyName] if successful
				// //R the check has to specifically happen before the push to validated (not just storing to a ruleSet array) because the check can change the value or type of obj[propertyName] which could then create issues when the original is used in the where clause
				// let checked = await rule.check(obj[propertyName], against);
				// obj[propertyName] = sj.content(checked);
				// //C add value to validated
				// //! if rule.check() throws, this won't be pushed, but that doesn't matter because validated won't be returned if there is any error
				// validated.push({column: column, value: obj[propertyName]});
				// //C return the success message of rule.check()
				// //! this doesn't end up being returned from the function, but is here for maintainability
				// return checked;
				
			} else {
				//C don't pack into validated
				return new sj.Success({
					origin: 'sj.Rule.checkRuleSet()',
					message: `optional empty propertyName ${propertyName} skipped validation`,
				});
			}
		}).catch(rejected => {
			throw new sj.ErrorList({
				origin: 'sj.Rule.checkRuleSet()',
				message: 'one or more issues with rules',
				reason: 'validation functions returned one or more errors',
				content: rejected,
			});
		});

		return new sj.Success({
			origin: 'sj.Rule.checkRuleSet()',
			message: 'all rules validated',
			content: validated,
		});
	};
*/


//  ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
//  ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
//  ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
//  ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
//  ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/* TODO
	//TODO could these just return the base object since they don't need to deal with arrays? but what about keeping consistency with the logout function
	//TODO consider making a session object to hold these functions, server side and client side
*/

// CRUD
sj.login = async function (db, ctx, user) {
	//C validate
	user.name = await sj.User.schema.name.rule.check(user.name).then(sj.content);
	user.password = await sj.User.schema.password.rule.check(user.password).then(sj.content); //! this will error on stuff like 'password must be over x characters long' when really it should just be 'password incorrect', maybe just have a string check rule?

    //C get password
    let existingPassword = await db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).then(resolved => {
        return resolved.password;
    }).catch(rejected => {
        throw sj.parsePostgresError(rejected, new sj.Error({
            log: false,
            origin: 'login()',
            message: 'could not login, database error',
        }));
    });

    //C check password
    let isMatch = await bcrypt.compare(user.password, existingPassword).catch(rejected => {
        throw new sj.Error({
            log: true,
            origin: 'login()',
            message: 'server error',
            reason: 'hash compare failed',
            content: rejected,
            target: 'loginPassword',
            cssClass: 'inputError',
        });
    });
    if (!isMatch) {
        throw new sj.Error({
            log: true,
            origin: 'login()',
            message: 'incorrect password',
            target: 'loginPassword',
            cssClass: 'inputError',
        });
    }

    //C get user
    user = await db.one('SELECT * FROM "sj"."users_self" WHERE "name" = $1', user.name).catch(rejected => {
        throw sj.parsePostgresError(rejected, new sj.Error({
            log: false,
            origin: 'login()',
            message: 'could not login, database error',
        }));
    });

    ctx.session.user = new sj.User(user);
    return new sj.Success({
        origin: 'login()',
        message: 'user logged in',
        content: ctx.session.user,
    });
};
sj.getMe = async function (ctx) {
    await sj.isLoggedIn(ctx);
    return new sj.Success({
        origin: 'getMe()',
        content: ctx.session.user,
    });
};
sj.logout = async function (ctx) {
    delete ctx.session.user;
    return new sj.Success({
        origin: 'logout()',
        message: 'user logged out',
    });
};

// util
sj.isLoggedIn = async function (ctx) {
    if (!sj.isType(ctx.session.user, sj.User) || !sj.isType(ctx.session.user.id, 'integer')) {
        throw new sj.Error({
            log: true,
            origin: 'isLoggedIn()',
            code: 403,
        
            message: 'you must be logged in to do this',
            reason: 'user is not logged in',
            target: 'notify',
            cssClass: 'notifyError', // TODO consider denial error rather than error error (you messed up vs I messed up)
        });
    }
    //C redundancy check to make sure id is right format
    await sj.Rule.checkRuleSet([
        [true, 'id', sj.Rule.id, ctx.session.user, 'id'],
    ]);

    //TODO this doesn't check if the user exists however, though wouldn't this be expensive? searching the database everytime the user wants to know if they're logged in, (every page)

    return new sj.Success({
        origin: 'isLoggedIn()',
        message: 'user is logged in',
    });
};


//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝

/* TODO
    userNameRules has userName input field ids, this wont target them because they wont exist (//? why?) - find a fix for this or maybe just send unfound DOM notices to the general notice by default?
    
    //TODO ensure that password is not being returned here (no matter the view/permission), remember to use views in all CRUD functions, not just the tables
*/

// CRUD
(function () {
	this.addPrepare = 
	this.editPrepare = async function (t, user) {
		let newUser = Object.assign([], user);

		//C hash password
		//TODO might be a vulnerability here with this string check
		if (sj.isType(newUser.password, String)) newUser.password = await bcrypt.hash(newUser.password, saltRounds).catch(rejected => {
			throw new sj.Error({
				log: true,
				origin: 'sj.User.add()',
				message: 'failed to add user',
				reason: 'hash failed',
				content: rejected,
			});
		});

		return newUser;
	};

	this.queryOrder = 'ORDER BY "id" ASC';

	/* //OLD get
		//R logic for getUserById, getUserByName, getUserByEmail would have to exist elsewhere anyways if not in this function, so might as well just put it here and handle all combination cases
		//R there also isn't a good enough reason for handling an edge case where some input properties may be incorrect and others are correct, making a system to figure out which entry to return would never be useful (unless some advanced search system is implemented) and may actually hide errors
		//R for all get functions, setup optional parameters for each unique key combination (id, containerId & otherUniqueParam, etc.)

		let where = await sj.checkAndBuild([
			['id', sj.Rule.id, user, 'id'],
			['name', sj.Rule.userName, user, 'name'],
			//! don't query email because that is not visible to users_public (maybe allow it once permissions are implemented?)
			//TODO expand properties
		]);

		//L use where clause as raw: https://github.com/vitaly-t/pg-promise#raw-text
		let users = db.any('SELECT * FROM "sj"."users_public" $1:raw', where).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
					origin: 'getUser()',
					message: 'could not get user',
					target: 'notify',
					cssClass: 'notifyError',
			}));
		});

		//C cast
		//! requires that table names are the same as object property names
		users.forEach(item => {
			item = new sj.User(item);
		});
		
		return users;
	*/
	/* //OLD remove
		await sj.isLoggedIn(ctx);

		await sj.Rule.checkRuleSet([
			[sj.Rule.password, user, 'password'],
		]);

		return db.one('SELECT password FROM "sj"."users_self" WHERE "id" = $1', [ctx.session.user.id]).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: 'removeUser()',
				message: 'could not remove user',
				target: 'notify',
				cssClass: 'notifyError',
			}));
		}).then(resolved => {
			return bcrypt.compare(user.password, resolved.password).catch(rejected => {
				throw new sj.Error({
					log: true,
					origin: 'removeUser()',
					message: 'server error',
					reason: 'hash compare failed',
					content: rejected,
					target: 'loginPassword',
					cssClass: 'inputError',
				});
			});
		}).then(resolved => {
			if (resolved) {
				return db.none('DELETE FROM "sj"."users" WHERE "id" = $1', [ctx.session.user.id]).catch(rejected => {
					throw sj.parsePostgresError(rejected, new sj.Error({
						log: false,
						origin: 'removeUser()',
						message: 'could not remove user',
						target: 'notify',
						cssClass: 'notifyError',
					}));
				});
			} else {
				throw new sj.Error({
					log: true,
					origin: 'removeUser()',
					message: 'incorrect password',
					target: 'removeUserPassword',
					cssClass: 'inputError',
				});
			}
		}).then(resolved => {
			//C resolve logout() rejection - the user is still removed even if logout fails (which it shouldn't), the user doesn't need to know this
			return logout().catch(sj.andResolve);     
		}).then(resolved => {
			return new sj.Success({
				log: true,
				origin: 'removeUser()',
				message: `user ${user.name} removed`,
			});
		}).catch(rejected => {
			throw propagateError(rejected);
		});
	*/
}).call(sj.User);


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   

// CRUD
(function () {
	this.queryOrder = 'ORDER BY "userId" ASC, "id" ASC';

	/* //OLD add
		await sj.isLoggedIn(ctx);

		await sj.Rule.checkRuleSet([
			[sj.Rule.playlistName, playlist, 'name'],
			[sj.Rule.visibility, playlist, 'visibility'],
			[sj.Rule.description, playlist, 'description'],
			[sj.Rule.image, playlist, 'image'],
			[sj.Rule.color, playlist, 'color'],
		]);

		return db.none('INSERT INTO "sj"."playlists" ("userId", "name", "description", "visibility", "image", "color") VALUES ($1, $2, $3, $4, $5, $6)', [ctx.session.user.id, playlist.name, playlist.description, playlist.visibility, playlist.image, playlist.color]).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: 'addPlaylist()',
				message: 'failed to add playlist, database error',
				target: 'notify',
				cssClass: 'notifyError',
			}));
		}).then (resolved => {
			return new sj.Success({
				log: true,
				origin: 'addPlaylist()',
				message: `${playlist.name} added`,
				cssClass: 'notifySuccess',
				content: playlist,
			});
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	*/
	/* //OLD get
		//C build where
		let where = await sj.checkAndBuild([
			['id', sj.Rule.id, playlist, 'id'],
			['userId', sj.Rule.id, playlist, 'userId'],
			['name', sj.Rule.playlistName, playlist, 'name'],
		]);

		//C query
		let playlists = await db.any('SELECT * FROM "sj"."playlists" $1:raw', where).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: 'sj.Playlist.get()',
				message: 'could not get playlist, database error',
				target: 'notify',
				cssClass: 'notifyError',
			}));
		});

		//C cast
		playlists.forEach(item => {
			item = new sj.Playlist(item);
		});


		playlists = await Promise.all(playlists.map(async item => {
			//C get tracks
			item.content = sj.Track.get(ctx, new sj.Track({playlistId: item.id})).catch(rejected => {   
				//TODO warning
				console.warn('getPlaylist() succeeded, but a getTrack() failed')
				return propagateError(rejected); //! returned, not thrown
			});

			// await db.any(`SELECT * FROM "sj"."tracks" WHERE "playlistId" = $1`, item.id).catch(rejected => {  
			//     throw sj.parsePostgresError(rejected, new sj.Error({
			//         log: false,
			//         origin: 'getPlaylist() tracks query',
			//         message: 'could not get playlist, database error',
			//         target: 'notify',
			//         cssClass: 'notifyError',
			//     }));
			// });

			return item;
		})).catch(rejected => {
			throw sj.propagate(rejected);
		});


		return playlists;
	*/
	/* //OLD remove
		await sj.isLoggedIn(ctx);

		playlist = await sj.Playlist.get(ctx, playlist);

		await sj.Rule.checkRuleSet([
			[sj.Rule.id, playlist, 'id'],
			[sj.Rule.self, playlist, 'userId', ctx.session.user.id],
		]);
		
		return db.none('DELETE FROM "sj"."playlists" WHERE "id" = $1', [playlist.id]).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: 'removePlaylist()',
				message: 'could not remove playlist, database error',
				target: 'notify',
				cssClass: 'notifyError',
			}));
		}).then(resolved => {
			return new sj.Success({
				log: true,
				origin: 'removePlaylist()',
				message: 'playlist removed',
				target: 'notify',
				cssClass: 'notify success',
			});
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	*/
}).call(sj.Playlist);


//  ████████╗██████╗  █████╗  ██████╗██╗  ██╗
//  ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//     ██║   ██████╔╝███████║██║     █████╔╝ 
//     ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ 
//     ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
//     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝

// CRUD
(function () {
	this.addBefore = 
	this.getBefore = 
	this.editBefore = 
	this.removeBefore = async function (t, entities) {
		let newEntities = entities.slice();
		newEntities.forEach(entity => {
			entity.source = sj.isType(entity.source, Object) && sj.isType(entity.source.name, String)
			? entity.source.name
			: undefined;
		});
		return newEntities;
	};
	this.addPrepare = async function (t, track) {
		let newTrack = Object.assign({}, track);
		let existingTracks = await sj.Track.get({playlistId: newTrack.playlistId}, t).then(sj.content);
		newTrack.position = existingTracks.length;
		return newTrack;
	};

	this.queryOrder = 'ORDER BY "playlistId" ASC, "position" ASC';

	this.addAccommodate = 
	this.editAccommodate =
	this.removeAccommodate = async function (t, tracks) {
		await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: 'sj.Track.move()',
				message: 'could not order tracks, database error',
				target: 'notify',
				cssClass: 'notifyError',
			}));
		});
		return await this.order(t, tracks).then(sj.content).catch(sj.propagate);
	};

	this.addAfter =
	this.getAfter =
	this.editAfter = 
	this.deleteAfter = async function (t, entities) {
		let newEntities = entities.slice();
		newEntities.forEach(entity => {
			entity.source = sj.sourceList.find(source => source.name === entity.source);
		});
		return newEntities;
	};


	/* //OLD
		this.addBefore = async function (t, tracks, accessory) {
			//C get playlist lengths
			//! //R playlist lengths cannot be retrieved inside the same asyncForEach() iterator that INSERTS them because they are executed in parallel (all getTracks() calls will happen before insertions), resulting in all existingTracks images being exactly the same, resulting in track.position collision
			//console.log('CALLED');

			let lengths = {};
			await sj.asyncForEach(tracks, async track => {
				let existingTracks = await sj.Track.get(t, new sj.Track({playlistId: track.playlistId})).then(sj.content);
				lengths[track.playlistId] = existingTracks.length;
			});

			accessory.lengths = lengths;
		};
	*/
	/* //OLD
		this.addAfter = async function (t, results, {entities: tracks}) {
			//R moveTracks() cannot be done before INSERT (as in editTracks()) because the tracks don't exist yet, and the input tracks do not have their own id properties yet. the result tracks of the INSERT operation cannot be used for moveTracks() as they only have their current positions, so the result ids and input positions need to be combined for use in moveTracks(), but we don't want to position tracks don't have a custom position (1 to reduce cost, 2 to maintain the behavior of being added to the end of the list (if say n later tracks are positioned ahead of m former tracks, those m former tracks will end up being n positions from the end - not at the very end). so:

			//C for tracks with a custom position, give the input tracks their result ids and the result tracks their custom positions
			//! requires the INSERT command to be executed one at at a time for each input track
			//R there is no way to pair input tracks with their output rows based on data because tracks have no unique properties (aside from the automatically assigned id), but because the INSERT statements are executed one at a time, the returned array is guaranteed to be in the same order as the input array, therefore we can use this to pair tracks

			//----------- //! i said up here that the tracks would be inserted one at a time (in order), how is this true when using asyncForEach?
			tracks.forEach((track, i) => {
				if(!sj.isEmpty(track.position)) {
					track.id = results[i].id;
					results[i].position = track.position;
				}
			});

			//C use the input tracks to properly order
			await sj.Track.move(t, tracks);

			return results;
		};
		this.editBefore = async function (t, tracks) {
			//C move before editing other data, so that final position may be accurate in returned results 
			//TODO but if returned results are retrieved after the move, then this can be editAfter

			//! results will not include other tracks moved by moveTracks()
			await sj.Track.move(t, tracks);
			return undefined;
		};
		this.removeAfter = async function (t, results, {entities: tracks}) {
			//C order after deleting
			await sj.Track.order(t, results); //TODO //? will this modify results? i dont think so, i think results needs to = sj.Track.order(), no this is just to order the database
			return results;
		};
	*/
	/* //OLD add
		//await sj.isLoggedIn(ctx);

		//C retrieve playlist
		let playlist = await sj.Playlist.get(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
			throw sj.propagate(rejected);
		});
		//C add track position //! playlist.content.length is accurate because the getPlaylist() orders the playlist
		
		track.position = playlist.content.length;

		await sj.Rule.checkRuleSet([
			[sj.Rule.self, ctx.session.user, 'id', playlist.userId],
			[sj.Rule.id, track, 'playlistId'],
			[sj.Rule.posInt, track, 'position'],
			[sj.Rule.source, track, 'source'],
			[sj.Rule.sourceId, track, 'sourceId'],
			[sj.Rule.trackName, track, 'name'],
			[sj.Rule.posInt, track, 'duration'],
			//TODO validation for arrays (requires nested type checks, and possibly multiple valid types in sj.Rule)
		]); 
		
			// var errorList = new sj.Error({
			//     origin: 'addPlaylist()',
			//     message: 'one or more issues with fields',
			//     reason: 'validation functions returned one or more errors',
			// });
			// track.playlistId = await sj.Rule.id.check(track.playlistId).catch(rejected => {
			//     errorList.content.push(rejected);
			//     return rejected.content;
			// });
			// track.position = await sj.Rule.posInt.check(track.position).catch(rejected => {
			//     errorList.content.push(rejected);
			//     return rejected.content;
			// });
			// track.source = await sj.Rule.source.check(track.source).catch(rejected => {
			//     errorList.content.push(rejected);
			//     return rejected.content;
			// });
			// track.sourceId = await sj.Rule.sourceId.check(track.sourceId).catch(rejected => {
			//     errorList.content.push(rejected);
			//     return rejected.content;
			// });
			// track.name = await sj.Rule.trackName.check(track.name).catch(rejected => {
			//     errorList.content.push(rejected);
			//     return rejected.content;
			// });
			// track.duration = await sj.Rule.posInt.check(track.duration).catch(rejected => {
			//     errorList.content.push(rejected);
			//     return rejected.content;
			// });
			// //TODO validation for arrays (requires nested type checks, and possibly multiple valid types in sj.Rule)
			// if (!(errorList.content.length === 0)) {
			//     errorList.announce();
			//     throw errorList;
			// }
		

		//! artists is simply stored as an array, eg. TEXT[]
		return db.none('INSERT INTO "sj"."tracks" ("playlistId", "position", "source", "sourceId", "name", "duration", "artists") VALUES ($1, $2, $3, $4, $5, $6, $7)', [track.playlistId, track.position, track.source, track.sourceId, track.name, track.duration, track.artists]).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
				origin: 'addTrack()',
				message: 'could not add track, database error',
				target: 'notify',
				cssClass: 'notifyError',
			}));
		}).then(resolved => {
			return sj.orderPlaylist(new sj.Playlist({id: track.playlistId})).catch(rejected => {
				throw sj.parsePostgresError(rejected, new sj.Error({
					log: false,
					origin: 'addTrack()',
					message: 'could not order playlist, database error',
					target: 'notify',
					cssClass: 'notifyError',
				}));
			});
		}).then(resolved => {
			return new sj.Success({
				log: true,
				origin: 'addTrack()',
				target: 'notify',
				cssClass: 'notifySuccess',
				content: track,
			});
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	*/
	/* //OLD get
		//C build where
		let where = await sj.checkAndBuild([
			['id', sj.Rule.id, track, 'id'],
			['playlistId', sj.Rule.id, track, 'playlistId'],
			['position', sj.Rule.posInt, track, 'position'],
		]);

		//C query
		let tracks = await db.any('SELECT * FROM "sj"."tracks" $1:raw', where).catch(rejected => {
			throw sj.parsePostgresError(rejected, new sj.Error({
				log: false,
					origin: 'getTrack()',
					message: 'could not get track',
					target: 'notify',
					cssClass: 'notifyError',
			}));
		});

		//C cast
		tracks.forEach(item => {
			item = new sj.Track(item);
		});

		return tracks;
	*/
	/* //OLD (from getPlaylist() ?) //! do not order tracks here because these will not always be an entire playlist
		//C check and fix order
		for (let i = 0; i < tracks.length; i++) {
			if (tracks[i].position !== i) {
				tracks = await sj.orderPlaylist
			}
		}


		for (let i = 0; i < item.content.length; i++) {
			if (item.content[i].position !== i) {
				//C if not, order them
				item = await sj.orderPlaylist(item).catch(rejected => {
					throw sj.parsePostgresError(rejected, new sj.Error({
						log: false,
						origin: 'getPlaylist()',
						message: 'could not order playlist, database error',
						target: 'notify',
						cssClass: 'notifyError',
					}));
				});
				break;
			}
		}
	*/
	//! deletion will return the removed row, however this will still (eventually) have visibility limitations and should not be used to restore data
	/* //OLD remove
		//! requires an sj.Track with playlistId and position properties

		await sj.isLoggedIn(ctx);

		await sj.Rule.checkRuleSet([
			[sj.Rule.id, track, 'playlistId'],
			[sj.Rule.posInt, track, 'position'],
		]);

		
		// `
		// SELECT * 
		// FROM "sj"."playlists" 
		// JOIN "sj"."tracks" 
		// ON "sj"."playlists"."id" = "sj"."tracks"."playlistId" 
		// WHERE "sj"."tracks"."id" = $1`
		
		
		//C retrieve playlist
		let playlist = await sj.Playlist.get(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
			throw sj.propagate(rejected);
		});

		//TODO change this to just id based
		await sj.Rule.checkRuleSet([
			[sj.Rule.self, playlist, 'userId', ctx.session.userId],
		]);

		//TODO check to make sure it exists (like removePlaylist has getPlaylist)

		return db.none('DELETE FROM "sj"."tracks" WHERE "playlistId" = $1 AND "position" = $2', [parseInt(track.playlistId), parseInt(track.position)]).catch(rejected => {
			throw sj.parsePostgresError({
				log: true,
				origin: 'removeTrack()',
				message: 'failed to remove track, database error',
				target: 'notify',
				cssClass: 'notifyError',
			});
		}).then(resolved => {
			return sj.orderPlaylist(new sj.Playlist({id: track.playlistId})).catch(rejected => {
				throw sj.parsePostgresError(rejected, new sj.Error({
					log: false,
					origin: 'removeTrack()',
					message: 'could not order playlist, database error',
					target: 'notify',
					cssClass: 'notifyError',
				}));
			});
		}).then(resolved => {
			return new sj.Success({
				log: false,
				origin: 'removeTrack()',
				content: track,
				target: 'notify',
				cssClass: 'notifySuccess', 
			});
		}).catch(rejected => {
			throw sj.propagate(rejected);
		});
	*/
}).call(sj.Track);

// utility
(function () {
	this.order = async function (db, tracks) {
		//C takes a list of tracks with possibly modified positions and playlistIds
		//C modifies the input tracks' positions if needed (for an INSERT, UPDATE, or DELETE query)
		//C returns a list of OTHER tracks with modified positions if needed (for an additional UPDATE query)
		//G set track.position = null on all tracks that are to be removed
		//! input track properties must be validated at this point
		//C out-of-bounds positions will be positioned at the start or end of the playlist
		//C duplicate positions will be in order of input order
		//C overlapping positions will be be in order of input position, this will only be caused by other track's out-of-bounds or duplicate positions

		//C filter out tracks without an id and position or playlistId
		let inputTracks = tracks.filter(track => !sj.isEmpty(track.id) && (!sj.isEmpty(track.position) || !sj.isEmpty(track.playlistId)));
		//C filter out duplicate tracks (by id, keeping last), by filtering for tracks where every track after does not have the same id
		inputTracks = inputTracks.filter((track, index, self) => self.slice(index+1).every(trackAfter => track.id !== trackAfter.id));

		//C return early if none are moving
		if (inputTracks.length === 0) {
			return new sj.SuccessList({
				origin: 'sj.Track.order()',
				message: 'track positions did not need to be set',
			});
		}

		console.log('inputTracks.length:', inputTracks.length, '\n ---');

		return await db.tx(async t => {
			let playlists = [];
			let inputIndex = Symbol();
			let influencedTracks = [];

			//C retrieve track's playlist, group each track by playlist & moveType
			await sj.asyncForEach(inputTracks, async (track, index) => {
				//C temporarily store inputIndex, this is needed because the input order is destroyed when tracks are grouped into playlists and moveType
				track[inputIndex] = index;

				//C retrieve own playlist or playlist track is being moved to
				let where = `
					SELECT "id", "position", "playlistId"
					FROM "sj"."tracks" 
					WHERE "playlistId" = 
				`;
				let identifier;
				if (sj.isEmpty(track.playlistId)) {
					where += `(
						SELECT "playlistId"
						FROM "sj"."tracks"
						WHERE "id" = $1
					)`;
					identifier = track.id;
				} else {
					where += `$1`;
					identifier = track.playlistId;
				}

				//C get track's current playlist based on track.id, using a sub-query
				//L sub-query = vs IN: https://stackoverflow.com/questions/13741582/differences-between-equal-sign-and-in-with-subquery
				let retrievedPlaylist = await t.any(where, identifier).catch(rejected => {
					throw sj.parsePostgresError(rejected, new sj.Error({
						log: false,
						origin: 'sj.Track.editIntermediate()',
						message: 'could not move tracks',
					}));
				});

				//C playlist should not be empty
				if (retrievedPlaylist.length === 0) {
					throw new sj.Error({
						origin: 'sj.Track.editIntermediate()',
						message: 'failed to move tracks',
						reason: `the playlist retrieved by this track's id returned no rows, there must be an error with the query command`,
					});
				}

				console.log('retrievedPlaylist.length:', retrievedPlaylist.length, '\n ---');

				//C store and strip playlistId from retrieved tracks
				//! this is done so that only modified properties will remain on the track objects
				let playlistId = retrievedPlaylist[0].playlistId;
				retrievedPlaylist.forEach(retrievedTrack => {
					delete retrievedTrack.playlistId;
				});

				//C group tracks by playlist and their movement type
				let group = function (moveType, id) {
					let exists = false;
					playlists.forEach(playlist => {
						if (playlist.id === id) {
							//C if the playlist is already stored, push this track
							playlist[moveType].push(track);
							exists = true;
						}
					});
					if (!exists) {
						//C if the playlist isn't stored yet, push a new one with the track
						let newPlaylist = {
							id: playlistId,

							original: retrievedPlaylist,

							// actions
							inputsToRemove: [],
							inputsToAdd: [],
							inputsToMove: [],
						};
						newPlaylist[moveType].push(track);
						playlists.push(newPlaylist);
					}
				}
				if (track.position === null) { 
					//! position should manually be set to null before calling this function, this keeps all other numbers as viable positions for ordering
					//C if track is specifically marked to be removed
					group('inputsToRemove', playlistId);
				} else if (track.playlistId === undefined || track.playlistId === playlistId) {
					//C if track is moving within the same playlist
					group('inputsToMove', playlistId);
				} else {
					//C else if the track is moving from one playlist to another
					//C this will catch tracks that have a playlistId, but no position
					group('inputsToRemove', playlistId);
					group('inputsToAdd', track.playlistId);
				}

				return new sj.Success({
					origin: 'sj.Track.editIntermediate() - movingTracks iterator',
					message: "retrieved track's playlist",
				});
			}).catch(rejected => {
				throw new sj.ErrorList({
					origin: 'sj.Track.editIntermediate() - movingTracks iterator',
					message: `could not retrieve some track's playlist`,
					content: rejected,
				});
			});

			console.log('playlists.length:', playlists.length, '\n ---');

			//C calculate new track positions required to accommodate input tracks' positions
			playlists.forEach(playlist => {
				//C populate others with tracks in original that are not in inputsTo Add, Remove, or Move
				//! inputsToRemove can be ignored from this point on, these tracks aren't included in others and wont be added to the final ordered list
				playlist.others = playlist.original.filter(originalTrack => 
					!playlist.inputsToAdd.some(addingTrack => addingTrack.id === originalTrack.id) &&
					!playlist.inputsToRemove.some(trackToRemove => trackToRemove.id === originalTrack.id) &&
					!playlist.inputsToMove.some(movingTrack => movingTrack.id === originalTrack.id)
				);

				console.log('playlist.others.length:', playlist.others.length);

				//C combine both adding and moving, 
				playlist.inputsToPosition = [...playlist.inputsToAdd, ...playlist.inputsToMove];
				//C give tracks with no position an Infinite position so they get added to the bottom of the playlist
				playlist.inputsToPosition.forEach(trackToPosition => {
					if (!sj.isType(trackToPosition.position, Number)) {
						trackToPosition.position === Infinity;
					}
				});


				//C sort
				sj.stableSort(playlist.others, (a, b) => a.position - b.position);
				//C stable sort by inputIndex then position to resolve clashes by position then inputIndex
				sj.stableSort(playlist.inputsToPosition, (a, b) => a[inputIndex] - b[inputIndex]);
				sj.stableSort(playlist.inputsToPosition, (a, b) => a.position - b.position);

				console.log('playlist.inputsToAdd.length:', playlist.inputsToAdd.length);
				console.log('playlist.inputsToRemove.length:', playlist.inputsToRemove.length);
				console.log('playlist.inputsToMove.length:', playlist.inputsToMove.length, '\n ---');
				console.log('playlist.inputsToPosition.length:', playlist.inputsToPosition.length, '\n ---');
				

				//C inputIndex is no longer needed, remove it from anything it was added to
				playlist.inputsToPosition.forEach(trackToPosition => {
					//remove trackToPosition[inputIndex]; //TODO temp
				});
				playlist.inputsToRemove.forEach(trackToRemove => {
					//remove trackToRemove[inputIndex]; //TODO temp
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

				console.log('playlist.merged.length:', playlist.merged.length);
				console.log('playlist.merged:\n', playlist.merged, '\n ---');

				console.log('playlist.influenced.length:', playlist.influenced.length);
				console.log('playlist.influenced:\n', playlist.influenced, '\n ---');

				influencedTracks.push(...playlist.influenced);
			});

			return new sj.SuccessList({
				origin: 'sj.Track.order()',
				message: 'influenced tracks calculated',
				content: influencedTracks,
			});
		});
	};

	/* //OLD

		//! moveTracks() and orderTracks() have similar ordering and updating parts
		async move(db, tracks) {
			//C takes a list of tracks with id and position, returns a list of playlists that were modified
			tracks = sj.any(tracks);

			//  //R
			// 	if any tracks have position set,
			// 		do the move function
			// 		order
			// 	after deleting tracks
			// 		order
		
		
			// 	idea: get the tracklist, then do the moving and ordering outside, at the same time - then update all at once
			// 	the fetched array won't have holes in it, just the position numbers (which is good?)
		
			// 	//R initial idea wrong: 
			// 	tracks must be in order of their positions for the move to be applied properly (ie tracks with positions: 3, 4, 5 will all be inserted inbetween tracks 2 and 3) - updating in the order 5, 4, 3 would result in later tracks pushing the already placed tracks down (so their positions end up being 7, 5, 3)
			// 	it needs to go in decending order because of the nature of how the move function works - affecting only tracks below it
		
		
			// 	//R wrong, because this done simultaneously (not in sequence) it will separate adjacent inserted positions (0i, 1i) will insert into a full list (o) as (0i, 0o, 1i, 1o), doing this in sequence would require reordering (updating of new positions) the tracks after each insert (might be resource intensive)
			// 	get input
			// 		stable sort by position
			// 	get tracks
			// 		stable sort by position
			// 		prepend item with position -Infinity
			// 		append item with position Infinity
		
			// 	for each input (in reverse order, so that inputs with same positions do not get their order reversed)
			// 		find where position is greater than i.position and less than or equal to i+1.position
			// 		splice(i+1, 0, input)
				
		
			// 	final idea: 
			// 		get the existing list, remove tracks to be inserted
			// 		sort each list
			// 		for the length of the combined lists, for integers 0 to length
			// 			if there is a track in the input list at (or less than) the index - push the next one
			// 			else push the next track in the existing list
			// 		if there are any remaining tracks in the input list (for example a big hole that makes the last few tracks larger than the sum of both lists), push them in order to the end of the list
			// 		lastly do a order to remove duplicates and holes
		
			// 		this essentially 'fills' the existing tracks around the set positions of the input tracks
			
			//C remove tracks without an id or position, define a new array so original is not modified
			let movingTracks = tracks.filter(item => !(sj.isEmpty(item.id) || sj.isEmpty(item.position)));
			//C remove duplicates (keeping last), by filtering for items where every item after does not have the same id
			movingTracks = movingTracks.filter((item, index, self) => self.slice(index+1).every(itemAfter => item.id !== itemAfter.id));
		
			//C return early if none are being re-positioned
			if (movingTracks.length === 0) {
				return new sj.Success({
					origin: 'sj.Track.move()',
					message: 'track positions did not need to be set',
				});
			}
		
		
			return await db.tx(async t => {
				//  //C list of playlists
				// 	//C it is possible to move tracks from two different playlists at the same time (follows the behavior of editTrack())
		
				// 	//C format
				// 	{
				// 		id: 4,
				// 		all: [],
				// 		moving: [],
				// 		notMoving: [],
				// 		merged: [],
				// 	}
					
				// 	//R playlist.all is required (instead of just sorting into moving and notMoving) because each track is processed individually, each moving track's notMoving list will likely include another moving track in the same playlist
				// 
				let playlists = [];
				
				//C populate .all and .moving
				//! because a new item is not always being added to playlists, we cant simply set playlists to the result of asyncForEach(), just throw an error list if anything failed
				await sj.asyncForEach(movingTracks, async track => {
					//C validate
					track.id = await sj.Rule.id.check(track.id).then(sj.content);
					track.position = await sj.Rule.posInt.check(track.position).then(sj.content);
		
					//C get track's playlist based on track.id, using a sub-query
					//L sub-query = vs IN: https://stackoverflow.com/questions/13741582/differences-between-equal-sign-and-in-with-subquery
					let playlist = await t.any(`
						SELECT "id", "position", "playlistId"
						FROM "sj"."tracks" 
						WHERE "playlistId" = (
							SELECT "playlistId"
							FROM "sj"."tracks"
							WHERE "id" = $1
						) 
					`, track.id).catch(rejected => {
						throw sj.parsePostgresError(rejected, new sj.Error({
							log: false,
							origin: 'sj.Track.move()',
							message: 'could not move tracks',
						}));
					});
		
					//C playlist should not be empty
					if (playlist.length === 0) {
						throw new sj.Error({
							origin: 'sj.Track.move()',
							message: 'failed to move tracks',
							reason: `the playlist retrieved by this track's id returned no rows, there must be an error with the query command`,
						});
					}
		
					//C add playlistId to track, but dont change the position property, playlist should include the track used to select it
					track.playlistId = sj.one(playlist.filter(item => item.id === track.id)).playlistId;
		
					if (playlists.every(item => {
						if (item.id !== track.playlistId) {
							return true;
						} else {
							//C if a playlist does match the current track, just push the moving track
							item.moving.push(track);
							return false;
						}
					})) {
						//C if every playlist does not match the current track, store it with its all tracks and its moving track
						playlists.push({
							id: track.playlistId,
							all: playlist,
							moving: [track],
							notMoving: [],
							merged: [],
						});
					}
		
					return new sj.Success({
						origin: 'sj.Track.move()',
						message: "retrieved track's playlist",
					});
				}).catch(rejected => {
					throw new sj.ErrorList({
						log: true,
						origin: 'sj.Track.move()',
						message: `could not retrieve some track's playlist`,
						content: rejected,
					})
				});
		
				//C populate .notMoving, specifically after all moving tracks are sorted into their playlists
				playlists.forEach(playlist => {
					//C filter playlist.all for tracks where their id does not equal the id of any track in the playlist.moving
					playlist.notMoving = playlist.all.filter(allTrack => playlist.moving.every(movingTrack => allTrack.id !== movingTrack.id));
				});
		
		
				//C combine, sort, and update
				playlists = await sj.asyncForEach(playlists, async playlist => {
					//C sort both
					sj.stableSort(playlist.moving, (a, b) => a.position - b.position);
					sj.stableSort(playlist.notMoving, (a, b) => a.position - b.position);
		
					//C combine, fills nonMoving tracks around moving tracks
					//! do not use moving.length + notMoving.length here because these arrays are being changed themselves
					for (let i = 0; i < playlist.all.length; i++) { 
						if (playlist.moving.length > 0 && playlist.moving[0].position <= i) {
							//C if the next moving track's position is at (or before, in the case of a duplicated position) the current index, transfer it to the merged list (this will handle negative and duplicate positions)
							playlist.merged.push(playlist.moving.shift());
						} else {
							//C if not, transfer the next notMoving track, as long as there are still some left (this will happen if any moving tracks have a position larger than the sum of both lists, they will need to be appended to the end after)
							if (playlist.notMoving.length > 0) {
								playlist.merged.push(playlist.notMoving.shift());
							}
						}
					}
		
					//C append leftover moving tracks
					//L .push() and spread: https://stackoverflow.com/questions/1374126/how-to-extend-an-existing-javascript-array-with-another-array-without-creating
					playlist.merged.push(...playlist.moving);
		
					//C order (removes duplicates and holes)
					playlist.merged.forEach((item, index) => {
						item.position = index;
					});
					
		
					//C format update cases so updates can be done in one query
					let cases = playlist.merged.map(item => pgp.as.format(`WHEN $1 THEN $2`, [item.id, item.position]));
					cases = cases.join(' ');
					
		
					//C defer constraints (unique) on track position
					//L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
					//L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
					//L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
					await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
						throw sj.parsePostgresError(rejected, new sj.Error({
							log: false,
							origin: 'sj.Track.move()',
							message: 'could not order tracks, database error',
							target: 'notify',
							cssClass: 'notifyError',
						}));
					});
		
					//C update
					let rows = await t.many(`
						UPDATE "sj"."tracks"
						SET "position" = CASE "id"
							$1:raw
							ELSE "position"
							END
						WHERE "playlistId" = $2
						RETURNING *
					`, [cases, playlist.id]).catch(rejected => {
						throw sj.parsePostgresError(rejected, new sj.Error({
							log: false,
							origin: 'sj.Track.move()',
							message: 'could not move tracks',
							target: 'notify',
							cssClass: 'notifyError',
						}));
					});
		
					//C cast
					rows.forEach(item => {
						item = new sj.Track(item);
					});
		
					return new sj.Playlist({
						origin: 'sj.Track.move()',
						id: playlist.id,
						content: rows,
					});
				}).catch(rejected => {
					throw new sj.ErrorList({
						log: true,
						origin: 'sj.Track.move()',
						message: 'failed to move tracks',
						content: rejected,
					});
				});
				
				//C will return a list of playlists that were updated (however will return this playlist even if a track was set to the same position it already was)
				return new sj.SuccessList({
					origin: 'sj.Track.move()',
					message: 'moved tracks',
					content: playlists,
				});
			}).catch(sj.propagate);
		},
		async order(db, tracks) {
			//C takes a list of tracks with playlistId, returns a list of playlists affected by the sort

			//R there is a recursive loop hazard in here (basically if sj.Track.get() is the function that calls sj.Track.order() - sj.Track.order() itself needs to call sj.Track.get(), therefore a loop), however if everything BUT sj.Track.get() calls sj.Track.order(), then sj.Track.order() can safely call sj.Track.get(), no, the same thing happens with sj.Track.edit() - so just include manual queries, no have it so: sj.Track.get() doesn't use either moveTracks() or orderTracks(), these two methods are then free to use sj.Track.get(), and then have each use their own manual update queries - basically add, edit, remove can use these and sj.Track.get() but not each other - this is written down in that paper chart

			tracks = sj.any(tracks);

			let playlistIds = [];
			await sj.asyncForEach(tracks, async (track, index, self) => {
				//C filter for unique playlist ids
				if (self.slice(index+1).every(itemAfter => track.playlistId !== itemAfter.playlistId)) {
					//C validate
					let id = await sj.Rule.id.check(track.playlistId).then(sj.content);
					playlistIds.push(id);
				}
				return;
			}).catch(rejected => {
				throw new sj.ErrorList({
					log: true,
					origin: 'sj.Track.order()',
					message: 'validation issues with track playlistIds',
					content: rejected,
				});
			});

			return await db.tx(async t => {
				return await sj.asyncForEach(playlistIds, async playlistId => {
					//C get
					//let playlist = await sj.Track.get(t, new sj.Track({playlistId: playlistId}));
					let playlist = await sj.Track.get(t, new sj.Track({playlistId: playlistId})).then(sj.content);

					//C early return if playlist is empty (will happen if an entire playlist is removed)
					if (playlist.length <= 0) {
						return new sj.Playlist({
							origin: 'sj.Track.order()',
							id: playlistId,
							message: 'this playlist no longer has any tracks',
							content: [],
						});
					}

					//C sort
					sj.stableSort(playlist, (a, b) => a.position - b.position);

					//C order
					playlist.forEach((track, index) => {
						track.position = index;
					});

					//C format cases, //! playlist should not be empty at this point
					cases = playlist.map(track => pgp.as.format(`WHEN $1 THEN $2`, [track.id, track.position]));
					cases = cases.join(' ');

					//C defer constraints
					await t.none(`SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED`).catch(rejected => {
						throw sj.parsePostgresError(rejected, new sj.Error({
							log: false,
							origin: 'sj.Track.order()',
							message: 'could not order tracks, database error',
							target: 'notify',
							cssClass: 'notifyError',
						}));
					});

					//C update
					let rows = await t.many(`
						UPDATE "sj"."tracks"
						SET "position" = CASE "id"
							$1:raw
							ELSE "position"
							END
						WHERE "playlistId" = $2
						RETURNING *
					`, [cases, playlistId]).catch(rejected => {
						throw sj.parsePostgresError(rejected, new sj.Error({
							log: false,
							origin: 'sj.Track.order()',
							message: 'could not move tracks',
							target: 'notify',
							cssClass: 'notifyError',
						}));
					});

					//C cast
					rows.forEach(item => {
						item = new sj.Track(item);
					});
					
					return new sj.Playlist({
						origin: 'sj.Track.order()',
						id: playlistId,
						content: rows,
					});
				}).catch(rejected => {
					throw new sj.ErrorList({
						log: true,
						origin: 'sj.Track.order()',
						message: 'failed to order tracks',
						content: rejected,
					});
				});
			}).catch(sj.propagate);
		},

	*/
	/* //OLDER
		sj.orderTracks = async function (db, playlistId) {
			// update
			return db.tx(async function (t) {
				let realPlaylist = await t.one(`SELECT * FROM "sj"."playlists" WHERE "id" = $1`, [playlist.id]).catch(rejected => {
					throw sj.parsePostgresError(rejected, new sj.Error({
						log: false,
						origin: 'orderPlaylist()',
						message: 'could not get playlist, database error',
						target: 'notify',
						cssClass: 'notifyError',
					}));
				});
				//? should this be t.any() and not db.any() ??
				let trackList = await db.any(`SELECT * FROM  "sj"."tracks" WHERE "playlistId" = $1`, [playlist.id]).catch(rejected => {
					throw sj.parsePostgresError(rejected, new sj.Error({
						log: false,
						origin: 'orderPlaylist() tracks query',
						message: 'could not order playlist, database error',
						target: 'notify',
						cssClass: 'notifyError',
					}));
				});

				realPlaylist.content = trackList;
				realPlaylist = new sj.Playlist(realPlaylist);

				//C sort by track.position
				//! stable sort no longer uses array.prototype, instead is sj.stableSort(array, compare)
				realPlaylist.content.stableSort(function (a, b) { 
					return a.position - b.position;
				});


				//L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
				//L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
				//L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
				await t.none('SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED').catch(rejected => {
					throw sj.parsePostgresError(rejected, new sj.Error({
						log: false,
						origin: 'orderPlaylist()',
						message: 'could not order playlist, database error',
						target: 'notify',
						cssClass: 'notifyError',
					}));
				});
				
				//C update position based on index
				//! this will only update rows that are already in the table, will not add anything new to the sorted playlist, therefore will still have gaps if the playlist has more rows than the database or duplicates if it has less
				//? possible memory leak error here 
				realPlaylist.content.map(async function (item, index) {
					await t.none('UPDATE "sj"."tracks" SET "position" = $1 WHERE "playlistId" = $2 AND "position" = $3', [index, item.playlistId, item.position]).catch(rejected => {
						throw sj.parsePostgresError(rejected, new sj.Error({
							log: false,
							origin: 'orderPlaylist()',
							message: 'could not order playlist, database error',
							target: 'notify',
							cssClass: 'notifyError',
						}));
					});
				});

				return realPlaylist;
			}).then(resolved => {
				//C apply actual indexes for return
				resolved.content.map(function(item, index) {
					item.position = index;
				});
				return resolved;
			}).catch(rejected => {
				throw sj.propagate(rejected);
			});
		}
		sj.moveTrack = async function (ctx, track, position) {
			//TODO what if edit cant change position, only move can? but then how does that interact with the REST? figure this out

			let playlist = await sj.Playlist.get(ctx, track.playlistId).catch(rejected => {
				throw sj.propagate(rejected);
			});

			if (position >= playlist.content.length) {
				track.position = playlist.content.length;
			} else if (position >= 0) {
				track.position = position;
				playlist.content.map(item => {
					if (item.position >= position) {
						item.position++;
					}
				});
			} else {
				//TODO don't error, just add to start
				throw new sj.Error({
					log: true,
					origin: 'moveTrack()',
					message: 'track position cannot be negative',
				});
			}

			playlist = await sj.orderPlaylist(new sj.Playlist({id: track.playlistId})).catch(rejected => {
				throw sj.parsePostgresError(rejected, new sj.Error({
					log: false,
					origin: 'addTrack()',
					message: 'could not order playlist, database error',
					target: 'notify',
					cssClass: 'notifyError',
				}));
			});

			return new sj.Success({
				log: false,
				origin: 'moveTrack()',
				message: 'moved track',
				content: playlist,
			});
		}
	*/
}).call(sj.Track);
(function () {
	this.order = async function (db = sj.db) {
		return await this.constructor.order(db, sj.any(this));
	}
	/* //OLD
		async move(db = sj.db) {
			return await this.constructor.move(db, this);
		},
		async order(db = sj.db) {
			return await this.constructor.order(db, this);
		}
	*/
}).call(sj.Track.prototype);


export default sj;


/* test
	async function test() {
		await sj.wait(1000);

		let input = [
			{
				id: 65,
				position: 3,
			},
			{
				id: 55,
				position: 3,
				playlistId: 2,
			},
		];

		console.log('INPUT BEFORE:\n', input, '\n ---');

		let influenced = await sj.Track.order(sj.db, input);
		
		console.log('INPUT AFTER:\n', input, '\n ---');
		console.log('INFLUENCED TRACKS:\n', influenced);
	}

	test();
*/