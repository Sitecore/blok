import { test, expect, Page } from '@playwright/test';

export async function testToggleGroupSquare(page: Page){
    // verify that square toggles section is visible
    const toggleGroupSquare = page.locator('[id="toggle-group"] , [data-variant="square"]');

    // Verify that toggle square bold button
    const boldToggle = toggleGroupSquare.locator('button[aria-label="Toggle bold"]');
    await expect(boldToggle).toBeVisible();
    // Initially should be off
    await expect(boldToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await boldToggle.click();
    await expect(boldToggle).toHaveAttribute('data-state', 'on');

    // Verify that square bold button toggle has the expected classes
    const classList = await boldToggle.getAttribute('class');
    expect(classList).toContain('font-medium');
    expect(classList).toContain('text-neutral-fg');
    expect(classList).toContain('hover:bg-muted');
    expect(classList).toContain('hover:text-muted-foreground');
    expect(classList).toContain('data-[state=on]:bg-primary-bg');
    expect(classList).toContain('data-[state=on]:text-primary-fg');
    expect(classList).toContain('outline-none');
    expect(classList).toContain('transition-[color,box-shadow]');
    expect(classList).toContain('whitespace-nowrap');
    expect(classList).toContain('bg-transparent');
    expect(classList).toContain('rounded-md');

    // Verify that toggle italic toggle with text
    const italicToggle = toggleGroupSquare.locator('button[aria-label="Toggle italic"]');
    await expect(italicToggle).toBeVisible();
    // Initially should be off
    await expect(italicToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await italicToggle.click();
    await expect(italicToggle).toHaveAttribute('data-state', 'on');

    // Verify that toggle underline bold button
    const underlineToggle = toggleGroupSquare.locator('button[aria-label="Toggle strikethrough"]');
    await expect(underlineToggle).toBeVisible();
    // Initially should be off
    await expect(underlineToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await underlineToggle.click();
    await expect(underlineToggle).toHaveAttribute('data-state', 'on');
}

export async function testToggleGroupRounded(page: Page){
    // verify that rounded toggles section is visible
    const toggleGroupRounded = page.locator('[id="toggle-group"] , [data-variant="rounded"]');

    // Verify that toggle All button
    const allToggle = toggleGroupRounded.locator('button[aria-label="Toggle all"]');
    await expect(allToggle).toBeVisible();
    // Initially should be off
    await expect(allToggle).toHaveAttribute('data-state', 'on');
    // Click to toggle on
    await allToggle.click();
    await expect(allToggle).toHaveAttribute('data-state', 'off');

    // Verify that toggle Missed button
    const missedToggle = toggleGroupRounded.locator('button[aria-label="Toggle missed"]');
    await expect(missedToggle).toBeVisible();
    // Initially should be off
    await expect(missedToggle).toHaveAttribute('data-state', 'off');
    // Click to toggle on
    await missedToggle.click();
    await expect(missedToggle).toHaveAttribute('data-state', 'on');

    // Verify that square bold button toggle has the expected classes
    const classList = await allToggle.getAttribute('class');
    expect(classList).toContain('font-medium');
    expect(classList).toContain('text-neutral-fg');
    expect(classList).toContain('hover:bg-muted');
    expect(classList).toContain('hover:text-muted-foreground');
    expect(classList).toContain('data-[state=on]:bg-primary-bg');
    expect(classList).toContain('data-[state=on]:text-primary-fg');
    expect(classList).toContain('outline-none');
    expect(classList).toContain('transition-[color,box-shadow]');
    expect(classList).toContain('whitespace-nowrap');
    expect(classList).toContain('bg-transparent');
    expect(classList).toContain('rounded-full');

    // Verify that support single selection in rounded toggle group
    // When click all toggle, missed toggle should be off
    await allToggle.click();
    await expect(allToggle).toHaveAttribute('data-state', 'on');
    await expect(missedToggle).toHaveAttribute('data-state', 'off');
    // When click missed toggle, all toggle should be off
    await missedToggle.click();
    await expect(missedToggle).toHaveAttribute('data-state', 'on');
    await expect(allToggle).toHaveAttribute('data-state', 'off');
}