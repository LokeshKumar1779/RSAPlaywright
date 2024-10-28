const { test, expect } = require("@playwright/test");



test("@Web UI Components handling", async ({ page }) => {
    const userName = page.locator("#username");
    const passWord = page.locator("input[type='password']");
    const signInBtn = page.locator("input[id='signInBtn']");
    const userRadioBtn = page.locator(".radiotextsty");
    const okBtn = page.locator("#okayBtn");
    const dropdown = page.locator("select.form-control");
    const checkBox = page.locator("input[id='terms']")
    const documentLink = page.locator("a[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await passWord.fill("learning");
    await userRadioBtn.last().click();
    console.log("Is radio button checked : " + await userRadioBtn.last().isChecked());
    await expect(userRadioBtn.last()).toBeChecked();
    await okBtn.click();
    await dropdown.selectOption("consult");
    await checkBox.click();
    console.log("Is terms checkbox checked : " + await checkBox.isChecked());

    // await page.pause();
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    //await signInBtn.click();

    await expect(documentLink).toHaveAttribute('class', 'BlinkingText', { ignoreCase: true, timeout: 2000 });

})

test("@Web Window handle", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const passWord = page.locator("input[type='password']");
    const signInBtn = page.locator("input[id='signInBtn']");
    const userRadioBtn = page.locator(".radiotextsty");
    const okBtn = page.locator("#okayBtn");
    const dropdown = page.locator("select.form-control");
    const checkBox = page.locator("input[id='terms']")
    const documentLink = page.locator("a[href*='documents-request']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        documentLink.click()
    ])

    const text = await newPage.locator(".red").textContent();
    const domain = text.split("@")[1].split(" ")[0];
    console.log(domain);

    await userName.fill(domain);
    // await page.pause();

})