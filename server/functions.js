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



// ---------- other stuff from top.php

// last page history (I think this goes in routing or something???)
const exclusionList = [
    // since pages are no longer php and the page/code difference is bigger, this isnt really relevant
]
let excluded = false;
exclusionList.forEach(item => {
    if (false /* strpos($_SERVER['REQUEST_URI'], $uri) */) {
        excluded = true;
    }
});

// if this page is not excluded, shift page history
if (!excluded) {
    ctx.session.pastPage = ctx.session.currentPage !== 'undefined' ? ctx.session.currentPage : 'index.html';
    ctx.session.currentPage = ''; /* $_SESSION['currentPage'] = $_SERVER['REQUEST_URI']; */
}




// TODO session_regenerate_id() ? if using, add in same locations as php version
// TODO consider changing target: 'notify' to target: 'general' ?

//   █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
//  ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
//  ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   
//  ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   
//  ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   
//  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   

async function validateEmail(email) {
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
async function validateUserName(name) {
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
async function validatePassword(password1, password2) {
    let conditions = new sj.Conditions({
        log: true,
        origin: 'validatePassword()',
        message: 'password validated',
        target: 'registerPassword',
        cssClass: 'inputError',

        content: password1,

        name: 'Password',
        min: 6,
        max: 72, // as per bcrypt
        against: password2,
        againstMessage: 'Passwords do not match',
    });
   
    return await conditions.checkAll();
}

async function register(email, name, password1, password2) {
    var errorList = new SjErrorList({
        origin: 'validatePassword()',
        message: 'one or more issues with fields',
        reason: 'validation functions returned one or more errors',
    });
    email = await validateEmail(email).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });
    name = await validateUserName(name).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });
    password1 = await validatePassword(password1, password2).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });
    if (!(errorList.content.length !== 0)) {
        errorList.announce();
        throw errorList;
    }

    return  db.none('SELECT name FROM users WHERE name = $1', [name])
    .then(resolved => {
        return bcrypt.hash(myPlaintextPassword, saltRounds);
    }, rejected => {
        // TODO how to distinguish sql error from failure?, pg-promise see error types: http://vitaly-t.github.io/pg-promise/errors.html

        throw new sj.Error({
            log: true,
            origin: 'register()',
            code: rejected.code,
            message: 'database error',
            reason: rejected.message,
            content: rejected,
        });
    }).then(resolved => {
        return db.none('INSERT INTO users(email, name, password) VALUES ($1, $2, $3)', [email, name, resolved]);
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'register()',
            message: 'failed to register user',
            reason: 'hash failed',
            content: rejected,
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).then (resolved => {
        return new sj.Success({
            log: true,
            origin: 'register()',
            message: `${name} registered`,
            cssClass: 'notifySuccess',
            content: name,
        });
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'register()',
            code: rejected.code,
            message: 'could not register user',
            reason: rejected.message,
            content: rejected,
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

async function login(ctx, name, password) { 
    name = name.trim();

    db.one('SELECT id, name, password FROM users WHERE name = $1', [name])
    .then(resolved => {
        return bcrypt.compare(password, resolved.password);     
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'login()',
            message: 'database error',
            reason: rejected.message,
            content: rejected,
        });
    }).then(resolved => {
        if (resolved) {
            ctx.session.user = new sj.User(resolved); // TODO ensure nothing sensitive is being passed here (back to client)
            // TODO user id is basically their access key -> how do I ensure this is secure too? (aside from using a secure connection), it has to do with koa-session and how the session keys work - figure this out
            return new sj.Success({
                log: true,
                origin: 'login()',
                message: 'user logged in',
                target: 'notify',
                cssClass: 'notifySuccess',
                content: ctx.session.user,
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
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'login()',
            message: 'server error',
            reason: 'hash compare failed',
            content: rejected,
            target: 'loginPassword',
            cssClass: 'inputError',
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}
async function logout(ctx) {
    ctx.session.user = undefined;

    return new sj.Success({
        log: true,
        origin: 'logout()',
        message: 'user logged out',
        target: 'notify',
        cssClass: 'notifySuccess',
    });
}

function isLoggedIn(ctx) {
    // TODO is this the proper way to check being logged in? what about verifying user.id type, or if they exist?
    return sj.typeOf(ctx.session.user) !== 'undefined' && sj.typeOf(ctx.session.user.id) !== 'undefined';
}

// get
/*
async function getCurrentUser() {
    // TODO this shouldn't be needed with the new SjUser login (entire user object is stored in session, not just userId)
}
*/

async function getUser(id) {
    if (sj.typeOf(id) === 'number') {
        db.one('SELECT * FROM users WHERE id = $1', [id]) // TODO don't retrieve all columns (privacy) (ie password), actually another option could be creating two different child classes of sj.User: sj.PublicUser and sj.PrivateUser so that they only initialize proper values, and is cleaner than making a custom query
        .then(resolved => {
            return new sj.User(resolved);
        }, rejected => {
            throw new sj.Error({
                log: true,
                origin: 'getUser()',
                message: 'could not get user information',
                reason: '', // TODO
                target: 'notify',
                cssClass: 'notifyError',
            });
        });
    } else {
        throw new sj.Error({
            log: true,
            origin: 'getUser()',
            message: 'user id is not a number',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }
}


//  ██████╗ ██╗      █████╗ ██╗   ██╗██╗     ██╗███████╗████████╗
//  ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██║     ██║██╔════╝╚══██╔══╝
//  ██████╔╝██║     ███████║ ╚████╔╝ ██║     ██║███████╗   ██║   
//  ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██║     ██║╚════██║   ██║   
//  ██║     ███████╗██║  ██║   ██║   ███████╗██║███████║   ██║   
//  ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝╚══════╝   ╚═╝   

async function validatePlaylistName(name) {
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
async function validateVisibility(visibility) {
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
async function validateDescription(description) {
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
async function validateColor(color) {
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
async function validateImage(image) {
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

// TODO add in a ton of redundancy and checks for permissions, data types, validation, etc.

// playlist
async function addPlaylist(ctx, name, visibility, description, color, image) {
    if(!(isLoggedIn(ctx))) {
        throw new sj.Error({
            log: true,
            origin: 'addPlaylist()',
            message: 'you must be logged in to add a playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    var errorList = new SjErrorList({
        origin: 'addPlaylist()',
        message: 'one or more issues with fields',
        reason: 'validation functions returned one or more errors',
    });
    name = await validatePlaylistName(name).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });
    visibility = await validateVisibility(visibility).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });
    description = await validateDescription(description).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });
    color = await validateColor(color).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });;
    image = await validateImage(image).then(resolved => {
        return resolved.content;
    }, rejected => {
        errorList.content.push(rejected);
        return rejected.content;
    });
    if (!(errorList.content.length !== 0)) {
        errorList.announce();
        throw errorList;
    }

    return  db.none('SELECT name FROM playlists WHERE name = $1 AND user = $2', [name, ctx.session.user.id])
    .then(resolved => {
        return db.none('INSERT INTO playlists(name, visibility, description, color, image) VALUES ($1, $2, $3, $4, $5)', [name, visibility, description, color, image]);
    }, rejected => {
        // TODO see register()
        throw new sj.Error({
            log: true,
            origin: 'addPlaylist()',
            code: rejected.code,
            message: 'playlist already exists',
            reason: rejected.message,
            content: rejected,
        });
    }).then (resolved => {
        return new sj.Success({
            log: true,
            origin: 'addPlaylist()',
            message: `${name} added`,
            cssClass: 'notifySuccess',
            content: new sj.Playlist({
                // property value shorthand
                name,
                visibility,
                description,
                color,
                image,
            }),
        });
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'addPlaylist()',
            code: rejected.message,
            message: 'failed to add playlist',
            reason: rejected.message,
            content: rejected,
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

// TODO consider using id inside of object instead?
async function deletePlaylist(ctx, id) {
    if(!(isLoggedIn(ctx))) {
        throw new sj.Error({
            log: true,
            origin: 'deletePlaylist()',
            message: 'you must be logged in to delete a playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    // TODO is a check if the playlist exists necessary? will delete throw back an error if it doesn't exist? what happens if the user tries to delete a playlist that isn't theirs? it will return successful but nothing will happen - 0 feedback telling them it isn't theirs
    return db.none('DELETE FROM playlists WHERE id = $1 AND userId = $2', [id, ctx.session.user.id])
    .then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'deletePlaylist()',
            message: 'playlist deleted',
            target: 'notify',
            cssClass: 'notify success',
        });
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'deletePlaylist()',
            message: 'playlist could not be deleted',
            reason: rejected.message, // TODO
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

async function getPlaylist(ctx, id) {
    if (!(sj.typeOf(id) === 'number')) {
        throw new sj.Error({
            log: true,
            origin: 'getPlaylist()',
            message: 'invalid playlist id',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }

    db.one('SELECT * FROM playlists WHERE id = $1', [id])
    .then(resolved => {
        // TODO properly convert database object to js object
        // TODO check visibility & user permissions
        resolved = recreateObject(resolved);

        if (resolved.visibility === 'public' || resolved.visibility === 'linkOnly' || (resolved.visibility === 'private' && resolved.userId === ctx.session.user.id)) {
            return resolved;
        } else {
            throw new sj.Error({
                log: true,
                origin: 'getPlaylist()',
                message: 'you do not have permission to access this playlist',
                target: 'notify',
                cssClass: 'notifyError',
            });
        }
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'getPlaylist()',
            message: 'could not retrieve playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).then(resolved => {
        return await orderPlaylist(ctx, resolved);
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

// TODO maybe just include a check if the playlist is ordered and then include this function in every interaction with the playlist? (just be careful that its done in the right order, if delete is called after an order it will delete the wrong track)
async function orderPlaylist(ctx, playlist) { // playlist can be the playlistId number (for ordering an existing playlist) or a sj.Playlist object (for updating a playlist's order)
    if (sj.typeOf(playlist) === 'number') { // guard clause
        
        // !!! semi-recursive, calls getPlaylist() before orderPlaylist() (built-in)
        return await getPlaylist(ctx, playlist).catch(rejected => {
            throw sj.propagateError(rejected);
        });
    }

    try {
        playlist.content.stableSort(function (a, b) {
            // https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
            // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript

            // numeric & property compare
            return a.position - b.position;
        });
    } catch (e) {
        // TODO is this necessary? can this even fail?
        throw new sj.Error({
            log: true,
            origin: 'orderPlaylist()',
            message: 'playlist sort failed',
            content: e,
        });
    }

    // update
    return db.tx(async function (task) {
        // pg-promise transactions: https://github.com/vitaly-t/pg-promise#transactions

        // deferrable constraints: https://www.postgresql.org/docs/9.1/static/sql-set-constraints.html, https://stackoverflow.com/questions/2679854/postgresql-disabling-constraints
        await task.none('SET CONSTRAINTS playlist_position_unique DEFERRED');

        // update position based on index
        // !!! this will only update rows that are already in the table, will not add anything new to the sorted playlist, therefore will still have gaps if the playlist has more rows than the database or duplicates if it has less
        playlist.content.map(function (item, index) {
            await task.none('UPDATE tracks SET "position" = $1 WHERE "position" = $2 AND playlistId = $3', [index, item.position, item.playlistId]);
        });
    }).then(resolved => {
        // TODO any use for transaction resolved data? isn't this just what the callback function returns?

        // apply actual indexes for return
        playlist.content.map(function(item, index) {
            item.position = index;
        });
        return playlist;
    }).catch(rejected => {
        throw new sj.Error({
            log: true,
            origin: 'orderPlaylist()',
            message: 'database error when re-ordering playlist',
            content: rejected,
        });
    });
}

async function addTrack(ctx, track, playlistId) {
    // TODO how does this interact, does the track already have playlistId attached? or does it get added on function call? or on success? how does this interfere by adding tracks already in another playlist?
    var playlist = await getPlaylist(playlistId).catch(rejected => {
        throw sj.propagateError(rejected);
    });
    track.playlistId = playlist.id; 
    track.position = playlist.content.length;

    // !!! artists is simply stored as an array, eg. TEXT[]
    db.none('INSERT INTO tracks (playlistId, "position", source, id, title, artists, duration) VALUES ($1, $2, $3, $4, $5, $6, $7)', [track.playlistId, track.position, track.source, track.id, track.name, track.artists, track.duration])
    .then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'addTrack()',
            target: 'notify',
            cssClass: 'notifySuccess',
            content: track,
        });
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'addTrack()',
            message: 'failed to add track',
            content: rejected,
        });
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

async function deleteTrack(ctx, track) {
    db.none('DELETE FROM tracks WHERE playlistId = $1 AND "position" = $2', [track.playlistId, track.position])
    .then(resolved => {
        return await orderPlaylist(ctx, track.playlistId);
    }, rejected => {
        throw new sj.Error({
            log: true,
            origin: 'deleteTrack()',
            message: 'failed to delete track, or does not exist',
            target: 'notify',
            cssClass: 'notifyError',
        });
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

async function moveTrack(ctx, track, position) {
    let playlist = await getPlaylist(ctx, track.playlistId).catch(rejected => {
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

    playlist = orderPlaylist(ctx, playlist).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}