import puppeteer from 'puppeteer';
import { getFaraUrls, getSenateCandidateUrls, getSenatorUrls } from "./urlFetcher";
import { asyncForEach } from "./utils";
import { setUpPuppeteer } from "./puppeteer";
import { SenateCandidate, Senator, Fara } from './mongodb/schemas';
import { writeTextFile, readFiles } from "./scanner";

import Tesseract from 'tesseract.js';
const { TesseractWorker } = Tesseract; 

export const takeScreenshots = async (fetcher, schema) => {

    const { page, browser } = await setUpPuppeteer();
    let res;

    try {
        await page.goto('https://efdsearch.senate.gov/search/view/annual/f91df2f1-eaa8-48ea-93b5-820f1526757c/', { waitUntil: 'networkidle2' }); // Ensure no network requests are happening (in last 500ms).
        await Promise.all([
            page.click("#agree_statement"),
            page.waitForNavigation()
        ]);
    } catch (err){
        console.log("Error during puppeteer setup: ", err);
    }
    
    try {
        res = await fetcher();
    } catch(err) {
        console.log('Could not fetch urls', err);
    }

    try {
        if(schema === Senator || schema === SenateCandidate){ // Do screenshots...
            await asyncForEach(res, async(item) => {
                await page.goto(`${item.url}`, { waitUntil: 'networkidle2' });
                const linkHandlers = await page.$x("//a[contains(text(), 'Printer-Friendly')]");

                if (linkHandlers.length > 0) {
                    return null;
                }

                await page.screenshot({
                    path: `./images/${item.id}.png`,
                    fullPage: true
                });
                console.log(`Screenshotted resource: `, item.id);
            });
        };
    } catch(err){
        console.log(`Error taking screenshots/parsing OCR: `, err);
    };
   
    await browser.close();
};

takeScreenshots(getSenatorUrls, Senator)
    .then(async() => {
        const fileNames = await readFiles();
        asyncForEach(fileNames, async(file) => {
            await writeTextFile(TesseractWorker, file);
        });
    })
    .catch((err) => {
        console.log(err);
    });