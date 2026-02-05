import { test, expect, Page } from '@playwright/test';

export async function testDropdown(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-default"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();

    // Verify that open dropdown menu when trigger button is clicked
    await triggerButton.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"], [data-radix-popper-content-wrapper]').nth(0);
    //const dropdownContent = page.locator('[data-slot="dropdown-menu-content"]');
    await expect(dropdownContent).toBeVisible();

    // Verify that display dropdown menu label
    const menuLabel = dropdownContent.locator('[data-slot="dropdown-menu-label"]');
    await expect(menuLabel).toBeVisible();
    await expect(menuLabel).toContainText('My Account');

    // Verify that display dropdown menu items
    await expect(dropdownContent.getByText('Profile')).toBeVisible();
    await expect(dropdownContent.getByText('Billing')).toBeVisible();
    await expect(dropdownContent.getByText('Settings')).toBeVisible();
    await expect(dropdownContent.getByText('Keyboard shortcuts')).toBeVisible();
    await expect(dropdownContent.getByText('Team').first()).toBeVisible();
    await expect(dropdownContent.getByText('Invite users')).toBeVisible();
    await expect(dropdownContent.getByText('New Team')).toBeVisible();
    await expect(dropdownContent.getByText('GitHub')).toBeVisible();
    await expect(dropdownContent.getByText('Support')).toBeVisible();
    await expect(dropdownContent.getByText('API')).toBeDisabled();
    await expect(dropdownContent.getByText('Log out')).toBeVisible();

    // Verify that display keyboard shortcuts for menu items
    await expect(dropdownContent.getByText('⇧⌘P')).toBeVisible(); // Profile shortcut
    await expect(dropdownContent.getByText('⌘B')).toBeVisible(); // Billing shortcut
    await expect(dropdownContent.getByText('⌘S')).toBeVisible(); // Settings shortcut
    await expect(dropdownContent.getByText('⌘K')).toBeVisible(); // Keyboard shortcuts shortcut
    await expect(dropdownContent.getByText('⌘+T')).toBeVisible(); // New Team shortcut
    await expect(dropdownContent.getByText('⇧⌘Q')).toBeVisible(); // Log out shortcut  

    // verify that open submenu when hovering over submenu trigger
    const inviteUsersTrigger = dropdownContent.getByText('Invite users');
    await expect(inviteUsersTrigger).toBeVisible();
    
    // Hover over the submenu trigger
    await inviteUsersTrigger.hover();
    
    // Wait for submenu content to appear
    const submenuContent = page.locator('[data-slot="dropdown-menu-sub-content"]');
    await expect(submenuContent).toBeVisible();

    // Verify that display submenu items
    await expect(submenuContent.getByText('Email')).toBeVisible();
    await expect(submenuContent.getByText('Message')).toBeVisible();
    await expect(submenuContent.getByText('More...')).toBeVisible();
}

export async function testDropdownMenuCheckbox(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-checkboxes"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();
}

export async function testDropdownMenuRadioGroup(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-radio-group"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();
}

export async function testDropdownMenuWithAvatar(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-avatar"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();
}

export async function testDropdownMenuAvatarOnly(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-avatar-only"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();
}

export async function testDropdownMenuIconColor(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-icon-only"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();
}