const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 900, height: 560 });
  await page.goto('file://' + path.resolve(__dirname, 'comparison.html'));
  await page.screenshot({
    path: path.resolve(__dirname, '../02-comparison-infographic.png'),
    fullPage: false,
  });
  await browser.close();
  console.log('Image saved: ' + path.resolve(__dirname, '../02-comparison-infographic.png'));
})();
