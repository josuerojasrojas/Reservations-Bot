var express = require('express');
var router = express.Router();
const { parseTextMessage, validateReservation } = require('./helpers/reservations');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { getReservations, postReservation } = require('../database/index.js');
const { dummyJson, dummyRestaurant } = require('./helpers/reservations_dummy.js');



/* GET users listing. */
router.get('/', (req, res, next) => {
  getReservations(req, res);
  // res.json(dummyJson);
});

// const reservationSuccess = 'Great! You have reserved succesfully.';
const reservationSuccess = (name) =>  `Great! ${name} we have made your reservation.`;
const reservationFailed = 'Reservation failed check the time and try again. Restaurant opens at 1pm - 10pm.';

router.post('/', (req, res, next) => {
  let twilio_message = req.body.Body;
  let phonenumber = req.body.From
  const twiml = new MessagingResponse();
  let reservation = parseTextMessage(twilio_message, phonenumber);
  let canReserve = validateReservation(reservation, dummyRestaurant);
  if(canReserve) {
    reservation.via = 'Twilio';
    req.app.io.emit('reservations', reservation);
    postReservation(res, res, reservation, () => {
      twiml.message(reservationSuccess(reservation.name));
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    });
  }
  else {
    twiml.message(reservationFailed);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
});

router.post('/slack', (req, res, next) => {
  let slack_message = req.body.text;
  let reservation = parseTextMessage(slack_message);
  let canReserve = validateReservation(reservation, dummyRestaurant);
  let message = '';
  if(canReserve) {
    message = reservationSuccess(`<@${req.body.user_name}>`);
    reservation.via = 'Slack';
    req.app.io.emit('reservations', reservation);
    postReservation(res, res, reservation, () => res.json({ "text": message }));
  }
  else {
    message = reservationFailed;
    res.json({ "text": message });
  }
});

module.exports = router;
