const sj = require('../public/js/global.js');
const db = require('./database/db.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
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
*/


//  ████████╗ ██████╗ ██████╗  ██████╗ 
//  ╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ██║   ██║██║  ██║██║   ██║
//     ██║   ╚██████╔╝██████╔╝╚██████╔╝
//     ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝ 

/*
    //TODO session_regenerate_id() ? if using, add in same locations as php version


    //TODO other stuff from top.php

    // last page history (I think this goes in routing or something???)

    // const exclusionList = [
    //     // since pages are no longer php and the page/code difference is bigger, this isnt really relevant
    // ]
    // let excluded = false;
    // exclusionList.forEach(item => {
    //     if (false  strpos($_SERVER['REQUEST_URI'], $uri) ) {
    //         excluded = true;
    //     }
    // });

    // // if this page is not excluded, shift page history
    // if (!excluded) {
    //     ctx.session.pastPage = ctx.session.currentPage !== 'undefined' ? ctx.session.currentPage : 'index.html';
    //     ctx.session.currentPage = '';  $_SESSION['currentPage'] = $_SERVER['REQUEST_URI']; 
    // }
*/

//  ██╗   ██╗████████╗██╗██╗     
//  ██║   ██║╚══██╔══╝██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ██║   ██║   ██║   ██║██║     
//  ╚██████╔╝   ██║   ██║███████╗
//   ╚═════╝    ╚═╝   ╚═╝╚══════╝

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

        // TODO add self, public, & private VIEWs for tables (if relevant)
        // !!!  remember to add error messages for constraint violations to parsePostgresError() in functions.js
        // !!! column names are camelCase (because they get converted to properties), everything else is underscore
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
            //L views: https://www.postgresql.org/docs/8.1/static/tutorial-views.html
            //L create or replace: https://stackoverflow.com/questions/48662843/what-is-the-equivalent-of-create-view-if-not-exists-in-postresql
            return task.none(`CREATE OR REPLACE VIEW "sj"."users_self" AS
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
            return task.none(`CREATE OR REPLACE VIEW "sj"."users_public" AS
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
            return task.none(`CREATE TABLE IF NOT EXISTS "sj"."playlists" (
                "id" SERIAL CONSTRAINT "playlists_id_pkey" PRIMARY KEY,
                "userId" integer CONSTRAINT "playlists_userId_fkey" REFERENCES "sj"."users" ON DELETE CASCADE ON UPDATE CASCADE,
                "name" text,
                "visibility" text,
                "description" text,
                "image" text,
                "color" text,
                
                CONSTRAINT playlists_userId_name_key UNIQUE ("userId", "name")
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
                "playlistId" integer CONSTRAINT "tracks_playlistId_fkey" REFERENCES "sj"."playlists" ON DELETE CASCADE ON UPDATE CASCADE,
                "position" integer CONSTRAINT "tracks_position_key" UNIQUE DEFERRABLE INITIALLY IMMEDIATE,
                "source" text,
                "sourceId" text,
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

exports.parsePostgresError = function (pgError, sjError) {
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

    return sjError;
}


//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗
//  ██╔══██╗██║   ██║██║     ██╔════╝██╔════╝
//  ██████╔╝██║   ██║██║     █████╗  ███████╗
//  ██╔══██╗██║   ██║██║     ██╔══╝  ╚════██║
//  ██║  ██║╚██████╔╝███████╗███████╗███████║
//  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝╚══════╝

exports.positiveIntegerRules = new sj.Rules({
    log: true,
    origin: 'positiveIntegerRules',
    message: 'number validated',

    valueName: 'Number',

    dataType: 'integer',
});
exports.imageRules = new sj.Rules({
    log: true,
    origin: 'imageRules',
    message: 'image validated',
    target: 'playlistImage',
    cssClass: 'inputError',

    valueName: 'Image',
    trim: true,

    max: bigStringMaxLength,

    // TODO filter: ___,
    filterMessage: 'Image must be a valid url',
});
exports.colorRules = new sj.Rules({
    log: true,
    origin: 'colorRules',
    message: 'color validated',
    target: 'playlistColor',
    cssClass: 'inputError',

    valueName: 'Color',
    trim: true,
    
    filter: '/#([a-f0-9]{3}){1,2}\b/', //TODO is this correct?
    filterMessage: 'Color must be in hex format #XXXXXX',
});

//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝

// validate
exports.selfRules = new sj.Rules({
    log: true,
    origin: 'selfRules',
    message: 'self validated',
    target: 'notify',
    cssClass: 'notifyError',

    valueName: 'Id',

    useAgainst: true,
    //! ctx.session.user.id shouldn't be used here because there is no guarantee ctx.session.user exists
    againstMessage: 'you are not the owner of this playlist',
});

exports.userNameRules = new sj.Rules({
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
exports.passwordRules = new sj.Rules({
    log: true,
    origin: 'passwordRules',
    message: 'password validated',
    target: 'registerPassword',
    cssClass: 'inputError',

    valueName: 'Password',

    min: 6,
    max: 72, //! as per bcrypt
});
exports.setPasswordRules = new sj.Rules({
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
exports.emailRules = new sj.Rules({
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
    exports.validateEmail = async function (email) {
        let rules = new sj.Rules({
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

        return await rules.checkAll();
    }
    exports.validateUserName = async function (name) {
        let rules = new sj.Rules({
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

    return await rules.checkAll();
    }
    exports.validatePassword = async function (password, password2) {
        let rules = new sj.Rules({
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
    
        return await rules.checkAll();
    }
*/

// CRUD
exports.addUser = async function (user) {
    //C validate
    await sj.Rules.checkRuleSet([
        [exports.userNameRules, user.name],
        [exports.setPasswordRules, user.password, user.password2],
        [exports.emailRules, user.email],
    ]);
    /*
        var errorList = new sj.ErrorList({
            origin: 'validatePassword()',
            message: 'one or more issues with fields',
            reason: 'validation functions returned one or more errors',
        });
        user.name = await exports.userNameRules.check(user.name).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        user.password = await exports.twoPasswordRules.check(user.password, user.password2).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        user.email = await exports.emailRules.check(user.email).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
    */
    /*
        user.email = await exports.validateEmail(user.email).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        user.name = await exports.validateUserName(user.name).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        user.password = user.password2 = await exports.validatePassword(user.password, user.password2).then(resolved => {
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
            throw exports.parsePostgresError(rejected, new sj.Error({
                log: true,
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
exports.getUser = async function (user) {
    //TODO userNameRules has userName field ids, this wont target them because they wont exist - find a fix for this or maybe just send unfound DOM notices to the general notice by default?

    await sj.Rules.checkRuleSet([
        [exports.userNameRules, user.name],
    ]);

    return db.one('SELECT * FROM "sj"."users_public" WHERE "id" = $1', [id]).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
                origin: 'getUser()',
                message: 'could not get user',
                target: 'notify',
                cssClass: 'notifyError',
        }));
    }).then(resolved => {
        return new sj.User(resolved); // !!!  requires that table names are the same as object property names
    });
}
exports.editUser = async function (ctx, user) { //TODO
    // TODO should be similar to addUser(), just with a flexible amount of properties, and a WHERE clause, !!! ensure that id does not get changed
    await exports.isLoggedIn(ctx);

    /* TODO
    return db.none('UPDATE "sj."users" SET x = $x, x = $x, x = $x, ... WHERE "id" = x,', [x, ...]).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
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
exports.deleteUser = async function (ctx, user) {
    await exports.isLoggedIn(ctx);

    await sj.Rules.checkRuleSet([
        [exports.passwordRules, user.password],
    ]);

    return db.one('SELECT password FROM "sj"."users_self" WHERE "id" = $1', [ctx.session.user.id]).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
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
                throw exports.parsePostgresError(rejected, new sj.Error({
                    log: true,
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
        return logout().catch(sj.andResolve());     
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


//  ███████╗███████╗███████╗███████╗██╗ ██████╗ ███╗   ██╗
//  ██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗  ██║
//  ███████╗█████╗  ███████╗███████╗██║██║   ██║██╔██╗ ██║
//  ╚════██║██╔══╝  ╚════██║╚════██║██║██║   ██║██║╚██╗██║
//  ███████║███████╗███████║███████║██║╚██████╔╝██║ ╚████║
//  ╚══════╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝

// CRUD
exports.login = async function (ctx, user) {
    await sj.Rules.checkRuleSet([
        [exports.userNameRules, user.name],
        [exports.passwordRules, user.password],
    ]);

    return db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
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
                throw exports.parsePostgresError(rejected, new sj.Error({
                    log: true,
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
exports.getMe = async function (ctx) {
    await exports.isLoggedIn(ctx);
    return ctx.session.user;
}
exports.logout = async function (ctx) {
    delete ctx.session.user;

    return new sj.Success({
        log: true,
        origin: 'logout()',
        message: 'user logged out',
        target: 'notify',
        cssClass: 'notifySuccess',
    });
}

// util
exports.isLoggedIn = async function (ctx) {
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
    await sj.Rules.checkRuleSet([
        [exports.positiveIntegerRules, ctx.session.user.id],
    ]);

    return new sj.Success({
        log: true,
        origin: 'isLoggedIn()',
        message: 'user is logged in',
    });
}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   

// rules
exports.playlistNameRules = new sj.Rules({
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
exports.visibilityRules = new sj.Rules({
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
exports.descriptionRules = new sj.Rules({
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
    exports.validatePlaylistName = async function (name) {
        let rules = new sj.Rules({
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

        return await rules.checkAll();
    }
    exports.validateVisibility = async function (visibility) {
        let rules = new sj.Rules({
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

        return await rules.checkAll();
    }
    exports.validateDescription = async function (description) {
        let rules = new sj.Rules({
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

        return await rules.checkAll();
    }
    exports.validateColor = async function (color) {
        let rules = new sj.Rules({
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

        return await rules.checkAll();
    }
    exports.validateImage = async function (image) {
        let rules = new sj.Rules({
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

        return await rules.checkAll();
    }
*/

// CRUD
exports.addPlaylist = async function (ctx, playlist) {
    await exports.isLoggedIn(ctx);

    await sj.Rules.checkRuleSet([
        [exports.playlistNameRules, playlist.name],
        [exports.visibilityRules, playlist.visibility],
        [exports.descriptionRules, playlist.description],
        [exports.imageRules, playlist.image],
        [exports.colorRules, playlist.color],
    ]);
    /*
        var errorList = new sj.ErrorList({
            origin: 'addPlaylist()',
            message: 'one or more issues with fields',
            reason: 'validation functions returned one or more errors',
        });
        if (!(exports.isLoggedIn(ctx))) {
            errorList.content.push(new sj.Error({
                log: true,
                origin: 'addPlaylist()',
                message: 'you must be logged in to add a playlist',
                target: 'notify',
                cssClass: 'notifyError',
            }));
        }
        playlist.name = await exports.playlistNameRules.check(playlist.name).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.visibility = await exports.visibilityRules.check(playlist.visibility).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.description = await exports.descriptionRules.check(playlist.description).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.image = await exports.imageRules.check(playlist.image).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.color = await exports.colorRules.check(playlist.color).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
    */
    /*
        playlist.name = await exports.validatePlaylistName(playlist.name).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.visibility = await exports.validateVisibility(playlist.visibility).then(resolved => {
            return resolved.content;
        }, rejected => {
            return rejected.content;
        });
        playlist.description = await exports.validateDescription(playlist.description).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        playlist.color = await exports.validateColor(playlist.color).then(resolved => {
            return resolved.content;
        }, rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });;
        playlist.image = await exports.validateImage(playlist.image).then(resolved => {
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
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
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
exports.getPlaylist = async function (ctx, playlist) {
    //C validate - get by id or get by userId and playlistName
    //! id is default to null when it isn't set, is this wrong semantics //?
    if (sj.typeOf(playlist.id) !== 'null') { 
        // await sj.Rules.checkRuleSet([
        //     [exports.positiveIntegerRules, playlist.id],
        // ]);
    } else {
        await sj.Rules.checkRuleSet([
            [exports.positiveIntegerRules, ctx.session.user.id],
            [exports.playlistNameRules, playlist.name],
        ]);
    }

    //? does this fail if the wrong dataType is fed in?
    return db.one(`SELECT * FROM "sj"."playlists" WHERE ("id" = $1) OR ("userId" = $2 AND "name" = $3)`, [playlist.id, playlist.userId, playlist.name]).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
            origin: 'getPlaylist()',
            message: 'could not get playlist, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        let playlist = new sj.Playlist(resolved);

        //C if the playlist is not perfectly ordered
        for (let i = 0; i < playlist.content.length; i++) {
            if (playlist.content[0].position !== i+1) { //! SERIAL ids start from 1 by default
                // order it and change playlist to this newly ordered one
                playlist = await exports.orderPlaylist(playlist).catch(rejected => {
                    throw exports.parsePostgresError(rejected, new sj.Error({
                        log: true,
                        origin: 'getPlaylist()',
                        message: 'could not order playlist, database error',
                        target: 'notify',
                        cssClass: 'notifyError',
                    }));
                });
                break;
            }
        }

        return playlist;

        /*
            //TODO permissions
            do this when permissions are sorted out
            if (playlist.visibility === 'public' || playlist.visibility === 'linkOnly' || (playlist.visibility === 'private' && exports.isLoggedIn(ctx) && playlist.userId === ctx.session.user.id)) {

            throw new sj.Error({
                log: true,
                origin: 'getPlaylist()',
                message: 'you do not have permission to access this playlist',
                target: 'notify',
                cssClass: 'notifyError',
            });
        */
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}
exports.editPlaylist = async function (ctx, playlist) { //TODO
}
exports.deletePlaylist = async function (ctx, playlist) {
    await exports.isLoggedIn(ctx);
    
    await sj.Rules.checkRuleSet([
        [exports.positiveIntegerRules, playlist.id],
        [exports.selfRules, playlist.userId, ctx.session.user.id],
    ]);

    return db.none('DELETE FROM "sj"."playlists" WHERE "id" = $1 AND "userId" = $2', [playlist.id, ctx.session.user.id]).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
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

// util
exports.orderPlaylist = async function (playlist) {  
    /*
        //! this shouldn't need to be called anywhere other than getPlaylist() as long as anything that changes a playlist's order calls getPlaylist (before), a call to orderPlaylist (functionally equivalent to getPlaylist()) afterwards, would be redundant as the playlist should be always ordered on retrieval anyways

        
        //R no recursive functions, 1 its not needed in this case, 2 this one caused an infinite loop because of a mistake
        //C retrieve the playlist if it doesn't have its contents
        if (playlist.content.length === 0) { //R this causes an endless loop if the playlist is empty
            // used by sj.Track.playlistId as a shortcut to order playlist in one line
            return await exports.getPlaylist(ctx, playlist);
        }
    */

    // update
    return db.tx(async function (task) {
        let realPlaylist = await task.one(`SELECT * FROM "sj"."playlists" WHERE "id" = $1`, [playlist.id]).catch(rejected => {
            throw exports.parsePostgresError(rejected, new sj.Error({
                log: true,
                origin: 'orderPlaylist()',
                message: 'could not get playlist, database error',
                target: 'notify',
                cssClass: 'notifyError',
            }));
        }).then(resolved => {
            return new sj.Playlist(resolved);
        });

        //C sort by track.position
        realPlaylist.content.stableSort(function (a, b) {
            // https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
            // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript

            // numeric & property compare
            return a.position - b.position;
        });

        //L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
        //L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
        //L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
        await task.none('SET CONSTRAINTS "sj"."tracks_position_key" DEFERRED').catch(rejected => {
            throw exports.parsePostgresError(rejected, new sj.Error({
                log: true,
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
            await task.none('UPDATE "sj"."tracks" SET "position" = $1 WHERE "playlistId" = $2 AND "position" = $3', [index, item.playlistId, item.position]).catch(rejected => {
                throw exports.parsePostgresError(rejected, new sj.Error({
                    log: true,
                    origin: 'orderPlaylist()',
                    message: 'could not order playlist, database error',
                    target: 'notify',
                    cssClass: 'notifyError',
                }));
            });
        });

        return;
    }).then(resolved => {
        //C apply actual indexes for return
        realPlaylist.content.map(function(item, index) {
            item.position = index;
        });
        return realPlaylist;
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
exports.sourceRules = new sj.Rules({
    log: true,
    origin: 'sourceRules',
    message: 'source validated',

    valueName: 'Source',

    against: sj.sourceList,
});
exports.sourceIdRules = new sj.Rules({
    log: true,
    origin: 'sourceIdRules',
    message: 'source id validated',

    valueName: 'Source ID',

    //? any source id rules (other than being a string)? length? trim?
});

// CRUD
exports.addTrack = async function (ctx, track) {
    await exports.isLoggedIn(ctx);

    //C retrieve playlist
    let playlist = await exports.getPlaylist(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
        throw sj.propagateError(rejected);
    });
    //C add track position //! playlist.content.length is accurate because the getPlaylist() orders the playlist
    track.position = playlist.content.length;

    await sj.Rules.checkRuleSet([
        [exports.selfRules, playlist.userId, ctx.session.userId],
        [exports.positiveIntegerRules, track.playlistId],
        [exports.positiveIntegerRules, track.position],
        [exports.sourceRules, track.source],
        [exports.sourceIdRules, track.sourceId],
        [exports.trackNameRules, track.name],
        [exports.positiveIntegerRules, track.duration],
        //TODO validation for arrays (requires nested type checks, and possibly multiple valid types in sj.Rules)
    ]); 
    /*
        var errorList = new sj.ErrorList({
            origin: 'addPlaylist()',
            message: 'one or more issues with fields',
            reason: 'validation functions returned one or more errors',
        });
        track.playlistId = await exports.positiveIntegerRules.check(track.playlistId).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        track.position = await exports.positiveIntegerRules.check(track.position).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        track.source = await exports.sourceRules.check(track.source).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        track.sourceId = await exports.sourceIdRules.check(track.sourceId).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        track.name = await exports.trackNameRules.check(track.name).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        track.duration = await exports.positiveIntegerRules.check(track.duration).catch(rejected => {
            errorList.content.push(rejected);
            return rejected.content;
        });
        //TODO validation for arrays (requires nested type checks, and possibly multiple valid types in sj.Rules)
        if (!(errorList.content.length === 0)) {
            errorList.announce();
            throw errorList;
        }
    */

    //! artists is simply stored as an array, eg. TEXT[]
    return db.none('INSERT INTO "sj"."tracks" ("playlistId", "position", "source", "sourceId", "name", "duration", "artists") VALUES ($1, $2, $3, $4, $5, $6, $7)', [track.playlistId, track.position, track.source, track.id, track.name, track.duration, track.artists]).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
            origin: 'addTrack()',
            message: 'could not add track, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        return exports.orderPlaylist(new sj.Playlist({id: track.playlistId})).catch(rejected => {
            throw exports.parsePostgresError(rejected, new sj.Error({
                log: true,
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
}
exports.deleteTrack = async function (ctx, track) {
    await exports.isLoggedIn(ctx);

    //C retrieve playlist
    let playlist = await exports.getPlaylist(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
        throw sj.propagateError(rejected);
    });

    await sj.Rules.checkRuleSet([
        [exports.selfRules, playlist.userId, ctx.session.userId],
        [exports.positiveIntegerRules, track.playlistId],
        [exports.positiveIntegerRules, track.position],
    ]);

    return db.none('DELETE FROM "sj"."tracks" WHERE "playlistId" = $1 AND "position" = $2', [parseInt(track.playlistId), parseInt(track.position)]).catch(rejected => {
        throw exports.parsePostgresError({
            log: true,
            origin: 'deleteTrack()',
            message: 'failed to delete track, database error',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).then(resolved => {
        return exports.orderPlaylist(new sj.Playlist({id: track.playlistId})).catch(rejected => {
            throw exports.parsePostgresError(rejected, new sj.Error({
                log: true,
                origin: 'deleteTrack()',
                message: 'could not order playlist, database error',
                target: 'notify',
                cssClass: 'notifyError',
            }));
        });
    }).then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'deleteTrack()',
            content: track,
            target: 'notify',
            cssClass: 'notifySuccess', 
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

// util
exports.moveTrack = async function (ctx, track, position) {
    let playlist = await exports.getPlaylist(ctx, track.playlistId).catch(rejected => {
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
        throw new sj.Error({
            log: true,
            origin: 'moveTrack()',
            message: 'track position cannot be negative',
        });
    }

    playlist = await exports.orderPlaylist(new sj.Playlist({id: track.playlistId})).catch(rejected => {
        throw exports.parsePostgresError(rejected, new sj.Error({
            log: true,
            origin: 'addTrack()',
            message: 'could not order playlist, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    });

    return new sj.Success({
        log: true,
        origin: 'moveTrack()',
        message: 'moved track',
        content: playlist,
    });
}