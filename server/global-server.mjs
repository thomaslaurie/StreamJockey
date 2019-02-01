// ███╗   ██╗ ██████╗ ████████╗███████╗███████╗
// ████╗  ██║██╔═══██╗╚══██╔══╝██╔════╝██╔════╝
// ██╔██╗ ██║██║   ██║   ██║   █████╗  ███████╗
// ██║╚██╗██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║ ╚████║╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

/*
    //? user id being in the session.user object is basically the user's access key -> how do I ensure this is secure too? (aside from using a secure connection), it has to do with koa-session and how the session keys work - figure this out - I think this info is never sent to the client, just stored in the server and accessed via cookie key

    //? is a check to see if a to-be-deleted item necessary? should the user be made aware if it doesn't exist? will this actually ever happen?

    //G
    Create -> add
    Retrieve -> get
    Update -> edit
    Delete -> delete

    //! right now the CRUD functions are called with sj.Objects with some set of parameters (not always id, even for get) - these parameters are all ones that are fine to publicly carry around with the object (except in particular cases like passwords) and so should always be with the object. If theres a point in the future where these have to be called with a consistent argument (id) then the next step would be to make all these consistent about using that parameter and then also maybe have fallbacks for incase that parameter doesn't exist but other sufficient ones do (playlistId, position). This would be an order of properties and their respective validation checks and query modifications.

    //G basic query functions: any(manyOrNone) many none one oneOrNone

    //! all CRUD functions have a ctx parameter for consistency (regardless if it is used (most of them use it though))

    

    TODO
    //C get functions will be allowed to get multiple resources (just a simple query based on matches), for example getting a playlist with only userId will get all playlists by that user
    //C there is some confusion about what is 'known' information - because playlists hold data on the tracks they contain, but users don't hold data on the playlists they have. get needs the ability for multiple matches because it is not 'known' by the client what it contains (playlist is only able to do this because the multiple query is done manually server-side when getting the original playlist, this is not done for user)
    //C two directions - either make user retrieve all of it's containing playlists (lots of data being passed around here, no way to do a different query for playlists or tracks separated from user), or allow multiple querying (creates a difference between get and the other CRUD methods (add, edit, and delete could be done in multiple but these are all methods where the client 'knows' the exact resource they're manipulating and can be done iteratively on the client-side)
    //C maybe make all CRUD methods multiply possible (for admin stuff? delete all tracks in a playlist (at once) without doing them iteratively client-side), all of these would have to fail if any one part fails (using that postgres thing (transaction commit?))
    //TODO also consider then including a light version of tracks/playlists that only includes ids?

    //TODO add admin privacy level: [admin, self, password, link, public, etc.]

    //R all CRUD will return an array of any number of rows

    //R GET should be the only method used for search/query. EDIT & DELETE (& ADD) should not, therefore, editing or deleting a resource should only be done when it's id is known (after probably GETing it), (this clears up confusion: say we want to edit a track where its property is x, this is done in the GET method, but here is an issue when determining what data is the replacement data and what data is the query data - therefore only the id should be used as the query data (because it cant be changed), an the rest is the replacement data)

    because of this it becomes: get | add, edit, delete   or   get, delete | add, edit    (because it could make sense for delete to query too because it doesn't have replacement data, but not add because it doesn't need a query), it comes down to consistency, get could take a single object, add, edit, delete, could take an array of objects (and return single success/failure?), what about get taking an array and returning an array

    
    //C ErrorList should not be a wrapper for a list of errors, ErrorList should be a version of a single error that has multiple 'parallel' parts (ie: adding a user and having an issue with multiple fields - its still a single error with one resource (a user) but there are multiple parts to the error that need to be evaluated in parallel not in sequence)
    //TODO would this not mean that requests are also parallely evaluated? that response arrays should all have Success or ErrorList wrappers?, wouldn't this be redundant - if everything is already an array why have a wrapper for it? what would be the default wrapper for request data like editTracks([{}, {}, ...]) ?

    //L multiple resources with one request: https://stackoverflow.com/questions/32098423/rest-updating-multiple-resources-with-one-request-is-it-standard-or-to-be-avo

    //L return Promise vs return await Promise (theres no difference, except for try-catch blocks): https://stackoverflow.com/questions/38708550/difference-between-return-await-promise-and-return-promise
    // therefore, do not use await when returning a promise - so that the return syntax can mirror returning inside .then() chains (which cant use await)
    //L actually no: https://www.reddit.com/r/javascript/comments/7idasp/await_vs_return_vs_return_await/ 
    //R DO use return await
    //? can async arrow functions that have a single line return omit 'return await' ? 

    //L proper use of array methods: https://medium.com/front-end-weekly/stop-array-foreach-and-start-using-filter-map-some-reduce-functions-298b4dabfa09
    
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

    //TODO consider delagating unexpected error catches to only top-level entry points, (so that catchUnexpected() doesn't have to be repeated for every single async function call? (but this is also what prevents things from silently failing in the first place))

    //TODO move other crud functions over to array results (or not?), get CRUD functions are done 

    //L //TODO best practices: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api

    //TODO replace all database variables, column names, etc. with constants inside this file (or the db file)

    //TODO complete all parameters on database functions
*/


//  ██████╗ ███████╗██████╗ ███████╗███╗   ██╗██████╗ ███████╗███╗   ██╗ ██████╗██╗███████╗███████╗
//  ██╔══██╗██╔════╝██╔══██╗██╔════╝████╗  ██║██╔══██╗██╔════╝████╗  ██║██╔════╝██║██╔════╝██╔════╝
//  ██║  ██║█████╗  ██████╔╝█████╗  ██╔██╗ ██║██║  ██║█████╗  ██╔██╗ ██║██║     ██║█████╗  ███████╗
//  ██║  ██║██╔══╝  ██╔═══╝ ██╔══╝  ██║╚██╗██║██║  ██║██╔══╝  ██║╚██╗██║██║     ██║██╔══╝  ╚════██║
//  ██████╔╝███████╗██║     ███████╗██║ ╚████║██████╔╝███████╗██║ ╚████║╚██████╗██║███████╗███████║
//  ╚═════╝ ╚══════╝╚═╝     ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═══╝ ╚═════╝╚═╝╚══════╝╚══════╝

// builtin

// external
import bcrypt from 'bcrypt';

// internal
import sj from '../public/js/global.mjs';
import database, {pgp} from './database/db.mjs';


