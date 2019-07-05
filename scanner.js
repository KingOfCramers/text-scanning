import path from "path";
import fs from "fs";
import util from "util";
import { asyncForEach } from './utils';

const writeFile = util.promisify(fs.writeFile);
const readDir = util.promisify(fs.readdir);

import Tesseract from 'tesseract.js';
const { TesseractWorker } = Tesseract; 

export const readFiles = async () => {
  const files = await readDir(path.resolve(__dirname, "images"));
  return files.filter((file) => file !== '.DS_Store');
}

export const writeTextFile = (TesseractWorker, fileName) => new Promise((resolve, reject) => {
  const worker = new TesseractWorker();
  
  worker
    .recognize(path.resolve(__dirname, "images", `${fileName}`), 'eng')
    .progress((p) => {
      console.log('progress', p);
    })
    .then(async({ text }) => {
      console.log('Text Scanned.');
      await writeFile(path.resolve(__dirname, 'texts', `${fileName.slice(0, fileName.length - 4)}.txt`), text);
      console.log('Text file written.')
      worker.terminate();
      resolve();
    })
    .catch((err) => reject(err));
});

// writeTextFile(TesseractWorker, '5d0ebf2916c5151a47f36f5b.png')
//   .then(() => console.log('Done!'))
//   .catch((err) => console.log(err));