import { test, expect } from '@playwright/test'
import {Login} from '../page-objects/login'
import {data} from '../data/data.json'

test.describe('Login Module', () => {
    let login
    test.beforeEach(async({page}) => {
        login = new Login(page)
        await page.goto('https://www.saucedemo.com/')
    })
    test('Login with valid credentials', async ({page}) => {
        await login.loginSteps(data.validCredentials.username, data.validCredentials.password)
        await expect(page.locator('[class="title"]', "Products")).toBeVisible() 
    })

    test('Login as a locked out user', async ({page}) => {
        await login.loginSteps(data.blockedUser.username, data.blockedUser.password)
        const errorMsg = await page.getByText('Epic sadface: Sorry, this user has been locked out.').isVisible()
        expect(errorMsg).toBeTruthy()
        
    })

    test('Login as a problem user', async ({page}) => {
        await login.loginSteps(data.problemUser.username, data.problemUser.password)
        await expect(page.locator('[class="title"]', "Products")).toBeVisible() 
        
    })

    test('Login as a performance glitch user', async ({page}) => {
        await login.loginSteps(data.performanceGlitchUser.username, data.performanceGlitchUser.password)
        await expect(page.locator('[class="title"]', "Products")).toBeVisible() 
        
    })

    test('Login as an error user', async ({page}) => {
        await login.loginSteps(data.errorUser.username, data.errorUser.password)
        await expect(page.locator('[class="title"]', "Products")).toBeVisible() 
        
    })

    test('Login as a visual user', async ({page}) => {
        await login.loginSteps(data.visualUser.username, data.visualUser.password)
        await expect(page.locator('[class="title"]', "Products")).toBeVisible() 
        
    })
})

test.afterEach(async ({page}) => {
    await page.close()
})
