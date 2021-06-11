module.exports = {
  launch: {
    headless: false,
    slowMo: 500 // Change this to false if you want it to be faster. Currently slows it down so that you can see what it's doing.
  },
  server: {
    command: `npx http-server ./src`,
    port: 8080,
    launchTimeout: 10000,
    debug: false
  }
};
