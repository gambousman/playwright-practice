import { Page } from 'playwright';

export class Login{
    constructor(page){
        this.page = page
        this.username = page.locator('[placeholder="Username"]');
        this.password = page.locator('[placeholder="Password"]');
        this.submit = page.locator('[type="submit"]')
    }

    async loginSteps(username, password){
        await this.username.fill(username)
        await this.password.fill(password)
        await this.submit.click()
    }
}