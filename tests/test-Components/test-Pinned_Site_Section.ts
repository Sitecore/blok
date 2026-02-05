import { test, expect, Page } from '@playwright/test';

export async function testPinnedSiteSection(page: Page){
  // Verify that pinned site section is visible
  const pinnedSiteSection = page.locator('[id="pinned-site-section"]');
  await expect(pinnedSiteSection).toBeVisible();

  // Verify that pinned site is visible
  const pinnedSite = pinnedSiteSection.locator('[class="w-full space-y-6"]').nth(0);
  await expect(pinnedSite).toBeVisible();

  // Verify that first pinned site card is visible
  const FirstPinnedSiteCard = pinnedSite.locator('[data-slot="card"]').nth(0);
  await expect(FirstPinnedSiteCard).toBeVisible();
  // Verify that pinned site card content is visible
  const FirstPinnedSiteCardContent = FirstPinnedSiteCard.locator('[data-slot="card-content"]');
  await expect(FirstPinnedSiteCardContent).toBeVisible();
  // Verify that pinned site card footer is visible
  const FirstPinnedSiteCardFooter = FirstPinnedSiteCard.locator('[data-slot="card-footer"]');
  await expect(FirstPinnedSiteCardFooter).toBeVisible();
  // Verify that pinned site card footer title is visible
  const FirstPinnedSiteCardFooterTitle = FirstPinnedSiteCardFooter.locator('h3').first();
  await expect(FirstPinnedSiteCardFooterTitle).toContainText('My Ecommerce Site');

  // Verify that second pinned site card is visible
  const SecondPinnedSiteCard = pinnedSite.locator('[data-slot="card"]').nth(1);
  await expect(SecondPinnedSiteCard).toBeVisible();
  // Verify that pinned site card content is visible
  const SecondPinnedSiteCardContent = SecondPinnedSiteCard.locator('[data-slot="card-content"]');
  await expect(SecondPinnedSiteCardContent).toBeVisible();
  // Verify that pinned site card footer is visible
  const SecondPinnedSiteCardFooter = SecondPinnedSiteCard.locator('[data-slot="card-footer"]');
  await expect(SecondPinnedSiteCardFooter).toBeVisible();
  // Verify that pinned site card footer title is visible
  const SecondPinnedSiteCardFooterTitle = SecondPinnedSiteCardFooter.locator('h3').first();
  await expect(SecondPinnedSiteCardFooterTitle).toContainText('Corporate Blog');

  // Verify that all site is visible
  const allSite = pinnedSiteSection.locator('[class="w-full space-y-6"]').nth(1);
  await expect(allSite).toBeVisible();

  // Verify that first site card is visible
  const firstCard = allSite.locator('[data-slot="card"]').nth(0);
  await expect(firstCard).toBeVisible();
  // Verify that site card content is visible
  const firstCardContent = firstCard.locator('[data-slot="card-content"]');
  await expect(firstCardContent).toBeVisible();
  // Verify that site card footer is visible
  const firstCardFooter = firstCard.locator('[data-slot="card-footer"]');
  await expect(firstCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const firstCardFooterTitle = firstCardFooter.locator('h3').first();
  await expect(firstCardFooterTitle).toContainText('Marketing Site');

  // Verify that second site card is visible
  const secondCard = allSite.locator('[data-slot="card"]').nth(1);
  await expect(secondCard).toBeVisible();
  // Verify that site card content is visible
  const secondCardContent = secondCard.locator('[data-slot="card-content"]');
  await expect(secondCardContent).toBeVisible();
  // Verify that site card footer is visible
  const secondCardFooter = secondCard.locator('[data-slot="card-footer"]');
  await expect(secondCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const secondCardFooterTitle = secondCardFooter.locator('h3').first();
  await expect(secondCardFooterTitle).toContainText('Partner Portal');

  // Verify that third site card is visible
  const thirdCard = allSite.locator('[data-slot="card"]').nth(2);
  await expect(thirdCard).toBeVisible();
  // Verify that site card content is visible
  const thirdCardContent = thirdCard.locator('[data-slot="card-content"]');
  await expect(thirdCardContent).toBeVisible();
  // Verify that site card footer is visible
  const thirdCardFooter = thirdCard.locator('[data-slot="card-footer"]');
  await expect(thirdCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const thirdCardFooterTitle = thirdCardFooter.locator('h3').first();
  await expect(thirdCardFooterTitle).toContainText('Customer Support');

  // Verify that fourth site card is visible
  const fourthCard = allSite.locator('[data-slot="card"]').nth(3);
  await expect(fourthCard).toBeVisible();
  // Verify that site card content is visible
  const fourthCardContent = fourthCard.locator('[data-slot="card-content"]');
  await expect(fourthCardContent).toBeVisible();
  // Verify that site card footer is visible
  const fourthCardFooter = fourthCard.locator('[data-slot="card-footer"]');
  await expect(fourthCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const fourthCardFooterTitle = fourthCardFooter.locator('h3').first();
  await expect(fourthCardFooterTitle).toContainText('Documentation');

  // Verify that fifth site card is visible
  const fifthCard = allSite.locator('[data-slot="card"]').nth(4);
  await expect(fifthCard).toBeVisible();
  // Verify that site card content is visible
  const fifthCardContent = fifthCard.locator('[data-slot="card-content"]');
  await expect(fifthCardContent).toBeVisible();
  // Verify that site card footer is visible
  const fifthCardFooter = fifthCard.locator('[data-slot="card-footer"]');
  await expect(fifthCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const fifthCardFooterTitle = fifthCardFooter.locator('h3').first();
  await expect(fifthCardFooterTitle).toContainText('My Ecommerce Site');

  // Verify that sixth site card is visible
  const sixthCard = allSite.locator('[data-slot="card"]').nth(5);
  await expect(sixthCard).toBeVisible();
  // Verify that site card content is visible
  const sixthCardContent = sixthCard.locator('[data-slot="card-content"]');
  await expect(sixthCardContent).toBeVisible();
  // Verify that site card footer is visible
  const sixthCardFooter = sixthCard.locator('[data-slot="card-footer"]');
  await expect(sixthCardFooter).toBeVisible();
  // Verify that site card footer title is visible
  const sixthCardFooterTitle = sixthCardFooter.locator('h3').first();
  await expect(sixthCardFooterTitle).toContainText('Corporate Blog');
}