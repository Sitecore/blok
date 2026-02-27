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
    expect(classList).toContain('hover:bg-neutral-bg');
    expect(classList).toContain('hover:text-neutral-fg');
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
    expect(classList).toContain('hover:bg-neutral-bg');
    expect(classList).toContain('hover:text-neutral-fg');
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

export async function testToggleGroupSizes(page: Page){
    // verify that Icon sizes toggles is visible
    const iconSizesToggles = page.locator('[id="toggle-group-sizes"]');
    await expect(iconSizesToggles).toBeVisible();

    // verify that Icon size default toggle is visible
    const iconSizeDefaultToggle = iconSizesToggles.locator('[data-slot="toggle-group"] , [data-size="default"]').nth(0);
    await expect(iconSizeDefaultToggle).toBeVisible();
    await expect(iconSizeDefaultToggle).toBeEnabled();
    await iconSizeDefaultToggle.click();
    await expect(iconSizeDefaultToggle).toHaveAttribute('data-size', 'default');
    // verify that Icon size small toggle is visible
    const iconSizeSmallToggle = iconSizesToggles.locator('[data-slot="toggle-group"][data-size="sm"]').nth(0);
    await expect(iconSizeSmallToggle).toBeVisible();
    await expect(iconSizeSmallToggle).toBeEnabled();
    await iconSizeSmallToggle.click();
    await expect(iconSizeSmallToggle).toHaveAttribute('data-size', 'sm');
    // verify that Icon size extra small toggle is visible
    const iconSizeExtraSmallToggle = iconSizesToggles.locator('[data-slot="toggle-group"][data-size="xs"]').nth(0);
    await expect(iconSizeExtraSmallToggle).toBeVisible();
    await expect(iconSizeExtraSmallToggle).toBeEnabled();
    await iconSizeExtraSmallToggle.click();
    await expect(iconSizeExtraSmallToggle).toHaveAttribute('data-size', 'xs');

    // verify that Icon with Text size default toggle is visible
    const iconWithTextSizeDefaultToggle = iconSizesToggles.locator('[data-slot="toggle-group"] , [data-size="default"]').nth(1);
    await expect(iconWithTextSizeDefaultToggle).toBeVisible(); 
    await expect(iconWithTextSizeDefaultToggle).toBeEnabled();
    await iconWithTextSizeDefaultToggle.click();
    await expect(iconWithTextSizeDefaultToggle).toHaveAttribute('data-size', 'default');
    // verify that Icon with Text size small toggle is visible
    const iconWithTextSizeSmallToggle = iconSizesToggles.locator('[data-slot="toggle-group"][data-size="sm"]').nth(1);
    await expect(iconWithTextSizeSmallToggle).toBeVisible();
    await expect(iconWithTextSizeSmallToggle).toBeEnabled();
    await iconWithTextSizeSmallToggle.click();
    await expect(iconWithTextSizeSmallToggle).toHaveAttribute('data-size', 'sm');
    // verify that Icon with Text size extra small toggle is visible
    const iconWithTextSizeExtraSmallToggle = iconSizesToggles.locator('[data-slot="toggle-group"][data-size="xs"]').nth(1);
    await expect(iconWithTextSizeExtraSmallToggle).toBeVisible();   
    await expect(iconWithTextSizeExtraSmallToggle).toBeEnabled();
    await iconWithTextSizeExtraSmallToggle.click();
    await expect(iconWithTextSizeExtraSmallToggle).toHaveAttribute('data-size', 'xs');
}