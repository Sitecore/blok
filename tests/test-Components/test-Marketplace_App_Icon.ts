import { test, expect, Page } from '@playwright/test';

const sizeClasses = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-14',
  xlg: 'size-20',
} as const;

export async function testMarketplaceAppIcon(page: Page) {
  const section = page.locator('#marketplace-app-icon');
  await expect(section).toBeVisible();

  const icons = section.locator('[data-slot="marketplace-app-icon"]');
  await expect(icons).toHaveCount(2);

  const imageIcon = icons.nth(0);
  await expect(imageIcon).toHaveAttribute('aria-label', 'Sitecore Search');
  await expect(imageIcon).toHaveClass(new RegExp(sizeClasses.lg));
  await expect(imageIcon.locator('[data-slot="avatar-image"]')).toHaveAttribute('src', /card-image\.png/);

  const fallbackIcon = icons.nth(1);
  await expect(fallbackIcon).toHaveAttribute('aria-label', 'Sitecore Search');
  await expect(fallbackIcon).toHaveClass(new RegExp(sizeClasses.lg));
  await expect(fallbackIcon.locator('[data-slot="avatar-fallback"]')).toContainText('S');
}

export async function testMarketplaceAppIconSizes(page: Page) {
  const section = page.locator('#marketplace-app-icon-sizes');
  await expect(section).toBeVisible();

  const icons = section.locator('[data-slot="marketplace-app-icon"]');
  await expect(icons).toHaveCount(5);

  for (const [index, size] of Object.keys(sizeClasses).entries()) {
    const icon = icons.nth(index);
    await expect(icon).toHaveAttribute('aria-label', 'Custom app');
    await expect(icon).toHaveClass(new RegExp(sizeClasses[size as keyof typeof sizeClasses]));
    await expect(icon.locator('[data-slot="avatar-fallback"]')).toContainText('C');
  }
}

export async function testMarketplaceAppIconFallback(page: Page) {
  const section = page.locator('#marketplace-app-icon-fallback');
  await expect(section).toBeVisible();

  const expected = [
    { name: 'Insights', letter: 'I', color: 'bg-teal-500' },
    { name: 'Journey', letter: 'J', color: 'bg-cyan-500' },
    { name: 'Knowledge', letter: 'K', color: 'bg-yellow-500' },
    { name: 'Marketplace', letter: 'M', color: 'bg-pink-500' },
    { name: 'Notifications', letter: 'N', color: 'bg-green-500' },
    { name: 'Library', letter: 'L', color: 'bg-purple-500' },
  ];

  const icons = section.locator('[data-slot="marketplace-app-icon"]');
  await expect(icons).toHaveCount(expected.length);

  for (const [index, app] of expected.entries()) {
    const icon = icons.nth(index);
    await expect(icon).toHaveAttribute('aria-label', app.name);
    await expect(icon).toHaveClass(new RegExp(sizeClasses.xlg));
    const fallback = icon.locator('[data-slot="avatar-fallback"]');
    await expect(fallback).toContainText(app.letter);
    await expect(fallback).toHaveClass(new RegExp(app.color));
  }
}
