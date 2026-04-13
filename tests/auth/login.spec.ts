import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('User can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Gunakan IP asli untuk ngetes lokal
  const baseUrl = 'http://103.139.192.123:9070'; 

  // Memanggil fungsi goto yang sudah kita buat di atas
  await loginPage.goto(baseUrl); 
  await loginPage.login('admindini@yopmail.com', 'DiniIntern2026!');

  // Pastikan login berhasil (tombol sign in hilang)
  await expect(loginPage.signInButton).toBeHidden();
});