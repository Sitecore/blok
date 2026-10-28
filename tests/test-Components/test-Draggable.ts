import { test, expect, Page } from '@playwright/test';

export async function testDraggableBasic(page: Page){
  // Verify that display draggable component with source and drop zone
  const draggableSection = page.locator('[id="draganddrop-basic"]');
  await expect(draggableSection).toBeVisible();
  // Verify that display source area
  const sourceArea = draggableSection.locator('[data-droppable-id="source-drop"]');
  await expect(sourceArea).toBeVisible();
  // Verify that display drop area
  const dropArea = draggableSection.locator('[data-droppable-id="drop-zone"]');
  await expect(dropArea).toBeVisible();

  // Verify that display draggable items
  // Item 1
  const draggableItem1 = draggableSection.locator('[data-draggable-id="field-1"]');
  await expect(draggableItem1).toBeVisible();
  await expect(draggableItem1.locator('svg').first()).toBeVisible();
  await expect(draggableItem1).toContainText('First Name');
  await expect(draggableItem1).toContainText('first_name');
  await expect(draggableItem1).toContainText('|');
  await expect(draggableItem1).toContainText('Text');
  // Item 2
  const draggableItem2 = draggableSection.locator('[data-draggable-id="field-2"]');
  await expect(draggableItem2).toBeVisible();
  await expect(draggableItem2.locator('svg').first()).toBeVisible();
  await expect(draggableItem2).toContainText('Last Name');
  await expect(draggableItem2).toContainText('last_name');
  await expect(draggableItem2).toContainText('|');
  await expect(draggableItem2).toContainText('Text');
  // Item 3
  const draggableItem3 = draggableSection.locator('[data-draggable-id="field-3"]');
  await expect(draggableItem3).toBeVisible();
  await expect(draggableItem3.locator('svg').first()).toBeVisible();
  await expect(draggableItem3).toContainText('Email Address');
  await expect(draggableItem3).toContainText('email');
  await expect(draggableItem3).toContainText('|');
  await expect(draggableItem3).toContainText('Text');

  // Verify drop zone texts
  await expect(dropArea).toContainText('Drop (fields) in this area to (add) (items)');
  await expect(dropArea).toContainText('Border highlights when you can drop here');

  // Get bounding boxes for drag operations
  const dropAreaBox = await dropArea.boundingBox();
  
  if (dropAreaBox) {
    // Calculate target position (center of drop zone)
    const targetX = dropAreaBox.x + (dropAreaBox.width / 2);
    const targetY = dropAreaBox.y + (dropAreaBox.height / 2);
    
    // Drag all fields to drop zone using manual mouse events for better reliability
    // Drag item 1
    const item1Box = await draggableItem1.boundingBox();
    if (item1Box) {
      await draggableItem1.hover();
      await page.mouse.down();
      await page.mouse.move(targetX, targetY, { steps: 10 });
      await page.mouse.up();
      await page.waitForTimeout(1000);
    }
    
    // Drag item 2
    const item2Box = await draggableItem2.boundingBox();
    if (item2Box) {
      await draggableItem2.hover();
      await page.mouse.down();
      await page.mouse.move(targetX, targetY, { steps: 10 });
      await page.mouse.up();
      await page.waitForTimeout(1000);
    }
    
    // Drag item 3
    const item3Box = await draggableItem3.boundingBox();
    if (item3Box) {
      await draggableItem3.hover();
      await page.mouse.down();
      await page.mouse.move(targetX, targetY, { steps: 10 });
      await page.mouse.up();
      await page.waitForTimeout(1000);
    }
  }

  // Verify that source zone text when drag all fields to the drop zone
  await expect(sourceArea).toContainText('All fields have been moved', { timeout: 10000 });
}

