const { CartPage } = require("./CartPage");
const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderPage } = require("./OrderPage");
const { OrderSummaryPage } = require("./OrderSummaryPage");
const { ThankyouPage } = require("./ThankyouPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkOutPage = new CheckoutPage(page);
        this.orderPage = new OrderPage(page);
        this.orderSummaryPage = new OrderSummaryPage(page);
        this.thankYouPage = new ThankyouPage(page);
    }

    

    getLoginPage() {
        return this.loginPage;
    }


    getDashboardPage() {
        return this.dashBoardPage;
    }


    getCartPage() {
        return this.cartPage;
    }


    getOrderPage() {
        return this.orderPage;
    }


    getOrderSummaryPage() {
        return this.orderSummaryPage;
    }


    getCheckOutPage() {
        return this.checkOutPage;
    }


    getThankYouPage() {
        return this.thankYouPage;
    }


}

module.exports = {POManager}