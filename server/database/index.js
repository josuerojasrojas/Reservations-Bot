const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// create tables
pool.query("CREATE TABLE IF NOT EXISTS reservations(id SERIAL UNIQUE PRIMARY KEY, name VARCHAR(255) NOT NULL, datetime TIMESTAMP NOT NULL, phonenumber VARCHAR(255) NOT NULL, createdat TIMESTAMP NOT NULL, via VARCHAR(255) NOT NULL, restaurantid INTEGER NOT NULL)");

function getReservations(req, res) {
  pool.query('SELECT * from reservations WHERE datetime > NOW()::timestamp', (err, results) => {
    return res.json(results.rows);
  });
}

function postReservation(req, res, reservation, callback) {
  let name = reservation.name;
  let datetime = reservation.datetime;
  let createdAt = reservation.createdat;
  let phoneNumber = reservation.phonenumber;
  let via = reservation.via;
  let restaurantId = reservation.restaurantid;
  pool.query('INSERT INTO reservations (name, datetime, phonenumber, createdat, via, restaurantid) VALUES ($1, $2, $3, $4, $5, $6)', [name, datetime, phoneNumber, createdAt, via, restaurantId], (err, results) => {
    console.log(err);
    callback(err, results);
  })
}

module.exports = { getReservations, postReservation };
