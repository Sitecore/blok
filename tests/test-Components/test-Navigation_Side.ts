import { test, expect, Page } from '@playwright/test';

export async function testNavigationSidePreview(page: Page){
    // Verify that the Navigation(Side) is visible
    const sidebarPreview = page.locator('[id="side-preview"]');
    await expect(sidebarPreview).toBeVisible();

    // Verify that the Navigation(Side) sidebar is visible
    const sidebar = sidebarPreview.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify that the Navigation(Side) sidebar group is visible
    const sidebarGroup = sidebar.locator('[data-slot="sidebar-group"]');
    await expect(sidebarGroup).toBeVisible();

    // Verify Navigation(Side) group label is visible
    const sidebarGroupLabel = sidebarGroup.locator('[data-slot="sidebar-group-label"]');
    await expect(sidebarGroupLabel).toBeVisible();
    await expect(sidebarGroupLabel).toContainText('Navigation');

    // Verify that the Group Label has the correct classes
    const LabelClasses = await sidebarGroupLabel.getAttribute('class');
    expect(LabelClasses).toContain('rounded-md');
    expect(LabelClasses).toContain('text-sm');
    expect(LabelClasses).toContain('font-semibold');
    expect(LabelClasses).toContain('text-subtle-text');
    expect(LabelClasses).toContain('uppercase');

    // Verify that the Group Content is visible
    const sidebarGroupContent = sidebarGroup.locator('[data-slot="sidebar-group-content"]');
    await expect(sidebarGroupContent).toBeVisible();

    // Check Navigation(Side) content menu is visible
    const sidebarContentMenu = sidebarGroupContent.locator('[data-slot="sidebar-menu"][data-sidebar="menu"]');
    await expect(sidebarContentMenu).toBeVisible();

    // Verify that display all menu items with correct details
    const menuItems = sidebarContentMenu.locator('[data-slot="sidebar-menu-item"][data-sidebar="menu-item"]');

    // Check Home menu item
    const homeButton = menuItems.first().locator('[data-slot="sidebar-menu-button"]');
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

    // Check Profile menu item
    const profileButton = menuItems.nth(1).locator('[data-slot="sidebar-menu-button"]');
    await expect(profileButton).toContainText('Profile');
    await expect(profileButton).toBeEnabled();
    await expect(profileButton).toHaveAttribute('data-active', 'false');
    // Verify that the Profile menu item has an icon
    const profileIcon = profileButton.locator('svg');
    await expect(profileIcon).toBeVisible();

    // Check the color of the Profile menu item when hovered
    const profileClasses = await profileButton.getAttribute('class');
    expect(profileClasses).toContain('text-left');
    expect(profileClasses).toContain('font-medium');
    expect(profileClasses).toContain('text-neutral-fg');
    expect(profileClasses).toContain('hover:bg-(--color-neutral-100)');
    expect(profileClasses).toContain('hover:text-neutral-fg');

    // Check Settings menu item
    const settingsButton = menuItems.nth(2).locator('[data-slot="sidebar-menu-button"]');
    await expect(settingsButton).toContainText('Settings');
    await expect(settingsButton).not.toBeEnabled();
    await expect(settingsButton).toHaveAttribute('data-active', 'false');
    // Verify that the Settings menu item has an icon
    const settingsIcon = settingsButton.locator('svg');
    await expect(settingsIcon).toBeVisible();

    // Check the color of the Settings menu item when hovered
    const settingsClasses = await settingsButton.getAttribute('class');
    expect(settingsClasses).toContain('text-left');
    expect(settingsClasses).toContain('text-neutral-fg');
    expect(settingsClasses).toContain('outline-hidden');
}

