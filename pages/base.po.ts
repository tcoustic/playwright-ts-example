import { expect, Locator, Page } from '@playwright/test';

export abstract class BasePage {
    protected get pageTitle() { return this.page.locator('data-test=title'); }
    protected get cartCountBadge() { return this.page.locator('data-test=shopping-cart-badge'); }
    protected expectedPageTitle: string;
    protected url: string;

    protected constructor(protected readonly page: Page) {}

    async navigateTo() {
        await this.page.goto(this.url);
    }

    async verifyIfOnPage() {
        await expect(this.pageTitle).toHaveText(this.expectedPageTitle);
    }

    async verifyCartCount(count: number) {
        if (count === 0) {
            await expect(this.cartCountBadge).not.toBeVisible();
            return;
        }
        await expect(this.cartCountBadge).toHaveText(count.toString());
    }
}