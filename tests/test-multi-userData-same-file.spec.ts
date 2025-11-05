import { test, expect } from '@playwright/test';

// Test data defined inline
[
  { name: "Arturo", email: "arturoalmiron@hotmail.com", currentAddress: "123", permanentAddress: "123" },
  { name: "John Doe", email: "john.doe@example.com", currentAddress: "456 Main St", permanentAddress: "789 Oak Ave" },
  { name: "Jane Smith", email: "jane.smith@example.com", currentAddress: "321 Elm St", permanentAddress: "654 Pine Rd" }
].forEach(({ name, email, currentAddress, permanentAddress }) => {
  test(`Text box test ${name}`, async ({ page }) => {
    // Navigate to the text box page
    await page.goto('https://demoqa.com/text-box');

    // Fill in the form fields
    await page.locator('#userName').fill(name);
    await page.locator('#userEmail').fill(email);
    await page.locator('#currentAddress').fill(currentAddress);
    await page.locator('#permanentAddress').fill(permanentAddress);

    // Submit the form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for output to be visible
    await page.locator('#output').waitFor({ state: 'visible' });

    // Verify the displayed data matches input
    const nameText = await page.locator('#name').textContent();
    const emailText = await page.locator('#email').textContent();
    const currentAddressText = await page.locator('#currentAddress.mb-1').textContent();
    const permanentAddressText = await page.locator('#permanentAddress.mb-1').textContent();

    // Extract values after the colon and verify
    expect(nameText?.split(':')[1]).toBe(name);
    expect(emailText?.split(':')[1]).toBe(email);
    expect(currentAddressText?.split(':')[1]?.trim()).toBe(currentAddress);
    expect(permanentAddressText?.split(':')[1]?.trim()).toBe(permanentAddress);
  });
});