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

      return document.querySelector("body > div > div.column.right-column > clock-time").shadowRoot.querySelector("div > span").innerHTML;
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

      return document.querySelector("body > div > div.column.right-column > clock-time").shadowRoot.querySelector("div > span").innerHTML;
    });

    expect(clock === idealClock).toBe(true);
  });
});
