import { test, expect, Page } from '@playwright/test';

export async function testTopbar(page: Page){
    // Verify that topbar with all main elements
    const topbar = page.locator('[id="topbar"]');
    await expect(topbar).toBeVisible();

    // Check menu button
    //const menuButton = topbar.getByRole('button', { name: 'Menu' });
    const menuButton = topbar.locator('[aria-label="Menu"]');
    await expect(menuButton).toBeVisible();

    // Check logo images (light and dark mode)
    const logoImages = topbar.locator('img[alt="Logo"]');
    await expect(logoImages.first()).toBeVisible();

    // Check "Blok" text
    const blokText = topbar.getByText('Blok');
    await expect(blokText).toBeVisible();

    // Verify that display navigation menu items
    const navigationMenu = topbar.locator('[data-slot="navigation-menu"]');
    const navigationMenuList = navigationMenu.locator('[data-slot="navigation-menu-list"]');
    await expect(navigationMenuList).toBeVisible();
    
    // Check individual navigation items
    const homeLink = navigationMenuList.getByRole('link', { name: 'Home' });
    await expect(homeLink).toBeVisible();
    const contentModelTrigger = navigationMenuList.getByRole('button', { name: 'Content model' });
    await expect(contentModelTrigger).toBeVisible();
    const contentLink = navigationMenuList.getByRole('link', { name: 'Content' });
    await expect(contentLink).toBeVisible();
    const mediaLink = navigationMenuList.getByRole('link', { name: 'Media' });
    await expect(mediaLink).toBeVisible();
    const settingsLink = navigationMenuList.getByRole('link', { name: 'Settings' });
    await expect(settingsLink).toBeVisible();

    // Verify that open and display Content model dropdown menu
    await contentModelTrigger.click();
    const dropdownContent = page.locator('ul.grid').first();
    await expect(dropdownContent).toBeVisible();

    await expect(dropdownContent.getByRole('link', { name: 'Components' })).toBeVisible();
    await expect(dropdownContent.getByRole('link', { name: 'Documentation' })).toBeVisible();
    await expect(dropdownContent.getByRole('link', { name: 'Blocks' })).toBeVisible();

    // Verify that help button is visible
    const helpButton = topbar.locator('[aria-label="Help"]');
    await expect(helpButton).toBeVisible();

    // Verify that avatar is visible
    const avatar = topbar.locator('[data-slot="avatar"]');
    await expect(avatar).toBeVisible();
    await expect(avatar).toContainText('SC');

    // Verify that topbar active menu items has the expected classes
    const classList = await contentLink.getAttribute('class');
    expect(classList).toContain('rounded-md');
    expect(classList).toContain('text-neutral-fg');
    expect(classList).toContain('text-md');
    expect(classList).toContain('font-medium');
    expect(classList).toContain('hover:bg-neutral-bg');
    expect(classList).toContain('hover:text-neutral-fg');
    expect(classList).toContain('[&.active]:bg-primary-bg');
    expect(classList).toContain('[&.active]:text-primary-fg');
    expect(classList).toContain('[&.active]:hover:bg-primary-bg');
    expect(classList).toContain('[&.active]:hover:text-primary-fg');
}