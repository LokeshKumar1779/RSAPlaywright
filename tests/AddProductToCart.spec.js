const { test, expect } = require("@playwright/test");



test("Add product to cart", async ({ page }) => {
    const emailId = page.locator('#userEmail');
    const pwd = page.locator('#userPassword');
    const loginBtn = page.locator('#login');
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client/");
    await emailId.fill("kumarlokesh57@gmail.com");
    await pwd.fill("Samsung@135");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");
    const productLen = await products.count();


    for (let i = 0; i < productLen; i++) {

        if (await products.nth(i).locator("b").textContent() === "ZARA COAT 3") {
            await products.nth(i).locator("text=ADD TO CART").click();
            break;
        }
}   
    await page.locator("[routerlink*='cart']").click();
    await page.locator("li.items").waitFor();
    expect(await page.locator("h3:has-text('ZARA COAT 3')").isVisible()).toBeTruthy();
    await page.locator("button[type='button']").last().click();
    await page.waitForLoadState('networkidle');
    await page.locator("input[class='input txt']").first().fill("123");
    await page.locator("input[class='input txt']").last().fill("Lokesh");
    // await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    // await page.locator("button[type='submit']").click();
    // await page.locator("div[class*='la-ball-scale-multiple']").waitFor("hidden");
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    
    const results = page.locator(".ta-results");
    await results.waitFor();
    const resultscount = await results.locator("button").count();
    for (let i = 0; i < resultscount; i++) {
        const country = await results.locator("button").nth(i).textContent();
        if (country.trim()==="India") {
            await results.locator("button").nth(i).click();
            break;
        }
        
    }
    await expect(page.locator("div[class*='user__name'] label")).toHaveText("kumarlokesh57@gmail.com");
    await page.locator(".action__submit").click();
    await expect(page.locator("h1.hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const order_id = await rows.nth(i).locator("th").textContent();

        if (orderId.replaceAll("|","").trim() === order_id) {
            await rows.nth(i).locator(".btn.btn-primary").click();
            break;
        }
        
    }
    await page.locator("div.email-title").waitFor();
    await expect(page.locator("p.tagline")).toHaveText("Thank you for Shopping With Us");
    await expect(page.locator("div.col-text.-main")).toHaveText(orderId.replaceAll("|","").trim());
    await expect(page.locator(".address p").first()).toHaveText("kumarlokesh57@gmail.com");
    await expect(page.locator("div.title")).toHaveText("ZARA COAT 3");
    // await page.pause();
    
})