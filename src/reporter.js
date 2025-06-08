const fs = require('fs');
const path = require('path');
const _open = require('open');
const open = typeof _open === 'function' ? _open : _open.default;

const generateReport = async (results, options) => {
  const outputPath = options.output || 'report.html';
  const jsonPath = options.json || null;

  const overallScore = results.length
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
    : 100;

  const getScoreClass = score =>
    score >= 80 ? 'ok' : score >= 50 ? 'warn' : 'error';

  const html = `
    <html>
    <head>
      <title>Automation Readiness Report</title>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin-bottom: 2rem; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        th { background-color: #f4f4f4; }
        code { font-size: 0.85em; }
        .ok { color: green; }
        .warn { color: orange; }
        .error { color: red; }
      </style>
    </head>
    <body>
      <h1>Automation Readiness Report</h1>
      <h2>Overall Readiness Score: <span class="${getScoreClass(overallScore)}">${overallScore}%</span></h2>
      ${results.map(pageResult => `
        <h3>${pageResult.url}</h3>
        <p><strong>Page Score:</strong> <span class="${getScoreClass(pageResult.score)}">${pageResult.score}%</span></p>
        <table>
          <tr><th>Tag</th><th>ID</th><th>Class</th><th>Text</th><th>Issue</th><th>Suggested Selector</th></tr>
          ${pageResult.issues.map(el => `
            <tr>
              <td>${el.tag}</td>
              <td>${el.id || '-'}</td>
              <td>${el.class || '-'}</td>
              <td>${el.text}</td>
              <td class="${el.issueType.includes('❌') ? 'error' : el.issueType.includes('⚠️') ? 'warn' : 'ok'}">${el.issueType}</td>
              <td><code>${el.suggestion}</code></td>
            </tr>
          `).join('')}
        </table>
      `).join('')}
    </body>
    </html>
  `;

  const resolvedHtmlPath = path.resolve(outputPath);
  fs.writeFileSync(resolvedHtmlPath, html, 'utf-8');
  console.log(`✅ HTML report saved to ${resolvedHtmlPath}`);
  await open(resolvedHtmlPath);

  if (jsonPath) {
    fs.writeFileSync(path.resolve(jsonPath), JSON.stringify(results, null, 2), 'utf-8');
    console.log(`✅ JSON report saved to ${jsonPath}`);
  }
};

module.exports = { generateReport };