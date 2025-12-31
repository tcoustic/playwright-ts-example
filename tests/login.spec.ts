import { test } from '@playwright/test';
import {LoginPage} from "../pages/login.po";
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
});