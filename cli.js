const { run } = require('./index');

const args = process.argv.slice(2);
const options = {
  url: null,
  output: 'report.html',
  json: null
};

args.forEach((arg, index) => {
  if (arg === '--url' && args[index + 1]) {
    options.url = args[index + 1];
  } else if (arg === '--output' && args[index + 1]) {
    options.output = args[index + 1];
  } else if (arg === '--json' && args[index + 1]) {
    options.json = args[index + 1];
  }
});

if (!options.url) {
  console.error('❌ Error: --url parameter is required');
  process.exit(1);
}

const urls = options.url.split(',').map(s => s.trim());
run(urls, { output: options.output, json: options.json });