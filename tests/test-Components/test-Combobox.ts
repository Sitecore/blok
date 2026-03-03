import { test, expect, Page } from '@playwright/test';

export async function testCombobxMultiple(page: Page){
    // Verify that display combobox multiple
    const comboboxMultiple = page.locator('[id="combobox-multiple"]');
    await expect(comboboxMultiple).toBeVisible();

    // Verify that display combobox multiple button
    const comboboxMultipleButton = comboboxMultiple.locator('[data-slot="combobox-chips"][role="toolbar"]');
    await expect(comboboxMultipleButton).toBeVisible();
    
    // Verify that display combobox multiple class attributes
    const classListMultiple = await comboboxMultipleButton.getAttribute('class');
    expect(classListMultiple).toContain('border-input');
    expect(classListMultiple).toContain('min-h-9');
    expect(classListMultiple).toContain('items-center');
    expect(classListMultiple).toContain('rounded');
    expect(classListMultiple).toContain('bg-body-bg');
    expect(classListMultiple).toContain('bg-clip-padding');
    expect(classListMultiple).toContain('px-2.5');
    expect(classListMultiple).toContain('py-1.5');
    expect(classListMultiple).toContain('text-sm');
    expect(classListMultiple).toContain('shadow-none');
    expect(classListMultiple).toContain('focus-within:border-2');
    expect(classListMultiple).toContain('focus-within:border-primary');
    expect(classListMultiple).toContain('w-full');
    expect(classListMultiple).toContain('max-w-xs');

    // Verify that combobx items are visible when click combobox multiple button
    await comboboxMultipleButton.click();
    const comboboxMultipleContent = page.locator('[data-slot="combobox-content"]');
    await expect(comboboxMultipleContent).toBeVisible();
    // Verify that combobx items are visible
    const itemNextJs = comboboxMultipleContent.locator('[data-slot="combobox-item"]').nth(0);
    await expect(itemNextJs).toBeVisible();
    await expect(itemNextJs).toContainText('Next.js');
    const itemSvelteKit = comboboxMultipleContent.locator('[data-slot="combobox-item"]').nth(1);
    await expect(itemSvelteKit).toBeVisible();
    await expect(itemSvelteKit).toContainText('SvelteKit');
    const itemNuxtJs = comboboxMultipleContent.locator('[data-slot="combobox-item"]').nth(2);
    await expect(itemNuxtJs).toBeVisible();
    await expect(itemNuxtJs).toContainText('Nuxt.js');
    const itemRemix = comboboxMultipleContent.locator('[data-slot="combobox-item"]').nth(3);
    await expect(itemRemix).toBeVisible();
    await expect(itemRemix).toContainText('Remix');
    const itemAstro = comboboxMultipleContent.locator('[data-slot="combobox-item"]').nth(4);
    await expect(itemAstro).toBeVisible();
    await expect(itemAstro).toContainText('Astro');

    // Verify that item Next.js is selected
    await expect(itemNextJs).toHaveAttribute('data-selected');
    // Select Items from combobox multiple
    await itemSvelteKit.click();
    await expect(itemSvelteKit).toHaveAttribute('data-selected');
    
    // Verify that close combobox multiple content when clicking outside
    await page.mouse.click(10, 10);
    await expect(comboboxMultipleContent).not.toBeVisible();

    // Verify that the selected items are displayed
    await expect(comboboxMultiple).toContainText('Next.jsSvelteKit');

    // Verify that the selected items are displayed as chips
    const chipNextJs = comboboxMultiple.locator('[data-slot="combobox-chip"]').nth(0);
    await expect(chipNextJs).toBeVisible();
    await expect(chipNextJs).toContainText('Next.js');
    const chipitemSvelteKit = comboboxMultiple.locator('[data-slot="combobox-chip"]').nth(1);
    await expect(chipitemSvelteKit).toBeVisible();
    await expect(chipitemSvelteKit).toContainText('SvelteKit');
}

