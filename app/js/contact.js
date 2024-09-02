document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Here you would typically send the form data to your server
            // For now, we'll just log it to the console and show an alert

            const formData = new FormData(contactForm);
            const formObject = Object.fromEntries(formData.entries());

            console.log('Form data:', formObject);

            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        });
    }
});