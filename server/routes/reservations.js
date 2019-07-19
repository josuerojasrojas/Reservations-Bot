var express = require('express');
var router = express.Router();
const { parseTextMessage, validateReservation } = require('./helpers/reservations');
const sendMessage = require('./helpers/twilio_messaging');
const { dummyJson, dummyRestaurant } = require('./helpers/reservations_dummy.js');



/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json(dummyJson);
});

// const reservationSuccess = 'Great! You have reserved succesfully.';
const reservationSuccess = (name) =>  `Great! ${name} we have made your reservation.`;
const reservationFailed = 'Reservation failed check the time and try again. Restaurant opens at 1pm - 10pm.';

router.post('/', (req, res, next) => {
  let twilio_message = req.body.Body;
  let reservation = parseTextMessage(twilio_message);
  let canReserve = validateReservation(reservation, dummyRestaurant);
  let message = '';
  if(canReserve) {
    message = reservationSuccess(reservation.name);
    reservation.via = 'Twilio';
    dummyJson.push(reservation);
    req.app.io.emit('reservations', reservation);
  }
  else message = reservationFailed
  // res.json({"message": message});
  // should probably have a catch for errors
  sendMessage(message, reservation.phoneNumber)
  .then((twilio_res) => res.json(twilio_res));
});

router.post('/slack', (req, res, next) => {
  let slack_message = req.body.text;
  let reservation = parseTextMessage(slack_message);
  let canReserve = validateReservation(reservation, dummyRestaurant);
  let message = '';
  if(canReserve) {
    message = reservationSuccess(`<@${req.body.user_name}>`);
    reservation.via = 'Slack';
    dummyJson.push(reservation);
    req.app.io.emit('reservations', reservation);
  }
  else message = reservationFailed;
  res.json({ "text": message });
});

module.exports = router;
