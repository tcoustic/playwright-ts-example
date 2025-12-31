import { test } from '@playwright/test';
import MainPage from "../pages/main.po";
import {CartPage} from "../pages/cart.po";

test.describe('Nonempty cart page', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test.beforeEach(async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.navigateTo();
        await mainPage.addToCart('Sauce Labs Backpack');
        await mainPage.verifyCartBadgeCount(1);
        let cartPage = new CartPage(page);
        await cartPage.navigateTo();
    })

    test('should display correct items in cart', async ({ page }) => {
        let cartPage = new CartPage(page);
        await cartPage.verifyCartCount(1);
        await cartPage.verifyCartContains('Sauce Labs Backpack');
    })

    test('should allow to remove items from cart', async ({ page }) => {
        let cartPage = new CartPage(page);
        await cartPage.verifyCartContains('Sauce Labs Backpack');
        await cartPage.removeItemFromCart('Sauce Labs Backpack');
        await cartPage.verifyCartIsEmpty();
    })
})

test.describe('Empty cart page', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test.beforeEach(async ({ page }) => {
        let cartPage = new CartPage(page);
        await cartPage.navigateTo();
    })

    test('should be empty', async ({ page }) => {
        let cartPage = new CartPage(page);
        await cartPage.verifyCartIsEmpty();
    })
})