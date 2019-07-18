const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilioPhone = process.env.twilioPhone;
const client = require('twilio')(accountSid, authToken)

function sendMessage(body, to){
  return client.messages
    .create({
      body: body,
      from: twilioPhone,
      to: to,
    });
}

module.exports = sendMessage;
