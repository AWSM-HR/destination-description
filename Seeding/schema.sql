DROP DATABASE IF EXISTS attractionsdb;

CREATE DATABASE attractionsdb;

\c attractionsdb;

CREATE TABLE IF NOT EXISTS "restaurant" (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  ratingsAvg VARCHAR,
  ratingsTotal VARCHAR,
  imageUrl VARCHAR,
  distanceFrom VARCHAR,
  foodType VARCHAR,
  price INTEGER
);

CREATE TABLE IF NOT EXISTS "location" (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  coordsLat VARCHAR,
  coordsLong VARCHAR,
  addressStreet VARCHAR,
  addressCity VARCHAR,
  addressCountry VARCHAR,
  addressZip VARCHAR,
  website VARCHAR,
  phoneNum VARCHAR,
  email VARCHAR
);

CREATE TABLE IF NOT EXISTS "attraction" (
  id SERIAL PRIMARY KEY,
  restaurantId INTEGER REFERENCES restaurant(id),
  locationId INTEGER REFERENCES location(id),
  name VARCHAR,
  ratingsAvg VARCHAR,
  ratingsTotal VARCHAR,
  imageUrl VARCHAR,
  price INTEGER,
  description VARCHAR,
  distanceFrom VARCHAR,
  basicDescription VARCHAR
);

CREATE INDEX attraction_index ON attraction(attractionId);
CLUSTER attraction USING attraction_index;