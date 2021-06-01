describe('Testing Nav Bar Component', () => {
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

  //   test('Test2: Click on Yearly making sure the css is updated accordingly', async () => {
  //     const classListBeforeClick = await page.evaluate(() => {
  //       return document.querySelector('nav-bar').shadowRoot.querySelector('.navbar-tab.yearly').classList;
  //     });

  //     expect(classListBeforeClick).toInclude('navbar-tab');

//     console.log(classListBeforeClick);
//   });
});
