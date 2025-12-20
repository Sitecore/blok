import { test, expect, Page } from '@playwright/test';

export async function testSlider(page: Page){
    // Verify that slider is 
    const slider = page.locator('[data-slot="slider"]');
    await expect(slider).toBeVisible();

    // Check if slider track is visible
    const sliderTrack = slider.locator('[data-slot="slider-track"]');
    await expect(sliderTrack).toBeVisible();
    // Check if slider range is not visible initially
    const sliderRange = sliderTrack.locator('[data-slot="slider-range"]');
    await expect(sliderRange).not.toBeVisible();

    // Check if slider thumb is visible
    const sliderThumb = slider.locator('[data-slot="slider-thumb"]').first();
    await expect(sliderThumb).toBeVisible();

    // Get initial position
    const initialBox = await sliderThumb.boundingBox();
    const trackBox = await sliderTrack.boundingBox();
    
    expect(initialBox).not.toBeNull();
    expect(trackBox).not.toBeNull();
    
    if (initialBox && trackBox) {
      // Drag thumb to the middle of the track
      await sliderThumb.dragTo(sliderTrack, {
        targetPosition: { x: trackBox.width / 2, y: trackBox.height / 2 }
      });
      
      // Wait for the drag to complete
      await page.waitForTimeout(100);
      
      // Verify the thumb has moved
      const newBox = await sliderThumb.boundingBox();
      expect(newBox).not.toBeNull();
      if (newBox) {
        expect(newBox.x).not.toBe(initialBox.x);
      }
    }
}