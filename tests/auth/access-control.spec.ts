import { expect, test } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Access Control', () => {
  test('redirects unauthenticated user to login page', async ({ page }) => {
    await page.goto('http://103.139.192.123:9070/merchant/list');

    await expect(page).toHaveURL(/\/login$/);
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
  });
});
