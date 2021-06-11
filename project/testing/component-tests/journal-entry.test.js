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
