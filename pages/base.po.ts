import { expect, Page } from '@playwright/test';
import {LoginPage} from "./login.po";

export abstract class BasePage {
    protected get pageTitle() { return this.page.locator('data-test=title'); }
    protected get burgerMenu() { return this.page.locator('#react-burger-menu-btn'); }
    protected get cartCountBadge() { return this.page.locator('data-test=shopping-cart-badge'); }
    protected get sidebarLogout() { return this.page.locator('#logout_sidebar_link'); }
    protected expectedPageTitle: string;
    protected url: string;

    protected constructor(protected readonly page: Page) {}

    async navigateTo() {
        await this.page.goto(this.url);
        await this.verifyIfOnPage();
    }

    async verifyIfOnPage() {
        await expect(this.pageTitle).toHaveText(this.expectedPageTitle);
    }

    async verifyCartBadgeCount(count: number) {
        if (count === 0) {
            await expect(this.cartCountBadge).not.toBeVisible();
            return;
        }
        await expect(this.cartCountBadge).toHaveText(count.toString());
    }

    async logout() {
        await this.burgerMenu.click();
        await this.sidebarLogout.click();
        return new LoginPage(this.page);
    }
}