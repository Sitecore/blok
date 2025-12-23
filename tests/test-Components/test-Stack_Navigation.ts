import { test, expect, Page } from '@playwright/test';

export async function testStackNavigationVertical(page: Page){
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
    expect(classList).toContain('shadow-base');

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

export async function testStackNavigationHorizontal(page: Page){
    // Verify horizontal navigation exists
    const horizontalNav = page.locator('[id="stack-navigation-horizontal"] aside');
    await expect(horizontalNav).toBeVisible();

    //Verify that horizontal navigation has the expected classes
    const classList = await horizontalNav.getAttribute('class');
    expect(classList).toContain('bg-background');
    expect(classList).toContain('w-full');
    expect(classList).toContain('text-sidebar-foreground');
    expect(classList).toContain('shadow-base');
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

export async function testStackNavigationHorizontalTabs(page: Page){
    // Verify horizontal tabs navigation exists
    const horizontalTabsNav = page.locator('[id="stack-navigation-horizontal-tabs"]');
    await expect(horizontalTabsNav).toBeVisible();

    // Verify that horizontal navigation items exist
    const navigationItems = horizontalTabsNav.locator('[class="border-b"] aside');
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
    const navigationContent = horizontalTabsNav.locator('[class="w-full"]');
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