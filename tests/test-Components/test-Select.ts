import { test, expect, Page } from '@playwright/test';

export async function testSelectDefault(page: Page){
    // Verify that display default select
    const selectDefault = page.locator('[id="select-default"]');
    await expect(selectDefault).toBeVisible();
    
    // Verify placeholder text
    await expect(selectDefault).toContainText('Select a product');

    // Verify that the Default select has the expected class attributes
    const defaultSelectClass = await selectDefault.locator('button[data-slot="select-trigger"]').getAttribute('class');
    expect(defaultSelectClass).toContain('border-input');
    expect(defaultSelectClass).toContain('text-md');
    expect(defaultSelectClass).toContain('text-neutral-fg');
    expect(defaultSelectClass).toContain('font-semibold');
    expect(defaultSelectClass).toContain('bg-body-bg');
    expect(defaultSelectClass).toContain('whitespace-nowrap');
    expect(defaultSelectClass).toContain('data-[state=open]:border-2');
    
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

export async function testSelectLargeList(page: Page){
    // Verify that display select with large list
    const selectLargeList = page.locator('[id="select-large-list"]');
    await expect(selectLargeList).toBeVisible();
    
    // Verify placeholder text
    await expect(selectLargeList).toContainText('Large List');

    // Verify that the Large List select has the expected class attributes
    const largeSelectClass = await selectLargeList.locator('button[data-slot="select-trigger"]').getAttribute('class');
    expect(largeSelectClass).toContain('border-input');
    expect(largeSelectClass).toContain('text-md');
    expect(largeSelectClass).toContain('text-neutral-fg');
    expect(largeSelectClass).toContain('font-semibold');
    expect(largeSelectClass).toContain('bg-body-bg');
    expect(largeSelectClass).toContain('whitespace-nowrap');
    expect(largeSelectClass).toContain('data-[state=open]:border-2');

    // Verify that open select dropdown content
    await selectLargeList.click();
    const largeSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(largeSelectContent).toBeVisible();

    // Verify content is visible
    await expect(largeSelectContent.getByText('Item 0', { exact: true })).toBeVisible();
    await expect(largeSelectContent.getByText('Item 1', { exact: true })).toBeVisible();
    await expect(largeSelectContent.getByText('Item 2', { exact: true })).toBeVisible();
    await expect(largeSelectContent.getByText('Item 3', { exact: true })).toBeVisible();

    // Verify that select an option from large select list
    // Select "Item 10"
    await largeSelectContent.getByText('Item 10', { exact: true }).click();
    // Verify the selected value is displayed
    await expect(selectLargeList).toContainText('Item 10');

    // Verify that close select dropdown content
    await expect(largeSelectContent).not.toBeVisible();
}

export async function testSelectWithIcon(page: Page){
    // Verify that display select with icon
    const selectWithIcon = page.locator('[id="select-with-icon"]');
    await expect(selectWithIcon).toBeVisible();
    
    // Verify placeholder text
    await expect(selectWithIcon).toContainText('With Icon');

    // Verify that the Select with Icon has the expected class attributes
    const withIconSelectClass = await selectWithIcon.locator('button[data-slot="select-trigger"]').getAttribute('class');
    expect(withIconSelectClass).toContain('border-input');
    expect(withIconSelectClass).toContain('text-md');
    expect(withIconSelectClass).toContain('text-neutral-fg');
    expect(withIconSelectClass).toContain('font-semibold');
    expect(withIconSelectClass).toContain('bg-body-bg');
    expect(withIconSelectClass).toContain('whitespace-nowrap');
    expect(withIconSelectClass).toContain('data-[state=open]:border-2');

    // Verify that open select dropdown content
    await selectWithIcon.click();
    const selectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(selectContent).toBeVisible();

    // Verify content is visible
    await expect(selectContent.getByText('Line')).toBeVisible();
    await expect(selectContent.getByText('Bar')).toBeVisible();
    await expect(selectContent.getByText('Pie')).toBeVisible();

    // Verify that select an option from Icon select list
    // Select "Item 10"
    await selectContent.getByText('Bar').click();
    // Verify the selected value is displayed
    await expect(selectWithIcon).toContainText('Bar');

    // Verify that close select dropdown content
    await expect(selectContent).not.toBeVisible();
}

export async function testSelectDisabled(page: Page){
    // Verify that display select disabled
    const selectDisabled = page.locator('[id="select-disabled"]');
    await expect(selectDisabled).toBeVisible();

    // Verify contain text
    const attributesDisabled = selectDisabled.locator('[data-slot="select-trigger"]');
    await expect(attributesDisabled).toContainText('Disabled');

    // Verify attributes
    await expect(attributesDisabled).toHaveAttribute('disabled');
    await expect(attributesDisabled).toHaveAttribute('data-disabled');
    await expect(attributesDisabled).toHaveAttribute('aria-expanded', 'false');
    await expect(attributesDisabled).toHaveAttribute('aria-autocomplete', 'none');
}