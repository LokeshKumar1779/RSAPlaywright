class LoginPage {
    constructor(page) {
        this.page = page;
        this.userEmail = page.locator('#userEmail');
        this.pwd = page.locator('#userPassword');
        this.loginBtn = page.locator('#login');
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    async login(userEmail, pwd){
        await this.userEmail.fill(userEmail);
        await this.pwd.fill(pwd);
        await this.loginBtn.click();
        await this.page.waitForLoadState("networkidle");
    }

}

module.exports= {LoginPage};