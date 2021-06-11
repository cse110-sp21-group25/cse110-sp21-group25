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
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(1) > th:nth-child(1) > img').src;
    });

    expect(taskIncompleteIcon).toMatch(/task-incompl.svg/);
  });

  test('Test2: Validating that the Task Scheduled icon/symbol is correct', async () => {
    const taskScheduledIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(1) > th:nth-child(2) > img').src;
    });

    expect(taskScheduledIcon).toMatch(/task-scheduled.svg/);
  });

  test('Test3: Validating that the Inspiration icon/symbol is correct', async () => {
    const inspirationIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(1) > th:nth-child(3) > img').src;
    });

    expect(inspirationIcon).toMatch(/inspiration.svg/);
  });

  test('Test4: Validating that the Task Complete icon/symbol is correct', async () => {
    const taskCompleteIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(2) > th:nth-child(1) > img').src;
    });

    expect(taskCompleteIcon).toMatch(/task-compl.svg/);
  });

  test('Test5: Validating that the Event icon/symbol is correct', async () => {
    const taskCompleteIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(2) > th:nth-child(2) > img').src;
    });

    expect(taskCompleteIcon).toMatch(/event.svg/);
  });

  test('Test6: Validating that the Notes icon/symbol is correct', async () => {
    const notesIcon = await page.evaluate(() => {
      const symbolMenu = document.querySelector('body > div > div.column.middle-column > menu-symbols');
      return symbolMenu.shadowRoot.querySelector('#menu > table > tbody > tr:nth-child(2) > th:nth-child(3) > img').src;
    });

    expect(notesIcon).toMatch(/notes.svg/);
  });
});
