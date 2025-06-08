const playwright = require('playwright');

const crawl = async (startUrl, options = {}) => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(startUrl);

  return [
    {
      url: startUrl,
      page
    }
  ];
};

module.exports = { crawl };