import { test, expect, Page } from '@playwright/test';

export async function testErrorStates(page: Page){
    // Verify that display error states component
    const errorStates = page.locator('[id="error-states-generic"]');
    await expect(errorStates).toBeVisible();

    // Verify that display image in error states
    const image = errorStates.locator('img');
    await expect(image).toBeVisible();
    
    // Verify image has src and alt attributes
    const imageSrc = await image.getAttribute('src');
    expect(imageSrc).toBeTruthy();
    
    const imageAlt = await image.getAttribute('alt');
    expect(imageAlt).toBeTruthy();
    expect(imageAlt).toBe('alert');

    // Verify that display correct title and description in error states
    await expect(errorStates).toContainText('Something went wrong');
    await expect(errorStates).toContainText('(Customizable text) Please try again. If the issue persists, try visiting the Knowledge Base for assistance.');

    // Verify that knowledge base link in description for generic variant
    const knowledgeBaseLink = errorStates.locator('a[href*="#"]').or(errorStates.locator('a').filter({ hasText: 'Knowledge Base' }));
    
    // The link should be present in the generic variant description
      await expect(knowledgeBaseLink.first()).toBeVisible();
      
      // Verify link has correct attributes
      const linkHref = await knowledgeBaseLink.first().getAttribute('href');
      expect(linkHref).toBeTruthy();
    
    // Verify that display action button in empty states
    const actionButton1 = errorStates.getByRole('button', { name: 'Retry' });
    await expect(actionButton1).toBeVisible();
    await expect(actionButton1).toBeEnabled();
    const actionButton2 = errorStates.getByRole('button', { name: 'Go to homepage' });
    await expect(actionButton2).toBeVisible();
    await expect(actionButton2).toBeEnabled();
}

export async function testErrorStatesBadRequest(page: Page){
  // Verify that display error states component
  const errorStates = page.locator('[id="error-states-400"]');
  await expect(errorStates).toBeVisible();

  // Verify that display image in error states
  const image = errorStates.locator('img');
  await expect(image).toBeVisible();
  
  // Verify image has src and alt attributes
  const imageSrc = await image.getAttribute('src');
  expect(imageSrc).toBeTruthy();
  
  const imageAlt = await image.getAttribute('alt');
  expect(imageAlt).toBeTruthy();
  expect(imageAlt).toBe('alert');

  // Verify that display correct title and description in error states
  await expect(errorStates).toContainText('Bad request');
  await expect(errorStates).toContainText('(Customizable text) Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');
  
  // Verify that display action button in empty states
  const actionButton = errorStates.getByRole('button', { name: 'Go to homepage' });
  await expect(actionButton).toBeVisible();
  await expect(actionButton).toBeEnabled();
}

export async function testErrorStatesUnauthorized(page: Page){
  // Verify that display error states component
  const errorStates = page.locator('[id="error-states-401"]');
  await expect(errorStates).toBeVisible();

  // Verify that display image in error states
  const image = errorStates.locator('img');
  await expect(image).toBeVisible();
  
  // Verify image has src and alt attributes
  const imageSrc = await image.getAttribute('src');
  expect(imageSrc).toBeTruthy();
  
  const imageAlt = await image.getAttribute('alt');
  expect(imageAlt).toBeTruthy();
  expect(imageAlt).toBe('stop');

  // Verify that display correct title and description in error states
  await expect(errorStates).toContainText('Unauthorized');
  await expect(errorStates).toContainText('(Customizable text) Lorem ipsum dolor sit amet, consectetuer adipiscing elit.');
  
  // Verify that display action button in empty states
  const actionButton = errorStates.getByRole('button', { name: 'Go to homepage' });
  await expect(actionButton).toBeVisible();
  await expect(actionButton).toBeEnabled();
}

