import { test, expect, Page } from '@playwright/test';

export async function testSelectReact(page: Page){
    // Verify that the Select(React) section is visible
    const selectReactSection = page.locator('[id="select-react"]');
    await expect(selectReactSection).toBeVisible();

    // Verify placeholder text is visible
    const placeholder = selectReactSection.locator('[class*="gap-1 p-0 css-14oxtc6"]');
    await expect(placeholder.getByText('Select a product')).toBeVisible();

    // Verify that open dropdown when clicked
    // React Select control - try multiple strategies to reliably open the dropdown
    const selectContainer = selectReactSection.locator('input[aria-label="Select a product"]');
    await expect(selectContainer).toBeVisible();

    // Try multiple click strategies until the menu opens
    let menuOpened = false;
    
    // Strategy 1: Click on the indicators container (dropdown arrow)
    const indicatorsContainer = selectReactSection.locator('[class*="IndicatorsContainer"]').first();
    if (await indicatorsContainer.count() > 0) {
        await indicatorsContainer.click({ force: true });
        await page.waitForTimeout(300);
        if (await page.locator('[class*="menu"]').first().isVisible().catch(() => false)) {
            menuOpened = true;
        }
    }
    
    // Strategy 2: Click on the control container with force
    if (!menuOpened) {
        const controlContainer = selectReactSection.locator('[class*="control"]').first();
        if (await controlContainer.count() > 0) {
            await controlContainer.scrollIntoViewIfNeeded();
            await controlContainer.click({ force: true });
            await page.waitForTimeout(300);
            if (await page.locator('[class*="menu"]').first().isVisible().catch(() => false)) {
                menuOpened = true;
            }
        }
    }
    
    // Strategy 3: Click on the value container
    if (!menuOpened) {
        const valueContainer = selectReactSection.locator('[class*="ValueContainer"], [class*="valueContainer"]').first();
        if (await valueContainer.count() > 0) {
            await valueContainer.click({ force: true });
            await page.waitForTimeout(300);
            if (await page.locator('[class*="menu"]').first().isVisible().catch(() => false)) {
                menuOpened = true;
            }
        }
    }
    
    // Strategy 4: Click on the input and use keyboard
    if (!menuOpened) {
        await selectContainer.scrollIntoViewIfNeeded();
        await selectContainer.click({ force: true });
        await page.waitForTimeout(100);
        await selectContainer.press('ArrowDown');
        await page.waitForTimeout(300);
    }
    
    // Wait for menu to appear
    await page.waitForSelector('[class*="menu"]', { state: 'visible', timeout: 5000 });
    // Verify dropdown menu is visible
    const menu = page.locator('[class*="menu"]').first();
    await expect(menu).toBeVisible();
    
    await expect(page.getByText('XM Cloud')).toBeVisible();
    await expect(page.getByText('Content Hub')).toBeVisible();
    await expect(page.getByText('CDP')).toBeVisible();
    
    // Blok option is disabled - scroll the menu to reveal all options
    const menuList = menu.locator('[class*="menu-list"], [class*="MenuList"]').first();
    if (await menuList.count() > 0) {
        await menuList.evaluate((el) => {
            el.scrollTop = el.scrollHeight;
        });
        await page.waitForTimeout(300);
    } else {
        await menu.evaluate((el) => {
            el.scrollTop = el.scrollHeight;
        });
        await page.waitForTimeout(300);
    }
    
    // Find Blok option - search for text first, then find parent option element
    // Use a simpler approach: find all option elements and check their text content
    const allOptions = page.locator('[id*="react-select"][id*="option"]');
    const optionCount = await allOptions.count();
    let blokOption: any = null;
    
    // Iterate through all options to find the one containing "Blok"
    for (let i = 0; i < optionCount; i++) {
        const option = allOptions.nth(i);
        const text = await option.textContent().catch(() => '');
        if (text && text.trim().includes('Blok')) {
            blokOption = option;
            break;
        }
    }
    
    // If still not found, try finding by text within the menu
    if (!blokOption) {
        // Find Blok text element in the menu
        const blokTextInMenu = menu.getByText('Blok').first();
        if (await blokTextInMenu.count() > 0) {
            const blokTextElement = await blokTextInMenu.elementHandle().catch(() => null);
            
            if (blokTextElement) {
                // Get the option ID by traversing up the DOM
                const optionId = await blokTextElement.evaluate((el: Element) => {
                    let current: Element | null = el;
                    while (current && current !== document.body) {
                        if (current.id && current.id.includes('react-select') && current.id.includes('option')) {
                            return current.id;
                        }
                        current = current.parentElement;
                    }
                    return null;
                }).catch(() => null);
                
                if (optionId) {
                    blokOption = page.locator(`#${optionId}`);
                }
            }
        }
    }
    
    // Verify Blok option is found
    if (!blokOption || (typeof blokOption.count === 'function' && await blokOption.count() === 0)) {
        throw new Error('Blok option not found in the dropdown menu');
    }
    
    // Scroll the option into view if needed
    await blokOption.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    
    // Verify it's visible and disabled
    await expect(blokOption).toBeVisible({ timeout: 5000 });
    await expect(blokOption).toHaveAttribute('aria-disabled', 'true');

    // Verify that select an option from dropdown
    await page.getByText('Content Hub').click();
    await expect(placeholder.getByText('Content Hub')).toBeVisible();
}