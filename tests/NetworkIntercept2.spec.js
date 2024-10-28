const { test } = require("@playwright/test");

test("Network call abort test", async ({browser})=>{
    
    const context  = await browser.newContext();
    const page = await context.newPage();  
    // await page.route("**/*.{jpg,jpeg,png}",route => route.abort());
    // await page.route("**/*.css",route => route.abort());
    page.on('request',request => console.log(request.url()));
    page.on('response',response => console.log(response.url(), response.status()));
    const userName = page.locator("#username");
    const passWord = page.locator("input[type='password']"); 
    const signInBtn = page.locator("input[id='signInBtn']");

   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    

    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await signInBtn.click();

    // await page.pause();
   
   




})

