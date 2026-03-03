import { test, expect, Page } from '@playwright/test';

export async function testFilterDefault(page: Page){
    // Verify that default filter section is visible
    const defaultFilter = page.locator('[id="filter-default"]');
    await expect(defaultFilter).toBeVisible();

    // Verify that display filter search input
    const filterInput = defaultFilter.locator('[class="w-64"]');
    const searchInput = filterInput.locator('[data-slot="search-input"]');
    await expect(searchInput).toBeVisible();
    // Verify that filter search input has the search icon
    const searchInputIcon = searchInput.locator('[data-slot="search-input-left-element"]');
    await expect(searchInputIcon).toBeVisible();
    // Verify that filter search input has the input control
    const searchInputControl = searchInput.locator('[data-slot="search-input-control"]');
    await expect(searchInputControl).toBeVisible();
    // Verify that typing in search updates value in the input
    await searchInputControl.fill('test query');
    await expect(searchInputControl).toHaveValue('test query');
    // Verify that the input has the clear button
    const searchInputclearButton = searchInput.locator('[data-slot="search-input-right-element"]');
    const clearButton = searchInputclearButton.locator('[data-slot="tooltip-trigger"]');
    await expect(clearButton).toBeVisible();

    // Verify that display single filter
    const singleFilter = defaultFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(0);
    await expect(singleFilter).toBeVisible();
    // Verify that display single filter button
    const singleFilterButton = singleFilter.locator('button[data-slot="select-trigger"]');
    await expect(singleFilterButton).toBeVisible();
    // Verify that display single filter dropdown content
    await expect(singleFilter).toContainText('Select a product');
    // Verify that display single filter options
    await singleFilterButton.click();
    const defaultSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
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
    await expect(singleFilter).toContainText('Select a product:XM Cloud');
    // Verify that close select dropdown content
    await expect(defaultSelectContent).not.toBeVisible();

    // Verify that display multi select filter
    const multiSelectFilter = defaultFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(1);
    await expect(multiSelectFilter).toBeVisible();
    // Verify that display multi select filter button
    const multiSelectFilterButton = multiSelectFilter.locator('button[data-slot="popover-trigger"]');
    await expect(multiSelectFilterButton).toBeVisible();
    // Verify that display multi select filter dropdown content
    await expect(multiSelectFilter).toContainText('Select products');
    // Verify that display multi select filter options
    await multiSelectFilterButton.click();
    const multiSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').first();
    await expect(multiSelectContent).toBeVisible();
    // Wait for popover to be stable (helps in headless where positioning can lag)
    await page.waitForTimeout(400);
    // Verify that select options from multi select
    const xmCloudCheckbox = multiSelectContent.getByRole('checkbox', { name: 'XM Cloud' });
    const sitecoreXmCheckbox = multiSelectContent.getByRole('checkbox', { name: 'Sitecore XM' });
    await expect(xmCloudCheckbox).toBeVisible();
    await expect(sitecoreXmCheckbox).toBeVisible();
    // JS click avoids "outside viewport" in headless (popover uses fixed positioning)
    await xmCloudCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(xmCloudCheckbox).toBeChecked();
    await sitecoreXmCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(sitecoreXmCheckbox).toBeChecked();
    // Verify that close select dropdown content
    await multiSelectFilterButton.click();
    await expect(multiSelectContent).not.toBeVisible();
    // Verify the selected value is displayed
    await expect(multiSelectFilter).toContainText('Select products:XM Cloud, Sitecore XM');

    // Verify that Clear all filter is visible
    const clearAllFilter = defaultFilter.locator('[data-slot="button"]').nth(2);
    await expect(clearAllFilter).toBeVisible();
    // Verify that display toggle filter content
    await expect(clearAllFilter).toContainText('Clear all');

    // Verify that when click clear all filter, all filters are cleared
    await clearAllFilter.click();
    // Verify that default filter is cleared
    await expect(searchInputControl).not.toHaveValue('test query');
    await expect(clearButton).not.toBeVisible();
    // Verify that single select filter is cleared
    await expect(singleFilter).not.toContainText('Select a product:XM Cloud');
    // Verify that multi select filter is cleared
    await expect(multiSelectFilter).not.toContainText('Select products:XM Cloud, Sitecore XM');
}

