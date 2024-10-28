const {test, expect} = require("@playwright/test");

test("Alerts Handling", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    /* await page.goto("https://www.google.com");
    await page.goBack()
    await expect(page).toHaveTitle("Practice Page");
    await page.goForward();
    await expect(page).toHaveTitle("Google"); */
  
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();
    page.locator('#hide-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeHidden();
    await page.locator('#show-textbox').click();
    await expect(page.getByPlaceholder('Hide/Show Example')).toBeVisible();

    // Alert Handling

    page.on("dialog",dialog => dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.getByRole("button",{name:'Mouse Hover'}).hover();
    // await page.locator("#mousehover").hover();

    // Frames Handling
    // await page.pause();
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-acces']:visible").click();
    const text = await framePage.locator(".text h2").textContent();
    console.log("Price : " +text.split(" ")[1]);
    expect(text.split(" ")[1]).toBe("13,522");
    

})