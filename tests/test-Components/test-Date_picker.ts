import { test, expect, Page } from '@playwright/test';

export async function testSimpleDatePicker(page: Page){
    // Verify that date picker button is visible
    const datePicker = page.locator('[id="date-picker-simple"]');
    const datePickerButton = datePicker.locator('[data-slot="popover-trigger"]');
    await expect(datePickerButton).toBeVisible();
    await expect(datePickerButton).toContainText('Pick a date');
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
  await expect(datePickerButton).toContainText('Jan 20, 2026 - Feb 09, 2026');
  await expect(datePickerButton.locator('[class="text-muted-foreground"]')).toBeVisible();

  // Verify that open date picker range calendar when button is clicked
  await datePickerButton.click();
  const popover = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
  const calendar = popover.locator('[data-slot="calendar"]');
  await expect(calendar).toBeVisible();

  // Verify that select a date range when day is clicked
    // Click new start day (e.g. June 15)
    await calendar.locator('button[data-day="2026-01-11"]').click();
    // Click new end day (e.g. June 20)
    await calendar.locator('button[data-day="2026-02-02"]').click();
    // Verify range is reflected
    await expect(calendar.locator('button[data-day="2026-01-11"][data-range-start="true"]')).toBeVisible();
    await expect(calendar.locator('button[data-day="2026-02-02"][data-range-end="true"]')).toBeVisible();
   
  // Verify that close popover when clicking outside
  await page.mouse.click(10, 10);
  await expect(calendar).not.toBeVisible({ timeout: 2000 });

  // Verify that update button text after date selection
  const buttonText = (await datePickerButton.textContent())?.trim() ?? '';
  expect(buttonText).not.toBe('Jan 20, 2026 - Feb 09, 2026');
  expect(buttonText).toBe('Jan 11, 2026 - Feb 02, 2026');
}