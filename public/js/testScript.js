async function test() {
    let temp = await fetch('http://localhost:3000/test', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            blah: 'hi im test data',
            blahblah: 'body data body',
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
