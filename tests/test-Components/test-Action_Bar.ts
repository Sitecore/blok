import { test, expect, Page } from '@playwright/test';

export async function testActionBar(page: Page){
    // Verify that display action bar section with all elements
    const actionBarSection = page.locator('#action-bar');
    await expect(actionBarSection).toBeVisible();

    // Verify Action bar checkbox
    const checkbox = actionBarSection.locator('[data-slot="checkbox"]');
    await expect(checkbox).toBeVisible();

    // Verify Action bar label
    const label = actionBarSection.locator('label[for="action-bar-checkbox"]');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Show action bar');

    // Verify that action bar checkbox classes when checkbox is checked
    await checkbox.check();
    const checkboxClasses = await checkbox.locator('[data-slot="checkbox-indicator"]').getAttribute('class');
    expect(checkboxClasses).toContain('data-[state=checked]:border-info-fg data-[state=checked]:bg-info-fg data-[state=checked]:text-inverse-text dark:data-[state=checked]:border-info-fg dark:data-[state=checked]:bg-info-fg');
    
    // Verify that action bar is visible when checkbox is checked
    const actionBar = page.locator('[class*="translate-y-0"]').first();
    await expect(actionBar).toBeVisible();

    // Verify that Cancel tooltip trigger is visible
    const tooltipTriggerCancel = actionBar.locator('button[data-slot="tooltip-trigger"][aria-label="Cancel"]');
    await expect(tooltipTriggerCancel).toBeVisible();
    // Hover over the tooltip icon
    await tooltipTriggerCancel.hover();
    // Verify that tooltip text is visible
    const tooltipTextCancel = page.getByRole('tooltip', { name: 'Cancel' });
    await expect(tooltipTextCancel).toBeVisible();

    // Verify that display selected count correctly
    const selectedCount = actionBar.locator('span');
    await expect(selectedCount).toBeVisible();
    await expect(selectedCount).toHaveText('3 selected');

    // Verify Publish button is visible
    const publishButton = actionBar.locator('button[data-slot="button"]').nth(0);
    await expect(publishButton).toBeVisible();
    await expect(publishButton).toHaveText('Publish');
    // Verify that classes
    const publishButtonClasses = await publishButton.getAttribute('class');
    expect(publishButtonClasses).toContain('h-10 min-w-10 px-4 rounded-4xl border text-neutral-fg hover:bg-neutral-bg hover:text-neutral-fg active:bg-neutral-bg-active');

    // Verify Unpublish button is visible
    const unpublishButton = actionBar.locator('button[data-slot="button"]').nth(1);
    await expect(unpublishButton).toBeVisible();
    await expect(unpublishButton).toHaveText('Unpublish');
    // Verify that classes
    const unpublishButtonClasses = await unpublishButton.getAttribute('class');
    expect(unpublishButtonClasses).toContain('h-10 min-w-10 px-4 rounded-4xl border text-neutral-fg hover:bg-neutral-bg hover:text-neutral-fg active:bg-neutral-bg-active');

    // Verify Duplicate button is visible
    const duplicateButton = actionBar.locator('button[data-slot="button"]').nth(2);
    await expect(duplicateButton).toBeVisible();
    await expect(duplicateButton).toHaveText('Duplicate');
    // Verify that classes
    const duplicateButtonClasses = await duplicateButton.getAttribute('class');
    expect(duplicateButtonClasses).toContain('h-10 min-w-10 px-4 rounded-4xl bg-primary text-inverse-text hover:bg-primary-hover active:bg-primary-active');

    // Verify that More tooltip trigger is visible
    const tooltipTriggerMore = actionBar.locator('button[data-slot="tooltip-trigger"][aria-label="More"]');
    await expect(tooltipTriggerMore).toBeVisible();
    // Hover over the tooltip icon
    await tooltipTriggerMore.hover();
    // Verify that tooltip text is visible
    const tooltipTextMore = page.getByRole('tooltip', { name: 'More' });
    await expect(tooltipTextMore).toBeVisible();

    // Verify that More dropdown menu is visible
    await tooltipTriggerMore.click();
    const dropdownMenu = page.locator('[data-slot="dropdown-menu-group"]');
    await expect(dropdownMenu).toBeVisible();
    // Verify that More dropdown menu items are visible
    // Archive item
    const dropdownMenuItem1 = dropdownMenu.locator('[data-slot="dropdown-menu-item"]').nth(0);
    await expect(dropdownMenuItem1).toBeVisible();
    await expect(dropdownMenuItem1).toHaveText('Archive');
    // Delete item
    const dropdownMenuItem2 = dropdownMenu.locator('[data-slot="dropdown-menu-item"]').nth(1);
    await expect(dropdownMenuItem2).toBeVisible();
    await expect(dropdownMenuItem2).toHaveText('Delete');

    await page.keyboard.press('Escape');
    await expect(dropdownMenu).not.toBeVisible({ timeout: 2000 });

    // Verify that close action bar when cancel button is clicked
    await tooltipTriggerCancel.click();
    await expect(actionBar).not.toBeVisible({ timeout: 2000 });
}