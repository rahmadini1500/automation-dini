import { test, expect } from '@playwright/test';
import { MerchantListPage } from '../../pages/merchant-list.page';
import { LoginPage } from '../../pages/login.page';

test.describe('Merchant List', () => {
  let merchantListPage: MerchantListPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    merchantListPage = new MerchantListPage(page);

    // --- STRATEGI KEAMANAN ---
    // Gunakan IP asli untuk running di laptop
    const baseUrl = 'http://103.139.192.123:9070'; 
    // const baseUrl = 'http://localhost:9070'; // Aktifkan ini hanya saat push ke GitHub

    // Tambahkan timeout manual di goto agar tidak langsung crash
    await page.goto(`${baseUrl}/login`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Pastikan halaman benar-benar sudah menampilkan form login sebelum mengetik
    await loginPage.login('admindini@yopmail.com', 'DiniIntern2026!');
    
    // Tunggu proses login selesai dengan sabar
    await expect(loginPage.signInButton).toBeHidden({ timeout: 20000 });
    
    await page.goto(`${baseUrl}/merchant/list`, { waitUntil: 'networkidle' });
    await merchantListPage.waitForLoaded();
  });

  test('searches merchant by merchant name', async () => {
    const name = 'FS Regenera'; // Pastikan sesuai data di tabel
    await merchantListPage.search(name);
    await merchantListPage.expectResultsContain(name);
  });

  test('searches merchant by merchant code', async () => {
    const code = 'MRCHN-001'; // Kode ini valid di screenshot kamu
    await merchantListPage.search(code);
    await merchantListPage.expectResultsContain(code);
  });
});