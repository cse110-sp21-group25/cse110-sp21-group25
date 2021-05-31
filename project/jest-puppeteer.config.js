module.exports = {
  launch: {
    headless: true,
    slowMo: false // Change this to false if you want it to be faster. Currently slows it down so that you can see what it's doing.
  },
  server: {
    command: `npx http-server ./src`,
    port: 8080,
    launchTimeout: 10000,
    debug: true
  }
};
