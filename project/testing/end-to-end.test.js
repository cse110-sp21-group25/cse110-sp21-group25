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

// -------------------------------------------BEGINNING OF TESTS FOR NAV-BAR COMPONENT---------------------------------------------------------

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
});

// -------------------------------------------END OF TESTS FOR NAV-BAR COMPONENT---------------------------------------------------------------------

// -------------------------------------------BEGINNING OF TESTS FOR MOOD INDICATOR COMPONENT--------------------------------------------------------

describe('Testing Mood Indicator Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    await page.waitForTimeout(500);
  });

  test('Test1: Verify the initial Mood Indicator has proper title and class', async () => {
    const cardText = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').innerText;
    });

    const cardClass = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').classList[0];
    });

    expect(cardText).toBe('How Are You Feeling Today?');

    expect(cardClass).toBe('neutral');
  });

  test('Test2: Verify the initial Mood Indicator has all three icons.', async () => {
    const badIconClass = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.bad').className;
    });

    const badIconSrc = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.bad').src;
    });

    const mehIconClass = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.meh').className;
    });

    const mehIconSrc = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.meh').src;
    });

    const greatIconClass = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.great').className;
    });

    const greatIconSrc = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.great').src;
    });

    expect(badIconClass).toBe('bad');

    expect(badIconSrc).toMatch(/sad-emo.png/);

    expect(mehIconClass).toBe('meh');

    expect(mehIconSrc).toMatch(/meh-emo.png/);

    expect(greatIconClass).toBe('great');

    expect(greatIconSrc).toMatch(/great-emo.png/);
  });

  test('Test3: Make sure indicator is updated when clicking on red face', async () => {
    await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('.bad').click();
    });

    await page.waitForTimeout(500);

    const cardText = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').textContent;
    });

    const cardColor = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').style.backgroundColor;
    });

    const imageSrc = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.bad').src;
    });

    expect(cardText).toBe('BAD');

    expect(cardColor).toBe('rgb(231, 76, 60)');

    expect(imageSrc).toMatch(/sad-emo.png/);
  });

  test('Test4: Make sure indicator is updated when clicking on neutral face', async () => {
    // Need to refresh the page in order to reset the mood indicator.
    await page.reload();

    await page.waitForTimeout(500);

    await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('.meh').click();
    });

    await page.waitForTimeout(500);

    const cardText = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').textContent;
    });

    const cardColor = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').style.backgroundColor;
    });

    const imageSrc = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.meh').src;
    });

    expect(cardText).toBe('OKAY');

    expect(cardColor).toBe('rgb(204, 204, 204)');

    expect(imageSrc).toMatch(/meh-emo.png/);
  });

  test('Test5: Make sure indicator is updated when clicking on great face', async () => {
    // Need to refresh the page in order to reset the mood indicator.
    await page.reload();

    await page.waitForTimeout(500);

    await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('.great').click();
    });

    await page.waitForTimeout(500);

    const cardText = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').textContent;
    });

    const cardColor = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#desc').style.backgroundColor;
    });

    const imageSrc = await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('#icons').querySelector('.great').src;
    });

    expect(cardText).toBe('GREAT');

    expect(cardColor).toBe('rgb(68, 239, 137)');

    expect(imageSrc).toMatch(/great-emo.png/);
  });
});

// -------------------------------------------END OF TESTS FOR MOOD INDICATOR COMPONENT---------------------------------------------------------------------

// -------------------------------------------BEGINNING OF TESTS FOR MENU SYMBOLS COMPONENT-----------------------------------------------------------------

