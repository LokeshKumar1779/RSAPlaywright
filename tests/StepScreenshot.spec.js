const { test,expect } = require("@playwright/test");

test("step screenshot",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path : "partialscreenshot.jpg"});
    await page.locator('#hide-textbox').click();

    await page.screenshot({path : "screenshot.jpg"});
})

test("visual testing or image comparison",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/auth/login");
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png');
})