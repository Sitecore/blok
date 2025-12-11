import { test, expect, Page } from '@playwright/test';

export async function testAspectRatio(page: Page){

  // Find aspect ratio containers - common selectors
  // Adjust selectors based on your actual component structure
  const aspectRatioContainers = page.locator('[class*="aspect"], [style*="aspect-ratio"]');
  const count = await aspectRatioContainers.count();

  // If no specific aspect ratio elements found, try data attributes or other common patterns
  if (count === 0) {
    // Try alternative selectors
    const altContainers = page.locator('[data-aspect-ratio], [data-ratio]');
    const altCount = await altContainers.count();
    
    if (altCount > 0) {
      // Test first aspect ratio container found
      const firstContainer = altContainers.first();
      await expect(firstContainer).toBeVisible();
      
      // Verify aspect-ratio CSS property is applied
      const aspectRatio = await firstContainer.evaluate((el) => {
        const style = getComputedStyle(el as HTMLElement);
        return style.aspectRatio || (el as HTMLElement).style.aspectRatio;
      });
      
      expect(aspectRatio).toBeTruthy();
      expect(aspectRatio).not.toBe('auto');
    }
  } else {
    // Test all aspect ratio containers
    for (let i = 0; i < count; i++) {
      const container = aspectRatioContainers.nth(i);
      await expect(container).toBeVisible();
      
      // Verify aspect-ratio CSS property is applied
      const aspectRatio = await container.evaluate((el) => {
        const style = getComputedStyle(el as HTMLElement);
        return style.aspectRatio || (el as HTMLElement).style.aspectRatio;
      });
      
      expect(aspectRatio).toBeTruthy();
      expect(aspectRatio).not.toBe('auto');
      

    }
  }
}

