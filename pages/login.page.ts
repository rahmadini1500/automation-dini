import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Menggunakan regex agar lebih fleksibel mencari teks
    this.emailInput = page.getByPlaceholder(/email address/i);
    this.passwordInput = page.getByPlaceholder(/password/i);
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  /**
   * Fungsi untuk pergi ke halaman login.
   * @param baseUrl - Alamat website (IP Kantor atau Localhost)
   */
  async goto(baseUrl: string) {
    // Menambahkan /login secara otomatis ke baseUrl
    await this.page.goto(`${baseUrl}/login`, { waitUntil: 'load' });
  }

  async login(email: string, password: string) {
    // 1. Tunggu kotak email muncul (biar tidak timeout)
    await this.emailInput.waitFor({ state: 'visible', timeout: 15000 });
    
    // 2. Isi data login
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    
    // 3. Klik tombol Sign In
    await this.signInButton.click();
    
    // 4. Tunggu loading sebentar setelah klik
    await this.page.waitForLoadState('load');
  }
}