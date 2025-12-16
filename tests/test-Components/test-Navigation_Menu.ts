import { test, expect, Page } from '@playwright/test';

export async function testNavigationMenu(page: Page){
    // Verify that display navigation menu
    const navigationMenu = page.locator('[data-slot="navigation-menu"]');
    await expect(navigationMenu).toBeVisible();

    // Verify that display navigation menu list
    const navigationMenuList = navigationMenu.locator('[data-slot="navigation-menu-list"]');
    await expect(navigationMenuList).toBeVisible();

    // Verify that display all navigation menu items
    const menuItems = navigationMenuList.locator('[data-slot="navigation-menu-item"]');
    
    // Should have 3 items (Getting Started, Components, Documentation)
    const count = await menuItems.count();
    expect(count).toBe(3);

    // Verify that display "Getting Started" trigger
    const gettingStartedTrigger = menuItems.locator('[data-slot="navigation-menu-trigger"]').filter({ hasText: 'Getting Started' });
    await expect(gettingStartedTrigger).toBeVisible();
    await expect(gettingStartedTrigger).toContainText('Getting Started');
    await gettingStartedTrigger.hover();
    const gettingStartedcontent = page.locator('[data-slot="navigation-menu-content"]').nth(0);
    await expect(gettingStartedcontent).toBeVisible();

    // Verify that display "Blok CN" link
    const gettingStartedlink1 = gettingStartedcontent.locator('[data-slot="navigation-menu-link"]').nth(0);
    await expect(gettingStartedlink1.locator('text=Blok CN')).toBeVisible();
    await expect(gettingStartedlink1).toHaveAttribute('href', '#');

    // Verify that display "Build better products faster" link
    const gettingStartedlink2 = gettingStartedcontent.locator('[data-slot="navigation-menu-link"]').nth(1);
    await expect(gettingStartedlink2.locator('text=Build better products faster')).toBeVisible();
    await expect(gettingStartedlink2).toHaveAttribute('href', '#');

    // Verify that display "Installation" link
    const gettingStartedlink3 = gettingStartedcontent.locator('[data-slot="navigation-menu-link"]').nth(2);
    await expect(gettingStartedlink3.locator('text=Installation')).toBeVisible();
    await expect(gettingStartedlink3).toHaveAttribute('href', '#');

    // Verify that display "Typography" link
    const gettingStartedlink4 = gettingStartedcontent.locator('[data-slot="navigation-menu-link"]').nth(3);
    await expect(gettingStartedlink4.locator('text=Typography')).toBeVisible();
    await expect(gettingStartedlink4).toHaveAttribute('href', '#');

    // Verify that display "Components" trigger
    const componentsTrigger = menuItems.locator('[data-slot="navigation-menu-trigger"]').filter({ hasText: 'Components' });
    await expect(componentsTrigger).toBeVisible();
    await expect(componentsTrigger).toContainText('Components');
    await componentsTrigger.hover();
    const componentscontent = page.locator('[data-slot="navigation-menu-content"]').nth(1);
    await expect(componentscontent).toBeVisible();

    // Verify that display "Alert Dialog" link
    const componentslink1 = componentscontent.locator('[data-slot="navigation-menu-link"]').nth(0);
    await expect(componentslink1.locator('text=Alert Dialog')).toBeVisible();
    await expect(componentslink1).toHaveAttribute('href', '#');

    // Verify that display "Hover Card" link
    const componentslink2 = componentscontent.locator('[data-slot="navigation-menu-link"]').nth(1);
    await expect(componentslink2.locator('text=Hover Card')).toBeVisible();
    await expect(componentslink2).toHaveAttribute('href', '#');

    // Verify that display "Progress" link
    const componentslink3 = componentscontent.locator('[data-slot="navigation-menu-link"]').nth(2);
    //await expect(componentslink3.locator('text').filter({ hasText: 'Progress' })).toBeVisible();
    await expect(componentslink3).toHaveAttribute('href', '#');

    // Verify that display "Scroll-area" link
    const componentslink4 = componentscontent.locator('[data-slot="navigation-menu-link"]').nth(3);
    await expect(componentslink4.locator('text=Scroll-area')).toBeVisible();
    await expect(componentslink4).toHaveAttribute('href', '#');

    // Verify that display "Tabs" link
    const componentslink5 = componentscontent.locator('[data-slot="navigation-menu-link"]').nth(4);
    await expect(componentslink5.locator('text=Tabs')).toBeVisible();
    await expect(componentslink5).toHaveAttribute('href', '#');

    // Verify that display "Tooltip" link
    const componentslink6 = componentscontent.locator('[data-slot="navigation-menu-link"]').nth(5);
    await expect(componentslink6.locator('text=Tooltip')).toBeVisible();
    await expect(componentslink6).toHaveAttribute('href', '#');

    // Verify that close content when hovering away
    await page.mouse.move(0, 0);
    await expect(componentscontent).not.toBeVisible();

    // Verify that display "Documentation" link
    const documentationLink = menuItems.locator('[data-slot="navigation-menu-link"]').filter({ hasText: 'Documentation' });
    await expect(documentationLink).toBeVisible();
    await expect(documentationLink).toContainText('Documentation');
}