class apiutils{

    constructor(apiContext,loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const rsp_login = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: this.loginPayload});
        const rsp_login_json = await rsp_login.json();
        return rsp_login_json.token;      
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();

        const rsp_order = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    "Authorization": response.token,
                    "Content-Type":"application/json"
                }
            });
            const rsp_order_json = await rsp_order.json();
            console.log(rsp_order_json);
            
            response.orderId = rsp_order_json.orders[0];;
            return response;
            
    }
}

module.exports = {apiutils};