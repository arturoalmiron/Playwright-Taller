import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('div').filter({ hasText: 'Elements' }).nth(5).click();
  await page.getByRole('listitem').filter({ hasText: 'Text Box' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Arturo');
  await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('arturo@hotmail.com');
  await page.getByRole('textbox', { name: 'name@example.com' }).press('Tab');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('123');
  await page.getByRole('textbox', { name: 'Current Address' }).press('Tab');
  await page.locator('#permanentAddress').fill('123');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Name:Arturo')).toBeVisible();
  await expect(page.getByText('Email:arturo@hotmail.com')).toBeVisible();
  await expect(page.getByText('Current Address :')).toBeVisible();
  await expect(page.getByText('Permananet Address :')).toBeVisible();
  await expect(page.locator('#userForm')).toMatchAriaSnapshot(`
    - text: Full Name
    - textbox "Full Name"
    - text: Email
    - textbox "name@example.com": arturo@hotmail.com
    - text: Current Address
    - textbox "Current Address"
    - text: Permanent Address
    - textbox: /\\d+/
    - button "Submit"
    - paragraph: Name:Arturo
    - paragraph: Email:arturo@hotmail.com
    - paragraph: /Current Address :\\d+/
    - paragraph: /Permananet Address :\\d+/
    `);
});