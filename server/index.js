const path = require('path');
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;
const schedule = require('node-schedule');
const scrapeGoogleRating = require('./scraper');

let latestRating = null;

const updateRating = async () => {
    latestRating = await scrapeGoogleRating();
    console.log(`Updated rating: ${latestRating}`);
};

// Initial call to get the rating
updateRating();

// Schedule the updateRating function to run every hour
schedule.scheduleJob('0 * * * *', updateRating);

app.get('/api/rating', (req, res) => {
    res.json({ rating: latestRating });
});

app.get('/', (req, res) => {
  // Create an absolute path using path.join and __dirname
  const filePath = path.join(__dirname, '..', 'index.html');
  
  // Send the file
  res.sendFile(filePath, err => {
      if (err) {
          console.error('Error sending file:', err);
          res.status(err.status).end();
      }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})