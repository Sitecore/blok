import { test, expect, Page, type Locator } from '@playwright/test';

/** Matches UI date picker label, e.g. "April 21st, 2026" (ordinal day, not `toLocaleDateString`). */
function ordinalSuffix(day: number): string {
  const j = day % 10;
  const k = day % 100;
  if (k >= 11 && k <= 13) return 'th';
  switch (j) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function formatLongDateWithOrdinal(d: Date): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const day = d.getDate();
  return `${months[d.getMonth()]} ${day}${ordinalSuffix(day)}, ${d.getFullYear()}`;
}

/** Parse `YYYY-MM-DD` from `data-day` as local midnight. */
function parseIsoLocal(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y!, m! - 1, d!);
}

/** Range trigger uses short months and zero-padded day, e.g. "May 12, 2026 - Jun 01, 2026". */
function formatShortMonthDayYear(d: Date): string {
  const shorts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  return `${shorts[d.getMonth()]} ${day}, ${d.getFullYear()}`;
}

function formatRangeButtonLabelFromIso(startIso: string, endIso: string): string {
  return `${formatShortMonthDayYear(parseIsoLocal(startIso))} - ${formatShortMonthDayYear(parseIsoLocal(endIso))}`;
}

async function cellIsPickable(loc: Locator): Promise<boolean> {
  if ((await loc.getAttribute('disabled')) !== null) return false;
  if ((await loc.getAttribute('aria-disabled')) === 'true') return false;
  return true;
}

/** Two pickable days (start < end) whose formatted range label differs from the current trigger text. */
async function pickRangePairLabelNotEqual(calendar: Locator, avoidLabel: string) {
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
      const label = formatRangeButtonLabelFromIso(di, dj);
      if (label.replace(/\s+/g, ' ').trim() === avoidLabel.replace(/\s+/g, ' ').trim()) continue;
      return { start: locI, end: locJ, startIso: di, endIso: dj, label };
    }
  }
  throw new Error('Could not find a different visible date range in the calendar');
}

export async function testSimpleDatePicker(page: Page){
    // Verify that date picker button is visible
    const datePicker = page.locator('[id="date-picker-simple"]');
    const datePickerButton = datePicker.locator('[data-slot="popover-trigger"]');
    await expect(datePickerButton).toBeVisible();

    // Verify that display current date in button
    const currentDate = formatLongDateWithOrdinal(new Date());
    await expect(datePickerButton).toContainText(currentDate);
    await expect(datePickerButton.locator('[class="text-muted-foreground"]')).toBeVisible();

    // Verify that open calendar popover when button is clicked
    await datePickerButton.click();
    const popoverContent = page.locator('[data-slot="popover-content"]');
    await expect(popoverContent).toBeVisible();

    // Verify calendar is visible inside popover
    const calendar = popoverContent.locator('[data-slot="calendar"]');
    await expect(calendar).toBeVisible();    


    // Verify that navigate to previous month when previous button is clicked
    const prevButton = popoverContent.locator('[aria-label="Go to the Previous Month"]').first();
    await expect(prevButton).toBeVisible();
    await prevButton.click();
    await expect(calendar).toBeVisible();
    
    // Verify that navigate to next month when next button is clicked
    const nextButton = popoverContent.locator('[aria-label="Go to the Next Month"]').last();
    await expect(nextButton).toBeVisible();
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

    // Verify that month dropdown has the expected classes
    const monthClasses = await monthDropdown.getAttribute('class');
    expect(monthClasses).toContain('text-sm');
    expect(monthClasses).toContain('text-neutral-fg');
    expect(monthClasses).toContain('data-[state=open]:border-2');

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
    
    // Verify that year dropdown has the expected classes
    const yearClasses = await yearDropdown.getAttribute('class');
    expect(yearClasses).toContain('text-sm');
    expect(yearClasses).toContain('text-neutral-fg');
    expect(yearClasses).toContain('data-[state=open]:border-2');

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

export async function testDatePickerRange(page: Page){
  // Verify that date picker button is visible
  const datePicker = page.locator('[id="date-picker-range"]');
  const datePickerButton = datePicker.locator('[data-slot="popover-trigger"]');
  await expect(datePickerButton).toBeVisible();
  const initialRange = ((await datePickerButton.textContent()) ?? '').replace(/\s+/g, ' ').trim();
  expect(initialRange).toMatch(/[A-Za-z]{3,9} \d{1,2}, \d{4} - [A-Za-z]{3,9} \d{1,2}, \d{4}/);
  await expect(datePickerButton.locator('[class="text-muted-foreground"]')).toBeVisible();

  // Verify that open date picker range calendar when button is clicked
  await datePickerButton.click();
  const popover = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
  const calendar = popover.locator('[data-slot="calendar"]');
  await expect(calendar).toBeVisible();

  const { start, end, startIso, endIso, label: expectedNewLabel } = await pickRangePairLabelNotEqual(
    calendar,
    initialRange,
  );
  await expect(start).toBeVisible();
  await expect(end).toBeVisible();
  await start.click();
  await end.click();
  await expect(calendar.locator(`button[data-day="${startIso}"][data-range-start="true"]`).first()).toBeVisible();
  await expect(calendar.locator(`button[data-day="${endIso}"][data-range-end="true"]`).first()).toBeVisible();

  // Verify that close popover when clicking outside
  await page.mouse.click(10, 10);
  await expect(calendar).not.toBeVisible({ timeout: 2000 });

  // Verify that update button text after date selection
  const buttonText = ((await datePickerButton.textContent()) ?? '').replace(/\s+/g, ' ').trim();
  expect(buttonText).not.toBe(initialRange);
  expect(buttonText).toBe(expectedNewLabel);
}