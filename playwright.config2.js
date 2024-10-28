const {devices } = require('@playwright/test');


const config = {
  testDir: './tests',
  reporter: 'html',
  timeout: 30000,
  retries: 1,
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000
  },
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot:'only-on-failure',//off,on
        trace: 'on', //off,on,retain-on-failure
        //viewport: {width:1440,height:900}
        //viewport: {width:720,height:480},
        ignoreHTTPSErrors:true, //SSL error handling
        permissions:['geolocation'], //handling location pop up on browser
        //...devices['Galaxy S8']
        video: 'retain-on-failure' //off,on,retain-on-failure
      }
 
};

module.exports = config;

