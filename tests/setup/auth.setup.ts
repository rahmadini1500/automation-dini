import { test as setup } from '@playwright/test';

import { LoginPage } from '../../pages/login.page';
import { getCredentials } from '../../utils/env';

const authFile = 'playwright/.auth/user.json';

setup('authenticate once for authenticated suites', async ({ page }) => {
  const credentials = getCredentials();
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(credentials.email, credentials.password);
  await page.waitForURL('**/home');
  await page.context().storageState({ path: authFile });
});
