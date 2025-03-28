import { test, expect } from '@playwright/test'
import { Login } from '../page-objects/login'
import { data } from '../data/data.json'



test.describe('Login Module', () => {
    let login
    test.beforeEach(async ({ page }) => {
        login = new Login(page)
        await page.goto('https://www.saucedemo.com/')
    })
    test('Login with valid credentials', async ({ page }) => {
        await login.loginSteps(data.validCredentials.username, data.validCredentials.password)
        await expect(page.locator('[class="title"]', "Products")).toBeVisible()


        const product = 'Sauce Labs Backpack'
        const product2 = 'Sauce Labs Bike Light'
        const ProductLists = page.locator('.inventory_item')
        const productCount = await ProductLists.count()
        console.log(productCount)
        for (let i = 0; i < productCount; i++) {
            const productName = await ProductLists.nth(i).locator('.inventory_item_label a').textContent()
            console.log(productName)
            if (productName === product) {
                await ProductLists.nth(i).getByRole('button', { name: 'Add to cart' }).click()
            }

            if (productName === product2) {
                await ProductLists.nth(i).getByRole('button', { name: 'Add to cart' }).click()
                break

            }
        }
        
        await page.locator('.shopping_cart_link').click()
        await expect(page.locator('.cart_item').nth(0)).toContainText(product);
        await expect(page.locator('.cart_item').nth(1)).toContainText(product2);
        await page.locator('#checkout').click()
        await page.locator('#first-name').fill('John')
        await page.locator('#last-name').fill('Doe')
        await page.locator('#postal-code').fill('12345')
        await page.locator('#continue').click()
        await expect(page.locator('.summary_info_label').filter({ hasText: 'Payment Information' })).toContainText('Payment Information')
        await expect(page.locator('.summary_info_label').filter({ hasText: 'Shipping Information' })).toContainText('Shipping Information')

        await page.locator('#finish').click()
        await expect(page.locator('.complete-header')).toContainText('Thank you for your order!')
    })

})

// await page.locator('.shopping_cart_link').click()
//         await expect(page.locator('.cart_item').nth(0)).toContainText(product);
//         await expect(page.locator('.cart_item').nth(1)).toContainText(product2);
//         await page.locator('#checkout').click()
//         await page.locator('#first-name').fill('John')
//         await page.locator('#last-name').fill('Doe')
//         await page.locator('#postal-code').fill('12345')
//         await page.locator('#continue').click()
//         await expect(page.locator('.summary_info_label').filter({ hasText: 'Payment Information' })).toContainText('Payment Information')
//         await expect(page.locator('.summary_info_label').filter({ hasText: 'Shipping Information' })).toContainText('Shipping Information')

//         await page.locator('#finish').click()
//         await expect(page.locator('.complete-header')).toContainText('Thank you for your order!')
//     })