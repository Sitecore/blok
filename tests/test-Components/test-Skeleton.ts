import { test, expect, Page } from '@playwright/test';

export async function testSkeletonDefault(page: Page){
    // Verify that the skeleton is visible
    const skeletons = page.locator('[id="skeleton-default"]');
    await expect(skeletons.first()).toBeVisible();

    // Verify that have correct skeleton structure - circular avatar skeleton
    const circularAvatarSkeleton = skeletons.locator('[data-slot="skeleton"]').nth(0);
    await expect(circularAvatarSkeleton).toBeVisible();
    // Verify it has the correct classes
    const classes = await circularAvatarSkeleton.getAttribute('class');
    expect(classes).toContain('animate-pulse');
    expect(classes).toContain('bg-accent');
    expect(classes).toContain('rounded-full');

    // Verify that have correct skeleton structure - rectangular avatar skeleton
    // First rectangular avatar skeleton
    const rectangularAvatarSkeleton1 = skeletons.locator('[data-slot="skeleton"]').nth(1);
    await expect(rectangularAvatarSkeleton1).toBeVisible();
    // Verify it has the correct classes
    const classes1 = await rectangularAvatarSkeleton1.getAttribute('class');
    expect(classes1).toContain('animate-pulse');
    expect(classes1).toContain('rounded-md');
    expect(classes1).toContain('bg-accent');
    expect(classes1).toContain('h-4');
    expect(classes1).toContain('w-[150px]');

    // Second rectangular avatar skeleton
    const rectangularAvatarSkeleton2 = skeletons.locator('[data-slot="skeleton"]').nth(2);
    await expect(rectangularAvatarSkeleton2).toBeVisible();
    // Verify it has the correct classes
    const classes2 = await rectangularAvatarSkeleton2.getAttribute('class');
    expect(classes2).toContain('animate-pulse');
    expect(classes2).toContain('rounded-md');
    expect(classes2).toContain('bg-accent');
    expect(classes2).toContain('h-4');
    expect(classes2).toContain('w-[100px]');
}