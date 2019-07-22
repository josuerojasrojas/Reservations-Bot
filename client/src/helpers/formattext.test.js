import { formatDate, formatTime } from './formattext';

test('formatDate returns correct 9/10/2019 10:21 to September 10, 2019 10:21', () => {
  let date = '9/10/2019 10:21';
  expect(formatDate(date)).toBe('September 10, 2019 10:21');
});

test('formatDate returns "" when bad format date', () => {
  let date = 'bad format';
  expect(formatDate(date)).toBe('');
})

test('formatTime returns correct 123613000 to 1 Days 10:20:13', () => {
  let milli = 123613000;
  expect(formatTime(milli)).toBe('1 Days 10:20:13');
});

test('formatTime return 0 Days 00:00:00 when not number is input', () => {
  let milli = {};
  expect(formatTime(milli)).toBe('0 Days 00:00:00');
});
