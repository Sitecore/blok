import { test, expect, Page } from '@playwright/test';

export async function testSpinnerDefault(page: Page){
    // Verify that the spinner section is visible
    const spinnerSection = page.locator('#spinner-default');
    await expect(spinnerSection).toBeVisible();
    
    // Verify that the default spinner is visible
    const defaultSpinner = spinnerSection.locator('svg').nth(0);
    await expect(defaultSpinner).toBeVisible();

    // Verify that the Default Spinner has the expected attributes
    await expect(defaultSpinner).toHaveAttribute('width', '24');
    await expect(defaultSpinner).toHaveAttribute('height', '24');
    await expect(defaultSpinner).toHaveAttribute('viewBox', '0 0 24 24');
    await expect(defaultSpinner).toHaveAttribute('fill', 'none');
    await expect(defaultSpinner).toHaveAttribute('stroke', 'currentColor');
    await expect(defaultSpinner).toHaveAttribute('stroke-width', '2');
    await expect(defaultSpinner).toHaveAttribute('stroke-linecap', 'round');
    await expect(defaultSpinner).toHaveAttribute('stroke-linejoin', 'round');

    // Verify default spinner has expected classes
    const defaultSpinnerClass = await defaultSpinner.getAttribute('class');
    expect(defaultSpinnerClass).toContain('lucide');
    expect(defaultSpinnerClass).toContain('lucide-loader-circle');
    expect(defaultSpinnerClass).toContain('size-4');
    expect(defaultSpinnerClass).toContain('animate-spin');
    expect(defaultSpinnerClass).toContain('text-neutral-fg');

    // Verify that the primary spinner is visible
    const primarySpinner = spinnerSection.locator('svg').nth(1);
    await expect(primarySpinner).toBeVisible();

    // Verify that the Primary Spinner has the expected attributes
    await expect(primarySpinner).toHaveAttribute('width', '24');
    await expect(primarySpinner).toHaveAttribute('height', '24');
    await expect(primarySpinner).toHaveAttribute('viewBox', '0 0 24 24');
    await expect(primarySpinner).toHaveAttribute('fill', 'none');
    await expect(primarySpinner).toHaveAttribute('stroke', 'currentColor');
    await expect(primarySpinner).toHaveAttribute('stroke-width', '2');
    await expect(primarySpinner).toHaveAttribute('stroke-linecap', 'round');
    await expect(primarySpinner).toHaveAttribute('stroke-linejoin', 'round');

    // Verify primary spinner has expected classes
    const primarySpinnerClass = await primarySpinner.getAttribute('class');
    expect(primarySpinnerClass).toContain('lucide');
    expect(primarySpinnerClass).toContain('lucide-loader-circle');
    expect(primarySpinnerClass).toContain('size-4');
    expect(primarySpinnerClass).toContain('animate-spin');
    expect(primarySpinnerClass).toContain('text-primary-fg');
}

export async function testSpinnerSize(page: Page){
    // Verify spinner sizes section is visible
    const sizeSpinnerSection = page.locator('#spinner-size');
    await expect(sizeSpinnerSection).toBeVisible();
    
    // Verify that the size-3 spinner is visible
    const size3Spinner = sizeSpinnerSection.locator('svg').nth(0);
    await expect(size3Spinner).toBeVisible();
    // Verify size-3 spinner has expected classes
    const size3SpinnerClass = await size3Spinner.getAttribute('class');
    expect(size3SpinnerClass).toContain('lucide');
    expect(size3SpinnerClass).toContain('lucide-loader-circle');
    expect(size3SpinnerClass).toContain('animate-spin');
    expect(size3SpinnerClass).toContain('text-neutral-fg');
    expect(size3SpinnerClass).toContain('size-3');
    
    // Verify that the size-4 spinner is visible
    const size4Spinner = sizeSpinnerSection.locator('svg').nth(1);
    await expect(size4Spinner).toBeVisible();
    // Verify size-4 spinner has expected classes
    const size4SpinnerClass = await size4Spinner.getAttribute('class');
    expect(size4SpinnerClass).toContain('lucide');
    expect(size4SpinnerClass).toContain('lucide-loader-circle');
    expect(size4SpinnerClass).toContain('animate-spin');
    expect(size4SpinnerClass).toContain('text-neutral-fg');
    expect(size4SpinnerClass).toContain('size-4');

    // Verify that the size-6 spinner is visible
    const size6Spinner = sizeSpinnerSection.locator('svg').nth(2);
    await expect(size6Spinner).toBeVisible();
    // Verify size-6 spinner has expected classes
    const size6SpinnerClass = await size6Spinner.getAttribute('class');
    expect(size6SpinnerClass).toContain('lucide');
    expect(size6SpinnerClass).toContain('lucide-loader-circle');
    expect(size6SpinnerClass).toContain('animate-spin');
    expect(size6SpinnerClass).toContain('text-neutral-fg');
    expect(size6SpinnerClass).toContain('size-6');

    // Verify that the size-8 spinner is visible
    const size8Spinner = sizeSpinnerSection.locator('svg').nth(3);
    await expect(size8Spinner).toBeVisible();
    // Verify size-8 spinner has expected classes
    const size8SpinnerClass = await size8Spinner.getAttribute('class');
    expect(size8SpinnerClass).toContain('lucide');
    expect(size8SpinnerClass).toContain('lucide-loader-circle');
    expect(size8SpinnerClass).toContain('animate-spin');
    expect(size8SpinnerClass).toContain('text-neutral-fg');
    expect(size8SpinnerClass).toContain('size-8');
}