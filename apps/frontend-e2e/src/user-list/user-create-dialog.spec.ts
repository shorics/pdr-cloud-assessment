import { expect, test } from '@playwright/test';

import * as userJson from './mocks/user.json';

test.describe('[User List] User Create Dialog', () => {
  test.describe('with being on the first page', () => {
    test.beforeEach(async ({ page }) => {
      await page.route('*/**/users', async route => {
        await route.fulfill({
          json: [],
        });
      });

      await page.goto('/');
      await page.waitForURL('/');
    });

    test('should open dialog', async ({ page }) => {

      await page.getByRole('button', { name: 'Create User' }).click();

      await expect(page.getByRole('dialog', { name: 'Create User' })).toBeVisible();
    });

    test.describe('with dialog open', () => {
      test.beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Create User' }).click();
      });

      test('should close dialog', async ({ page }) => {
        await page.getByRole('button', { name: 'Cancel' }).click();

        await expect(page.getByRole('dialog', { name: 'Create User' })).toBeHidden();
      });

      test('should render form', async ({ page }) => {
        await expect(page.getByLabel('First Name')).toBeVisible();
        await expect(page.getByLabel('Last Name')).toBeVisible();
        await expect(page.getByLabel('Email')).toBeVisible();
        await expect(page.getByLabel('Phone Number')).toBeVisible();
        await expect(page.getByLabel('Date of Birth')).toBeVisible();
        await expect(page.getByLabel('Role')).toBeVisible();
      });

      test('should save user', async ({ page }) => {
        await page.route('*/**/users', async route => {
          const method = await route.request().method();

          if ('POST' === method) {
            await route.fulfill({
              json: { ...userJson },
            });
            return;
          }

          await route.fulfill({
            json: [ { ...userJson } ],
          });
        });

        await page.getByLabel('First Name').fill('firstName');
        await page.getByLabel('Last Name').fill('lastName');
        await page.getByLabel('Email').fill('test@test.com');
        await page.getByLabel('Phone Number').fill('123');
        await page.getByLabel('Date of Birth').fill('1970-01-01');
        await page.getByLabel('Role').click();
        await page.getByLabel('Role').locator('mat-option:has-text("viewer")').click();

        await page.getByRole('button', { name: 'Save' }).click();

        await expect(page.getByRole('dialog', { name: 'Create User' })).toBeHidden();
        await expect(page.getByRole('row', { name: 'firstName lastName' })).toBeVisible();

        await expect(page.getByText('Saved')).toBeVisible();
      });
    });
  });
});
