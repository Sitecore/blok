import { test, expect, Page } from '@playwright/test';

export async function testSingleDatePicker(page: Page){
    // Verify that date picker button is visible
    const datePickerButton = page.locator('[data-slot="popover-trigger"]');
    //const datePickerButton = page.locator('button:has-text("Pick a date")').last();
    await expect(datePickerButton).toBeVisible();
    await expect(datePickerButton).toContainText('Pick a date');
    await expect(page.locator('[class="text-muted-foreground"]')).toBeVisible();

    // Verify that open calendar popover when button is clicked
    await datePickerButton.click();
    const popoverContent = page.locator('[data-slot="popover-content"]').last();
    await expect(popoverContent).toBeVisible();

    // Verify calendar is visible inside popover
    const calendar = popoverContent.locator('[data-slot="calendar"]');
    await expect(calendar).toBeVisible();    


    // Verify that navigate to previous month when previous button is clicked
    const prevButton = page.locator('[aria-label="Go to the Previous Month"]').first();
    await prevButton.click();
    await expect(calendar).toBeVisible();
    
    // Verify that navigate to next month when next button is clicked
    const nextButton = page.locator('[aria-label="Go to the Next Month"]').last();
    await nextButton.click();
    await expect(calendar).toBeVisible();

    // Verify display month options in dropdown
    const monthDropdown = calendar.locator('[data-slot="select-trigger"]').first();
    await monthDropdown.click();
    const monthdropdownContent = page.locator('[data-slot="select-content"]');
    await expect(monthdropdownContent).toBeVisible();
    const monthOptions = monthdropdownContent.locator('[data-slot="select-item"]');
    const expectedMonths = [
        /Jan/i, /Feb/i, /Mar/i, /Apr/i, /May/i, /Jun/i,
        /Jul/i, /Aug/i, /Sep/i, /Oct/i, /Nov/i, /Dec/i
    ];

    // Verify all month options are visible
      const monthTexts = await monthOptions.allTextContents();
      expect(monthTexts.length).toBe(12);
      for (const monthPattern of expectedMonths) {
        const found = monthTexts.some(text => monthPattern.test(text));
        expect(found).toBeTruthy();
      }
    
    // Select a different month (e.g., January)
    const januaryOption = monthdropdownContent.locator('[data-slot="select-item"]').filter({ hasText: /Jan/i }).first();
    if (await januaryOption.count() > 0) {
      await januaryOption.click();
      
    // Verify that dropdown is closed
      await expect(monthdropdownContent).not.toBeVisible();
    } 

    // Verify display year options in dropdown
    const yearDropdown = calendar.locator('[data-slot="select-trigger"]').nth(1);
    await yearDropdown.click();
    const yeardropdownContent = page.locator('[data-slot="select-content"]');
    await expect(yeardropdownContent).toBeVisible();
    const yearOptions = yeardropdownContent.locator('[data-slot="select-item"]');
    const yearcount = await yearOptions.count();
    expect(yearcount).toBeGreaterThan(0);    

    // Select a different year (e.g., 2024)
    const otherYearOption = yeardropdownContent.locator('[data-slot="select-item"]').filter({ hasText: /2024/i }).first();
    if (await otherYearOption.count() > 0) {
      await otherYearOption.click();
      
      // Verify that dropdown is closed
      await expect(monthdropdownContent).not.toBeVisible();
    } 

    // Verify that select a date when day is clicked
    const dayButtons = calendar.locator('button[data-day]');
    const targetDay = dayButtons.filter({ hasText: '15' }).first();

    if (await targetDay.count() > 0) {
        await expect(targetDay).toBeVisible();
        await targetDay.click();
    }

    // Verify that close popover when clicking outside
    await page.mouse.click(10, 10);
    await expect(popoverContent).not.toBeVisible({ timeout: 2000 });

    // Verify that update button text after date selection
    const buttonText = await datePickerButton.textContent();
    expect(buttonText).toBeTruthy();
    expect(buttonText).not.toBe('Pick a date');
    expect(buttonText).toBe('January 15th, 2024');

}