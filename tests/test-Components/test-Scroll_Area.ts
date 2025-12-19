import { test, expect, Page } from '@playwright/test';

export async function testScrollAreaVertical(page: Page){
    // Verify that display Vertical Scroll Area component
    const scrollAreaVertical = page.locator('[id="scroll-area-vertical"]');
    await expect(scrollAreaVertical).toBeVisible();

    //Verify that before scroll: should see top tag
    const viewport = scrollAreaVertical.locator('[data-slot="scroll-area-viewport"]');
    await expect(viewport).toBeVisible();
    await expect(viewport.getByText('v1.2.0-beta.50')).toBeVisible();

    // Scroll down inside the viewport
    await viewport.evaluate((el) => {
        el.scrollTop = el.scrollHeight;
      });
    
    // After scroll: should see a lower tag
    await expect(viewport.getByText('v1.2.0-beta.1', { exact: true })).toBeVisible();  
}

export async function testScrollAreaHorizontal(page: Page){
    // Verify that display Horizontal Scroll Area component
    const scrollAreaHorizontal = page.locator('[id="scroll-area-horizontal"]');
    await expect(scrollAreaHorizontal).toBeVisible();

    //Verify that before scroll: should see Ornella Binni image
    const viewport = scrollAreaHorizontal.locator('[data-slot="scroll-area-viewport"]');
    await expect(viewport).toBeVisible();
    const image1 = viewport.locator('img[alt="Photo by Ornella Binni"]');
    await expect(image1).toBeVisible();


    // Scroll horizontally inside the viewport
    await viewport.evaluate((el) => {
        el.scrollLeft = el.scrollWidth;
      });
  
    //Verify that after scroll: should see Vladimir Malyav image
    const image3 = viewport.locator('img[alt="Photo by Vladimir Malyav"]');
    await expect(image3).toBeVisible();
}