import { test, expect, Page } from '@playwright/test';

export async function testInputGroupSearch(page: Page){
    // Verify that display input group search component
    const inputGroup = page.locator('#inputGroup-search');
    await expect(inputGroup).toBeVisible();

    // Verify that display search input
    const searchInput = inputGroup.locator('[data-slot="input-group"]');
    await expect(searchInput).toBeVisible();
    // Verify that search input has the expected classes
    const searchInputClasses = await searchInput.getAttribute('class');
    expect(searchInputClasses).toContain('border-input');
    expect(searchInputClasses).toContain('rounded-md');
    expect(searchInputClasses).toContain('border');
    expect(searchInputClasses).toContain('shadow-xs');
    expect(searchInputClasses).toContain('outline-none');
    expect(searchInputClasses).toContain('h-9');
    expect(searchInputClasses).toContain('min-w-0');

    // Verify that display input section
    const inputSection = inputGroup.locator('[data-slot="input-group-control"]');
    await expect(inputSection).toBeVisible();
    //Verify that input section has placeholder text
    await expect(inputSection).toHaveAttribute('placeholder', 'Search...');
    // Verify that input section has the expected classes
    const inputSectionClasses = await inputSection.getAttribute('class');
    expect(inputSectionClasses).toContain('placeholder:text-muted-foreground');
    expect(inputSectionClasses).toContain('selection:bg-primary');
    expect(inputSectionClasses).toContain('selection:text-inverse-text');
    expect(inputSectionClasses).toContain('text-md');
    expect(inputSectionClasses).toContain('w-full');
    expect(inputSectionClasses).toContain('font-regular');
    expect(inputSectionClasses).toContain('placeholder-blackAlpha-400');

    // Verify that display input group search icon
    const searchIcon = inputGroup.locator('[data-slot="input-group-addon"]').nth(0);
    await expect(searchIcon).toBeVisible();
    // Verify that input nput group search icon has the expected classes
    const searchIconClasses = await searchIcon.getAttribute('class');
    expect(searchIconClasses).toContain('text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none');

    // Verify that display input group results text
    const resultsText = inputGroup.locator('[data-slot="input-group-addon"]').nth(1);
    await expect(resultsText).toBeVisible();
    // Verify that input group results text has text
    const resultsTextText = await resultsText.textContent();
    expect(resultsTextText).toContain('12 results');
    // Verify that input group results text has the expected classes
    const resultsTextClasses = await resultsText.getAttribute('class');
    expect(resultsTextClasses).toContain('text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none');

    // Verify the input contains the typed text
    await expect(inputSection).toHaveValue('');
    await inputSection.fill('Blokcn Team');
    await expect(inputSection).toHaveValue('Blokcn Team');

    // Verify that clear input value
    await inputSection.clear();
    await expect(inputSection).toHaveValue('');
}

export async function testInputGroupURL(page: Page){
    // Verify that display input group URL component
    const inputGroup = page.locator('#inputGroup-url');
    await expect(inputGroup).toBeVisible();

    // Verify that display URL input
    const searchInput = inputGroup.locator('[data-slot="input-group"]');
    await expect(searchInput).toBeVisible();
    // Verify that URL input has the expected classes
    const searchInputClasses = await searchInput.getAttribute('class');
    expect(searchInputClasses).toContain('border-input');
    expect(searchInputClasses).toContain('rounded-md');
    expect(searchInputClasses).toContain('border');
    expect(searchInputClasses).toContain('shadow-xs');
    expect(searchInputClasses).toContain('outline-none');
    expect(searchInputClasses).toContain('h-9');
    expect(searchInputClasses).toContain('min-w-0');

    // Verify that display URL input section
    const inputSection = inputGroup.locator('[data-slot="input-group-control"]');
    await expect(inputSection).toBeVisible();
    //Verify that input section has placeholder text
    await expect(inputSection).toHaveAttribute('placeholder', 'example.com');
    // Verify that input section has the expected classes
    const inputSectionClasses = await inputSection.getAttribute('class');
    expect(inputSectionClasses).toContain('placeholder:text-muted-foreground');
    expect(inputSectionClasses).toContain('selection:bg-primary');
    expect(inputSectionClasses).toContain('selection:text-inverse-text');
    expect(inputSectionClasses).toContain('text-md');
    expect(inputSectionClasses).toContain('w-full');
    expect(inputSectionClasses).toContain('font-regular');
    expect(inputSectionClasses).toContain('placeholder-blackAlpha-400');

    // Verify that display input group scheme
    const searchIcon = inputGroup.locator('[data-slot="input-group-addon"]').nth(0);
    await expect(searchIcon).toBeVisible();
    // Verify that input group scheme has text
    const searchIconText = await searchIcon.textContent();
    expect(searchIconText).toContain('https://');
    // Verify that input nput group scheme has the expected classes
    const searchIconClasses = await searchIcon.getAttribute('class');
    expect(searchIconClasses).toContain('text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none');

    // Verify that display input group tooltip icon
    const tooltipIcon = inputGroup.locator('[data-slot="input-group-addon"]').nth(1);
    await expect(tooltipIcon).toBeVisible();
    const tooltip = tooltipIcon.locator('[data-slot="tooltip-trigger"]');
    await expect(tooltip).toBeVisible();
    // Verify that input group tooltip has text
    // Hover over the tooltip icon
    await tooltip.hover();
    // Verify that tooltip text is visible
    const tooltipText = page.getByText('This is content in a tooltip.');
    await expect(tooltipText).toBeVisible();
    // Verify that input group tooltip has the expected classes
    const tooltipClasses = await tooltip.getAttribute('class');
    expect(tooltipClasses).toContain('justify-center');
    expect(tooltipClasses).toContain('whitespace-nowrap');
    expect(tooltipClasses).toContain('shrink-0');
    expect(tooltipClasses).toContain('font-semibold');
    expect(tooltipClasses).toContain('cursor-pointer');
    expect(tooltipClasses).toContain('bg-transparent');
    expect(tooltipClasses).toContain('min-w-10');
    expect(tooltipClasses).toContain('text-neutral-fg');
    expect(tooltipClasses).toContain('hover:bg-neutral-bg');
    expect(tooltipClasses).toContain('hover:text-neutral-fg');

    // Verify the input contains the typed text
    await expect(inputSection).toHaveValue('');
    await inputSection.fill('Blokcn.com');
    await expect(inputSection).toHaveValue('Blokcn.com');

    // Verify that clear input value
    await inputSection.clear();
    await expect(inputSection).toHaveValue('');
}

