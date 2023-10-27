triggerForm.addEventListener('submit', executeFlow);

function postRequest() {
    const data = {
        treatment: 'wt',
        apptDate: '1903-12-17',
        phone: document.getElementById('recipientPhoneNumber')
    };

    // URL of your server endpoint
    const url = 'https://postopserver.gamergoat112.repl.co/users';  // Replace with the actual endpoint URL

    // Send a POST request
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Response from the server:', result);
        // Handle the server response here
    })
    .catch(error => {
        console.error('Error:', error);
    });
};