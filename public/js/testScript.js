async function send(objType, obj, method) {
    let temp = {};

    if (method === 'get') {
        if (objType === 'me') {
            temp = await fetch(`http://localhost:3000/api/${objType}`, {
                method: 'get',
            }).then(resolved => {
                return resolved.json();
            }, rejected => {
                return rejected.json();
            });
        } else {
            temp = await fetch(`http://localhost:3000/api/${objType}/${obj.id}`, {
                method: 'get',
            }).then(resolved => {
                return resolved.json();
            }, rejected => {
                return rejected.json();
            });
        }
    } else {
        temp = await fetch(`http://localhost:3000/api/${objType}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        }).then(resolved => {
            return resolved.json();
        }, rejected => {
            return rejected.json();
        });
    }

    console.log(temp);
}

function wrapUser() {
    return new sj.User({
        id: $('#userId').val(),
        name: $('#userName').val(),
        password: $('#userPassword').val(),
        password2: $('#userPassword2').val(),
        email: $('#userEmail').val(),
    });
}
function wrapPlaylist() {
    return new sj.Playlist({
        id: $('#playlistId').val(),
        userId: $('#playlistUserId').val(),
        name: $('#playlistName').val(),
        visibility: $('#playlistVisibility').val(),
        description: $('#playlistDescription').val(),
        image: $('#playlistImage').val(),
        color: $('#playlistColor').val(),
    });
}
function wrapTrack() {
    return new sj.Track({
        id: $('#trackId').val(),
        playlistId: $('#trackPlaylistId').val(),
        position: $('#trackPosition').val(),
        source: $('#trackSource').val(),
        sourceId: $('#trackSourceId').val(),
        name: $('#trackName').val(),
        duration: $('#trackDuration').val(),
        artists: [],
    });
}

// Initialize ui
// (async function () {
//     await fetch(`http://localhost:3000/api/spotifyAuthURL`, {
//     method: 'get',
// }).then(resolved => {
//     return resolved.text();
// }).then(resolved => {
//     console.log('LINK: ', resolved);
//     $('#authSpotify').attr('href', resolved);
//     console.log('authSpotify initialized');
// }).catch(rejected => {
//     console.error(rejected);
//     console.error('authSpotify initialization failed');
// });
// })();
console.log('HERE', JSON.stringify(new sj.Source({})));
async function authSpotify() {
    let authRequestWindow;
    
    //C request authURL & authKey

    return fetch(`http://localhost:3000/api/startAuthRequest`).then(resolved => {
        console.log('HERE1');
        return resolved.json();
    }).then(resolved => {
        //C open spotify auth request window
        //L https://www.w3schools.com/jsref/met_win_open.asp
        authRequestWindow = window.open(resolved.authRequestURL);
        
        console.log('HERE2');
        return resolved;
    }).then(resolved => {
        //TODO there is a chance to miss the event if the window is resolved before the fetch request reaches the server
        console.log('HERE3');
        return fetch(`http://localhost:3000/api/endAuthRequest`,  {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resolved),
        });
    }).then(resolved => {
        console.log('HERE4');
        return resolved.json();
    }).then(resolved => {
        console.log('RESULT', resolved);
        authRequestWindow.close();
        return new sj.Success(resolved);
    }).catch(rejected => {
        throw sj.propagateError(rejected);
    });
}

$(document).on('click', '#authSpotify', async function() {
    console.log('HERE0');
    let result = await authSpotify().catch(sj.andResolve);
    console.log('RESULT', result);
});

// js on click
$(document).on('click', '#registerUser', async function() {
    send('user', wrapUser(), 'post');
});
$(document).on('click', '#getUser', async function() {
    send('user', wrapUser(), 'get');
});
$(document).on('click', '#editUser', async function() {
    send('user', wrapUser(), 'patch');
});
$(document).on('click', '#deleteUser', async function() {
    send('user', wrapUser(), 'delete');
});

$(document).on('click', '#login', async function() {
    send('login', wrapUser(), 'put');
});
$(document).on('click', '#getMe', async function() {
    send('me', wrapUser(), 'get');
});
$(document).on('click', '#logout', async function() {
    send('logout', wrapUser(), 'delete');
});


$(document).on('click', '#addPlaylist', async function() {
    send('playlist', wrapPlaylist(), 'post');
});
$(document).on('click', '#getPlaylist', async function() {
    send('playlist', wrapPlaylist(), 'get');
});
$(document).on('click', '#editPlaylist', async function() {
    send('playlist', wrapPlaylist(), 'patch');
});
$(document).on('click', '#deletePlaylist', async function() {
    send('playlist', wrapPlaylist(), 'delete');
});


$(document).on('click', '#addTrack', async function() {
    send('track', wrapTrack(), 'post');
});
$(document).on('click', '#deleteTrack', async function() {
    send('track', wrapTrack(), 'delete');
});