export async function testFilterInput(page: Page){
    // Verify that input filter section is visible
    const inputFilter = page.locator('[id="filter-input"]');
    await expect(inputFilter).toBeVisible();

    // Verify that display filter search input
    const searchInput = inputFilter.locator('[data-slot="search-input"]');
    await expect(searchInput).toBeVisible();
    // Verify that filter search input has the search icon
    const searchInputIcon = searchInput.locator('[data-slot="search-input-left-element"]');
    await expect(searchInputIcon).toBeVisible();
    // Verify that filter search input has the input control
    const searchInputControl = searchInput.locator('[data-slot="search-input-control"]');
    await expect(searchInputControl).toBeVisible();

    // Verify that typing in search updates value in the input
    await searchInputControl.fill('test query');
    await expect(searchInputControl).toHaveValue('test query');

    // Verify that the input has the clear button
    const searchInputclearButton = searchInput.locator('[data-slot="search-input-right-element"]');
    const clearButton = searchInputclearButton.locator('[data-slot="tooltip-trigger"]');
    await expect(clearButton).toBeVisible();

    // Verify that clear search button clears the input
    await clearButton.click();
    await expect(searchInputControl).toHaveValue('');
    await expect(clearButton).not.toBeVisible();
}

export async function testFilterSingleSelect(page: Page){
    // Verify that single select filter section is visible
    const singleFilter = page.locator('[id="filter-single-select"]');
    await expect(singleFilter).toBeVisible();

    // Verify that display default single filter
    const defaultSingleFilter = singleFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(0);
    await expect(defaultSingleFilter).toBeVisible();
    await expect(defaultSingleFilter).toContainText('Select a product');
    // Verify that display default single filter button
    const defaultFilterButton = defaultSingleFilter.locator('button[data-slot="select-trigger"]');
    await expect(defaultFilterButton).toBeVisible();
    // Verify that display default single filter dropdown content
    await expect(defaultSingleFilter).toContainText('Select a product');
    // Verify that display default single filter options
    await defaultFilterButton.click();
    const defaultSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(defaultSelectContent).toBeVisible();
    // Verify the group label is visible
    await expect(defaultSelectContent.getByText('Products')).toBeVisible();
    // Verify options are visible
    await expect(defaultSelectContent.getByRole('option', { name: 'XM Cloud' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'Content Hub' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'CDP' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'Blok' })).toBeVisible();
    // Verify that select an option from default single filter dropdown content
    // Select "XM Cloud"
    await defaultSelectContent.getByRole('option', { name: 'XM Cloud' }).click();
    // Verify the selected value is displayed
    await expect(defaultSingleFilter).toContainText('Select a product:XM Cloud');
    // Verify that close select dropdown content
    await expect(defaultSelectContent).not.toBeVisible();
    // Verify that clear selection button is visible for default single filter
    const defaultClearButton = defaultSingleFilter.locator('button[data-slot="button"][aria-label="Clear selection"]');
    await expect(defaultClearButton).toBeVisible();

    // Verify that single select filter has the expected classes
    const classListSingle = await defaultFilterButton.getAttribute('class');
    expect(classListSingle).toContain('text-md');
    expect(classListSingle).toContain('text-neutral-fg');
    expect(classListSingle).toContain('font-semibold');
    expect(classListSingle).toContain('bg-body-bg');
    expect(classListSingle).toContain('whitespace-nowrap');
    expect(classListSingle).toContain('data-[state=open]:border-2');
}

