async function test() {
    let temp = await fetch('http://localhost:3000/user', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'john',
            password1: 'doeeee',
            password2: 'doeeee',
            email: 'test@test.com',
        }),
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
