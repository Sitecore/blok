import { test, expect, Page } from '@playwright/test';

export async function testPagination(page: Page){
    // Verify that display pagination component
    const pagination = page.locator('[data-slot="pagination"]');
    await expect(pagination).toBeVisible();
    
    // Verify it has the correct aria-label
    await expect(pagination).toHaveAttribute('aria-label', 'pagination');

    // Verify that display pagination content
    const paginationContent = pagination.locator('[data-slot="pagination-content"]');
    await expect(paginationContent).toBeVisible();

    // Verify that display all links in the pagination items
    const paginationItems = paginationContent.locator('[data-slot="pagination-item"]');
    const paginationLinks = paginationItems.locator('[data-slot="pagination-link"]');

    // Verify that display previous button
    const previousButton = paginationItems.locator('[aria-label="Go to previous page"]');
    await expect(previousButton).toBeVisible();
    await expect(previousButton).toHaveAttribute('data-slot', 'pagination-link');

    // Verify that display next button
    const nextButton = paginationItems.locator('[aria-label="Go to next page"]');
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toHaveAttribute('data-slot', 'pagination-link');

    // Verify that display page number links
    const pageNumberLinks1 = paginationLinks.nth(1).filter({ hasText: '1' });
    await expect(pageNumberLinks1).toBeVisible();
      const href1 = await pageNumberLinks1.getAttribute('href');
      expect(href1).toBeTruthy();

    const pageNumberLinks2 = paginationLinks.nth(2).filter({ hasText: '2' });
    await expect(pageNumberLinks2).toBeVisible();
      const href2 = await pageNumberLinks2.getAttribute('href');
      expect(href2).toBeTruthy();

    const pageNumberLinks3 = paginationLinks.nth(3).filter({ hasText: '3' });
    await expect(pageNumberLinks3).toBeVisible();
      const href3 = await pageNumberLinks3.getAttribute('href');
      expect(href3).toBeTruthy();

    // Verify that display active page link
    const activeLink = paginationItems.locator('[data-slot="pagination-link"][data-active="true"]');
    await expect(activeLink).toBeVisible();
    const textContent = await activeLink.textContent();
    expect(textContent?.trim()).toBe('2');
    const classAttribute = await activeLink.getAttribute('class');
    expect(classAttribute).toBeTruthy();
    expect(classAttribute).toContain('bg-primary-bg');

}