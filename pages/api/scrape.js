import scrapeGoogleRating from '../../lib/scraper';

export default async function handler(req, res) {
    const rating = await scrapeGoogleRating();

    if (rating) {
        res.status(200).json({ rating });
    } else {
        res.status(500).json({ error: 'Failed to scrape rating' });
    }
}