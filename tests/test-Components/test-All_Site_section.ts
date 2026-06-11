import { test, expect, Page } from '@playwright/test';

export async function testAllSiteSection(page: Page){
  // Verify that all site section is visible
  const allSiteSection = page.locator('[id="all-site-section"]');
  await expect(allSiteSection).toBeVisible();

  // Verify that all site section title is visible
  await expect(allSiteSection.locator('h2')).toContainText('All Sites');
  // Verify that all site section description is visible
  await expect(allSiteSection.locator('p')).toContainText('Browse all available sites and pin your favorites for quick access');

  // Verify that first site card is visible
  const firstCard = allSiteSection.locator('[data-slot="card"]').nth(0);
  await expect(firstCard).toBeVisible();
  // Verify that site card content is visible
  const firstCardContent = firstCard.locator('[data-slot="card-content"]');
  await expect(firstCardContent).toBeVisible();
  // Verify that site card footer is visible
  const firstCardFooter = firstCard.locator('[data-slot="card-footer"]');
  await expect(firstCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const firstCardFooterTitle = firstCardFooter.locator('h3').first();
  await expect(firstCardFooterTitle).toContainText('My Ecommerce Site');
  // Mouse over the site card footer to display the footer buttons
  await firstCard.hover();
  // Verify that site card footer has Page builder button
  const firstCardFooterPageBuilderButton = firstCardFooter.locator('button[data-slot="button"]').nth(0);
  await expect(firstCardFooterPageBuilderButton).toContainText('Page builder');
  // Verify that site card footer has Dashboard button
  const firstCardFooterDashboardButton = firstCardFooter.locator('button[data-slot="button"]').nth(1);
  await expect(firstCardFooterDashboardButton).toContainText('Dashboard');
  // Verify that site card footer has Dropdown button
  const firstCardFooterDropdownButton = firstCardFooter.locator('button[data-slot="dropdown-menu-trigger"]');
  await expect(firstCardFooterDropdownButton).toBeVisible();
  // Verify that site card footer dropdown menu is visible when dropdown menu trigger is clicked
  await firstCardFooterDropdownButton.click();
  const firstCardFooterDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]').filter({ visible: true });
  await expect(firstCardFooterDropdownMenu).toBeVisible();
  // Verify that site card footer dropdown menu has menu items
  const firstCardFooterDropdownMenuItems = firstCardFooterDropdownMenu.locator('[data-slot="dropdown-menu-item"]');
  await expect(firstCardFooterDropdownMenuItems.getByText('Settings')).toBeVisible();
  await expect(firstCardFooterDropdownMenuItems.getByText('Unpin Site')).toBeVisible();
  await expect(firstCardFooterDropdownMenuItems.getByText('Rename')).toBeVisible();
  await expect(firstCardFooterDropdownMenuItems.getByText('Duplicate')).toBeVisible();
  // Verify that site card footer dropdown menu closes (Escape — portaled menu blocks re-click on trigger)
  await page.keyboard.press('Escape');
  await expect(firstCardFooterDropdownMenu).not.toBeVisible();

  // Verify that second site card is visible
  const secondCard = allSiteSection.locator('[data-slot="card"]').nth(1);
  await expect(secondCard).toBeVisible();
  // Verify that site card content is visible
  const secondCardContent = secondCard.locator('[data-slot="card-content"]');
  await expect(secondCardContent).toBeVisible();
  // Verify that site card footer is visible
  const secondCardFooter = secondCard.locator('[data-slot="card-footer"]');
  await expect(secondCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const secondCardFooterTitle = secondCardFooter.locator('h3').first();
  await expect(secondCardFooterTitle).toContainText('Corporate Blog');
  // Mouse over the site card footer to display the footer buttons
  await secondCard.hover();
  // Verify that site card footer has Page builder button
  const secondCardFooterPageBuilderButton = secondCardFooter.locator('button[data-slot="button"]').nth(0);
  await expect(secondCardFooterPageBuilderButton).toContainText('Page builder');
  // Verify that site card footer has Dashboard button
  const secondCardFooterDashboardButton = secondCardFooter.locator('button[data-slot="button"]').nth(1);
  await expect(secondCardFooterDashboardButton).toContainText('Dashboard');
  // Verify that site card footer has Dropdown button
  const secondCardFooterDropdownButton = secondCardFooter.locator('button[data-slot="dropdown-menu-trigger"]');
  await expect(secondCardFooterDropdownButton).toBeVisible();
  // Verify that site card footer dropdown menu is visible when dropdown menu trigger is clicked
    await secondCardFooterDropdownButton.click();
  const secondCardFooterDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]').filter({ visible: true });
  await expect(secondCardFooterDropdownMenu).toBeVisible();
  // Verify that site card footer dropdown menu has menu items
  const secondCardFooterDropdownMenuItems = secondCardFooterDropdownMenu.locator('[data-slot="dropdown-menu-item"]');
  await expect(secondCardFooterDropdownMenuItems.getByText('Settings')).toBeVisible();
  await expect(secondCardFooterDropdownMenuItems.getByText('Unpin Site')).toBeVisible();
  await expect(secondCardFooterDropdownMenuItems.getByText('Rename')).toBeVisible();
  await expect(secondCardFooterDropdownMenuItems.getByText('Duplicate')).toBeVisible();
  // Verify that site card footer dropdown menu closes (Escape — portaled menu blocks re-click on trigger)
  await page.keyboard.press('Escape');
  await expect(secondCardFooterDropdownMenu).not.toBeVisible();

  // Verify that third site card is visible
  const thirdCard = allSiteSection.locator('[data-slot="card"]').nth(2);
  await expect(thirdCard).toBeVisible();
  // Verify that site card content is visible
  const thirdCardContent = thirdCard.locator('[data-slot="card-content"]');
  await expect(thirdCardContent).toBeVisible();
  // Verify that site card footer is visible
  const thirdCardFooter = thirdCard.locator('[data-slot="card-footer"]');
  await expect(thirdCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const thirdCardFooterTitle = thirdCardFooter.locator('h3').first();
  await expect(thirdCardFooterTitle).toContainText('Marketing Site');
  // Mouse over the site card footer to display the footer buttons
  await thirdCard.hover();
  // Verify that site card footer has Page builder button
  const thirdCardFooterPageBuilderButton = thirdCardFooter.locator('button[data-slot="button"]').nth(0);
  await expect(thirdCardFooterPageBuilderButton).toContainText('Page builder');
  // Verify that site card footer has Dashboard button
  const thirdCardFooterDashboardButton = thirdCardFooter.locator('button[data-slot="button"]').nth(1);
  await expect(thirdCardFooterDashboardButton).toContainText('Dashboard');
  // Verify that site card footer has Dropdown button
  const thirdCardFooterDropdownButton = thirdCardFooter.locator('button[data-slot="dropdown-menu-trigger"]');
  await expect(thirdCardFooterDropdownButton).toBeVisible();
  // Verify that site card footer dropdown menu is visible when dropdown menu trigger is clicked
  await thirdCardFooterDropdownButton.click();
  const thirdCardFooterDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]').filter({ visible: true });
  await expect(thirdCardFooterDropdownMenu).toBeVisible();
  // Verify that site card footer dropdown menu has menu items
  const thirdCardFooterDropdownMenuItems = thirdCardFooterDropdownMenu.locator('[data-slot="dropdown-menu-item"]');
  await expect(thirdCardFooterDropdownMenuItems.getByText('Settings')).toBeVisible();
  await expect(thirdCardFooterDropdownMenuItems.getByText('Pin Site')).toBeVisible();
  await expect(thirdCardFooterDropdownMenuItems.getByText('Rename')).toBeVisible();
  await expect(thirdCardFooterDropdownMenuItems.getByText('Duplicate')).toBeVisible();
  // Verify that site card footer dropdown menu closes (Escape — portaled menu blocks re-click on trigger)
  await page.keyboard.press('Escape');
  await expect(thirdCardFooterDropdownMenu).not.toBeVisible();

  // Verify that fourth site card is visible
  const fourthCard = allSiteSection.locator('[data-slot="card"]').nth(3);
  await expect(fourthCard).toBeVisible();
  // Verify that site card content is visible
  const fourthCardContent = fourthCard.locator('[data-slot="card-content"]');
  await expect(fourthCardContent).toBeVisible();
  // Verify that site card footer is visible
  const fourthCardFooter = fourthCard.locator('[data-slot="card-footer"]');
  await expect(fourthCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const fourthCardFooterTitle = fourthCardFooter.locator('h3').first();
  await expect(fourthCardFooterTitle).toContainText('Partner Portal');
  // Mouse over the site card footer to display the footer buttons
  await fourthCard.hover();
  // Verify that site card footer has Page builder button
  const fourthCardFooterPageBuilderButton = fourthCardFooter.locator('button[data-slot="button"]').nth(0);
  await expect(fourthCardFooterPageBuilderButton).toContainText('Page builder');
  // Verify that site card footer has Dashboard button
  const fourthCardFooterDashboardButton = fourthCardFooter.locator('button[data-slot="button"]').nth(1);
  await expect(fourthCardFooterDashboardButton).toContainText('Dashboard');
  // Verify that site card footer has Dropdown button
  const fourthCardFooterDropdownButton = fourthCardFooter.locator('button[data-slot="dropdown-menu-trigger"]');
  await expect(fourthCardFooterDropdownButton).toBeVisible();
  // Verify that site card footer dropdown menu is visible when dropdown menu trigger is clicked
  await fourthCardFooterDropdownButton.click();
  const fourthCardFooterDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]').filter({ visible: true });
  await expect(fourthCardFooterDropdownMenu).toBeVisible();
  // Verify that site card footer dropdown menu has menu items
  const fourthCardFooterDropdownMenuItems = fourthCardFooterDropdownMenu.locator('[data-slot="dropdown-menu-item"]');
  await expect(fourthCardFooterDropdownMenuItems.getByText('Settings')).toBeVisible();
  await expect(fourthCardFooterDropdownMenuItems.getByText('Pin Site')).toBeVisible();
  // Partner Portal uses a limited menu (no Rename / Duplicate)
  // Verify that site card footer dropdown menu closes (Escape — portaled menu blocks re-click on trigger)
  await page.keyboard.press('Escape');
  await expect(fourthCardFooterDropdownMenu).not.toBeVisible();

  // Verify that fifth site card is visible
  const fifthCard = allSiteSection.locator('[data-slot="card"]').nth(4);
  await expect(fifthCard).toBeVisible();
  // Verify that site card content is visible
  const fifthCardContent = fifthCard.locator('[data-slot="card-content"]');
  await expect(fifthCardContent).toBeVisible();
  // Verify that site card footer is visible
  const fifthCardFooter = fifthCard.locator('[data-slot="card-footer"]');
  await expect(fifthCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const fifthCardFooterTitle = fifthCardFooter.locator('h3').first();
  await expect(fifthCardFooterTitle).toContainText('Customer Support');
  // Mouse over the site card footer to display the footer buttons
  await fifthCard.hover();
  // Verify that site card footer has Page builder button
  const fifthCardFooterPageBuilderButton = fifthCardFooter.locator('button[data-slot="button"]').nth(0);
  await expect(fifthCardFooterPageBuilderButton).toContainText('Page builder');
  // Verify that site card footer has Dashboard button
  const fifthCardFooterDashboardButton = fifthCardFooter.locator('button[data-slot="button"]').nth(1);
  await expect(fifthCardFooterDashboardButton).toContainText('Dashboard');
  // Verify that site card footer has Dropdown button
  const fifthCardFooterDropdownButton = fifthCardFooter.locator('button[data-slot="dropdown-menu-trigger"]');
  await expect(fifthCardFooterDropdownButton).toBeVisible();
  // Verify that site card footer dropdown menu is visible when dropdown menu trigger is clicked
  await fifthCardFooterDropdownButton.click();
  const fifthCardFooterDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]').filter({ visible: true });
    await expect(fifthCardFooterDropdownMenu).toBeVisible();
  // Verify that site card footer dropdown menu has menu items
  const fifthCardFooterDropdownMenuItems = fifthCardFooterDropdownMenu.locator('[data-slot="dropdown-menu-item"]');
  await expect(fifthCardFooterDropdownMenuItems.getByText('Settings')).toBeVisible();
  await expect(fifthCardFooterDropdownMenuItems.getByText('Pin Site')).toBeVisible();
  await expect(fifthCardFooterDropdownMenuItems.getByText('Rename')).toBeVisible();
  await expect(fifthCardFooterDropdownMenuItems.getByText('Duplicate')).toBeVisible();
  // Verify that site card footer dropdown menu closes (Escape — portaled menu blocks re-click on trigger)
  await page.keyboard.press('Escape');
  await expect(fifthCardFooterDropdownMenu).not.toBeVisible();

  // Verify that sixth site card is visible
  const sixthCard = allSiteSection.locator('[data-slot="card"]').nth(5);
  await expect(sixthCard).toBeVisible();
  // Verify that site card content is visible
  const sixthCardContent = sixthCard.locator('[data-slot="card-content"]');
  await expect(sixthCardContent).toBeVisible();
  // Verify that site card footer is visible
  const sixthCardFooter = sixthCard.locator('[data-slot="card-footer"]');
  await expect(sixthCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const sixthCardFooterTitle = sixthCardFooter.locator('h3').first();
  await expect(sixthCardFooterTitle).toContainText('Documentation');
  // Mouse over the site card footer to display the footer buttons
  await sixthCard.hover();
  // Verify that site card footer has Page builder button
  const sixthCardFooterPageBuilderButton = sixthCardFooter.locator('button[data-slot="button"]').nth(0);
  await expect(sixthCardFooterPageBuilderButton).toContainText('Page builder');
  // Verify that site card footer has Dashboard button
  const sixthCardFooterDashboardButton = sixthCardFooter.locator('button[data-slot="button"]').nth(1);
  await expect(sixthCardFooterDashboardButton).toContainText('Dashboard');
  // Verify that site card footer has Dropdown button
  const sixthCardFooterDropdownButton = sixthCardFooter.locator('button[data-slot="dropdown-menu-trigger"]');
  await expect(sixthCardFooterDropdownButton).toBeVisible();
  // Verify that site card footer dropdown menu is visible when dropdown menu trigger is clicked
  await sixthCardFooterDropdownButton.click();
  const sixthCardFooterDropdownMenu = page.locator('[data-slot="dropdown-menu-content"]').filter({ visible: true });
  await expect(sixthCardFooterDropdownMenu).toBeVisible();
  // Verify that site card footer dropdown menu has menu items
  const sixthCardFooterDropdownMenuItems = sixthCardFooterDropdownMenu.locator('[data-slot="dropdown-menu-item"]');
  await expect(sixthCardFooterDropdownMenuItems.getByText('Settings')).toBeVisible();
  await expect(sixthCardFooterDropdownMenuItems.getByText('Pin Site')).toBeVisible();
  await expect(sixthCardFooterDropdownMenuItems.getByText('Rename')).toBeVisible();
  await expect(sixthCardFooterDropdownMenuItems.getByText('Duplicate')).toBeVisible();
  // Verify that site card footer dropdown menu closes (Escape — portaled menu blocks re-click on trigger)
  await page.keyboard.press('Escape');
  await expect(sixthCardFooterDropdownMenu).not.toBeVisible();
}