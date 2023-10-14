const accountSid = 'your_account_sid'; // Replace with your Twilio Account SID
const authToken = 'your_auth_token';   // Replace with your Twilio Auth Token

const twilio = require('twilio');
const client = twilio(accountSid, authToken);

// Define the URL for the POST request
const url = 'https://studio.twilio.com/v2/Flows/FW5ed3a14fd7b0b1a39c7de8a2cabfcc38/Executions';

// Define the data you want to send in the POST request
const postData = {
  to: document.getElementById("recipientPhoneNumber"), // Replace with the recipient's phone number
  from: docu.getElementById("yourPhoneNumber")", // Replace with your Twilio phone number
  parameters: {
    // Define any additional parameters required for your execution
  },
};

// Make the POST request
client.studio.flows('FW5ed3a14fd7b0b1a39c7de8a2cabfcc38')
  .executions
  .create({ to: postData.to, from: postData.from, parameters: postData.parameters })
  .then(execution => console.log('Execution created with SID:', execution.sid))
  .catch(error => console.error('Error creating execution:', error));
  .catch(error => alert("Error creating execution"));
