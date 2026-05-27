import { test, expect, Page, type Locator } from '@playwright/test';

/**
 * Reveal a version in the virtualized menu (2000 options).
 * Option accessible names look like "20.9 v20.9.9 release 20.9.9" — match with a regex, not exact text.
 */
async function revealVirtualizedOption(
    page: Page,
    combobox: Locator,
    menu: Locator,
    versionPattern: RegExp,
) {
    const option = menu.getByRole('option', { name: versionPattern });
    if (await option.isVisible()) return;

    await combobox.focus();
    await page.keyboard.press('End');

    await expect
        .poll(
            async () => {
                if (await option.isVisible()) return true;
                const box = await menu.boundingBox();
                if (box) {
                    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
                    await page.mouse.wheel(0, 600);
                }
                return false;
            },
            { timeout: 20_000 },
        )
        .toBe(true);
}

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

    //Verify that Blok option has description
    await expect(dropdown.getByRole('option', { name: 'Blok' }).locator('span').nth(3)).toHaveText('Sitecore design system for building consistent product experiences.');

    // Verify that select an option from dropdown
    await dropdown.getByRole('option', { name: 'Content Hub' }).click();

    // Verify that close select dropdown content
    await expect(dropdown).not.toBeVisible();

    // Verify the selected value is displayed
    await expect(placeholder.getByText('Content Hub')).toBeVisible();
}

export async function testVertualizedSelect(page: Page){
    // Verify that the Virtualized Select section is visible
    const virtualizedSelectSection = page.locator('[id="virtualized-select"]');
    await expect(virtualizedSelectSection).toBeVisible();

    // Verify placeholder text is visible
    const placeholder = virtualizedSelectSection.locator('[id="react-select-_R_itindlb_-placeholder"]');
    await expect(placeholder.getByText('Select a version')).toBeVisible();

    const combobox = virtualizedSelectSection.getByRole('combobox', { name: 'Select a version' });
    await expect(combobox).toBeVisible();
    await combobox.click();
    await page.waitForTimeout(300);

    // Identify menu while v1.0.0 is mounted, then keep a stable handle (filter breaks after scroll)
    const menuWhileOpen = page.getByRole('listbox').filter({ has: page.getByRole('option', { name: /v1\.0\.0/ }) });
    await expect(menuWhileOpen).toBeVisible({ timeout: 5000 });
    const listboxId = await menuWhileOpen.getAttribute('id');
    expect(listboxId).toBeTruthy();
    const menu = page.locator(`#${listboxId}`);

    // Verify first option is visible
    const firstOption = menu.getByRole('option', { name: /v1\.0\.0/ });
    await expect(firstOption).toBeVisible();
    // Verify Avatar is visible
    await expect(firstOption.locator('[data-slot="avatar"]')).toBeVisible();
    await expect(firstOption.locator('[data-slot="avatar-fallback"]')).toHaveText('1.0');

    // Verify last option is visible
    await revealVirtualizedOption(page, combobox, menu, /v20\.9\.9/);
    const lastOption = menu.getByRole('option', { name: /v20\.9\.9/ });
    await expect(lastOption).toBeVisible();
    // Verify Avatar is visible
    await expect(lastOption.locator('[data-slot="avatar"]')).toBeVisible();
    await expect(lastOption.locator('[data-slot="avatar-fallback"]')).toHaveText('20.9');

    // Verify that select an option from dropdown
    await revealVirtualizedOption(page, combobox, menu, /v20\.9\.8/);
    await menu.getByRole('option', { name: /v20\.9\.8/ }).click();
    await expect(menu).not.toBeVisible();
    // After selection the placeholder is hidden; value is shown in the control
    await expect(virtualizedSelectSection).toContainText(/v20\.9\.8/);
    await expect(placeholder).not.toBeVisible();
}