import { test, expect, Page } from '@playwright/test';

export async function testSheetDefault(page: Page){
    // Verify that display open sheet button
    const openButton = page.locator('[id="sheet-default"]');
    await expect(openButton).toBeVisible();

    // Verify sheet is visible
    await openButton.click();
    const sheetContent = page.locator('[data-slot="sheet-content"]');
    await expect(sheetContent).toBeVisible();

    // Verify overlay is visible
    const overlay = page.locator('[data-slot="sheet-overlay"]');
    await expect(overlay).toBeVisible();

    // Verify sheet header details are visible
    const sheetHeader = sheetContent.locator('[data-slot="sheet-header"]');
    // Verify sheet title
    const sheetTitle = sheetHeader.locator('[data-slot="sheet-title"]');
    await expect(sheetTitle).toHaveText('Edit profile');
    // Verify sheet description
    const sheetDescription = sheetHeader.locator('[data-slot="sheet-description"]');
    await expect(sheetDescription).toContainText('Make changes to your profile here. Click save when you\'re done.');

    // Verify sheet content is visible
    // Find and interact with name input
    const nameLabel = sheetContent.locator('label[for="sheet-demo-name"]').filter({ hasText: 'Name' });
    await expect(nameLabel).toBeVisible();
    const nameInput = sheetContent.locator('#sheet-demo-name');
    await expect(nameInput).toBeVisible();
    await expect(nameInput).toHaveValue('Liz');
    // Verify that allow editing name input and update the value
    await nameInput.clear();
    await nameInput.fill('John Doe');
    await expect(nameInput).toHaveValue('John Doe');

    // Find and interact with username input
    const usernameLabel = sheetContent.locator('label[for="sheet-demo-username"]').filter({ hasText: 'Username' });
    await expect(usernameLabel).toBeVisible();
    const usernameInput = sheetContent.locator('#sheet-demo-username');
    await expect(usernameInput).toBeVisible();
    await expect(usernameInput).toHaveValue('@liz');
    // Verify that allow editing username input and update the value
    await usernameInput.clear();
    await usernameInput.fill('@johndoe');
    await expect(usernameInput).toHaveValue('@johndoe');

    // Verify sheet footer buttons are visible
    const sheetFooter = sheetContent.locator('[data-slot="sheet-footer"]');
    // Verify Close button is visible
    const closeButton = sheetFooter.locator('button[type="button"]').filter({ hasText: 'Close' });
    await expect(closeButton).toBeVisible();
    // Verify Save Changes button is visible
    const saveButton = sheetFooter.locator('button[type="submit"]').filter({ hasText: 'Save changes' });
    await expect(saveButton).toBeVisible();

    // Verify that close sheet when Close button is clicked
    await closeButton.click();
    await expect(sheetContent).not.toBeVisible();

    // Verify that close sheet using X button
    await openButton.click();
    const closeXButton = sheetContent.locator('button[type="button"] span:has-text("Close")');
    await expect(closeXButton).toBeVisible();
    await closeXButton.click();
    await expect(sheetContent).not.toBeVisible();
}