import { test, expect, Page } from '@playwright/test';

export async function testDefaultCard(page: Page){
    // Verify that default card is visible
    const defaultCard = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'Default Card' })}).first();
      await expect(defaultCard).toBeVisible();

      // Verify that default card has the expected classes
      const classAttribute = await defaultCard.getAttribute('class');
      expect(classAttribute).toBeTruthy();
      expect(classAttribute).toContain('bg-body-bg');
      expect(classAttribute).toContain('rounded-lg');
      expect(classAttribute).toContain('shadow-none');
      expect(classAttribute).toContain('p-8');

    // Verify that card has header
    const cardHeader = defaultCard.locator('[data-slot="card-header"]');
    await expect(cardHeader).toBeVisible();

    // Verify that title is visible
    const cardTitle = page.locator('[data-slot="card-title"]').filter({ hasText: 'Default Card' });
    await expect(cardTitle).toBeVisible();

    // Verify that description is visible
    const cardDescription = page.locator('[data-slot="card-description"]').filter({ hasText: 'Style: flat, Elevation: none' });
    await expect(cardDescription).toBeVisible();
    
    /*
    // Verify that card has content (If there any content in the card, it will be visible)
    const cardContent = defaultCard.locator('[data-slot="card-content"]');
    await expect(cardContent).toBeVisible();
    
    // Verify that card has footer (If there any footer in the card, it will be visible)
    const cardFooter = defaultCard.locator('[data-slot="card-footer"]');
    await expect(cardFooter).toBeVisible();
    */
}

export async function testCardElevation(page: Page){
    // Verify that none elevation card is visible
    const noneElevation = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'none Elevation' })}).first();

        const classAttributeNone = await noneElevation.getAttribute('class');
        expect(classAttributeNone).toBeTruthy();
        expect(classAttributeNone).toContain('shadow-none');
    
    // Verify that xs Elevation card is visible
    const xslevation = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'xs Elevation' })}).first();

        const classAttributeXS = await xslevation.getAttribute('class');
        expect(classAttributeXS).toBeTruthy();
        expect(classAttributeXS).toContain('shadow-xs');

}

export async function testCardStyle(page: Page){
    // Verify that flat style card is visible
    const flatStyle = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'flat Style' })}).first();

        const classAttributeFlat = await flatStyle.getAttribute('class');
        expect(classAttributeFlat).toBeTruthy();
        expect(classAttributeFlat).toContain('bg-body-bg');
        expect(classAttributeFlat).toContain('border-transparent');
    
    // Verify that outline style card is visible
    const outlineStyle = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'outline Style' })}).first();

        const classAttributeOutline = await outlineStyle.getAttribute('class');
        expect(classAttributeOutline).toBeTruthy();
        expect(classAttributeOutline).toContain('bg-body-bg');
        expect(classAttributeOutline).toContain('border-border-color');
    
    // Verify that filled style card is visible
    const filledStyle = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'filled Style' })}).first();

        const classAttributeFilled = await filledStyle.getAttribute('class');
        expect(classAttributeFilled).toBeTruthy();
        expect(classAttributeFilled).toContain('bg-subtle-bg');
        expect(classAttributeFilled).toContain('border-transparent');

}

export async function testCardPadding(page: Page){
    // Verify that sm padding card is visible
    const smPadding = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'Padding: sm' })}).first();

        const classAttributeSM = await smPadding.getAttribute('class');
        expect(classAttributeSM).toBeTruthy();
        expect(classAttributeSM).toContain('px-3 py-3');
        expect(classAttributeSM).toContain('rounded-base');
    
    // Verify that md padding card is visible
    const mdPadding = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'Padding: md' })}).first();

        const classAttributeMD = await mdPadding.getAttribute('class');
        expect(classAttributeMD).toBeTruthy();
        expect(classAttributeMD).toContain('px-5 py-5');
        expect(classAttributeMD).toContain('rounded-md');
    
    // Verify that lg padding card is visible
    const lgPadding = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'Padding: lg' })}).first();

        const classAttributeLG = await lgPadding.getAttribute('class');
        expect(classAttributeLG).toBeTruthy();
        expect(classAttributeLG).toContain('px-7 py-7');
        expect(classAttributeLG).toContain('rounded-lg');

}