describe('Testing Menu Symbols Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    /**
     * Below is the line you can use if you want to test it against the current working prototype:
     * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
     * For testing purposes though need to get the local copy working properly.
     */
    await page.waitForTimeout(500);
  });

  test('Test1: Validating that the Task Incomplete icon/symbol is correct', async () => {
    const taskIncompleteIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(1) > th:nth-child(1) > li > img').src;
    });

    expect(taskIncompleteIcon).toMatch(/task-incompl.svg/);
  });

  test('Test2: Validating that the Task Scheduled icon/symbol is correct', async () => {
    const taskScheduledIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(1) > th:nth-child(2) > img').src;
    });

    expect(taskScheduledIcon).toMatch(/basics-05-16.png/);
  });

  test('Test3: Validating that the Inspiration icon/symbol is correct', async () => {
    const inspirationIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(1) > th:nth-child(3) > img').src;
    });

    expect(inspirationIcon).toMatch(/basics-22-16.png/);
  });

  test('Test4: Validating that the Task Complete icon/symbol is correct', async () => {
    const taskCompleteIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(2) > th:nth-child(1) > img').src;
    });

    expect(taskCompleteIcon).toMatch(/basics-21-16.png/);
  });

  test('Test5: Validating that the Event icon/symbol is correct', async () => {
    const taskCompleteIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(2) > th:nth-child(2) > img').src;
    });

    expect(taskCompleteIcon).toMatch(/icon-ios7-circle-outline-16.png/);
  });

  test('Test6: Validating that the Notes icon/symbol is correct', async () => {
    const notesIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(2) > th:nth-child(3) > img').src;
    });

    expect(notesIcon).toMatch(/notes.svg/);
  });
});

// -------------------------------------------END OF TESTS FOR MENU SYMBOLS COMPONENT-----------------------------------------------------------------------

// -------------------------------------------BEGINNING OF TESTS FOR QUOTE COMPONENT-----------------------------------------------------------------------

describe('Testing Quote Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    /**
       * Below is the line you can use if you want to test it against the current working prototype:
       * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
       * For testing purposes though need to get the local copy working properly.
       */
    await page.waitForTimeout(500);
  });

  test('Test1: Check that the quote-generator component isn\'t empty', async () => {
    const quoteGenerator = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.right-column > quote-gen').shadowRoot.querySelector('#quoteContainer > span').innerHTML;
    });

    expect(quoteGenerator.length).toBeGreaterThan(0);
  });

  test('Test2: Check that refresh generates a new quote', async () => {
    const oldQuote = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.right-column > quote-gen').shadowRoot.querySelector('#quoteContainer > span').innerHTML;
    });

    await page.reload();

    const newQuote = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.right-column > quote-gen').shadowRoot.querySelector('#quoteContainer > span').innerHTML;
    });

    expect(newQuote === oldQuote).toBe(false);
  });
});

// -------------------------------------------END OF TESTS FOR QUOTE COMPONENT-----------------------------------------------------------------------

// -------------------------------------------BEGINNING OF TESTS FOR GOALS BOARD COMPONENT-----------------------------------------------------------------------

describe('Testing Goals Board Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    /**
     * Below is the line you can use if you want to test it against the current working prototype:
     * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
     * For testing purposes though need to get the local copy working properly.
     */
    await page.waitForTimeout(500);
  });

  test('Test1: ENTER DESCRIPTION HERE', async () => {
    // Add some test within here. For further examples see end-to-end.test.js file.
    // expect(navBarTitle).toBe('CuJo');
  });
});

// -------------------------------------------END OF TESTS FOR GOALS BOARD COMPONENT-----------------------------------------------------------------------

// -------------------------------------------BEGINNING OF TESTS FOR JOURNAL ENTRY COMPONENT----------------------------------------------------------------------

describe('Testing Journal Entry Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    /**
     * Below is the line you can use if you want to test it against the current working prototype:
     * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
     * For testing purposes though need to get the local copy working properly.
     */
    await page.waitForTimeout(500);
  });

  test('Test1: ENTER DESCRIPTION HERE', async () => {
    // Add some test within here. For further examples see end-to-end.test.js file.
    // expect(navBarTitle).toBe('CuJo');
  });
});

// -------------------------------------------END OF TESTS FOR JOURNAL ENTRY COMPONENT-----------------------------------------------------------------------