export async function testFilterMultiSelect(page: Page){
    // Verify that multi select filter section is visible
    const multiFilter = page.locator('[id="filter-multi-select"]');
    await expect(multiFilter).toBeVisible();

    // Verify that display default multi select filter
    const defaultMultiSelectFilter = multiFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(0);
    await expect(defaultMultiSelectFilter).toBeVisible();
    // Verify that display default multi select filter button
    const defaultMultiSelectFilterButton = defaultMultiSelectFilter.locator('button[data-slot="popover-trigger"]');
    await expect(defaultMultiSelectFilterButton).toBeVisible();    
    // Verify that display default multi select filter dropdown content
    await expect(defaultMultiSelectFilter).toContainText('Select products');
    // Verify that display default multi select filter options
    await defaultMultiSelectFilterButton.click();
    const defaultMultiSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').first();
    await expect(defaultMultiSelectContent).toBeVisible();
    // Wait for popover to be stable (helps in headless where positioning can lag)
    await page.waitForTimeout(400);
    // Verify that select options from multi select
    const xmCloudCheckbox = defaultMultiSelectContent.getByRole('checkbox', { name: 'XM Cloud' });
    const sitecoreXmCheckbox = defaultMultiSelectContent.getByRole('checkbox', { name: 'Sitecore XM' });
    await expect(xmCloudCheckbox).toBeVisible();
    await expect(sitecoreXmCheckbox).toBeVisible();
    // JS click avoids "outside viewport" in headless (popover uses fixed positioning)
    await xmCloudCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(xmCloudCheckbox).toBeChecked();
    await sitecoreXmCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(sitecoreXmCheckbox).toBeChecked();
    // Verify that close select dropdown content
    await defaultMultiSelectFilterButton.click();
    await expect(defaultMultiSelectContent).not.toBeVisible();
    // Verify the selected value is displayed
    await expect(defaultMultiSelectFilter).toContainText('Select products:XM Cloud, Sitecore XM');

    // Verify that display badge multi select filter
    const badgeMultiSelectFilter = multiFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(1);
    await expect(badgeMultiSelectFilter).toBeVisible();
    // Verify that display badge multi select filter button
    const badgeMultiSelectFilterButton = badgeMultiSelectFilter.locator('button[data-slot="popover-trigger"]');
    await expect(badgeMultiSelectFilterButton).toBeVisible();    
    // Verify that display badge multi select filter dropdown content
    await expect(badgeMultiSelectFilter).toContainText('Select products');    
    // Verify that display badge multi select filter options
    await badgeMultiSelectFilterButton.click();
    const badgeMultiSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').first();
    await expect(badgeMultiSelectContent).toBeVisible();
    // Wait for popover to be stable (helps in headless where positioning can lag)
    await page.waitForTimeout(400);
    // Verify that select options from multi select
    const CDPCheckbox = badgeMultiSelectContent.getByRole('checkbox', { name: 'CDP' });
    const sitecoreFormCheckbox = badgeMultiSelectContent.getByRole('checkbox', { name: 'Sitecore forms' });
    await expect(CDPCheckbox).toBeVisible();
    await expect(sitecoreFormCheckbox).toBeVisible();
    // JS click avoids "outside viewport" in headless (popover uses fixed positioning)
    await CDPCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(CDPCheckbox).toBeChecked();
    await sitecoreFormCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(sitecoreFormCheckbox).toBeChecked();
    // Close dropdown with Escape to avoid clicking trigger (which can hit CDP checkbox and uncheck it)
    await page.keyboard.press('Escape');
    await expect(badgeMultiSelectContent).not.toBeVisible();
    // Verify the selected value is displayed
    await expect(badgeMultiSelectFilter).toContainText('Select products:CDPSitecore forms');
    // Verify that selected options are displayed as badges
    const CDPbadge = badgeMultiSelectFilter.locator('span[data-slot="badge"]').nth(0);
    await expect(CDPbadge).toBeVisible();
    await expect(CDPbadge).toContainText('CDP');
    const sitecoreFormbadge = badgeMultiSelectFilter.locator('span[data-slot="badge"]').nth(1);
    await expect(sitecoreFormbadge).toBeVisible();
    await expect(sitecoreFormbadge).toContainText('Sitecore forms');
    // Verify that display badge multi select filter button class attributes
    const classListBadge = await CDPbadge.getAttribute('class');
    expect(classListBadge).toContain('whitespace-nowrap');
    expect(classListBadge).toContain('font-normal');
    expect(classListBadge).toContain('bg-neutral-bg');
    expect(classListBadge).toContain('text-neutral-fg');
}