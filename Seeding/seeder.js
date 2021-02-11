/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies

const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'evanglaser',
  database: 'attractionsdb',
  password: 'ubntu',
  port: 5432
});


const createRestaurant = `CREATE TABLE IF NOT EXISTS restaurant (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  ratingsAvg VARCHAR,
  ratingsTotal VARCHAR,
  imageUrl VARCHAR,
  distanceFrom VARCHAR,
  foodType VARCHAR,
  price INTEGER
)`;

const createLocation = `CREATE TABLE IF NOT EXISTS location (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  coordsLat VARCHAR,
  coordsLong VARCHAR,
  addressStreet VARCHAR,
  addressCity VARCHAR,
  addressCountry VARCHAR,
  addressZip VARCHAR,
  reviews VARCHAR,
  website VARCHAR,
  phoneNum VARCHAR,
  email VARCHAR
)`;

const createAttraction = `CREATE TABLE IF NOT EXISTS attraction (
  id SERIAL PRIMARY KEY,
  restaurantId INTEGER,
  locationId INTEGER,
  name VARCHAR,
  ratingsAvg VARCHAR,
  ratingsTotal VARCHAR,
  imageUrl VARCHAR,
  price INTEGER,
  description VARCHAR,
  distanceFrom VARCHAR,
  basicDescription VARCHAR
)`;

const createIndex = `CREATE INDEX attraction_index ON attraction(attractionId)`;

pool.connect((err, client, done) => {
  client.query('DROP TABLE IF EXISTS attraction CASCADE')
  .then(() => client.query('DROP TABLE IF EXISTS location CASCADE'))
  .then(() => client.query('DROP TABLE IF EXISTS restaurant CASCADE'))
  .then(() => client.query(createRestaurant))
  .then(() => client.query(createLocation))
  .then(() => client.query(createAttraction))
  .then(done)
  .catch((error) => {
    console.log(err);
  });
});
