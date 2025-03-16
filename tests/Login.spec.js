const { test, expect } = require('@playwright/test');

test('Login test',async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://www.saucedemo.com/')

    //Login
    await page.locator('[placeholder="Username"]').fill('standard_user')           
    await page.locator('[placeholder="Password"]').fill('secret_sauce')             
    await page.locator('[type="submit"]').click()                      
    await expect(page.locator('[class="title"]', "Products")).toBeVisible()  

    //Add Products to carts
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

    //Check the cart was added successfully
    await expect(page.locator("[data-test='shopping-cart-badge']")).toContainText('2') 
    await page.locator('[data-test="shopping-cart-link"]').click()
    await expect(page.locator('[data-test="item-4-title-link"]')).toContainText('Sauce Labs Backpack')  
    await expect(page.locator('[data-test="item-0-title-link"]')).toContainText('Sauce Labs Bike Light') 

})
  

