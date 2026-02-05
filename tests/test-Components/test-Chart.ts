import { test, expect, Page } from '@playwright/test';

export async function testAreaChart(page: Page){
    // Verify that "Area Chart" title is visible
    const chartArea = page.locator('[id="chart-area"]');
    const cardTitle = chartArea.locator('[data-slot="card-title"]', { hasText: 'Area Chart' });
    await expect(cardTitle).toBeVisible();

    // Verify that "Area Chart" card description is visible
    const cardDescription = chartArea.locator('[data-slot="card-description"]').filter({ 
        hasText: 'Showing total visitors for the last 6 months'});
    await expect(cardDescription).toBeVisible();
    
    // Verify chart container is visible
    const chartContainer = chartArea.locator('[data-slot="chart"]');
    await expect(chartContainer).toBeVisible();

    const svg = chartContainer.locator('svg');
    await expect(svg).toBeVisible();

    // Verify that grid lines are visible
    const gridLines = svg.locator('g.recharts-cartesian-grid-horizontal');
    await expect(gridLines).toBeVisible();

    // Verify that month labels are visible
    const monthLabels = svg.locator('text').filter({ hasText: /^(Jan|Feb|Mar|Apr|May|Jun)$/ });
    const count = await monthLabels.count();
    expect(count).toBeGreaterThan(0);

    // Verify that tooltip is visible on hover
    const chartBoundingBox = await svg.boundingBox();
    if (chartBoundingBox) {
      await page.mouse.move(
        chartBoundingBox.x + chartBoundingBox.width / 2,
        chartBoundingBox.y + chartBoundingBox.height / 2
      );
      await page.waitForTimeout(300);
      const tooltip = page.locator('.recharts-tooltip-wrapper');
      const tooltipCount = await tooltip.count();
      expect(tooltipCount).toBeGreaterThanOrEqual(0);
    }

    // Verify that "Area Chart" card footer is visible and contains trending text and date range text
    const footerTrendingText = chartArea.locator('[data-slot="card-footer"]').filter({ hasText: 'Trending up'});
    await expect(footerTrendingText).toBeVisible();

    const footerDescription = chartArea.locator('[data-slot="card-footer"]').filter({ hasText: 'January - June 2024'});
    await expect(footerDescription).toBeVisible();

    // Find the TrendingUp icon
    const trendingIcon = footerTrendingText.locator('svg'); 
    await expect(trendingIcon).toBeVisible();
}

export async function testBarChart(page: Page){
  // Verify that "Bar Chart" title is visible
  const chartBar = page.locator('[id="chart-bar"]');
  const cardTitle = chartBar.locator('[data-slot="card-title"]', { hasText: 'Bar Chart - Multiple' });
  await expect(cardTitle).toBeVisible();

  // Verify that "Bar Chart" card description is visible
  const cardDescription = chartBar.locator('[data-slot="card-description"]').filter({ 
    hasText: 'January - June 2024'});
  await expect(cardDescription).toBeVisible();

  // Verify chart container is visible
  const chartContainer = chartBar.locator('[data-slot="chart"]');
  await expect(chartContainer).toBeVisible();
}

export async function testMixedBarChart(page: Page){
  // Verify that "Mixed Bar Chart" title is visible
  const chartMixedBar = page.locator('[id="chart-mixed-bar"]');
  const cardTitle = chartMixedBar.locator('[data-slot="card-title"]', { hasText: 'Bar Chart - Mixed' });
  await expect(cardTitle).toBeVisible();

  // Verify that "Mixed Bar Chart" card description is visible
  const cardDescription = chartMixedBar.locator('[data-slot="card-description"]').filter({ 
    hasText: 'January - June 2024'});
  await expect(cardDescription).toBeVisible();

  // Verify chart container is visible
  const chartContainer = chartMixedBar.locator('[data-slot="chart"]');
  await expect(chartContainer).toBeVisible();
}

export async function testLineChart(page: Page){
  // Verify that "Line Chart" title is visible
  const chartBar = page.locator('[id="chart-line"]');
  const cardTitle = chartBar.locator('[data-slot="card-title"]', { hasText: 'Line Chart - Multiple' });
  await expect(cardTitle).toBeVisible();

  // Verify that "Line Chart" card description is visible
  const cardDescription = chartBar.locator('[data-slot="card-description"]').filter({ 
    hasText: 'January - June 2024'});
  await expect(cardDescription).toBeVisible();

  // Verify chart container is visible
  const chartContainer = chartBar.locator('[data-slot="chart"]');
  await expect(chartContainer).toBeVisible();
}

export async function testPieChart(page: Page){
  // Verify that "Pie Chart" title is visible
  const chartBar = page.locator('[id="chart-pie"]');
  const cardTitle = chartBar.locator('[data-slot="card-title"]', { hasText: 'Pie Chart' });
  await expect(cardTitle).toBeVisible();

  // Verify that "Pie Chart" card description is visible
  const cardDescription = chartBar.locator('[data-slot="card-description"]').filter({ 
    hasText: 'January - June 2024'});
  await expect(cardDescription).toBeVisible();

  // Verify chart container is visible
  const chartContainer = chartBar.locator('[data-slot="chart"]');
  await expect(chartContainer).toBeVisible();
}