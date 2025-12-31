import { test } from '@playwright/test';
import { LoginPage } from "../pages/login.po";
import MainPage from "../pages/main.po";

test.describe('Login page', () => {

    test('should allow user with valid credential to log in', async ({ page }) => {
      let loginPage = new LoginPage(page);
      await loginPage.navigateTo();
      await loginPage.loginWithCorrectCredentials()
      let mainPage = new MainPage(page);
      await mainPage.verifyIfOnPage();
    });

    test('should not allow user with invalid credential to log in', async ({ page }) => {
      let loginPage = new LoginPage(page);
      await loginPage.navigateTo();
      await loginPage.loginWithIncorrectCredentials();
      await loginPage.verifyErrorMessageIsDisplayed();
    })

    test.describe('After login', () => {
        test.use({storageState: 'playwright/.auth/user.json'});

        test('should keep user logged in after refreshing the page', async ({page}) => {

            let mainPage = new MainPage(page);
            await mainPage.navigateTo();
            await page.reload();
            await mainPage.verifyIfOnPage();
        })

        test('should allow user to log out', async ({page}) => {

            let mainPage = new MainPage(page);
            await mainPage.navigateTo();
            let loginPage = await mainPage.logout();
            await loginPage.verifyIfOnPage();

        })
    })
});