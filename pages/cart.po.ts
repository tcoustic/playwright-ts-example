import {expect, Page} from '@playwright/test';
import {BasePage} from "./base.po";

export class CartPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.expectedPageTitle = 'Your Cart';
        this.url = '/cart.html';
    }

    async navigateTo() {
        await this.page.goto('/cart.html');
    }
}