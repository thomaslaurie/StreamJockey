const sj = require('../../public/js/global.js');
const pgp = require('pg-promise')({
    // initialization options here: http://vitaly-t.github.io/pg-promise/module-pg-promise.html
});

/* notes
    basic query functions: any(manyOrNone) many none one oneOrNone

*/

const config = {
    // https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
    // TODO create new db user with restricted capabilities
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'test',
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'pgPassword',
}
  
const db = pgp(config);

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


    return db.tx(async function (task) {
        // TODO this will not alter tables if they do already exist (save this for migration)
        
        // schema: https://www.postgresql.org/docs/9.3/static/sql-createschema.html
        // constraints: https://www.postgresql.org/docs/9.4/static/ddl-constraints.html
        // foreign keys - REFERENCES otherTable (column) *if the column is omitted then the primary key of the referenced table is used
        // ON DELETE CASCADE also deletes any referencing rows when the referenced row is deleted
        // TODO CHECK constraint that visibility, source matches possible  states
        // quotes: https://stackoverflow.com/questions/41396195/what-is-the-difference-between-single-quotes-and-double-quotes-in-postgresql
        
        // default constraint names: https://stackoverflow.com/questions/4107915/postgresql-default-constraint-names

        if (false) {
            await task.none(`DROP SCHEMA IF EXISTS "sj" CASCADE`).catch(rejected => {
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

        return task.none(`CREATE SCHEMA IF NOT EXISTS "sj"`).catch(rejected => {
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
            return task.none(`CREATE TABLE IF NOT EXISTS "sj"."users" (
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
            return task.none(`CREATE TABLE IF NOT EXISTS "sj"."playlists" (
                "id" SERIAL CONSTRAINT "playlists_id_pkey" PRIMARY KEY,
                "user_id" integer CONSTRAINT "playlists_user_id_fkey" REFERENCES "sj"."users" ON DELETE CASCADE,
                "name" text,
                "visibility" text,
                "description" text,
                "image" text,
                "color" text,
                
                CONSTRAINT playlists_user_id_name_key UNIQUE ("user_id", "name")
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
            return task.none(`CREATE TABLE IF NOT EXISTS "sj"."tracks" (
                "id" SERIAL CONSTRAINT "tracks_id_pkey" PRIMARY KEY,
                "playlist_id" integer CONSTRAINT "tracks_playlist_id_fkey" REFERENCES "sj"."playlists" ON DELETE CASCADE,
                "position" integer CONSTRAINT "tracks_position_key" UNIQUE DEFERRABLE INITIALLY IMMEDIATE,
                "source" text,
                "source_id" text,
                "name" text,
                "duration" integer,
                "artists" text[]
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
        })
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

// create a single db object for entire app
module.exports = db;