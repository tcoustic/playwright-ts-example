import { test as setup } from '@playwright/test';
import {LoginPage} from "../pages/login.po";
// @ts-ignore
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate user', async ({ page }) => {
    let loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    await loginPage.loginWithCorrectCredentials();
    await page.context().storageState({ path: authFile });
})