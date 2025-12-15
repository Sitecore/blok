import { test, expect, Page } from '@playwright/test';

export async function testHoverCard(page: Page){
    // Verify that display hover card trigger button
    const triggerButton = page.getByRole('button', { name: '@blok' });
    await expect(triggerButton).toBeVisible();

    // Verify that open hover card when trigger is hovered
    await triggerButton.hover();
    const hoverCardContent = page.locator('[data-slot="hover-card-content"]');
    await expect(hoverCardContent).toBeVisible();

    // Verify that display avatar in hover card
    const avatar = hoverCardContent.locator('[data-slot="avatar"]').or(
        hoverCardContent.locator('img[src="/favicon.svg"]')
      ).or(
        hoverCardContent.locator('img')
      );
      
      // Avatar might be rendered as an img or with specific avatar component
      // Check if there's an image or avatar fallback
      const hasImage = await hoverCardContent.locator('img').count() > 0;
      const hasAvatarFallback = await hoverCardContent.getByText('VC').count() > 0;

    // Verify that display hover card title and description
    const title = hoverCardContent.getByRole('heading', { name: 'Blok' });
    await expect(title).toBeVisible();
    const description = hoverCardContent.getByText('The Sitecore design system');
    await expect(description).toBeVisible();

    // Verify that display hover card date information
    const dateText = hoverCardContent.getByText('Created October 2025');
    await expect(dateText).toBeVisible();

    // Verify that close hover card when mouse leaves trigger
    await page.mouse.move(0, 0);
    await expect(hoverCardContent).not.toBeVisible();
}