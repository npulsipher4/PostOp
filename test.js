function post() {
    fetch ('http://postopserver.gamergoat112.repl.co/users', {
        method: "POST",
        body: JSON.stringify({phone : "+12087860961"}),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response=> response.json()))
        .then((json=> console.log(json)));
}


