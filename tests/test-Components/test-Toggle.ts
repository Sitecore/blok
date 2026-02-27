import { test, expect, Page } from '@playwright/test';

export async function testToggleDefault(page: Page){
    // verify that default toggles section is visible
    const defaultSection = page.locator('[id="toggle-default"]');
    await expect(defaultSection).toBeVisible();

    // Verify that toggle bold button
    const boldToggle = defaultSection.locator('button[aria-label="Toggle bold"]');
    await expect(boldToggle).toBeVisible();
    await expect(boldToggle).toBeEnabled();
    await boldToggle.click();
    // Verify that toggle bold button toggle has the expected classes
    const boldClassList = await boldToggle.getAttribute('class');
    expect(boldClassList).toContain('font-medium');
    expect(boldClassList).toContain('text-neutral-fg');
    expect(boldClassList).toContain('hover:bg-neutral-bg');
    expect(boldClassList).toContain('hover:text-neutral-fg');
    expect(boldClassList).toContain('data-[state=on]:bg-primary-bg');
    expect(boldClassList).toContain('data-[state=on]:text-primary-fg');
    expect(boldClassList).toContain('outline-none');
    expect(boldClassList).toContain('whitespace-nowrap');
    expect(boldClassList).toContain('bg-transparent');
    expect(boldClassList).toContain('rounded-md');

    // Verify that toggle underline button
    const underlineToggle = defaultSection.locator('button[aria-label="Toggle underline"]');
    await expect(underlineToggle).toBeVisible();
    await expect(underlineToggle).toBeEnabled();
    await underlineToggle.click();
    // Verify that toggle underline button toggle has the expected classes
    const underlineClassList = await underlineToggle.getAttribute('class');
    expect(underlineClassList).toContain('font-medium');
    expect(underlineClassList).toContain('text-neutral-fg');
    expect(underlineClassList).toContain('hover:bg-neutral-bg');
    expect(underlineClassList).toContain('hover:text-neutral-fg');
    expect(underlineClassList).toContain('data-[state=on]:bg-primary-bg');
    expect(underlineClassList).toContain('data-[state=on]:text-primary-fg');
    expect(underlineClassList).toContain('outline-none');
    expect(underlineClassList).toContain('whitespace-nowrap');
    expect(underlineClassList).toContain('bg-transparent');
    expect(underlineClassList).toContain('rounded-md');

    // Verify that toggle disabled button
    const disabledToggle = defaultSection.getByRole('button', { name: 'Disabled' });
    await expect(disabledToggle).toBeVisible();
    // Initially should be disabled
    await expect(disabledToggle).toBeDisabled();
    await expect(disabledToggle).toHaveAttribute('disabled');
    // Verify that toggle disabled button toggle has the expected classes
    const disabledClassList = await disabledToggle.getAttribute('class');
    expect(disabledClassList).toContain('font-medium');
    expect(disabledClassList).toContain('text-neutral-fg');
    expect(disabledClassList).toContain('hover:bg-neutral-bg');
    expect(disabledClassList).toContain('hover:text-neutral-fg');

    // Verify that toggle italic button
    const italicToggle = defaultSection.locator('button[aria-label="Toggle italic italic"]');
    await expect(italicToggle).toBeVisible();
    await expect(italicToggle).toBeEnabled();
    await italicToggle.click();
    // Verify that toggle underline button toggle has the expected classes
    const italicClassList = await italicToggle.getAttribute('class');
    expect(italicClassList).toContain('font-medium');
    expect(italicClassList).toContain('text-neutral-fg');
    expect(italicClassList).toContain('hover:bg-neutral-bg');
    expect(italicClassList).toContain('hover:text-neutral-fg');
    expect(italicClassList).toContain('data-[state=on]:bg-primary-bg');
    expect(italicClassList).toContain('data-[state=on]:text-primary-fg');
    expect(italicClassList).toContain('outline-none');
    expect(italicClassList).toContain('whitespace-nowrap');
    expect(italicClassList).toContain('bg-transparent');
    expect(italicClassList).toContain('rounded-md');

    // Verify that toggle bookmark button
    const bookmarkToggle = defaultSection.locator('button[aria-label="Toggle book"]');
    await expect(bookmarkToggle).toBeVisible();
    await expect(bookmarkToggle).toBeEnabled();
    await bookmarkToggle.click();
    // Verify that toggle bookmark button toggle has the expected classes
    const bookmarkClassList = await bookmarkToggle.getAttribute('class');
    expect(bookmarkClassList).toContain('font-medium');
    expect(bookmarkClassList).toContain('text-neutral-fg');
    expect(bookmarkClassList).toContain('hover:bg-neutral-bg');
    expect(bookmarkClassList).toContain('hover:text-neutral-fg');
    expect(bookmarkClassList).toContain('data-[state=on]:bg-primary-bg');
    expect(bookmarkClassList).toContain('data-[state=on]:text-primary-fg');
    expect(bookmarkClassList).toContain('outline-none');
    expect(bookmarkClassList).toContain('whitespace-nowrap');
    expect(bookmarkClassList).toContain('bg-transparent');
    expect(bookmarkClassList).toContain('rounded-md');
}

