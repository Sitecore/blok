import { test, expect, Page } from '@playwright/test';

export async function testInputOTPSimple(page: Page){
    // Verify that display input OTP simple component
    const inputOTPSimple = page.locator('[id="input-otp-simple"]');
    const label = inputOTPSimple.locator('label[for="simple"]');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Simple');

    // Verify that display input OTP component
    const inputOTP = inputOTPSimple.locator('[data-slot="input-otp"]').first();
    await expect(inputOTP).toBeVisible();

    // Verify that display two OTP groups
    const groups = inputOTPSimple.locator('[data-slot="input-otp-group"]');
    await expect(groups).toHaveCount(2);
    
    // Verify each group is visible
    await expect(groups.nth(0)).toBeVisible();
    await expect(groups.nth(1)).toBeVisible();

    // Verify that display separator between groups
    const separator = inputOTPSimple.locator('[data-slot="input-otp-separator"]').first();
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('role', 'separator');

    // Verify that accept multiple characters
    const slots = inputOTPSimple.locator('[data-slot="input-otp-slot"]');
    await inputOTP.click();
    await page.keyboard.type('1b3d5f');

    // Verify all slots contain the correct characters
    await expect(slots.nth(0)).toContainText('1');
    await expect(slots.nth(1)).toContainText('b');
    await expect(slots.nth(2)).toContainText('3');
    await expect(slots.nth(3)).toContainText('d');
    await expect(slots.nth(4)).toContainText('5');
    await expect(slots.nth(5)).toContainText('f');

    // Verify that handle multiple backspace presses
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    
    // Verify only first 3 characters remain
    await expect(slots.nth(0)).toContainText('1');
    await expect(slots.nth(1)).toContainText('b');
    await expect(slots.nth(2)).toContainText('3');
    await expect(slots.nth(3)).toContainText('');
    await expect(slots.nth(4)).toContainText('');
    await expect(slots.nth(5)).toContainText('');

    // Verify that handle delete key
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('Delete');
    await expect(slots.nth(2)).toContainText('');

    // Verify that clear all characters with select all and delete
    await page.keyboard.press('Control+a');
    await page.keyboard.press('Delete');
    
    // Verify all slots are empty
    for (let i = 0; i < 6; i++) {
      await expect(slots.nth(i)).toContainText('');
    }
}

export async function testInputOTPPattern(page: Page){
  // Verify that display input OTP digits only component
  const inputOTPDigitsOnly = page.locator('[id="input-otp-digits-only"]');
  const label = inputOTPDigitsOnly.locator('label[for="digits-only"]');
  await expect(label).toBeVisible();
  await expect(label).toContainText('Digits Only');

  // Verify that display two OTP groups
  const group = inputOTPDigitsOnly.locator('[data-slot="input-otp-group"]');

  // Verify that OTP group have 6 slots
  const slots = group.locator('[data-slot="input-otp-slot"]');
  await expect(slots).toHaveCount(6);
}

export async function testInputOTPWithSpacing(page: Page){
  // Verify that display input OTP with spacing component
  const inputOTPWithSpacing = page.locator('[id="input-otp-with-spacing"]');
  const label = inputOTPWithSpacing.locator('label[for="with-spacing"]');
  await expect(label).toBeVisible();
  await expect(label).toContainText('With Spacing');

  // Verify that display two OTP groups
  const group = inputOTPWithSpacing.locator('[data-slot="input-otp-group"]');

  // Verify that OTP group have 6 slots
  const slots = group.locator('[data-slot="input-otp-slot"]');
  await expect(slots).toHaveCount(4);

  // Verify spaces between slots
  const spaces = inputOTPWithSpacing.locator('input[data-slot="input-otp"]');
  await expect(spaces).toHaveAttribute('id', 'with-spacing');
}