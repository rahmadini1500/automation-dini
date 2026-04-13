import { expect, type Locator, type Page } from '@playwright/test';
import { getBaseUrl } from '../utils/env';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder(/email address/i);
    this.passwordInput = page.getByPlaceholder(/password/i);
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async login(email: string, password: string) {
    // Tunggu sebentar untuk cek apakah kita memang di halaman login
    try {
      await this.emailInput.waitFor({ state: 'visible', timeout: 5000 });
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.signInButton.click();
    } catch (e) {
      // Jika tidak ketemu, berarti mungkin sudah login atau langsung ke dashboard
      console.log('Halaman login tidak muncul atau sudah login, skip pengisian form.');
    }
  }
}