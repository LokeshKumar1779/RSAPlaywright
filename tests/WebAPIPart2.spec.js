const {test,expect,request} = require("@playwright/test");
const {apiutils} = require ("../utils/apiutils"); 

const loginPayload = {userEmail:"kumarlokesh57@gmail.com",userPassword:"Samsung@135"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};

let response;

test.beforeAll(async ()=>{
   const apiContext = await request.newContext();
   const apiUtils = new apiutils(apiContext,loginPayload);
   response = await apiUtils.createOrder(orderPayload);

});

test("@API Login test", async ({page})=>{

    page.addInitScript( value => {
        window.localStorage.setItem("token",value);
    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const orderId = await rows.nth(i).locator("th").textContent();

        if (response.orderId === orderId) {
            await rows.nth(i).locator(".btn.btn-primary").click();
            break;
        }
        
    }
    await page.locator("div.email-title").waitFor();
    await expect(page.locator("p.tagline")).toHaveText("Thank you for Shopping With Us");
    await expect(page.locator("div.col-text.-main")).toHaveText(response.orderId);
    await expect(page.locator(".address p").first()).toHaveText("kumarlokesh57@gmail.com");
    await expect(page.locator("div.title")).toHaveText("ZARA COAT 3");

    // await page.pause();
})