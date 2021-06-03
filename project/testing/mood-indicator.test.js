describe('Testing Mood Indicator Component', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:8080');
    // await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
    /**
     * Below is the line you can use if you want to test it against the current working prototype:
     * await page.goto('https://cse110-sp21-group25.github.io/cse110-sp21-group25/project/src/index.html');
     * For testing purposes though need to get the local copy working properly.
     */
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

    await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('.meh').click();
    });

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

    await page.evaluate(() => {
      return document.querySelector('mood-ind').shadowRoot.querySelector('.great').click();
    });

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
