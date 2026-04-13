import { test, expect } from '@playwright/test';
import { MerchantListPage } from '../../pages/merchant-list.page';
import { LoginPage } from '../../pages/login.page';

test.describe('Merchant List', () => {
  let merchantListPage: MerchantListPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    merchantListPage = new MerchantListPage(page);

    // --- BAGIAN PENTING UNTUK KEAMANAN ---
    
    // 1. Saat ngetes di laptop (agar tidak error), menggunakan IP ini:
    const baseUrl = 'http://103.139.192.123:9070'; 
    
    // 2. Nanti ketika di-push ke GitHub, ganti jadi localhost:
    // const baseUrl = 'http://localhost:9070'; 

    await page.goto(`${baseUrl}/login`);
    
    // Gunakan akun dummy untuk GitHub, tapi pakai akun asli saat lokal
    await loginPage.login('admindini@yopmail.com', 'DiniIntern2026!');
    
    await expect(loginPage.signInButton).toBeHidden({ timeout: 15000 });
    await page.goto(`${baseUrl}/merchant/list`);
    await merchantListPage.waitForLoaded();
  });

  test('searches merchant by merchant name', async () => {
    const name = 'FS Regenera'; 
    await merchantListPage.search(name);
    await merchantListPage.expectResultsContain(name);
  });

  test('searches merchant by merchant code', async () => {
    const code = 'MRCHN-001';
    await merchantListPage.search(code);
    await merchantListPage.expectResultsContain(code);
  });
});