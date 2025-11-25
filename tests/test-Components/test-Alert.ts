import { test, expect, Page } from '@playwright/test';

export async function testPrimaryAlert(page: Page){

  // Find the alert that contains the title 'Primary Alert'
    const primaryAlert = page.locator('[data-slot="alert"]').filter({ hasText: 'Primary Alert' }).first();
    await expect(primaryAlert).toBeVisible();

  // Assert icon (svg) is present
    const primarysvg = primaryAlert.locator('svg');
    await expect(primarysvg).toBeVisible();

  // Read computed background color
    const primarybg = await primaryAlert.evaluate(el => getComputedStyle(el as HTMLElement).backgroundColor);
  
  // Normalize and accept light and dark theme variants
    const normalized = primarybg.replace(/\s+/g, '');
    const accepted = [
      'rgb(234,231,255)',          // light theme: --color-primary-100 (#eae7ff)
      'rgba(217,212,255,0.12)',    // dark theme overlay value (example)
      'rgba(234,231,255,1)'        // possible rgba form for exact match
    ];
    expect(accepted.includes(normalized)).toBeTruthy();

  // Verify title and description text are present
    await expect(primaryAlert.locator('[data-slot="alert-title"]')).toContainText('Primary Alert');
    await expect(primaryAlert.locator('[data-slot="alert-description"]')).toContainText('This is a primary alert with a title and description.');

}

export async function testClosablePrimaryAlert(page: Page){

  // Test closable primary alert (there is a separate alert with a close button)
    const closable = page.locator('[data-slot="alert"]').filter({ hasText: 'Closable primary Alert' }).first();
    await expect(closable).toBeVisible();

  //const closeBtn = closable.getByRole('button', { name: 'Close alert' });
    const closeBtn = closable.locator('button[aria-label="Close alert"]');
    await expect(closeBtn).toBeVisible();

}

export async function testPrimaryAlertLink(page: Page){

  // Find the alert that contains the title 'Primary Alert with Link'
    const longPrimary = page.locator('[data-slot="alert"]').filter({ hasText: 'This is an extremely long alert title' }).first();
    await expect(longPrimary).toBeVisible();

  // Find inline link button labelled 'Click'
    const linkBtn = longPrimary.getByRole('button', { name: 'Click' });
    await expect(linkBtn).toBeVisible();
    await expect(linkBtn).toBeEnabled();

  // Check text color (uses --color-primary-500)
    const color = await linkBtn.evaluate((el) => getComputedStyle(el as HTMLElement).color);
    expect(color).toMatch(/^rgba?\(\s*110,\s*63,\s*255/);

  // Hover to check underline (some browsers reflect text-decoration)
    await linkBtn.hover();
  // Verify computed textDecorationLine contains 'underline' if supported
    const textDecoration = await linkBtn.evaluate(el => getComputedStyle(el as HTMLElement).textDecorationLine || getComputedStyle(el as HTMLElement).textDecoration);
    expect(/underline/i.test(textDecoration || '')).toBeTruthy();
}

