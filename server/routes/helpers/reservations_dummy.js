// this file contains all json that is used for testing and data examples.

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
    name: "Zvjezdana Birthe",
    dateTime: "July 20, 2019 03:24",
    phoneNumber: "+19374165537",
    createdAt: "July 13, 2019 16:54",
    rawJson: "",
    via: "Slack",
    restaurantId: "1"
  },
  {
    name: "Miro Njeri",
    dateTime: "July 30, 2019 18:04",
    phoneNumber: "+18155701572",
    createdAt: "July 13, 2019 16:54",
    rawJson: "",
    via: "Slack",
    restaurantId: "1"
  },
  {
    name: "Justine Feige",
    dateTime: "August 3, 2019 8:30",
    phoneNumber: "+12565355323",
    createdAt: "July 13, 2019 16:54",
    rawJson: "",
    via: "Twilio",
    restaurantId: "1"
  },
  {
    name: "Tao Kylee",
    dateTime: "August 17, 2019 10:30",
    phoneNumber: "+19527072487",
    createdAt: "July 13, 2019 16:54",
    rawJson: "",
    via: "Twilio",
    restaurantId: "1"
  }
];

const dummyRestaurant = {
  id: 1,
  name: "Wendy's",
  opensAt: "13:00",
  closestAt: "22:00"
}

const dummySlackMessage = {
  "token": "T6ly4gdB3k1ouyt9xfLILc5t",
  "team_id": "TLLN51FC7",
  "team_domain": "reservations-bottest",
  "channel_id": "CLJS91A9W",
  "channel_name": "general",
  "user_id": "ULLN51GFR",
  "user_name": "josuerojas.rojas",
  "command": "/res",
  "text": "Reservation for Josue Rojas at July 20, 2019 at 8pm.",
  "response_url":
   "https://hooks.slack.com/commands/TLLN51FC7/699186043333/NKiWV9feMyyGokOMKfU8Gg3C",
  "trigger_id": "699186043397.700753049415.a8cf2e5b45590bd091ad3a0f522b6b90"
}

// a dummy reservation with the correct time
// might change +1 day to this https://stackoverflow.com/a/3674550/6332768
const dummyReservation = {
  name: "Zvjezdana Birthe",
  dateTime: new Date((new Date().setHours(20) + 86400000)).toString(),
  phoneNumber: "+19374165537",
  createdAt: "July 13, 2019 16:54:00",
  rawJson: "",
  restaurantId: "1"
}

// a bad text message with bad format
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

const dummyReservationBad = {
  name: "Zvjezdana Birthe",
  dateTime: new Date((new Date().setHours(20) - 86400000)).toString(),
  phoneNumber: "+19374165537",
  createdAt: "July 13, 2019 16:54:00",
  rawJson: "",
  restaurantId: "1"
}

module.exports = { dummyText, dummyJson, dummyRestaurant, dummySlackMessage, dummyReservation, dummyTextBad, dummyReservationBad };
