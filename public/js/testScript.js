async function test() {
    let temp = await fetch('http://localhost:3000/api/user', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
                user: new sj.User({
                    email: 'te3eaas@dafds.caom',
                    name: 'jadfasd',
                    password: 'pwerwerew',
                    password2: 'pwerwerew',
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
