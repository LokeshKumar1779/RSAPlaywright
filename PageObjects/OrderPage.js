class OrderPage {
    constructor(page) {
        this.page = page;

    }

    async viewOrder(orderId){
        const rows = this.page.locator("tbody tr");
        for (let i = 0; i < await rows.count(); i++) {
            const order_id = await rows.nth(i).locator("th").textContent();
    
            if (orderId.replaceAll("|","").trim() === order_id) {
                await rows.nth(i).locator(".btn.btn-primary").click();
                break;
            }
            
        }
    }


}

module.exports = {OrderPage}