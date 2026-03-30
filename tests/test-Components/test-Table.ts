import { test, expect, Page } from '@playwright/test';

export async function testTable(page: Page){
    // Verify that display the table with correct structure
    const tableID = page.locator('[id="table"]');
    const tableContainer = tableID.locator('[data-slot="table-container"]');
    await expect(tableContainer).toBeVisible();

    // Verify table element exists
    const table = tableContainer.locator('[data-slot="table"]');
    await expect(table).toBeVisible();

    // Verify table header exists
    const tableHeader = table.locator('[data-slot="table-header"]');
    await expect(tableHeader).toBeVisible();

    // Verify that display all table headers correctly
    const headerRow = tableHeader.locator('tr[data-slot="table-row"]');
    const headers = headerRow.locator('[data-slot="table-head"]');
    const headerTexts = await headers.allTextContents();
    expect(headerTexts).toContain('Product');
    expect(headerTexts).toContain('Category');
    expect(headerTexts).toContain('Status');
    expect(headerTexts).toContain('Teams');
    expect(headerTexts).toContain('Entitlement');

    // Verify that Table header has the expected classes
    const classHeader = await headerRow.getAttribute('class');
    expect(classHeader).toContain('border-b');
    expect(classHeader).toContain('transition-colors');
    expect(classHeader).toContain('hover:bg-muted/50');
    expect(classHeader).toContain('data-[state=selected]:bg-muted');

    // Verify table body exists
    const tableBody = table.locator('[data-slot="table-body"]');
    await expect(tableBody).toBeVisible();

    // Verify that display all table data correctly
    const dataRows = tableBody.locator('tr[data-slot="table-row"]');

    // Verify first row data
    const firstRow = dataRows.first();
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(0)).toContainText('Blok');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Developer experience');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('GA');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(3)).toContainText('18');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Standard');

    // Verify second row data
    const secondRow = dataRows.nth(1);
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(0)).toContainText('Component Builder');
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Composable authoring');
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Preview');
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(3)).toContainText('6');
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Enterprise');

    // Verify third row data
    const thirdRow = dataRows.nth(2);
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(0)).toContainText('Sitecore AI');
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('AI & intelligent automation');
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Beta');
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(3)).toContainText('42');
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Add-on');

    // Verify fourth row data
    const fourthRow = dataRows.nth(3);
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(0)).toContainText('XM Cloud');
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Composable DXP');
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('GA');
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(3)).toContainText('31');
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Enterprise');
}

