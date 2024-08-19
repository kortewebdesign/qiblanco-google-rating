const { chromium } = require('playwright-core');
const { executablePath } = require('@playwright/test'); // Import to find the browser executable path

async function scrapeGoogleRating() { 
    let browser;
    try {
        // Launch the browser using the executable path from @playwright/test
        browser = await chromium.launch({
            headless: true,
            executablePath: executablePath('chromium'), // Use the correct executable path
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.goto('https://qiblanco.com', { waitUntil: 'networkidle' });
        await page.waitForSelector('div.reputon-google-reviews-widget', { timeout: 10000 });
        await page.waitForSelector('div.reputon-count-number', { timeout: 10000 });

        const rating = await page.evaluate(() => {
            return document.querySelector('div.reputon-count-number').innerText;
        });

        return rating;
    } catch (error) {
        console.error('Error scraping Google rating:', error);
        return null;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

module.exports = scrapeGoogleRating;