import { test, expect, Page } from '@playwright/test';

export async function testSpinnerDefault(page: Page){
    // Verify that the spinner is visible
    const spinnerDefault = page.locator('[id="spinner-default"]');
    await expect(spinnerDefault).toBeVisible();

    // Verify that spinner has the expected classes
    const classList = await spinnerDefault.locator('[data-testid="spinner"]').getAttribute('class');
    expect(classList).toContain('inline-block');
    expect(classList).toContain('rounded-full');
    expect(classList).toContain('border-4');
    expect(classList).toContain('border-t-purple-600');
    expect(classList).toContain('border-r-purple-600');
    expect(classList).toContain('border-b-gray-200');
    expect(classList).toContain('border-l-gray-200');
    expect(classList).toContain('w-6');
    expect(classList).toContain('h-6');
}

export async function testSpinnerCircular(page: Page){
    // Verify that the spinner is visible
    const spinnerCircular = page.locator('[id="spinner-circular"]');
    await expect(spinnerCircular).toBeVisible();

    // Verify that spinner has the expected classes
    const animateClass = await spinnerCircular.locator('[data-testid="spinner"]').getAttribute('class');
    expect(animateClass).toContain('animate-spin');

    // Verify that the circular spinner is rotating (animation)
    const animateSpinner = spinnerCircular.locator('[data-testid="spinner"]');
    const animation = await animateSpinner.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          animationName: styles.animationName,
          animationDuration: styles.animationDuration,
          animationIterationCount: styles.animationIterationCount,
        };
      });
      
      // Verify animation properties
      expect(animation.animationName).not.toBe('none');
      expect(animation.animationDuration).not.toBe('0s');
      expect(animation.animationIterationCount).toBe('infinite');
}

export async function testSpinnerMessage(page: Page){
    // Verify that the spinner is visible
    const spinnerWithMessage = page.locator('[id="spinner-with-message"]');
    await expect(spinnerWithMessage).toBeVisible();

    // Verify that display spinner with message
    const spinnerMessage = spinnerWithMessage.locator('text=Loading...')
    await expect(spinnerMessage).toContainText('Loading...');
}