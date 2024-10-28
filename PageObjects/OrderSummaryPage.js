const {expect} = require("@playwright/test");

class OrderSummaryPage {
    constructor(page) {
        this.page = page;
        this.orderSummary = page.locator("div.email-title")
        this.thankuText = page.locator("p.tagline");
        this.orderId = page.locator("div.col-text.-main");
        this.email = page.locator(".address p");
        this.productTitle = page.locator("div.title");

    }

    async validateOrderSummary(text , orderId , email , productTitle){
        await this.orderSummary.waitFor();
        await expect(this.thankuText).toHaveText(text);
        await expect(this.orderId).toHaveText(orderId.replaceAll("|","").trim());
        await expect(this.email.first()).toHaveText(email);
        await expect(this.productTitle).toHaveText(productTitle);
    }
}

module.exports = {OrderSummaryPage}