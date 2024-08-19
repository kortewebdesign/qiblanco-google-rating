const test = require("node:test");
const { chromium: playwright } = require("playwright-core");
const chromium = require("@sparticuz/chromium");


async function scrapeGoogleRating() {
    let browser;
    try {

        const executablePath = await chromium.executablePath;

        browser = await playwright.launch({
            args: chromium.args,
            executablePath,
            headless: chromium.headless,
        });

        const context = await browser.newContext();
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