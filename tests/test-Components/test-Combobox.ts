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
    await expect(itemNextJs.locator('span')).toHaveAttribute('data-selected');
    
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

export async function testCombobxWithDescription(page: Page){
    // Verify that display combobox with description
    const comboboxWithDescription = page.locator('[id="combobox-with-description"]');
    await expect(comboboxWithDescription).toBeVisible();

    // Verify that display description trigger is visible
    const descriptionTrigger = comboboxWithDescription.locator('[data-slot="input-group"][role="group"]').nth(0);
    await expect(descriptionTrigger).toBeVisible();

    // Verify class attributes of description trigger
    const classListDescriptionTrigger = await descriptionTrigger.getAttribute('class');
    expect(classListDescriptionTrigger).toContain('rounded-md');
    expect(classListDescriptionTrigger).toContain('font-semibold');
    expect(classListDescriptionTrigger).toContain('text-neutral-fg');
    expect(classListDescriptionTrigger).toContain('bg-body-bg');

    // Verify that description trigger has input group control
    const inputGroupControl = descriptionTrigger.locator('[data-slot="input-group-control"]');
    await expect(inputGroupControl).toBeVisible();
    await expect(inputGroupControl).toHaveAttribute('autocomplete', 'off');
    await expect(inputGroupControl).toHaveAttribute('spellcheck', 'false');
    await expect(inputGroupControl).toHaveAttribute('autocorrect', 'off');
    await expect(inputGroupControl).toHaveAttribute('autocapitalize', 'none');
    await expect(inputGroupControl).toHaveAttribute('role', 'combobox');
    await expect(inputGroupControl).toHaveAttribute('aria-expanded', 'false');
    await expect(inputGroupControl).toHaveAttribute('aria-haspopup', 'listbox');
    await expect(inputGroupControl).toHaveAttribute('aria-autocomplete', 'list');
    await expect(inputGroupControl).toHaveAttribute('placeholder', 'XM Cloud Authoring');
    await expect(inputGroupControl).toHaveAttribute('type', 'text');

    // Verify that description trigger has input group addon button
    const inputGroupAddon = descriptionTrigger.locator('[data-slot="input-group-addon"]');
    await expect(inputGroupAddon).toBeVisible();
    const inputGroupAddonButton = inputGroupAddon.locator('[data-slot="input-group-button"]');
    await expect(inputGroupAddonButton).toBeVisible();
    
    // Verify class attributes of input group addon button
    const classListInputGroupAddonButton = await inputGroupAddonButton.getAttribute('class');
    expect(classListInputGroupAddonButton).toContain('font-semibold');
    expect(classListInputGroupAddonButton).toContain('cursor-pointer');
    expect(classListInputGroupAddonButton).toContain('bg-transparent');
    expect(classListInputGroupAddonButton).toContain('text-neutral-fg');
    expect(classListInputGroupAddonButton).toContain('hover:text-neutral-fg');
    expect(classListInputGroupAddonButton).toContain('active:bg-neutral-bg-active');
    expect(classListInputGroupAddonButton).toContain('items-center');
    expect(classListInputGroupAddonButton).toContain('rounded-full');

    // Verify combobox content is visible when click input group addon button
    await inputGroupAddonButton.click();
    const comboboxContent = page.locator('[data-slot="combobox-content"]');
    await expect(comboboxContent).toBeVisible();

    // Verify that combobx items are visible
    const itemXMCloudAuthoring = comboboxContent.locator('[data-slot="combobox-list"]');
    await expect(itemXMCloudAuthoring).toBeVisible();

    // Verify that XM Cloud item is visible
    const XMCloud = itemXMCloudAuthoring.locator('[data-slot="combobox-item"]').nth(0);
    await expect(XMCloud).toBeVisible();
    await expect(XMCloud.locator('[data-slot="combobox-item-title"]')).toHaveText('XM Cloud');
    await expect(XMCloud.locator('[data-slot="combobox-item-description"]')).toHaveText('Cloud-native Sitecore CMS with managed hosting, previews, and deployments.');

    // Verify that Component Builder item is visible
    const ComponentBuilder = itemXMCloudAuthoring.locator('[data-slot="combobox-item"]').nth(1);
    await expect(ComponentBuilder).toBeVisible();
    await expect(ComponentBuilder.locator('[data-slot="combobox-item-title"]')).toHaveText('Component Builder');
    await expect(ComponentBuilder.locator('[data-slot="combobox-item-description"]')).toHaveText('Front-end-as-a-service style guide and visual component prototyping for your brand.');

    // Verify that XMC Forms item is visible
    const XMCForms = itemXMCloudAuthoring.locator('[data-slot="combobox-item"]').nth(2);
    await expect(XMCForms).toBeVisible();
    await expect(XMCForms.locator('[data-slot="combobox-item-title"]')).toHaveText('XMC Forms');
    await expect(XMCForms.locator('[data-slot="combobox-item-description"]')).toHaveText('Design clear, on-brand forms for use directly on the page.');

    // Verify that Page builder item is visible
    const PageBuilder = itemXMCloudAuthoring.locator('[data-slot="combobox-item"]').nth(3);
    await expect(PageBuilder).toBeVisible();
    await expect(PageBuilder.locator('[data-slot="combobox-item-title"]')).toHaveText('Page builder');
    await expect(PageBuilder.locator('[data-slot="combobox-item-description"]')).toHaveText('Create and edit pages visually, with layout, content, and multi-user authoring in one place.');

    // Verify that close combobox content when select item
    await XMCloud.click();
    await expect(comboboxContent).not.toBeVisible();
    await expect(inputGroupControl).toHaveAttribute('value', 'XM Cloud');

    // Verify that display description with icon trigger is visible
    const descriptionWithIconTrigger = comboboxWithDescription.locator('[data-slot="input-group"][role="group"]').nth(1);
    await expect(descriptionWithIconTrigger).toBeVisible();

    // Verify class attributes of description with icon trigger
    const classListDescriptionWithIconTrigger = await descriptionWithIconTrigger.getAttribute('class');
    expect(classListDescriptionWithIconTrigger).toContain('rounded-md');
    expect(classListDescriptionWithIconTrigger).toContain('font-semibold');
    expect(classListDescriptionWithIconTrigger).toContain('text-neutral-fg');
    expect(classListDescriptionWithIconTrigger).toContain('bg-body-bg');

    // Verify that description trigger has input group control
    const inputGroupControlWithIcon = descriptionWithIconTrigger.locator('[data-slot="input-group-control"]');  
    await expect(inputGroupControlWithIcon).toBeVisible();
    await expect(inputGroupControlWithIcon).toHaveAttribute('autocomplete', 'off');
    await expect(inputGroupControlWithIcon).toHaveAttribute('spellcheck', 'false');
    await expect(inputGroupControlWithIcon).toHaveAttribute('autocorrect', 'off');
    await expect(inputGroupControlWithIcon).toHaveAttribute('autocapitalize', 'none');
    await expect(inputGroupControlWithIcon).toHaveAttribute('role', 'combobox');
    await expect(inputGroupControlWithIcon).toHaveAttribute('aria-expanded', 'false');
    await expect(inputGroupControlWithIcon).toHaveAttribute('aria-haspopup', 'listbox');
    await expect(inputGroupControlWithIcon).toHaveAttribute('aria-autocomplete', 'list');
    await expect(inputGroupControlWithIcon).toHaveAttribute('placeholder', 'Platform & Data');
    await expect(inputGroupControlWithIcon).toHaveAttribute('type', 'text');

    // Verify that description trigger has input group addon button
    const inputGroupAddonWithIcon = descriptionWithIconTrigger.locator('[data-slot="input-group-addon"]');
    await expect(inputGroupAddonWithIcon).toBeVisible();
    const inputGroupAddonButtonWithIcon = inputGroupAddonWithIcon.locator('[data-slot="input-group-button"]');
    await expect(inputGroupAddonButtonWithIcon).toBeVisible();

    // Verify class attributes of input group addon button
    const classListInputGroupAddonButtonWithIcon = await inputGroupAddonButtonWithIcon.getAttribute('class');   
    expect(classListInputGroupAddonButtonWithIcon).toContain('font-semibold');
    expect(classListInputGroupAddonButtonWithIcon).toContain('cursor-pointer');
    expect(classListInputGroupAddonButtonWithIcon).toContain('bg-transparent');
    expect(classListInputGroupAddonButtonWithIcon).toContain('text-neutral-fg');
    expect(classListInputGroupAddonButtonWithIcon).toContain('hover:text-neutral-fg');
    expect(classListInputGroupAddonButtonWithIcon).toContain('active:bg-neutral-bg-active');
    expect(classListInputGroupAddonButtonWithIcon).toContain('items-center');
    expect(classListInputGroupAddonButtonWithIcon).toContain('rounded-full');

    // Verify combobox content is visible when click input group addon button
    await inputGroupAddonButtonWithIcon.click();
    const comboboxContentWithIcon = page.locator('[data-slot="combobox-content"]');
    await expect(comboboxContentWithIcon).toBeVisible();

    // Verify that combobx items are visible
    const itemPlatformData = comboboxContentWithIcon.locator('[data-slot="combobox-list"]');
    await expect(itemPlatformData).toBeVisible();

    // Verify that Experience Edge item is visible
    const ExperienceEdge = itemPlatformData.locator('[data-slot="combobox-item"]').nth(0);
    await expect(ExperienceEdge).toBeVisible();
    await expect(ExperienceEdge.locator('svg')).toBeVisible();
    await expect(ExperienceEdge.locator('[data-slot="combobox-item-title"]')).toHaveText('Experience Edge');
    await expect(ExperienceEdge.locator('[data-slot="combobox-item-description"]')).toHaveText('Deliver structured content over GraphQL and the CDN for headless experiences.');

    // Verify that Blok item is visible
    const Blok = itemPlatformData.locator('[data-slot="combobox-item"]').nth(1);
    await expect(Blok).toBeVisible();
    await expect(Blok.locator('svg')).toBeVisible();
    await expect(Blok.locator('[data-slot="combobox-item-title"]')).toHaveText('Blok');
    await expect(Blok.locator('[data-slot="combobox-item-description"]')).toHaveText('Sitecore design system for building consistent product experiences.');

    // Verify that Sitecore Search item is visible
    const SitecoreSearch = itemPlatformData.locator('[data-slot="combobox-item"]').nth(2);
    await expect(SitecoreSearch).toBeVisible();
    await expect(SitecoreSearch.locator('svg')).toBeVisible();
    await expect(SitecoreSearch.locator('[data-slot="combobox-item-title"]')).toHaveText('Sitecore Search');
    await expect(SitecoreSearch.locator('[data-slot="combobox-item-description"]')).toHaveText('Unified search across content and commerce to power discovery on your sites.');

    // Verify that Sitecore CDP item is visible
    const SitecoreCDP = itemPlatformData.locator('[data-slot="combobox-item"]').nth(3);
    await expect(SitecoreCDP).toBeVisible();
    await expect(SitecoreCDP.locator('svg')).toBeVisible();
    await expect(SitecoreCDP.locator('[data-slot="combobox-item-title"]')).toHaveText('Sitecore CDP');
    await expect(SitecoreCDP.locator('[data-slot="combobox-item-description"]')).toHaveText('Unify customer profiles and activate audiences across marketing channels.');

    // Verify that close combobox content when select item
    await Blok.click();
    await expect(comboboxContentWithIcon).not.toBeVisible();
    await expect(inputGroupControlWithIcon).toHaveAttribute('value', 'Blok');
}