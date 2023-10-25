
var recipientNumber = document.getElementById('recipientPhoneNumber');

const triggerForm  = document.getElementById('triggerForm');

triggerForm.addEventListener('submit', postRequest);

function postRequest() {
    fetch("https://jsonplaceholder.typicode.com/todos", {
        method: "POST",
        body: JSON.stringify({
            phone: document.getElementById('recipientPhoneNumber'),
            apptDate: '1903-12-17',
            treatment: 'wt'
    }),
    headers: {
    "Content-type": "application/json; charset=UTF-8"
    }
})
  .then((response) => response.json())
  .then((json) => console.log(json));

triggerForm.addEventListener('submit', executeFlow);

function postRequest() {
    const data = {
        treatment: 'wt',
        apptDate: '1903-12-17',
        phone: document.getElementById('recipientPhoneNumber')
    };

    // URL of your server endpoint
    const url = 'http://lyrva.me/users';  // Replace with the actual endpoint URL

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
