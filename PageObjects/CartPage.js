class CartPage {
    constructor(page) {
        this.page = page;
        this.checkOutBtn = page.locator("button[type='button']").last();
    }

    async isProductVisibleInCart(productName){
        const flag = await this.page.locator("h3:has-text("+"'"+productName+"'"+")").isVisible();
        return flag;
    }

    async clickCheckOutBtn(){
        await this.checkOutBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

}

module.exports = {CartPage}