export async function testToggleSize(page: Page){
    // verify that size toggles section is visible
    const sizeSection = page.locator('[id="toggle-size"]');
    await expect(sizeSection).toBeVisible();

    // Verify that Icon toggle button sizes are visible
    // Verify that toggle default button size
    const defaultIconToggle = sizeSection.locator('button[aria-label="Toggle bold"]').nth(0);
    await expect(defaultIconToggle).toBeVisible();
    await expect(defaultIconToggle).toBeEnabled();
    await defaultIconToggle.click();
    // Verify that default button toggle has the expected classes
    const defaultIconClassList = await defaultIconToggle.getAttribute('class');
    expect(defaultIconClassList).toContain('h-10');
    expect(defaultIconClassList).toContain('min-w-10');
    expect(defaultIconClassList).toContain('px-4');
    // Verify that toggle small button size
    const smallIconToggle = sizeSection.locator('button[aria-label="Toggle bold"]').nth(1);
    await expect(smallIconToggle).toBeVisible();
    await expect(smallIconToggle).toBeEnabled();
    await smallIconToggle.click();
    // Verify that default button toggle has the expected classes
    const smallIconClassList = await smallIconToggle.getAttribute('class');
    expect(smallIconClassList).toContain('h-8');
    expect(smallIconClassList).toContain('min-w-8');
    expect(smallIconClassList).toContain('px-3');
    // Verify that toggle extrasmall button size
    const extraSmallIconToggle = sizeSection.locator('button[aria-label="Toggle bold"]').nth(2);
    await expect(extraSmallIconToggle).toBeVisible();
    await expect(extraSmallIconToggle).toBeEnabled();
    await extraSmallIconToggle.click();
    // Verify that default button toggle has the expected classes
    const extraSmallIconClassList = await extraSmallIconToggle.getAttribute('class');
    expect(extraSmallIconClassList).toContain('h-6');
    expect(extraSmallIconClassList).toContain('min-w-6');
    expect(extraSmallIconClassList).toContain('px-2');

    // Verify that Text toggle button sizes are visible
    // Verify that toggle default text button size
    const defaultTextToggle = sizeSection.getByRole('button', { name: 'Text Toggle' }).nth(0);
    await expect(defaultTextToggle).toBeVisible();
    await expect(defaultTextToggle).toBeEnabled();
    await defaultTextToggle.click();
    // Verify that default text button toggle has the expected classes
    const defaultTextClassList = await defaultTextToggle.getAttribute('class');
    expect(defaultTextClassList).toContain('h-10');
    expect(defaultTextClassList).toContain('min-w-10');
    expect(defaultTextClassList).toContain('px-4');
    // Verify that toggle small text button size
    const smallTextToggle = sizeSection.getByRole('button', { name: 'Text Toggle' }).nth(1);
    await expect(smallTextToggle).toBeVisible();
    await expect(smallTextToggle).toBeEnabled();
    await smallTextToggle.click();
    // Verify that small text button toggle has the expected classes
    const smallTextClassList = await smallTextToggle.getAttribute('class');
    expect(smallTextClassList).toContain('h-8');
    expect(smallTextClassList).toContain('min-w-8');
    expect(smallTextClassList).toContain('px-3');
    // Verify that toggle extrasmall text button size
    const extraSmallTextToggle = sizeSection.getByRole('button', { name: 'Text Toggle' }).nth(2);
    await expect(extraSmallTextToggle).toBeVisible();
    await expect(extraSmallTextToggle).toBeEnabled();
    await extraSmallTextToggle.click();
    // Verify that extra small text button toggle has the expected classes
    const extraSmallTextClassList = await extraSmallTextToggle.getAttribute('class');
    expect(extraSmallTextClassList).toContain('h-6');
    expect(extraSmallTextClassList).toContain('min-w-6');
    expect(extraSmallTextClassList).toContain('px-2');

    // Verify that Text with Icon toggle button sizes are visible
    // Verify that toggle default text with icon button size
    const defaultTextWithIconToggle = sizeSection.locator('button[aria-label="Grid view"]').nth(0);
    await expect(defaultTextWithIconToggle).toBeVisible();
    await expect(defaultTextWithIconToggle).toBeEnabled();
    await defaultTextWithIconToggle.click();
    // Verify that default text with icon button toggle has the expected classes
    const defaultTextWithIconClassList = await defaultTextWithIconToggle.getAttribute('class');
    expect(defaultTextWithIconClassList).toContain('h-10');
    expect(defaultTextWithIconClassList).toContain('min-w-10');
    expect(defaultTextWithIconClassList).toContain('px-4');
    // Verify that toggle small text with icon button size
    const smallTextWithIconToggle = sizeSection.locator('button[aria-label="Grid view"]').nth(1);
    await expect(smallTextWithIconToggle).toBeVisible();
    await expect(smallTextWithIconToggle).toBeEnabled();
    await smallTextWithIconToggle.click();
    // Verify that small text with icon button toggle has the expected classes
    const smallTextWithIconClassList = await smallTextWithIconToggle.getAttribute('class');
    expect(smallTextWithIconClassList).toContain('h-8');
    expect(smallTextWithIconClassList).toContain('min-w-8');
    expect(smallTextWithIconClassList).toContain('px-3');
    // Verify that toggle extrasmall text with icon button size
    const extraSmallTextWithIconToggle = sizeSection.locator('button[aria-label="Grid view"]').nth(2);
    await expect(extraSmallTextWithIconToggle).toBeVisible();
    await expect(extraSmallTextWithIconToggle).toBeEnabled();
    await extraSmallTextWithIconToggle.click();
    // Verify that extra small text with icon button toggle has the expected classes
    const extraSmallTextWithIconClassList = await extraSmallTextWithIconToggle.getAttribute('class');
    expect(extraSmallTextWithIconClassList).toContain('h-6');
    expect(extraSmallTextWithIconClassList).toContain('min-w-6');
    expect(extraSmallTextWithIconClassList).toContain('px-2');
}

