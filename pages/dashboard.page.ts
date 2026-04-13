import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly merchantMenuButton: Locator;
  readonly merchantListLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.merchantMenuButton = page.getByRole('button', { name: 'Merchant' });
    this.merchantListLink = page.getByRole('link', { name: 'Merchant List' });
  }

  async openMerchantList() {
    await expect(this.page).toHaveURL(/\/home$/);

    if (!(await this.merchantListLink.isVisible())) {
      await this.merchantMenuButton.click();
    }

    await this.merchantListLink.click();
    await this.page.waitForURL('**/merchant/list');
  }
}
