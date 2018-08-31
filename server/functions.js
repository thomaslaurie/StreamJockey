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
]

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

    useAgainst: true,
    get againstMessage() {return 'Passwords do not match'},
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
        [userNameRules, user.name],
        [setPasswordRules, user.password, user.password2],
        [emailRules, user.email],
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
            throw db.parsePostgresError(rejected, new sj.Error({
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
        [userNameRules, user.name],
    ]);

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
exports.editUser = async function (ctx, user) { //TODO
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

    await sj.Rules.checkRuleSet([
        [passwordRules, user.password],
    ]);

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
        [userNameRules, user.name],
        [passwordRules, user.password],
    ]);

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
exports.isLoggedIn = function (ctx) {
    //C redundancy check to make sure id is right format
    //TODO a whole bunch of de-async-ing was done in sj.Rules just so this function could be synchronous, is this such a big deal if its not?
    ctx.session.user.id = positiveIntegerRules.check(ctx.session.user.id).catch(rejected => {
        return undefined;
    });
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
    await exports.isLoggedIn(ctx).catch(rejected => {

    });
    if (!(exports.isLoggedIn(ctx))) {
        throw new sj.Error({
            log: true,
            origin: 'addPlaylist()',
            message: 'you must be logged in to add a playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    await sj.Rules.checkRuleSet([
        [playlistNameRules, playlist.name],
        [visibilityRules, playlist.visibility],
        [descriptionRules, playlist.description],
        [imageRules, playlist.image],
        [colorRules, playlist.color],
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
    //C validate - get by id or get by userId and playlistName
    if (sj.typeOf(playlist.id) !== 'undefined') {
        await sj.Rules.checkRuleSet([
            [positiveIntegerRules, playlist.id],
        ]);
    } else {
        await sj.Rules.checkRuleSet([
            [positiveIntegerRules, playlist.userId],
            [playlistNameRules, playlist.name],
        ]);
    }

    //? does this fail if the wrong dataType is fed in?
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
            return exports.orderPlaylist(ctx, playlist);
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
exports.editPlaylist = async function (ctx, playlist) { //TODO
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
    
    await sj.Rules.checkRuleSet([
        [positiveIntegerRules, playlist.id],
        [selfRules, playlist.userId, ctx.session.user.id],
    ]);

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
    if (!(exports.isLoggedIn(ctx))) {
        throw new sj.Error({
            log: true,
            origin: 'addTrack()',
            message: 'you must be logged in to add a track',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    //C retrieve playlist
    let playlist = await exports.getPlaylist(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
        throw sj.propagateError(rejected);
    });
    //C add track position //! playlist.content.length is accurate because the getPlaylist() orders the playlist
    track.position = playlist.content.length;

    await sj.Rules.checkRuleSet([
        [selfRules, playlist.userId, ctx.session.userId],
        [positiveIntegerRules, track.playlistId],
        [positiveIntegerRules, track.position],
        [sourceRules, track.source],
        [sourceIdRules, track.sourceId],
        [trackNameRules, track.name],
        [positiveIntegerRules, track.duration],
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
    if (!(exports.isLoggedIn(ctx))) {
        throw new sj.Error({
            log: true,
            origin: 'addTrack()',
            message: 'you must be logged in to add a track',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    //C retrieve playlist
    let playlist = await exports.getPlaylist(ctx, new sj.Playlist({id: track.playlistId})).catch(rejected => {
        throw sj.propagateError(rejected);
    });

    await sj.Rules.checkRuleSet([
        [selfRules, playlist.userId, ctx.session.userId],
        [positiveIntegerRules, track.playlistId],
        [positiveIntegerRules, track.position],
    ]);

    return db.none('DELETE FROM "sj"."tracks" WHERE "playlistId" = $1 AND "position" = $2', [parseInt(track.playlistId), parseInt(track.position)]).catch(rejected => {
        throw db.parsePostgresError({
            log: true,
            origin: 'deleteTrack()',
            message: 'failed to delete track, database error',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).then(resolved => {
        //! this must happen AFTER the delete or else delete will delete the wrong track
        return exports.orderPlaylist(ctx, track.playlistId);
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

    playlist = await exports.orderPlaylist(ctx, playlist).catch(rejected => {
        throw sj.propagateError(rejected);
    })
}