async function test() {
    let temp = await fetch('http://localhost:3000/api/playlist', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                playlist: new sj.Playlist({
                    userId: 1,
                    name: 'playlisttest',
                    visibility: 'public',
                    description: 'fdsafadsfewfewaf',
                    color: '#000000',
                    image: 'sdfghjkl',
                })
            }
        ),
    }).then(resolved => {
        return resolved.json();
    }, rejected => {
        return rejected.json();
    });

    console.log(temp);
}
async function login() {
    let temp = await fetch('http://localhost:3000/api/login', {
        method: 'put',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                user: new sj.User({
                    id: 1,
                    name: 'dfdssd',
                    email: '21421421',
                    password: 'testtest',
                    password2: 'testtest',
                })
            }
        ),
    }).then(resolved => {
        return resolved.json();
    }, rejected => {
        return rejected.json();
    });

    console.log(temp);
}



$(document).on("click", "#sendTest", async function() {
    test();
});


$(document).on("click", "#login", async function() {
    login();
});