
const triggerForm = document.getElementById('triggerForm')

triggerForm.addEventListener('submit', postRequest);

function postRequest() {
    var data = {
        treatment: 'wt',
        apptDate: '1903-12-17',
        phone: document.getElementById('recipientPhoneNumber').value
    };

    // URL of your server endpoint
    const url = 'http://postopserver.gamergoat112.repl.co/users';  // Replace with the actual endpoint URL

    // Send a POST request
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({        
            treatment: 'wt',
            apptDate: '1903-12-17',
            phone: document.getElementById('recipientPhoneNumber').value
        })
    })
    .then(response => response.json())
    .then(json => {
        console.log('Response from the server:', json);
        // Handle the server response here
    })
    .catch(error => {
        console.error('Error:', error);
    });
};
