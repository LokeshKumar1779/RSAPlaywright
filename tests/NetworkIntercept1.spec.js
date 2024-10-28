const { test,expect,request } = require("@playwright/test");
const {apiutils} = require ("../utils/apiutils"); 


const loginPayload = { userEmail: "kumarlokesh57@gmail.com", userPassword: "Samsung@135" }
let response = {};

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new apiutils(apiContext, loginPayload);
    response.token = await apiUtils.getToken();

});

test("Network request call intercept ", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem("token", value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})