export async function testErrorStatesForbidden(page: Page){
  // Verify that display error states component
  const errorStates = page.locator('[id="error-states-403"]');
  await expect(errorStates).toBeVisible();

  // Verify that display image in error states
  const image = errorStates.locator('img');
  await expect(image).toBeVisible();
  
  // Verify image has src and alt attributes
  const imageSrc = await image.getAttribute('src');
  expect(imageSrc).toBeTruthy();
  
  const imageAlt = await image.getAttribute('alt');
  expect(imageAlt).toBeTruthy();
  expect(imageAlt).toBe('lock');

  // Verify that display correct title and description in error states
  await expect(errorStates).toContainText('Forbidden');
  await expect(errorStates).toContainText('(Customizable text) You don\'t have permission to access this page.');
  
  // Verify that display action button in empty states
  const actionButton = errorStates.getByRole('button', { name: 'Go to homepage' });
  await expect(actionButton).toBeVisible();
  await expect(actionButton).toBeEnabled();
}

export async function testErrorStatesNotFound(page: Page){
  // Verify that display error states component
  const errorStates = page.locator('[id="error-states-404"]');
  await expect(errorStates).toBeVisible();

  // Verify that display image in error states
  const image = errorStates.locator('img');
  await expect(image).toBeVisible();
  
  // Verify image has src and alt attributes
  const imageSrc = await image.getAttribute('src');
  expect(imageSrc).toBeTruthy();
  
  const imageAlt = await image.getAttribute('alt');
  expect(imageAlt).toBeTruthy();
  expect(imageAlt).toBe('map-search');

  // Verify that display correct title and description in error states
  await expect(errorStates).toContainText('Page not found');
  await expect(errorStates).toContainText('The page you are looking for cannot be found.');
  
  // Verify that display action button in empty states
  const actionButton1 = errorStates.getByRole('button', { name: 'Go to homepage' });
  await expect(actionButton1).toBeVisible();
  await expect(actionButton1).toBeEnabled();
  const actionButton2 = errorStates.getByRole('button', { name: 'Visit knowledge base' });
  await expect(actionButton2).toBeVisible();
  await expect(actionButton2).toBeEnabled();
}

export async function testErrorStatesInternalServerError(page: Page){
  // Verify that display error states component
  const errorStates = page.locator('[id="error-states-500"]');
  await expect(errorStates).toBeVisible();

  // Verify that display image in error states
  const image = errorStates.locator('img');
  await expect(image).toBeVisible();
  
  // Verify image has src and alt attributes
  const imageSrc = await image.getAttribute('src');
  expect(imageSrc).toBeTruthy();
  
  const imageAlt = await image.getAttribute('alt');
  expect(imageAlt).toBeTruthy();
  expect(imageAlt).toBe('alert');

  // Verify that display correct title and description in error states
  await expect(errorStates).toContainText('Internal server error');
  await expect(errorStates).toContainText('(Customizable text) This page isn\'t working.');
  
  // Verify that display action button in empty states
  const actionButton = errorStates.getByRole('button', { name: 'Go to homepage' });
  await expect(actionButton).toBeVisible();
  await expect(actionButton).toBeEnabled();
}

export async function testErrorStatesServiceUnavailable(page: Page){
  // Verify that display error states component
  const errorStates = page.locator('[id="error-states-503"]');
  await expect(errorStates).toBeVisible();

  // Verify that display image in error states
  const image = errorStates.locator('img');
  await expect(image).toBeVisible();
  
  // Verify image has src and alt attributes
  const imageSrc = await image.getAttribute('src');
  expect(imageSrc).toBeTruthy();
  
  const imageAlt = await image.getAttribute('alt');
  expect(imageAlt).toBeTruthy();
  expect(imageAlt).toBe('wrench-clock');

  // Verify that display correct title and description in error states
  await expect(errorStates).toContainText('Service unavailable');
  await expect(errorStates).toContainText('(Customizable text) The service you requested is not available at this time.');
  
  // Verify that display action button in empty states
  const actionButton = errorStates.getByRole('button', { name: 'Go to homepage' });
  await expect(actionButton).toBeVisible();
  await expect(actionButton).toBeEnabled();
}