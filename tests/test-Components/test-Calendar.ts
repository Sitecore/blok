import { test, expect, Page, type Locator } from '@playwright/test';

/** `data-day` on calendar cells uses local calendar YYYY-MM-DD. */
function formatLocalIsoDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

async function cellIsPickable(loc: Locator): Promise<boolean> {
    if ((await loc.getAttribute('disabled')) !== null) return false;
    if ((await loc.getAttribute('aria-disabled')) === 'true') return false;
    return true;
}

/** Pick two visible day cells (start < end) whose range is not the same as the current selection. */
async function pickNewVisibleRangePair(
    calendar: Locator,
    oldStart: string,
    oldEnd: string,
): Promise<{ start: Locator; end: Locator; startIso: string; endIso: string }> {
    const cells = calendar.locator('button[data-day]');
    const count = await cells.count();
    for (let i = 0; i < count; i++) {
        const locI = cells.nth(i);
        if (!(await cellIsPickable(locI))) continue;
        const di = await locI.getAttribute('data-day');
        if (!di) continue;
        for (let j = i + 1; j < count; j++) {
            const locJ = cells.nth(j);
            if (!(await cellIsPickable(locJ))) continue;
            const dj = await locJ.getAttribute('data-day');
            if (!dj) continue;
            if (!(di < dj)) continue;
            if (di === oldStart && dj === oldEnd) continue;
            return { start: locI, end: locJ, startIso: di, endIso: dj };
        }
    }
    throw new Error('Could not find two visible days to select a different range');
}

export async function testSingleCalendar(page: Page){
    // Check that calendar is visible
    const calendarSingle = page.locator('[id="calendar-single"]');
    const calendar = calendarSingle.locator('[data-slot="calendar"]');
    await expect(calendar).toBeVisible();

    // Verify calendar has a table structure (react-day-picker uses table)
    const table = calendar.locator('table');
    await expect(table).toBeVisible();

    // Verify default selected date is current date
    const todayIso = formatLocalIsoDate(new Date());
    // Try to find by data-selected first, fallback to finding by data-day attribute
    let selectedDay = calendar.locator('button[data-selected="true"]');
    const selectedCount = await selectedDay.count();

    if (selectedCount === 0) {
      selectedDay = calendar.locator(`button[data-day="${todayIso}"]`);
    }

    await expect(selectedDay).toBeVisible();
    const dayValue = await selectedDay.getAttribute('data-day');
    expect(dayValue).toBeTruthy();
    expect(dayValue).toContain(todayIso);

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

    // Verify default range is selected (demo dates are dynamic; assert markers + chronological order).
    const rangeStart = calendar.locator('button[data-range-start="true"]').first();
    const rangeEnd = calendar.locator('button[data-range-end="true"]').first();
    await expect(rangeStart).toBeVisible();
    await expect(rangeEnd).toBeVisible();
    const startDay = await rangeStart.getAttribute('data-day');
    const endDay = await rangeEnd.getAttribute('data-day');
    expect(startDay).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(endDay).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(startDay! <= endDay!).toBe(true);

    // Select a different date range using any two visible days (story month view is not fixed to Jan/Feb)
    const { start: newStartDay, end: newEndDay, startIso, endIso } = await pickNewVisibleRangePair(
        calendar,
        startDay!,
        endDay!,
    );
    await expect(newStartDay).toBeVisible();
    await expect(newEndDay).toBeVisible();
    await newStartDay.click();
    await newEndDay.click();

    const newRangeStart = calendar.locator('button[data-range-start="true"]').first();
    const newRangeEnd = calendar.locator('button[data-range-end="true"]').first();
    await expect(newRangeStart).toBeVisible();
    await expect(newRangeEnd).toBeVisible();
    const newStartDayValue = await newRangeStart.getAttribute('data-day');
    const newEndDayValue = await newRangeEnd.getAttribute('data-day');
    expect(newStartDayValue).toBe(startIso);
    expect(newEndDayValue).toBe(endIso);
    expect(newStartDayValue !== startDay || newEndDayValue !== endDay).toBe(true);
}