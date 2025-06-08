const fs = require('fs');
const path = require('path');
const { scanPage } = require('./src/scanner');
const { generateReport } = require('./src/reporter');
const { crawl } = require('./src/crawler');

async function run(urls, options = {}) {
  const urlsArray = Array.isArray(urls) ? urls : [urls];
  const results = [];

  for (const url of urlsArray) {
    const pages = await crawl(url, options);
    for (const pageData of pages) {
      const { issues, score } = await scanPage(pageData);
      results.push({ url: pageData.url, issues, score });
      await pageData.page.close();
    }
  }

  await generateReport(results, options);
}

async function scan(page, options = {}) {
  const { issues, score } = await scanPage({ page });
  const results = [{ url: await page.url(), issues, score }];

  const outputDir = path.resolve('auto-readiness-report');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputHtml = path.join(outputDir, 'readiness-dashboard.html');
  const outputJson = path.join(outputDir, 'readiness-dashboard.json');

  await generateReport(results, {
    output: path.resolve(options.output || outputHtml),
    json: path.resolve(options.json || outputJson)
  });
}

module.exports = { run, scan };
