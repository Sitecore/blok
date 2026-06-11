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

  // Mouse over the site card footer to display the footer buttons
  await siteCard.hover();

  // Verify that site card footer has Page builder button
  const siteCardFooterPageBuilderButton = siteCardFooter.locator('button[data-slot="button"]').nth(0);
  await expect(siteCardFooterPageBuilderButton).toContainText('Page builder');

  // Verify that site card footer has Dashboard button
  const siteCardFooterDashboardButton = siteCardFooter.locator('button[data-slot="button"]').nth(1);
  await expect(siteCardFooterDashboardButton).toContainText('Dashboard');

  // Verify that site card footer has Dropdown button
  const siteCardFooterDropdownButton = siteCardFooter.locator('button[data-slot="dropdown-menu-trigger"]');
  await expect(siteCardFooterDropdownButton).toBeVisible();

  // Verify that site card footer dropdown menu is visible when dropdown menu trigger is clicked
  await siteCardFooterDropdownButton.click();
  const siteCardFooterDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]').filter({ visible: true });
  await expect(siteCardFooterDropdownMenu).toBeVisible();
  
  // Verify that site card footer dropdown menu has menu items
  const siteCardFooterDropdownMenuItems = siteCardFooterDropdownMenu.locator('[data-slot="dropdown-menu-item"]');
  await expect(siteCardFooterDropdownMenuItems.getByText('Settings')).toBeVisible();
  await expect(siteCardFooterDropdownMenuItems.getByText('Pin Site')).toBeVisible();
  await expect(siteCardFooterDropdownMenuItems.getByText('Rename')).toBeVisible();
  await expect(siteCardFooterDropdownMenuItems.getByText('Duplicate')).toBeVisible();

  // Verify that site card footer dropdown menu closes (Escape — portaled menu blocks re-click on trigger)
  await page.keyboard.press('Escape');
  await expect(siteCardFooterDropdownMenu).not.toBeVisible();
}