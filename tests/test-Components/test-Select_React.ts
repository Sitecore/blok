import { test, expect, Page } from '@playwright/test';

export async function testSelectReact(page: Page){
    // Verify that the Select(React) section is visible
    const selectReactSection = page.locator('[id="select-react"]');
    await expect(selectReactSection).toBeVisible();

    // Verify placeholder text is visible
    const placeholder = selectReactSection.locator('[class*="gap-1 p-0 css-14oxtc6"]');
    await expect(placeholder.getByText('Select a product')).toBeVisible();

    // Verify that open dropdown when clicked
    const selectContainer = selectReactSection.locator('input[aria-label="Select a product"]');
    await expect(selectContainer).toBeVisible();
    await selectContainer.click();
    // Brief wait for dropdown to open (animation/portal)
    await page.waitForTimeout(300);

    // React Select renders a listbox; ensure we get the one with our options (not another select's content)
    const dropdown = page.getByRole('listbox').filter({ has: page.getByRole('option', { name: 'XM Cloud' }) });
    await expect(dropdown).toBeVisible({ timeout: 5000 });

    // Verify options are visible
    await expect(dropdown.getByRole('option', { name: 'XM Cloud' })).toBeVisible();
    await expect(dropdown.getByRole('option', { name: 'Content Hub' })).toBeVisible();
    await expect(dropdown.getByRole('option', { name: 'CDP' })).toBeVisible();
    await expect(dropdown.getByRole('option', { name: 'Blok' })).toBeVisible();

    // Verify it's visible and disabled
    await expect(dropdown.getByRole('option', { name: 'Blok' })).toBeDisabled();

    // Verify that select an option from dropdown
    await dropdown.getByRole('option', { name: 'Content Hub' }).click();

    // Verify that close select dropdown content
    await expect(dropdown).not.toBeVisible();

    // Verify the selected value is displayed
    await expect(placeholder.getByText('Content Hub')).toBeVisible();
}