export async function testInputGroupDropdown(page: Page){
    // Verify that display input group dropdown component
    const inputGroup = page.locator('#inputGroup-dropdown');
    await expect(inputGroup).toBeVisible();

    // Verify that display file type dropdown input
    const fileTypeInput = inputGroup.locator('[data-slot="input-group"]').nth(0);
    await expect(fileTypeInput).toBeVisible();
    // Verify that display file type input section
    const fileTypeInputSection = fileTypeInput.locator('[data-slot="input-group-control"]');
    await expect(fileTypeInputSection).toBeVisible();
    //Verify that file type input section has placeholder text
    await expect(fileTypeInputSection).toHaveAttribute('placeholder', 'Enter file name');
    // Verify that display input group file type dropdown button
    const fileTypeDropdownButton = inputGroup.locator('[data-slot="input-group-addon"]').nth(0);
    await expect(fileTypeDropdownButton).toBeVisible();
    // Verify that input group file type dropdown button has the expected classes
    const fileTypeDropdownButtonClasses = await fileTypeDropdownButton.getAttribute('class');
    expect(fileTypeDropdownButtonClasses).toContain('text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none');
    // Verify that open input group file type dropdown menu when dropdown button is clicked
    const fileTypeDropdownTrigger = fileTypeDropdownButton.locator('[data-slot="dropdown-menu-trigger"]');
    await fileTypeDropdownTrigger.click();
    // Verify that display input group file type dropdown menu
    const fileTypeDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]');
    await expect(fileTypeDropdownMenu).toBeVisible();
    // Verify that display input group file type dropdown menu items
    await expect(fileTypeDropdownMenu.getByText('Settings')).toBeVisible();
    await expect(fileTypeDropdownMenu.getByText('Copy path')).toBeVisible();
    await expect(fileTypeDropdownMenu.getByText('Open location')).toBeVisible();
    // Close the file type dropdown before opening the query type dropdown
    await page.keyboard.press('Escape');
    await expect(fileTypeDropdownMenu).not.toBeVisible({ timeout: 2000 });

    // Verify that display query type dropdown input
    const queryTypeInput = inputGroup.locator('[data-slot="input-group"]').nth(1);
    await expect(queryTypeInput).toBeVisible();
    // Verify that display query type input section
    const queryTypeInputSection = queryTypeInput.locator('[data-slot="input-group-control"]');
    await expect(queryTypeInputSection).toBeVisible();
    //Verify that query type input section has placeholder text
    await expect(queryTypeInputSection).toHaveAttribute('placeholder', 'Enter search query');
    // Verify that display input group query type dropdown button
    const queryTypeDropdownButton = inputGroup.locator('[data-slot="input-group-addon"]').nth(1);
    await expect(queryTypeDropdownButton).toBeVisible();
    // Verify that input group query type dropdown button has the expected classes
    const queryTypeDropdownButtonClasses = await queryTypeDropdownButton.getAttribute('class');
    expect(queryTypeDropdownButtonClasses).toContain('text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none');
    // Verify that open input group query type dropdown menu when dropdown button is clicked
    const queryTypeDropdownTrigger = queryTypeDropdownButton.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(queryTypeDropdownTrigger.getByText('Search In... ')).toBeVisible();
    await queryTypeDropdownTrigger.click();

    // Verify that display input group query type dropdown menu
    const queryTypeDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]');
    await expect(queryTypeDropdownMenu).toBeVisible();
    // Verify that display input group query type dropdown menu items
    await expect(queryTypeDropdownMenu.getByText('Documentation')).toBeVisible();
    await expect(queryTypeDropdownMenu.getByText('Blog Posts')).toBeVisible();
    await expect(queryTypeDropdownMenu.getByText('Changelog')).toBeVisible();
}