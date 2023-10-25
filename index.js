
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
}