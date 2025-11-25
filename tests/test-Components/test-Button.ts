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

export async function testDisabledButtons(page: Page){

  // Check Disabled Default Button visibility and disabled state
    const disablebtn = page.getByRole('button', { name: 'Disabled Default' }).first();
    await expect(disablebtn).toBeVisible();
    await expect(disablebtn).toBeDisabled();

  // Check opacity to ensure it's visually indicated as disabled
    const opacity = await disablebtn.evaluate((el) => getComputedStyle(el as HTMLElement).opacity);
    expect(parseFloat(opacity)).toBeLessThan(1);
}

export async function testIcononlyVariant(page: Page){

 // Primary icon-only button
    const iconbtn = page.getByRole('button', { name: 'Contact support' }); 
    await expect(iconbtn).toBeVisible();
    const iconBg = await iconbtn.evaluate(el => getComputedStyle(el as HTMLElement).backgroundColor);
    expect(iconBg.replace(/\s+/g, '')).toMatch(/^rgb\(110,63,255\)/);
}

export async function testSizeVariant(page: Page){

  // Check Large and Small buttons visibility
    const largebtn = page.getByRole('button', { name: 'Large Button' }).first();
    const smallbtn = page.getByRole('button', { name: 'Small Button' }).first();

    await expect(largebtn).toBeVisible();
    await expect(smallbtn).toBeVisible();

  // Check large button background color (uses --color-primary-500)
    const largeBg = await largebtn.evaluate(el => getComputedStyle(el as HTMLElement).backgroundColor);
    expect(largeBg.replace(/\s+/g, '')).toMatch(/^rgb\(110,63,255\)/); 

  // If boundingBox is available, compare heights
    const largeBox = await largebtn.boundingBox();
    const smallBox = await smallbtn.boundingBox();
  
    if (largeBox && smallBox) {
      expect(largeBox.height).toBeGreaterThan(smallBox.height);
    }
}
