import { expect, Page } from '@playwright/test';
import {CartPage} from "./cart.po";
import {BasePage} from "./base.po";

class MainPage extends BasePage {
    constructor(protected readonly page: Page) {
        super(page);
        this.expectedPageTitle = 'Products';
        this.url = '/inventory.html';
    }

    private get products() { return this.page.locator('data-test=inventory-item'); }
    private get cartButton() { return this.page.locator('data-test=shopping-cart-link'); }

    private addToCartButtonText = 'Add to cart';
    private removeFromCartButtonText = 'Remove';

    async verifyIfAddToCartButtonIsNotDisplayed(itemName: string) {
        const item = this.products.filter({hasText: itemName});
        await expect(item.getByRole('button',{ name: this.addToCartButtonText })).not.toBeVisible();
    }

    async addToCart(itemName: string) {
        const item = this.products.filter({hasText: itemName});
        await item.getByRole('button',{ name: this.addToCartButtonText }).click()
    }

    async verifyIfRemoveButtonIsNotDisplayed(itemName: string) {
        const item = this.products.filter({hasText: itemName});
        await expect(item.getByRole('button',{ name: this.removeFromCartButtonText })).not.toBeVisible();
    }

    async removeFromCart(itemName: string) {
        const item = this.products.filter({hasText: itemName});
        await item.getByRole('button',{ name: this.removeFromCartButtonText }).click()
    }

    async goToCart() {
        await this.cartButton.click();
        return new CartPage(this.page);
    }

    async verifyProductsAreDisplayed() {
        await expect(this.products).toHaveCount(6);
    }
}

export default MainPage