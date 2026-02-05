import { test, expect, Page } from '@playwright/test';

export async function testSiteCard(page: Page){
  // Verify that display site card section is visible
  const siteCardSection = page.locator('[id="site-card"]');
  await expect(siteCardSection).toBeVisible();

  // Verify that display site card is visible
  const siteCard = siteCardSection.locator('[data-slot="card"]');
  await expect(siteCard).toBeVisible();

  // Verify that site card content is visible
  const siteCardContent = siteCard.locator('[data-slot="card-content"]');
  await expect(siteCardContent).toBeVisible();

  // Verify that site card footer is visible
  const siteCardFooter = siteCard.locator('[data-slot="card-footer"]');
  await expect(siteCardFooter).toBeVisible();

  // Verify that site card footer title is visible
  const siteCardFooterTitle = siteCardFooter.locator('h3').first();
  await expect(siteCardFooterTitle).toContainText('Demo Site');

  // Verify that site card footer description is visible
  const siteCardFooterDescription = siteCardFooter.locator('p').first();
  await expect(siteCardFooterDescription).toContainText('Demo Collection');
}