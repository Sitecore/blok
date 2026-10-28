import { expect, Page } from '@playwright/test';

const TAGS = ['Rebrand', 'Copenhagen', 'Ice cream launch ideas', 'New product', '+3'];

async function expectPortfolioHeader(section: ReturnType<Page['locator']>, title: string) {
  await expect(section).toBeVisible();
  await expect(section.locator('[data-slot="page-header"]')).toBeVisible();
  await expect(section.locator('[data-slot="page-header-title"]')).toContainText(title);
  await expect(section.locator('[data-slot="page-header-status"]')).toContainText('In progress');
  await expect(section.getByRole('button', { name: 'Primary' })).toBeVisible();
  await expect(section.getByRole('button', { name: 'Edit' })).toBeVisible();
  await expect(section.getByRole('tab', { name: 'Overview' })).toHaveAttribute('data-state', 'active');
  await expect(section.locator('[data-slot="page-header-timeline"]')).toContainText('Jun 26, 2025 - Aug 1, 2025');
  await expect(section.locator('[data-slot="page-header-timeline"]')).toContainText('Day 3');
  await expect(section.locator('[data-slot="page-header-timeline"]')).toContainText('of 36');

  for (const tag of TAGS) {
    await expect(section.locator('[data-slot="page-header-tags"]')).toContainText(tag);
  }
}

export async function testPageHeader(page: Page) {
  const section = page.locator('#page-header');
  await expectPortfolioHeader(section, 'Healthy snacks');
  await expect(section.locator('[data-slot="page-header-back"]')).toContainText('Back to portfolio');
  await expect(section.locator('[data-slot="page-header-description"]')).toContainText('Mauris adipiscing gravida vitae');
  await expect(section.getByRole('button', { name: 'Flavorful' })).toBeVisible();
}

export async function testPageHeaderSiteSummary(page: Page) {
  const section = page.locator('#page-header-site-summary');
  await expectPortfolioHeader(section, 'Healthy snacks');
  await expect(section.locator('[data-slot="page-header-back"]')).toContainText('Back to portfolio');
  await expect(section.locator('[data-slot="page-header-media"] img')).toHaveAttribute('src', /page-header-media-16-9\.png/);
}

export async function testPageHeaderTopNavMini(page: Page) {
  const section = page.locator('#page-header-top-nav-mini');
  await expectPortfolioHeader(section, 'Launching the best ice cream in Copenhagen');
  await expect(section.locator('[data-slot="page-header-back"]')).toHaveAttribute('aria-label', 'Back to portfolio');
  await expect(section.locator('[data-slot="page-header-description"]')).toContainText('Ice cream is a smooth, frozen dessert');
}

export async function testPageHeaderSiteSummaryWhite(page: Page) {
  const section = page.locator('#page-header-site-summary-white');
  await expectPortfolioHeader(section, 'Launching the best ice cream in Copenhagen');
  await expect(section.locator('[data-slot="page-header-back"]')).toContainText('Back to portfolio');
  await expect(section.locator('[data-slot="page-header"]')).toHaveClass(/bg-body-bg/);
}
