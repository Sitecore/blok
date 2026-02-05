import { test, expect, Page } from '@playwright/test';

export async function testEmptyStatesNoSearchResults(page: Page){
    // Verify that display empty states component
    const emptyStates = page.locator('[id="empty-states-no-search-results"]');
    await expect(emptyStates).toBeVisible();

    // Verify that display image in empty states
    const image = emptyStates.locator('img');
    await expect(image).toBeVisible();
    
    // Verify image has src and alt attributes
    const imageSrc = await image.getAttribute('src');
    expect(imageSrc).toBeTruthy();
    const imageAlt = await image.getAttribute('alt');
    expect(imageAlt).toBeTruthy();
    expect(imageAlt).toBe('magnifier icon');

    // Verify that display correct title and description in empty states
    await expect(emptyStates).toContainText('No search results');
    await expect(emptyStates).toContainText('Try a different search query.');

    // Verify that display action button in empty states
    const actionButton = emptyStates.getByRole('button', { name: 'Reset search' });
    await expect(actionButton).toBeVisible();
    await expect(actionButton).toBeEnabled();
}

export async function testEmptyStatesNothingCreated(page: Page){
    // Verify that display empty states component
    const emptyStates = page.locator('[id="empty-states-nothing-created"]');
    await expect(emptyStates).toBeVisible();

    // Verify that display image in empty states
    const image = emptyStates.locator('img');
    await expect(image).toBeVisible();
    
    // Verify image has src and alt attributes
    const imageSrc = await image.getAttribute('src');
    expect(imageSrc).toBeTruthy();
    const imageAlt = await image.getAttribute('alt');
    expect(imageAlt).toBeTruthy();
    expect(imageAlt).toBe('desert icon');

    // Verify that display correct title and description in empty states
    await expect(emptyStates).toContainText('No widgets yet');

    // Verify that display action button in empty states
    const actionButton = emptyStates.getByRole('button', { name: 'Create widget' });
    await expect(actionButton).toBeVisible();
    await expect(actionButton).toBeEnabled();
}

export async function testEmptyStatesError(page: Page){
    // Verify that display empty states component
    const emptyStates = page.locator('[id="empty-states-error"]');
    await expect(emptyStates).toBeVisible();

    // Verify that display image in empty states
    const image = emptyStates.locator('img');
    await expect(image).toBeVisible();
    
    // Verify image has src and alt attributes
    const imageSrc = await image.getAttribute('src');
    expect(imageSrc).toBeTruthy();
    const imageAlt = await image.getAttribute('alt');
    expect(imageAlt).toBeTruthy();
    expect(imageAlt).toBe('alert icon');

    // Verify that display correct title and description in empty states
    await expect(emptyStates).toContainText('Something went wrong');
    await expect(emptyStates).toContainText('Description of the error.');

    // Verify that display action button in empty states
    const actionButton = emptyStates.getByRole('button', { name: 'Try again' });
    await expect(actionButton).toBeVisible();
    await expect(actionButton).toBeEnabled();
}