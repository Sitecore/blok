import { test, expect, Page } from '@playwright/test';

export async function testSheetDefault(page: Page){
    // Verify that display sheet default component
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
    const closeButton = sheetFooter.locator('button[type="button"]').filter({ hasText: 'Cancel' });
    await expect(closeButton).toBeVisible();
    // Verify Save Changes button is visible
    const saveButton = sheetFooter.locator('button[type="submit"]').filter({ hasText: 'Save' });
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

export async function testSheetTop(page: Page){
    // Verify that display sheet top component
    const topButton = page.locator('[id="sheet-top"]');
    await expect(topButton).toBeVisible();

    // Verify Top sheet is opened when click the top button
    await topButton.click();
    const topSheet = page.locator('[data-slot="sheet-content"]');
    await expect(topSheet).toBeVisible();

    // Verify sheet header
    const topSheetHeader = topSheet.locator('[data-slot="sheet-header"]');
    await expect(topSheetHeader).toBeVisible();
    // Verify header tittle
    await expect(topSheetHeader.locator('[data-slot="sheet-title"]')).toContainText('Empowering Brands Through Digital Experience');

    // Verify close (X) button in the header
    await expect(topSheet.getByRole('button', { name: 'Close' })).toBeVisible();

    // Verify sheet footer
    const topSheetFooter = topSheet.locator('[data-slot="sheet-footer"]');
    await expect(topSheetFooter).toBeVisible();
    // Verify Cancel button in the footer
    await expect(topSheetFooter.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(topSheetFooter.getByRole('button', { name: 'Save changes' })).toBeVisible();

    // Verify that close sheet when Close (X) button is clicked
    await topSheet.getByRole('button', { name: 'Close' }).click();
    await expect(topSheet).not.toBeVisible();

    // Verify that close sheet using Cancel button
    await topButton.click();
    await expect(topSheet).toBeVisible();
    await topSheetFooter.getByRole('button', { name: 'Cancel' }).click();
    await expect(topSheet).not.toBeVisible();
}

export async function testSheetBottom(page: Page){
    // Verify that display sheet bottom component
    const bottomButton = page.locator('[id="sheet-bottom"]');
    await expect(bottomButton).toBeVisible();

    // Verify Bottom sheet is opened when click the bottom button
    await bottomButton.click();
    const bottomSheet = page.locator('[data-slot="sheet-content"]');
    await expect(bottomSheet).toBeVisible();

    // Verify sheet header
    const bottomSheetHeader = bottomSheet.locator('[data-slot="sheet-header"]');
    await expect(bottomSheetHeader).toBeVisible();
    // Verify header tittle
    await expect(bottomSheetHeader.locator('[data-slot="sheet-title"]')).toContainText('Empowering Brands Through Digital Experience');

    // Verify close (X) button in the header
    await expect(bottomSheet.getByRole('button', { name: 'Close' })).toBeVisible();

    // Verify sheet footer
    const bottomSheetFooter = bottomSheet.locator('[data-slot="sheet-footer"]');
    await expect(bottomSheetFooter).toBeVisible();
    // Verify Cancel button in the footer
    await expect(bottomSheetFooter.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(bottomSheetFooter.getByRole('button', { name: 'Save changes' })).toBeVisible();

    // Verify that close sheet when Close (X) button is clicked
    await bottomSheet.getByRole('button', { name: 'Close' }).click();
    await expect(bottomSheet).not.toBeVisible();

    // Verify that close sheet using Cancel button
    await bottomButton.click();
    await expect(bottomSheet).toBeVisible();
    await bottomSheetFooter.getByRole('button', { name: 'Cancel' }).click();
    await expect(bottomSheet).not.toBeVisible();
}

export async function testSheetLeft(page: Page){
    // Verify that display sheet left component
    const leftButton = page.locator('[id="sheet-left"]');
    await expect(leftButton).toBeVisible();

    // Verify Left sheet is opened when click the left button
    await leftButton.click();
    const leftSheet = page.locator('[data-slot="sheet-content"]');
    await expect(leftSheet).toBeVisible();

    // Verify sheet header
    const leftSheetHeader = leftSheet.locator('[data-slot="sheet-header"]');
    await expect(leftSheetHeader).toBeVisible();
    // Verify header tittle
    await expect(leftSheetHeader.locator('[data-slot="sheet-title"]')).toContainText('Empowering Brands Through Digital Experience');

    // Verify close (X) button in the header
    await expect(leftSheet.getByRole('button', { name: 'Close' })).toBeVisible();

    // Verify sheet footer
    const leftSheetFooter = leftSheet.locator('[data-slot="sheet-footer"]');
    await expect(leftSheetFooter).toBeVisible();
    // Verify Cancel button in the footer
    await expect(leftSheetFooter.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(leftSheetFooter.getByRole('button', { name: 'Save changes' })).toBeVisible();

    // Verify that close sheet when Close (X) button is clicked
    await leftSheet.getByRole('button', { name: 'Close' }).click();
    await expect(leftSheet).not.toBeVisible();

    // Verify that close sheet using Cancel button
    await leftButton.click();
    await expect(leftSheet).toBeVisible();
    await leftSheetFooter.getByRole('button', { name: 'Cancel' }).click();
    await expect(leftSheet).not.toBeVisible();
}

export async function testSheetRight(page: Page){
    // Verify that display sheet right component
    const rightButton = page.locator('[id="sheet-right"]');
    await expect(rightButton).toBeVisible();

    // Verify Right sheet is opened when click the right button
    await rightButton.click();
    const rightSheet = page.locator('[data-slot="sheet-content"]');
    await expect(rightSheet).toBeVisible();

    // Verify sheet header
    const rightSheetHeader = rightSheet.locator('[data-slot="sheet-header"]');
    await expect(rightSheetHeader).toBeVisible();
    // Verify header tittle
    await expect(rightSheetHeader.locator('[data-slot="sheet-title"]')).toContainText('Empowering Brands Through Digital Experience');

    // Verify close (X) button in the header
    await expect(rightSheet.getByRole('button', { name: 'Close' })).toBeVisible();

    // Verify sheet footer
    const rightSheetFooter = rightSheet.locator('[data-slot="sheet-footer"]');
    await expect(rightSheetFooter).toBeVisible();
    // Verify Cancel button in the footer
    await expect(rightSheetFooter.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(rightSheetFooter.getByRole('button', { name: 'Save changes' })).toBeVisible();

    // Verify that close sheet when Close (X) button is clicked
    await rightSheet.getByRole('button', { name: 'Close' }).click();
    await expect(rightSheet).not.toBeVisible();

    // Verify that close sheet using Cancel button
    await rightButton.click();
    await expect(rightSheet).toBeVisible();
    await rightSheetFooter.getByRole('button', { name: 'Cancel' }).click();
    await expect(rightSheet).not.toBeVisible();
}