//  ██╗███╗   ██╗██╗████████╗
//  ██║████╗  ██║██║╚══██╔══╝
//  ██║██╔██╗ ██║██║   ██║   
//  ██║██║╚██╗██║██║   ██║   
//  ██║██║ ╚████║██║   ██║   
//  ╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   

// bcrypt
const saltRounds = 10; 

// database
sj.db = database; //C for use of db with globals so that db doesn't have to be imported twice

//! string to be hashed must not be greater than 72 characters (//? or bytes???),
const stringMaxLength = 100;
const bigStringMaxLength = 2000;

const nameMinLength = 3;
const nameMaxLength = 16;

const defaultColor = '#ffffff';

const visibilityStates = [
    'public',
    'private',
    'linkOnly',
];


//  ██╗   ██╗████████╗██╗██╗     
//  ██║   ██║╚══██╔══╝██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝

// postgres
//? this should be called once on startup, where should this go?
(async () => {
    // initialize

    // N (name) strings must have double quotes around them to avoid reserved postgres words
    /*
        let P_SCHEMA = {
            N = 'sj',
            USERS = {
                N = '"users"',
                ID = {
                    N = '"id"',
                    T = 'integer',
                },
                NAME = {
                    N = '"name"',
                    T = 'text'
                },
                PASSWORD = {
                    N = '"password"',
                    T = 'text',
                },
                EMAIL = {
                    N = '"email"',
                    T = 'text',
                },
                IMAGE = {
                    N = '"image"',
                    T = 'text',
                },
                COLOR = {
                    N = '"color"',
                    T = 'text',
                },
            },
            PLAYLISTS = {
                ID = {
                    N = '"id"',
                    T = 'integer',
                },
                USER_ID = {
                    N = '"userId"',
                    T = 'integer',
                },
                NAME = {
                    N = '"name"',
                    T = 'text',
                },
                DESCRIPTION = {
                    N = '"description"',
                    T = 'text',
                },
                VISIBILITY = {
                    N = '"visibility"',
                    T = 'text',
                },
                IMAGE = {
                    N = '"image"',
                    T = 'text',
                },
                COLOR = {
                    N = '"color"',
                    T = 'text',
                },
            },
            TRACKS = {
                ID = {
                    N = '"id"',
                    T = 'integer',
                },
                PLAYLIST_ID = {
                    N = '"playlistId"',
                    T = 'integer',
                },
                SOURCE = {
                    N = '"source"',
                    T = 'text',
                },
                SOURCE_ID = {
                    N = '"sourceId"',
                    T = 'text',
                },
                NAME = {
                    N = '"name"',
                    T = 'text',
                },
                DURATION = {
                    N = 'duration',
                    T = 'integer',
                },
                ARTISTS = {
                    N = '"artists"',
                    T = 'text[]',
                },
                IMAGE = {
                    N = '"image"',
                    T = 'text',
                },
            }         
        }

        const SCHEMA = sj.deepFreeze(P_SCHEMA);
    */
    return db.tx(async function (t) {
        // TODO this will not alter tables if they do already exist (save this for migration)
        
        // schema: https://www.postgresql.org/docs/9.3/static/sql-createschema.html
        // constraints: https://www.postgresql.org/docs/9.4/static/ddl-constraints.html
        // foreign keys - REFERENCES otherTable (column) *if the column is omitted then the primary key of the referenced table is used
        // ON DELETE CASCADE also deletes any referencing rows when the referenced row is deleted
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
            return t.none(`CREATE TABLE IF NOT EXISTS "sj"."users" (
                "id" SERIAL CONSTRAINT "users_id_pkey" PRIMARY KEY,
                "name" text CONSTRAINT "users_name_key" UNIQUE,
                "password" text,
                "email" text CONSTRAINT "users_email_key" UNIQUE
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
                "artists" text[],

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
            throw sj.propagateError(rejected);
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
})().then(resolved => {
    let announce = new sj.Success({
        log: true,
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
}
sj.addKey = async function (list) {
    let pack = {};

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

    list.push(pack);
    return pack;
}
sj.checkKey = async function (list, key, timeout) {
    for(let i = 0; i < list.length; i++) {
        //C if the key is found, remove and return it
        if (list[i].key === key) {
            let pack = list[i];
            list.splice(i, 1);
            return pack;
        }

        //TODO ensure this timeout works, I think it was tested before? but just check again
        //C if any key has timed out, remove it too
        if (list[i].timestamp + timeout < Date.now()) {
            list.splice(i, 1);
        }
    }

    throw new sj.Error({
        log: true,
        origin: 'checkKey()',
        message: 'request timeout (or just an invalid key)',
    });
}

sj.Rule.checkRuleSet = async function (ruleSet) {
    //C checks a ruleSet and returns a sj.Success with a list of formated strings pairing columns to properties
    //C takes a 2D array: [[isRequired, columnName, sj.Rule, object, propertyName, value2], [], ...]

    let columnPairs = [];
    await sj.asyncForEach(ruleSet, async ([isRequired, column, rule, obj, prop, value2]) => {
        //C validate arguments
        if (!sj.isType(isRequired, 'boolean')) {
            return new sj.Error({
                log: true,
                origin: 'sj.Rule.checkRuleSet()',
                message: 'validation error',
                reason: `isRequired is not a boolean`,
                content: ruleSet,
            });
        }
        if (!sj.isType(column, 'string') | sj.isEmpty(column)){
            return new sj.Error({
                log: true,
                origin: 'sj.Rule.checkRuleSet()',
                message: 'validation error',
                reason: `column is not a string or is empty`,
                content: ruleSet,
            });
        }
        if (!rules instanceof this) {
            return new sj.Error({
                log: true,
                origin: 'sj.Rule.checkRuleSet()',
                message: 'validation error',
                reason: `rule is not an sj.Rule`,
                content: ruleSet,
            });
        }
        if (!sj.isType(rule, 'object')) {
            return new sj.Error({
                log: true,
                origin: 'sj.Rule.checkRuleSet()',
                message: 'validation error',
                reason: `obj is not an object`,
                content: ruleSet,
            });
        }
        if (prop in obj) {
            return new sj.Error({
                log: true,
                origin: 'sj.Rule.checkRuleSet()',
                message: 'validation error',
                reason: `prop is not in obj`,
                content: ruleSet,
            });
        }

        //C if property is required, or [isn't required and] isn't empty
        if (isRequired | !sj.isEmpty(obj[prop])) {
            //C validate property, possibly modify obj[prop] if successful
            //R the check has to specifically happen before the push to columnPairs (not just storing to a ruleSet array) because the check can change the value or type of obj[prop] which could then create issues when the original is used in the where clause
            let checked = await rule.check(obj[prop], value2);
            obj[prop] = sj.returnContent(checked);
            //C add value to columnPairs
            //! if rule.check() throws, this won't be pushed, but that doesn't matter because columnPairs won't be returned if there is any error
            columnPairs.push({column: column, value: obj[prop]});
            //C return the success message of rule.check()
            //! this doesn't end up being returned from the function, but is here for maintainability
            return checked;
        } else {
            return new sj.Success({
                origin: 'sj.Rule.checkRuleSet()',
                message: `optional empty property ${prop} skipped validation`,
            });
        }
    }).catch(rejected => {
        throw new sj.ErrorList({
            log: true,
            origin: 'sj.Rule.checkRuleSet()',
            message: 'one or more issues with rules',
            reason: 'validation functions returned one or more errors',
            content: rejected,
        });
    });

    return new sj.Success({
        origin: 'sj.Rule.checkRuleSet()',
        message: 'all rules validated',
        content: columnPairs,
    });
}
sj.buildValues = function (pairs) {
    if (pairs.length === 0) {
        //C this shouldn't insert anything
        return `("id") SELECT 0 WHERE 0 = 1`;
    } else {
        let columns = [];
        let values = [];
        let placeholders = [];

        pairs.forEach((item, index) => {
            columns.push(item.column);
            values.push(item.value);
            placeholders.push(`$${index}`);
        });

        columns = columns.join('", "');
        columns = `("${columns}")`;

        placeholders = placeholders.join(', ');
        placeholders = `(${placeholders})`;

        return pgp.as.format(`${columns} VALUES ${placeholders}`, values);
    }
}
sj.buildWhere = function (pairs) {
    if (pairs.length === 0) {
        //C return a false clause
        return '0 = 1';
    } else {
        //C change pairs to formatted string
        pairs.forEach(item => {
            item = pgp.as.format(`"${item.column}" = $1`, item.value);
        });
        //C joined with ' AND '
        return pairs.join(' AND ');
    }
}
sj.buildSet = function (pairs) {
    if (pairs.length === 0) {
        //C don't make any change 
        //! this does have to reference a column that exists however
        return '"id" = "id"';
    } else {
        //C change pairs to formatted string
        pairs.forEach(item => {
            item = pgp.as.format(`"${item.column}" = $1`, item.value);
        });
        //C join with ', '
        return pairs.join(', ');
    }
}


//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗
//  ██╔══██╗██║   ██║██║     ██╔════╝██╔════╝
//  ██████╔╝██║   ██║██║     █████╗  ███████╗
//  ██╔══██╗██║   ██║██║     ██╔══╝  ╚════██║
//  ██║  ██║╚██████╔╝███████╗███████╗███████║
//  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝

sj.posIntRules = new sj.Rule({
    log: true,
    origin: 'positiveIntegerRules',
    message: 'number validated',

    valueName: 'Number',

    dataTypes: ['integer'],
});
sj.idRules = new sj.Rule({
    log: true,
    origin: 'idRules',
    message: 'id validated',

    valueName: 'id',

    dataTypes: ['integer'],
});
sj.imageRules = new sj.Rule({
    log: true,
    origin: 'imageRules',
    message: 'image validated',
    target: 'playlistImage',
    cssClass: 'inputError',

    valueName: 'image',
    trim: true,

    max: bigStringMaxLength,

    // TODO filter: ___,
    filterMessage: 'Image must be a valid url',
});
sj.colorRules = new sj.Rule({
    log: true,
    origin: 'colorRules',
    message: 'color validated',
    target: 'playlistColor',
    cssClass: 'inputError',

    valueName: 'color',
    trim: true,
    
    filter: '/#([a-f0-9]{3}){1,2}\b/', //TODO is this correct?
    filterMessage: 'Color must be in hex format #XXXXXX',
});


//  ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
//  ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
//  ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
//  ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
//  ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

// CRUD
sj.login = async function (ctx, user) {
    await sj.Rule.checkRuleSet([
        [sj.userNameRules, user, 'name'],
        [sj.passwordRules, user, 'password'],
    ]);

    return db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).catch(rejected => {
        throw sj.parsePostgresError(rejected, new sj.Error({
            log: false,
            origin: 'login()',
            message: 'could not login, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        return bcrypt.compare(user.password, resolved.password).catch(rejected => {
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
    }).then(resolved => {
        if (resolved) {
            return db.one('SELECT * FROM "sj"."users_self" WHERE "name" = $1', [user.name]).catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                    origin: 'login()',
                    message: 'could not login, database error',
                    target: 'notify',
                    cssClass: 'notifyError',
                }));
            });
        } else {
            throw new sj.Error({
                log: true,
                origin: 'login()',
                message: 'incorrect password',
                target: 'loginPassword',
                cssClass: 'inputError',
            });
        }
    }).then(resolved => {
        ctx.session.user = new sj.User(resolved);
        return new sj.Success({
            log: true,
            origin: 'login()',
            message: 'user logged in',
            target: 'notify',
            cssClass: 'notifySuccess',
            content: ctx.session.user,
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}
sj.logout = async function (ctx) {
    delete ctx.session.user;

    return new sj.Success({
        log: true,
        origin: 'logout()',
        message: 'user logged out',
        target: 'notify',
        cssClass: 'notifySuccess',
    });
}

//TODO deal with this
sj.getMe = async function (ctx) {
    await sj.isLoggedIn(ctx);
    return ctx.session.user;
}

// util
sj.isLoggedIn = async function (ctx) {
    if (!(sj.typeOf(ctx.session.user) !== 'undefined' && sj.typeOf(ctx.session.user.id) !== 'undefined')) {
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
        [sj.idRules, ctx.session.user, 'id'],
    ]);

    return new sj.Success({
        log: true,
        origin: 'isLoggedIn()',
        message: 'user is logged in',
    });
}


//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝

/* TODO
    userNameRules has userName input field ids, this wont target them because they wont exist (//? why?) - find a fix for this or maybe just send unfound DOM notices to the general notice by default?

*/


// validate
sj.selfRules = new sj.Rule({
    log: true,
    origin: 'selfRules',
    message: 'self validated',
    target: 'notify',
    cssClass: 'notifyError',

    valueName: 'Id',

    dataTypes: ['integer'],

    useAgainst: true,
    //! ctx.session.user.id shouldn't be used here because there is no guarantee ctx.session.user exists
    againstMessage: 'you are not the owner of this',
});

sj.userNameRules = new sj.Rule({
    log: true,
    origin: 'userNameRules',
    message: 'username validated',
    target: 'registerUserName',
    cssClass: 'inputError',

    valueName: 'Username',
    trim: true,

    min: nameMinLength,
    max: nameMaxLength,
});
sj.passwordRules = new sj.Rule({
    log: true,
    origin: 'passwordRules',
    message: 'password validated',
    target: 'registerPassword',
    cssClass: 'inputError',

    valueName: 'Password',

    min: 6,
    max: 72, //! as per bcrypt
});
sj.setPasswordRules = new sj.Rule({
    log: true,
    origin: 'setPasswordRules',
    message: 'password validated',
    target: 'registerPassword',
    cssClass: 'inputError',

    valueName: 'Password',

    min: 6,
    max: 72, //! as per bcrypt

    useAgainst: true,
    get againstMessage() {return 'Passwords do not match'},
});
sj.emailRules = new sj.Rule({
    log: true,
    origin: 'emailRules',
    message: 'email validated',
    target: 'registerEmail',
    cssClass: 'inputError',

    valueName: 'E-mail',
    trim: true,

    min: 3,
    max: stringMaxLength,

    //TODO useFilter: ___, filterMessage: ___, 
    //L https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
});

/*
    sj.validateEmail = async function (email) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validateEmail()',
            message: 'email validated',
            target: 'registerEmail',
            cssClass: 'inputError',

            content: email,

            valueName: 'E-mail',
            min: 3,
            max: stringMaxLength,
            trim: true,
            // TODO useFilter: ___, filterMessage: ___, // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        });

        return rules.checkAll();
    }
    sj.validateUserName = async function (name) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validateUserName()',
            message: 'username validated',
            target: 'registerUserName',
            cssClass: 'inputError',

            content: name,

            valueName: 'Username',
            min: nameMinLength,
            max: nameMaxLength,
            trim: true,
        });

    return rules.checkAll();
    }
    sj.validatePassword = async function (password, password2) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validatePassword()',
            message: 'password validated',
            target: 'registerPassword',
            cssClass: 'inputError',

            content: password,

            valueName: 'Password',
            min: 6,
            max: 72, // as per bcrypt
            against: password2,
            againstMessage: 'Passwords do not match',
        });
    
        return rules.checkAll();
    }
*/

// CRUD
sj.addUsers = async function (db, user) {
    //C validate
    await sj.Rule.checkRuleSet([
        [sj.userNameRules, user, 'name'],
        [sj.setPasswordRules, user, 'password', user.password2],
        [sj.emailRules, user, 'email'],
    ]);

    return bcrypt.hash(user.password, saltRounds).catch(rejected => {
        throw new sj.Error({
            log: true,
            origin: 'register()',
            message: 'failed to register user',
            reason: 'hash failed',
            content: rejected,
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).then(resolved => {
        return db.none('INSERT INTO "sj"."users" ("name", "password", "email") VALUES ($1, $2, $3)', [user.name, resolved, user.email]).catch(rejected => {
            // replaces default error info with info based on error code 
            throw sj.parsePostgresError(rejected, new sj.Error({
                log: false,
                origin: 'addUser()',
                message: 'could not add user',
                target: 'notify',
                cssClass: 'notifyError',
            }));
        });
    }).then(resolved => {
        //C strip passwords
        user.password = undefined;
        user.password2 = undefined;

        //C return user object
        return new sj.Success({
            log: true,
            origin: 'register()',
            message: `${user.name} registered`,
            cssClass: 'notifySuccess',
            content: user,
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}
sj.getUsers = async function (db, user, ctx) {
    //R logic for getUserById, getUserByName, getUserByEmail would have to exist elsewhere anyways if not in this function, so might as well just put it here and handle all combination cases
    //R there also isn't a good enough reason for handling an edge case where some input properties may be incorrect and others are correct, making a system to figure out which entry to return would never be useful (unless some advanced search system is implemented) and may actually hide errors
    //R for all get functions, setup optional parameters for each unique key combination (id, containerId & otherUniqueParam, etc.)

    let where = await sj.checkAndBuild([
        ['id', sj.idRules, user, 'id'],
        ['name', sj.userNameRules, user, 'name'],
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
}
sj.editUsers = async function (db, user, ctx) { //TODO
    // TODO should be similar to addUser(), just with a flexible amount of properties, and a WHERE clause, !!! ensure that id does not get changed
    await sj.isLoggedIn(ctx);

    /* TODO
    return db.none('UPDATE "sj"."users" SET x = $x, x = $x, x = $x, ... WHERE "id" = x,', [x, ...]).catch(rejected => {
        throw sj.parsePostgresError(rejected, new sj.Error({
            log: false,
            origin: 'editUser()',
            message: 'could not edit user',
            notify: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'editUser()',
            message: 'updated user',
            notify: 'notify',
            cssClass: 'notifySuccess',
        });
    }).catch(rejected => {
        throw propagateError(rejected);
    });
    */
}
sj.deleteUsers = async function (db, user, ctx) {
    await sj.isLoggedIn(ctx);

    await sj.Rule.checkRuleSet([
        [sj.passwordRules, user, 'password'],
    ]);

    return db.one('SELECT password FROM "sj"."users_self" WHERE "id" = $1', [ctx.session.user.id]).catch(rejected => {
        throw sj.parsePostgresError(rejected, new sj.Error({
            log: false,
            origin: 'deleteUser()',
            message: 'could not delete user',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        return bcrypt.compare(user.password, resolved.password).catch(rejected => {
            throw new sj.Error({
                log: true,
                origin: 'deleteUser()',
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
                    origin: 'deleteUser()',
                    message: 'could not delete user',
                    target: 'notify',
                    cssClass: 'notifyError',
                }));
            });
        } else {
            throw new sj.Error({
                log: true,
                origin: 'deleteUser()',
                message: 'incorrect password',
                target: 'deleteUserPassword',
                cssClass: 'inputError',
            });
        }
    }).then(resolved => {
        //C resolve logout() rejection - the user is still deleted even if logout fails (which it shouldn't), the user doesn't need to know this
        return logout().catch(sj.andResolve);     
    }).then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'deleteUser()',
            message: `user ${user.name} deleted`,
        });
    }).catch(rejected => {
        throw propagateError(rejected);
    });
}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   

// rules
sj.playlistNameRules = new sj.Rule({
    log: true,
    origin: 'playlistNameRules()',
    message: 'name validated',
    target: 'playlistName',
    cssClass: 'inputError',

    valueName: 'Name',
    trim: true,

    min: nameMinLength,
    max: stringMaxLength,  
});
sj.visibilityRules = new sj.Rule({
    log: true,
    origin: 'visibilityRules',
    message: 'visibility validated',
    target: 'playlistVisibility',
    cssClass: 'inputError',

    valueName: 'Visibility',

    useAgainst: true,
    againstValue: visibilityStates,
    againstMessage: 'please select a valid visibility level',
});
sj.descriptionRules = new sj.Rule({
    log: true,
    origin: 'descriptionRules()',
    message: 'description validated',
    target: 'playlistDescription',
    cssClass: 'inputError',

    valueName: 'Description',

    max: bigStringMaxLength,
    trim: true,
});
/*
    sj.validatePlaylistName = async function (name) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validatePlaylistName()',
            message: 'name validated',
            target: 'playlistName',
            cssClass: 'inputError',

            content: name,

            valueName: 'Name',
            min: nameMinLength,
            max: stringMaxLength,
            trim: true,
        });

        return rules.checkAll();
    }
    sj.validateVisibility = async function (visibility) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validateVisibility()',
            message: 'visibility validated',
            target: 'playlistVisibility',
            cssClass: 'inputError',

            content: visibility,

            valueName: 'Visibility',
            against: visibilityStates,
            againstMessage: 'please select a valid visibility level',
        });

        return rules.checkAll();
    }
    sj.validateDescription = async function (description) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validateDescription()',
            message: 'description validated',
            target: 'playlistDescription',
            cssClass: 'inputError',

            content: description,

            valueName: 'Visibility',
            max: bigStringMaxLength,
            trim: true,
        });

        return rules.checkAll();
    }
    sj.validateColor = async function (color) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validateColor()',
            message: 'color validated',
            target: 'playlistColor',
            cssClass: 'inputError',

            content: color,

            valueName: 'Color',
            trim: true,
            filter: '/#([a-f0-9]{3}){1,2}\b/', // TODO is this correct?
            filterMessage: 'Color must be in hex format #XXXXXX',
        });

        return rules.checkAll();
    }
    sj.validateImage = async function (image) {
        let rules = new sj.Rule({
            log: true,
            origin: 'validateColor()',
            message: 'image validated',
            target: 'playlistImage',
            cssClass: 'inputError',

            content: image,

            valueName: 'Image',
            max: bigStringMaxLength,
            trim: true,
            // TODO filter: ___,
            filterMessage: 'Image must be a valid url',
        });

        return rules.checkAll();
    }
*/

// CRUD
sj.addPlaylists = async function (db, playlist, ctx) {
    await sj.isLoggedIn(ctx);

    await sj.Rule.checkRuleSet([
        [sj.playlistNameRules, playlist, 'name'],
        [sj.visibilityRules, playlist, 'visibility'],
        [sj.descriptionRules, playlist, 'description'],
        [sj.imageRules, playlist, 'image'],
        [sj.colorRules, playlist, 'color'],
    ]);
    /*
        var errorList = new sj.ErrorList({
            origin: 'addPlaylist()',
            message: 'one or more issues with fields',
            reason: 'validation functions returned one or more errors',
        });
        if (!(sj.isLoggedIn(ctx))) {
            errorList.content.push(new sj.Error({
                log: true,
                origin: 'addPlaylist()',
                message: 'you must be logged in to add a playlist',
                target: 'notify',
                cssClass: 'notifyError',
            }));
        }
        playlist.name = await sj.playlistNameRules.check(playlist.name).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.visibility = await sj.visibilityRules.check(playlist.visibility).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.description = await sj.descriptionRules.check(playlist.description).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.image = await sj.imageRules.check(playlist.image).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.color = await sj.colorRules.check(playlist.color).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
    */
    /*
        playlist.name = await sj.validatePlaylistName(playlist.name).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.visibility = await sj.validateVisibility(playlist.visibility).then(resolved => {
            return resolved.content;
        }, rejected => {
            return rejected.content;
        });
        playlist.description = await sj.validateDescription(playlist.description).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.color = await sj.validateColor(playlist.color).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });;
        playlist.image = await sj.validateImage(playlist.image).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
    */
    /*
        if (!(errorList.content.length === 0)) {
            errorList.announce();
            throw errorList;
        }
    */

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
        throw sj.propagateError(rejected);
    });
}
sj.getPlaylists = async function (db, playlist, ctx) {
    //! id is default to null when it isn't set, is this wrong semantics //?
    /*
        if (sj.typeOf(playlist.id) !== 'null') { 
    */

    //C build where
    let where = await sj.checkAndBuild([
        ['id', sj.idRules, playlist, 'id'],
        ['userId', sj.idRules, playlist, 'userId'],
        ['name', sj.playlistNameRules, playlist, 'name'],
    ]);

    //C query
    let playlists = await db.any('SELECT * FROM "sj"."playlists" $1:raw', where).catch(rejected => {
        throw sj.parsePostgresError(rejected, new sj.Error({
            log: false,
            origin: 'sj.getPlaylist()',
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
        item.content = sj.getTrack(ctx, new sj.Track({playlistId: item.id})).catch(rejected => {   
            //TODO warning
            console.warn('getPlaylist() succeeded, but a getTrack() failed')
            return propagateError(rejected); //! returned, not thrown
        });

        /* old
            await db.any(`SELECT * FROM "sj"."tracks" WHERE "playlistId" = $1`, item.id).catch(rejected => {
                
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                    origin: 'getPlaylist() tracks query',
                    message: 'could not get playlist, database error',
                    target: 'notify',
                    cssClass: 'notifyError',
                }));
            });
        */

        return item;
    })).catch(rejected => {
        throw sj.propagateError(rejected);
    });


    return playlists;

    /*
        //TODO permissions
        do this when permissions are sorted out
        if (playlist.visibility === 'public' || playlist.visibility === 'linkOnly' || (playlist.visibility === 'private' && sj.isLoggedIn(ctx) && playlist.userId === ctx.session.user.id)) {

        throw new sj.Error({
            log: true,
            origin: 'getPlaylist()',
            message: 'you do not have permission to access this playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    */
}
sj.editPlaylists = async function (db, playlist, ctx) { //TODO
}
sj.deletePlaylists = async function (db, playlist, ctx) {
    await sj.isLoggedIn(ctx);

    playlist = await sj.getPlaylist(ctx, playlist);

    await sj.Rule.checkRuleSet([
        [sj.idRules, playlist, 'id'],
        [sj.selfRules, playlist, 'userId', ctx.session.user.id],
    ]);
    
    return db.none('DELETE FROM "sj"."playlists" WHERE "id" = $1', [playlist.id]).catch(rejected => {
        throw sj.parsePostgresError(rejected, new sj.Error({
            log: false,
            origin: 'deletePlaylist()',
            message: 'could not delete playlist, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'deletePlaylist()',
            message: 'playlist deleted',
            target: 'notify',
            cssClass: 'notify success',
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}


//  ████████╗██████╗  █████╗  ██████╗██╗  ██╗
//  ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
//     ██║   ██████╔╝███████║██║     █████╔╝ 
//     ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ 
//     ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
//     ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝

// rules
sj.sourceRules = new sj.Rule({
    log: true,
    origin: 'sourceRules',
    message: 'source validated',

    valueName: 'Source',

    useAgainst: false, //TODO sourceList isn't populated in global.js, but main.js
    againstValue: sj.sourceList,
    againstMessage: 'track does not have a valid source',
});
sj.sourceIdRules = new sj.Rule({
    log: true,
    origin: 'sourceIdRules',
    message: 'source id validated',

    valueName: 'Source ID',

    //? any source id rules (other than being a string)? length? trim?
});
sj.trackNameRules = new sj.Rule({
    log: true,
    origin: 'trackNameRules()',
    message: 'name validated',
    target: 'trackName',
    cssClass: 'inputError',

    valueName: 'Name',
    trim: true,

    min: nameMinLength,
    max: stringMaxLength,  
});

// CRUD
sj.addTracks = async function (db, tracks) {
    return await db.tx(t => {
        let results = await sj.asyncForEach(tracks, async item => {
            let columnPairs = await sj.Rule.checkRuleSet([
                [true, 'playlistId',    sj.idRules,         item, 'playlistId'],
                [true, 'source',        sj.sourceRules,     item, 'source'],
                [true, 'sourceId',      sj.sourceIdRules,   item, 'sourceId'],
                [true, 'name',          sj.trackNameRules,  item, 'name'],
                [true, 'duration',      sj.posIntRules,     item, 'duration'],
            ]).then(sj.returnContent).catch(sj.propagate);

            //C count number of existing tracks and set the next position
            let trackList = await sj.getTracks(t, new sj.Track({playlistId: item.playlistId}));
            item.position = trackList.length;
            columnPairs.push({column: 'position', value: item.position});

            let values = sj.buildValues(columnPairs);

            let row = await t.one('INSERT INTO "sj"."tracks" $1:raw RETURNING *', values).catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                        origin: 'sj.addTracks()',
                        message: 'could not add tracks',
                        target: 'notify',
                        cssClass: 'notifyError',
                }));
            });

            row = new sj.Track(row);
            return row;
        }).catch(rejected => {
            throw new sj.ErrorList({
                log: true,
                origin: 'sj.addTracks()',
                message: 'unable to add tracks',
                content: rejected,
            })
        });

        //R moveTracks() cannot be done before INSERT (as in editTracks()) because the tracks don't exist yet, and the input tracks do not have their own id properties yet. the result tracks of the INSERT operation cannot be used for moveTracks() as they only have their current positions, so the result ids and input positions need to be combined for use in moveTracks(), but we don't want to position tracks don't have a custom position (1 to reduce cost, 2 to maintain the behavior of being added to the end of the list (if say n later tracks are positioned ahead of m former tracks, those m former tracks will end up being n positions from the end - not at the very end). so:

        //C for tracks with a custom position, give the input tracks their result ids and the result tracks their custom positions
        //! requires the INSERT command to be executed one at at a time for each input track
        //R there is no way to pair input tracks with their output rows based on data because tracks have no unique properties (aside from the automatically assigned id), but because the INSERT statements are executed one at a time, the returned array is guaranteed to be in the same order as the input array, therefore we can use this to pair tracks
        tracks.forEach((item, index) => {
            if(!sj.isEmpty(item.position)) {
                item.id = results[index].id;
                results[index].position = item.position;
            }
        });

        //C use the input tracks to properly order
        await sj.moveTracks(t, tracks);;

        //C return the result tracks
        return new sj.Success({
            origin: 'sj.addTracks()',
            message: 'added tracks',
            content: results,
        });
    }).catch(sj.propagate);


    /* old
        //await sj.isLoggedIn(ctx);

        //C retrieve playlist
        let playlist = await sj.getPlaylist(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
            throw sj.propagateError(rejected);
        });
        //C add track position //! playlist.content.length is accurate because the getPlaylist() orders the playlist
        
        track.position = playlist.content.length;

        await sj.Rule.checkRuleSet([
            [sj.selfRules, ctx.session.user, 'id', playlist.userId],
            [sj.idRules, track, 'playlistId'],
            [sj.posIntRules, track, 'position'],
            [sj.sourceRules, track, 'source'],
            [sj.sourceIdRules, track, 'sourceId'],
            [sj.trackNameRules, track, 'name'],
            [sj.posIntRules, track, 'duration'],
            //TODO validation for arrays (requires nested type checks, and possibly multiple valid types in sj.Rule)
        ]); 
        
            // var errorList = new sj.ErrorList({
            //     origin: 'addPlaylist()',
            //     message: 'one or more issues with fields',
            //     reason: 'validation functions returned one or more errors',
            // });
            // track.playlistId = await sj.idRules.check(track.playlistId).catch(rejected => {
            //     errorList.content.push(rejected);
            //     return rejected.content;
            // });
            // track.position = await sj.posIntRules.check(track.position).catch(rejected => {
            //     errorList.content.push(rejected);
            //     return rejected.content;
            // });
            // track.source = await sj.sourceRules.check(track.source).catch(rejected => {
            //     errorList.content.push(rejected);
            //     return rejected.content;
            // });
            // track.sourceId = await sj.sourceIdRules.check(track.sourceId).catch(rejected => {
            //     errorList.content.push(rejected);
            //     return rejected.content;
            // });
            // track.name = await sj.trackNameRules.check(track.name).catch(rejected => {
            //     errorList.content.push(rejected);
            //     return rejected.content;
            // });
            // track.duration = await sj.posIntRules.check(track.duration).catch(rejected => {
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
            throw sj.propagateError(rejected);
        });
    */
}
sj.getTracks = async function (db, tracks) {
    return await db.tx(async t => {
        let results = await sj.asyncForEach(tracks, async item => {
            //C checkRuleSet and set columnPairs
            let columnPairs = await sj.Rule.checkRuleSet([
                [false, 'id',           sj.idRules,     item, 'id'],
                [false, 'playlistId',   sj.idRules,     item, 'playlistId'],
                [false, 'position',     sj.posIntRules, item, 'position'],
            ]).then(sj.returnContent).catch(sj.propagate);

            //C build where clause
            let where = sj.buildWhere(columnPairs);

            //C query
            let rows = await t.any('SELECT * FROM "sj"."tracks" WHERE $1:raw', where).catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                        origin: 'sj.getTracks()',
                        message: 'could not get tracks',
                        target: 'notify',
                        cssClass: 'notifyError',
                }));
            });

            //C cast
            rows.forEach(item => {
                item = new sj.Track(item);
            });
            return rows;
        }).catch(rejected => {
            throw new sj.ErrorList({
                log: true,
                origin: 'sj.getTracks()',
                message: 'unable to retrieve tracks',
                content: rejected.flat(1),
            });
        });

        return new sj.Success({
            origin: 'sj.getTracks()',
            message: 'retrieved tracks',
            //C bring each sub-array's tracks up to the root level (because t.any() returns an array, not a single object)
            content: results.flat(1), 
        });
    }).catch(sj.propagate);


    /* old
        //C build where
        let where = await sj.checkAndBuild([
            ['id', sj.idRules, track, 'id'],
            ['playlistId', sj.idRules, track, 'playlistId'],
            ['position', sj.posIntRules, track, 'position'],
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

    /* old (from getPlaylist() ?) //! do not order tracks here because these will not always be an entire playlist
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
}
sj.editTracks = async function (db, tracks) {
    return await db.tx(async t => {
        //C move before editing other data, so that final position may be accurate in returned results 
        //! results will not include other tracks moved by moveTracks()
        await sj.moveTracks(t, tracks);

        let results = await sj.asyncForEach(tracks, async item => {
            let columnPairsWhere = await sj.Rule.checkRuleSet([
                [true, 'id', sj.idRules, item, 'id'],
            ]).then(sj.returnContent).catch(sj.propagate);

            let columnPairsSet = await sj.Rule.checkRuleSet([
                //! do not edit position here
                [false, 'playlistId',   sj.idRules,        item, 'playlistId'],
                [false, 'source',       sj.sourceRules,    item, 'source'],
                [false, 'sourceId',     sj.sourceIdRules,  item, 'sourceId'],
                [false, 'name',         sj.trackNameRules, item, 'name'],
                [false, 'duration',     sj.posIntRules,    item, 'duration'],
            ]).then(sj.returnContent).catch(sj.propagate);

            let where = sj.buildWhere(columnPairsWhere);
            let set = sj.buildSet(columnPairsSet);

            let row = await t.one('UPDATE "sj"."tracks" SET $1:raw WHERE $2:raw RETURNING *', [set, where]).catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                        origin: 'sj.editTracks()',
                        message: 'could not edit track',
                        target: 'notify',
                        cssClass: 'notifyError',
                }));
            });

            row = new sj.Track(row);
            return row;
        }).catch(rejected => {
            throw new sj.ErrorList({
                log: true,
                origin: 'sj.editTracks()',
                message: 'unable to edit tracks',
                content: rejected,
            });
        });

        return new sj.Success({
            origin: 'sj.editTracks()',
            message: 'edited tracks',
            content: results,
        });
    }).catch(sj.propagate);
}
sj.deleteTracks = async function (db, tracks) {
    return await db.tx(async t => {
        let results = await sj.asyncForEach(tracks, async item => {
            let columnPairs = await sj.Rule.checkRuleSet([
                [true, 'id',           sj.idRules,     item, 'id'],
            ]).then(sj.returnContent).catch(sj.propagate);

            let where = sj.buildWhere(columnPairs);

            //! deletion will return the deleted row, however this will still (eventually) have visibility limitations and should not be used to restore data
            let row = await t.one('DELETE FROM "sj"."tracks" WHERE $1:raw RETURNING *', where).catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                    origin: 'sj.deleteTracks()',
                    message: 'could not delete track',
                    target: 'notify',
                    cssClass: 'notifyError',
                }));
            });
            
            row = new sj.Track(row);
            return row;
        }).catch(rejected => {
            new sj.ErrorList({
                log: true,
                origin: 'sj.deleteTracks()',
                message: 'unable to delete tracks',
                content: rejected,
            });
        });

        //C order after deleting
        await sj.orderTracks(t, results);

        return new sj.Success({
            origin: 'sj.deleteTracks()',
            message: 'deleted tracks',
            content: results,
        });
    }).catch(sj.propagate);


    /* old
        //! requires an sj.Track with playlistId and position properties

        await sj.isLoggedIn(ctx);

        await sj.Rule.checkRuleSet([
            [sj.idRules, track, 'playlistId'],
            [sj.posIntRules, track, 'position'],
        ]);

        
        // `
        // SELECT * 
        // FROM "sj"."playlists" 
        // JOIN "sj"."tracks" 
        // ON "sj"."playlists"."id" = "sj"."tracks"."playlistId" 
        // WHERE "sj"."tracks"."id" = $1`
        
        
        //C retrieve playlist
        let playlist = await sj.getPlaylist(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
            throw sj.propagateError(rejected);
        });

        //TODO change this to just id based
        await sj.Rule.checkRuleSet([
            [sj.selfRules, playlist, 'userId', ctx.session.userId],
        ]);

        //TODO check to make sure it exists (like deletePlaylist has getPlaylist)

        return db.none('DELETE FROM "sj"."tracks" WHERE "playlistId" = $1 AND "position" = $2', [parseInt(track.playlistId), parseInt(track.position)]).catch(rejected => {
            throw sj.parsePostgresError({
                log: true,
                origin: 'deleteTrack()',
                message: 'failed to delete track, database error',
                target: 'notify',
                cssClass: 'notifyError',
            });
        }).then(resolved => {
            return sj.orderPlaylist(new sj.Playlist({id: track.playlistId})).catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                    origin: 'deleteTrack()',
                    message: 'could not order playlist, database error',
                    target: 'notify',
                    cssClass: 'notifyError',
                }));
            });
        }).then(resolved => {
            return new sj.Success({
                log: false,
                origin: 'deleteTrack()',
                content: track,
                target: 'notify',
                cssClass: 'notifySuccess', 
            });
        }).catch(rejected => {
            throw sj.propagateError(rejected);
        });
    */
}

