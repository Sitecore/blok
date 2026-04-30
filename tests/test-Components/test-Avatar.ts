import { test, expect, Page } from '@playwright/test';

export async function testAvatar(page: Page){
  // Verify that display default avatar section
    const avatarDefault = page.locator('[id="avatar-default"]');
  // Verify that avatar with an image is visible
    const avatar = avatarDefault.locator('[data-slot="avatar"]');
    await expect(avatar).toBeVisible();
  
  // Verify that the avatar image exists
    const avatarImage = avatar.locator('[data-slot="avatar-image"]');
    await expect(avatarImage).toBeVisible();
  
  // Verify the image has the correct alt text
    await expect(avatarImage).toHaveAttribute('alt', 'Frank Grinaert');
}

export async function testFallbackAvatar(page: Page){
  // Verify that display fallback avatar section
  const avatarFallback = page.locator('[id="avatar-fallback"]');

  // Verify that avatar which has fallback is visible
    const avatars = avatarFallback.locator('span[data-slot="avatar"]');
    await expect(avatars).toBeVisible();

  // Verify that fallback text is visible
    const fallback = avatars.locator('[data-slot="avatar-fallback"]');
    await expect(fallback).toBeVisible();
    await expect(fallback).toContainText('BM');
}

export async function testLargeAvatar(page: Page){
  // Verify that display large avatar section
  const avatarLarge = page.locator('[id="avatar-large"]');
    
  // Verify multiple avatars are present in the group
    const avatarsInGroup = avatarLarge.locator('span[data-slot="avatar"]');
    const count = await avatarsInGroup.count();
    expect(count).toBeGreaterThanOrEqual(3);
  
  // Check that each avatar in the group is visible
    for (let i = 0; i < count; i++) {
        await expect(avatarsInGroup.nth(i)).toBeVisible();
    }

  // Verify that first avatar is visible in avatar group
    const avatarOne = avatarsInGroup.nth(0);
    await expect(avatarOne).toBeVisible();
    // Verify that fallback text is visible
    const fallback = avatarOne.locator('[data-slot="avatar-fallback"]');
    await expect(fallback).toBeVisible();
    await expect(fallback).toContainText('CN');

  // Verify that second avatar is visible in avatar group
    const avatarTwo = avatarsInGroup.nth(1);
    await expect(avatarTwo).toBeVisible();
    // Verify that avatar image is visible
    const imageMartin = avatarTwo.locator('[data-slot="avatar-image"]');
    await expect(imageMartin).toBeVisible();
    await expect(imageMartin).toHaveAttribute('alt', 'Martin Svarrer Christensen');
    
  // Verify that third avatar is visible in avatar group
    const avatarThree = avatarsInGroup.nth(2);
    await expect(avatarThree).toBeVisible();
    // Verify that avatar image is visible
    const imageOmar = avatarThree.locator('[data-slot="avatar-image"]');
    await expect(imageOmar).toBeVisible();
    await expect(imageOmar).toHaveAttribute('alt', 'Omar Oueslati');
}

export async function testInteractiveAvatar(page: Page){
  // Verify that display interactive avatar section
  const avatarInteractive = page.locator('[id="avatar-interactive"]');
    
  // Verify multiple avatars are present in the group
    const avatarsInGroup = avatarInteractive.locator('span[data-slot="avatar"]');
    const count = await avatarsInGroup.count();
    expect(count).toBeGreaterThanOrEqual(3);
  
  // Check that each avatar in the group is visible
    for (let i = 0; i < count; i++) {
        await expect(avatarsInGroup.nth(i)).toBeVisible();
    }

  // Verify that first avatar is visible in avatar group
    const avatarOne = avatarsInGroup.nth(0);
    await expect(avatarOne).toBeVisible();
    // Verify that avatar image is visible
    const imageSpongebob = avatarOne.locator('[data-slot="avatar-image"]');
    await expect(imageSpongebob).toBeVisible();
    await expect(imageSpongebob).toHaveAttribute('alt', 'Spongebob');

  // Verify that second avatar is visible in avatar group
    const avatarTwo = avatarsInGroup.nth(1);
    await expect(avatarTwo).toBeVisible();
    // Verify that avatar image is visible
    const fallbackPS = avatarTwo.locator('[data-slot="avatar-fallback"]');
    await expect(fallbackPS).toBeVisible();
    await expect(fallbackPS).toContainText('PS');
    
  // Verify that third avatar is visible in avatar group
    const avatarThree = avatarsInGroup.nth(2);
    await expect(avatarThree).toBeVisible();
    // Verify that avatar image is visible
    const fallbackST = avatarThree.locator('[data-slot="avatar-fallback"]');
    await expect(fallbackST).toBeVisible();
    await expect(fallbackST).toContainText('ST');
}

