import { expect, test } from '@playwright/test';

import * as userJson from './mocks/user.json';

test.describe('[User List] Pagination', () => {
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

    test('should show first page', async ({ page }) => {
      await expect(page.locator('mat-paginator')).toHaveText('1 – 25 of 35');
      await expect(page.getByRole('row', { name: 'firstName lastName 25' })).toBeVisible();
    });

    test('should show next page', async ({ page }) => {
      await page.getByLabel('Next Page').click();

      await expect(page.locator('mat-paginator')).toHaveText('26 – 35 of 35');
      await expect(page.getByRole('row', { name: 'firstName lastName 35' })).toBeVisible();
    });
  });

  test.describe('with being on the second page', () => {
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

      await page.getByLabel('Next Page').click();
    });

    test('should show second page', async ({ page }) => {
      await expect(page.locator('mat-paginator')).toHaveText('26 – 35 of 35');
      await expect(page.getByRole('row', { name: 'firstName lastName 35' })).toBeVisible();
    });

    test('should show first page', async ({ page }) => {
      await page.getByLabel('Previous Page').click();

      await expect(page.locator('mat-paginator')).toHaveText('1 – 25 of 35');
      await expect(page.getByRole('row', { name: 'firstName lastName 25' })).toBeVisible();
    });
  });
});
