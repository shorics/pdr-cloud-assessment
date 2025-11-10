import { expect, test } from '@playwright/test';

import * as userJson from './mocks/user.json';

test.describe('[User List] User Details Dialog', () => {
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

    test('should open dialog', async ({ page }) => {
      await page.route('*/**/users/15', async route => {
        await route.fulfill({
          json: {
            ...userJson,
            id: 15,
            lastName: `${userJson.lastName} 15`
          },
        });
      });

      await page.getByRole('row', { name: 'firstName lastName 15' }).click();

      await expect(page.getByRole('dialog', { name: 'User Details' })).toBeVisible();

      const fullName = page.getByRole('heading', { name: 'Full Name' })
        .locator('//following-sibling::*[1]');
      await expect(fullName).toHaveText('firstName lastName 15');

      const email = page.getByRole('heading', { name: 'Email' })
        .locator('//following-sibling::*[1]');
      await expect(email).toHaveText('test@test.com');

      const phoneNumber = page.getByRole('heading', { name: 'Phone Number' })
        .locator('//following-sibling::*[1]');
      await expect(phoneNumber).toHaveText('123');

      const birthDate = page.getByRole('heading', { name: 'Date of Birth' })
        .locator('//following-sibling::*[1]');
      await expect(birthDate).toHaveText('1970-01-01');

      const role = page.getByRole('heading', { name: 'Role' })
        .locator('//following-sibling::*[1]');
      await expect(role).toHaveText('admin');
    });

    test.describe('with dialog open', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole('row', { name: 'firstName lastName 15' }).click();
      });

      test('should close dialog', async ({ page }) => {
        await page.getByRole('button', { name: 'Close' }).click();

        await expect(page.getByRole('dialog', { name: 'User Details' })).toBeHidden();
      })
    });
  });
});
