import { test, expect, Page } from '@playwright/test';

export async function testAccordian(page: Page){

    const trigger1 = page.getByRole('button', { name: 'Why do developers prefer dark mode?' });
    const trigger2 = page.getByRole('button', { name: 'Why do Java developers wear glasses?' });
    const content1 = page.locator('[data-slot="accordion-content"]').nth(0);
    const content2 = page.locator('[data-slot="accordion-content"]').nth(1);

  // open first
    await trigger1.click();
    await page.waitForTimeout(40);
    await expect(content1).toBeVisible();

  // open second
    await trigger2.click();
    await page.waitForTimeout(40);
    await expect(content2).toBeVisible();

  // first should now be closed because of single mode
    await expect(content1).toBeHidden();

}

