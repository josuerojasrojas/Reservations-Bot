## ReservationsApp
[![Build Status](https://travis-ci.com/josuerojasrojas/Reservations-Bot.svg?branch=master)](https://travis-ci.com/josuerojasrojas/Reservations-Bot)

Live Link: https://reservation-bot-j.herokuapp.com

Using Twilio and Slack to send a quick message to reserve a table in a restaurant.

### Tech Stack
- Node.js
- Express
- Postgres
- React
- Socket.io
- Twilio
- Slack Commands

### Installation
Clone project and install using npm
```bash
git clone
cd ReservationsApp
npm install
```
### Development
Setup [ngrok](https://ngrok.com), .env with Twilio credentials and Postgres url, and then start project.
Inside project folder
```bash
touch .env
open .env
# paste your variables
# example
# accountSid=xxxxxxxxxxxxxxxxxxxxxx
# authToken=xxxxxxxxxxxxxxxxxxxxxx
# twilioPhone=+1347xxxxxxx
# DATABASE_URL=xxxxxxxxxxxxxxxxxxxxxx
npm run start-dev
```
npm start should run client and server in same terminal. You can also run in different terminals. Just cd into each folder in different terminals and ```npm start ```

To test twilio (receive text message) then you need to follow [this to use ngrok.](https://www.twilio.com/blog/2013/10/test-your-webhooks-locally-with-ngrok.html)

Similarly to test Slack Commands then you need to follow [this to use ngrok.](https://api.slack.com/tutorials/tunneling-with-ngrok)
