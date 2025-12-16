import { test, expect, Page } from '@playwright/test';

export async function testPopover(page: Page){
    // Verify that display popover trigger button
    const triggerButton = page.getByRole('button', { name: 'Open popover' });
    await expect(triggerButton).toBeVisible();

    // Verify that open popover when trigger button is clicked
    await triggerButton.click();
    const popoverContent = page.locator('[data-slot="popover-content"]');
    await expect(popoverContent).toBeVisible();

    // Verify that display popover heading when opened
    const heading = popoverContent.getByRole('heading', { name: 'Dimensions' });
    await expect(heading).toBeVisible();

    // Verify that display popover description when opened
    const description = popoverContent.getByText('Set the dimensions for the layer.');
    await expect(description).toBeVisible();

    // Verify that display Width input field in popover
    const widthLabel = popoverContent.getByText('Width', { exact: true });
    await expect(widthLabel).toBeVisible();
    const widthInput = popoverContent.locator('input[id="width"]');
    await expect(widthInput).toBeVisible();
    await expect(widthInput).toHaveValue('100%');

    // Verify that display Max Width input field in popover
    const maxWidthLabel = popoverContent.getByText('Max. width', { exact: true });
    await expect(maxWidthLabel).toBeVisible();
    const maxWidthInput = popoverContent.locator('input[id="maxWidth"]');
    await expect(maxWidthInput).toBeVisible();
    await expect(maxWidthInput).toHaveValue('300px');

    // Verify that display Height input field in popover
    const heightLabel = popoverContent.getByText('Height', { exact: true });
    await expect(heightLabel).toBeVisible();
    const heightInput = popoverContent.locator('input[id="height"]');
    await expect(heightInput).toBeVisible();
    await expect(heightInput).toHaveValue('25px');

    // Verify that display Max Height input field in popover
    const maxHeightLabel = popoverContent.getByText('Max. height', { exact: true });
    await expect(maxHeightLabel).toBeVisible();
    const maxHeightInput = popoverContent.locator('input[id="maxHeight"]');
    await expect(maxHeightInput).toBeVisible();
    await expect(maxHeightInput).toHaveValue('none');
}