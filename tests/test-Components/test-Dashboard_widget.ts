import { test, expect, Page } from '@playwright/test';

export async function testDashboardWidget(page: Page){
    // Verify that Dashboard Widget section is visible
    const dashboardWidgetSection = page.locator('[id="dashboard-widget"]');
    await expect(dashboardWidgetSection).toBeVisible();

    // Verify that display dashboard widget
    const dashboardWidget = dashboardWidgetSection.locator('[data-slot="dashboard-widget"]');
    await expect(dashboardWidget).toBeVisible();

    // Verify that display dashboard widget header
    const dashboardWidgetHeader = dashboardWidget.locator('[data-slot="dashboard-widget-header"]');
    await expect(dashboardWidgetHeader).toBeVisible();
    // Verify that display dashboard widget title
    const dashboardWidgetTitle = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-title"]');
    await expect(dashboardWidgetTitle).toBeVisible();
    await expect(dashboardWidgetTitle).toHaveText('Projects');
    // Verify that display dashboard widget description
    const dashboardWidgetDescription = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-description"]');
    await expect(dashboardWidgetDescription).toBeVisible();
    await expect(dashboardWidgetDescription).toHaveText('Overview of your recent projects and their status');
    // Verify that display dashboard widget action
    const dashboardWidgetAction = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-action"]');
    await expect(dashboardWidgetAction).toBeVisible();
    await expect(dashboardWidgetAction).toHaveText('Go to Projects');

    // Verify that display dashboard widget content
    const dashboardWidgetContent = dashboardWidget.locator('[data-slot="dashboard-widget-content"]');
    await expect(dashboardWidgetContent).toBeVisible();
    // Verify that display dashboard widget content description
    await expect(dashboardWidgetContent).toHaveText('Widget content area');
}

export async function testDashboardWhiteWidget(page: Page){
    // Verify that Dashboard White Widget section is visible
    const dashboardWhiteWidgetSection = page.locator('[id="dashboard-white-widget"]');
    await expect(dashboardWhiteWidgetSection).toBeVisible();

    // Verify that display dashboard widget
    const dashboardWidget = dashboardWhiteWidgetSection.locator('[data-slot="dashboard-widget"]');
    await expect(dashboardWidget).toBeVisible();
    // Verify that dashboard widget has the expected classes
    const dashboardWidgetClass = await dashboardWidget.getAttribute('class');
    expect(dashboardWidgetClass).toContain('border');
    expect(dashboardWidgetClass).toContain('transition-shadow');
    expect(dashboardWidgetClass).toContain('shadow-none');
    expect(dashboardWidgetClass).toContain('bg-body-bg');
    expect(dashboardWidgetClass).toContain('border-transparent');
    expect(dashboardWidgetClass).toContain('rounded-md');
    expect(dashboardWidgetClass).toContain('overflow-hidden');

    // Verify that display dashboard widget header
    const dashboardWidgetHeader = dashboardWidget.locator('[data-slot="dashboard-widget-header"]');
    await expect(dashboardWidgetHeader).toBeVisible();
    // Verify that display dashboard widget title
    const dashboardWidgetTitle = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-title"]');
    await expect(dashboardWidgetTitle).toBeVisible();
    await expect(dashboardWidgetTitle).toHaveText('Projects');
    // Verify that display dashboard widget description
    const dashboardWidgetDescription = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-description"]');
    await expect(dashboardWidgetDescription).toBeVisible();
    await expect(dashboardWidgetDescription).toHaveText('Overview of your recent projects and their status');
    // Verify that display dashboard widget action
    const dashboardWidgetAction = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-action"]');
    await expect(dashboardWidgetAction).toBeVisible();
    await expect(dashboardWidgetAction).toHaveText('Go to Projects');

    // Verify that display dashboard widget toolbar
    const dashboardWidgetToolbar = dashboardWidget.locator('[data-slot="dashboard-widget-toolbar"]');
    await expect(dashboardWidgetToolbar).toBeVisible();
    const toolbarButton = dashboardWidgetToolbar.locator('[data-slot="select-trigger"]');
    await expect(toolbarButton).toBeVisible();
    const toolbarButtonText = toolbarButton.locator('[data-slot="select-value"]');
    await expect(toolbarButtonText).toHaveText('Filter');
    // Verify that display toolbar dropdown content
    await toolbarButton.click();
    const defaultSelectContent = page.locator('[role="dialog"], [data-radix-popper-content-wrapper]').nth(0);
    await expect(defaultSelectContent).toBeVisible();
    // Verify that display toolbar dropdown content options
    await expect(defaultSelectContent.getByRole('option', { name: 'All projects' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'Active' })).toBeVisible();
    await expect(defaultSelectContent.getByRole('option', { name: 'Archived' })).toBeVisible();
    // Verify that select an option from toolbar dropdown content
    await defaultSelectContent.getByRole('option', { name: 'All projects' }).click();
    // Verify that close toolbar dropdown content
    await expect(defaultSelectContent).not.toBeVisible();
    // Verify that toolbar button text is updated
    await expect(toolbarButtonText).toHaveText('All projects');

    // Verify that display dashboard widget content
    const dashboardWidgetContent = dashboardWidget.locator('[data-slot="dashboard-widget-content"]');
    await expect(dashboardWidgetContent).toBeVisible();
    // Verify that display dashboard widget content description
    await expect(dashboardWidgetContent).toHaveText('Widget content area');
}

export async function testDashboardGrayWidget(page: Page){
    // Verify that Dashboard Gray Widget section is visible
    const dashboardGrayWidgetSection = page.locator('[id="dashboard-gray-widget"]');
    await expect(dashboardGrayWidgetSection).toBeVisible();

    // Verify that display dashboard widget
    const dashboardWidget = dashboardGrayWidgetSection.locator('[data-slot="dashboard-widget"]');
    await expect(dashboardWidget).toBeVisible();
    // Verify that dashboard widget has the expected classes
    const dashboardWidgetClass = await dashboardWidget.getAttribute('class');
    expect(dashboardWidgetClass).toContain('border');
    expect(dashboardWidgetClass).toContain('transition-shadow');
    expect(dashboardWidgetClass).toContain('shadow-none');
    expect(dashboardWidgetClass).toContain('border-transparent');
    expect(dashboardWidgetClass).toContain('rounded-md');
    expect(dashboardWidgetClass).toContain('overflow-hidden');
    expect(dashboardWidgetClass).toContain('bg-neutral-50');

    // Verify that display dashboard widget header
    const dashboardWidgetHeader = dashboardWidget.locator('[data-slot="dashboard-widget-header"]');
    await expect(dashboardWidgetHeader).toBeVisible();
    // Verify that display dashboard widget title
    const dashboardWidgetTitle = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-title"]');
    await expect(dashboardWidgetTitle).toBeVisible();
    await expect(dashboardWidgetTitle).toHaveText('Pinned widget');
    // Verify that display dashboard widget action
    const dashboardWidgetAction = dashboardWidgetHeader.locator('[data-slot="dashboard-widget-action"]');
    await expect(dashboardWidgetAction).toBeVisible();
    await expect(dashboardWidgetAction).toHaveText('Go to Pinned widget');

    // Verify that display dashboard widget content
    const dashboardWidgetContent = dashboardWidget.locator('[data-slot="dashboard-widget-content"]');
    await expect(dashboardWidgetContent).toBeVisible();
    // Verify that display dashboard widget content description
    await expect(dashboardWidgetContent).toHaveText('Widget content area');
}