// -------------------------------------------DO NOT ALTER-------------------------------------------------------------
(async () => {
  const pti = require('puppeteer-to-istanbul');
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Enable both JavaScript and CSS coverage
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ]);

  // Navigate to page
  await page.goto('http://127.0.0.1:8080');

  // Disable both JavaScript and CSS coverage
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);
  pti.write([...jsCoverage, ...cssCoverage], { includeHostname: true, storagePath: './testing/coverage/.nyc_output' });
  await browser.close();
})();
// -------------------------------------------DO NOT ALTER ABOVE-------------------------------------------------------
// Please do not alter any of the code above. Is required to generate test coverage.

describe('Testing Nav Bar', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    /**
     * Below is the line you can use if you want to test it against the current working prototype:
     * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
     * For testing purposes though need to get the local copy working properly.
     */
    await page.waitForTimeout(500);
  });

  test('Test1: Check Nav-Bar Title to be CuJo', async () => {
    // This is what needs to be done in order to navigate through a #shadow-root.
    // To see how this was done go to devtools in your browser and type in the following:
    // `console.log(document.querySelector('nav-bar').shadowRoot.querySelector('.header-text').innerText)`
    const navBarTitle = await page.evaluate(() => {
      return document.querySelector('nav-bar').shadowRoot.querySelector('.header-text').innerText;
    });

    expect(navBarTitle).toBe('CuJo');
  });
});
