import { test, expect, Page } from '@playwright/test';

export async function testNavigationStackVertical(page: Page){
    // Verify vertical navigation exists
    const verticalNav = page.locator('[id="stack-navigation-vertical"] aside');
    await expect(verticalNav).toBeVisible();

    //Verify that vertical navigation has the expected classes
    const classList = await verticalNav.getAttribute('class');
    expect(classList).toContain('w-[72px]');
    expect(classList).toContain('bg-background');
    expect(classList).toContain('p-1.5');
    expect(classList).toContain('text-sidebar-foreground');
    expect(classList).toContain('min-h-full');
    expect(classList).toContain('flex');
    expect(classList).toContain('flex-col');
    expect(classList).toContain('opacity-100');

    // Verify that display all navigation items in vertical navigation
    const labelHome = verticalNav.locator('[aria-label="Home"]');
    await expect(labelHome).toBeVisible();
    const labelUserManagement = verticalNav.locator('[aria-label="User management"]');
    await expect(labelUserManagement).toBeVisible();
    const labelDocuments = verticalNav.locator('[aria-label="Documents"]');
    await expect(labelDocuments).toBeVisible();
    const labelArchive = verticalNav.locator('[aria-label="Archive"]');
    await expect(labelArchive).toBeVisible();
    const labelSettings = verticalNav.locator('[aria-label="Settings"]');
    await expect(labelSettings).toBeVisible();
}

export async function testNavigationStackHorizontal(page: Page){
    // Verify horizontal navigation exists
    const horizontalNav = page.locator('[id="stack-navigation-horizontal"] aside');
    await expect(horizontalNav).toBeVisible();

    //Verify that horizontal navigation has the expected classes
    const classList = await horizontalNav.getAttribute('class');
    expect(classList).toContain('bg-background');
    expect(classList).toContain('w-full');
    expect(classList).toContain('text-sidebar-foreground');
    expect(classList).toContain('flex');
    expect(classList).toContain('flex-row');
    expect(classList).toContain('items-center');
    expect(classList).toContain('p-1.5');
    expect(classList).toContain('overflow-x-auto');

    // Verify that display all navigation items in horizontal navigation
    const labelHome = horizontalNav.locator('[aria-label="Home"]');
    await expect(labelHome).toBeVisible();
    const labelUserManagement = horizontalNav.locator('[aria-label="User management"]');
    await expect(labelUserManagement).toBeVisible();
    const labelDocuments = horizontalNav.locator('[aria-label="Documents"]');
    await expect(labelDocuments).toBeVisible();
    const labelArchive = horizontalNav.locator('[aria-label="Archive"]');
    await expect(labelArchive).toBeVisible();
    const labelSettings = horizontalNav.locator('[aria-label="Settings"]');
    await expect(labelSettings).toBeVisible();
}

export async function testNavigationStackHorizontalTabs(page: Page){
    // Verify horizontal tabs navigation exists
    const horizontalTabsNav = page.locator('[id="stack-navigation-horizontal-tabs"]');
    await expect(horizontalTabsNav).toBeVisible();

    // Verify that horizontal navigation items exist
    const navigationItems = horizontalTabsNav.locator('aside');
    await expect(navigationItems).toBeVisible();

    //Verify that horizontal navigation has the expected classes
    const classList = await navigationItems.getAttribute('class');
    expect(classList).toContain('bg-background');
    expect(classList).toContain('w-full');
    expect(classList).toContain('text-sidebar-foreground');
    expect(classList).toContain('flex');
    expect(classList).toContain('flex-row');
    expect(classList).toContain('items-center');
    expect(classList).toContain('p-1.5');
    expect(classList).toContain('overflow-x-auto');
    expect(classList).toContain('shadow-none');

    // Verify that horizontal navigation tabs and their contents exist
    const navigationContent = horizontalTabsNav.locator('[class="w-150"]');
    await expect(navigationContent).toBeVisible();

    // Verify that Overview tab is displayed
    await expect(navigationItems.locator('[title="Overview"]')).toBeVisible();
    // Verify that Overview content is displayed
    await expect(navigationContent.locator('p' , {hasText: 'Overview' })).toBeVisible();
    await expect(navigationContent.locator('p' , {hasText: 'This is the overview content. Here you can see a summary of all the important information.' })).toBeVisible();

    // Verify that Versions tab is displayed
    await horizontalTabsNav.getByText('Versions', { exact: false }).click();
    // Verify Versions content is displayed
    await expect(navigationContent.locator('p' , {hasText: 'Versions' })).toBeVisible();
    await expect(navigationContent.locator('p' , {hasText: 'This is the versions content. View and manage different versions of your project.' })).toBeVisible();

    // Click on Usage tab
    await horizontalTabsNav.getByText('Usage', { exact: false }).click();
    // Verify Usage content is displayed
    await expect(navigationContent.locator('p' , {hasText: 'Usage' })).toBeVisible();
    await expect(navigationContent.locator('p',  {hasText: 'This is the usage content. Learn how to use this component effectively.'})).toBeVisible();
}