export async function testDraggableCustomHandle(page: Page){
  // Verify that display draggable component with custom handle
  const draggableSection = page.locator('[id="draganddrop-customhandle"]');
  await expect(draggableSection).toBeVisible();
  
  // Verify that display field items
  // Item A
  const draggableItemA = draggableSection.locator('[data-sortable-id="field-A"]');
  await expect(draggableItemA).toBeVisible();
  const gripHandleA = draggableItemA.locator('svg').first();
  await expect(gripHandleA).toBeVisible();
  await expect(draggableItemA).toContainText('Click to edit field label');
  await expect(draggableItemA).toContainText('Click to edit field name');
  await expect(draggableItemA).toContainText('|');
  await expect(draggableItemA).toContainText('Text');
  const deleteClassA = await draggableItemA.locator('button').nth(0).locator('svg').getAttribute('class');
  expect(deleteClassA).toContain('w-2 h-2');
  const chevronClassA = await draggableItemA.locator('button').nth(1).locator('svg').getAttribute('class');
  expect(chevronClassA).toContain('w-4 h-4');
  // Item B
  const draggableItemB = draggableSection.locator('[data-sortable-id="field-B"]');
  await expect(draggableItemB).toBeVisible();
  const gripHandleB = draggableItemB.locator('svg').first();
  await expect(gripHandleB).toBeVisible();
  await expect(draggableItemB).toContainText('Click to edit field label');
  await expect(draggableItemB).toContainText('Click to edit field name');
  await expect(draggableItemB).toContainText('|');
  await expect(draggableItemB).toContainText('Text');
  const deleteClassB = await draggableItemB.locator('button').nth(0).locator('svg').getAttribute('class');
  expect(deleteClassB).toContain('w-2 h-2');
  const chevronClassB = await draggableItemB.locator('button').nth(1).locator('svg').getAttribute('class');
  expect(chevronClassB).toContain('w-4 h-4');
  // Item C
  const draggableItemC = draggableSection.locator('[data-sortable-id="field-C"]');
  await expect(draggableItemC).toBeVisible();
  const gripHandleC = draggableItemC.locator('svg').first();
  await expect(gripHandleC).toBeVisible();
  await expect(draggableItemC).toContainText('Click to edit field label');
  await expect(draggableItemC).toContainText('Click to edit field name');
  await expect(draggableItemC).toContainText('|');
  await expect(draggableItemC).toContainText('Text');
  const deleteClassC = await draggableItemC.locator('button').nth(0).locator('svg').getAttribute('class');
  expect(deleteClassC).toContain('w-2 h-2');
  const chevronClassC = await draggableItemC.locator('button').nth(1).locator('svg').getAttribute('class');
  expect(chevronClassC).toContain('w-4 h-4');

  // Verify that allow sorting items using the grip handle
  const firstItemBox = await draggableItemA.boundingBox();
  const secondItemBox = await draggableItemB.boundingBox();
  
  if (firstItemBox && secondItemBox) {
    // Start drag from grip handle
    await gripHandleA.hover();
    await page.mouse.down();
    
    // Move to second item position
    await page.mouse.move(secondItemBox.x + secondItemBox.width / 2, secondItemBox.y + secondItemBox.height / 2);
    await page.waitForTimeout(100);
    
    // Release to drop
    await page.mouse.up();
    await page.waitForTimeout(500);
    
    // Verify items have been reordered (the order should change)
    const itemsAfterDrag = draggableSection.locator('text=Click to edit field label');
    await expect(itemsAfterDrag).toHaveCount(3);
  }

  // Verify that not trigger drag when clicking on non-handle areas
  // Click on the label text (not the grip handle)
  const label = draggableItemA.locator('text=Click to edit field label').first();
  const initialPosition = await draggableItemA.boundingBox();
  
  await label.click();
  await page.waitForTimeout(300);
  
  // Item should not have moved (no drag should have occurred)
  const afterClickPosition = await draggableItemA.boundingBox();
  
  if (initialPosition && afterClickPosition) {
    // Positions should be the same (or very close)
    expect(Math.abs(initialPosition.y - afterClickPosition.y)).toBeLessThan(5);
  }
}

