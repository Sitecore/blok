import { test, expect, Page } from '@playwright/test';

export async function testOpenAlertDialog(page: Page){

  // The demo uses a default variant button with colorScheme="danger"
    const oadbtn = page.getByRole('button', { name: 'Open Alert Dialog' });
    await expect(oadbtn).toBeVisible();

  // Read computed background color
    const oadbg = await oadbtn.evaluate((el) =>
      getComputedStyle(el as HTMLElement).backgroundColor
    );

  // Exact RGB for --color-danger-500 (#d92739) is rgb(217, 39, 57)
    expect(oadbg).toMatch('rgb(217, 39, 57)');
}

export async function testKeepEditing(page: Page){

  // Open the alert dialog via the trigger button
    await page.getByRole('button', { name: 'Open Alert Dialog' }).click();

    const content = page.locator('[data-slot="alert-dialog-content"]');
    await expect(content).toBeVisible();

  // Verify title and description are visible
    await expect(content.getByText('Discard Changes?')).toBeVisible();
    await expect(content.getByText('Discard unsaved changes and close?')).toBeVisible();

  // Computed background should be transparent by default (ghost uses bg-transparent)
    const kebtn = await page.getByRole('button', { name: 'Keep editing' })
    const bg = await kebtn.evaluate((el) =>
        getComputedStyle(el as HTMLElement).backgroundColor
    );
    
  // Normalize whitespace and assert transparent rgba
    expect(bg.replace(/\s+/g, '')).toBe('rgba(0,0,0,0)');

  // Text color should be the neutral foreground (uses --color-blackAlpha-600)
    const color = await kebtn.evaluate((el) =>
        getComputedStyle(el as HTMLElement).color
    );

  // Expected: rgba(0, 0, 0, 0.68) per `--color-blackAlpha-600`
    expect(color.replace(/\s+/g, '')).toBe('rgba(0,0,0,0.68)');

  // Hover: ghost buttons apply a neutral background on hover. Simulate hover and verify.
    await kebtn.hover();
    const hoverBg = await kebtn.evaluate((el) =>
        getComputedStyle(el as HTMLElement).backgroundColor
    );

  // Expected: rgba(0, 0, 0, 0) per `--color-blackAlpha-100` (neutral background)
    expect(hoverBg).toMatch(/^rgba?\(\s*0,\s*0,\s*0/);

  // Click the Cancel button and ensure the dialog closes
    await kebtn.click();   
    await expect(content).toBeHidden();
};

export async function testDiscard(page: Page){

    await page.getByRole('button', { name: 'Open Alert Dialog' }).click();

    const content = page.locator('[data-slot="alert-dialog-content"]');
    await expect(content).toBeVisible();

  // The demo uses a default variant button with colorScheme="danger"
    const discardBtn = page.getByRole('button', { name: 'Discard' });
    await expect(discardBtn).toBeVisible();

  // Read computed background color
    const discardBg = await discardBtn.evaluate((el) =>
      getComputedStyle(el as HTMLElement).backgroundColor
    );

  // Exact RGB for --color-danger-500 (#d92739) is rgb(217, 39, 57)
    expect(discardBg).toMatch('rgb(217, 39, 57)');

  // Click the destructive action and ensure the dialog closes
    await discardBtn.click();
    await expect(content).toBeHidden();
 
};
