import { test, expect, Page } from '@playwright/test';

export async function testToastNormal(page: Page){
    // Verify that normal toast when clicking Normal Toast button
    const normalToastButton = page.locator('[id="toast-normal"]');
    await expect(normalToastButton).toBeVisible();
    await normalToastButton.click();

    // Wait for toast to appear
    const toast = page.locator('[class="!border-none !bg-info-bg !bg-info-bg"]');
    await expect(toast).toBeVisible();

    // Verify toast message
    await expect(toast).toContainText('Toast');

    // Verift that icon is present within the toast
    const iconContainer = toast.locator('[class="text-info"]').first();
    await expect(iconContainer).toBeVisible();
    // Verify SVG icon is present
    const svgIcon = iconContainer.locator('svg').first();
    await expect(svgIcon).toBeVisible();
    // Verify the path element exists
    const pathElement = svgIcon.locator('path').first();
    await expect(pathElement).toBeVisible();
    // Verify the path has data (d attribute)
    const pathData = await pathElement.getAttribute('d');
    expect(pathData).toBeTruthy();
    expect(pathData?.length).toBeGreaterThan(0);
}

export async function testToastSuccessful(page: Page){
    // Verify that successful toast when clicking Successful Toast button
    const successfulToastButton = page.locator('[id="toast-successful"]');
    await expect(successfulToastButton).toBeVisible();
    await successfulToastButton.click();

    // Wait for toast to appear
    const toast = page.locator('[class="!border-none !bg-info-bg !bg-success-bg"]');
    await expect(toast).toBeVisible();

    // Verify toast message
    await expect(toast).toContainText('Successful');

    // Verift that icon is present within the toast
    const iconContainer = toast.locator('[class="text-success"]').first();
    await expect(iconContainer).toBeVisible();
    // Verify SVG icon is present
    const svgIcon = iconContainer.locator('svg').first();
    await expect(svgIcon).toBeVisible();
    // Verify the path element exists
    const pathElement = svgIcon.locator('path').first();
    await expect(pathElement).toBeVisible();
    // Verify the path has data (d attribute)
    const pathData = await pathElement.getAttribute('d');
    expect(pathData).toBeTruthy();
    expect(pathData?.length).toBeGreaterThan(0);
}

export async function testToastWarning(page: Page){
    // Verify that warning toast when clicking Warning Toast button
    const warningToastButton = page.locator('[id="toast-warning"]');
    await expect(warningToastButton).toBeVisible();
    await warningToastButton.click();

    // Wait for toast to appear
    const toast = page.locator('[class="!border-none !bg-info-bg !bg-warning-bg"]');
    await expect(toast).toBeVisible();

    // Verify toast message
    await expect(toast).toContainText('This is a warning');

    // Verift that icon is present within the toast
    const iconContainer = toast.locator('[class="text-warning"]').first();
    await expect(iconContainer).toBeVisible();
    // Verify SVG icon is present
    const svgIcon = iconContainer.locator('svg').first();
    await expect(svgIcon).toBeVisible();
    // Verify the path element exists
    const pathElement = svgIcon.locator('path').first();
    await expect(pathElement).toBeVisible();
    // Verify the path has data (d attribute)
    const pathData = await pathElement.getAttribute('d');
    expect(pathData).toBeTruthy();
    expect(pathData?.length).toBeGreaterThan(0);
}

export async function testToastError(page: Page){
    // Verify that error toast when clicking Error Toast button
    const errorToastButton = page.locator('[id="toast-error"]');
    await expect(errorToastButton).toBeVisible();
    await errorToastButton.click();

    // Wait for toast to appear
    const toast = page.locator('[class="!border-none !bg-info-bg !bg-sonner-error"]');
    await expect(toast).toBeVisible();

    // Verify toast message
    await expect(toast).toContainText('There was an error');

    // Verift that icon is present within the toast
    const iconContainer = toast.locator('[class="text-danger"]').first();
    await expect(iconContainer).toBeVisible();
    // Verify SVG icon is present
    const svgIcon = iconContainer.locator('svg').first();
    await expect(svgIcon).toBeVisible();
    // Verify the path element exists
    const pathElement = svgIcon.locator('path').first();
    await expect(pathElement).toBeVisible();
    // Verify the path has data (d attribute)
    const pathData = await pathElement.getAttribute('d');
    expect(pathData).toBeTruthy();
    expect(pathData?.length).toBeGreaterThan(0);
}

export async function testToastAction(page: Page){
    // Verify that Action Toast button
    const actionToastButton = page.locator('[id="toast-action"]');
    await expect(actionToastButton).toBeVisible();

    // Verify Action Toast button has the correct classes
    const classes = await actionToastButton.locator('button').getAttribute('class');
    expect(classes).toContain('underline-offset-4');
    expect(classes).toContain('hover:underline');
    expect(classes).toContain('h-10');
    expect(classes).toContain('text-primary');
    expect(classes).toContain('active:text-primary-700');

    // Verify that action toast when clicking Action Toast button
    await actionToastButton.click();

    // Wait for toast to appear
    const toast = page.locator('[class="!border-none !bg-info-bg"]');
    await expect(toast).toBeVisible();

    // Verify toast title
    await expect(toast).toContainText('Toast with an Action');
    // Verify description text
    await expect(toast).toContainText('A description with some more information');
    // Verify link should be present in the action toast description
    const link = toast.locator('a[href*="#"]').or(toast.locator('a').filter({ hasText: 'link' }));
    await expect(link.first()).toBeVisible();
    // Verify link has correct attributes
    const linkHref = await link.first().getAttribute('href');
    expect(linkHref).toBeTruthy();

    // Verify action button is present
    const actionButton = toast.getByRole('button', { name: 'Action' });
    await expect(actionButton).toBeVisible();
    await expect(actionButton).toBeEnabled();

    // Verify toast auto-dismisses after timeout
    await expect(toast).not.toBeVisible({ timeout: 10000 });
}

export async function testToastClosable(page: Page){
    // Verify that closable toast when clicking Closable Toast button
    const closableToastButton = page.locator('[id="toast-closable"]');
    await expect(closableToastButton).toBeVisible();
    await closableToastButton.click();

    // Wait for toast to appear
    const toast = page.locator('[class="!border-none !bg-info-bg"]');
    
    // Verify toast message
    await expect(toast).toContainText('This toast is closable');

    // Find and click the close button
    const closeButton = toast.locator('button[aria-label*="close" i], button[aria-label*="Close" i]').first();
    await expect(closeButton).toBeVisible();
    
    // Click close button
    await closeButton.click();
    
    // Wait for toast to disappear
    await expect(toast).not.toBeVisible();
}