const sj = require('../public/js/global.js');
const db = require('./database/db.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
// !!! string to be hashed must not be greater than 72 characters (or bytes???), TODO figure out how many characters/bytes a hash can be then validate against that

const stringMaxLength = 100;
const bigStringMaxLength = 2000;

const nameMinLength = 3;
const nameMaxLength = 16;

const defaultColor = '#ffffff';

const visibilityStates = [
    'public',
    'private',
    'linkOnly',
]

// !!! REFLECTION catches should be attached behind every async function and not paired next to .then() - this straightens out the chain ordering (as opposed to two steps forward, one step back -style), this also stops upstream errors from triggering all downstream catches and nesting every error

// ----- other stuff from top.php

// last page history (I think this goes in routing or something???)

// const exclusionList = [
//     // since pages are no longer php and the page/code difference is bigger, this isnt really relevant
// ]
// let excluded = false;
// exclusionList.forEach(item => {
//     if (false /* strpos($_SERVER['REQUEST_URI'], $uri) */) {
//         excluded = true;
//     }
// });

// // if this page is not excluded, shift page history
// if (!excluded) {
//     ctx.session.pastPage = ctx.session.currentPage !== 'undefined' ? ctx.session.currentPage : 'index.html';
//     ctx.session.currentPage = ''; /* $_SESSION['currentPage'] = $_SERVER['REQUEST_URI']; */
// }

/*
    Create -> add
    Retrieve -> get
    Update -> edit
    Delete -> delete
*/

// TODO check that all parameters exist & handle if they dont

// TODO session_regenerate_id() ? if using, add in same locations as php version
// TODO consider changing target: 'notify' to target: 'general' ?

// TODO user id being in the session.user object is basically the user's access key -> how do I ensure this is secure too? (aside from using a secure connection), it has to do with koa-session and how the session keys work - figure this out - I think this info is never sent to the client, just stored in the server and accessed via cookie key

// TODO add in a ton of redundancy and checks for permissions, data types, validation, etc.



//  ██╗   ██╗███████╗███████╗██████╗ 
//  ██║   ██║██╔════╝██╔════╝██╔══██╗
//  ██║   ██║███████╗█████╗  ██████╔╝
//  ██║   ██║╚════██║██╔══╝  ██╔══██╗
//  ╚██████╔╝███████║███████╗██║  ██║
//   ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝

// validate
exports.emailConditions = new sj.Conditions({
    log: true,
    origin: 'emailConditions',
    message: 'email validated',
    target: 'registerEmail',
    cssClass: 'inputError',

    name: 'E-mail',
    trim: true,

    min: 3,
    max: stringMaxLength,

    //TODO filter: ___, filterMessage: ___, 
    //L https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
});
exports.userNameConditions = new sj.Conditions({
    log: true,
    origin: 'userNameConditions',
    message: 'username validated',
    target: 'registerUserName',
    cssClass: 'inputError',

    name: 'Username',
    trim: true,

    min: nameMinLength,
    max: nameMaxLength,
});
exports.passwordConditions = new sj.Conditions({
    log: true,
    origin: 'validatePassword()',
    message: 'password validated',
    target: 'registerPassword',
    cssClass: 'inputError',

    name: 'Password',

    min: 6,
    max: 72, //! as per bcrypt

    againstMessage: 'Passwords do not match',
})

/*
    exports.validateEmail = async function (email) {
        let conditions = new sj.Conditions({
            log: true,
            origin: 'validateEmail()',
            message: 'email validated',
            target: 'registerEmail',
            cssClass: 'inputError',

            content: email,

            name: 'E-mail',
            min: 3,
            max: stringMaxLength,
            trim: true,
            // TODO filter: ___, filterMessage: ___, // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        });

        return await conditions.checkAll();
    }
    exports.validateUserName = async function (name) {
        let conditions = new sj.Conditions({
            log: true,
            origin: 'validateUserName()',
            message: 'username validated',
            target: 'registerUserName',
            cssClass: 'inputError',

            content: name,

            name: 'Username',
            min: nameMinLength,
            max: nameMaxLength,
            trim: true,
        });

    return await conditions.checkAll();
    }
    exports.validatePassword = async function (password, password2) {
        let conditions = new sj.Conditions({
            log: true,
            origin: 'validatePassword()',
            message: 'password validated',
            target: 'registerPassword',
            cssClass: 'inputError',

            content: password,

            name: 'Password',
            min: 6,
            max: 72, // as per bcrypt
            against: password2,
            againstMessage: 'Passwords do not match',
        });
    
        return await conditions.checkAll();
    }
*/

// CRUD
exports.addUser = async function (user) {
    var errorList = new sj.ErrorList({
        origin: 'validatePassword()',
        message: 'one or more issues with fields',
        reason: 'validation functions returned one or more errors',
    });
    user.email = await exports.emailConditions.check(user.email).catch(rejected => {
        throw sj.propagateError(rejected);
    });
    user.name = await exports.userNameConditions.check(user.name).catch(rejected => {
        throw sj.propagateError(rejected);
    });
    user.password = await exports.userNameConditions.check(user.password, user.password2).catch(rejected => {
        throw sj.propagateError(rejected);
    });
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
    if (!(errorList.content.length === 0)) {
        errorList.announce();
        throw errorList;
    }

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
            throw db.parsePostgresError(rejected, new sj.Error({
                log: true,
                origin: 'addUser()',
                message: 'could not add user',
                target: 'notify',
                cssClass: 'notifyError',
            }));
        });
    }).then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'register()',
            message: `${user.name} registered`,
            cssClass: 'notifySuccess',
            content: user, // TODO don't return plaintext password
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}
exports.getUser = async function (user) {
    // TODO why is this easier than using the sj.Conditions class?
    if (!(sj.typeOf(user.name) === 'string')) {
        throw new sj.Error({
            log: true,
            origin: 'getUser()',
            message: 'user name must be a string',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    return db.one('SELECT * FROM "sj"."users_public" WHERE "id" = $1', [id]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
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
exports.editUser = async function (ctx, user) {
    // TODO should be similar to addUser(), just with a flexible amount of properties, and a WHERE clause, !!! ensure that id does not get changed

    if (!exports.isLoggedIn(ctx)) {
        throw notLoggedInError;
    }


    /* TODO
    return db.none('UPDATE "sj."users" SET x = $x, x = $x, x = $x, ... WHERE "id" = x,', [x, ...]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
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
    if (!exports.isLoggedIn(ctx)) {
        throw notLoggedInError;
    }

    return db.one('SELECT password FROM "sj"."users_self" WHERE "id" = $1', [ctx.session.user.id]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
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
                throw db.parsePostgresError(rejected, new sj.Error({
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
        await logout().catch(rejected => {
            throw propagateError(rejected);
        });
        return resolved;
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
    user.name = user.name.trim();

    return db.one('SELECT password FROM "sj"."users" WHERE "name" = $1', [user.name]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
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
                throw db.parsePostgresError(rejected, new sj.Error({
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
    if (!exports.isLoggedIn(ctx)) {
        throw notLoggedInError;
    }
    return ctx.session.user;
}
// !!!  these isn't an async function
exports.logout = async function (ctx) {
    ctx.session.user = undefined;

    return new sj.Success({
        log: true,
        origin: 'logout()',
        message: 'user logged out',
        target: 'notify',
        cssClass: 'notifySuccess',
    });
}

// util
exports.isLoggedIn = function (ctx) {
    // TODO is this the proper way to check being logged in? what about verifying user.id type, or if they exist?
    return sj.typeOf(ctx.session.user) !== 'undefined' && sj.typeOf(ctx.session.user.id) !== 'undefined';
}
exports.notLoggedInError = new sj.Error({
    code: 403,

    message: 'you must be logged in to do this',
    reason: 'user is not logged in',
    target: 'notify',
    cssClass: 'notifyError', // TODO consider denial error rather than error error (you messed up vs I messed up)
});


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   

// ---------------- CONVERT PLAYLIST CONDITIONS

// validate
exports.validatePlaylistName = async function (name) {
    let conditions = new sj.Conditions({
        log: true,
        origin: 'validatePlaylistName()',
        message: 'name validated',
        target: 'playlistName',
        cssClass: 'inputError',

        content: name,

        name: 'Name',
        min: nameMinLength,
        max: stringMaxLength,
        trim: true,
    });

    return await conditions.checkAll();
}
exports.validateVisibility = async function (visibility) {
    let conditions = new sj.Conditions({
        log: true,
        origin: 'validateVisibility()',
        message: 'visibility validated',
        target: 'playlistVisibility',
        cssClass: 'inputError',

        content: visibility,

        name: 'Visibility',
        against: visibilityStates,
        againstMessage: 'please select a valid visibility level',
    });

    return await conditions.checkAll();
}
exports.validateDescription = async function (description) {
    let conditions = new sj.Conditions({
        log: true,
        origin: 'validateDescription()',
        message: 'description validated',
        target: 'playlistDescription',
        cssClass: 'inputError',

        content: description,

        name: 'Visibility',
        max: bigStringMaxLength,
        trim: true,
    });

    return await conditions.checkAll();
}
exports.validateColor = async function (color) {
    let conditions = new sj.Conditions({
        log: true,
        origin: 'validateColor()',
        message: 'color validated',
        target: 'playlistColor',
        cssClass: 'inputError',

        content: color,

        name: 'Color',
        trim: true,
        filter: '/#([a-f0-9]{3}){1,2}\b/', // TODO is this correct?
        filterMessage: 'Color must be in hex format #XXXXXX',
    });

    return await conditions.checkAll();
}
exports.validateImage = async function (image) {
    let conditions = new sj.Conditions({
        log: true,
        origin: 'validateColor()',
        message: 'image validated',
        target: 'playlistImage',
        cssClass: 'inputError',

        content: image,

        name: 'Image',
        max: bigStringMaxLength,
        trim: true,
        // TODO filter: ___,
        filterMessage: 'Image must be a valid url',
    });

    return await conditions.checkAll();
}

// CRUD
exports.addPlaylist = async function (ctx, playlist) {
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
    if (!(errorList.content.length === 0)) {
        errorList.announce();
        throw errorList;
    }

    return db.none('INSERT INTO "sj"."playlists" ("userId", "name", "description", "visibility", "image", "color") VALUES ($1, $2, $3, $4, $5, $6)', [ctx.session.user.id, playlist.name, playlist.description, playlist.visibility, playlist.image, playlist.color]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
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
    // TODO verify and parse id and userId

    if (!(sj.typeOf(playlist.name) === 'string')) {
        throw new sj.Error({
            log: true,
            origin: 'getPlaylist()',
            message: 'playlist name must be a string',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    return db.one(`SELECT * FROM "sj"."playlists" WHERE ("id" = $1) OR (userId = "$2" AND name" = $3)`, [playlist.id, playlist.userId, playlist.name]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
            log: true,
            origin: 'getPlaylist()',
            message: 'could not get playlist, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        let playlist = new sj.Playlist(resolved);

        if (playlist.visibility === 'public' || playlist.visibility === 'linkOnly' || (playlist.visibility === 'private' && exports.isLoggedIn(ctx) && playlist.userId === ctx.session.user.id)) {
            return await exports.orderPlaylist(ctx, playlist);
        } else {
            throw new sj.Error({
                log: true,
                origin: 'getPlaylist()',
                message: 'you do not have permission to access this playlist',
                target: 'notify',
                cssClass: 'notifyError',
            });
        }
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}
exports.editPlaylist = async function (ctx, playlist) {
    // TODO
}
exports.deletePlaylist = async function (ctx, playlist) {
    if(!(exports.isLoggedIn(ctx))) {
        throw new sj.Error({
            log: true,
            origin: 'deletePlaylist()',
            message: 'you must be logged in to delete a playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }
    if (!(ctx.session.user.id === playlist.userId)) {
        throw new sj.Error({
            log: true,
            origin: 'deletePlaylist()',
            message: 'you are not the owner of this playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }
    // TODO is a check if the playlist exists necessary? will delete throw back an error if it doesn't exist?  it will return successful but nothing will happen
    return db.none('DELETE FROM "sj"."playlists" WHERE "id" = $1 AND "userId" = $2', [playlist.id, ctx.session.user.id]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
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
//TODO maybe just include a check if the playlist is ordered and then include this function in every interaction with the playlist? (just be careful that its done in the right order, if delete is called after an order it will delete the wrong track)
exports.orderPlaylist = async function (ctx, playlist) { 
    //C retrieve the playlist if it doesn't have its contents
    if (playlist.content.length === 0) {
        // used by sj.Track.playlistId as a shortcut to order playlist in one line
        return await exports.getPlaylist(ctx, playlist);
    }

    //C sort by track.position
    playlist.content.stableSort(function (a, b) {
        // https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
        // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript

        // numeric & property compare
        return a.position - b.position;
    });
    
    // update
    return db.tx(async function (task) {
        //L pg-promise transactions https://github.com/vitaly-t/pg-promise#transactions
        //L deferrable constraints  https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html
        //L https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
        await task.none('SET CONSTRAINTS "sj"."tracks_position_key" DEFERRED');

        //C update position based on index
        //! this will only update rows that are already in the table, will not add anything new to the sorted playlist, therefore will still have gaps if the playlist has more rows than the database or duplicates if it has less
        //? possible memory leak error here 
        playlist.content.map(async function (item, index) {
            await task.none('UPDATE "sj"."tracks" SET "position" = $1 WHERE "playlistId" = $2 AND "position" = $3', [index, item.playlistId, item.position]);
        });

        return;
    }).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
            log: true,
            origin: 'orderPlaylist()',
            message: 'could not order playlist, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }).then(resolved => {
        //C apply actual indexes for return
        playlist.content.map(function(item, index) {
            item.position = index;
        });
        return playlist;
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

// -------------- CLEAN ALL OF THIS, ADD NEW TRACK CONDITIONS

// CRUD
exports.addTrack = async function (ctx, track) {
    //! tracks should be added in the api via new sj.Track(originalTrack), to duplicate the reference by copying over the attributes - //? why did I write this, what does this mean? sending tracks to the server stringify-s them and strips the reference

    if (!(exports.isLoggedIn(ctx))) {
        errorList.content.push(new sj.Error({
            log: true,
            origin: 'addTrack()',
            message: 'you must be logged in to add a track',
            target: 'notify',
            cssClass: 'notifyError',
        }));
    }

    // assign a position
    var playlist = await exports.getPlaylist(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
        throw sj.propagateError(rejected);
    });
    track.position = playlist.content.length;

    if (){} //TODO check permissions

    //! artists is simply stored as an array, eg. TEXT[]
    return db.none('INSERT INTO "sj"."tracks" ("playlistId", "position", "source", "sourceId", "name", "duration", "artists") VALUES ($1, $2, $3, $4, $5, $6, $7)', [track.playlistId, track.position, track.source, track.id, track.name, track.duration, track.artists]).catch(rejected => {
        throw db.parsePostgresError(rejected, new sj.Error({
            log: true,
            origin: 'addTrack()',
            message: 'could not add track, database error',
            target: 'notify',
            cssClass: 'notifyError',
        }));
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
    //TODO verify data (number, parse if not number)
    let idCheck = new sj.Conditions({
        log: true,
        origin: 'deleteTrack()',
        message: 'verified number',

        //TODO //!IMPORTANT//! shouldn't the sj.Conditions just be its own object to which variables are checked against, so they can be reused?
        content: track.playlistId,

        name: 'track id',
        dataType: 'integer',
    });


    track.playlistId = await idCheck.checkAll().catch(rejected => {
        throw propagateError(rejected);
    });

    idCheck.content = track.position;

    track.position = await idCheck.checkAll().catch(rejected => {
        throw propagateError(rejected);
    });

    return db.none('DELETE FROM "sj"."tracks" WHERE "playlistId" = $1 AND "position" = $2', [parseInt(track.playlistId), parseInt(track.position)]).catch(rejected => {
        throw new sj.Error({
            log: true,
            origin: 'deleteTrack()',
            code: rejected.code,
            message: 'failed to delete track, or does not exist',
            reason: rejected.message,
            content: rejected,
            target: 'notify',
            cssClass: 'notifyError',
        });
    })
    .then(resolved => {
        return exports.orderPlaylist(ctx, track.playlistId);
    }).then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'deleteTrack()',
            target: 'notify',
            cssClass: 'notifySuccess',
            content: track,
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

// util
exports.moveTrack = async function (ctx, track, position) {
    let playlist = await exports.getPlaylist(ctx, track.playlistId);

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

    playlist = exports.orderPlaylist(ctx, playlist);
}