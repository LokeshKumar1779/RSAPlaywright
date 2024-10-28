const { ThankyouPage } = require("./ThankyouPage");

class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.cvvCodeField = page.locator("input[class='input txt']").first();
        this.nameOnCardField = page.locator("input[class='input txt']").last();
        this.countrySelector = page.locator("[placeholder*='Country']");
        this.countryResults = page.locator(".ta-results");
        this.shippingEmail = page.locator("div[class*='user__name'] label");
        this.placeOrderBtn = page.locator(".action__submit");
    }

    async fillPersonalInfo(cvvCode, name) {
        await this.cvvCodeField.fill(cvvCode);
        await this.nameOnCardField.fill(name);
    }

    async fillShippingInfo(countryName) {
        await this.countrySelector.pressSequentially(countryName);
        await this.countryResults.waitFor();
        const resultscount = await this.countryResults.locator("button").count();
        for (let i = 0; i < resultscount; i++) {
            const country = await this.countryResults.locator("button").nth(i).textContent();
            if (country.trim() === "India") {
                await this.countryResults.locator("button").nth(i).click();
                break;
            }

        }
    }

    async getShippingEmail(){
        const actualShippingEmail = await this.shippingEmail.textContent();
        return actualShippingEmail;
    }

    async placeOrder(){
        await this.placeOrderBtn.click()
    }
}

module.exports= {CheckoutPage};