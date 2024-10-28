const { test, expect } = require("@playwright/test");
const {POManager} = require("../PageObjects/POManager")
const testData = require("../resources/testData.json");
const {constant} = require("../resources/constant");

for(const data of testData){
    test(`Add product ${data.productName}  to cart`, async ({ page }) => {
        // parsing json data to Java script object. 
        //First converting JSON to string and then converting JSON string obj to JS obj
        const jsData = JSON.parse(JSON.stringify(testData));
    
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.login(data.email, data.password);
        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAndAddToCart(data.productName);
        await dashboardPage.navigateToCartAndWait();
    
        const cartPage = poManager.getCartPage();
        expect(await cartPage.isProductVisibleInCart(data.productName)).toBeTruthy();
        cartPage.clickCheckOutBtn();
    
        const checkoutPage = poManager.getCheckOutPage();
        await checkoutPage.fillPersonalInfo(data.cvv, data.name);
        await checkoutPage.fillShippingInfo(data.country);
        expect(await checkoutPage.getShippingEmail()).toContain(data.email);
        await checkoutPage.placeOrder();
    
        const thankYouPage = poManager.getThankYouPage();
        expect(await thankYouPage.getThankYouText()).toContain(constant.orderText);
        const orderId = await thankYouPage.getOrderId();
        console.log(orderId);
    
        dashboardPage.navigateToOrderPageAndWait();
        const orderPage = poManager.getOrderPage();
        await orderPage.viewOrder(orderId);
    
        const orderSummaryPage = poManager.getOrderSummaryPage();
        await orderSummaryPage.validateOrderSummary(constant.orderSummaryText, orderId, data.email, data.productName);
    
        // await page.pause();
    
    })
}