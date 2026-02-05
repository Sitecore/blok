import { test, expect, Page } from '@playwright/test';

export async function testInput(page: Page){
    // Verify that display input default component
    const inputDefault = page.locator('[id="input-default"]');
    const label = inputDefault.locator('[data-slot="label"]');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Name');

    // Verify that display input contex
    const input = inputDefault.locator('[data-slot="input"] , [id="input"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');

    // Verify the input contains the typed text
    await expect(input).toHaveValue('');
    await input.fill('John Doe');
    await expect(input).toHaveValue('John Doe');

    // Verify that clear input value
    await input.clear();
    await expect(input).toHaveValue('');

    // Verify that handle special characters
    const specialText = 'Test@123#$%';
    await input.fill(specialText);
    await expect(input).toHaveValue(specialText);
}

export async function testInputEmail(page: Page){
    // Verify that display input email component
    const inputEmail = page.locator('[id="input-email"]');
    const label = inputEmail.locator('[data-slot="label"]');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Email');

    // Verify that display input contex
    const input = inputEmail.locator('[data-slot="input"] , [id="input"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your email');

    // Verify the input contains the typed text
    await expect(input).toHaveValue('');
    await input.fill('john.doe@example.com');
    await expect(input).toHaveValue('john.doe@example.com');

    // Verify that clear input value
    await input.clear();
    await expect(input).toHaveValue('');

    // Verify that handle special characters
    const specialText = 'Test@123#$%';
    await input.fill(specialText);
    await expect(input).toHaveValue(specialText);
}

export async function testInputText(page: Page){
    // Verify that display input text component
    const inputText = page.locator('[id="input-text"]');
    const label = inputText.locator('[data-slot="label"]');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Text');

    // Verify that display input contex
    const input = inputText.locator('[data-slot="input"] , [id="input"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter text');

    // Verify the input contains the typed text
    await expect(input).toHaveValue('');
    await input.fill('John Doe');
    await expect(input).toHaveValue('John Doe');

    // Verify that clear input value
    await input.clear();
    await expect(input).toHaveValue('');

    // Verify that handle special characters
    const specialText = 'Test@123#$%';
    await input.fill(specialText);
    await expect(input).toHaveValue(specialText);
}

export async function testInputPassword(page: Page){
    // Verify that display input password component
    const inputPassword = page.locator('[id="input-password"]');
    const label = inputPassword.locator('[data-slot="label"]');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Password');

    // Verify that display input contex
    const input = inputPassword.locator('[data-slot="input"] , [id="input"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your password');

    // Verify the input contains the typed text
    await expect(input).toHaveValue('');
    await input.fill('Password123');
    await expect(input).toHaveValue('Password123');

    // Verify that clear input value
    await input.clear();
    await expect(input).toHaveValue('');

    // Verify that handle special characters
    const specialText = 'Test@123#$%';
    await input.fill(specialText);
    await expect(input).toHaveValue(specialText);
}

export async function testInputFile(page: Page){
    // Verify that display input file component
    const inputFile = page.locator('[id="input-file"]');
    const label = inputFile.locator('[data-slot="label"]');
    await expect(label).toBeVisible();
    await expect(label).toContainText('File Upload');

    // Verify that display input contex
    const input = inputFile.locator('[data-slot="input"] , [id="input"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('autocomplete', 'off');
}

export async function testInputDisabled(page: Page){
    // Verify that display input disabled component
    const inputDisabled = page.locator('[id="input-disabled"]');
    const label = inputDisabled.locator('[data-slot="label"]');
    await expect(label).toBeVisible();
    await expect(label).toContainText('Disabled');

    // Verify that display input contex
    const input = inputDisabled.locator('[data-slot="input"] , [id="input"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'This input is disabled');
    await expect(input).toHaveAttribute('autocomplete', 'off');
}