const { defineConfig } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests/',
  reporter: 'html',
  timeout: 30000,
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000
  },

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',// only-on-failure, off
    trace: 'on' //off,on,retain-on-failure
    
  }

 
});

