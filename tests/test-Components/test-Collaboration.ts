import { test, expect, Page } from '@playwright/test';

export async function testCollaboration(page: Page){
    // Verify that display collaboration trigger button
    const collaborationSection = page.locator('[id="collaboration"]');
    await expect(collaborationSection).toBeVisible();
    const collaboration = collaborationSection.locator('[data-slot="popover-trigger"]');
    await expect(collaboration).toBeVisible();

    // Verify that display avatar stack with maximum 3 avatars
    const avatarStack = collaboration.locator('[data-slot="avatar"]');
    await expect(avatarStack).toHaveCount(3);
}