import { test } from '@playwright/test';

import { LoginPage } from '../../pages/login.page';
import { getCredentials } from '../../utils/env';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test('shows error message for invalid password', async ({ page }) => {
    const credentials = getCredentials();
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(credentials.email, credentials.invalidPassword);
    await loginPage.assertLoginError('Email or Password is incorrect');
  });
});
