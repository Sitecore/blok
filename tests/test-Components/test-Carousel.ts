import { test, expect, Page } from '@playwright/test';

export async function testNumberCardsCarousel(page: Page){
    // Verify that default carousel is visible
    const defaultCarousel = page.locator('[data-slot="carousel"][aria-label="Number cards carousel with 5 slides"]');
    await expect(defaultCarousel).toBeVisible();
    
    // Verify that carousel has content
    const carouselContent = defaultCarousel.locator('[data-slot="carousel-content"]');
    await expect(carouselContent).toBeVisible();
    
    // Verify that carousel has items
    const carouselItems = defaultCarousel.locator('[data-slot="carousel-item"]');
    const itemCount = await carouselItems.count();
    expect(itemCount).toBe(5);
    
    // Verify that carousel navigation buttons are visible
    const previousButton = defaultCarousel.locator('[data-slot="carousel-previous"]');
    await expect(previousButton).toBeVisible();
    await expect(previousButton).toBeDisabled();

    const nextButton = defaultCarousel.locator('[data-slot="carousel-next"]');
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();

    // Verify that carousel navigation buttons are functional  
    await nextButton.click();
    await page.waitForTimeout(300);
    await expect(previousButton).toBeEnabled();

    await previousButton.click();
    await page.waitForTimeout(300);
    await expect(previousButton).toBeDisabled();
}

export async function testResponsiveCardsCarousel(page: Page){
    // Verify that carousel is visible
    const Carousel = page.locator('[data-slot="carousel"][aria-label="Responsive cards carousel with start alignment"]');
    await expect(Carousel).toBeVisible();
    
    // Verify that carousel has content
    const carouselContent = Carousel.locator('[data-slot="carousel-content"]');
    await expect(carouselContent).toBeVisible();
    
    // Verify that carousel has items
    const carouselItems = Carousel.locator('[data-slot="carousel-item"]');
    const itemCount = await carouselItems.count();
    expect(itemCount).toBe(5);

    // Verify that carousel navigation buttons are visible
    const previousButton = Carousel.locator('[data-slot="carousel-previous"]');
    await expect(previousButton).toBeVisible();
    await expect(previousButton).toBeDisabled();

    const nextButton = Carousel.locator('[data-slot="carousel-next"]');
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();

    // Verify that carousel navigation buttons are functional  
    await nextButton.click();
    await page.waitForTimeout(300);
    await expect(previousButton).toBeEnabled();

    await previousButton.click();
    await page.waitForTimeout(300);
    await expect(previousButton).toBeDisabled();
}

export async function testHalfWidthCardsCarousel(page: Page){
    // Verify that carousel is visible
    const Carousel = page.locator('[data-slot="carousel"][aria-label="Half-width cards carousel with negative margin"]');
    await expect(Carousel).toBeVisible();
    
    // Verify that carousel has content
    const carouselContent = Carousel.locator('[data-slot="carousel-content"]');
    await expect(carouselContent).toBeVisible();
    
    // Verify that carousel has items
    const carouselItems = Carousel.locator('[data-slot="carousel-item"]');
    const itemCount = await carouselItems.count();
    expect(itemCount).toBe(5);

    // Verify that carousel navigation buttons are visible
    const previousButton = Carousel.locator('[data-slot="carousel-previous"]');
    await expect(previousButton).toBeVisible();
    await expect(previousButton).toBeDisabled();

    const nextButton = Carousel.locator('[data-slot="carousel-next"]');
    await expect(nextButton).toBeVisible();
    await expect(nextButton).toBeEnabled();

    // Verify that carousel navigation buttons are functional  
    await nextButton.click();
    await page.waitForTimeout(300);
    await expect(previousButton).toBeEnabled();

    await previousButton.click();
    await page.waitForTimeout(300);
    await expect(previousButton).toBeDisabled();
}