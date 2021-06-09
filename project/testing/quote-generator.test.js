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

          return document.querySelector("body > div > div.column.right-column > quote-gen").shadowRoot.querySelector("#quoteContainer > span").innerHTML;
      });
      
      expect(quoteGenerator.length).toBeGreaterThan(0);
    });

    test('Test2: Check that refresh generates a new quote', async () => {

        const oldQuote = await page.evaluate(() => {
  
            return document.querySelector("body > div > div.column.right-column > quote-gen").shadowRoot.querySelector("#quoteContainer > span").innerHTML;
        });

        await page.reload();

        const newQuote = await page.evaluate(() => {
            
            return document.querySelector("body > div > div.column.right-column > quote-gen").shadowRoot.querySelector("#quoteContainer > span").innerHTML;
        });
        
        expect(newQuote === oldQuote).toBe(false);
      });
  });
  