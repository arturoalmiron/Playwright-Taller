import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// User data structure
interface UserData {
  name: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

test.describe('DemoQA Text Box Form Tests', () => {
  let userData: UserData;

  test.beforeAll(() => {
    // Read user data from JSON file
    const dataPath = path.join(__dirname, 'userData.json');
    const fileContent = fs.readFileSync(dataPath, 'utf-8');
    userData = JSON.parse(fileContent);
  });

  test('should fill form and verify submitted data', async ({ page }) => {
    // Navigate to the text box page
    await page.goto('https://demoqa.com/text-box');

    // Fill in the form fields
    await page.locator('#userName').fill(userData.name);
    await page.locator('#userEmail').fill(userData.email);
    await page.locator('#currentAddress').fill(userData.currentAddress);
    await page.locator('#permanentAddress').fill(userData.permanentAddress);

    // Submit the form (look for submit button)
    await page.locator('button[id="submit"]').click();

    // Wait for output to be visible
    await page.locator('#output').waitFor({ state: 'visible' });

    // Verify the displayed data matches input
    const nameText = await page.locator('#name').textContent();
    const emailText = await page.locator('#email').textContent();
    const currentAddressText = await page.locator('#currentAddress.mb-1').textContent();
    const permanentAddressText = await page.locator('#permanentAddress.mb-1').textContent();

    // Extract values after the colon and verify
    expect(nameText?.split(':')[1]).toBe(userData.name);
    expect(emailText?.split(':')[1]).toBe(userData.email);
    expect(currentAddressText?.split(':')[1]?.trim()).toBe(userData.currentAddress);
    expect(permanentAddressText?.split(':')[1]?.trim()).toBe(userData.permanentAddress);
  });
});