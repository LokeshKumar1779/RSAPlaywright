const {test, expect} = require('@playwright/test');

test.describe.configure({mode:'serial'})
/* test("Browser context playwright test", async ({browser})=> {
    const context  = await browser.newContext();
    const page = await context.newPage();  
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
}); */

test("Page fixture playwright test", async ({page})=> {
    // const context  = await browser.newContext();
    // const page = await context.newPage();  
    await page.goto("https://www.google.com/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test("Login test", async ({page})=> {
    // const context  = await browser.newContext();
    // const page = await context.newPage();  

    const userName = page.locator("#username");
    const passWord = page.locator("input[type='password']");
    const signInBtn = page.locator("input[id='signInBtn']");
    const errMsg = page.locator("div[style*='block']");
    const cartTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Title : " +await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await userName.fill("rahulshetty");
    await passWord.fill("learning");
    await signInBtn.click();
    console.log("Error Msg : " +await errMsg.textContent());
    await expect(errMsg).toContainText('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInBtn.click();
    console.log(await cartTitles.nth(0).textContent());
    
    expect(await cartTitles.first().textContent()).toContain('iphone');
    console.log(await cartTitles.allTextContents());
       
});

test("RSA Client Website",async ({page}) =>{
    const emailId = page.locator('#userEmail');
    const pwd = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const cardTitle = page.locator(".card-body b");

    await page.goto("https://rahulshettyacademy.com/client/");
    await emailId.fill("kumarlokesh57@gmail.com");
    await pwd.fill("Samsung@135");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");
    // await cardTitle.first().waitFor();
    // expect(await cardTitle.first().textContent()).toContain('ZARA COAT 3');
    console.log(await cardTitle.allTextContents());
    expect(await cardTitle.allTextContents()).toContain("ZARA COAT 3");
    
})