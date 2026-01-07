import { test, expect, Page } from '@playwright/test';

export async function testPrimaryORDefaultButton(page: Page){

  // Check Primary Button visibility
    const primarybtn = page.getByRole('button', { name: 'Primary' }).first();
    await primarybtn.waitFor({ state: 'visible' });   
    await expect(primarybtn).toBeVisible();

  // Check background color (uses --color-primary-500)
    const bg = await primarybtn.evaluate(el => getComputedStyle(el as HTMLElement).backgroundColor);
    expect(bg).toMatch(/^rgba?\(\s*110,\s*63,\s*255/);

  // Check text color (uses --color-white)
    const color = await primarybtn.evaluate((el) => getComputedStyle(el as HTMLElement).color);
    expect(color.replace(/\s+/g, '')).toBe('rgb(255,255,255)');
}

export async function testOutlineButton(page: Page){

  // Check Outline Button visibility
    const Outlinebtn = page.getByRole('button', { name: 'Outline' }).first();
    await expect(Outlinebtn).toBeVisible();

  // Check Transparent background
    const bg = await Outlinebtn.evaluate((el) => getComputedStyle(el as HTMLElement).backgroundColor);
    expect(bg === 'transparent' || /^rgba?\(\s*0,\s*0,\s*0,\s*0\)/.test(bg)).toBeTruthy();
   
  // Check visible border
    const borderStyle = await Outlinebtn.evaluate((el) => getComputedStyle(el as HTMLElement).borderStyle);
    const borderWidth = await Outlinebtn.evaluate((el) => parseFloat(getComputedStyle(el as HTMLElement).borderWidth || '0'));
   
    expect(borderStyle).not.toBe('none');
    expect(borderWidth).toBeGreaterThan(0);
}

export async function testGhostButton(page: Page){

  // Check Ghost Button visibility
    const ghost = page.getByRole('button', { name: 'Ghost' }).first();
    await expect(ghost).toBeVisible();

  // Check computed background (ghost uses bg-transparent)
    const initialBg = await ghost.evaluate(el => getComputedStyle(el as HTMLElement).backgroundColor);
    expect(initialBg === 'transparent' || /^rgba?\(\s*0,\s*0,\s*0,\s*0\)/.test(initialBg)).toBeTruthy();

  // Check text color (uses --color-blackAlpha-700)
    const color = await ghost.evaluate((el) => getComputedStyle(el as HTMLElement).color);
    expect(color.replace(/\s+/g, '')).toBe('rgba(0,0,0,0.68)');

  // Hover and then re-check computed background (neutral background)
    await ghost.hover();
    const hoverBg = await ghost.evaluate((el) => getComputedStyle(el as HTMLElement).backgroundColor);
    expect(hoverBg).toMatch(/^rgba?\(\s*0,\s*0,\s*0/);
}

export async function testLinkVariant(page: Page){

  // Check Link Button visibility
    const linkbtn = page.getByRole('button', { name: 'Link' }).first();
    await expect(linkbtn).toBeVisible();

  // Check text color (uses --color-primary-500)
    const color = await linkbtn.evaluate((el) => getComputedStyle(el as HTMLElement).color);
    expect(color).toMatch(/^rgba?\(\s*110,\s*63,\s*255/);

  // Hover to check computed textDecorationLine contains 'underline' if supported
    await linkbtn.hover();
    const textDecoration = await linkbtn.evaluate(el => getComputedStyle(el as HTMLElement).textDecorationLine || getComputedStyle(el as HTMLElement).textDecoration);
    expect(/underline/i.test(textDecoration || '')).toBeTruthy();
}

export async function testSizeVariant(page: Page){

  // Check Large and Small buttons visibility
    const largebtn = page.getByRole('button', { name: 'Solid lg' }).first();
    const defaultbtn = page.getByRole('button', { name: 'Solid' }).nth(1);
    const smallbtn = page.getByRole('button', { name: 'Solid sm' }).first();
    const xsmallbtn = page.getByRole('button', { name: 'Solid xs' }).first();

    await expect(largebtn).toBeVisible();
    await expect(defaultbtn).toBeVisible();
    await expect(smallbtn).toBeVisible();
    await expect(xsmallbtn).toBeVisible();

  // Check large button background color (uses --color-primary-500)
    const largeBg = await largebtn.evaluate(el => getComputedStyle(el as HTMLElement).backgroundColor);
    expect(largeBg.replace(/\s+/g, '')).toMatch(/^rgb\(110,63,255\)/); 

  // Verify that buttons have the expected sizes
    const LargrClassList = await largebtn.getAttribute('class');
    const DefaultClassList = await defaultbtn.getAttribute('class');
    const SmallClassList = await smallbtn.getAttribute('class');
    const XsmallClassList = await xsmallbtn.getAttribute('class');
    // Verify that large button has the expected classes
    expect(LargrClassList).toContain('h-12');
    expect(DefaultClassList).toContain('h-10');
    expect(SmallClassList).toContain('h-8');
    expect(XsmallClassList).toContain('h-6');
    // Verify that buttons have the expected minimum widths
    expect(LargrClassList).toContain('min-w-12');
    expect(DefaultClassList).toContain('min-w-10');
    expect(SmallClassList).toContain('min-w-8');
    expect(XsmallClassList).toContain('min-w-6');
}

export async function testIcononlyVariant(page: Page){

  // Verify icon-lg button size and styling
    const iconLgButton = page.getByRole('button', { name: 'Help and support' });
    await expect(iconLgButton).toBeVisible();
  // Verify button has correct size class (size-12 = 48px)
    const buttonLgBox = await iconLgButton.boundingBox();
    expect(buttonLgBox?.width).toBe(48);
    expect(buttonLgBox?.height).toBe(48);

  // Verify icon button size and styling  
    const iconButton = page.getByRole('button', { name: 'Get help' });
    await expect(iconButton).toBeVisible();
  // Verify button has correct size class (size-10 = 40px)
    const buttonBox = await iconButton.boundingBox();
    expect(buttonBox?.width).toBe(40);
    expect(buttonBox?.height).toBe(40);

  // Verify icon-sm button size and styling
    const iconSmButton = page.getByRole('button', { name: 'Help' }).nth(2);
    await expect(iconSmButton).toBeVisible();
  // Verify button has correct size class (size-8 = 32px)
    const buttonSmBox = await iconSmButton.boundingBox();
    expect(buttonSmBox?.width).toBe(32);
    expect(buttonSmBox?.height).toBe(32);

  // Verify icon-xs button size and styling
    const iconXsButton = page.getByRole('button', { name: 'Info' });
    await expect(iconXsButton).toBeVisible();
  // Verify button has correct size class (size-6 = 24px)
    const buttonXsBox = await iconXsButton.boundingBox();
    expect(buttonXsBox?.width).toBe(24);
    expect(buttonXsBox?.height).toBe(24);
 }

export async function testDisabledButtons(page: Page){

  // Check Disabled Default Button visibility and disabled state
    const disablebtn = page.getByRole('button', { name: 'Disabled Default' }).first();
    await expect(disablebtn).toBeVisible();
    await expect(disablebtn).toBeDisabled();

  // Check opacity to ensure it's visually indicated as disabled
    const opacity = await disablebtn.evaluate((el) => getComputedStyle(el as HTMLElement).opacity);
    expect(parseFloat(opacity)).toBeLessThan(1);
}
