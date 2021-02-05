
const findAll = (cb) => {
  pool.query('SELECT * FROM attractions', (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  })
};

const create = (entry, cb) => {
  pool.query(`INSERT INTO attractions ${entry}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    };
  });
};

module.exports = {
  pool,
  findAll,
  create,
}