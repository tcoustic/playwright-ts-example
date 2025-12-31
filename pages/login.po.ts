import { expect, Page } from '@playwright/test';
import {CORRECT_USER, INCORRECT_USER, User} from "../models/user";

export class LoginPage {
    constructor(private readonly page: Page) {}

    private get userNameInput() { return this.page.locator('#user-name'); }
    private get passwordInput() { return this.page.locator('#password'); }
    private get loginButton() { return this.page.locator('#login-button'); }
    private get errorMessage() { return this.page.locator('data-test=error'); }

    async navigateTo() {
        await this.page.goto('/');
    }

    private async login(user: User) {
        await this.userNameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }

    async loginWithCorrectCredentials() {
        await this.login(CORRECT_USER);
    }

    async loginWithIncorrectCredentials() {
        await this.login(INCORRECT_USER);
    }

    async loginWithRegisteredUser(user: User){
        await this.login(user);
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