export async function testToggleVariant(page: Page){
    // verify that variant toggles section is visible
    const variantSection = page.locator('[id="toggle-variant"]');
    await expect(variantSection).toBeVisible();

    // Verify that Square toggle button variants are visible
    // Verify that toggle square bold button variant
    const squareBoldToggle = variantSection.locator('button[aria-label="Toggle bold"]').nth(0);
    await expect(squareBoldToggle).toBeVisible();
    await expect(squareBoldToggle).toBeEnabled();
    await squareBoldToggle.click();
    // Verify that square bold button variant toggle has the expected classes
    const squareBoldClassList = await squareBoldToggle.getAttribute('class');
    expect(squareBoldClassList).toContain('font-medium');
    expect(squareBoldClassList).toContain('text-neutral-fg');
    expect(squareBoldClassList).toContain('hover:bg-neutral-bg');
    expect(squareBoldClassList).toContain('hover:text-neutral-fg');
    expect(squareBoldClassList).toContain('data-[state=on]:bg-primary-bg');
    expect(squareBoldClassList).toContain('data-[state=on]:text-primary-fg');
    expect(squareBoldClassList).toContain('outline-none');
    expect(squareBoldClassList).toContain('transition-[color,box-shadow]');
    expect(squareBoldClassList).toContain('whitespace-nowrap');
    expect(squareBoldClassList).toContain('bg-transparent');
    expect(squareBoldClassList).toContain('rounded-md');
    // Verify that toggle square Text button variant
    const squareTextToggle = variantSection.getByRole('button', { name: 'Text Toggle' }).nth(0);
    await expect(squareTextToggle).toBeVisible();
    await expect(squareTextToggle).toBeEnabled();
    await squareTextToggle.click(); 
    // Verify that square text button variant toggle has the expected classes
    const squareItalicToggle = variantSection.locator('button[aria-label="Toggle italic"]').nth(0);
    await expect(squareItalicToggle).toBeVisible();
    await expect(squareItalicToggle).toBeEnabled();
    await squareItalicToggle.click();

    // Verify that Outline toggle button variants are visible
    // Verify that toggle outline bold button variant
    const outlineBoldToggle = variantSection.locator('button[aria-label="Toggle bold"]').nth(1);
    await expect(outlineBoldToggle).toBeVisible();
    await expect(outlineBoldToggle).toBeEnabled();
    await outlineBoldToggle.click();
    // Verify that outline bold button variant toggle has the expected classes
    const outlineBoldClassList = await outlineBoldToggle.getAttribute('class');
    expect(outlineBoldClassList).toContain('font-medium');
    expect(outlineBoldClassList).toContain('text-neutral-fg');
    expect(outlineBoldClassList).toContain('hover:bg-neutral-bg');
    expect(outlineBoldClassList).toContain('hover:text-accent-foreground');
    expect(outlineBoldClassList).toContain('data-[state=on]:bg-primary-bg');
    expect(outlineBoldClassList).toContain('data-[state=on]:text-primary-fg');
    expect(outlineBoldClassList).toContain('bg-backgrounds');
    expect(outlineBoldClassList).toContain('whitespace-nowrap');
    expect(outlineBoldClassList).toContain('border');
    expect(outlineBoldClassList).toContain('rounded-md');
    // Verify that toggle outline Text button variant
    const outlineTextToggle = variantSection.getByRole('button', { name: 'Text Toggle' }).nth(1);
    await expect(outlineTextToggle).toBeVisible();
    await expect(outlineTextToggle).toBeEnabled();
    await outlineTextToggle.click(); 
    // Verify that outline text button variant toggle has the expected classes
    const outlineItalicToggle = variantSection.locator('button[aria-label="Toggle italic"]').nth(1);
    await expect(outlineItalicToggle).toBeVisible();
    await expect(outlineItalicToggle).toBeEnabled();
    await outlineItalicToggle.click();

    // Verify that Rounded toggle button variants are visible
    // Verify that toggle rounded bold button variant
    const roundedBoldToggle = variantSection.locator('button[aria-label="Toggle bold"]').nth(2);
    await expect(roundedBoldToggle).toBeVisible();
    await expect(roundedBoldToggle).toBeEnabled();
    await roundedBoldToggle.click();
    // Verify that rounded bold button variant toggle has the expected classes
    const roundedBoldClassList = await roundedBoldToggle.getAttribute('class');
    expect(roundedBoldClassList).toContain('font-medium');
    expect(roundedBoldClassList).toContain('text-neutral-fg');
    expect(roundedBoldClassList).toContain('hover:bg-neutral-bg');
    expect(roundedBoldClassList).toContain('hover:text-neutral-fg');
    expect(roundedBoldClassList).toContain('data-[state=on]:bg-primary-bg');
    expect(roundedBoldClassList).toContain('data-[state=on]:text-primary-fg');
    expect(roundedBoldClassList).toContain('bg-transparent');
    expect(roundedBoldClassList).toContain('whitespace-nowrap');
    expect(roundedBoldClassList).toContain('outline-none');
    expect(roundedBoldClassList).toContain('rounded-full');
    // Verify that toggle rounded Text button variant
    const roundedTextToggle = variantSection.getByRole('button', { name: 'Text Toggle' }).nth(2);
    await expect(roundedTextToggle).toBeVisible();
    await expect(roundedTextToggle).toBeEnabled();
    await roundedTextToggle.click(); 
    // Verify that rounded text button variant toggle has the expected classes
    const roundedItalicToggle = variantSection.locator('button[aria-label="Toggle italic"]').nth(2);
    await expect(roundedItalicToggle).toBeVisible();
    await expect(roundedItalicToggle).toBeEnabled();
    await roundedItalicToggle.click();
}