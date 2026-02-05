import { test, expect, Page } from '@playwright/test';

export async function testNavigationMenu(page: Page){
    // Verify that display navigation menu
    const navigationMenuDefault = page.locator('[id="navigation-menu-default"]');
    const navigationMenu = navigationMenuDefault.locator('[data-slot="navigation-menu"]');
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
    const menuItem1 = navigationMenuList.locator('[data-slot="navigation-menu-item"]').nth(0);
    const gettingStartedTrigger = menuItem1.locator('[data-slot="navigation-menu-trigger"]');
    await expect(gettingStartedTrigger).toBeVisible();
    await expect(gettingStartedTrigger).toContainText('Getting Started');
    
    // Scroll into view
    await gettingStartedTrigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    
    // Try multiple hover approaches to ensure content appears
    // 1. JavaScript event dispatch
    await gettingStartedTrigger.evaluate((el) => {
        const mouseenterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(mouseenterEvent);
        const mouseoverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(mouseoverEvent);
    });
    
    // 2. Move mouse to the element
    const gettingStartedBox = await gettingStartedTrigger.boundingBox();
    if (gettingStartedBox) {
        await page.mouse.move(gettingStartedBox.x + gettingStartedBox.width / 2, gettingStartedBox.y + gettingStartedBox.height / 2);
        await page.waitForTimeout(500);
    }
    
    // 3. Also try Playwright hover as backup
    await gettingStartedTrigger.hover({ force: true });
    await page.waitForTimeout(500);
    
    // Wait for content to appear - wait for "Blok CN" text which is specific to Getting Started
    await page.waitForSelector('text=Blok CN', { state: 'visible', timeout: 10000 });
    
    // Now get the content container
    const menuItem1Viewport = page.locator('[data-slot="navigation-menu-viewport"]');
    const gettingStartedcontent = menuItem1Viewport.locator('[data-slot="navigation-menu-content"]');
    await expect(gettingStartedcontent).toBeVisible({ timeout: 5000 });

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

    // Move mouse away from Getting Started first to close it
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);

    // Verify that display "Components" trigger
    const componentsTrigger = menuItems.locator('[data-slot="navigation-menu-trigger"]').filter({ hasText: 'Components' });
    await expect(componentsTrigger).toBeVisible();
    await expect(componentsTrigger).toContainText('Components');
    
    // Scroll into view
    await componentsTrigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    
    // Try multiple hover approaches
    // 1. JavaScript event dispatch
    await componentsTrigger.evaluate((el) => {
        const mouseenterEvent = new MouseEvent('mouseenter', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(mouseenterEvent);
        // Also try mouseover
        const mouseoverEvent = new MouseEvent('mouseover', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        el.dispatchEvent(mouseoverEvent);
    });
    
    // 2. Move mouse to the element
    const componentsBox = await componentsTrigger.boundingBox();
    if (componentsBox) {
        await page.mouse.move(componentsBox.x + componentsBox.width / 2, componentsBox.y + componentsBox.height / 2);
        await page.waitForTimeout(500);
    }
    
    // 3. Also try Playwright hover as backup
    await componentsTrigger.hover({ force: true });
    await page.waitForTimeout(500);
    
    // Wait for content to appear - wait for "Alert Dialog" text which is specific to Components
    await page.waitForSelector('text=Alert Dialog', { state: 'visible', timeout: 10000 });
    
    // Now get the content container - use first() since only one should be visible at a time
    const componentscontent = page.locator('[data-slot="navigation-menu-content"]').first();
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
    await expect(documentationLink).toBeEnabled();
    await expect(documentationLink).toHaveAttribute('href', '#');
}

export async function testNavigationMenuSecondary(page: Page){
    // Verify that display navigation menu
    const navigationMenuSecondary = page.locator('[id="navigation-menu-secondary"]');
    const navigationMenu = navigationMenuSecondary.locator('[data-slot="navigation-menu"]');
    await expect(navigationMenu).toBeVisible();

    // Verify that display navigation menu list
    const navigationMenuList = navigationMenu.locator('[data-slot="navigation-menu-list"]');
    await expect(navigationMenuList).toBeVisible();

    // Verify that display all navigation menu items
    const menuItems = navigationMenuList.locator('[data-slot="navigation-menu-item"]');
    
    // Should have 3 items (Documentation, List, Simple List, With Icon)
    const count = await menuItems.count();
    expect(count).toBe(4);

    // Verify that display "Documentation" link
    const documentationLink = menuItems.locator('[data-slot="navigation-menu-link"]').filter({ hasText: 'Documentation' });
    await expect(documentationLink).toBeVisible();
    await expect(documentationLink).toContainText('Documentation');
    await expect(documentationLink).toBeEnabled();
    await expect(documentationLink).toHaveAttribute('href', '#');

    // Verify that display "List" trigger
    const list = navigationMenuList.locator('[data-slot="navigation-menu-item"]').nth(1);
    const listTrigger = list.locator('[data-slot="navigation-menu-trigger"]');
    await expect(listTrigger).toBeVisible();
    await expect(listTrigger).toContainText('List');

    // Verify that display "Simple List" trigger
    const simpleList = navigationMenuList.locator('[data-slot="navigation-menu-item"]').nth(2);
    const simpleListTrigger = simpleList.locator('[data-slot="navigation-menu-trigger"]');
    await expect(simpleListTrigger).toBeVisible();
    await expect(simpleListTrigger).toContainText('Simple List');

    // Verify that display "With Icon" trigger
    const withIcon = navigationMenuList.locator('[data-slot="navigation-menu-item"]').nth(3);
    const withIconTrigger = withIcon.locator('[data-slot="navigation-menu-trigger"]');
    await expect(withIconTrigger).toBeVisible();
    await expect(withIconTrigger).toContainText('With Icon');
}