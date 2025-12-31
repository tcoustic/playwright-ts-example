import { test } from '@playwright/test';
import {RegisterPage} from "../pages/register.po";
import {LoginPage} from "../pages/login.po";
import MainPage from "../pages/main.po";

test.describe('Register page', () => {
    test.skip();

    test.beforeEach(async ({page}) => {
        let registerPage = new RegisterPage(page);
        await registerPage.navigateTo();
    })

    test('should allow user to register',  async ({page}) => {
        let registerPage = new RegisterPage(page);
        let registeredUser = await registerPage.registerWithCorrectCredentials();
        await registerPage.verifyRegistrationSuccess();
        let loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.loginWithRegisteredUser(registeredUser);
        let mainPage = new MainPage(page);
        await mainPage.verifyIfOnPage();
    })

    test('should show error if password is too short and not register the user', async ({page}) => {
        let registerPage = new RegisterPage(page);
        let registeredUser = await registerPage.registerWithIncorrectCredentials();
        await registerPage.verifyErrorMessageIsDisplayed();
        let loginPage = new LoginPage(page);
        await loginPage.navigateTo();
        await loginPage.loginWithRegisteredUser(registeredUser);
        await loginPage.verifyErrorMessageIsDisplayed();

    })
})