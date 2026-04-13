import * as dotenv from 'dotenv';
import path from 'path';

// Mencoba mencari file .env di folder utama proyek
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const getCredentials = () => {
  return {
    // Jika .env gagal dibaca, dia akan pakai email/pass di bawah ini secara otomatis
    email: process.env.LOGIN_EMAIL || 'admindini@yopmail.com', 
    password: process.env.LOGIN_PASSWORD || 'DiniIntern2026!',
    invalidPassword: process.env.INVALID_LOGIN_PASSWORD || 'Wrongpass1!',
  } as const;
};

export const getBaseUrl = () => {
  // PAKSA alamat IP di sini supaya tidak ada lagi error "Invalid URL"
  return process.env.BASE_URL || 'http://103.139.192.123:9070';
};