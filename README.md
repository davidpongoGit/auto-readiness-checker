# Auto Readiness Checker

> Scan your web app and generate a visual report of UI elements that lack unique selectors — to help you get automation-ready for Playwright or Cypress. No more suprises! Be a faster automation engineer! Communicate the areas of imporvements with your frontend dev faster and constructively. 

## 🚀 Features

- Scans pages for missing IDs or test selectors
- Highlights duplicate IDs or weak selectors
- Outputs visual HTML report and structured JSON report
- Works as a Node.js library — no browser extension needed
- Supports both single pages and site crawls

## 📦 How to Install

npm install auto-readiness-checker

## 🧪 How to use in Playwright (Can be used in Cypress too)

const { scan } = require('auto-readiness-checker');

test('scan the dashboard page', async ({ page }) => {
  await page.goto('https://your-site.com/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password');
  await page.click('button[type=submit]');
  await page.waitForNavigation();

  await page.goto('https://your-site.com/dashboard');
  await scan(page);
});

## 📂 Output

auto-readiness-report/readiness-dashboard.html – visual report
auto-readiness-report/readiness-dashboard.json – structured report