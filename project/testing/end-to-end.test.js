// -------------------------------------------DO NOT ALTER-------------------------------------------------------------
const pti = require('puppeteer-to-istanbul');

// This will run before everything else and start the coverage tracking for CSS and JS.
(async () => {
  await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage()
  ]);
})();

// After all of the tests are run we want to end the coverage tracking and print out the coverage report somewhere for our nyc to read it.
afterAll(async () => {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);
  pti.write([...jsCoverage, ...cssCoverage], {
    storagePath: './testing/coverage/.nyc_output'
  });
});
// -------------------------------------------DO NOT ALTER ABOVE-------------------------------------------------------
// Please do not alter any of the code above. Is required to generate test coverage.

describe('Testing Nav Bar Component', () => {
  beforeAll(async () => {
    // Added the waitUntil to be sure the page is loaded before we begin.
    await page.goto('http://127.0.0.1:8080', { waitUntil: 'networkidle0' });

    /**
     * Below is the line you can use if you want to test it against the current working prototype:
     * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
     * For testing purposes though need to get the local copy working properly.
     */
    await page.waitForTimeout(500);
  });

  // -------------------------------------------BEGIN OF TESTS FOR NAV-BAR COMPONENT-------------------------------------------------------------

  test('Test1: Check Nav-Bar Title to be CuJo', async () => {
    // This is what needs to be done in order to navigate through a #shadow-root.
    // To see how this was done go to devtools in your browser and type in the following:
    // `console.log(document.querySelector('nav-bar').shadowRoot.querySelector('.header-text').innerText)`
    const navBarTitle = await page.evaluate(() => {
      return document.querySelector('nav-bar').shadowRoot.querySelector('.header-text').innerText;
    });

    expect(navBarTitle).toBe('CuJo');
  });

  test('Test2: Click on Yearly making sure that the css is updated accordingly', async () => {
    const classListBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.yearly').classList;
    });

    expect(classListBeforeClick[0]).toBe('navbar-tab');
    expect(classListBeforeClick[1]).toBe('yearly');
    expect(classListBeforeClick[2]).toBe(undefined);

    await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.yearly').click();
    });

    const classListAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.yearly').classList;
    });

    expect(classListAfterClick[0]).toBe('navbar-tab');
    expect(classListAfterClick[1]).toBe('yearly');
    expect(classListAfterClick[2]).toBe('navbar-tab-highlighted'); // This being the main change we wanted to verify.
  });

  test('Test3: Test to be sure that Yearly will expand if it is clicked', async () => {
    // Firstly let's refresh the page to set it back to un-expanded.
    await page.reload();

    // Before Clicking the following should return true.
    const iconBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.yearly > img').src;
    });

    expect(iconBeforeClick).toMatch(/chevron-right/);

    const childrenBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab-item-container.yearly-item-container').children.length;
    });

    // We expect the number of children to 0 since it has not been expanded yet.
    expect(childrenBeforeClick).toBe(0);

    // Now we will click the Yearly tab and test that it reacts properly.
    await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.yearly').click();
    });

    const iconAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.yearly > img').src;
    });

    expect(iconAfterClick).toMatch(/chevron-down-solid/);

    const childrenAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab-item-container.yearly-item-container').children.length;
    });

    // We expect the number of children to be greater than 0 since it will have been expanded.
    expect(childrenAfterClick).toBeGreaterThan(0);
  });

  test('Test4: Click on Monthly making sure that the css is updated accordingly', async () => {
    const classListBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.monthly').classList;
    });

    expect(classListBeforeClick[0]).toBe('navbar-tab');
    expect(classListBeforeClick[1]).toBe('monthly');
    expect(classListBeforeClick[2]).toBe(undefined);

    await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.monthly').click();
    });

    const classListAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.monthly').classList;
    });

    expect(classListAfterClick[0]).toBe('navbar-tab');
    expect(classListAfterClick[1]).toBe('monthly');
    expect(classListAfterClick[2]).toBe('navbar-tab-highlighted'); // This being the main change we wanted to verify.
  });

  test('Test5: Test to be sure that Monthly will expand if it is clicked', async () => {
    // Firstly let's refresh the page to set it back to un-expanded.
    await page.reload();

    // Before Clicking the following should return true.
    const iconBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.monthly > img').src;
    });

    expect(iconBeforeClick).toMatch(/chevron-right/);

    const childrenBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab-item-container.monthly-item-container').children.length;
    });

    // We expect the number of children to 0 since it has not been expanded yet.
    expect(childrenBeforeClick).toBe(0);

    // Now we will click the Yearly tab and test that it reacts properly.
    await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.monthly').click();
    });

    const iconAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.monthly > img').src;
    });

    expect(iconAfterClick).toMatch(/chevron-down-solid/);

    const childrenAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab-item-container.monthly-item-container').children.length;
    });

    // We expect the number of children to be greater than 0 since it will have been expanded.
    expect(childrenAfterClick).toBeGreaterThan(0);
  });

  test('Test6: Click on Daily making sure that the css is updated accordingly', async () => {
    const classListBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.daily').classList;
    });

    expect(classListBeforeClick[0]).toBe('navbar-tab');
    expect(classListBeforeClick[1]).toBe('daily');
    expect(classListBeforeClick[2]).toBe(undefined);

    await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.daily').click();
    });

    const classListAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.daily').classList;
    });

    expect(classListAfterClick[0]).toBe('navbar-tab');
    expect(classListAfterClick[1]).toBe('daily');
    expect(classListAfterClick[2]).toBe('navbar-tab-highlighted'); // This being the main change we wanted to verify.
  });

  test('Test7: Test to be sure that Daily will expand if it is clicked', async () => {
    // Firstly let's refresh the page to set it back to un-expanded.
    await page.reload();

    // Before Clicking the following should return true.
    const iconBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.daily > img').src;
    });

    expect(iconBeforeClick).toMatch(/chevron-right/);

    const childrenBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab-item-container.daily-item-container').children.length;
    });

    // We expect the number of children to 0 since it has not been expanded yet.
    expect(childrenBeforeClick).toBe(0);

    // Now we will click the Yearly tab and test that it reacts properly.
    await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.daily').click();
    });

    const iconAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab.daily > img').src;
    });

    expect(iconAfterClick).toMatch(/chevron-down-solid/);

    const childrenAfterClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-tab-item-container.daily-item-container').children.length;
    });

    // We expect the number of children to be greater than 0 since it will have been expanded.
    expect(childrenAfterClick).toBeGreaterThan(0);
  });

  test('Test8: Check Nav-Bar Focus button holds the correct image/icon', async () => {
    // Test the img before clicking.
    const focusIconBeforeClick = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.header > img.focus-btn').src;
    });

    expect(focusIconBeforeClick).toMatch(/eye.svg/);
  });

  test('Test9: Check Nav-Bar Information button holds the correct image/icon', async () => {
    // Test the img before clicking.
    const informationButton = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-symbols-container > a.navbar-info > img').src;
    });

    expect(informationButton).toMatch(/help-icon.svg/);
  });

  test('Test10: Check Nav-Bar Settings button holds the correct image/icon', async () => {
    // Test the img before clicking.
    const informationButton = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.left-column > nav-bar').shadowRoot.querySelector('navbar > div.navbar-symbols-container > a.navbar-settings > img').src;
    });

    expect(informationButton).toMatch(/cog-solid.svg/);
  });

  // -------------------------------------------END OF TESTS FOR NAV-BAR COMPONENT-------------------------------------------------------------
});