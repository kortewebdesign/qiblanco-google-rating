const { chromium } = require('playwright');

async function scrapeGoogleRating() {
    let browser;
    try {
        browser = await chromium.launch({
            headless: true,
            executablePath: executablePath('/vercel/.cache/ms-playwright/chromium-1129'),
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        console.log('Navigating to page...');
        await page.goto('https://qiblanco.com');
        console.log('Page loaded.');

        console.log('Waiting for selector...');
        await page.waitForSelector('div.reputon-google-reviews-widget');
        await page.waitForSelector('div.reputon-count-number');

        const rating = await page.$eval('div.reputon-count-number', el => el.innerText);
        console.log('Rating found:', rating);

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