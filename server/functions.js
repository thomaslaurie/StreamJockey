const sj = require('../public/js/global.js');
const db = require('./database/db.js');

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

// TODO session_regenerate_id() ? if using, add in same locations as php version
// TODO consider changing target: 'notify' to target: 'general' ?

//   █████╗  ██████╗ ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
//  ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
//  ███████║██║     ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   
//  ██╔══██║██║     ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   
//  ██║  ██║╚██████╗╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   
//  ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   

async function filterEmail(email) {
    //TODO
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    return true;
}

// TODO consider converting these if statements to promise functions, consider making field requirements part of an object?
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
        // TODO filter: ___, filterMessage: ___,
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
        max: stringMaxLength,
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

    if (errorList.content.length !== 0) {
        // TODO this isn't correct - what we're checking for here is if there is not a name already in the table
        return  db.one('SELECT name FROM users WHERE name = $1', [name])
        .then(resolved => {
            // TODO get hashed password from password1
            var passwordHashed = 'placeholder';

            return db.none('INSERT INTO users(email, name, password) VALUES ($1, $2, $3)', [email, name, passwordHashed]);
        }, rejected => {
            throw new sj.Error({
                log: true,
                origin: 'register()',
                message: 'database error',
                reason: rejected.message,
                content: rejected,
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
                message: 'could not register user',
                reason: rejected.message,
                content: rejected,
                target: 'notify',
                cssClass: 'notifyError',
            });
        }).catch(rejected => {
            throw propagateError(rejected);
        });
    } else {
        errorList.announce();
        throw errorList;
    }
}

