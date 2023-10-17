require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = +18337911819

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'lets go',
        from: twilioNumber,
        to: document.getElementById("recipientPhoneNumber")
    })
    .then(message => console.log(message.sid));

/* client.studio.v2.flows('FW5ed3a14fd7b0b1a39c7de8a2cabfcc38')
    .executions
    .create({
        to: '+12087860961',
        from: twilioNumber,
        parameters: null })
    .then(execution => console.log('Execution created with SID:', execution.sid))
    .then(message => console.log(message.sid))
    .catch(error => console.error('Error creating execution:', error)); */
    