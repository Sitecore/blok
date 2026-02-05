import { test, expect, Page } from '@playwright/test';

export async function testFilterDefault(page: Page){
    // Verify that default filter section is visible
    const defaultFilter = page.locator('[id="filter-default"]');
    await expect(defaultFilter).toBeVisible();

    // Verify that display filter input
    const filterInput = defaultFilter.locator('[class="relative w-64"]');
    await expect(filterInput).toBeVisible();
    // Verify that display filter search icon
    const filterInputIcon = filterInput.locator('svg');
    await expect(filterInputIcon).toBeVisible();
    // Verify that display filter search input 
    const inputSearch = filterInput.locator('input[data-slot="input"][aria-label="Search"]');
    await expect(inputSearch).toBeVisible();
    await expect(inputSearch).toHaveAttribute('type', 'text');
    await expect(inputSearch).toHaveAttribute('placeholder', 'Search...');
    // Verify that typing in search updates value in the input
    await inputSearch.fill('test query');
    await expect(inputSearch).toHaveValue('test query');
    // Verify that clear search button is visible
    const closeButton = filterInput.locator('button[data-slot="button"][aria-label="Clear search"]');
    await expect(closeButton).toBeVisible();

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

    // Verify that display toggle filter
    const toggleFilter = defaultFilter.locator('[class="inline-flex flex-col"]');
    await expect(toggleFilter).toBeVisible();
    // Verify that display toggle filter button
    const toggleFilterButton = toggleFilter.locator('button[data-slot="button"]');
    await expect(toggleFilterButton).toBeVisible();
    // Verify that display toggle filter content
    await expect(toggleFilter).toContainText('Assigned to me');
    await expect(toggleFilterButton).toHaveAttribute('aria-pressed', 'false');
    // Verify that display toggle filter toggle
    await toggleFilterButton.click();
    await expect(toggleFilterButton).toHaveAttribute('aria-pressed', 'true');
    await expect(toggleFilterButton.locator('span[role="button"]')).toHaveAttribute('aria-label', 'Remove Assigned to me filter');

    // Verify that Clear all filter is visible
    const clearAllFilter = defaultFilter.locator('[data-slot="button"]').nth(4);
    await expect(clearAllFilter).toBeVisible();
    // Verify that display toggle filter content
    await expect(clearAllFilter).toContainText('Clear all');

    // Verify that when click clear all filter, all filters are cleared
    await clearAllFilter.click();
    // Verify that default filter is cleared
    await expect(inputSearch).not.toHaveValue('test query');
    await expect(closeButton).not.toBeVisible();
    // Verify that single select filter is cleared
    await expect(singleFilter).not.toContainText('Select a product:XM Cloud');
    // Verify that multi select filter is cleared
    await expect(multiSelectFilter).not.toContainText('Select products:XM Cloud, Sitecore XM');
    // Verify that toggle filter is cleared
    await expect(toggleFilterButton).toHaveAttribute('aria-pressed', 'false');
}

