async function test() {
    let temp = await fetch('http://localhost:3000/api/track', {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                track: new sj.Track({
                    name: 'dfdssd',
                    playlistId: 7,
                    source: 'spotify',
                    id: 'sdfjaa3892j0',
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
