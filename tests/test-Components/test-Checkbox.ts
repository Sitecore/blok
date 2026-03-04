import { test, expect, Page } from '@playwright/test';

export async function testCheckbox(page: Page){
    // Verify that default checkbox section is visible
    const checkbox = page.locator('[id="checkbox-default"]');

    // Verify that default checkbox is visible
    const defaultCheckbox = checkbox.locator('button[data-slot="checkbox"][id="terms"]');
    await expect(defaultCheckbox).toBeVisible();

    // Verify that checkbox has class attributes
    const checkboxClasses = await defaultCheckbox.getAttribute('class');
    expect(checkboxClasses).toContain('border-input');
    expect(checkboxClasses).toContain('data-[state=checked]:bg-primary');
    expect(checkboxClasses).toContain('data-[state=checked]:border-primary');
    expect(checkboxClasses).toContain('rounded-[4px]');

    // Verify that checkbox is not checked initially
    await expect(defaultCheckbox).not.toBeChecked();

    // Verify checkbox is now checked
    await defaultCheckbox.click();
    await expect(defaultCheckbox).toBeChecked();

    // Verify checkbox is now unchecked
    await defaultCheckbox.click();
    await expect(defaultCheckbox).not.toBeChecked();

    // Verify that display label text
    const label = checkbox.locator('label[data-slot="label"][for="terms"]');
    await expect(label).toBeVisible();

    // Verify that label has class attributes
    const labelClasses = await label.getAttribute('class');
    expect(labelClasses).toContain('text-md');
    expect(labelClasses).toContain('text-neutral-fg');
    expect(labelClasses).toContain('font-medium');

    // Verify that label has text
    await expect(label).toHaveText('Accept terms and conditions');
}

export async function testCheckboxWithDescription(page: Page){
    // Verify that checkbox with description is visible
    const checkbox = page.locator('[id="checkbox-description"]');

    // Verify that checkbox is visible
    const descriptionCheckbox = checkbox.locator('[data-slot="checkbox"][id="terms-2"]');
    await expect(descriptionCheckbox).toBeVisible();

    // Verify that checkbox has label text
    await expect(checkbox.locator('label[data-slot="label"][for="terms-2"]')).toHaveText('Accept terms and conditions');

    // Verify that checkbox has description
    await expect(checkbox.locator('p')).toHaveText('By clicking this checkbox, you agree to the terms and conditions.');
}

export async function testCheckboxDisabled(page: Page){
    // Verify that checkbox is disabled    
    const checkboxDisabled = page.locator('[data-slot="checkbox"][aria-label="Disabled notifications"]');
    await expect(checkboxDisabled).toBeVisible();
    await expect(checkboxDisabled).toBeDisabled();
}

export async function testCheckEnabledLabel(page: Page){
    // Verify that checkbox is enabled and has label text
    const checkbox = page.locator('[id="checkbox-enabled-label"]');
    await expect(checkbox).toBeVisible();
    const checkboxEnabledLabel = checkbox.locator('[data-slot="checkbox"][id="toggle-2"]');
    await expect(checkboxEnabledLabel).toBeVisible();

    // Verify that checkbox has label text
    await expect(checkboxEnabledLabel).toHaveAttribute('aria-label', 'Enable notifications');
    await expect(checkbox.locator('p').nth(0)).toHaveText('Enable notifications');

    // Verify that checkbox has description
    await expect(checkbox.locator('p').nth(1)).toHaveText('You can enable or disable notifications at any time.');

    // Verify that checkable by clicking the label
    await checkboxEnabledLabel.click();
    await expect(checkboxEnabledLabel).not.toBeChecked();
    await checkboxEnabledLabel.click();
    await expect(checkboxEnabledLabel).toBeChecked();
}
