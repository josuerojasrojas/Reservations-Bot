const { parseTextMessage, validateReservation } = require('./reservations.js');
const { dummyText, dummyReservation, dummyTextBad, dummyReservationBad, dummyRestaurant } = require('./reservations_dummy.js');

// test parseTextMessage functions
// --------------------------------
test("check parseTextMessage returns object", () => {
  expect(typeof parseTextMessage(dummyText.Body)).toBe("object");
})

test("check parseTextMessage returns null with bad text", () => {
  expect(!parseTextMessage(dummyTextBad.Body)).toBe(true);
})

test("check parseTextMessage returns object with name key string", () => {
  expect(typeof parseTextMessage(dummyText.Body).name).toBe("string");
});

test("check parseTextMessage returns object with datetime key is proper date", () => {
  expect(typeof  Date.parse(parseTextMessage(dummyText.Body).datetime)).toBe("number");
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
