import { expect, type Locator, type Page } from '@playwright/test';
import { getBaseUrl } from '../utils/env';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('Enter your email address');
    this.passwordInput = page.getByPlaceholder('Enter your password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto() {
    const baseUrl = getBaseUrl(); // Mengambil alamat IP cadangan jika .env kosong
    await this.page.goto(`${baseUrl}/login`); // Hasilnya: http://103.139.192.123:9070/login
    await expect(this.signInButton).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async assertLoginError(message: string) {
    await expect(this.page.getByText(message, { exact: true })).toBeVisible();
  }
}