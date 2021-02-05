const axios = require('axios');
const fs = require('fs');
const https = require('https');
const path = require('path');
const auth = require('./unsplashConfig.js');
// Node.js Function to save image from External URL.
function saveImageToDisk(url, localPath) {
  const fullUrl = url;
  const file = fs.createWriteStream(localPath);
  const request = https.get(url, (response) => {
    response.pipe(file);
  });
}
const searchAndSaveUnsplash = (searchTerm, qty, pg) => {
  const unsplashURL = `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${pg}&per_page=${qty}&client_id=${auth}`
  axios.get(unsplashURL)
    .then(({ data }) => {
      data.results.forEach((result, i) => {
        saveImageToDisk(result.urls.regular, path.resolve(__dirname, `restaurantPics/tripadvisor_restaurants_${i + 1 + (pg - 1) * qty}.jpg`))
      });
    })
    .catch((err) => {console.log(err)})
}
for (let i = 1; i < 35; i++) {
  searchAndSaveUnsplash('restaurant', 30, i)
}