import { expect, test } from '@playwright/test';

import * as userJson from './mocks/user.json';

test.describe('[User List] Filter', () => {
  test.describe('with being on the first page', () => {
    test.beforeEach(async ({ page }) => {
      await page.route('*/**/users', async route => {
        await route.fulfill({
          json: Array.from({ length: 35 }, (_, i) => ({
            ...userJson,
            id: 1 + i,
            lastName: `${userJson.lastName} ${1 + i}`
          })),
        });
      });

      await page.goto('/');
      await page.waitForURL('/');
    });

    test('should filter list', async ({ page }) => {
      await page.getByLabel('Filter').fill('lastName 10');

      await expect(page.locator('mat-paginator')).toHaveText('1 – 1 of 1');
      await expect(page.getByRole('row', { name: 'firstName lastName 10' })).toBeVisible();
    });
  });
});
