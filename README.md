# Auto Readiness Checker

> Scan your web app and generate a visual report of UI elements that lack unique selectors — to help you get automation-ready for Playwright. No more suprises! Be a faster automation engineer! Communicate areas of imporvements with your frontend dev team faster and constructively. 

## 🚀 Features

- Scans pages for missing IDs or test selectors
- Highlights duplicate IDs or weak selectors
- Outputs visual HTML report and structured JSON report
- Works as a Node.js library — no browser extension needed
- Supports both single pages and site crawls

## 📦 How to Install

npm install auto-readiness-checker

## 🧪 How to use (Playwright only)

Import <const { scan } = require('auto-readiness-checker');>

Use <await scan(page);> in your test to run the readiness checker. 


## 📂 Output

auto-readiness-report/readiness-dashboard.html – visual report
auto-readiness-report/readiness-dashboard.json – structured report