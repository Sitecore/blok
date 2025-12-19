import { test, expect, Page } from '@playwright/test';

export async function testSidebar(page: Page){
    // Verify that the sidebar is visible
    const sidebar = page.locator('[data-slot="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify sidebar header is visible
    const sidebarHeader = sidebar.locator('[data-sidebar="header"]');
    await expect(sidebarHeader).toBeVisible();
    await expect(sidebarHeader).toContainText('Navigation');

    // Check sidebar content menu is visible
    const sidebarContentMenu = sidebar.locator('[data-sidebar="content"]').locator('[data-sidebar="menu"]');
    await expect(sidebarContentMenu).toBeVisible();

    // Verify that display all menu items with correct details
    const menuItems = sidebarContentMenu.locator('[data-sidebar="menu-item"]');

    // Check Home menu item
    const homeButton = menuItems.first().locator('[data-sidebar="menu-button"]');
    await expect(homeButton).toContainText('Home');
    await expect(homeButton).toBeEnabled();
    await expect(homeButton).toHaveAttribute('data-active', 'true');
    // Verify that the Home menu item color is primary
    await expect(homeButton).toHaveCSS('color', 'rgb(83, 25, 224)');
    // Verify that the Home menu item has an icon
    const homeIcon = homeButton.locator('svg');
    await expect(homeIcon).toBeVisible();

    // Check Profile menu item
    const profileButton = menuItems.nth(1).locator('[data-sidebar="menu-button"]');
    await expect(profileButton).toContainText('Profile');
    await expect(profileButton).toBeEnabled();
    await expect(profileButton).toHaveAttribute('data-active', 'false');
    // Verify that the Profile menu item color is changed when hovered
    await homeButton.hover();
    await expect(profileButton).toHaveCSS('color', 'rgba(0, 0, 0, 0.68)');
    // Verify that the Profile menu item has an icon
    const profileIcon = profileButton.locator('svg');
    await expect(profileIcon).toBeVisible();

    // Check Settings menu item
    const settingsButton = menuItems.nth(2).locator('[data-sidebar="menu-button"]');
    await expect(settingsButton).toContainText('Settings');
    await expect(settingsButton).toBeEnabled();
    await expect(settingsButton).toHaveAttribute('data-active', 'false');
    // Verify that the Settings menu item has an icon
    const settingsIcon = settingsButton.locator('svg');
    await expect(settingsIcon).toBeVisible();
}
