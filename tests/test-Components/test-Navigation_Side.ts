import { test, expect, Page } from '@playwright/test';

export async function testNavigationSide(page: Page){
    // Verify that the Navigation(Side) is visible
    const sidebar = page.locator('[data-slot="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify that the Navigation(Side) has the correct classes
    const sidebarClasses = await sidebar.getAttribute('class');
    expect(sidebarClasses).toContain('text-sidebar-foreground');
    expect(sidebarClasses).toContain('h-full');
    expect(sidebarClasses).toContain('flex-col');
    expect(sidebarClasses).toContain('w-64');
    expect(sidebarClasses).toContain('px-2');
    expect(sidebarClasses).toContain('py-6');

    // Verify Navigation(Side) header is visible
    const sidebarHeader = sidebar.locator('[data-sidebar="header"]');
    await expect(sidebarHeader).toBeVisible();
    await expect(sidebarHeader).toContainText('Navigation');

    // Verify that the Header has the correct classes
    const headerClasses = await sidebarHeader.locator('div').getAttribute('class');
    expect(headerClasses).toContain('py-1.5');
    expect(headerClasses).toContain('text-sm');
    expect(headerClasses).toContain('font-semibold');
    expect(headerClasses).toContain('uppercase');
    expect(headerClasses).toContain('text-subtle-text');

    // Check Navigation(Side) content menu is visible
    const sidebarContentMenu = sidebar.locator('[data-sidebar="content"]').locator('[data-sidebar="menu"]');
    await expect(sidebarContentMenu).toBeVisible();

    // Verify that display all menu items with correct details
    const menuItems = sidebarContentMenu.locator('[data-sidebar="menu-item"]');

    // Check Home menu item
    const homeButton = menuItems.first().locator('[data-sidebar="menu-button"]');
    await expect(homeButton).toContainText('Home');
    await expect(homeButton).toBeEnabled();
    await expect(homeButton).toHaveAttribute('data-active', 'true');
    // Verify that the Home menu item has an icon
    const homeIcon = homeButton.locator('svg');
    await expect(homeIcon).toBeVisible();

    // Check the color of the Home menu item when selected
    const homeClasses = await homeButton.getAttribute('class');
    expect(homeClasses).toContain('text-left');
    expect(homeClasses).toContain('outline-hidden');
    expect(homeClasses).toContain('data-[active=true]:bg-primary-bg');
    expect(homeClasses).toContain('data-[active=true]:text-primary-fg');
    expect(homeClasses).toContain('h-10');

    // Check Profile menu item
    const profileButton = menuItems.nth(1).locator('[data-sidebar="menu-button"]');
    await expect(profileButton).toContainText('Profile');
    await expect(profileButton).toBeEnabled();
    await expect(profileButton).toHaveAttribute('data-active', 'false');
    // Verify that the Profile menu item has an icon
    const profileIcon = profileButton.locator('svg');
    await expect(profileIcon).toBeVisible();

    // Check the color of the Profile menu item when hovered
    const profileClasses = await profileButton.getAttribute('class');
    expect(profileClasses).toContain('text-left');
    expect(profileClasses).toContain('text-neutral-fg');
    expect(profileClasses).toContain('hover:bg-neutral-bg');
    expect(profileClasses).toContain('h-10');
    expect(profileClasses).toContain('outline-hidden');

    // Check Settings menu item
    const settingsButton = menuItems.nth(2).locator('[data-sidebar="menu-button"]');
    await expect(settingsButton).toContainText('Settings');
    await expect(settingsButton).toBeEnabled();
    await expect(settingsButton).toHaveAttribute('data-active', 'false');
    // Verify that the Settings menu item has an icon
    const settingsIcon = settingsButton.locator('svg');
    await expect(settingsIcon).toBeVisible();

    // Check the color of the Settings menu item when hovered
    const settingsClasses = await settingsButton.getAttribute('class');
    expect(settingsClasses).toContain('text-left');
    expect(settingsClasses).toContain('text-neutral-fg');
    expect(settingsClasses).toContain('outline-hidden');
    expect(settingsClasses).toContain('hover:bg-neutral-bg');
    expect(settingsClasses).toContain('h-10');
}
