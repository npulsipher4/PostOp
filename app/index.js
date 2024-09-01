const triggerForm = document.getElementById('triggerForm');

document.addEventListener('DOMContentLoaded', function () {
    // Initialize intlTelInput
    const input = document.querySelector("#recipientPhoneNumber");
    const iti = window.intlTelInput(input, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/utils.js"
    });

    // Handle form submission
    const phoneNumberForm = document.getElementById('triggerForm');
    phoneNumberForm.addEventListener('submit', function (event) {
        // Get selected country and formatted phone number
        const selectedCountry = iti.getSelectedCountryData().name;
        const formattedPhoneNumber = iti.getNumber();

        // Check if the phone number is valid
        if (iti.isValidNumber()) {
            // Display the selected country and formatted phone number (for demonstration purposes)
            // alert(`Selected Country: ${selectedCountry}\nFormatted Phone Number: ${formattedPhoneNumber}`);

            // Call postRequest and pass the formattedPhoneNumber
            postRequest(formattedPhoneNumber);
        } else {
            // Handle the case when the phone number is not valid (e.g., show an error message)
            alert('Please enter a valid phone number.');
        }

    });
});




function postRequest(formattedPhoneNumber) {
    // event.preventDefault();

    // URL of the server endpoint
    const url = 'https://postopserver.azurewebsites.net/users';  // Replace with the actual endpoint URL

    // Send a POST request
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            treatment: document.querySelector('input[name="treatment"]:checked').id,
            apptDate: new Date(),/*document.getElementById('apptDate').value*/
            phone: formattedPhoneNumber
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
