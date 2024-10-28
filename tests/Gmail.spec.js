const {test,expect} = require("@playwright/test")

let webContext;

test.beforeAll("Gmail login",async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://automationexercise.com/");
    await page.locator("a[href*='/login']").click();
    await page.locator("input[data-qa='login-email']").fill("kumarlokesh57@gmail.com");
    await page.locator("input[data-qa='login-password']").fill("Samsung@135");
    await page.getByRole("button",{name:"Login"}).click();
    await context.storageState({path:"state1.json"});
    webContext = await browser.newContext({storageState:'state1.json'})

})

test("test automation exercise",async ()=>{
    const page = await webContext.newPage();
    await page.goto('https://automationexercise.com/');
    // await page.pause();
})