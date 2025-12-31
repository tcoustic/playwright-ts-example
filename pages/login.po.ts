import { expect, Page } from '@playwright/test';

export class LoginPage {
    constructor(private readonly page: Page) {}

    private get userNameInput() { return this.page.locator('#user-name'); }
    private get passwordInput() { return this.page.locator('#password'); }
    private get loginButton() { return this.page.locator('#login-button'); }
    private get errorMessage() { return this.page.locator('data-test=error'); }

    private correctCredentials = { username: 'standard_user', password: 'secret_sauce' };
    private incorrectCredentials = { username: 'standard_user', password: 'regular_sauce' };



    async navigateTo() {
        await this.page.goto('/');
    }

    private async login(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithCorrectCredentials() {
        await this.navigateTo();
        await this.login(this.correctCredentials.username, this.correctCredentials.password);
    }

    async loginWithIncorrectCredentials() {
        await this.navigateTo();
        await this.login(this.incorrectCredentials.username, this.incorrectCredentials.password);
    }

    async verifyErrorMessageIsDisplayed() {
        await expect(this.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    }

    async verifyIfOnPage() {
        await Promise.all([
            await expect.soft(this.userNameInput).toBeVisible(),
            await expect.soft(this.passwordInput).toBeVisible(),
            await expect.soft(this.loginButton).toBeVisible(),
        ]);
    }

}