export async function testNavigationSideDefault(page: Page){
    // Verify that the Navigation(Side) default is visible
    const sidebarDefault = page.locator('[id="side-default"]');
    await expect(sidebarDefault).toBeVisible();

    // Verify that the Navigation(Side) sidebar is visible
    const sidebar = sidebarDefault.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify that the Group Content is visible
    const sidebarGroupContent = sidebar.locator('[data-slot="sidebar-content"]');
    await expect(sidebarGroupContent).toBeVisible();

    // Check Navigation(Side) content menu is visible
    const sidebarContentMenu = sidebarGroupContent.locator('[data-slot="sidebar-menu"][data-sidebar="menu"]');
    await expect(sidebarContentMenu).toBeVisible();

    // Verify that display all menu items with correct details
    const menuItems = sidebarContentMenu.locator('[data-slot="sidebar-menu-item"][data-sidebar="menu-item"]');

    // Check Home menu item
    const homeButton = menuItems.first().locator('[data-slot="sidebar-menu-button"]');
    await expect(homeButton).toContainText('Home');
    await expect(homeButton).toBeEnabled();
    await expect(homeButton).toHaveAttribute('data-active', 'true');

    // Check the color of the Home menu item when selected
    const homeClasses = await homeButton.getAttribute('class');
    expect(homeClasses).toContain('text-left');
    expect(homeClasses).toContain('outline-hidden');
    expect(homeClasses).toContain('data-[active=true]:bg-primary-bg');
    expect(homeClasses).toContain('data-[active=true]:text-primary-fg');

    // Check Profile menu item
    const profileButton = menuItems.nth(1).locator('[data-slot="sidebar-menu-button"]');
    await expect(profileButton).toContainText('Profile');
    await expect(profileButton).toBeEnabled();
    await expect(profileButton).toHaveAttribute('data-active', 'false');

    // Check the color of the Profile menu item when hovered
    const profileClasses = await profileButton.getAttribute('class');
    expect(profileClasses).toContain('text-left');
    expect(profileClasses).toContain('font-medium');
    expect(profileClasses).toContain('text-neutral-fg');
    expect(profileClasses).toContain('hover:bg-(--color-neutral-100)');
    expect(profileClasses).toContain('hover:text-neutral-fg');

    // Check Settings menu item
    const settingsButton = menuItems.nth(2).locator('[data-slot="sidebar-menu-button"]');
    await expect(settingsButton).toContainText('Settings');
    await expect(settingsButton).not.toBeEnabled();
    await expect(settingsButton).toHaveAttribute('data-active', 'false');

    // Check the color of the Settings menu item when hovered
    const settingsClasses = await settingsButton.getAttribute('class');
    expect(settingsClasses).toContain('text-left');
    expect(settingsClasses).toContain('text-neutral-fg');
    expect(settingsClasses).toContain('outline-hidden');
}

export async function testNavigationSideLeadingIcon(page: Page){
    // Verify that the Navigation(Side) leading icon is visible
    const sidebarLeadingIcon = page.locator('[id="side-leading-icon"]');
    await expect(sidebarLeadingIcon).toBeVisible();

    // Verify that the Navigation(Side) sidebar is visible
    const sidebar = sidebarLeadingIcon.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify that the Group Content is visible
    const sidebarGroupContent = sidebar.locator('[data-slot="sidebar-content"]');
    await expect(sidebarGroupContent).toBeVisible();

    // Check Navigation(Side) content menu is visible
    const sidebarContentMenu = sidebarGroupContent.locator('[data-slot="sidebar-menu"][data-sidebar="menu"]');
    await expect(sidebarContentMenu).toBeVisible();

    // Verify that display all menu items with correct details
    const menuItems = sidebarContentMenu.locator('[data-slot="sidebar-menu-item"][data-sidebar="menu-item"]');

    // Check Home menu item
    const homeButton = menuItems.first().locator('[data-slot="sidebar-menu-button"]');
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

    // Check Profile menu item
    const profileButton = menuItems.nth(1).locator('[data-slot="sidebar-menu-button"]');
    await expect(profileButton).toContainText('Profile');
    await expect(profileButton).toBeEnabled();
    await expect(profileButton).toHaveAttribute('data-active', 'false');
    // Verify that the Profile menu item has an icon
    const profileIcon = profileButton.locator('svg');
    await expect(profileIcon).toBeVisible();

    // Check the color of the Profile menu item when hovered
    const profileClasses = await profileButton.getAttribute('class');
    expect(profileClasses).toContain('text-left');
    expect(profileClasses).toContain('font-medium');
    expect(profileClasses).toContain('text-neutral-fg');
    expect(profileClasses).toContain('hover:bg-(--color-neutral-100)');
    expect(profileClasses).toContain('hover:text-neutral-fg');

    // Check Settings menu item
    const settingsButton = menuItems.nth(2).locator('[data-slot="sidebar-menu-button"]');
    await expect(settingsButton).toContainText('Settings');
    await expect(settingsButton).not.toBeEnabled();
    await expect(settingsButton).toHaveAttribute('data-active', 'false');
    // Verify that the Settings menu item has an icon
    const settingsIcon = settingsButton.locator('svg');
    await expect(settingsIcon).toBeVisible();

    // Check the color of the Settings menu item when hovered
    const settingsClasses = await settingsButton.getAttribute('class');
    expect(settingsClasses).toContain('text-left');
    expect(settingsClasses).toContain('text-neutral-fg');
    expect(settingsClasses).toContain('outline-hidden');
}

