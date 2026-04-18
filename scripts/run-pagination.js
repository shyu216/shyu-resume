const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

async function run() {
  const examplePath = path.join(__dirname, '..', 'public', 'release', '2026-04-18-example-html', 'example.html');
  if (!fs.existsSync(examplePath)) {
    console.error('example.html not found at', examplePath);
    process.exit(1);
  }

  const paginationLibPath = path.join(__dirname, '..', 'lib', 'pagination.js');
  if (!fs.existsSync(paginationLibPath)) {
    console.error('pagination.js not found at', paginationLibPath);
    process.exit(1);
  }

  const paginationCode = fs.readFileSync(paginationLibPath, 'utf8');

  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', (msg) => {
    // print page console messages to node console
    console.log('PAGE:', msg.text());
  });

  const url = 'file://' + examplePath;
  await page.goto(url);

  // inject pagination helper
  await page.addScriptTag({ content: paginationCode });

  // run helper and capture result
  const result = await page.evaluate(() => {
    if (typeof window.__runPagination !== 'function') return { error: 'no-runner' };
    return window.__runPagination();
  });

  console.log('RESULT:', JSON.stringify(result));

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