export async function testFilterInput(page: Page){
    // Verify that input filter section is visible
    const inputFilter = page.locator('[id="filter-input"]');
    await expect(inputFilter).toBeVisible();

    // Verify that display input filter search icon
    const filterInputIcon = inputFilter.locator('svg');
    await expect(filterInputIcon).toBeVisible();

    // Verify that display input filter search input 
    const inputSearch = inputFilter.locator('input[data-slot="input"][aria-label="Search"]');
    await expect(inputSearch).toBeVisible();
    await expect(inputSearch).toHaveAttribute('type', 'text');
    await expect(inputSearch).toHaveAttribute('placeholder', 'Search...');

    // Verify that typing in search updates value in the input
    await inputSearch.fill('test query');
    await expect(inputSearch).toHaveValue('test query');

    // Verify that clear search button is visible
    const closeButton = inputFilter.locator('button[data-slot="button"][aria-label="Clear search"]');
    await expect(closeButton).toBeVisible();

    // Verify that clear search button clears the input
    await closeButton.click();
    await expect(inputSearch).toHaveValue('');
    await expect(closeButton).not.toBeVisible();
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

    // Verify that display primary single filter
    const primarySingleFilter = singleFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(1);
    await expect(primarySingleFilter).toBeVisible();
    await expect(primarySingleFilter).toContainText('Select a product');
    // Verify that display default single filter button
    const primaryFilterButton = primarySingleFilter.locator('button[data-slot="select-trigger"]');
    await expect(primaryFilterButton).toBeVisible();
    // Verify that display default single filter dropdown content
    await expect(primarySingleFilter).toContainText('Select a product');
    // Verify that display default single filter options
    await primaryFilterButton.click();
    const primarySelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(defaultSelectContent).toBeVisible();
    // Verify the group label is visible
    await expect(primarySelectContent.getByText('Products')).toBeVisible();
    // Verify options are visible
    await expect(primarySelectContent.getByRole('option', { name: 'XM Cloud' })).toBeVisible();
    await expect(primarySelectContent.getByRole('option', { name: 'Content Hub' })).toBeVisible();
    await expect(primarySelectContent.getByRole('option', { name: 'CDP' })).toBeVisible();
    await expect(primarySelectContent.getByRole('option', { name: 'Blok' })).toBeVisible();
    // Verify that select an option from default single filter dropdown content
    // Select "Content Hub"
    await primarySelectContent.getByRole('option', { name: 'Content Hub' }).click();
    // Verify the selected value is displayed
    await expect(primarySingleFilter).toContainText('Select a product:Content Hub');
    // Verify that close select dropdown content
    await expect(primarySelectContent).not.toBeVisible();
    // Verify that clear selection button is visible for primary single filter
    const primaryClearButton = primarySingleFilter.locator('button[data-slot="button"][aria-label="Clear selection"]');
    await expect(primaryClearButton).toBeVisible();
    // Verify that display primary single filter button class attributes
    const classList = await primaryFilterButton.getAttribute('class');
    expect(classList).toContain('overflow-hidden');
    expect(classList).toContain('bg-primary-bg');
    expect(classList).toContain('text-primary-fg');
    expect(classList).toContain('border-primary');
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

    // Verify that display primary multi select filter
    const primaryMultiSelectFilter = multiFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(1);
    await expect(primaryMultiSelectFilter).toBeVisible();
    // Verify that display primary multi select filter button
    const primaryMultiSelectFilterButton = primaryMultiSelectFilter.locator('button[data-slot="popover-trigger"]');
    await expect(primaryMultiSelectFilterButton).toBeVisible();    
    // Verify that display primary multi select filter dropdown content
    await expect(primaryMultiSelectFilter).toContainText('Select products');    
    // Verify that display primary multi select filter options
    await primaryMultiSelectFilterButton.click();
    const primaryMultiSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').first();
    await expect(primaryMultiSelectContent).toBeVisible();
    // Wait for popover to be stable (helps in headless where positioning can lag)
    await page.waitForTimeout(400);
    // Verify that select options from multi select
    const contentHubCheckbox = primaryMultiSelectContent.getByRole('checkbox', { name: 'Content Hub' });
    const personalizeCheckbox = primaryMultiSelectContent.getByRole('checkbox', { name: 'Personalize' });
    await expect(contentHubCheckbox).toBeVisible();
    await expect(personalizeCheckbox).toBeVisible();
    // JS click avoids "outside viewport" in headless (popover uses fixed positioning)
    await contentHubCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(contentHubCheckbox).toBeChecked();
    await personalizeCheckbox.evaluate((el: HTMLElement) => el.click());
    await expect(personalizeCheckbox).toBeChecked();
    // Verify that close select dropdown content
    await primaryMultiSelectFilterButton.click();
    await expect(primaryMultiSelectContent).not.toBeVisible();
    // Verify the selected value is displayed
    await expect(primaryMultiSelectFilter).toContainText('Select products:Content Hub, Personalize');
    // Verify that display primary multi select filter button class attributes
    const classListPrimary = await primaryMultiSelectFilterButton.getAttribute('class');
    expect(classListPrimary).toContain('overflow-hidden');
    expect(classListPrimary).toContain('bg-primary-bg');
    expect(classListPrimary).toContain('text-primary-fg');
    expect(classListPrimary).toContain('border-primary');

    // Verify that display badge multi select filter
    const badgeMultiSelectFilter = multiFilter.locator('[class="relative inline-flex w-fit flex-col"]').nth(2);
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
    expect(classListBadge).toContain('overflow-hidden');
    expect(classListBadge).toContain('bg-primary-bg');
    expect(classListBadge).toContain('text-primary-fg');
}

export async function testFilterToggle(page: Page){
    // Verify that toggle filter section is visible
    const toggleFilterSection = page.locator('[id="filter-toggle"]');
    await expect(toggleFilterSection).toBeVisible(); 

    // Verify that display default toggle filter
    const defaultToggleFilter = toggleFilterSection.locator('[class="inline-flex flex-col"]').nth(0);
    await expect(defaultToggleFilter).toBeVisible();
    // Verify that display default toggle filter button
    const defaultToggleFilterButton = defaultToggleFilter.locator('button[data-slot="button"]');
    await expect(defaultToggleFilterButton).toBeVisible();
    // Verify that display default toggle filter content
    await expect(defaultToggleFilter).toContainText('Assigned to me');
    await expect(defaultToggleFilterButton).toHaveAttribute('aria-pressed', 'false');
    // Verify that display default toggle filter toggle
    await defaultToggleFilterButton.click();
    await expect(defaultToggleFilterButton).toHaveAttribute('aria-pressed', 'true');
    // Verify that display default toggle filter button class attributes
    const classListDefault = await defaultToggleFilterButton.getAttribute('class');
    expect(classListDefault).toContain('text-neutral-fg');
    expect(classListDefault).toContain('bg-neutral-bg');

    // Verify that display primary toggle filter
    const primaryToggleFilter = toggleFilterSection.locator('[class="inline-flex flex-col"]').nth(1);
    await expect(primaryToggleFilter).toBeVisible();
    // Verify that display primary toggle filter button
    const primaryToggleFilterButton = primaryToggleFilter.locator('button[data-slot="button"]');
    await expect(primaryToggleFilterButton).toBeVisible();
    // Verify that display primary toggle filter content
    await expect(primaryToggleFilter).toContainText('Assigned to me');
    await expect(primaryToggleFilterButton).toHaveAttribute('aria-pressed', 'false');
    // Verify that display primary toggle filter toggle
    await primaryToggleFilterButton.click();
    await expect(primaryToggleFilterButton).toHaveAttribute('aria-pressed', 'true');
    await expect(primaryToggleFilterButton.locator('span[role="button"]')).toHaveAttribute('aria-label', 'Remove Assigned to me filter');
    // Verify that display primary toggle filter button class attributes
    const classListPrimary = await primaryToggleFilterButton.getAttribute('class');
    expect(classListPrimary).toContain('bg-primary-bg');
    expect(classListPrimary).toContain('text-primary-fg');
    expect(classListPrimary).toContain('border-primary');
}