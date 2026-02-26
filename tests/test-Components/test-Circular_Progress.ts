import { test, expect, Page } from '@playwright/test';

export async function testCircularProgress(page: Page){
  // Verify that the Default Circular Progress is visible
  const circularDefault = page.locator('[data-slot="circular-progress"][data-variant="default"]');
  await expect(circularDefault).toBeVisible();

  // Verify that the Default Circular Progress has the expected attributes
  await expect(circularDefault).toHaveAttribute('aria-valuemin', '0');
  await expect(circularDefault).toHaveAttribute('aria-valuemax', '100');
  await expect(circularDefault).toHaveAttribute('aria-valuenow', '70');
  await expect(circularDefault).toHaveAttribute('aria-label', 'Progress: 70%');

  // Verify that the Default Circular Progress track has the expected attributes
  const circularDefaultTrack = circularDefault.locator('[data-slot="circular-progress-track"]');
  await expect(circularDefaultTrack).toHaveAttribute('stroke-width', '10px'); 
  await expect(circularDefaultTrack).toHaveAttribute('class', 'stroke-gray-200');

  // Verify that the Default Circular Progress indicator has the expected attributes
  const circularDefaultIndicator = circularDefault.locator('[data-slot="circular-progress-indicator"]');
  await expect(circularDefaultIndicator).toHaveAttribute('stroke-width', '10px'); 
  await expect(circularDefaultIndicator).toHaveAttribute('stroke-linecap', 'round');
  await expect(circularDefaultIndicator).toHaveAttribute('stroke-dasharray', '263.89378290154264 263.89378290154264');
  await expect(circularDefaultIndicator).toHaveAttribute('stroke-dashoffset', '79.16813487046281');
  await expect(circularDefaultIndicator).toHaveAttribute('transform', 'rotate(-90 50 50)');
  await expect(circularDefaultIndicator).toHaveAttribute('class', 'stroke-primary transition-[stroke-dasharray,stroke-dashoffset] duration-300');

  // Verify that the Indeterminate Circular Progress is visible
  const circularIndeterminate = page.locator('[data-slot="circular-progress"][data-variant="indeterminate"]');
  await expect(circularIndeterminate).toBeVisible();

  // Verify that the Indeterminate Circular Progress has the expected attributes
  await expect(circularIndeterminate).toHaveAttribute('aria-valuemin', '0');
  await expect(circularIndeterminate).toHaveAttribute('aria-valuemax', '100');

  // Verify that the Indeterminate Circular Progress track has the expected attributes
  const circularIndeterminateTrack = circularIndeterminate.locator('[data-slot="circular-progress-track"]');
  await expect(circularIndeterminateTrack).toHaveAttribute('stroke-width', '10px'); 
  await expect(circularIndeterminateTrack).toHaveAttribute('class', 'stroke-gray-200');

  // Verify that the Indeterminate Circular Progress indicator has the expected attributes
  const circularIndeterminateIndicator = circularIndeterminate.locator('[data-slot="circular-progress-indicator"]');
  await expect(circularIndeterminateIndicator).toHaveAttribute('stroke-width', '10px'); 
  await expect(circularIndeterminateIndicator).toHaveAttribute('stroke-linecap', 'round');
  await expect(circularIndeterminateIndicator).toHaveAttribute('transform', 'rotate(-90 50 50)');
  await expect(circularIndeterminateIndicator).toHaveAttribute('class', 'stroke-primary');
}