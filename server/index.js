const path = require('path');
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const scrapeGoogleRating = require('./scraper');

let latestRating = null;

const updateRating = async () => {
    latestRating = await scrapeGoogleRating();
    console.log(`Updated rating: ${latestRating}`);
};

// Initial call to get the rating
updateRating();

// Schedule the updateRating function to run every hour

app.get('/api/rating', (req, res) => {
    res.json({ rating: latestRating });
    console.log(res.json({ rating: latestRating }))
});

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

module.exports = app;