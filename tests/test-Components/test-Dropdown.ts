import { test, expect, Page } from '@playwright/test';

export async function testDropdown(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-default"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();

    // Verify that open dropdown menu when trigger button is clicked
    await triggerButton.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"], [data-radix-popper-content-wrapper]').nth(0);
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

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();
}

export async function testDropdownMenuCheckbox(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-checkboxes"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();

    // Verify that display dropdown menu checkbox items
    await triggerButton.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(dropdownContent).toBeVisible();

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();
}

export async function testDropdownMenuRadioGroup(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-radio-group"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();

    // Verify that display dropdown menu radio group items
    await triggerButton.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(dropdownContent).toBeVisible();

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();
}

export async function testDropdownMenuWithAvatar(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-avatar"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();

    // Verify that Dropdown trigger button has Avatar
    const avatar = triggerButton.locator('[data-slot="avatar"]');
    await expect(avatar).toBeVisible();
    await expect(avatar.locator('[data-slot="avatar-fallback"]')).toHaveText('TK');

    // Verify that display dropdown menu avatar items
    await triggerButton.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(dropdownContent).toBeVisible();

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();
}

export async function testDropdownMenuAvatarOnly(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-avatar-only"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();

    // Verify that Dropdown trigger button has Avatar
    const avatar = triggerButton.locator('[data-slot="avatar"]');
    await expect(avatar).toBeVisible();
    await expect(avatar.locator('[data-slot="avatar-fallback"]')).toHaveText('AH');

    // Verify that display dropdown menu avatar only items
    await triggerButton.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(dropdownContent).toBeVisible();

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();
}

export async function testDropdownMenuIconColor(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-icon-only"]');
    const triggerButton = dropdown.locator('[data-slot="dropdown-menu-trigger"]');
    await expect(triggerButton).toBeVisible();

    // Verify that display dropdown menu icon color items
    await triggerButton.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(dropdownContent).toBeVisible();

    // Verify that Dropdown content has icon color items
    const dropdownMenuGroup = dropdownContent.locator('[data-slot="dropdown-menu-group"]');
    const iconColorItems = dropdownMenuGroup.locator('[data-slot="dropdown-menu-item"]').nth(2);
    await expect(iconColorItems).toBeVisible();
    await expect(iconColorItems).toHaveText('Delete');
    await expect(iconColorItems.locator('svg')).toBeVisible();
    // Verify class attributes of icon color items
    const classListIconColorItems = await iconColorItems.getAttribute('class');
    expect(classListIconColorItems).toContain('cursor-pointer');
    expect(classListIconColorItems).toContain('rounded-sm');
    expect(classListIconColorItems).toContain('text-sm');
    expect(classListIconColorItems).toContain('hover:bg-neutral-bg');
    expect(classListIconColorItems).toContain('focus:bg-neutral-bg');
    expect(classListIconColorItems).toContain('rounded-4xl');
    expect(classListIconColorItems).toContain('border');

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();
}