export async function testAvatarMenu(page: Page){
  // Verify that display avatar menu section
  const avatarMenu = page.locator('[id="avatar-menu"]');

  // Verify that first avatar menu is visible
  const avatarMenu1 = avatarMenu.locator('[class="flex -space-x-2"]').nth(0);

  // Verify that first avatar menu item is visible
  const avatarMenuItem1 = avatarMenu1.locator('button');
  await expect(avatarMenuItem1).toBeVisible();
  // Verify class attribute of avatar menu item
  const classAttribute = await avatarMenuItem1.getAttribute('class');
  expect(classAttribute).toContain('rounded-full');    
  expect(classAttribute).toContain('bg-primary-background');
  expect(classAttribute).toContain('text-primary-foreground');
  expect(classAttribute).toContain('transition-colors');
  expect(classAttribute).toContain('hover:bg-primary');
  expect(classAttribute).toContain('hover:text-white');

  // Verify that second avatar menu item is visible
  const avatarMenuItem2 = avatarMenu1.locator('span[data-slot="avatar"]');
  const imageSpongebob1 = avatarMenuItem2.locator('[data-slot="avatar-image"]');
    await expect(imageSpongebob1).toBeVisible();
    await expect(imageSpongebob1).toHaveAttribute('alt', 'Spongebob');

  // Verify that second avatar menu is visible
  const avatarMenu2 = avatarMenu.locator('[class="flex -space-x-2"]').nth(1);

  // Verify that third avatar menu item is visible
  const avatarMenuItem3 = avatarMenu2.locator('button').nth(0);
  await expect(avatarMenuItem3).toBeVisible();
  // Verify class attribute of avatar menu item
  const classAttribute3 = await avatarMenuItem3.getAttribute('class');
  expect(classAttribute3).toContain('rounded-full');    
  expect(classAttribute3).toContain('bg-primary-background');
  expect(classAttribute3).toContain('text-primary-foreground');
  expect(classAttribute3).toContain('transition-colors');
  expect(classAttribute3).toContain('hover:bg-primary');
  expect(classAttribute3).toContain('hover:text-white');

  // Verify that fourth avatar menu item is visible
  const avatarMenuItem4 = avatarMenu2.locator('span[data-slot="avatar"]').nth(0);
  const imageSpongebob2 = avatarMenuItem4.locator('[data-slot="avatar-image"]');
    await expect(imageSpongebob2).toBeVisible();
    await expect(imageSpongebob2).toHaveAttribute('alt', 'Spongebob');
  
  // Verify that fifth avatar menu item is visible
  const avatarMenuItem5 = avatarMenu2.locator('span[data-slot="avatar"]').nth(1);
  const imageOmar = avatarMenuItem5.locator('[data-slot="avatar-image"]');
    await expect(imageOmar).toBeVisible();
    await expect(imageOmar).toHaveAttribute('alt', 'Omar Oueslati');

  // Verify that sixth avatar menu item is visible
  const avatarMenuItem6 = avatarMenu2.locator('span[data-slot="avatar"]').nth(2);
  const imageSquidward = avatarMenuItem6.locator('[data-slot="avatar-image"]');
    await expect(imageSquidward).toBeVisible();
    await expect(imageSquidward).toHaveAttribute('alt', 'Squidward');

  // Verify that seventh avatar menu item is visible
  const avatarMenuItem7 = avatarMenu2.locator('button').nth(1);
  await expect(avatarMenuItem7).toBeVisible();
}