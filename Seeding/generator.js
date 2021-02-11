/* eslint-disable no-plusplus */
const fs = require('fs');
const faker = require('faker');

const lines = 10000000;
const locationLines = 1000;
const restaurantLines = 1000;
const filename = '.posts.csv';
const locationFileName = '.locations.csv';
const restaurantFileName = '.restaurants.csv';
const stream = fs.createWriteStream(filename);
const locationStream = fs.createWriteStream(locationFileName);
const restaurantStream = fs.createWriteStream(restaurantFileName);

const randomizer = (num) => Math.floor(Math.random() * num);

const createAttraction = (i) => {
  const id = i;
  const restaurantId = randomizer(1000);
  const locationId = randomizer(1000);
  const name = faker.lorem.words();
  const ratingsAvg = randomizer(5).toString();
  const ratingsTotal = randomizer(1000).toString();
  const imageUrl = `${faker.image.city()}?random=${randomizer(1000)}`;
  const price = randomizer(200, 0);
  const description = faker.lorem.paragraph();
  const distanceFrom = `0.${randomizer(9)}`;
  const basicDescription = faker.lorem.sentence();
  return `${id}, ${restaurantId}, ${locationId}, "${name}", ${ratingsAvg}, ${ratingsTotal}, ${imageUrl}, ${price}, "${description}", ${distanceFrom}, "${basicDescription}"\n`;
};

const createLocation = (i) => {
  const id = i;
  const name = faker.lorem.word();
  const coordsLat = faker.address.latitude().toString();
  const coordsLong = faker.address.longitude().toString();
  const addressStreet = faker.address.streetName();
  const addressCity = faker.address.city();
  const addressCountry = faker.address.country();
  const addressZip = faker.address.zipCode();
  const reviews = faker.lorem.sentence();
  const ratingsAvg = randomizer(5).toString();
  const ratingsTotal = randomizer(1000).toString();
  const website = faker.internet.url();
  const phoneNum = faker.phone.phoneNumber();
  const email = faker.internet.email();
  return `${id}, "${name}", "${coordsLat}", "${coordsLong}", "${addressStreet}", "${addressCity}", "${addressCountry}", "${addressZip}", "${reviews}", ${ratingsAvg}, ${ratingsTotal}, ${website}, ${phoneNum}, ${email}\n`;
};

const createRestaurant = (i) => {
  const id = i;
  const name = faker.company.companyName();
  const ratingsAvg = randomizer(5).toString();
  const ratingsTotal = randomizer(1000).toString();
  const imageUrl = faker.internet.url();
  const distanceFrom = `0.${randomizer(9)}`;
  const foodType = faker.address.country();
  const price = randomizer(5);
  return `${id}, "${name}", ${ratingsAvg}, ${ratingsTotal}, ${imageUrl}, ${distanceFrom}, "${foodType}", ${price}\n`;
};

const startWriting = (writeStream, encoding, done) => {
  let i = lines;
  function writing() {
    let canWrite = true;
    do {
      i--;
      const attraction = createAttraction(i);
      if (i === 0) {
        writeStream.write(attraction, encoding, done);
      } else {
        canWrite = writeStream.write(attraction, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

const startWritingLocations = (writeStream, encoding, done) => {
  let i = locationLines;
  function writing() {
    let canWrite = true;
    do {
      i--;
      const location = createLocation(i);
      if (i === 0) {
        writeStream.write(location, encoding, done);
      } else {
       canWrite = writeStream.write(location, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

const startWritingRestaurants = (writeStream, encoding, done) => {
  let i = restaurantLines;
  function writing() {
    let canWrite = true;
    do {
      i--;
      const restaurant = createRestaurant(i);
      if (i === 0) {
        writeStream.write(restaurant, encoding, done);
      } else {
        canWrite = writeStream.write(restaurant, encoding);
      }
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing();
};

locationStream.write('id, name, coordsLat, coordsLong, addressStreet, addressCity, addressCountry, addressZip, reviews, website, phoneNum, email\n');
startWritingLocations(locationStream, 'utf-8', () => locationStream.end());

restaurantStream.write('id, name, ratingsAvg, ratingsTotal, imageUrl, distanceFrom, foodType, price\n');
startWritingRestaurants(restaurantStream, 'utf-8', () => restaurantStream.end());

stream.write('id, restaurantId, locationId, name, ratingsAvg, ratingsTotal, imageUrl, price, description, distanceFrom, basicDescription \n', 'utf-8');
startWriting(stream, 'utf-8', () => stream.end());
