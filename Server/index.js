const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// eslint-disable-next-line no-unused-vars
// const db = require('../Database/index.js');

// const Locations = require('../Database/location.js');
// const Restaurants = require('../Database/restaurant.js');
// const Attractions = require('../Database/attraction.js');

const { findAllAttractions,
  findOneAttraction,
  createAttraction,
  findAllLocations,
  findOneLocation, findAllRestaurants, findOneRestaurant } = require('../Seeding/index.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(`${__dirname}/../Client/dist`));

app.get('/loaderio-71dc4d773db8222a6a27cd3bdee438dc', (req, res) => {
  res.send('loaderio-71dc4d773db8222a6a27cd3bdee438dc');
});

// LOCATION API
app.get('/api/location', (req, res) => {
  findAllLocations((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});
app.get('/api/location/:id', (req, res) => {
  let { id } = req.params;
  const locations = [];
  findOneLocation(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      locations.push(results);
      id++
      findOneLocation(id, (error, data) => {
        if (err) {
          res.status(501).send(err);
        } else {
          locations.push(data);
          id++
          findOneLocation(id, (issue, answer) => {
            if (issue) {
              res.status(502).send(err);
            } else {
              locations.push(answer);
              res.status(200).send(locations);
            }
          })
        }
      })
    }
  });
});
// app.post('/api/location', (req, res) => {
//   Locations.create(req, res);
// });
// app.put('/api/location:id', (req, res) => {
//   Locations.update(req, res);
// });
// app.delete('/api/location:id', (req, res) => {
//   Locations.delete(req, res);
// });

// RESTAURANT API
app.get('/api/restaurant', (req, res) => {
  findAllRestaurants((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results)
    }
  });
});
app.get('/api/restaurant/:id', (req, res) => {
  findOneRestaurant(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});
// app.post('/api/restaurant', (req, res) => {
//   Restaurants.create(req, res);
// });
// app.put('/api/restaurant:id', (req, res) => {
//   Restaurants.update(req, res);
// });
// app.delete('/api/restaurant:id', (req, res) => {
//   Restaurants.delete(req, res);
// });

// ATTRACTION API
app.get('/api/attraction', (req, res) => {
  findAllAttractions((err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(results)
    }
  });
});
app.get('/api/attraction/:id', (req, res) => {
  let { id } = req.params;
  const attractions = [];
  findOneAttraction(id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      attractions.push(results.rows[0]);
      id++
      findOneAttraction(id, (error, data) => {
        if (err) {
          res.status(501).send(err);
        } else {
          attractions.push(data.rows[0]);
          id++
          findOneAttraction(id, (issue, answer) => {
            if (issue) {
              res.status(502).send(err);
            } else {
              attractions.push(answer.rows[0]);
              res.status(200).send(attractions);
            }
          })
        }
      })
    }
  });
});
// app.post('/api/attraction', (req, res) => {
//   createAttraction((err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(results);
//     }
//   });
// });
// app.put('/api/attraction:id', (req, res) => {
//   Attractions.update(req, res);
// });
// app.delete('/api/attraction:id', (req, res) => {
//   Attractions.delete(req, res);
// });

module.exports = app;
