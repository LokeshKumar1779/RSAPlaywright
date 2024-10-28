const {test,expect} = require("@playwright/test")

let webBrowser;
test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill("kumarlokesh57@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Samsung@135");
    await page.getByRole("button",{name:"Login"}).click();
    await page.waitForLoadState("networkidle");
    await context.storageState({path : 'state.json'});
    webBrowser = await browser.newContext({storageState:'state.json'});

})

test("WebAPI Part 3",async ()=>
    {

    const productName = "ZARA COAT 3";
    const page = await webBrowser.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

    await page.locator("li.items").waitFor();
    await expect(page.getByRole("heading",{name:productName})).toBeVisible();
    // await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    // await expect(page.locator("h3").filter({hasText:productName})).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();
    await page.waitForLoadState('networkidle');
    await page.getByRole('textbox').nth(1).fill("123");
    await page.getByRole('textbox').nth(2).fill("Test");
    await page.getByPlaceholder('Select Country').pressSequentially('ind');
    await page.getByRole("button",{name:"India"}).nth(1).click();
    

    await expect(page.getByText("kumarlokesh57@gmail.com")).toBeVisible();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    const formattedOrderId = orderId.replaceAll("|","").trim();
    console.log(orderId.replaceAll("|","").trim());

    
    await page.getByRole("listitem").filter({hasText:"ORDERS"}).click();
    await page.locator("tbody").waitFor();
    await page.locator(".table tbody tr").filter({hasText:formattedOrderId}).getByRole("button",{name:"View"}).click();
    // await page.waitForLoadState("networkidle");
    await page.getByText(" order summary ").waitFor();
    await expect(page.getByText("Thank you for Shopping With Us")).toBeVisible();
    await expect(page.getByText(formattedOrderId)).toBeVisible();
    await expect(page.getByText("kumarlokesh57@gmail.com").first()).toBeVisible();
    await expect(page.getByText(productName)).toBeVisible();
    
})

test("simple test", async ()=>{
    const page = await webBrowser.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const titles = await page.locator(".card-body b").
    console.log(titles);
    
})