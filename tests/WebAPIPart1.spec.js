const {test,expect,request} = require("@playwright/test");
const exp = require("constants");

const loginPayload = {userEmail:"kumarlokesh57@gmail.com",userPassword:"Samsung@135"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6581ca399fd99c85e8ee7f45"}]};

let Token,order_id;
test.beforeAll(async ()=>{
    // Login API
    const apiContext = await request.newContext();
    const rsp_login = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: loginPayload});
    expect(rsp_login.ok()).toBeTruthy();
    const rsp_login_json = await rsp_login.json();
    Token = rsp_login_json.token;
    console.log("Token : " +Token);

    // Order API
    const rsp_order = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: orderPayload,
        headers: {
            "Authorization": Token,
            "Content-Type":"application/json"
        }
    });
    expect(rsp_order.ok()).toBeTruthy();
    const rsp_order_json = await rsp_order.json()
    console.log(rsp_order_json);
    
    order_id = await rsp_order_json.orders[0];
    console.log("Order Id : " +order_id);

});

test("@API Login test", async ({page})=>{

    page.addInitScript( value => {
        window.localStorage.setItem("token",value);
    },Token);


    await page.goto("https://rahulshettyacademy.com/client/");

    
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); i++) {
        const orderId = await rows.nth(i).locator("th").textContent();

        if (order_id === orderId) {
            await rows.nth(i).locator(".btn.btn-primary").click();
            break;
        }
        
    }
    await page.locator("div.email-title").waitFor();
    await expect(page.locator("p.tagline")).toHaveText("Thank you for Shopping With Us");
    await expect(page.locator("div.col-text.-main")).toHaveText(order_id);
    await expect(page.locator(".address p").first()).toHaveText("kumarlokesh57@gmail.com");
    await expect(page.locator("div.title")).toHaveText("ZARA COAT 3");
})

test("Some more test",async ({page}) =>{
    await page.goto("https://www.google.com");
    expect(await page.title(), "Google").toBeTruthy();
    console.log();
    
})