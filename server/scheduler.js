const schedule = require('node-schedule');
const scrapeGoogleRating = require('./scraper');

const businessName = 'Your Business Name'; // Replace with your business name

// Schedule the job to run every hour
schedule.scheduleJob('0 * * * *', async () => {
    const rating = await scrapeGoogleRating(businessName);
    console.log(`Rating for ${businessName} is ${rating}`);
    
    // Store the rating in a database or a file, or update it in-memory
});