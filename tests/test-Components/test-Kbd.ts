import { test, expect, Page } from '@playwright/test';

export async function testKbdDefault(page: Page){
    // Verify that display kbd default section
    const kbdDefaultSection = page.locator('[id="kbd-default"]');
    await expect(kbdDefaultSection).toBeVisible();

    // Verify that display first KbdGroup section
    const firstKbdGroup = kbdDefaultSection.locator('[data-slot="kbd-group"]').nth(0);
    await expect(firstKbdGroup).toBeVisible();
    // Check for symbol keys in the first KbdGroup
    const symbolKeys = firstKbdGroup.locator('kbd[data-slot="kbd"]');
    const count = await symbolKeys.count();
    expect(count).toBeGreaterThanOrEqual(4);
    // Verify specific symbols are present
    const symbols = ['⌘', '⇧', '⌥', '⌃'];
    for (const symbol of symbols) {
      await expect(firstKbdGroup.getByText(symbol)).toBeVisible();
    }

    // Verify that display second KbdGroup section
    const secondKbdGroup = kbdDefaultSection.locator('[data-slot="kbd-group"]').nth(1);
    await expect(secondKbdGroup).toBeVisible();
    // Verify that display Ctrl + B combination
    // Check for Ctrl text
    await expect(secondKbdGroup.getByText('Ctrl')).toBeVisible();
    // Check for B key
    await expect(secondKbdGroup.getByText('B', { exact: true })).toBeVisible();
    // Check for + separator
    await expect(secondKbdGroup.getByText('+')).toBeVisible();
}

export async function testKbdGroup(page: Page){
    // Verify that display kbd group section
    const kbdGroupSection = page.locator('[id="kbd-groups"]');
    await expect(kbdGroupSection).toBeVisible();

    // Check for the descriptive text
    await expect(kbdGroupSection.getByText(/Use.*to open the command palette/)).toBeVisible();
      
    // Check for Ctrl + B and Ctrl + K in the KbdGroup
    const kbdGroup = kbdGroupSection.locator('[data-slot="kbd-group"]');
    // Check for Ctrl + B in the KbdGroup
    const kbdGroupCtrlB = kbdGroup.locator('[data-slot="kbd"]').nth(0);
    await expect(kbdGroupCtrlB.getByText('Ctrl + B')).toBeVisible();
    // Check for Ctrl + K in the KbdGroup
    const kbdGroupCtrlK = kbdGroup.locator('[data-slot="kbd"]').nth(1);
    await expect(kbdGroupCtrlK.getByText('Ctrl + K')).toBeVisible();
}

export async function testKbdButton(page: Page){
    // Verify that display kbd button section
    const kbdButtonSection = page.locator('[id="kbd-button"]');
    await expect(kbdButtonSection).toBeVisible();

    // Verify that display buttons with Kbd elements
    // Check for Accept button
    const buttonAccept = kbdButtonSection.locator('button[data-slot="button"]').nth(0);
    await expect(buttonAccept).toBeVisible();
    // Check for button is clickable
    await expect(buttonAccept).toBeEnabled();
    // Check for Accept text
    await expect(buttonAccept.getByText('Accept ')).toBeVisible();
    // Check for Accept Kbd element
    const acceptKbd = buttonAccept.locator('kbd[data-slot="kbd"]');
    await expect(acceptKbd.getByText('⏎')).toBeVisible();

    // Check for Cancel button
    const buttonCancel = kbdButtonSection.locator('button[data-slot="button"]').nth(1);
    await expect(buttonCancel).toBeVisible();
    // Check for button is clickable
    await expect(buttonCancel).toBeEnabled();
    // Check for Cancel text
    await expect(buttonCancel.getByText('Cancel ')).toBeVisible();
    // Check for Accept Kbd element
    const cancelKbd = buttonCancel.locator('kbd[data-slot="kbd"]');
    await expect(cancelKbd.getByText('Esc')).toBeVisible();
}

