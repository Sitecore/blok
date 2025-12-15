import { test, expect, Page } from '@playwright/test';

export async function testErrorStates(page: Page){
    // Verify that display error states component
    const errorStates = page.locator('[data-slot="error-states"]');
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