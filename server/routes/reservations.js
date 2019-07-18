var express = require('express');
var router = express.Router();
const { parseTextMessage, validateReservation } = require('./helpers/reservations');
const sendMessage = require('./helpers/twilio_messaging');

const dummyText = {
  "ToCountry": "US",
  "ToState": "NY",
  "SmsMessageSid": "SM7cced361b3456680298a175fe930bfaf",
  "NumMedia": "0",
  "ToCity": "NEW YORK",
  "FromZip": "11201",
  "SmsSid": "SM7cced361b3456680298a175fe930bfaf",
  "FromState": "NY",
  "SmsStatus": "received",
  "FromCity": "BROOKLYN",
  "Body": "Reservation for Josue Rojas at July 20, 2019 at 8pm.",
  "FromCountry": "US",
  "To": "+13479707025",
  "ToZip": "10014",
  "NumSegments": "1",
  "MessageSid": "SM7cced361b3456680298a175fe930bfaf",
  "AccountSid": "AC4c12235c6778228c9299f358d55e2071",
  "From": "+17182197093",
  "ApiVersion": "2010-04-01"
}

const dummyJson = [
  {
    name: 'Zvjezdana Birthe',
    dateTime: 'July 20, 2019 03:24:00',
    phoneNumber: '+19374165537',
    createdAt: 'July 13, 2019 16:54:00',
    rawJson: '',
    restaurantId: '1'
  },
  {
    name: 'Miro Njeri',
    dateTime: 'July 30, 2019 18:04:00',
    phoneNumber: '+18155701572',
    createdAt: 'July 13, 2019 16:54:00',
    rawJson: '',
    restaurantId: '1'
  },
  {
    name: 'Justine Feige',
    dateTime: 'August 3, 2019 8:30:00',
    phoneNumber: '+12565355323',
    createdAt: 'July 13, 2019 16:54:00',
    rawJson: '',
    restaurantId: '1'
  },
  {
    name: 'Tao Kylee',
    dateTime: 'August 17, 2019 10:30:00',
    phoneNumber: '+19527072487',
    createdAt: 'July 13, 2019 16:54:00',
    rawJson: '',
    restaurantId: '1'
  }
];

const dummyRestaurant = {
  id: 1,
  name: "Wendy's",
  opensAt: "13:00",
  closestAt: "22:00"
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json(dummyJson);
});

// const reservationSuccess = 'Great! You have reserved succesfully.';
const reservationSuccess = (name) =>  `Great! ${name} we have made your reservation.`;
const reservationFailed = 'Reservation failed check the time and try again. Restaurant opens at 1pm - 10pm.';

router.post('/', (req, res, next) => {
  let reservation = parseTextMessage(req.body);
  let canReserve = validateReservation(reservation, dummyRestaurant);
  let message = '';
  // canReserve ? reservationSuccess(reservation.name) : reservationFailed;
  if(canReserve) {
    message = reservationSuccess(reservation.name);
    dummyJson.push(reservation);
    req.app.io.emit('reservations', reservation);
  }
  else message = reservationFailed
  // res.json({"message": message});
  // should probably have a catch for errors
  sendMessage(message, reservation.phoneNumber)
  .then((twilio_res) => res.json(twilio_res));
});

module.exports = router;
