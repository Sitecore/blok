import { test, expect, Page } from '@playwright/test';

export async function testDraggable(page: Page){
    // Verify that display draggable component with source and drop zone
    // Wait for the draggable demo to be visible
    await expect(page.locator('text=Basic Drag & Drop')).toBeVisible();
    
    // Verify source area is visible
    await expect(page.locator('text=Source').first()).toBeVisible();
    
    // Verify draggable button is visible
    const draggableButton = page.locator('[data-draggable-id="draggable-button"]');
    await expect(draggableButton).toBeVisible();

    // Verify source and drop zone are visible
    const sourceArea = page.locator('[data-droppable-id="source"]');
    await expect(sourceArea).toBeVisible();
    const dropZone = page.locator('[data-droppable-id="drop-zone"]');
    await expect(dropZone).toBeVisible();
    
    // Get bounding boxes for drag operation
    const sourceBox = await sourceArea.boundingBox();
    const dropZoneBox = await dropZone.boundingBox();
    
    if (sourceBox && dropZoneBox) {
      // Get button's initial position
      const buttonBox = await draggableButton.boundingBox();
      
      if (buttonBox) {
        // Calculate target position (center of drop zone)
        const targetX = dropZoneBox.x + (dropZoneBox.width / 2);
        const targetY = dropZoneBox.y + (dropZoneBox.height / 2);
        
        // Perform manual drag using mouse events for more control
        await draggableButton.hover();
        await page.mouse.down();
        await page.mouse.move(targetX, targetY, { steps: 10 });
        await page.mouse.up();
        
        // Wait a moment for the drop event to process
        await page.waitForTimeout(1500);
        
        // Wait for the drag to complete and status message to appear
        // Check for status message (it should indicate drop-zone if successful)
        await expect(page.locator('text=Draggable item draggable-button was dropped over droppable area')).toBeVisible({ timeout: 10000 });
        
        // Verify button is now inside the drop zone by checking its position
        // Get the button again after drag
        const buttonAfterDrag = page.locator('[data-draggable-id="draggable-button"]');
        await expect(buttonAfterDrag).toBeVisible({ timeout: 5000 });
        
        // Get the bounding boxes after drag
        const buttonBoxAfter = await buttonAfterDrag.boundingBox();
        const dropZoneBoxAfter = await dropZone.boundingBox();
        
        if (buttonBoxAfter && dropZoneBoxAfter) {
          // Calculate if button's center point is within drop zone boundaries
          const buttonCenterX = buttonBoxAfter.x + (buttonBoxAfter.width / 2);
          const buttonCenterY = buttonBoxAfter.y + (buttonBoxAfter.height / 2);
          
          // Verify button center is within drop zone (with some tolerance)
          expect(buttonCenterX).toBeGreaterThanOrEqual(dropZoneBoxAfter.x - 5);
          expect(buttonCenterY).toBeGreaterThanOrEqual(dropZoneBoxAfter.y - 5);
          expect(buttonCenterX).toBeLessThanOrEqual(dropZoneBoxAfter.x + dropZoneBoxAfter.width + 5);
          expect(buttonCenterY).toBeLessThanOrEqual(dropZoneBoxAfter.y + dropZoneBoxAfter.height + 5);
        }
      }
    }
}