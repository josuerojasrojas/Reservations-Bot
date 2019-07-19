const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// create tables
pool.query("CREATE TABLE IF NOT EXISTS reservations(id SERIAL UNIQUE PRIMARY KEY, name VARCHAR(255) NOT NULL, dateTime TIMESTAMP NOT NULL, phoneNumber VARCHAR(255) NOT NULL, createdAt TIMESTAMP NOT NULL, via VARCHAR(255) NOT NULL, restaurantId INTEGER NOT NULL)");

function getReservations(req, res) {
  pool.query('SELECT * from reservations WHERE dateTime > NOW()::timestamp', (err, results) => {
    return res.json(results.rows);
  });
}

function postReservation(req, res, reservation, callback) {
  let name = reservation.name;
  let dateTime = reservation.dateTime;
  let createdAt = reservation.createdAt;
  let phoneNumber = reservation.phoneNumber;
  let via = reservation.via;
  let restaurantId = reservation.restaurantId;
  pool.query('INSERT INTO reservations (name, dateTime, phoneNumber, createdAt, via, restaurantId) VALUES ($1, $2, $3, $4, $5, $6)', [name, dateTime, phoneNumber, createdAt, via, restaurantId], (err, results) => {
    console.log(err);
    callback(err, results);
  })
}

module.exports = { getReservations, postReservation };
