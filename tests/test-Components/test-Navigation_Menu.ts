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
    const gettingStartedTrigger = menuItems.locator('[data-slot="navigation-menu-trigger"]').filter({ hasText: 'Getting Started' });
    await expect(gettingStartedTrigger).toBeVisible();
    await expect(gettingStartedTrigger).toContainText('Getting Started');
    
    // Scroll into view
    await gettingStartedTrigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    
    // Check for console errors before hover
    const consoleErrors: string[] = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });
    
    // Try multiple hover approaches
    // 1. JavaScript event dispatch
    await gettingStartedTrigger.evaluate((el) => {
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
    const gettingStartedBox = await gettingStartedTrigger.boundingBox();
    if (gettingStartedBox) {
        await page.mouse.move(gettingStartedBox.x + gettingStartedBox.width / 2, gettingStartedBox.y + gettingStartedBox.height / 2);
        await page.waitForTimeout(500);
    }
    
    // 3. Also try Playwright hover as backup
    await gettingStartedTrigger.hover({ force: true });
    await page.waitForTimeout(500);
    
    // Wait for content to appear - try multiple selectors
    let contentFound = false;
    try {
        await page.waitForSelector('[data-slot="navigation-menu-content"]', { state: 'visible', timeout: 8000 });
        contentFound = true;
    } catch (e) {
        // Try alternative selectors
        try {
            await page.waitForSelector('text=Blok CN', { state: 'visible', timeout: 2000 });
            contentFound = true;
        } catch (e2) {
            // Check if content exists but is hidden
            const contentCount = await page.locator('[data-slot="navigation-menu-content"]').count();
            if (contentCount > 0) {
                // Content exists but might be hidden - check visibility
                const isVisible = await page.locator('[data-slot="navigation-menu-content"]').first().isVisible();
                if (!isVisible) {
                    throw new Error(`Navigation menu content exists but is not visible. Console errors: ${consoleErrors.join(', ')}`);
                }
            }
            throw new Error(`Navigation menu content not found after hover. Console errors: ${consoleErrors.join(', ')}`);
        }
    }
    
    // Now get the content container
    const gettingStartedcontent = page.locator('[data-slot="navigation-menu-content"]').first();
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