class ThankyouPage {
    constructor(page) {
        this.page = page;
        this.thankYouMsg = page.locator("h1.hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async getThankYouText(){
        const thankYouText = await this.thankYouMsg.textContent();
        return thankYouText;
    }

    async getOrderId(){
        const orderId = await this.orderId.textContent();
        return orderId;
    }



}

module.exports = {ThankyouPage}