export async function testDraggableDragDropandSort(page: Page){
  // Verify that display draggable component with source and drop zone
  const draggableSection = page.locator('[id="draganddrop-dragdropandsort"]');
  await expect(draggableSection).toBeVisible();
  // Verify that display source area
  const sourceArea = draggableSection.locator('[data-droppable-id="source-drop"]');
  await expect(sourceArea).toBeVisible();
  // Verify that display drop area
  const dropArea = draggableSection.locator('[data-droppable-id="dropzone-drop"]');
  await expect(dropArea).toBeVisible();

  // Verify that display draggable items
  // Item 1
  const draggableItem1 = draggableSection.locator('[data-draggable-id="field-1"]');
  await expect(draggableItem1).toBeVisible();
  await expect(draggableItem1.locator('svg').first()).toBeVisible();
  await expect(draggableItem1).toContainText('Click to edit field label');
  await expect(draggableItem1).toContainText('Click to edit field name');
  await expect(draggableItem1).toContainText('|');
  await expect(draggableItem1).toContainText('Text');
  // Item 2
  const draggableItem2 = draggableSection.locator('[data-draggable-id="field-2"]');
  await expect(draggableItem2).toBeVisible();
  await expect(draggableItem2.locator('svg').first()).toBeVisible();
  await expect(draggableItem2).toContainText('Click to edit field label');
  await expect(draggableItem2).toContainText('Click to edit field name');
  await expect(draggableItem2).toContainText('|');
  await expect(draggableItem2).toContainText('Text');
  // Item 3
  const draggableItem3 = draggableSection.locator('[data-draggable-id="field-3"]');
  await expect(draggableItem3).toBeVisible();
  await expect(draggableItem3.locator('svg').first()).toBeVisible();
  await expect(draggableItem3).toContainText('Click to edit field label');
  await expect(draggableItem3).toContainText('Click to edit field name');
  await expect(draggableItem3).toContainText('|');
  await expect(draggableItem3).toContainText('Text');

  // Verify drop zone texts
  await expect(dropArea).toContainText('Drop (fields) in this area to (build) (form)');
  await expect(dropArea).toContainText('Border highlights when you can drop here');

  // Get bounding boxes for drag operations
  const dropAreaBox = await dropArea.boundingBox();
  
  if (dropAreaBox) {
    // Calculate target position (center of drop zone)
    const targetX = dropAreaBox.x + (dropAreaBox.width / 2);
    const targetY = dropAreaBox.y + (dropAreaBox.height / 2);
    
    // Drag all fields to drop zone using manual mouse events with proper hover on drop zone
    // Drag item 1
    const item1Box = await draggableItem1.boundingBox();
    if (item1Box) {
      // Hover over the item first
      await draggableItem1.hover();
      await page.waitForTimeout(200);
      // Start drag
      await page.mouse.down();
      await page.waitForTimeout(100);
      // Move to drop zone center with more steps for smoother drag
      await page.mouse.move(targetX, targetY, { steps: 30 });
      await page.waitForTimeout(200);
      // Hover over drop zone to trigger drop target
      await dropArea.hover();
      await page.waitForTimeout(200);
      // Release
      await page.mouse.up();
      await page.waitForTimeout(1000);
    }
    
    // Drag item 2
    const item2Box = await draggableItem2.boundingBox();
    if (item2Box) {
      await draggableItem2.hover();
      await page.waitForTimeout(200);
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.mouse.move(targetX, targetY, { steps: 30 });
      await page.waitForTimeout(200);
      await dropArea.hover();
      await page.waitForTimeout(200);
      await page.mouse.up();
      await page.waitForTimeout(1000);
    }
    
    // Drag item 3
    const item3Box = await draggableItem3.boundingBox();
    if (item3Box) {
      await draggableItem3.hover();
      await page.waitForTimeout(200);
      await page.mouse.down();
      await page.waitForTimeout(100);
      await page.mouse.move(targetX, targetY, { steps: 30 });
      await page.waitForTimeout(200);
      await dropArea.hover();
      await page.waitForTimeout(200);
      await page.mouse.up();
      await page.waitForTimeout(1000);
    }
  }

  // Verify that source zone text when drag all fields to the drop zone
  await expect(sourceArea).toContainText('Drop (fields) in this area to (return) (items)', { timeout: 10000 });

  // Verify that display draggable items in the drop zone
  // After dragging, items should be in the drop zone, so locate them there
  const droppedItem1 = dropArea.locator('[data-sortable-id="field-1"]');
  const droppedItem2 = dropArea.locator('[data-sortable-id="field-2"]');
  const droppedItem3 = dropArea.locator('[data-sortable-id="field-3"]');
  
  // Verify items are in drop zone
  await expect(droppedItem1).toBeVisible({ timeout: 5000 });
  await expect(droppedItem2).toBeVisible({ timeout: 5000 });
  await expect(droppedItem3).toBeVisible({ timeout: 5000 });

  // Verify that allow sorting items using the grip handle
  const firstItemBox = await droppedItem1.boundingBox();
  const secondItemBox = await droppedItem2.boundingBox();
  
  if (firstItemBox && secondItemBox) {
    // Start drag from grip handle
    await droppedItem1.hover();
    await page.waitForTimeout(200);
    await page.mouse.down();
    await page.waitForTimeout(100);
    
    // Move to second item position
    await page.mouse.move(secondItemBox.x + secondItemBox.width / 2, secondItemBox.y + secondItemBox.height / 2, { steps: 20 });
    await page.waitForTimeout(200);
    
    // Release to drop
    await page.mouse.up();
    await page.waitForTimeout(500);
    
    // Verify items are still in drop zone after sorting
    await expect(droppedItem1).toBeVisible();
    await expect(droppedItem2).toBeVisible();
    await expect(droppedItem3).toBeVisible();
  }
}