// util

//C moveTracks() and orderTracks() have similar ordering and updating parts
sj.moveTracks = async function (db, tracks) {
    //C takes a list of tracks with id and position, returns a list of playlists that were modified

    /* //R
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
    */
    //C remove tracks without an id or position, define a new array so original is not modified
    let movingTracks = tracks.filter(item => !(sj.isEmpty(item.id) || sj.isEmpty(item.position)));
    //C remove duplicates (keeping last), filters for items where every item after does not have the same id
    movingTracks = movingTracks.filter((item, index, self) => self.slice(index+1).every(itemAfter => item.id !== itemAfter.id));

    //C return early if none are being re-positioned
    if (movingTracks.length === 0) {
        return new sj.Success({
            origin: 'sj.moveTracks()',
            message: 'track positions did not need to be set',
        });
    }


    return await db.tx(async t => {
        /* //C list of playlists
            //C it is possible to move tracks from two different playlists at the same time (follows the behavior of editTrack())

            //C format
            {
                id: 4,
                all: [],
                moving: [],
                notMoving: [],
                merged: [],
            }
            
            //R playlist.all is required (instead of just sorting into moving and notMoving) because each track is processed individually, each moving track's notMoving list will likely include another moving track in the same playlist
        */
        let playlists = [];
        
        //C populate .all and .moving
        //! because a new item is not always being added to playlists, we cant simply set playlists to the result of asyncForEach(), just throw an error list if anything failed
        await sj.asyncForEach(movingTracks, async track => {
            //C validate
            track.id = await sj.idRules.check(track.id).then(sj.returnContent);
            track.position = await sj.posIntRules.check(track.position).then(sj.returnContent);

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
                    origin: 'sj.moveTracks()',
                    message: 'could not move tracks',
                }));
            });

            //C playlist should not be empty
            if (playlist.length === 0) {
                throw new sj.Error({
                    origin: 'sj.moveTracks()',
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
                origin: 'sj.moveTracks()',
                message: "retrieved track's playlist",
            });
        }).catch(rejected => {
            throw new sj.ErrorList({
                log: true,
                origin: 'sj.moveTracks()',
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
            for (let i = 0; i < playlist.moving.length + playlist.notMoving.length; i++) {
                if (playlist.moving[0].position <= i) {
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
            await t.none('SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED').catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                    origin: 'sj.moveTracks()',
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
                    origin: 'sj.moveTracks()',
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
                origin: 'sj.moveTracks()',
                id: playlist.id,
                content: rows,
            });
        }).catch(rejected => {
            throw new sj.ErrorList({
                log: true,
                origin: 'sj.moveTracks()',
                message: 'failed to move tracks',
                content: rejected,
            });
        });
        
        //C will return a list of playlists that were updated (however will return this playlist even if a track was set to the same position it already was)
        return new sj.Success({
            origin: 'sj.moveTracks()',
            message: 'moved tracks',
            content: playlists,
        });
    }).catch(sj.propagate);
}
sj.orderTracks = async function (db, tracks) {
    //C takes a list of tracks with playlistId, returns a list of playlists affected by the sort

    //R there is a recursive loop hazard in here (basically if sj.getTracks() is the function that calls sj.orderTracks() - sj.orderTracks() itself needs to call sj.getTracks(), therefore a loop), however if everything BUT sj.getTracks() calls sj.orderTracks(), then sj.orderTracks() can safely call sj.getTracks(), no, the same thing happens with sj.editTracks() - so just include manual queries, no have it so: sj.getTracks() doesn't use either moveTracks() or orderTracks(), these two methods are then free to use sj.getTracks(), and then have each use their own manual update queries - basically add, edit, delete can use these and sj.getTracks() but not each other - this is written down in that paper chart

    let playlistIds = [];
    await sj.asyncForEach(tracks, async track => {
        //C filter for unique playlist ids
        if (self.slice(index+1).every(itemAfter => item.playlistId !== itemAfter.playlistId)) {
            //C validate
            let id = await sj.idRules.check(track.playlistId).then(sj.returnContent);
            playlistIds.push(id);
        }
        return;
    }).catch(rejected => {
        new sj.ErrorList({
            log: true,
            origin: 'sj.orderTracks()',
            message: 'validation issues with track playlistIds',
            content: rejected,
        });
    });

    return await db.tx(async t => {
        return await sj.asyncForEach(playlistIds, playlistId => {
            //C get
            let playlist = await sj.getTracks(new sj.Track({playlistId}));

            //C sort
            sj.stableSort(playlist, (a, b) => a.position - b.position);

            //C order
            playlist.forEach((track, index) => {
                track.position = index;
            });

            //C format cases
            let cases = playlist.map(track => pgp.as.format(`WHEN $1 THEN $2`, [track.id, track.position]));
            cases = cases.join(' ');

            //C defer constraints
            await t.none('SET CONSTRAINTS "sj"."tracks_playlistId_position_key" DEFERRED').catch(rejected => {
                throw sj.parsePostgresError(rejected, new sj.Error({
                    log: false,
                    origin: 'sj.orderTracks()',
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
                    origin: 'sj.orderTracks()',
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
                origin: 'sj.orderTracks()',
                id: playlistId,
                content: rows,
            });
        }).catch(rejected => {
            throw new sj.ErrorList({
                log: true,
                origin: 'sj.orderTracks()',
                message: 'failed to order tracks',
                content: rejected,
            });
        });
    }).catch(sj.propagate);
}

/* old
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
            throw sj.propagateError(rejected);
        });
    }
*/
/* old, rewritten
    sj.moveTrack = async function (ctx, track, position) {
        //TODO what if edit cant change position, only move can? but then how does that interact with the REST? figure this out

        let playlist = await sj.getPlaylist(ctx, track.playlistId).catch(rejected => {
            throw sj.propagateError(rejected);
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

export default sj;