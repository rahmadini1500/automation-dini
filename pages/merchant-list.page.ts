
import { expect, type Locator, type Page } from '@playwright/test';

export class MerchantListPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    // Mencari heading dan input search
    this.heading = page.getByText('Merchant List', { exact: true }).first();
    this.searchInput = page.locator('input[placeholder="Search"]').first();
  }

  async waitForLoaded() {
    await expect(this.heading).toBeVisible({ timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  async search(keyword: string) {
    await this.searchInput.clear();
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
    // Jeda agar sistem selesai memfilter
    await this.page.waitForTimeout(2000); 
  }

  async expectResultsContain(keyword: string) {
    // Menunggu tabel mengandung kata kunci
    try {
      await expect(this.page.locator('tbody')).toContainText(keyword, { timeout: 10000 });
    } catch (e) {
      throw new Error(`Dini, data "${keyword}" tidak muncul di tabel!`);
    }
  }
}

