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
    
    
    // Verify that card has content (If there any content in the card, it will be visible)
    const cardContent = defaultCard.locator('[data-slot="card-content"]');
    const cardContentCount = await cardContent.count();
    if (cardContentCount > 0) {
        const hasContent = await cardContent.first().evaluate((el) => {
            return el.textContent?.trim().length > 0 || el.children.length > 0;
        });
        if (hasContent) {
            await expect(cardContent.first()).toBeVisible();
        }
    }
    
    // Verify that card has footer (If there any footer in the card, it will be visible)
    const cardFooter = defaultCard.locator('[data-slot="card-footer"]');
    const cardFooterCount = await cardFooter.count();
    if (cardFooterCount > 0) {
        const hasFooterContent = await cardFooter.first().evaluate((el) => {
            return el.textContent?.trim().length > 0 || el.children.length > 0;
        });
        if (hasFooterContent) {
            await expect(cardFooter.first()).toBeVisible();
        }
    }
    
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

export async function testStyledCard(page: Page){
    // Verify that Styled Card is visible
    const styledCard = page.locator('[data-slot="card"]').filter({ 
        has: page.locator('[data-slot="card-title"]', { hasText: 'Briefs tracker' })}).first();

    // Verify that header details are visible
    await expect(styledCard).toBeVisible();
    await expect(styledCard.locator('span').filter({ hasText: 'View all briefs' })).toBeVisible();
    await expect(styledCard.locator('button[data-slot="button"]')).toHaveAttribute('aria-label', 'More options');

    // Verify that content details are visible
    const contentDetails = styledCard.locator('[data-slot="card-content"]');
    await expect(contentDetails.locator('h3').filter({ hasText: 'New' })).toBeVisible();
    await expect(contentDetails.locator('h3').filter({ hasText: 'In progress' })).toBeVisible();
    await expect(contentDetails.locator('h3').filter({ hasText: 'Approved' })).toBeVisible();
}