export async function testCombobxClearButton(page: Page){
    // Verify that display combobox clear button
    const comboboxClearButtonSection = page.locator('[id="combobox-clear_button"]');
    const comboboxClearButtonTrigger = comboboxClearButtonSection.locator('[data-slot="input-group"][role="group"]');
    await expect(comboboxClearButtonTrigger).toBeVisible();

    // Verify that display combobox clear button class attributes
    const classListClearButton = await comboboxClearButtonTrigger.getAttribute('class');
    expect(classListClearButton).toContain('border-input');
    expect(classListClearButton).toContain('items-center');
    expect(classListClearButton).toContain('rounded-md');

    // Verify that combobox clear button trigger is visible
    const comboboxClearButtonControl = comboboxClearButtonTrigger.locator('[data-slot="input-group-control"]');
    await expect(comboboxClearButtonControl).toBeVisible();
    // Verify that combobox default value is visible
    await expect(comboboxClearButtonControl).toHaveAttribute('value', 'Next.js');

    // Verify that combobox clear button is visible
    const comboboxAddonButton = comboboxClearButtonTrigger.locator('[data-slot="input-group-addon"]');
    const ComboboxClearButton = comboboxAddonButton.locator('[data-slot="combobox-clear"]');
    await expect(ComboboxClearButton).toBeVisible();

    // Verify that value is cleared when click combobox clear button
    await comboboxAddonButton.click();
    await expect(comboboxClearButtonControl).toHaveAttribute('value', '');
    await expect(comboboxClearButtonControl).toHaveAttribute('placeholder', 'Select a framework');

    // Verify that combobox group button is visible and clear button is not visible
    const ComboboxGroupButton = comboboxAddonButton.locator('[data-slot="input-group-button"]');
    await expect(ComboboxGroupButton).toBeVisible();
    await expect(ComboboxClearButton).not.toBeVisible();
}

export async function testCombobxGroups(page: Page){
    // Verify that display combobox groups section
    const comboboxGroupsSection = page.locator('[id="combobox-groups"]');
    const comboboxGroupButtonTrigger = comboboxGroupsSection.locator('[data-slot="input-group"][role="group"]');
    await expect(comboboxGroupButtonTrigger).toBeVisible();

    // Verify that combobox group button trigger is visible
    const comboboxGroupButtonControl = comboboxGroupButtonTrigger.locator('[data-slot="input-group-control"]');
    await expect(comboboxGroupButtonControl).toBeVisible();
    await expect(comboboxGroupButtonControl).toHaveAttribute('placeholder', 'Select a timezone');

    // Verify that combobox group button is visible
    const comboboxGroupAddon = comboboxGroupButtonTrigger.locator('[data-slot="input-group-addon"]');
    const ComboboxGroupButton = comboboxGroupAddon.locator('[data-slot="input-group-button"]');
    await expect(ComboboxGroupButton).toBeVisible();

    // Verify that combobx items are visible when click combobox group button
    await comboboxGroupAddon.click();
    const comboboxGroupContent = page.locator('[data-slot="combobox-content"]');
    await expect(comboboxGroupContent).toBeVisible(); 

    // Click combobx group item
    await comboboxGroupContent.locator('[data-slot="combobox-item"]').filter({ hasText: '(GMT-5) New York' }).click();

    // Verify that the selected item is displayed
    await expect(comboboxGroupButtonControl).toHaveAttribute('value', '(GMT-5) New York');
    await expect(comboboxGroupContent).not.toBeVisible(); 
}

export async function testCombobxCustomItems(page: Page){
    // Verify that display combobox Custom Item section
    const comboboxCustomItemSection = page.locator('[id="combobox-custom_items"]');
    const comboboxCustomItemTrigger = comboboxCustomItemSection.locator('[data-slot="input-group"][role="group"]');
    await expect(comboboxCustomItemTrigger).toBeVisible();

    // Verify that combobox custom item button trigger is visible
    const comboboxCustomItemControl = comboboxCustomItemTrigger.locator('[data-slot="input-group-control"]');
    await expect(comboboxCustomItemControl).toBeVisible();
    await expect(comboboxCustomItemControl).toHaveAttribute('placeholder', 'Search countries...');

    // Verify that combobox custom item button is visible
    const comboboxCustomItemAddon = comboboxCustomItemTrigger.locator('[data-slot="input-group-addon"]');
    const ComboboxCustomItemButton = comboboxCustomItemAddon.locator('[data-slot="input-group-button"]');
    await expect(ComboboxCustomItemButton).toBeVisible();

    // Verify that combobx items are visible when click combobox custom item button
    await comboboxCustomItemAddon.click();
    const comboboxCustomItemContent = page.locator('[data-slot="combobox-content"]');
    await expect(comboboxCustomItemContent).toBeVisible(); 

    // Verify that typing in search updates value in the input
    await comboboxCustomItemControl.fill('Canada');
    await expect(comboboxCustomItemControl).toHaveValue('Canada');

    // Verify that select combobx items are visible
    await comboboxCustomItemContent.locator('[data-slot="combobox-item"]').filter({ hasText: 'Canada' }).click();

    // Verify that the selected item is displayed
    await expect(comboboxCustomItemControl).toHaveAttribute('value', 'Canada');
    await expect(comboboxCustomItemContent).not.toBeVisible();
}

