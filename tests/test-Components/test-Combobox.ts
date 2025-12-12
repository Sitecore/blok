import { test, expect, Page } from '@playwright/test';

export async function testCombobx(page: Page){
    // Check that combobox button is visible
    const comboboxButton = page.getByRole('combobox', { name: 'Select framework' });
    await expect(comboboxButton).toBeVisible();    

    // Verify initial text
    await expect(comboboxButton).toContainText('Select framework...');

    await expect(comboboxButton).toBeVisible();
    await expect(comboboxButton).toHaveAttribute('role', 'combobox');
    await expect(comboboxButton).toHaveAttribute('aria-label', 'Select framework');
    await expect(comboboxButton).toHaveAttribute('aria-expanded', 'false');
    
    // Verify that combobox is hidden initially
    await expect(comboboxButton).toHaveAttribute('aria-expanded', 'false');

    // Open the combobox    
    await comboboxButton.click();
    await expect(comboboxButton).toHaveAttribute('aria-expanded', 'true');

    // Verify all framework options are visible in the combobox    
    const frameworks = ['Next.js', 'SvelteKit', 'Nuxt.js', 'Remix', 'Astro'];
    for (const framework of frameworks) {
      await expect(page.getByText(framework, { exact: true })).toBeVisible();
    }  

    // Verify that show empty state message when no results found
    const searchInput = page.getByPlaceholder('Search framework...');
    await searchInput.fill('abc123');
    await expect(page.getByText('No framework found.')).toBeVisible();

    // Verify that clear search and show all options again
    await searchInput.clear();
    
    // Verify all options are visible again
    await expect(page.getByText('Next.js', { exact: true })).toBeVisible();
    await expect(page.getByText('SvelteKit', { exact: true })).toBeVisible();
    await expect(page.getByText('Nuxt.js', { exact: true })).toBeVisible();
    await expect(page.getByText('Remix', { exact: true })).toBeVisible();
    await expect(page.getByText('Astro', { exact: true })).toBeVisible();

    // Verify that filtering options when searching
    await searchInput.fill('next');
    await expect(page.getByText('Next.js', { exact: true })).toBeVisible();
    await expect(page.getByText('SvelteKit', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Nuxt.js', { exact: true })).not.toBeVisible(); 
    await expect(page.getByText('Remix', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Astro', { exact: true })).not.toBeVisible();

    // Verify that selecting a framework option updates the combobox text
    await page.getByText('Next.js', { exact: true }).click();
    await expect(comboboxButton).toHaveAttribute('aria-expanded', 'false');
    await expect(comboboxButton).toContainText('Next.js');
    await expect(comboboxButton).not.toContainText('Select framework...');


}