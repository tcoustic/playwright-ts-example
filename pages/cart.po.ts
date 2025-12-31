import { expect, Page } from '@playwright/test';
import {BasePage} from "./base.po";

export class CartPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.expectedPageTitle = 'Your Cart';
        this.url = '/cart.html';
    }

    private get cartItems() { return this.page.locator('data-test=inventory-item'); }

    async verifyCartIsEmpty() {}

    async verifyCartContains(itemName: string) {
        await expect(this.cartItems.filter({hasText: itemName})).toHaveCount(1);
    }

    async removeItemFromCart(itemName: string) {
        const item = this.cartItems.filter({hasText: itemName});
        await item.first().getByRole('button').click();
    }

    async verifyCartCount(count: number) {
        await expect(this.cartItems).toHaveCount(count);
    }
}