export async function testCombobxAutoHighlight(page: Page){
    // Verify that display combobox Auto Highlight section
    const comboboxAutoHighlightSection = page.locator('[id="combobox-auto_highlights"]');
    const comboboxAutoHighlightTrigger = comboboxAutoHighlightSection.locator('[data-slot="input-group"][role="group"]');
    await expect(comboboxAutoHighlightTrigger).toBeVisible();

    // Verify that combobox custom item button trigger is visible
    const comboboxAutoHighlightControl = comboboxAutoHighlightTrigger.locator('[data-slot="input-group-control"]');
    await expect(comboboxAutoHighlightControl).toBeVisible();
    await expect(comboboxAutoHighlightControl).toHaveAttribute('placeholder', 'Select a framework');

    // Verify that combobox custom item button is visible
    const comboboxAutoHighlightAddon = comboboxAutoHighlightTrigger.locator('[data-slot="input-group-addon"]');
    const ComboboxAutoHighlightButton = comboboxAutoHighlightAddon.locator('[data-slot="input-group-button"]');
    await expect(ComboboxAutoHighlightButton).toBeVisible();

    // Verify that combobx items are visible when click combobox custom item button
    await comboboxAutoHighlightAddon.click();
    const comboboxCustomItemContent = page.locator('[data-slot="combobox-content"]');
    await expect(comboboxCustomItemContent).toBeVisible(); 

    // Verify that combobx items are visible
    const itemNextJs = comboboxCustomItemContent.locator('[data-slot="combobox-item"]').nth(0);
    await expect(itemNextJs).toBeVisible();
    await expect(itemNextJs).toContainText('Next.js');

    // Verify that selected item is auto highlighted
    await itemNextJs.click();
    await expect(itemNextJs).toHaveAttribute('data-selected');
    
    // Verify that close combobox auto highlight content
    await expect(comboboxCustomItemContent).not.toBeVisible();
    
    // Verify that the selected items are displayed
    await expect(comboboxAutoHighlightControl).toHaveAttribute('value', 'Next.js');
}

export async function testCombobxInputGroup(page: Page){
    // Verify that display combobox Input Group section
    const comboboxInputGroupSection = page.locator('[id="combobox-input_group"]');
    const comboboxInputGroupButtonTrigger = comboboxInputGroupSection.locator('[data-slot="input-group"][role="group"]');
    await expect(comboboxInputGroupButtonTrigger).toBeVisible(); 

    // Verify that combobox group button trigger is visible
    const comboboxInputGroupButtonControl = comboboxInputGroupButtonTrigger.locator('[data-slot="input-group-control"]');
    await expect(comboboxInputGroupButtonControl).toBeVisible();
    await expect(comboboxInputGroupButtonControl).toHaveAttribute('placeholder', 'Select a timezone');

    // Verify that combobox group start button is visible
    const inputGroupStartAddon = comboboxInputGroupButtonTrigger.locator('[data-slot="input-group-addon"][data-align="inline-start"]');
    await expect(inputGroupStartAddon).toBeVisible();

    // Verify that combobox group end button is visible
    const inputGroupEndAddon = comboboxInputGroupButtonTrigger.locator('[data-slot="input-group-addon"][data-align="inline-end"]');
    const endInputGroupButton = inputGroupEndAddon.locator('[data-slot="input-group-button"]');
    await expect(endInputGroupButton).toBeVisible();

    // Verify that combobx items are visible when click combobox group button
    await endInputGroupButton.click();
    const comboboxInputGroupContent = page.locator('[data-slot="combobox-content"]');
    await expect(comboboxInputGroupContent).toBeVisible(); 

    // Click combobx group item
    await comboboxInputGroupContent.locator('[data-slot="combobox-item"]').filter({ hasText: '(GMT-5) New York' }).click();

    // Verify that the selected item is displayed
    await expect(comboboxInputGroupButtonControl).toHaveAttribute('value', '(GMT-5) New York');

    // Verify that close combobox input group content
    await expect(comboboxInputGroupContent).not.toBeVisible(); 
}