import Tesseract from 'tesseract.js';
import path from "path";
import fs from "fs";
import util from "util";

const writeFile = util.promisify(fs.writeFile);

const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

worker
  .recognize(path.resolve(__dirname, "images", "website.png"))
  .progress((p) => {
    console.log('progress', p);
  })
  .then(async({ text }) => {
    console.log('Text Scanned.');
    worker.terminate();
    await writeFile(path.resolve(__dirname, 'texts', 'text.txt'), text);
    console.log('Text file written.')
  });