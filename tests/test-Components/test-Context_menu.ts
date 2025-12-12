import { test, expect, Page } from '@playwright/test';

export async function testContextMenu(page: Page){
    // Verify that display context menu trigger area
    const contextMenuTrigger = page.locator('[data-slot="context-menu-trigger"]');
    await expect(contextMenuTrigger).toBeVisible();
    await expect(contextMenuTrigger).toHaveAttribute('data-state', 'closed');  
    await expect(contextMenuTrigger).toContainText('Right click here');

    // Verify that open context menu on right click
    await contextMenuTrigger.click({ button: 'right' });
    const contextMenu = page.locator('[data-slot="context-menu-content"]');
    await expect(contextMenu).toBeVisible();

    // Verify that display all main menu items
    await expect(contextMenu.locator('[role="menuitem"]:has-text("Back")')).toBeVisible();
    await expect(contextMenu.locator('[role="menuitem"]:has-text("Forward")')).toBeVisible();
    await expect(contextMenu.locator('[role="menuitem"]:has-text("Reload")')).toBeVisible();
    await expect(contextMenu.locator('[role="menuitem"]:has-text("Reload")')).toBeDisabled();
    await expect(contextMenu.locator('text=⌘[')).toBeVisible();
    await expect(contextMenu.locator('text=⌘]')).toBeVisible();
    await expect(contextMenu.locator('text=⌘R')).toBeVisible();

    //Verify that open submenu on hover over More Tools item
    const moreToolsItem = contextMenu.locator('[role="menuitem"]:has-text("More Tools")');
    await moreToolsItem.hover();

    const moreToolsItemMenu = page.locator('[data-slot="context-menu-sub-content"]');

    await expect(moreToolsItemMenu.locator('[role="menuitem"]:has-text("Save Page...")')).toBeVisible();
    await expect(moreToolsItemMenu.locator('[role="menuitem"]:has-text("Create Shortcut...")')).toBeVisible();
    await expect(moreToolsItemMenu.locator('[role="menuitem"]:has-text("Name Window...")')).toBeVisible();
    await expect(moreToolsItemMenu.locator('[role="menuitem"]:has-text("Developer Tools")')).toBeVisible();
    await expect(moreToolsItemMenu.locator('[role="menuitem"]:has-text("Delete")')).toBeVisible();
    
}