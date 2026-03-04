import { test, expect, Page } from '@playwright/test';

export async function testLabel(page: Page){
    // Verify that display label component
    const labelSection = page.locator('[id="label-default"]');
    await expect(labelSection).toBeVisible();

    // Verify that default label is visible
    const labelDefault = labelSection.locator('label[data-slot="label"][for="terms"]');
    await expect(labelDefault).toBeVisible();

    // Verify that default label has text
    await expect(labelDefault).toHaveText('Accept terms and conditions');

    // Verify that default label has class attributes
    const labelClasses = await labelDefault.getAttribute('class');
    expect(labelClasses).toContain('text-md');
    expect(labelClasses).toContain('text-neutral-fg');
    expect(labelClasses).toContain('font-medium');

    // Verify that checkbox is visible
    const checkbox = labelSection.locator('button[data-slot="checkbox"][id="terms"]');
    await expect(checkbox).toBeVisible();
    
    // Verify checkbox is initially unchecked
    await expect(checkbox).not.toBeChecked();
}