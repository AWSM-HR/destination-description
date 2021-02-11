const { Pool } = require('pg');

const pool = new Pool({
  host: '18.222.209.193',
  user: 'postgres',
  database: 'attractionsdb',
  password: 'ubuntu',
  port: 5432
});

pool.connect((err, client, release) => {
  if (err) {
    console.log('err connecting to postgres');
  } else {
    console.log('connected to postgres');
  }
})


const findAllAttractions = (cb) => {
  pool.query('SELECT * FROM attraction', (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
};

const findOneAttraction = (id, cb) => {
  pool.query(`SELECT * FROM attraction WHERE id = ${id}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
};

const createAttraction = (entry, cb) => {
  pool.query(`INSERT INTO attraction ${entry}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    };
  });
};

const findAllLocations = (cb) => {
  pool.query('SELECT * FROM location', (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
};

const findOneLocation = (id, cb) => {
  pool.query(`SELECT * FROM location WHERE id = ${id}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
};

const findAllRestaurants = (cb) => {
  pool.query('SELECT * FROM restaurant', (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
};
const findOneRestaurant = (id, cb) => {
  pool.query(`SELECT * FROM restaurant WHERE id = ${id}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
};

module.exports = {
  pool,
  findAllAttractions,
  findOneAttraction,
  createAttraction,
  findAllLocations,
  findOneLocation,
  findAllRestaurants,
  findOneRestaurant
};
