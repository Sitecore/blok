import { test, expect, Page } from '@playwright/test';

export async function testDrawer(page: Page){
    // Verify that display Open Drawer button
    const triggerButton = page.getByRole('button', { name: 'Open Drawer' });
    await expect(triggerButton).toBeVisible();

    // Verify that open drawer when trigger button is clicked
    await triggerButton.click();
    
    // Wait for drawer to be visible
    const drawerContent = page.locator('[data-slot="drawer-content"]');
    await expect(drawerContent).toBeVisible();

    // Verify that display drawer title and description when opened
    const drawerTitle = drawerContent.getByRole('heading', { name: 'Move Goal' });
    await expect(drawerTitle).toBeVisible();
    const drawerDescription = drawerContent.getByText('Set your daily activity goal.');
    await expect(drawerDescription).toBeVisible();
    
    // Verify that display initial goal value and calories label
    const goalValue = drawerContent.locator('[class="text-7xl font-bold tracking-tighter"]');
    await expect(goalValue).toBeVisible();
    const caloriesLabel = drawerContent.getByText('Calories/day', { exact: false });
    await expect(caloriesLabel).toBeVisible();

    // Verify that display decrease and increase buttons (Minus and Plus)
    const decreaseButton = drawerContent.getByRole('button', { name: 'Decrease' });
    await expect(decreaseButton).toBeVisible();
    const increaseButton = drawerContent.getByRole('button', { name: 'Increase' });
    await expect(increaseButton).toBeVisible();

    // Verify that decrease goal value when minus button is clicked
    await decreaseButton.click();
    await page.waitForTimeout(300);
    expect(goalValue).toContainText('340');

    // Verify that increase goal value when plus button is clicked
    await increaseButton.click();
    await increaseButton.click();
    expect(goalValue).toContainText('360');

    // Verify that display bar chart in drawer
    const barChart = drawerContent.locator('[class="recharts-responsive-container"]').locator('svg');
    await expect(barChart).toBeVisible();

    // Verify that display Submit button in drawer footer
    const submitButton = drawerContent.getByRole('button', { name: 'Submit' });
    await expect(submitButton).toBeVisible();

    // Verify that close drawer when Cancel button is clicked
    const cancelButton = drawerContent.getByRole('button', { name: 'Cancel' });
    await cancelButton.click();
    
    // Verify drawer is closed
    await expect(drawerContent).not.toBeVisible();
}