import { test, expect, Page } from '@playwright/test';

export async function testSkeletonDefault(page: Page){
    // Verify that the skeleton is visible
    const skeleton = page.locator('[id="skeleton-default"]');
    await expect(skeleton).toBeVisible();

    // Verify that have correct skeleton structure - circular avatar skeleton
    const circularAvatarSkeleton = skeleton.locator('[data-slot="skeleton"]').nth(0);
    await expect(circularAvatarSkeleton).toBeVisible();
    // Verify it has the correct classes
    const classes = await circularAvatarSkeleton.getAttribute('class');
    expect(classes).toContain('animate-pulse');
    expect(classes).toContain('bg-accent');
    expect(classes).toContain('rounded-full');

    // Verify that have correct skeleton structure - rectangular avatar skeleton
    // First rectangular avatar skeleton
    const rectangularAvatarSkeleton1 = skeleton.locator('[data-slot="skeleton"]').nth(1);
    await expect(rectangularAvatarSkeleton1).toBeVisible();
    // Verify it has the correct classes
    const classes1 = await rectangularAvatarSkeleton1.getAttribute('class');
    expect(classes1).toContain('animate-pulse');
    expect(classes1).toContain('rounded-md');
    expect(classes1).toContain('bg-accent');
    expect(classes1).toContain('h-4');
    expect(classes1).toContain('w-[150px]');

    // Second rectangular avatar skeleton
    const rectangularAvatarSkeleton2 = skeleton.locator('[data-slot="skeleton"]').nth(2);
    await expect(rectangularAvatarSkeleton2).toBeVisible();
    // Verify it has the correct classes
    const classes2 = await rectangularAvatarSkeleton2.getAttribute('class');
    expect(classes2).toContain('animate-pulse');
    expect(classes2).toContain('rounded-md');
    expect(classes2).toContain('bg-accent');
    expect(classes2).toContain('h-4');
    expect(classes2).toContain('w-[100px]');
}

export async function testSkeletonCardList(page: Page){
    // Verify that the skeleton is visible
    const skeletons = page.locator('[id="skeleton-card-list"]');
    await expect(skeletons.first()).toBeVisible();

    // Verify that first card skeleton is visible
    const firstCardSkeleton = skeletons.locator('[data-slot="card"]').nth(0);
    await expect(firstCardSkeleton).toBeVisible();
    // Verify it has the correct classes
    const classes = await firstCardSkeleton.getAttribute('class');
    expect(classes).toContain('border');
    expect(classes).toContain('transition-shadow');
    expect(classes).toContain('shadow-none');
    expect(classes).toContain('bg-body-bg');
    expect(classes).toContain('border-transparent');

    // Verify that card header details are visible
    const cardHeaderDetails = firstCardSkeleton.locator('[data-slot="card-header"]');
    await expect(cardHeaderDetails).toBeVisible();

    // Verify that header details have correct skeleton structure
    // First rectangular avatar skeleton
    const rectangularAvatarSkeleton1 = cardHeaderDetails.locator('[data-slot="skeleton"]').nth(0);
    await expect(rectangularAvatarSkeleton1).toBeVisible();
    // Verify it has the correct classes
    const classes1 = await rectangularAvatarSkeleton1.getAttribute('class');
    expect(classes1).toContain('animate-pulse');
    expect(classes1).toContain('rounded-md');
    expect(classes1).toContain('bg-accent');
    expect(classes1).toContain('h-4');
    expect(classes1).toContain('w-2/3');

    // Second rectangular avatar skeleton
    const rectangularAvatarSkeleton2 = cardHeaderDetails.locator('[data-slot="skeleton"]').nth(1);
    await expect(rectangularAvatarSkeleton2).toBeVisible();
    // Verify it has the correct classes
    const classes2 = await rectangularAvatarSkeleton2.getAttribute('class');
    expect(classes2).toContain('animate-pulse');
    expect(classes2).toContain('rounded-md');
    expect(classes2).toContain('bg-accent');
    expect(classes2).toContain('h-4');
    expect(classes2).toContain('w-1/2');

    // Verify that card content details are visible
    const cardContentDetails = firstCardSkeleton.locator('[data-slot="card-content"]');
    await expect(cardContentDetails).toBeVisible();

    // Verify that header details have correct skeleton structure
    // First rectangular avatar skeleton
    const skeleton = cardContentDetails.locator('[data-slot="skeleton"]');
    await expect(skeleton).toBeVisible();
    // Verify it has the correct classes
    const Skeletonclasses1 = await skeleton.getAttribute('class');
    expect(Skeletonclasses1).toContain('animate-pulse');
    expect(Skeletonclasses1).toContain('rounded-md');
    expect(Skeletonclasses1).toContain('bg-accent');
    expect(Skeletonclasses1).toContain('aspect-square');
    expect(Skeletonclasses1).toContain('w-full');
}