async function login(name, password) { 
    name = name.trim();

    db.one('SELECT id, name, password FROM users WHERE name = $1', [name])
    .then(resolved => {
        // TODO verify password
        if (true) {
            // TODO login user
            // TODO return SjUser
            return new sj.Success({
                log: true,
                origin: 'login()',
                message: 'user logged in',
                target: 'notify',
                cssClass: 'notifySuccess',
                content: id, // TODO
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
            message: 'database error',
            reason: rejected.message,
            content: rejected,
        });
    }).catch(rejected => {
        throw propagateError(rejected);
    });
}

async function logout(ctx) {
    ctx.session = undefined; // TODO is this the proper way to unset session?

    return new sj.Success({
        log: true,
        origin: 'logout()',
        message: 'user logged out',
        target: 'notify',
        cssClass: 'notifySuccess',
    });
}

// get
async function getCurrentUser() {
    // TODO this shouldn't be needed with the new SjUser login (entire user object is stored in session, not just userId)
}

async function getUser(id) {
    if (typeOf(id) === 'number') {
        // TODO don't retrieve all columns
        db.one('SELECT * FROM users WHERE id = $1', [id])
        .then(resolved => {
            return recreateObject(resolved); // TODO check if this is right
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

// playlist
async function addPlaylist(name, visibility, description, color, image) {
    if (true) { // TODO if user is logged in (session)
        var errorList = new SjErrorList({
            origin: 'addPlaylist()',
            message: 'one or more issues with fields',
            reason: 'validation functions returned one or more errors',
        });
    
        // TODO is there a better way to do this?
        // TODO !!! use trimmed inputs instead of the originals
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

        if (errorList.content.length !== 0) {
             // TODO this isn't correct - what we're checking for here is if there is not a playlist already in the table
            return  db.one('SELECT name FROM playlists WHERE name = $1 AND user = $2', [name, userId]) // TODO get user id from session
            .then(resolved => {
                return db.none('INSERT INTO playlists(name, visibility, description, color, image) VALUES ($1, $2, $3, $4, $5)', [name, visibility, description, color, image]);
            }, rejected => {
                throw new sj.Error({
                    log: true,
                    origin: 'addPlaylist()',
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
                    content: '', // TODO return playlist object
                });
            }, rejected => {
                throw new sj.Error({
                    log: true,
                    origin: 'addPlaylist()',
                    message: 'could not addPlaylist()',
                    reason: rejected.message,
                    content: rejected,
                    target: 'notify',
                    cssClass: 'notifyError',
                });
            }).catch(rejected => {
                throw propagateError(rejected);
            });
        } else {
            errorList.announce();
            throw errorList;
        }
    } else {
        throw new sj.Error({
            log: true,
            origin: 'addPlaylist()',
            message: 'you must be logged in to add a playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }
}

// TODO consider using id inside of object instead?
async function deletePlaylist(id) {
    // TODO is a check if the playlist exists necessary? will delete throw back an error if it doesn't exist?
    if (true) { // TODO check that correct user is logged in
        return db.none('DELETE FROM playlists WHERE id = $1 AND userId = $2', [id, userId]) // TODO get user id
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
            throw propagateError(rejected);
        });
    } else {
        throw new sj.Error({
            log: true,
            origin: 'deletePlaylist()',
            message: 'you must be logged in to delete this playlist',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }
}

async function getPlaylist(id) {
    if (typeOf(id) === 'number') {
        db.one('SELECT * FROM playlists WHERE id = $1', [id])
        .then(resolved => {
            // TODO properly convert database object to js object
            // TODO check visibility & user permissions
            resolved = recreateObject(resolved);

            // TODO update these visibility settings
            if (resolved.visibility === 'public' || resolved.visibility === 'linkOnly' || resolved.visibility === 'private' && true) {
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
        })
    } else {
        throw new sj.Error({
            log: true,
            origin: 'getPlaylist()',
            message: 'invalid playlist id',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }
}

// TODO move me to utility
Array.prototype.stableSort = function(compare) {
    // https://medium.com/@fsufitch/is-javascript-array-sort-stable-46b90822543f
    
    // pass in compareFunction or default
    compare = TypeOf(compare) === 'function' ? compare : (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };

    // 'this' refers to the array in [].stableSort()
    let frozenThis = this.map(function (item, index) {
        return {value: item, index: index};
    }); 

    let stableCompare = function (a, b) {
        let order = compare(a.value, b.value);
        if (order !== 0) {
            // if not equal, return the regular compared order
            return order;
        } else {
            // else return their existing order
            return a.index - b.index;
        }
    }

    // apply stable sort
    frozenThis.sort(stableCompare);

    // replace this with stabilized array
    for (let i = 0; i < this.length; i++) {
        this[i] = frozenThis[i][0];
    }

    return this;
}

// TODO maybe just include a check if the playlist is ordered and then include this function in every interaction with the playlist? (just be careful that its one in the right order, if delete is called after an order it will delete the wrong track)
async function orderPlaylist(id) {
    // get
    var playlist = await getPlaylist(id).catch(rejected => {
        throw propagateError(rejected);
    });

    try { // TODO can this fail?
        // sort 
        playlist.content.stableSort(function (a, b) {
            // https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
            // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript

            // numeric & property compare
            return a.position - b.position;
        });
    } catch (e) {
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
        playlist.content.map(function (item, index) {
            await task.none('UPDATE tracks SET pos = $1 WHERE pos = $2 AND playlist = $3', [index, item.pos, item.playlist]);
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
            origin: orderPlaylist(),
            message: 'database error when re-ordering playlist',
            content: rejected,
        });
    });
}

async function addTrack(track) {
    var playlist = await getPlaylist(track.playlistId).catch(rejected => {
        throw propagateError(rejected);
    });

    // set position as +1 from last track (not just the length +1 because the playlist could have gaps), TODO instead maybe consider ordering the playlist every time the playlist is retrieved? then no checks like this need to be made as it is automatically done
    var l = playlist.content.length;
    if (l === 0) {
        track.position = 0;
    } else {
        track.position = playlist.content[l - 1].position + 1;
    }

    // implode artists ? TODO better way to store arrays in postgres?, no, the 'artists' array will never need to be separated from the track entity and therefore functionality gained from it being in a separate table is not needed, therefore arrays are fine and simplify the database

    db.none('INSERT INTO tracks (playlistId, position, source, id, title, artists, duration) VALUES ($1, $2, $3, $4, $5, $6, $7)', [track.playlistId, track.position, track.source, track.id, track.name, track.artists, track.duration])
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
        throw propagateError(rejected);
    });

}

async function deleteTrack(track) {
    db.none('DELETE FROM tracks WHERE playlistId = $1 AND position = $2', [track.playlistId, track.position])
    .then(resolved => {
        return new sj.Success({
            log: true,
            origin: 'deleteTrack()',
            target: 'notify',
            cssClass: 'notifySuccess',
            content: track,
        });
    }, rejected => {
        // TODO re-order tracks afterwards
        throw new sj.Error({
            log: true,
            origin: 'deleteTrack()',
            target: 'notify',
            cssClass: 'notifyError',
        });
    }).catch(rejected => {
        throw propagateError(rejected);
    });
}

// TODO insertTrack() (kind of like setTrackPosition but also moves other items in playlist, this should be used to undo deleteTrack)