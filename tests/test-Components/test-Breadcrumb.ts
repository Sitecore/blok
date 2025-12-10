import { test, expect, Page } from '@playwright/test';

export async function testBreadcrumb(page: Page){
  // Check that breadcrumb is visible
    const breadcrumb = page.locator('[data-slot="breadcrumb"]');
    await expect(breadcrumb).toBeVisible();

    // Verify it has the correct aria-label
    await expect(breadcrumb).toHaveAttribute('aria-label', 'breadcrumb');

  // Check that breadcrumb list is visible
    const breadcrumbList = page.locator('[data-slot="breadcrumb-list"]');
    await expect(breadcrumbList).toBeVisible();
   
  // Verify breadcrumb items are visible
    const breadcrumbItems = page.locator('[data-slot="breadcrumb-item"]');
    const firstItem = breadcrumbItems.first();
    await expect(firstItem).toBeVisible();

    await expect(breadcrumbItems.nth(0).locator('text=Home')).toBeVisible();

    const classAttribute = await firstItem.getAttribute('class');
    expect(classAttribute).toBeTruthy();
    expect(classAttribute).toContain('inline-flex');
    expect(classAttribute).toContain('items-center');

  // Verify breadcrumb separators are visible
    const separators = page.locator('[data-slot="breadcrumb-separator"]').nth(0);
    await expect(separators).toBeVisible();    

}

export async function testBreadcrumbItemLinks(page: Page){
  // Verify Home link is visible and clickable
    const homeLink = page.locator('[data-slot="breadcrumb-link"]').filter({ hasText: 'Home' });
    await expect(homeLink).toBeVisible();

    // Verify link is an anchor tag
    const tagName = await homeLink.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('a');
      
    // Verify link has href attribute
    await expect(homeLink).toHaveAttribute('href', '#home');

  // Find the ellipsis trigger button and dropdown menu  
    const ellipsisTrigger = page.locator('button').filter({ has: page.locator('[data-slot="breadcrumb-ellipsis"]') });
    await expect(ellipsisTrigger).toBeVisible();
    await ellipsisTrigger.click();
    const dropdownMenu = page.locator('[role="menu"]');
    await expect(dropdownMenu).toBeVisible();

    // Verify specific menu items are visible
    const menuItems = page.locator('[role="menuitem"]');
    await expect(menuItems.filter({ hasText: 'Documentation' })).toBeVisible();
    await expect(menuItems.filter({ hasText: 'Themes' })).toBeVisible();
    await expect(menuItems.filter({ hasText: 'GitHub' })).toBeVisible();

    // Click outside for the dropdown to close (on the page)
      await page.mouse.click(1, 1);
      await expect(dropdownMenu).not.toBeVisible();
}