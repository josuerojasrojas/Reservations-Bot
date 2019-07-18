const { parseTextMessage, validateReservation } = require('./reservations.js');

// a good text message with correct format
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

const dummyTextBad = {
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
  "Body": "Bad format",
  "FromCountry": "US",
  "To": "+13479707025",
  "ToZip": "10014",
  "NumSegments": "1",
  "MessageSid": "SM7cced361b3456680298a175fe930bfaf",
  "AccountSid": "AC4c12235c6778228c9299f358d55e2071",
  "From": "+17182197093",
  "ApiVersion": "2010-04-01"
}

// a dummy reservation with the correct time
// might change +1 day to this https://stackoverflow.com/a/3674550/6332768
const dummyReservation = {
  name: 'Zvjezdana Birthe',
  dateTime: new Date((new Date().setHours(20) + 86400000)).toString(),
  phoneNumber: '+19374165537',
  createdAt: 'July 13, 2019 16:54:00',
  rawJson: '',
  restaurantId: '1'
}

const dummyReservationBad = {
  name: 'Zvjezdana Birthe',
  dateTime: new Date((new Date().setHours(20) - 86400000)).toString(),
  phoneNumber: '+19374165537',
  createdAt: 'July 13, 2019 16:54:00',
  rawJson: '',
  restaurantId: '1'
}

const dummyRestaurant = {
  id: 1,
  name: "Wendy's",
  opensAt: "13:00",
  closestAt: "22:00"
}

// test parseTextMessage functions
// --------------------------------
test("check parseTextMessage returns object", () => {
  expect(typeof parseTextMessage(dummyText)).toBe("object");
})

test("check parseTextMessage returns null with bad text", () => {
  expect(!parseTextMessage(dummyTextBad)).toBe(true);
})

test("check parseTextMessage returns object with name key string", () => {
  expect(typeof parseTextMessage(dummyText).name).toBe("string");
});

test("check parseTextMessage returns object with dateTime key is proper date", () => {
  expect(typeof  Date.parse(parseTextMessage(dummyText).dateTime)).toBe("number");
});


// test validateReservation functions
// --------------------------------
test("check validateReservation returns boolean for correct format", () => {
  expect(typeof validateReservation(dummyReservation, dummyRestaurant)).toBe("boolean");
});

test("check validateReservation returns true when correct range is input", () => {
  expect(validateReservation(dummyReservation, dummyRestaurant)).toBe(true)
});

test("check validateReservation returns false when wrong date but correct time range is input", () => {
  expect(validateReservation(dummyReservationBad, dummyRestaurant)).toBe(false)
});
