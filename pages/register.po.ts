import { expect, Page } from '@playwright/test';
import {User} from "../models/user";

// Saucelabs does not seem to have register functionality, so this is an estimation how the page object might look like.
export class RegisterPage {
    constructor(private readonly page: Page) {}

    private get userNameInput() { return this.page.locator('#user-name'); }
    private get passwordInput() { return this.page.locator('#password'); }
    private get confirmPasswordInput() { return this.page.locator('#confirm-password'); }
    private get registerButton() { return this.page.locator('#register-button'); }
    private get confirmationMessage() { return this.page.locator('data-test=confirmation'); }
    private get errorMessage() { return this.page.locator('data-test=error'); }


    async navigateTo() {
        await this.page.goto('/register.html');
    }

    private async register(user: User) {
        await this.userNameInput.fill(user.username);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
        await this.registerButton.click();
    }

    async registerWithCorrectCredentials(): Promise<User> {
        await this.navigateTo()
        let registeringUser: User = {username: `user_${Date.now()}`, password: 'secret_sauce'};
        await this.register(registeringUser);
        return registeringUser;
    }

    async registerWithIncorrectCredentials(): Promise<User> {
        await this.navigateTo()
        let registeringUser: User = {username: `user_${Date.now()}`, password: 'sauce'};
        await this.register(registeringUser);
        return registeringUser;
    }

    async verifyRegistrationSuccess() {
        await expect(this.confirmationMessage).toHaveText('Registration successful');
    }

    async verifyErrorMessageIsDisplayed() {
        await expect(this.errorMessage).toHaveText('Epic sadface: There were some issues with your registration');
    }
}