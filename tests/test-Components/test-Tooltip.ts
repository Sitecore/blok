import { test, expect, Page } from '@playwright/test';

export async function testTooltip(page: Page){
    // Verify that tooltip section is visible
    const tooltipSection = page.locator('[id="tooltip"]');

    // Verify that display hover button
    const hoverButton = tooltipSection.locator('button', { hasText: /Hover/ });
    await expect(hoverButton).toBeVisible();

    // Scroll into view and ensure page is loaded
    await hoverButton.scrollIntoViewIfNeeded();
    await page.waitForLoadState('networkidle');

    // Use mouse.move to hover and keep mouse over button continuously
    const buttonBox = await hoverButton.boundingBox();
    if (!buttonBox) {
        throw new Error('Could not get bounding box for hover button');
    }
    
    // Move mouse to center of button and keep it there
    const centerX = buttonBox.x + buttonBox.width / 2;
    const centerY = buttonBox.y + buttonBox.height / 2;
    await page.mouse.move(centerX, centerY);
    
    // Wait a bit for hover to register
    await page.waitForTimeout(500);

    // Try waiting for the tooltip container with multiple approaches
    let tooltipContent;
    const tooltipSelectors = [
        '[role="tooltip"]',
        '[data-radix-popper-content-wrapper]',
        '[data-radix-tooltip-content]',
        '[class*="tooltip"]'
    ];
    
    let tooltipFound = false;
    // Try each selector with the mouse still over the button
    for (const selector of tooltipSelectors) {
        try {
            // Keep mouse over button while waiting
            await page.mouse.move(centerX, centerY);
            await page.waitForSelector(selector, { 
                state: 'visible', 
                timeout: 3000 
            });
            tooltipContent = page.locator(selector).first();
            const isVisible = await tooltipContent.isVisible().catch(() => false);
            if (isVisible) {
                tooltipFound = true;
                break;
            }
        } catch (e) {
            // Continue to next selector, but keep mouse over button
            await page.mouse.move(centerX, centerY);
            continue;
        }
    }
    
    // If still not found, wait longer and check again while keeping mouse over button
    if (!tooltipFound) {
        await page.mouse.move(centerX, centerY);
        await page.waitForTimeout(2000);
        for (const selector of tooltipSelectors) {
            await page.mouse.move(centerX, centerY);
            const elements = page.locator(selector);
            const count = await elements.count();
            if (count > 0) {
                tooltipContent = elements.first();
                const isVisible = await tooltipContent.isVisible().catch(() => false);
                if (isVisible) {
                    tooltipFound = true;
                    break;
                }
            }
        }
    }
    
    // Verify tooltip container is visible
    if (!tooltipFound || !tooltipContent) {
        throw new Error('Tooltip did not appear after hovering over the button');
    }
    await expect(tooltipContent).toBeVisible({ timeout: 5000 });
    
    // Find the text within the tooltip - try multiple approaches
    let tooltipText = tooltipContent.locator('span:nth-child(2)');
    const spanCount = await tooltipText.count();
    const isSpanVisible = spanCount > 0 ? await tooltipText.isVisible().catch(() => false) : false;
    
    if (!isSpanVisible) {
        // Try to find text directly in the tooltip
        tooltipText = tooltipContent.getByText('Add to library', { exact: false });
        const textCount = await tooltipText.count();
        if (textCount === 0) {
            // Last resort: check if the container itself has the text
            const containerText = await tooltipContent.textContent();
            if (containerText && containerText.includes('Add to library')) {
                tooltipText = tooltipContent;
            } else {
                // Fallback: search page for text
                tooltipText = page.getByText('Add to library', { exact: false }).filter({ 
                    hasNot: hoverButton 
                });
            }
        }
    }
    
    // Wait for tooltip text to be visible
    await expect(tooltipText).toBeVisible({ timeout: 5000 });
    
    // Verify tooltip text content
    const textContent = await tooltipText.textContent();
    expect(textContent).toContain('Add to library');
}