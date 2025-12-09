import { test, expect, Page } from '@playwright/test';

export async function testBadge(page: Page){
    // Find the first default badge
    const badges = page.locator('[data-slot="badge"]');
    const defaultBadge = badges.first();
    
    // Check that default badge is visible
    await expect(defaultBadge).toBeVisible();
    
    // Verify the default badge text
    await expect(defaultBadge).toContainText('Badge');
    
    // Check that it has the badge data-slot attribute
    await expect(defaultBadge).toHaveAttribute('data-slot', 'badge');
    
    // Verify it's a span element (default)
    const tagName = await defaultBadge.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('span');
    
    // Check that default badge has expected classes
    const classAttribute = await defaultBadge.getAttribute('class');
    expect(classAttribute).toBeTruthy();
    expect(classAttribute).toContain('inline-flex');
    expect(classAttribute).toContain('items-center');  
    expect(classAttribute).toContain('px-2');
    expect(classAttribute).toContain('justify-center'); 
    expect(classAttribute).toContain('rounded');    
    expect(classAttribute).toContain('w-fit');
    expect(classAttribute).toContain('whitespace-nowrap');
    expect(classAttribute).toContain('shrink-0');
    expect(classAttribute).toContain('font-normal');
}

export async function testBadgeSize(page: Page){
    const badges = page.locator('[data-slot="badge"]');
    
    // Check that medium badge has expected classes
    const mediumBadge = badges.first();
    const classAttribute = await mediumBadge.getAttribute('class');
    expect(classAttribute).toContain('text-md');
    expect(classAttribute).toContain('h-5');
}

export async function testBadgeColor(page: Page){
    const badges = page.locator('[data-slot="badge"]');
        
    // Check that neutral badge has expected classes
    const neutralBadge = badges.first();
    const classAttribute = await neutralBadge.getAttribute('class');
    expect(classAttribute).toBeTruthy();
    expect(classAttribute).toContain('bg-neutral-bg');
    expect(classAttribute).toContain('text-neutral-fg');
}

export async function testBadgeBold(page: Page){
    const badges = page.locator('[data-slot="badge"]');
    
    // Find bold variant badges
    const boldNeutralBadge = badges.filter({ hasText: 'Bold Neutral' });
    await expect(boldNeutralBadge).toBeVisible();
    
    // Check that bold primary badge has expected classes
    const classAttribute = await boldNeutralBadge.getAttribute('class');
    expect(classAttribute).toBeTruthy();
    expect(classAttribute).toContain('bg-neutral-bg');
    expect(classAttribute).toContain('text-neutral-fg');
    expect(classAttribute).toContain('uppercase');
    expect(classAttribute).toContain('font-bold');
}

export async function testBadgeLink(page: Page){
    // Verify link badges are visible and have href (they contain anchor tags)
    const defaultLinkBadge = page.locator('a[data-slot="badge"]').filter({ hasText: 'Default Link' });
    await expect(defaultLinkBadge).toBeVisible();

    const href = await defaultLinkBadge.getAttribute('href');
    expect(href).toBe('#');

    // All link badges should contain SVG icons (ArrowRightIcon)
    const defaultSvg = defaultLinkBadge.locator('svg');
    await expect(defaultSvg).toBeVisible();
}

export async function testBadgeClosable(page: Page){
    // Verify closable badges are visible
    const closableNeutralBadge = page.locator('[data-slot="badge"]').filter({ hasText: 'Closable Neutral' });
    await expect(closableNeutralBadge.locator('svg')).toBeVisible();

    // Verify closable icon is visible
    const closableSvg = closableNeutralBadge.locator('svg');
    await expect(closableSvg).toBeVisible();
}