export async function testNavigationSideTrailingIcon(page: Page){
    // Verify that the Navigation(Side) trailing icon is visible
    const sidebarTrailingIcon = page.locator('[id="side-trailing-icon"]');
    await expect(sidebarTrailingIcon).toBeVisible();

    // Verify that the Navigation(Side) sidebar is visible
    const sidebar = sidebarTrailingIcon.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify that the Group Content is visible
    const sidebarGroupContent = sidebar.locator('[data-slot="sidebar-content"]');
    await expect(sidebarGroupContent).toBeVisible();

    // Check Navigation(Side) content menu is visible
    const sidebarContentMenu = sidebarGroupContent.locator('[data-slot="sidebar-menu"][data-sidebar="menu"]');
    await expect(sidebarContentMenu).toBeVisible();

    // Verify that display all menu items with correct details
    const menuItems = sidebarContentMenu.locator('[data-slot="sidebar-menu-item"][data-sidebar="menu-item"]');

    // Check Home menu item
    const homeButton = menuItems.first().locator('[data-slot="sidebar-menu-button"]');
    await expect(homeButton).toContainText('Home');
    await expect(homeButton).toBeEnabled();
    await expect(homeButton).toHaveAttribute('data-active', 'true');

    // Check the color of the Home menu item when selected
    const homeClasses = await homeButton.getAttribute('class');
    expect(homeClasses).toContain('text-left');
    expect(homeClasses).toContain('outline-hidden');
    expect(homeClasses).toContain('data-[active=true]:bg-primary-bg');
    expect(homeClasses).toContain('data-[active=true]:text-primary-fg');

    // Verify that the Home menu item has a trailing icon
    const homeTrailingIcon = menuItems.nth(0).locator('[data-slot="sidebar-menu-action"]').locator('svg');
    await expect(homeTrailingIcon).toBeVisible();

    // Check Profile menu item
    const profileButton = menuItems.nth(1).locator('[data-slot="sidebar-menu-button"]');
    await expect(profileButton).toContainText('Profile');
    await expect(profileButton).toBeEnabled();
    await expect(profileButton).toHaveAttribute('data-active', 'false');

    // Check the color of the Profile menu item when hovered
    const profileClasses = await profileButton.getAttribute('class');
    expect(profileClasses).toContain('text-left');
    expect(profileClasses).toContain('font-medium');
    expect(profileClasses).toContain('text-neutral-fg');
    expect(profileClasses).toContain('hover:bg-(--color-neutral-100)');
    expect(profileClasses).toContain('hover:text-neutral-fg');

    // Verify that the Profile menu item has a trailing icon
    const profileTrailingIcon = menuItems.nth(1).locator('[data-slot="sidebar-menu-action"]').locator('svg');
    await expect(profileTrailingIcon).toBeVisible();

    // Check Settings menu item
    const settingsButton = menuItems.nth(2).locator('[data-slot="sidebar-menu-button"]');
    await expect(settingsButton).toContainText('Settings');
    await expect(settingsButton).not.toBeEnabled();
    await expect(settingsButton).toHaveAttribute('data-active', 'false');

    // Check the color of the Settings menu item when hovered
    const settingsClasses = await settingsButton.getAttribute('class');
    expect(settingsClasses).toContain('text-left');
    expect(settingsClasses).toContain('text-neutral-fg');
    expect(settingsClasses).toContain('outline-hidden');

    // Verify that the Settings menu item has a trailing icon
    const settingsTrailingIcon = menuItems.nth(2).locator('[data-slot="sidebar-menu-action"]').locator('svg');
    await expect(settingsTrailingIcon).toBeVisible();
}

