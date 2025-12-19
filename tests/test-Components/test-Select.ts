import { test, expect, Page } from '@playwright/test';

export async function testSelectDefault(page: Page){
    // Verify that display default select
    const selectDefault = page.locator('[id="select-default"]');
    await expect(selectDefault).toBeVisible();
    
    // Verify placeholder text
    await expect(selectDefault).toContainText('Select a product');

    // Verify that open select dropdown content
    await selectDefault.click();
    const defaultSelectContent = page.locator('[data-slot="select-content"]').locator('[data-slot="select-group"]').nth(0).locator('..');
    await expect(defaultSelectContent).toBeVisible();

    // Verify the group label is visible
    await expect(defaultSelectContent.getByText('Products')).toBeVisible();
    // Verify options are visible
    await expect(defaultSelectContent.getByRole('option', { name: 'XM Cloud' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'Content Hub' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'CDP' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'Blok' })).toBeVisible();

    // Verify that select an option from default select
    // Select "XM Cloud"
    await defaultSelectContent.getByRole('option', { name: 'XM Cloud' }).click();
    // Verify the selected value is displayed
    await expect(selectDefault).toContainText('XM Cloud');

    // Verify that close select dropdown content
    await expect(defaultSelectContent).not.toBeVisible();
}