import { test, expect } from '@playwright/test';
import { MerchantListPage } from '../../pages/merchant-list.page';
import { LoginPage } from '../../pages/login.page';

test.describe('Merchant List', () => {
  let merchantListPage: MerchantListPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    merchantListPage = new MerchantListPage(page);

    // DATA DISAMARKAN UNTUK GITHUB (Localhost & Akun Dummy)
    const secureUrl = 'http://localhost:9070/login'; 
    const secureEmail = 'admin@example.com';
    const securePassword = 'password123';

    await page.goto(secureUrl);
    await loginPage.login(secureEmail, securePassword);
    
    // Tunggu sampai tombol Sign In hilang (berhasil masuk)
    await expect(loginPage.signInButton).toBeHidden({ timeout: 15000 });

    await page.goto('http://localhost:9070/merchant/list');
    await merchantListPage.waitForLoaded();
  });

  test('searches merchant by merchant name', async () => {
    const name = 'FS Regenera'; // Data ini aman ditampilkan
    await merchantListPage.search(name);
    await merchantListPage.expectResultsContain(name);
  });

  test('searches merchant by merchant code', async () => {
    const code = 'MRCHN-001';
    await merchantListPage.search(code);
    await merchantListPage.expectResultsContain(code);
  });
});