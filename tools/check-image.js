const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const file = path.resolve(__dirname, '../index-v4.html').replace(/\\/g, '/');
  await page.goto('file:///' + file, { waitUntil: 'networkidle0' });
  const imgInfo = await page.evaluate(() => {
    const img = document.querySelector('.founder-bio-photo');
    return { src: img.src, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, complete: img.complete };
  });
  console.log(JSON.stringify(imgInfo, null, 2));
  await browser.close();
})();
