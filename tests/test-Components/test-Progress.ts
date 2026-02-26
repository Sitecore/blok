import { test, expect, Page } from '@playwright/test';

export async function testProgress(page: Page){
    // Verify that the Default progress component is visible
    const progressDefault = page.locator('[data-slot="progress"][aria-label="Progress: 80%"]');
    await expect(progressDefault).toBeVisible();

    // Verify that the Default Progress has the expected attributes
    await expect(progressDefault).toHaveAttribute('aria-valuemin', '0');
    await expect(progressDefault).toHaveAttribute('aria-valuemax', '100');
    await expect(progressDefault).toHaveAttribute('data-max', '100');
    await expect(progressDefault).toHaveAttribute('class', 'relative h-2 w-full overflow-hidden rounded-full bg-neutral-bg');

    // Verify that the Default Progress indicator has the expected class attributes
    const defaultIndicatorClass = await progressDefault.locator('[data-slot="progress-indicator"]').getAttribute('class');
    expect(defaultIndicatorClass).toContain('h-full');
    expect(defaultIndicatorClass).toContain('rounded-full');
    expect(defaultIndicatorClass).toContain('transition-all');
    expect(defaultIndicatorClass).toContain('flex-1');
    expect(defaultIndicatorClass).toContain('w-full');
    expect(defaultIndicatorClass).toContain('bg-primary');

    // Verify that the Indeterminate progress component is visible
    const progressIndeterminate = page.locator('[data-slot="progress"][aria-label="Progress"]');
    await expect(progressIndeterminate).toBeVisible();

    // Verify that the Indeterminate Progress has the expected attributes
    await expect(progressIndeterminate).toHaveAttribute('aria-valuemin', '0');
    await expect(progressIndeterminate).toHaveAttribute('aria-valuemax', '100');
    await expect(progressIndeterminate).toHaveAttribute('data-max', '100');
    await expect(progressIndeterminate).toHaveAttribute('class', 'relative h-2 w-full overflow-hidden rounded-full bg-neutral-bg');

    // Verify that the Indeterminate Progress indicator has the expected class attributes
    const IndeterminateIndicatorClass = await progressIndeterminate.locator('[data-slot="progress-indicator"]').getAttribute('class');
    expect(IndeterminateIndicatorClass).toContain('h-full');
    expect(IndeterminateIndicatorClass).toContain('rounded-full');
    expect(IndeterminateIndicatorClass).toContain('transition-all');
    expect(IndeterminateIndicatorClass).toContain('absolute');
    expect(IndeterminateIndicatorClass).toContain('min-w-[50%]');
    expect(IndeterminateIndicatorClass).toContain('w-[50%]');
    expect(IndeterminateIndicatorClass).toContain('bg-primary');
}