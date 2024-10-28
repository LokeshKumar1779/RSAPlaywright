class DashboardPage {
    constructor(page) {
        this.products = page.locator(".card-body");
        this.cartLink = page.locator("[routerlink*='cart']");
        this.cartItem = page.locator("li.items");
        this.ordersLink = page.locator("button[routerlink*='myorders']");
        this.ordersList = page.locator("tbody");
    }

    async searchProductAndAddToCart(productName) {
        const productLen = await this.products.count();
        for (let i = 0; i < productLen; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text=ADD TO CART").click();
                break;
            }
        }
    }

    async navigateToCartAndWait(){
        await this.cartLink.click();
        await this.cartItem.waitFor();
    }

    async navigateToOrderPageAndWait(){
        await this.ordersLink.click();
        await this.ordersList.waitFor();
    }
}

module.exports = {DashboardPage}