// -------------------------------------------BEGINNING OF TESTS FOR CLOCK COMPONENT----------------------------------------------------------------------

describe('Testing Clock Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    /**
     * Below is the line you can use if you want to test it against the current working prototype:
     * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
     * For testing purposes though need to get the local copy working properly.
     */
    await page.waitForTimeout(500);
  });

  test('Test1: Check that the clock component component isn\'t empty', async () => {
    const clock = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.right-column > clock-time').shadowRoot.querySelector('div > span').innerHTML;
    });

    expect(clock.length).toBeGreaterThan(0);
  });

  test('Test2: Check that the clock display is truly day of the week, month, and date of today', async () => {
    const todayDate = new Date();

    const abbMonths = ['Jan', 'Feb', 'Mar', 'Apr',
      'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct',
      'Nov', 'Dec'
    ];

    const abbDays = ['Sun', 'Mon', 'Tues',
      'Wed', 'Thurs', 'Fri', 'Sat'
    ];

    const idealClock = abbDays[todayDate.getDay()] + ', ' + abbMonths[todayDate.getMonth()] + ' ' + todayDate.getDate();

    const clock = await page.evaluate(() => {
      return document.querySelector('body > div > div.column.right-column > clock-time').shadowRoot.querySelector('div > span').innerHTML;
    });

    expect(clock === idealClock).toBe(true);
  });
});

// -------------------------------------------END OF TESTS FOR CLOCK COMPONENT-----------------------------------------------------------------------

// -------------------------------------------BEGINNING OF TESTS FOR TAGS COMPONENT-----------------------------------------------------------------------

describe('Testing Tags Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    /**
       * Below is the line you can use if you want to test it against the current working prototype:
       * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
       * For testing purposes though need to get the local copy working properly.
       */
    await page.waitForTimeout(500);
  });

  test('Test1: Add creates a tag creator', async () => {
    await page.evaluate(() => {
      return document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > button').click();
    });

    const classListAfterClick = await page.evaluate(() => {
      return document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator').classList[0];
    });

    expect(classListAfterClick).toBe('tag-creator');
  });

  test('Test2: Add tag button adds a tag', async () => {
    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > button').click();
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > input.tag-textbox').value = 'Test Tag';
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > button.add-tag-btn').click();
    });

    const tagContentAfterAdd = await page.evaluate(() => {
      return document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tags > div > span').textContent;
    });

    expect(tagContentAfterAdd).toBe('Test Tag');
  });

  test('Test3: Add tag with color', async () => {
    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > button').click();
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > input.tag-textbox').value = 'Test Tag';
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > input.tag-color-picker').value = '#c70505';
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > button.add-tag-btn').click();
    });

    const tagContentAfterAdd = await page.evaluate(() => {
      return document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tags > div > span').textContent;
    });

    expect(tagContentAfterAdd).toBe('Test Tag');
  });

  test('Test4: Add tag button and delete', async () => {
    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > button').click();
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > input.tag-textbox').value = 'Test Tag';
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > button.add-tag-btn').click();
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div > div > button').click();
    });

    const tagNumber = await page.evaluate(() => {
      return document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div').children.length;
    });

    expect(tagNumber).toBe(0);
  });

  test('Test5: On reload tag still there', async () => {
    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > button').click();
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > input.tag-textbox').value = 'Test Tag';
    });

    await page.evaluate(() => {
      document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tag-creator > button.add-tag-btn').click();
    });

    await page.reload(() => {});
    const tagNumber = await page.evaluate(() => {
      return document.querySelector('#journal > journal-entry').shadowRoot.querySelector('div > div.entry-tags-container > tag-bujo').shadowRoot.querySelector('div > div.tags').children.length;
    });

    expect(tagNumber).toBe(1);
  });
});

// -------------------------------------------END OF TESTS FOR TAGS COMPONENT----------------------------------------------------------------------
