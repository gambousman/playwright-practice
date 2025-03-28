import { Page } from 'playwright';

export class Products{
    constructor(page){
        this.page = page
        this.cart =page.locator('.shopping_cart_link');
        this.checkout =page.locator('#checkout');
        this.firstname =page.locator('#first-name');
        this.lastname =page.locator('#last-name');
        this.postalCode =page.locator('#postal-code');
        this.continueBtn =page.locator('#continue');
        this.finishBtn =page.locator('#finish');
    }

    async productOrderSteps(firstname, lastname, postalCode){
        await this.cart.click()
        await this.checkout.click()
        await this.firstname.fill(firstname)
        await this.lastname.fill(lastname)
        await this.postalCode.fill(postalCode)
        await this.continueBtn.click()
        await this.finishBtn.click()
    }
}