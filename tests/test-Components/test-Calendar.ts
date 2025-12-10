import { test, expect, Page } from '@playwright/test';

export async function testSingleCalendar(page: Page){
    // Check that calendar is visible
    const calendar = page.locator('[data-slot="calendar"]');
    await expect(calendar).toBeVisible();

    // Verify calendar has a table structure (react-day-picker uses table)
    const table = calendar.locator('table');
    await expect(table).toBeVisible();

    // Verify weekday headers are visible (typically 7 days)
    const weekdays = calendar.locator('thead tr th');
    const weekdaycount = await weekdays.count();
    expect(weekdaycount).toBe(7);
    for (let i = 0; i < weekdaycount; i++) {
      await expect(weekdays.nth(i)).toBeVisible();
    }

    // Verify all day buttons are visible
    const dayButtons = calendar.locator('button[data-day]');
    const daycount = await dayButtons.count();
    expect(daycount).toBeGreaterThanOrEqual(28);
    for (let i = 0; i < Math.min(daycount, 7); i++) {
      await expect(dayButtons.nth(i)).toBeVisible();
    }

    // Verify default selected date (June 12, 2025)
    const selectedDay = calendar.locator('button[data-selected="true"]');
    await expect(selectedDay).toBeVisible();
    const dayValue = await selectedDay.getAttribute('data-day');
    expect(dayValue).toBeTruthy();
    expect(dayValue).toContain('6/12/2025');

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
      
      // Dropdown should close
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
      
      // Dropdown should close
      await expect(monthdropdownContent).not.toBeVisible();
    } 

    // Select a different day 
    const otherdayButtons = calendar.locator('button[data-day]');
    const selectedOtherDay = calendar.locator('button[data-selected="true"]');
    const todayButton = calendar.locator('button[data-day]').filter({ hasText: new Date().getDate().toString() });

    // Click on the different day
    const otherDay = otherdayButtons.filter({ hasNot: selectedOtherDay }).first();
    await expect(otherDay).toBeVisible();
    await otherDay.click();
    
    // Wait a bit for the selection to update
    await page.waitForTimeout(300);
    
    // Verify the new day is selected
    const newSelectedDay = calendar.locator('button[data-selected="true"]');
    await expect(newSelectedDay).toBeVisible();
    
    // Verify it's a different day
    const newSelectedDayValue = await newSelectedDay.getAttribute('data-day');
    expect(newSelectedDayValue).not.toBe(todayButton);    
}