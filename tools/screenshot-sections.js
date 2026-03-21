const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8743/index-v4.html';
const OUT  = path.resolve(__dirname, '../.tmp/screenshots');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await puppeteer.launch({ headless: true });

  // ── Desktop full sections ─────────────────────────────────
  const desktop = await browser.newPage();
  await desktop.setViewport({ width: 1440, height: 900 });
  await desktop.goto(BASE, { waitUntil: 'networkidle0' });
  await desktop.waitForSelector('#founder', { timeout: 10000 });

  const sections = [
    { id: 'founder',   label: 'founder-desktop' },
    { id: 'resources', label: 'resources-desktop' },
  ];

  for (const { id, label } of sections) {
    const el = await desktop.$(`#${id}`);
    if (!el) { console.warn(`#${id} not found`); continue; }
    const box = await el.boundingBox();
    await desktop.screenshot({
      path: path.join(OUT, `${label}.png`),
      clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 1200) },
    });
    console.log(`✓ ${label}.png`);
  }

  // ── Zoom in: founder left column (photo + caption) ───────
  const founderEl = await desktop.$('#founder');
  const founderBox = await founderEl.boundingBox();
  await desktop.screenshot({
    path: path.join(OUT, 'founder-left-col.png'),
    clip: { x: founderBox.x + 80, y: founderBox.y + 40, width: 400, height: 600 },
  });
  console.log('✓ founder-left-col.png');

  // ── Mobile ────────────────────────────────────────────────
  const mobile = await browser.newPage();
  await mobile.setViewport({ width: 375, height: 812 });
  await mobile.goto(BASE, { waitUntil: 'networkidle0' });
  await mobile.waitForSelector('#founder', { timeout: 10000 });

  const mobileFounder = await mobile.$('#founder');
  if (mobileFounder) {
    const box = await mobileFounder.boundingBox();
    await mobile.screenshot({
      path: path.join(OUT, 'founder-mobile.png'),
      clip: { x: box.x, y: box.y, width: box.width, height: Math.min(box.height, 1400) },
    });
    console.log('✓ founder-mobile.png');
  }

  await browser.close();
  console.log(`\nScreenshots saved to: ${OUT}`);
})();
