import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: 'Elements' }).nth(5).click();
  await page.getByRole('listitem').filter({ hasText: 'Text Box' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Arturo');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('arturo@hotmail.com');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('123');
  await page.locator('#permanentAddress').fill('123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Name:Arturo')).toBeVisible();
  await expect(page.getByText('Email:arturo@hotmail.com')).toBeVisible();
  await expect(page.getByText('Current Address :')).toBeVisible();
  await expect(page.getByText('Permananet Address :')).toBeVisible();
  await expect(page.locator('#userForm')).toMatchAriaSnapshot(`
    - paragraph: Name:Arturo
    - paragraph: Email:arturo@hotmail.com
    - paragraph: /Current Address :\\d+/
    - paragraph: /Permananet Address :\\d+/
    `);
});