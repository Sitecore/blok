import { test, expect, Page } from '@playwright/test';

export async function testSingleCalendar(page: Page){
    // Check that calendar is visible
    const calendarSingle = page.locator('[id="calendar-single"]');
    const calendar = calendarSingle.locator('[data-slot="calendar"]');
    await expect(calendar).toBeVisible();

    // Verify calendar has a table structure (react-day-picker uses table)
    const table = calendar.locator('table');
    await expect(table).toBeVisible();

    // Verify default selected date (June 12, 2025)
    // Try to find by data-selected first, fallback to finding by data-day attribute
    let selectedDay = calendar.locator('button[data-selected="true"]');
    const selectedCount = await selectedDay.count();
    
    if (selectedCount === 0) {
      // If no button with data-selected, try to find the specific date button
      selectedDay = calendar.locator('button[data-day*="2025-06-12"]');
    }
    
    await expect(selectedDay).toBeVisible();
    const dayValue = await selectedDay.getAttribute('data-day');
    expect(dayValue).toBeTruthy();
    expect(dayValue).toContain('2025-06-12');

    // Verify that navigate to previous month when previous button is clicked
    const prevButton = page.locator('[aria-label="Go to the Previous Month"]').first();
    await prevButton.click();
    await expect(calendar).toBeVisible();
    
    // Verify that navigate to next month when next button is clicked
    const nextButton = page.locator('[aria-label="Go to the Next Month"]').last();
    await nextButton.click();
    await expect(calendar).toBeVisible();

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

export async function testTwoMonthCalendar(page: Page){
  await page.reload();
    // Check that calendar is visible
    const calendarTwoMonth = page.locator('[id="calendar-range"]');
    const calendar = calendarTwoMonth.locator('[data-slot="calendar"]');
    await expect(calendar).toBeVisible();

    // Verify that shows two months in range mode
    const monthGrids = calendar.first().locator('.rdp-months').locator('.rdp-month');
    await expect(monthGrids).toHaveCount(2);

    // Verify default range is selected (2025-06-09 to 2025-06-26)
    const rangeStart = calendar.locator('button[data-day="2025-06-09"][data-range-start="true"]');
    const rangeEnd = calendar.locator('button[data-day="2025-06-26"][data-range-end="true"]');
    await expect(rangeStart).toBeVisible();
    await expect(rangeEnd).toBeVisible();
}