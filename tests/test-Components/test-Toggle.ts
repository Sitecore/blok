import { test, expect, Page } from '@playwright/test';

export async function testToggleSquare(page: Page){
    // verify that square toggles section is visible
    const squareSection = page.locator('[id="toggle-square"]');
    await expect(squareSection).toBeVisible();

    // Verify that toggle square bold button
    const boldToggle = squareSection.locator('button[aria-label="Toggle bold"]');
    await expect(boldToggle).toBeVisible();

    // Verify that square bold button toggle has the expected classes
    const classList = await boldToggle.getAttribute('class');
    expect(classList).toContain('font-medium');
    expect(classList).toContain('text-neutral-fg');
    expect(classList).toContain('hover:bg-neutral-bg');
    expect(classList).toContain('hover:text-neutral-fg');
    expect(classList).toContain('data-[state=on]:bg-primary-bg');
    expect(classList).toContain('data-[state=on]:text-primary-fg');
    expect(classList).toContain('outline-none');
    expect(classList).toContain('transition-[color,box-shadow]');
    expect(classList).toContain('whitespace-nowrap');
    expect(classList).toContain('bg-transparent');
    expect(classList).toContain('rounded-md');
    
    // Initially should be off
    await expect(boldToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await boldToggle.click();
    await expect(boldToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await boldToggle.click();
    await expect(boldToggle).toHaveAttribute('data-state', 'off');

    // Verify that toggle square bold button
    const underlineToggle = squareSection.locator('button[aria-label="Toggle underline"]');
    await expect(underlineToggle).toBeVisible();
    // Initially should be off
    await expect(underlineToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await underlineToggle.click();
    await expect(underlineToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await underlineToggle.click();
    await expect(underlineToggle).toHaveAttribute('data-state', 'off');

    // Verify that not toggle disabled toggle
    const disabledToggle = squareSection.getByRole('button', { name: 'Disabled' });
    await expect(disabledToggle).toBeVisible();
    // Initially should be disabled
    await expect(disabledToggle).toBeDisabled();

    // Verify that toggle italic toggle with text
    const italicToggle = squareSection.locator('button[aria-label="Toggle italic italic"]');
    await expect(italicToggle).toBeVisible();
    // Initially should be off
    await expect(italicToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await italicToggle.click();
    await expect(italicToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await italicToggle.click();
    await expect(italicToggle).toHaveAttribute('data-state', 'off');
    // Verify text is visible
    await expect(italicToggle).toContainText('Italic');

    // Verify that toggle bookmark toggle
    const bookmarkToggle = squareSection.locator('button[aria-label="Toggle book"]');
    await expect(bookmarkToggle).toBeVisible();
    // Initially should be off
    await expect(bookmarkToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await bookmarkToggle.click();
    await expect(bookmarkToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await bookmarkToggle.click();
    await expect(bookmarkToggle).toHaveAttribute('data-state', 'off');
}

export async function testToggleRounded(page: Page){
    // verify that rounded toggles section is visible
    const roundedSection = page.locator('[id="toggle-rounded"]');
    await expect(roundedSection).toBeVisible();

    // Verify that toggle square bold button
    const boldToggle = roundedSection.locator('button[aria-label="Toggle bold"]');
    await expect(boldToggle).toBeVisible();

    // Verify that square bold button toggle has the expected classes
    const classList = await boldToggle.getAttribute('class');
    expect(classList).toContain('font-medium');
    expect(classList).toContain('text-neutral-fg');
    expect(classList).toContain('hover:bg-neutral-bg');
    expect(classList).toContain('hover:text-neutral-fg');
    expect(classList).toContain('data-[state=on]:bg-primary-bg');
    expect(classList).toContain('data-[state=on]:text-primary-fg');
    expect(classList).toContain('outline-none');
    expect(classList).toContain('transition-[color,box-shadow]');
    expect(classList).toContain('whitespace-nowrap');
    expect(classList).toContain('bg-transparent');
    expect(classList).toContain('rounded-full');
    
    // Initially should be off
    await expect(boldToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await boldToggle.click();
    await expect(boldToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await boldToggle.click();
    await expect(boldToggle).toHaveAttribute('data-state', 'off');

    // Verify that toggle square bold button
    const underlineToggle = roundedSection.locator('button[aria-label="Toggle underline"]');
    await expect(underlineToggle).toBeVisible();
    // Initially should be off
    await expect(underlineToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await underlineToggle.click();
    await expect(underlineToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await underlineToggle.click();
    await expect(underlineToggle).toHaveAttribute('data-state', 'off');

    // Verify that not toggle disabled toggle
    const disabledToggle = roundedSection.getByRole('button', { name: 'Disabled' });
    await expect(disabledToggle).toBeVisible();
    // Initially should be disabled
    await expect(disabledToggle).toBeDisabled();

    // Verify that toggle italic toggle with text
    const italicToggle = roundedSection.locator('button[aria-label="Toggle italic italic"]');
    await expect(italicToggle).toBeVisible();
    // Initially should be off
    await expect(italicToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await italicToggle.click();
    await expect(italicToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await italicToggle.click();
    await expect(italicToggle).toHaveAttribute('data-state', 'off');
    // Verify text is visible
    await expect(italicToggle).toContainText('Italic');

    // Verify that toggle bookmark toggle
    const bookmarkToggle = roundedSection.locator('button[aria-label="Toggle book"]');
    await expect(bookmarkToggle).toBeVisible();
    // Initially should be off
    await expect(bookmarkToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await bookmarkToggle.click();
    await expect(bookmarkToggle).toHaveAttribute('data-state', 'on');
    // Click again to toggle off
    await bookmarkToggle.click();
    await expect(bookmarkToggle).toHaveAttribute('data-state', 'off');
}