import sj from './global-client.mjs';


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

$(document).on('click', '#authSpotify', async function() {
    let result = await sj.spotify.auth().catch(sj.andResolve);
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