export async function testKbdTooltip(page: Page){
    // Verify that display kbd tooltip section  
    const kbdTooltipSection = page.locator('[id="kbd-tooltip"]');
    await expect(kbdTooltipSection).toBeVisible();
    
    // Scroll section into view to ensure buttons are accessible
    await kbdTooltipSection.scrollIntoViewIfNeeded();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Verify that display buttons with Kbd elements
    // Check for Save button - try multiple approaches
    let buttonSave;
    
    // First try finding by text within the section
    const saveByRole = kbdTooltipSection.getByRole('button', { name: /Save/i });
    if (await saveByRole.count() > 0) {
        buttonSave = saveByRole.first();
    } else {
        // Try the data-slot selector
        const saveBySlot = kbdTooltipSection.locator('button[data-slot="button"]').first();
        if (await saveBySlot.count() > 0) {
            buttonSave = saveBySlot;
        } else {
            // Try finding any button with "Save" text in the section
            buttonSave = kbdTooltipSection.locator('button').filter({ hasText: 'Save' }).first();
        }
    }
    
    await expect(buttonSave).toBeVisible({ timeout: 5000 });
    // Check for button is clickable
    await expect(buttonSave).toBeEnabled();
    // Check for Save text
    await expect(buttonSave.getByText('Save')).toBeVisible();
    // Hover over the Save button to trigger tooltip
    await buttonSave.hover();
    // Wait a bit for tooltip to appear
    await page.waitForTimeout(500);
    // Verify that tooltip text is visible - use getByRole to find the tooltip specifically
    const tooltipTextSave = page.getByRole('tooltip', { name: /Save Changes/i });
    await expect(tooltipTextSave).toBeVisible({ timeout: 5000 });
    
    // Find the kbd group that's in the tooltip - scope to the tooltip element
    const kbdTooltipGroup = tooltipTextSave.locator('kbd[data-slot="kbd-group"]');
    await expect(kbdTooltipGroup).toBeVisible();
    // Check for ⌘ key in the KbdGroup
    await expect(kbdTooltipGroup.getByText('⌘')).toBeVisible();
    // Check for S key in the KbdGroup
    await expect(kbdTooltipGroup.getByText('S', { exact: true })).toBeVisible();

    // Only one Radix tooltip is active at a time — dismiss Save before opening Print
    await page.keyboard.press('Escape');
    await page.mouse.move(0, 0);
    await page.waitForTimeout(400);

    // Check for Print button - try multiple approaches
    let buttonPrint;
    
    // First try finding by text within the section
    const printByRole = kbdTooltipSection.getByRole('button', { name: /Print/i });
    if (await printByRole.count() > 0) {
        buttonPrint = printByRole.first();
    } else {
        // Try the data-slot selector
        const printBySlot = kbdTooltipSection.locator('button[data-slot="button"]').nth(1);
        if (await printBySlot.count() > 0) {
            buttonPrint = printBySlot;
        } else {
            // Try finding any button with "Print" text in the section
            buttonPrint = kbdTooltipSection.locator('button').filter({ hasText: 'Print' }).first();
        }
    }
    
    await expect(buttonPrint).toBeVisible({ timeout: 5000 });
    // Check for button is clickable
    await expect(buttonPrint).toBeEnabled();
    // Check for Print text
    await expect(buttonPrint.getByText('Print')).toBeVisible();
    // Hover over the Print button to trigger tooltip
    await buttonPrint.hover();
    await page.waitForTimeout(500);
    const tooltipTextPrint = page.getByRole('tooltip', { name: /Print/i });
    await expect(tooltipTextPrint).toBeVisible({ timeout: 5000 });

    const kbdTooltipGroupPrint = tooltipTextPrint.locator('kbd[data-slot="kbd-group"]').first();
    await expect(kbdTooltipGroupPrint).toBeVisible();
    // Check for Ctrl key in the KbdGroup
    await expect(kbdTooltipGroupPrint.getByText('Ctrl')).toBeVisible();
    // Check for P key in the KbdGroup
    await expect(kbdTooltipGroupPrint.getByText('P', { exact: true })).toBeVisible();
}

export async function testKbdShortcut(page: Page){
    // Verify that display kbd shortcut section
    const kbdShortcutSection = page.locator('[id="kbd-shortcut"]');
    await expect(kbdShortcutSection).toBeVisible();

    // Verify that display shortcut items
    // Copy: ⌘ + C
    const shortcutItemCopy = kbdShortcutSection.locator('span').nth(0);
    await expect(shortcutItemCopy.getByText('Copy', { exact: true })).toBeVisible();
    const shortcutItemCopyKbd = kbdShortcutSection.locator('kbd[data-slot="kbd-group"]').nth(0);
    await expect(shortcutItemCopyKbd.getByText('⌘')).toBeVisible();
    await expect(shortcutItemCopyKbd.getByText('C', { exact: true })).toBeVisible();

    // Paste: ⌘ + V
    const shortcutItemPaste = kbdShortcutSection.locator('span').nth(1);
    await expect(shortcutItemPaste.getByText('Paste', { exact: true })).toBeVisible();
    const shortcutItemPasteKbd = kbdShortcutSection.locator('kbd[data-slot="kbd-group"]').nth(1);
    await expect(shortcutItemPasteKbd.getByText('⌘')).toBeVisible();
    await expect(shortcutItemPasteKbd.getByText('V', { exact: true })).toBeVisible();

    // Cut: ⌘ + X
    const shortcutItemCut = kbdShortcutSection.locator('span').nth(2);
    await expect(shortcutItemCut.getByText('Cut', { exact: true })).toBeVisible();
    const shortcutItemCutKbd = kbdShortcutSection.locator('kbd[data-slot="kbd-group"]').nth(2);
    await expect(shortcutItemCutKbd.getByText('⌘')).toBeVisible();
    await expect(shortcutItemCutKbd.getByText('X', { exact: true })).toBeVisible();

    // Undo: ⌘ + Z
    const shortcutItemUndo = kbdShortcutSection.locator('span').nth(3);
    await expect(shortcutItemUndo.getByText('Undo', { exact: true })).toBeVisible();
    const shortcutItemUndoKbd = kbdShortcutSection.locator('kbd[data-slot="kbd-group"]').nth(3);
    await expect(shortcutItemUndoKbd.getByText('⌘')).toBeVisible();
    await expect(shortcutItemUndoKbd.getByText('Z', { exact: true })).toBeVisible();

    // Redo: ⌘ + ⇧ + Z
    const shortcutItemRedo = kbdShortcutSection.locator('span').nth(4);
    await expect(shortcutItemRedo.getByText('Redo', { exact: true })).toBeVisible();
    const shortcutItemRedoKbd = kbdShortcutSection.locator('kbd[data-slot="kbd-group"]').nth(4);
    await expect(shortcutItemRedoKbd.getByText('⌘')).toBeVisible();
    await expect(shortcutItemRedoKbd.getByText('⇧')).toBeVisible();
    await expect(shortcutItemRedoKbd.getByText('Z', { exact: true })).toBeVisible();
}