export async function testNavigationStackColorSchemes(page: Page){
    // Verify Color Schemes navigation stack is exists
    const colorSchemes = page.locator('[id="stack-navigation-color-schemes"]');
    await expect(colorSchemes).toBeVisible();

    // Verify Neutral Color Scheme navigation stack is exists
    const neutralNav = page.locator('[class="flex flex-col gap-3"]').nth(0);
    await expect(neutralNav).toBeVisible();

    //Verify that vertical navigation has the expected classes
    const classListNeutral = await neutralNav.locator('[aria-label="Home"]').getAttribute('class');
    expect(classListNeutral).toContain('flex');
    expect(classListNeutral).toContain('items-center');
    expect(classListNeutral).toContain('rounded-md');
    expect(classListNeutral).toContain('transition-colors');
    expect(classListNeutral).toContain('text-3xs');
    expect(classListNeutral).toContain('font-medium');
    expect(classListNeutral).toContain('no-underline');
    expect(classListNeutral).toContain('bg-neutral-bg');
    expect(classListNeutral).toContain('text-neutral-fg');
    expect(classListNeutral).toContain('hover:bg-neutral-bg');
    expect(classListNeutral).toContain('hover:text-neutral-fg');
    expect(classListNeutral).toContain('active:bg-neutral-200');
    expect(classListNeutral).toContain('active:text-neutral-fg');

    // Verify that display all navigation items in Neutral Color Scheme navigation
    const labelHomeNeutral = neutralNav.locator('[aria-label="Home"]');
    await expect(labelHomeNeutral).toBeVisible();
    const labelUserManagementNeutral = neutralNav.locator('[aria-label="User management"]');
    await expect(labelUserManagementNeutral).toBeVisible();
    const labelDocumentsNeutral = neutralNav.locator('[aria-label="Documents"]');
    await expect(labelDocumentsNeutral).toBeVisible();
    const labelArchiveNeutral = neutralNav.locator('[aria-label="Archive"]');
    await expect(labelArchiveNeutral).toBeVisible();
    const labelSettingsNeutral = neutralNav.locator('[aria-label="Settings"]');
    await expect(labelSettingsNeutral).toBeVisible();

    // Verify Primary Color Scheme navigation stack is exists
    const primaryNav = page.locator('[class="flex flex-col gap-3"]').nth(1);
    await expect(primaryNav).toBeVisible();

    //Verify that vertical navigation has the expected classes
    const classListPrimary = await primaryNav.locator('[aria-label="Home"]').getAttribute('class');
    expect(classListPrimary).toContain('flex');
    expect(classListPrimary).toContain('items-center');
    expect(classListPrimary).toContain('rounded-md');
    expect(classListPrimary).toContain('transition-colors');
    expect(classListPrimary).toContain('text-3xs');
    expect(classListPrimary).toContain('font-medium');
    expect(classListPrimary).toContain('no-underline');
    expect(classListPrimary).toContain('bg-primary-bg');
    expect(classListPrimary).toContain('text-primary-fg');
    expect(classListPrimary).toContain('hover:bg-primary-bg');
    expect(classListPrimary).toContain('hover:text-primary-fg');
    expect(classListPrimary).toContain('active:bg-primary-bg');
    expect(classListPrimary).toContain('active:text-primary-fg');

    // Verify that display all navigation items in Primary Color Scheme navigation
    const labelHomePrimary = primaryNav.locator('[aria-label="Home"]');
    await expect(labelHomePrimary).toBeVisible();
    const labelUserManagementPrimary = primaryNav.locator('[aria-label="User management"]');
    await expect(labelUserManagementPrimary).toBeVisible();
    const labelDocumentsPrimary = primaryNav.locator('[aria-label="Documents"]');
    await expect(labelDocumentsPrimary).toBeVisible();
    const labelArchivePrimary = primaryNav.locator('[aria-label="Archive"]');
    await expect(labelArchivePrimary).toBeVisible();
    const labelSettingsPrimary = primaryNav.locator('[aria-label="Settings"]');
    await expect(labelSettingsPrimary).toBeVisible();
}