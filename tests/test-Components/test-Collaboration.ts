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

    // Verify that first avatar is visible
    const firstAvatar = avatarStack.nth(0).locator('[data-slot="avatar-fallback"]');
    await expect(firstAvatar).toBeVisible();
    await expect(firstAvatar).toContainText('AH');

    // Verify that second avatar is visible
    const secondAvatar = avatarStack.nth(1).locator('[data-slot="avatar-fallback"]');
    await expect(secondAvatar).toBeVisible();
    await expect(secondAvatar).toContainText('LG');

    // Verify that third avatar is visible
    const thirdAvatar = avatarStack.nth(2).locator('[data-slot="avatar-fallback"]');
    await expect(thirdAvatar).toBeVisible();
    await expect(thirdAvatar).toContainText('SM');

    // Verify that display +n overflow indicator when more than 3 users exist
    const overflowIndicator = collaboration.locator('div').locator('div:has-text("+")');
    await expect(overflowIndicator).toBeVisible();
    await expect(overflowIndicator).toHaveText('+1');

    // Verify that open users popover on avatar trigger click
    await collaboration.click();
    const popover = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(popover).toBeVisible();

    const popoverCard = popover.locator('[data-slot="card"]');

    // Verify that display "Users" title in popover
    const title = popoverCard.locator('div').nth(0);
    await expect(title).toContainText('Users');

    // Verify that list all added users in the popover
    // Try to find users container more flexibly - look for the container that has the user names
    const usersContainer = popoverCard.locator('div').nth(1);
    await expect(usersContainer).toBeVisible();
    
    // Verify all users are visible using getByText which searches within the popover
    await expect(popoverCard.getByText('Arshad Hannan')).toBeVisible();
    await expect(popoverCard.getByText('Lasith Gunaratne')).toBeVisible();
    await expect(popoverCard.getByText('Spyridon Misichronis')).toBeVisible();
    await expect(popoverCard.getByText('Christian Hahn')).toBeVisible();

    // Verify that remove user when Remove button is clicked
    // Find the user item that contains "Spyridon Misichronis"
    const userItem = popoverCard.locator('div').filter({ hasText: 'Spyridon Misichronis' }).first();
    await expect(userItem).toBeVisible();
    // Hover over the user item to reveal the Remove button
    await userItem.hover();
    // Verify that display Remove button
    const removeButton = userItem.locator('button[data-slot="button"]');
    await expect(removeButton).toBeVisible();
    await removeButton.click();
    // Wait for the removal to complete - the user should disappear
    await expect(popoverCard.getByText('Spyridon Misichronis')).not.toBeVisible({ timeout: 5000 });

    // Verify that display "Add users" button in users popover
    // Search for the button within the entire popover card
    let addUsersButton = popoverCard.getByRole('button', { name: /Add users?/i });
    if (await addUsersButton.count() === 0) {
      // Fallback: try finding by text
      addUsersButton = popoverCard.locator('button').filter({ hasText: /Add users?/i });
    }
    if (await addUsersButton.count() === 0) {
      // Fallback: try finding by data-slot attribute
      addUsersButton = popoverCard.locator('button[data-slot="popover-trigger"]');
    }
    await expect(addUsersButton.first()).toBeVisible();

    // Verify that open add users popover when "Add users" button is clicked
    await addUsersButton.click();
    const popoverAddUsers = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(2);
    await expect(popoverAddUsers).toBeVisible();

    const popoverCardAddUsers = popoverAddUsers.locator('[data-slot="card"]');

    // Verify that display "Users" title in popover
    const titleAddUsers = popoverCardAddUsers.locator('div').nth(0);
    await expect(titleAddUsers).toContainText('Add users');
    // Verify that display close (X) button
    const closeButtonAddUsers = popoverCardAddUsers.locator('button[data-slot="button"]').nth(0);
    await expect(closeButtonAddUsers).toBeVisible();

    // Verify that display "Search" input in add users popover
    const searchInputAddUsers = popoverCardAddUsers.locator('[data-slot="input-group"]');
    await expect(searchInputAddUsers).toBeVisible();
    // Verify that display search icon in search input
    const searchIcon = searchInputAddUsers.locator('[data-slot="input-group-addon"]');
    await expect(searchIcon).toBeVisible();
    // Verify that display search input section in search input
    const searchInputSection = searchInputAddUsers.locator('[data-slot="input-group-control"]');
    await expect(searchInputSection).toBeVisible();

    // Verify that previously removed user is displayed in add users popover
    const removedUser = popoverCardAddUsers.locator('div').filter({ hasText: 'Spyridon Misichronis' }).first();
    await expect(removedUser).toBeVisible();

    //Verify that removed user can be added again by clicking on the user add button
    // Verified that display user add button in add users popover
    const AddUserButton = popoverCardAddUsers.locator('button[data-slot="button"]').nth(1);
    await expect(AddUserButton).toBeVisible();
    await AddUserButton.click();
    // Verify that removed user is not displayed in add users popover
    await expect(popoverCardAddUsers.getByText('Spyridon Misichronis')).not.toBeVisible();
    await expect(popoverCardAddUsers.getByText('All available users have been added')).toBeVisible();

    // Verify that popover is closed when close (X) button is clicked
    await closeButtonAddUsers.click();
    await expect(popoverAddUsers).not.toBeVisible();

    // Verify that removed user is displayed in users popover
    await expect(popoverCard.getByText('Spyridon Misichronis')).toBeVisible();

    // Verify that close popover when clicking outside
    // Click outside to close
    await page.locator('body').click({ position: { x: 10, y: 10 } });
    await expect(popover).not.toBeVisible();
}