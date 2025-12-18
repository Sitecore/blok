import { test, expect, Page } from '@playwright/test';

export async function testResizableHorizontal(page: Page){
    // Verify that display Horizontal Resizable component
    const resizableHorizontal = page.locator('[id="resizable-panel-group-horizontal"]');
    await expect(resizableHorizontal).toBeVisible();

    // Verify that display left panel
    const panels = resizableHorizontal.locator('[data-slot="resizable-panel"]');
    const leftPanel = panels.nth(0);
    await expect(leftPanel).toBeVisible();

    // Verify that display handle
    const handle = resizableHorizontal.locator('[data-slot="resizable-handle"]').first();
    await expect(handle).toBeVisible();

    // Verify that resize left panel width when dragging handle
    const before = await leftPanel.boundingBox();
    expect(before, "left panel should have a bounding box").not.toBeNull();

    const handleBox = await handle.boundingBox();
    expect(handleBox, "resize handle should have a bounding box").not.toBeNull();

    const startX = handleBox!.x + handleBox!.width / 2;
    const startY = handleBox!.y + handleBox!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 80, startY, { steps: 12 });
    await page.mouse.up();

    await expect.poll(async () => {
      const after = await leftPanel.boundingBox();
      return after?.width ?? 0;
    }).not.toBe(before!.width);
}


export async function testResizableVertical(page: Page){
    // Verify that display Vertical Resizable component
    const resizableVertical = page.locator('[id="resizable-panel-group-vertical"]');
    await expect(resizableVertical).toBeVisible();

    // Verify that display top panel
    const panels = resizableVertical.locator('[data-slot="resizable-panel"]');
    const topPanel = panels.nth(0);
    await expect(topPanel).toBeVisible();

    // Verify that display handle
    const handle = resizableVertical.locator('[data-slot="resizable-handle"]').first();
    await expect(handle).toBeVisible();

    // Verify that resize top panel height when dragging handle
    const before = await topPanel.boundingBox();
    expect(before, "top panel should have a bounding box").not.toBeNull();

    const handleBox = await handle.boundingBox();
    expect(handleBox, "resize handle should have a bounding box").not.toBeNull();

    const startX = handleBox!.x + handleBox!.width / 2;
    const startY = handleBox!.y + handleBox!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX, startY + 60, { steps: 12 });
    await page.mouse.up();

    await expect.poll(async () => {
      const after = await topPanel.boundingBox();
      return after?.height ?? 0;
    }).not.toBe(before!.height);
}


export async function testResizableWithHandle(page: Page){
    // Verify that display Horizontal Resizable component with handle
    const resizableWithHandleHorizontal = page.locator('[id="resizable-panel-group-handle"]');
    await expect(resizableWithHandleHorizontal).toBeVisible();

    // Verify that display sidebar panel
    const panels = resizableWithHandleHorizontal.locator('[data-slot="resizable-panel"]');
    const sidebarPanel = panels.nth(0);
    await expect(sidebarPanel).toBeVisible();

    // Verify that display handle
    const handle = resizableWithHandleHorizontal.locator('[data-slot="resizable-handle"]').first();
    await expect(handle).toBeVisible();

    // Verify that hitting the "withHandle" variant (it renders an inner div inside the handle)
    await expect(handle.locator("div")).toBeVisible();

    // Verify that resize sidebar panel width when dragging handle
    const before = await sidebarPanel.boundingBox();
    expect(before, "sidebar panel should have a bounding box").not.toBeNull();

    const handleBox = await handle.boundingBox();
    expect(handleBox, "resize handle should have a bounding box").not.toBeNull();

    const startX = handleBox!.x + handleBox!.width / 2;
    const startY = handleBox!.y + handleBox!.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 80, startY, { steps: 12 });
    await page.mouse.up();

    await expect.poll(async () => {
      const after = await sidebarPanel.boundingBox();
      return after?.width ?? 0;
    }).not.toBe(before!.width);
}