export async function testNavigationSideIconCombination(page: Page){
    // Verify that the Navigation(Side) icon combination is visible
    const sidebarIconCombination = page.locator('[id="side-icon-combination"]');
    await expect(sidebarIconCombination).toBeVisible();

    // Verify that the Navigation(Side) sidebar is visible
    const sidebar = sidebarIconCombination.locator('[data-sidebar="sidebar"]');
    await expect(sidebar).toBeVisible();

    // Verify that the Group Content is visible
    const sidebarGroupContent = sidebar.locator('[data-slot="sidebar-content"]');
    await expect(sidebarGroupContent).toBeVisible();

    // Check Navigation(Side) content menu is visible
    const sidebarContentMenu = sidebarGroupContent.locator('[data-slot="sidebar-menu"][data-sidebar="menu"]');
    await expect(sidebarContentMenu).toBeVisible();

    // Verify that display all menu items with correct details
    const menuItems = sidebarContentMenu.locator('[data-slot="sidebar-menu-item"][data-sidebar="menu-item"]');

    // Check Home menu item
    const homeButton = menuItems.first().locator('[data-slot="sidebar-menu-button"]');
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

    // Verify that the Home menu item has a trailing icon
    const homeTrailingIcon = menuItems.nth(0).locator('[data-slot="sidebar-menu-action"]').locator('svg');
    await expect(homeTrailingIcon).toBeVisible();

    // Check Profile menu item
    const profileButton = menuItems.nth(1).locator('[data-slot="sidebar-menu-button"]');
    await expect(profileButton).toContainText('Profile');
    await expect(profileButton).toBeEnabled();
    await expect(profileButton).toHaveAttribute('data-active', 'false');
    // Verify that the Profile menu item has an icon
    const profileIcon = profileButton.locator('svg');
    await expect(profileIcon).toBeVisible();

    // Check the color of the Profile menu item when hovered
    const profileClasses = await profileButton.getAttribute('class');
    expect(profileClasses).toContain('text-left');
    expect(profileClasses).toContain('font-medium');
    expect(profileClasses).toContain('text-neutral-fg');
    expect(profileClasses).toContain('hover:bg-(--color-neutral-100)');
    expect(profileClasses).toContain('hover:text-neutral-fg');

    // Verify that the Profile menu item has a trailing icon
    const profileTrailingIcon = menuItems.nth(1).locator('[data-slot="sidebar-menu-action"]').locator('svg');
    await expect(profileTrailingIcon).toBeVisible();

    // Check Settings menu item
    const settingsButton = menuItems.nth(2).locator('[data-slot="sidebar-menu-button"]');
    await expect(settingsButton).toContainText('Settings');
    await expect(settingsButton).not.toBeEnabled();
    await expect(settingsButton).toHaveAttribute('data-active', 'false');
    // Verify that the Settings menu item has an icon
    const settingsIcon = settingsButton.locator('svg');
    await expect(settingsIcon).toBeVisible();

    // Check the color of the Settings menu item when hovered
    const settingsClasses = await settingsButton.getAttribute('class');
    expect(settingsClasses).toContain('text-left');
    expect(settingsClasses).toContain('text-neutral-fg');
    expect(settingsClasses).toContain('outline-hidden');

    // Verify that the Settings menu item has a trailing icon
    const settingsTrailingIcon = menuItems.nth(2).locator('[data-slot="sidebar-menu-action"]').locator('svg');
    await expect(settingsTrailingIcon).toBeVisible();
}
