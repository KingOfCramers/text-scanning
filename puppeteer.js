/// Set up web browser....
import puppeteer from 'puppeteer';
export const setUpPuppeteer = async () => {

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080']});
    const page = await browser.newPage(); // Create new instance of puppet
    
    await page.setRequestInterception(true) // Optimize (no stylesheets, images)...
        page.on('request', (request) => {
            if(['stylesheet'].includes(request.resourceType())){
                request.abort();
            } else {
                request.continue();
            }
        });

    await page.setViewport({
        width: 1200,
        height: 800,
        deviceScaleFactor: 1,
      });

    page.on('error', (err) => {
        logger.error('Puppeteer error.', err);
    });
    
    return { browser, page };
};