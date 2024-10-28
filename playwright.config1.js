const { defineConfig, devices } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  reporter: 'html',
  timeout: 30000,
  retries: 2,
  //workers: 3,
  expect: {
    // Maximum time expect() should wait for the condition to be met.
    timeout: 5000
  },
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: true,
        screenshot:'only-on-failure',//off,on
        trace: 'on', //off,on,retain-on-failure
        //viewport: {width:1440,height:900}
        viewport: {width:1680,height:1050},
        ignoreHTTPSErrors:true, //SSL error handling
        permissions:['geolocation'] //handling location pop up on browser
        //...devices['Galaxy S8']
      }
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: true,
        trace: 'on' //off,on,retain-on-failure
      }
    },
  ]
 
});