export async function testDropdownMenuWithDescription(page: Page){
    // Verify that display dropdown trigger button
    const dropdown = page.locator('[id="dropdown-with-description"]');
    await expect(dropdown).toBeVisible();

    // Verify that dropdown menu button is visible for XM Cloud Authoring
    const triggerButtonXMCloudAuthoring = dropdown.locator('[data-slot="dropdown-menu-trigger"]').nth(0);
    await expect(triggerButtonXMCloudAuthoring).toBeVisible();
    await expect(triggerButtonXMCloudAuthoring).toContainText('XM Cloud Authoring');

    // Verify class attributes of dropdown menu button for XM Cloud Authoring
    const classListDropdownMenuButtonXMCloudAuthoring = await triggerButtonXMCloudAuthoring.getAttribute('class');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('inline-flex');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('items-center');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('text-md');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('font-semibold');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('cursor-pointer');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('rounded-4xl');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('border');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('text-neutral-fg');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('hover:bg-neutral-bg');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('hover:text-neutral-fg');
    expect(classListDropdownMenuButtonXMCloudAuthoring).toContain('active:bg-neutral-bg-active');

    // Verify combobox content is visible when click input group addon button
    await triggerButtonXMCloudAuthoring.click();
    const dropdownContent = page.locator('[data-slot="dropdown-menu-content"]').first();
    await expect(dropdownContent).toBeVisible();

    // Verify that dropdown menu items are visible
    const menuItemXMCloudAuthoring = dropdownContent.locator('[data-slot="dropdown-menu-group"]');
    await expect(menuItemXMCloudAuthoring).toBeVisible();

    // Verify that XM Cloud item is visible
    const XMCloud = menuItemXMCloudAuthoring.locator('[data-slot="dropdown-menu-item"]').nth(0);
    await expect(XMCloud).toBeVisible();
    await expect(XMCloud.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('XM Cloud');
    await expect(XMCloud.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Cloud-native Sitecore CMS with managed hosting, previews, and deployments.');

    // Verify that Component Builder item is visible
    const ComponentBuilder = menuItemXMCloudAuthoring.locator('[data-slot="dropdown-menu-item"]').nth(1);
    await expect(ComponentBuilder).toBeVisible();
    await expect(ComponentBuilder.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('Component Builder');
    await expect(ComponentBuilder.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Front-end-as-a-service style guide and visual component prototyping for your brand.');

    // Verify that XMC Forms item is visible
    const XMCForms = menuItemXMCloudAuthoring.locator('[data-slot="dropdown-menu-item"]').nth(2);
    await expect(XMCForms).toBeVisible();
    await expect(XMCForms.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('XMC Forms');
    await expect(XMCForms.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Design clear, on-brand forms for use directly on the page.');

    // Verify that Page builder item is visible
    const PageBuilder = menuItemXMCloudAuthoring.locator('[data-slot="dropdown-menu-item"]').nth(3);
    await expect(PageBuilder).toBeVisible();
    await expect(PageBuilder.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('Page builder');
    await expect(PageBuilder.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Create and edit pages visually, with layout, content, and multi-user authoring in one place.');

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContent).not.toBeVisible();

    // Verify that dropdown menu button is visible for Platform & Data
    const triggerButtonPlatformData = dropdown.locator('[data-slot="dropdown-menu-trigger"]').nth(1);
    await expect(triggerButtonPlatformData).toBeVisible();
    await expect(triggerButtonPlatformData).toContainText('Platform & Data');

    // Verify class attributes of dropdown menu button for Platform & Data
    const classListDropdownMenuButtonPlatformData = await triggerButtonPlatformData.getAttribute('class');
    expect(classListDropdownMenuButtonPlatformData).toContain('inline-flex');
    expect(classListDropdownMenuButtonPlatformData).toContain('items-center');
    expect(classListDropdownMenuButtonPlatformData).toContain('text-md');
    expect(classListDropdownMenuButtonPlatformData).toContain('font-semibold');
    expect(classListDropdownMenuButtonPlatformData).toContain('cursor-pointer');
    expect(classListDropdownMenuButtonPlatformData).toContain('rounded-4xl');
    expect(classListDropdownMenuButtonPlatformData).toContain('border');
    expect(classListDropdownMenuButtonPlatformData).toContain('text-neutral-fg');
    expect(classListDropdownMenuButtonPlatformData).toContain('hover:bg-neutral-bg');
    expect(classListDropdownMenuButtonPlatformData).toContain('hover:text-neutral-fg');
    expect(classListDropdownMenuButtonPlatformData).toContain('active:bg-neutral-bg-active');

    // Verify combobox content is visible when click input group addon button
    await triggerButtonPlatformData.click();
    const dropdownContentPlatformData = page.locator('[data-slot="dropdown-menu-content"]').first();
    await expect(dropdownContentPlatformData).toBeVisible();

    // Verify that dropdown menu items are visible
    const menuItemPlatformData = dropdownContentPlatformData.locator('[data-slot="dropdown-menu-group"]');
    await expect(menuItemPlatformData).toBeVisible();

    // Verify that Experience Edge item is visible
    const ExperienceEdge = menuItemPlatformData.locator('[data-slot="dropdown-menu-item"]').nth(0);
    await expect(ExperienceEdge).toBeVisible();
    await expect(ExperienceEdge.locator('svg')).toBeVisible();
    await expect(ExperienceEdge.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('Experience Edge');
    await expect(ExperienceEdge.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Deliver structured content over GraphQL and the CDN for headless experiences.');

    // Verify that Blok item is visible
    const Blok = menuItemPlatformData.locator('[data-slot="dropdown-menu-item"]').nth(1);
    await expect(Blok).toBeVisible();
    await expect(Blok.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('Blok');
    await expect(Blok.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Sitecore design system for building consistent product experiences.');

    // Verify that Sitecore Search item is visible
    const SitecoreSearch = menuItemPlatformData.locator('[data-slot="dropdown-menu-item"]').nth(2);
    await expect(SitecoreSearch).toBeVisible();
    await expect(SitecoreSearch.locator('svg')).toBeVisible();
    await expect(SitecoreSearch.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('Sitecore Search');
    await expect(SitecoreSearch.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Unified search across content and commerce to power discovery on your sites.');

    // Verify that Sitecore CDP item is visible
    const SitecoreCDP = menuItemPlatformData.locator('[data-slot="dropdown-menu-item"]').nth(3);
    await expect(SitecoreCDP).toBeVisible();
    await expect(SitecoreCDP.locator('svg')).toBeVisible();
    await expect(SitecoreCDP.locator('[data-slot="dropdown-menu-item-title"]')).toHaveText('Sitecore CDP');
    await expect(SitecoreCDP.locator('[data-slot="dropdown-menu-item-description"]')).toHaveText('Unify customer profiles and activate audiences across marketing channels.');

    // Verify that Dropdown menu content is not visible when click escape key
    await page.keyboard.press('Escape');
    await expect(dropdownContentPlatformData).not.toBeVisible();
}