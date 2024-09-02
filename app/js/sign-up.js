document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('triggerForm');
    const phoneInput = document.getElementById('phoneNumber');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const countryCode = document.getElementById('countryCode');
            const fullPhoneNumber = (countryCode ? countryCode.value : '') + (phoneInput ? phoneInput.value.replace(/\D/g, '') : '');
            const treatment = document.querySelector('input[name="treatment"]:checked');
            
            if (treatment) {
                postRequest(fullPhoneNumber, treatment.id);
            } else {
                console.error('No treatment selected');
            }
        });
    } else {
        console.error('Form not found');
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });
    } else {
        console.error('Phone input not found');
    }
});

function postRequest(formattedPhoneNumber, treatment) {
    const url = 'https://postopweb.azurewebsites.net/users';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            treatment: treatment,
            phone: formattedPhoneNumber
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        } else {
            throw new Error("Oops, we haven't got JSON!");
        }
    })
    .then(json => {
        console.log('Response from the server:', json);
        alert('Thank you for signing up!');
        // Optionally, reset the form or redirect the user
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}
