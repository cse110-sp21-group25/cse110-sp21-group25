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

  test('Test3: Add tag wiht color', async () => {
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

  test('Test5: On reload tag stil there', async () => {
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
