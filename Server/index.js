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
  findOneLocation(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
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
  findOneAttraction(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
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
