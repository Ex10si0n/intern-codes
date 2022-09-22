const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {
    waitUntil: 'networkidle0',
  });
  await page.pdf({path: 'hack_news.pdf', format: 'a4'});

  await browser.close();
})();