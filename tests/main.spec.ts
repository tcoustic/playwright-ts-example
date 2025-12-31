import { test } from '@playwright/test';
import MainPage from "../pages/main.po";

test.describe('Main page', () => {
    test.use({ storageState: 'playwright/.auth/user.json' });

    test.beforeEach(async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.navigateTo();
    })

    test('should show items on the page', async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.verifyProductsAreDisplayed();
        await mainPage.verifyCartBadgeCount(0);
    })

    test('should allow user to add items to cart', async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.addToCart('Sauce Labs Backpack');
        await mainPage.verifyCartBadgeCount(1);
    })

    test('should not allow user to add multiples of the same item', async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.addToCart('Sauce Labs Backpack');
        await mainPage.verifyCartBadgeCount(1);
        await mainPage.verifyIfAddToCartButtonIsNotDisplayed('Sauce Labs Backpack');
    })

    test ('should allow user to remove items from cart', async ({ page }) => {
        let mainPage = new MainPage(page);
        await mainPage.addToCart('Sauce Labs Backpack');
        await mainPage.verifyCartBadgeCount(1);
        await mainPage.removeFromCart('Sauce Labs Backpack');
        await mainPage.verifyCartBadgeCount(0);
        await mainPage.verifyIfRemoveButtonIsNotDisplayed('Sauce Labs Backpack');
    })

    test('should allow user to go to cart', async ({ page }) => {
        let mainPage = new MainPage(page);
        let cartPage = await mainPage.goToCart();
        await cartPage.verifyIfOnPage();
    })
})