export async function testTableSmall(page: Page){
    // Verify that display the table with correct structure
    const tableID = page.locator('[id="table-small"]');
    const tableContainer = tableID.locator('[data-slot="table-container"]');
    await expect(tableContainer).toBeVisible();

    // Verify table element exists
    const table = tableContainer.locator('[data-slot="table"]');
    await expect(table).toBeVisible();
    // Verify that table size is small
    await expect(table).toHaveAttribute('data-table-size', 'sm');

    // Verify table header exists
    const tableHeader = table.locator('[data-slot="table-header"]');
    await expect(tableHeader).toBeVisible();

    // Verify that display all table headers correctly
    const headerRow = tableHeader.locator('tr[data-slot="table-row"]');
    const headers = headerRow.locator('[data-slot="table-head"]');
    // Verify that display checkbox header correctly
    const headerDataCheckbox = headers.nth(0);
    await expect(headerDataCheckbox).toBeVisible();
    const headerCheckbox = headerDataCheckbox.locator('[data-slot="checkbox"]');
    expect(headerCheckbox).toBeVisible();
    // Verify that display other headers correctly
    await expect(headers.nth(1)).toContainText('Product');
    await expect(headers.nth(2)).toContainText('Category');
    await expect(headers.nth(3)).toContainText('Availability');
    await expect(headers.nth(4)).toContainText('Last activity');
    // Verify that display hidden header correctly
    await expect(headers.nth(5)).toHaveAttribute('aria-hidden', 'true');

    // Verify that Table header has the expected classes
    const classHeader = await headerRow.getAttribute('class');
    expect(classHeader).toContain('border-b');
    expect(classHeader).toContain('transition-colors');
    expect(classHeader).toContain('hover:bg-muted/50');
    expect(classHeader).toContain('data-[state=selected]:bg-muted');

    // Verify table body exists
    const tableBody = table.locator('[data-slot="table-body"]');
    await expect(tableBody).toBeVisible();

    // Verify that display all table data correctly
    const dataRows = tableBody.locator('tr[data-slot="table-row"]');

    // Verify first row data
    const firstRow = dataRows.first();
    // Verify that display checkbox data correctly
    const firstCheckbox = firstRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(firstCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Blok');
    // Verify that display category
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Developer experience');
    // Verify that display availability
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('GA');
    // Verify that display last activity
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('BK');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 12, 2025 2:15 PM');
    // Verify that display Edit and More actions button
    const entitlementFirst = firstRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');

    // Verify second row data
    const secondRow = dataRows.nth(1);
    // Verify that display checkbox data correctly
    const secondCheckbox = secondRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(secondCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Component Builder');
    // Verify that display category
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Composable authoring');
    // Verify that display availability
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('Preview');
    // Verify that display last activity
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('CB');
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 11, 2025 9:40 AM');
    // Verify that display Edit and More actions button
    const entitlementSecond = secondRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementSecond.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementSecond.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');

    // Verify third row data
    const thirdRow = dataRows.nth(2);
    // Verify that display checkbox data correctly
    const thirdCheckbox = thirdRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(thirdCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Sitecore AI');
    // Verify that display category
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Intelligent automation');
    // Verify that display availability
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('Beta');
    // Verify that display last activity
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('AI');
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 10, 2025 4:22 PM');
    // Verify that display Edit and More actions button
    const entitlementThird = thirdRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementThird.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementThird.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');

    // Verify fourth row data
    const fourthRow = dataRows.nth(3);
    // Verify that display checkbox data correctly
    const fourthCheckbox = fourthRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(fourthCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('XM Cloud');
    // Verify that display category
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Composable DXP');
    // Verify that display availability
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('GA');
    // Verify that display last activity
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('XM');
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 09, 2025 11:05 AM');
    // Verify that display Edit and More actions button
    const entitlementFourth = fourthRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementFourth.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementFourth.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');
}

export async function testTableLarge(page: Page){
    // Verify that display the table with correct structure
    const tableID = page.locator('[id="table-large"]');
    const tableContainer = tableID.locator('[data-slot="table-container"]');
    await expect(tableContainer).toBeVisible();

    // Verify table element exists
    const table = tableContainer.locator('[data-slot="table"]');
    await expect(table).toBeVisible();
    // Verify that table size is large
    await expect(table).toHaveAttribute('data-table-size', 'lg');

    // Verify table header exists
    const tableHeader = table.locator('[data-slot="table-header"]');
    await expect(tableHeader).toBeVisible();

    // Verify that display all table headers correctly
    const headerRow = tableHeader.locator('tr[data-slot="table-row"]');
    const headers = headerRow.locator('[data-slot="table-head"]');
    // Verify that display checkbox header correctly
    const headerDataCheckbox = headers.nth(0);
    await expect(headerDataCheckbox).toBeVisible();
    const headerCheckbox = headerDataCheckbox.locator('[data-slot="checkbox"]');
    expect(headerCheckbox).toBeVisible();
    // Verify that display other headers correctly
    await expect(headers.nth(1)).toContainText('Product');
    await expect(headers.nth(2)).toContainText('Category');
    await expect(headers.nth(3)).toContainText('Availability');
    await expect(headers.nth(4)).toContainText('Last activity');
    // Verify that display hidden header correctly
    await expect(headers.nth(5)).toHaveAttribute('aria-hidden', 'true');

    // Verify that Table header has the expected classes
    const classHeader = await headerRow.getAttribute('class');
    expect(classHeader).toContain('border-b');
    expect(classHeader).toContain('transition-colors');
    expect(classHeader).toContain('hover:bg-muted/50');
    expect(classHeader).toContain('data-[state=selected]:bg-muted');

    // Verify table body exists
    const tableBody = table.locator('[data-slot="table-body"]');
    await expect(tableBody).toBeVisible();

    // Verify that display all table data correctly
    const dataRows = tableBody.locator('tr[data-slot="table-row"]');

    // Verify first row data
    const firstRow = dataRows.first();
    // Verify that display checkbox data correctly
    const firstCheckbox = firstRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(firstCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Blok');
    // Verify that display category
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Developer experience');
    // Verify that display availability
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('GA');
    // Verify that display last activity
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('BK');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 12, 2025 2:15 PM');
    // Verify that display Edit and More actions button
    const entitlementFirst = firstRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');

    // Verify second row data
    const secondRow = dataRows.nth(1);
    // Verify that display checkbox data correctly
    const secondCheckbox = secondRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(secondCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Component Builder');
    // Verify that display category
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Composable authoring');
    // Verify that display availability
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('Preview');
    // Verify that display last activity
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('CB');
    await expect(secondRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 11, 2025 9:40 AM');
    // Verify that display Edit and More actions button
    const entitlementSecond = secondRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementSecond.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementSecond.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');

    // Verify third row data
    const thirdRow = dataRows.nth(2);
    // Verify that display checkbox data correctly
    const thirdCheckbox = thirdRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(thirdCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('Sitecore AI');
    // Verify that display category
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Intelligent automation');
    // Verify that display availability
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('Beta');
    // Verify that display last activity
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('AI');
    await expect(thirdRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 10, 2025 4:22 PM');
    // Verify that display Edit and More actions button
    const entitlementThird = thirdRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementThird.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementThird.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');

    // Verify fourth row data
    const fourthRow = dataRows.nth(3);
    // Verify that display checkbox data correctly
    const fourthCheckbox = fourthRow.locator('[data-slot="table-cell"]').nth(0).locator('[data-slot="checkbox"]');
    expect(fourthCheckbox).toBeVisible();
    // Verify that display product with icon
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(1).locator('svg')).toBeVisible();
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('XM Cloud');
    // Verify that display category
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Composable DXP');
    // Verify that display availability
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('GA');
    // Verify that display last activity
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('XM');
    await expect(fourthRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 09, 2025 11:05 AM');
    // Verify that display Edit and More actions button
    const entitlementFourth = fourthRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementFourth.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementFourth.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');
}

export async function testTableStickyHeaderAndScroll(page: Page){
    // Verify that display the table with correct structure
    const tableID = page.locator('[id="table-sticky-header"]');
    const tableContainer = tableID.locator('[data-slot="table-container"]');
    await expect(tableContainer).toBeVisible();

    // Verify Scroll is visible
    const scroll = tableContainer.locator('div');
    await expect(scroll).toBeVisible();
    // Verify Scroll is scrollable
    await expect(scroll).toHaveClass('w-full min-h-0 flex-1 overflow-y-auto overflow-x-hidden');

    // Verify table element exists
    const table = tableContainer.locator('[data-slot="table"]');
    await expect(table).toBeVisible();

    // Verify table header exists
    const tableHeader = table.locator('[data-slot="table-header"]');
    await expect(tableHeader).toBeVisible();
    // Verify Header is sticky
    const classHeaderSticky = await tableHeader.getAttribute('class');
    expect(classHeaderSticky).toContain('sticky');

    // Verify that display all table headers correctly
    const headerRow = tableHeader.locator('tr[data-slot="table-row"]');
    const headers = headerRow.locator('[data-slot="table-head"]');
    // Verify that display other headers correctly
    await expect(headers.nth(0)).toContainText('Product');
    await expect(headers.nth(1)).toContainText('Availability');
    await expect(headers.nth(2)).toContainText('Last activity');
    // Verify that display hidden header correctly
    await expect(headers.nth(3)).toHaveAttribute('aria-hidden', 'true');

    // Verify that Table header has the expected classes
    const classHeader = await headerRow.getAttribute('class');
    expect(classHeader).toContain('border-b');
    expect(classHeader).toContain('transition-colors');
    expect(classHeader).toContain('hover:bg-muted/50');
    expect(classHeader).toContain('data-[state=selected]:bg-muted');

    // Verify table body exists
    const tableBody = table.locator('[data-slot="table-body"]');
    await expect(tableBody).toBeVisible();

    // Verify that display all table data correctly
    const dataRows = tableBody.locator('tr[data-slot="table-row"]');

    // Verify first row data
    const firstRow = dataRows.first();
    // Verify that display product with icon
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(0).locator('svg')).toBeVisible();
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(0)).toContainText('Blok');
    // Verify that display availability
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(1).locator('[data-slot="badge"]')).toContainText('GA');
    // Verify that display last activity
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(2).locator('[data-slot="avatar-fallback"]')).toContainText('BK');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Mar 12, 2025 2:15 PM');
    // Verify that display Edit and More actions button
    const entitlementFirst = firstRow.locator('[data-slot="table-cell"]').nth(3);
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');

}

export async function testTableScrollAndPin(page: Page){
    // Verify that display the table with correct structure
    const tableID = page.locator('[id="table-scroll-pin"]');
    const tableContainer = tableID.locator('[data-slot="table-container"]');
    await expect(tableContainer).toBeVisible();

    // Verify Scroll is visible
    const scroll = tableContainer.locator('div');
    await expect(scroll).toBeVisible();
    // Verify Scroll is scrollable
    await expect(scroll).toHaveClass('w-full isolate overflow-x-auto');

    // Verify table element exists
    const table = tableContainer.locator('[data-slot="table"]');
    await expect(table).toBeVisible();

    // Verify table header exists
    const tableHeader = table.locator('[data-slot="table-header"]');
    await expect(tableHeader).toBeVisible();

    // Verify that display all table headers correctly
    const headerRow = tableHeader.locator('tr[data-slot="table-row"]');
    const headers = headerRow.locator('[data-slot="table-head"]');
    // Verify that display Product header sticky
    await expect(headers.nth(0)).toContainText('Product');
    const classHeaderProduct = await headers.nth(0).getAttribute('class');
    expect(classHeaderProduct).toContain('sticky');
    // Verify that display Current users header sticky
    await expect(headers.nth(1)).toContainText('Current users');
    // Verify that display Capabilities header correctly
    await expect(headers.nth(2)).toContainText('Capabilities');
    // Verify that display Availability header correctly
    await expect(headers.nth(3)).toContainText('Availability');
    // Verify that display Last Activity header correctly
    await expect(headers.nth(4)).toContainText('Last activity');
    // Verify that display hidden header correctly
    await expect(headers.nth(5)).toHaveAttribute('aria-hidden', 'true');

    // Verify that Table header has the expected classes
    const classHeader = await headerRow.getAttribute('class');
    expect(classHeader).toContain('border-b');
    expect(classHeader).toContain('transition-colors');
    expect(classHeader).toContain('hover:bg-muted/50');
    expect(classHeader).toContain('data-[state=selected]:bg-muted');

    // Verify table body exists
    const tableBody = table.locator('[data-slot="table-body"]');
    await expect(tableBody).toBeVisible();

    // Verify that display all table data correctly
    const dataRows = tableBody.locator('tr[data-slot="table-row"]');

    // Verify first row data
    const firstRow = dataRows.first();
    // Verify that display product with icon
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(0).locator('svg')).toBeVisible();
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(0)).toContainText('Blok');
    // Verify that display current users
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(1)).toContainText('48k+');
    // Verify that display capabilities
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(2)).toContainText('Design tokens · React · Storybook');
    // Verify that display availability
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(3).locator('[data-slot="badge"]')).toContainText('GA');
    // Verify that display last activity
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(4).locator('[data-slot="avatar-fallback"]')).toContainText('BK');
    await expect(firstRow.locator('[data-slot="table-cell"]').nth(4)).toContainText('Mar 12, 2025 2:15 PM');
    // Verify that display Edit and More actions button
    const entitlementFirst = firstRow.locator('[data-slot="table-cell"]').nth(5);
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(0)).toHaveAttribute('aria-label', 'Edit');
    await expect(entitlementFirst.locator('button[data-slot="button"]').nth(1)).toHaveAttribute('aria-label', 'More actions');
}