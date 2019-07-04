const puppeteer = require('puppeteer');

const takeScreenshot = async () => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://efdsearch.senate.gov/search/view/annual/f91df2f1-eaa8-48ea-93b5-820f1526757c/', { waitUntil: 'networkidle2' }); // Ensure no network requests are happening (in last 500ms).
    await Promise.all([
        page.click("#agree_statement"),
        page.waitForNavigation()
    ]);
    
    await page.goto("https://efdsearch.senate.gov/search/view/annual/f91df2f1-eaa8-48ea-93b5-820f1526757c/");
    await page.screenshot({
        path: './images/website.png',
        fullPage: true
    });

    await browser.close();
};

takeScreenshot()
    .then(() => console.log("Screenshot saved!"))
    .catch((err) => console.log(err));