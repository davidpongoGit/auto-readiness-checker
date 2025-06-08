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
Import the neccesary configuration.
```
const { scan } = require('auto-readiness-checker');
```

In your test,  run the utility to start the readiness checker. Note: Remember to login first to any sites before running the checker.
```
await scan(page);
```


## 📂 Output
```
auto-readiness-report/readiness-dashboard.html – visual report
```
```
auto-readiness-report/readiness-dashboard.json – structured report
```