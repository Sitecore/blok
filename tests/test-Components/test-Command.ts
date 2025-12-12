import { test, expect, Page } from '@playwright/test';

export async function testCommand(page: Page){
    // Verify the text "Press" and the kbd element is present
    const shortcutHint = page.getByText('Press');
    await expect(shortcutHint).toBeVisible();
    const kbdElement = page.locator('kbd');
    await expect(kbdElement).toBeVisible();

    // Verify that open command dialog with Ctrl+J keyboard shortcut
    await page.keyboard.press('Control+j');
    const commandDialog = page.locator('[data-slot="command"]');
    await expect(commandDialog).toBeVisible({ timeout: 2000 });

    // Verify that display command input when dialog is open
    const commandInput = page.locator('[data-slot="command-input"]');
    await expect(commandInput).toBeVisible();
    await expect(commandInput).toHaveAttribute('placeholder', 'Type a command or search...');

    // Verify that display all command groups
    const commandGroup = page.locator('[data-slot="command-group"]');

    // Verify that display Suggestions group
    const suggestionsGroup = commandGroup.filter({ has: page.locator('[cmdk-group-heading]:has-text("Suggestions")') });
      await expect(suggestionsGroup).toBeVisible();

      // Verify all items in Suggestions group are visible
      const suggestions = ['Calendar', 'Calculator', 'Search Emoji'];
      for (const suggestion of suggestions) {
        await expect(suggestionsGroup.getByText(suggestion, { exact: true })).toBeVisible();
      }

    // Verify that display Settings group  
    const settingsGroup = commandGroup.filter({ has: page.locator('[cmdk-group-heading]:has-text("Settings")') });
      await expect(settingsGroup).toBeVisible();

      // Verify all items in Settings group are visible
      const settingsItems = settingsGroup.locator('[data-slot="command-item"]');

      await expect(settingsItems.filter({ has: page.locator('span:has-text("Profile")') })).toBeVisible();
      await expect(settingsItems.filter({ has: page.locator('span:has-text("Billing")') })).toBeVisible();
      await expect(settingsItems.filter({ has: page.locator('span:has-text("Settings")') })).toBeVisible();
        await expect(settingsItems.getByText('⌘P')).toBeVisible();
        await expect(settingsItems.getByText('⌘B')).toBeVisible();
        await expect(settingsItems.getByText('⌘S')).toBeVisible();

    // Verify that show empty state message when no results found
    await commandInput.fill('xyz123nonexistent');
    await expect(page.getByText('No results found.')).toBeVisible();

    // Verify that clear search and show all options again
    await commandInput.clear();

    // Verify all options are visible again    
    await expect(page.getByText('Calendar', { exact: true })).toBeVisible();
    await expect(page.getByText('Calculator', { exact: true })).toBeVisible();
    await expect(page.getByText('Profile', { exact: true })).toBeVisible();

    // Verify that filtering options when searching
    await commandInput.fill('calc');
    await expect(page.getByText('Calculator', { exact: true })).toBeVisible();
    // Verify other items are filtered out
    await expect(page.getByText('Calendar', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Profile', { exact: true })).not.toBeVisible();

    // Verify that close dialog when clicking outside
    await page.click('body', { position: { x: 10, y: 10 } });
    await expect(commandDialog).not.toBeVisible({ timeout: 2000 });
}