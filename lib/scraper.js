const { chromium } = require('playwright');

async function scrapeGoogleRating() {
    let browser;
    try {
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();
        await page.goto('https://qiblanco.com', { waitUntil: 'networkidle' });
        await page.waitForSelector('div.reputon-google-reviews-widget', { timeout: 10000 });
        await page.waitForSelector('div.reputon-count-number', { timeout: 10000 });

        const rating = await page.$eval('div.reputon-count-number', el => el.innerText);

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