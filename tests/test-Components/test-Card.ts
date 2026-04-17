import { test, expect, Page } from '@playwright/test';

export async function testDefaultCard(page: Page){
    // Verify that default card is visible
    const defaultCard = page.locator('[id="card-default"]').locator('[data-slot="card"]');
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
    // Verify that card elevation section is visible
    const cardElevationSection = page.locator('[id="card-elevation"]');
    await expect(cardElevationSection).toBeVisible();

    // Verify that none elevation card is visible
    const noneElevation = cardElevationSection.locator('[data-slot="card"]').nth(0);
    await expect(noneElevation).toBeVisible();
    // Verify that none elevation card has card header
    const cardHeaderNoneElevation = noneElevation.locator('[data-slot="card-header"]');
    await expect(cardHeaderNoneElevation).toBeVisible();
    // Verify that none elevation card has card title
    const cardTitleNoneElevation = noneElevation.locator('[data-slot="card-title"]');
    await expect(cardTitleNoneElevation).toContainText('none Elevation');
    // Verify that none elevation card has card description
    const cardDescriptionNoneElevation = noneElevation.locator('[data-slot="card-description"]');
    await expect(cardDescriptionNoneElevation).toContainText('Style: outline, Elevation: none');
    // Verify that none elevation card has card content
    const cardContentNoneElevation = noneElevation.locator('[data-slot="card-content"]');
    await expect(cardContentNoneElevation).toBeDefined();
    // Verify that none elevation card has card footer
    const cardFooterNoneElevation = noneElevation.locator('[data-slot="card-footer"]');
    await expect(cardFooterNoneElevation).toBeDefined();
    
    // Verify that xs Elevation card is visible
    const xslevation = cardElevationSection.locator('[data-slot="card"]').nth(1);
    await expect(xslevation).toBeVisible();
    // Verify that xs elevation card has card header
    const cardHeaderXsElevation = xslevation.locator('[data-slot="card-header"]');
    await expect(cardHeaderXsElevation).toBeVisible();
    // Verify that xs elevation card has card title
    const cardTitleXsElevation = xslevation.locator('[data-slot="card-title"]');
    await expect(cardTitleXsElevation).toContainText('xs Elevation');
    // Verify that xs elevation card has card description
    const cardDescriptionXsElevation = xslevation.locator('[data-slot="card-description"]');
    await expect(cardDescriptionXsElevation).toContainText('Style: outline, Elevation: xs');
    // Verify that xs elevation card has card content
    const cardContentXsElevation = xslevation.locator('[data-slot="card-content"]');
    await expect(cardContentXsElevation).toBeDefined();
    // Verify that xs elevation card has card footer
    const cardFooterXsElevation = xslevation.locator('[data-slot="card-footer"]');
    await expect(cardFooterXsElevation).toBeDefined();

    // Verify that sm elevation card is visible
    const smElevation = cardElevationSection.locator('[data-slot="card"]').nth(2);
    await expect(smElevation).toBeVisible();
    // Verify that sm elevation card has card header
    const cardHeaderSmElevation = smElevation.locator('[data-slot="card-header"]');
    await expect(cardHeaderSmElevation).toBeVisible();
    // Verify that sm elevation card has card title
    const cardTitleSmElevation = smElevation.locator('[data-slot="card-title"]');
    await expect(cardTitleSmElevation).toContainText('sm Elevation');
    // Verify that sm elevation card has card description
    const cardDescriptionSmElevation = smElevation.locator('[data-slot="card-description"]');
    await expect(cardDescriptionSmElevation).toContainText('Style: outline, Elevation: sm');
    // Verify that sm elevation card has card content
    const cardContentSmElevation = smElevation.locator('[data-slot="card-content"]');
    await expect(cardContentSmElevation).toBeDefined();
    // Verify that sm elevation card has card footer
    const cardFooterSmElevation = smElevation.locator('[data-slot="card-footer"]');
    await expect(cardFooterSmElevation).toBeDefined();

    // Verify that base elevation card is visible
    const baseElevation = cardElevationSection.locator('[data-slot="card"]').nth(3);
    await expect(baseElevation).toBeVisible();
    // Verify that base elevation card has card header
    const cardHeaderBaseElevation = baseElevation.locator('[data-slot="card-header"]');
    await expect(cardHeaderBaseElevation).toBeVisible();
    // Verify that base elevation card has card title
    const cardTitleBaseElevation = baseElevation.locator('[data-slot="card-title"]');
    await expect(cardTitleBaseElevation).toContainText('base Elevation');
    // Verify that base elevation card has card description
    const cardDescriptionBaseElevation = baseElevation.locator('[data-slot="card-description"]');
    await expect(cardDescriptionBaseElevation).toContainText('Style: outline, Elevation: base');
    // Verify that base elevation card has card content
    const cardContentBaseElevation = baseElevation.locator('[data-slot="card-content"]');
    await expect(cardContentBaseElevation).toBeDefined();
    // Verify that base elevation card has card footer
    const cardFooterBaseElevation = baseElevation.locator('[data-slot="card-footer"]');
    await expect(cardFooterBaseElevation).toBeDefined();

    // Verify that md elevation card is visible
    const mdElevation = cardElevationSection.locator('[data-slot="card"]').nth(4);
    await expect(mdElevation).toBeVisible();
    // Verify that md elevation card has card header
    const cardHeaderMdElevation = mdElevation.locator('[data-slot="card-header"]');
    await expect(cardHeaderMdElevation).toBeVisible();
    // Verify that md elevation card has card title
    const cardTitleMdElevation = mdElevation.locator('[data-slot="card-title"]');
    await expect(cardTitleMdElevation).toContainText('md Elevation');
    // Verify that md elevation card has card description
    const cardDescriptionMdElevation = mdElevation.locator('[data-slot="card-description"]');
    await expect(cardDescriptionMdElevation).toContainText('Style: outline, Elevation: md');
    // Verify that md elevation card has card content
    const cardContentMdElevation = mdElevation.locator('[data-slot="card-content"]');
    await expect(cardContentMdElevation).toBeDefined();
    // Verify that md elevation card has card footer
    const cardFooterMdElevation = mdElevation.locator('[data-slot="card-footer"]');
    await expect(cardFooterMdElevation).toBeDefined();

    // Verify that lg elevation card is visible
    const lgElevation = cardElevationSection.locator('[data-slot="card"]').nth(5);
    await expect(lgElevation).toBeVisible();
    // Verify that lg elevation card has card header
    const cardHeaderLgElevation = lgElevation.locator('[data-slot="card-header"]');
    await expect(cardHeaderLgElevation).toBeVisible();
    // Verify that lg elevation card has card title
    const cardTitleLgElevation = lgElevation.locator('[data-slot="card-title"]');
    await expect(cardTitleLgElevation).toContainText('lg Elevation');
    // Verify that lg elevation card has card description
    const cardDescriptionLgElevation = lgElevation.locator('[data-slot="card-description"]');
    await expect(cardDescriptionLgElevation).toContainText('Style: outline, Elevation: lg');
    // Verify that lg elevation card has card content
    const cardContentLgElevation = lgElevation.locator('[data-slot="card-content"]');
    await expect(cardContentLgElevation).toBeDefined();
    // Verify that lg elevation card has card footer
    const cardFooterLgElevation = lgElevation.locator('[data-slot="card-footer"]');
    await expect(cardFooterLgElevation).toBeDefined();
}

export async function testCardStyle(page: Page){
    // Verify that card elevation section is visible
    const cardStyleSection = page.locator('[id="card-style"]');
    await expect(cardStyleSection).toBeVisible();

    // Verify that flat style card is visible
    const flatStyle = cardStyleSection.locator('[data-slot="card"]').nth(0);
    await expect(flatStyle).toBeVisible();
        const classAttributeFlat = await flatStyle.getAttribute('class');
        expect(classAttributeFlat).toBeTruthy();
        expect(classAttributeFlat).toContain('bg-body-bg');
        expect(classAttributeFlat).toContain('border-transparent');
    // Verify that flat style card has card header
    const cardHeaderFlatStyle = flatStyle.locator('[data-slot="card-header"]');
    await expect(cardHeaderFlatStyle).toBeVisible();
    // Verify that flat style card has card title
    const cardTitleFlatStyle = flatStyle.locator('[data-slot="card-title"]');
    await expect(cardTitleFlatStyle).toContainText('flat Style');
    
    // Verify that outline style card is visible
    const outlineStyle = cardStyleSection.locator('[data-slot="card"]').nth(1);
    await expect(outlineStyle).toBeVisible();
        const classAttributeOutline = await outlineStyle.getAttribute('class');
        expect(classAttributeOutline).toBeTruthy();
        expect(classAttributeOutline).toContain('bg-body-bg');
        expect(classAttributeOutline).toContain('border-border-color');
    // Verify that outline style card has card header
    const cardHeaderOutlineStyle = outlineStyle.locator('[data-slot="card-header"]');
    await expect(cardHeaderOutlineStyle).toBeVisible();
    // Verify that outline style card has card title
    const cardTitleOutlineStyle = outlineStyle.locator('[data-slot="card-title"]');
    await expect(cardTitleOutlineStyle).toContainText('outline Style');
    
    // Verify that filled style card is visible
    const filledStyle = cardStyleSection.locator('[data-slot="card"]').nth(2);
    await expect(filledStyle).toBeVisible();
        const classAttributeFilled = await filledStyle.getAttribute('class');
        expect(classAttributeFilled).toBeTruthy();
        expect(classAttributeFilled).toContain('bg-subtle-bg');
        expect(classAttributeFilled).toContain('border-transparent');
    // Verify that filled style card has card header
    const cardHeaderFilledStyle = filledStyle.locator('[data-slot="card-header"]');
    await expect(cardHeaderFilledStyle).toBeVisible();
    // Verify that filled style card has card title
    const cardTitleFilledStyle = filledStyle.locator('[data-slot="card-title"]');
    await expect(cardTitleFilledStyle).toContainText('filled Style');
}

export async function testCardPadding(page: Page){
    // Verify that card padding section is visible
    const cardPaddingSection = page.locator('[id="card-padding"]');
    await expect(cardPaddingSection).toBeVisible();
    
    // Verify that sm padding card is visible
    const smPadding = cardPaddingSection.locator('[data-slot="card"]').nth(0);
    await expect(smPadding).toBeVisible();
        const classAttributeSM = await smPadding.getAttribute('class');
        expect(classAttributeSM).toBeTruthy();
        expect(classAttributeSM).toContain('px-3 py-3');
        expect(classAttributeSM).toContain('rounded-base');
    
    // Verify that md padding card is visible
    const mdPadding = cardPaddingSection.locator('[data-slot="card"]').nth(1);
    await expect(mdPadding).toBeVisible();
        const classAttributeMD = await mdPadding.getAttribute('class');
        expect(classAttributeMD).toBeTruthy();
        expect(classAttributeMD).toContain('px-5 py-5');
        expect(classAttributeMD).toContain('rounded-md');
    
    // Verify that lg padding card is visible
    const lgPadding = cardPaddingSection.locator('[data-slot="card"]').nth(2);
    await expect(lgPadding).toBeVisible();
        const classAttributeLG = await lgPadding.getAttribute('class');
        expect(classAttributeLG).toBeTruthy();
        expect(classAttributeLG).toContain('px-7 py-7');
        expect(classAttributeLG).toContain('rounded-lg');
}

export async function testStyledCard(page: Page){
    // Verify that Styled Card is visible
    const styledCard = page.locator('[id="card-styled"]').locator('[data-slot="card"]');
    await expect(styledCard).toBeVisible();

    // Verify that header details are visible
    const headerDetails = styledCard.locator('[data-slot="card-header"]');
    await expect(headerDetails).toBeVisible();
    // Verify that header details has card title
    const cardTitleHeaderDetails = headerDetails.locator('[data-slot="card-title"]');
    await expect(cardTitleHeaderDetails).toContainText('Briefs tracker');
    // Verify that header details has card description
    await expect(headerDetails.locator('span').filter({ hasText: 'View all briefs' })).toBeVisible();
    await expect(headerDetails.locator('button[data-slot="button"]')).toHaveAttribute('aria-label', 'More options');
    
    // Verify that content details are visible
    const contentDetails = styledCard.locator('[data-slot="card-content"]');
    await expect(contentDetails.locator('h3').filter({ hasText: 'New' })).toBeVisible();
    await expect(contentDetails.locator('h3').filter({ hasText: 'In progress' })).toBeVisible();
    await expect(contentDetails.locator('h3').filter({ hasText: 'Approved' })).toBeVisible();
}

export async function testLargeAndCompactCard(page: Page){
    // Verify that Large and Compact Card is visible
    const largeAndCompactCard = page.locator('[id="card-large-compact"]');
    await expect(largeAndCompactCard).toBeVisible();

    // Verify that large card section is visible
    const largeCardSection = largeAndCompactCard.locator('section').nth(0);
    await expect(largeCardSection).toBeVisible();

    // Verify that Large Padding card section is visible
    const largePaddingCardSection = largeCardSection.locator('[class="space-y-2"]').nth(0);
    await expect(largePaddingCardSection).toBeVisible();
    // Verify that Padding card is visible
    const largePaddingCard = largePaddingCardSection.locator('[data-slot="card"]');
    await expect(largePaddingCard).toBeVisible();
    // Verify that Padding card has related class
    const largePaddingCardClass = await largePaddingCard.getAttribute('class');
    expect(largePaddingCardClass).toContain('gap-6');
    expect(largePaddingCardClass).toContain('border');
    expect(largePaddingCardClass).toContain('transition-shadow');
    expect(largePaddingCardClass).toContain('focus-visible:outline-none');
    expect(largePaddingCardClass).toContain('bg-body-bg');
    expect(largePaddingCardClass).toContain('border-border-color');
    expect(largePaddingCardClass).toContain('shadow-none');
    expect(largePaddingCardClass).toContain('hover:shadow-base');
    expect(largePaddingCardClass).toContain('focus-visible:shadow-base');
    expect(largePaddingCardClass).toContain('h-[150px]');
    expect(largePaddingCardClass).toContain('w-[171px]');
    expect(largePaddingCardClass).toContain('overflow-hidden');
    expect(largePaddingCardClass).toContain('rounded-xl');
    expect(largePaddingCardClass).toContain('p-0');
    // Verify that Padding card has content
    const largePaddingCardContent = largePaddingCard.locator('[data-slot="card-content"]');
    await expect(largePaddingCardContent).toBeVisible();
    // Verify that Padding card has image
    const largePaddingCardImage = largePaddingCard.locator('img');
    await expect(largePaddingCardImage).toBeVisible();
    // Verify that image has related class
    const largePaddingCardImageClass = await largePaddingCardImage.getAttribute('class');
    expect(largePaddingCardImageClass).toContain('h-full');
    expect(largePaddingCardImageClass).toContain('w-full');
    expect(largePaddingCardImageClass).toContain('rounded-lg');
    expect(largePaddingCardImageClass).toContain('object-cover');

    // Verify that Large Sans Padding card section is visible
    const largeSansPaddingCardSection = largeCardSection.locator('[class="space-y-2"]').nth(1);
    await expect(largeSansPaddingCardSection).toBeVisible();
    // Verify that Padding card is visible
    const largeSansPaddingCard = largeSansPaddingCardSection.locator('[data-slot="card"]');
    await expect(largeSansPaddingCard).toBeVisible();
    // Verify that Padding card has related class
    const largeSansPaddingCardClass = await largeSansPaddingCard.getAttribute('class');
    expect(largeSansPaddingCardClass).toContain('gap-6');
    expect(largeSansPaddingCardClass).toContain('border');
    expect(largeSansPaddingCardClass).toContain('transition-shadow');
    expect(largeSansPaddingCardClass).toContain('focus-visible:outline-none');
    expect(largeSansPaddingCardClass).toContain('shadow-none');
    expect(largeSansPaddingCardClass).toContain('bg-body-bg');
    expect(largeSansPaddingCardClass).toContain('border-transparent');
    expect(largeSansPaddingCardClass).toContain('h-[150px]');
    expect(largeSansPaddingCardClass).toContain('w-[171px]');
    expect(largeSansPaddingCardClass).toContain('overflow-hidden');
    expect(largeSansPaddingCardClass).toContain('rounded-xl');
    expect(largeSansPaddingCardClass).toContain('p-0');
    // Verify that Sans Padding card has content
    const largeSansPaddingCardContent = largeSansPaddingCard.locator('[data-slot="card-content"]');
    await expect(largeSansPaddingCardContent).toBeVisible();
    // Verify that Sans Padding card has image
    const largeSansPaddingCardImage = largeSansPaddingCard.locator('img');
    await expect(largeSansPaddingCardImage).toBeVisible();
    // Verify that image has related class
    const largeSansPaddingCardImageClass = await largeSansPaddingCardImage.getAttribute('class');
    expect(largeSansPaddingCardImageClass).toContain('size-full');
    expect(largeSansPaddingCardImageClass).toContain('object-cover');
    
    // Verify that Compact card section is visible
    const compactCardSection = largeAndCompactCard.locator('section').nth(1);
    await expect(compactCardSection).toBeVisible();

    // Verify that CompactPadding card section is visible
    const compactPaddingCardSection = compactCardSection.locator('[class="space-y-2"]').nth(0);
    await expect(compactPaddingCardSection).toBeVisible();
    // Verify that Compact Padding card is visible
    const compactPaddingCard = compactPaddingCardSection.locator('[data-slot="card"]');
    await expect(compactPaddingCard).toBeVisible();
    // Verify that Padding card has related class
    const compactPaddingCardClass = await compactPaddingCard.getAttribute('class');
    expect(compactPaddingCardClass).toContain('gap-6');
    expect(compactPaddingCardClass).toContain('border');
    expect(compactPaddingCardClass).toContain('transition-shadow');
    expect(compactPaddingCardClass).toContain('focus-visible:outline-none');
    expect(compactPaddingCardClass).toContain('bg-body-bg');
    expect(compactPaddingCardClass).toContain('border-border-color');
    expect(compactPaddingCardClass).toContain('shadow-none');
    expect(compactPaddingCardClass).toContain('hover:shadow-base');
    expect(compactPaddingCardClass).toContain('focus-visible:shadow-base');
    expect(compactPaddingCardClass).toContain('w-[400px]');
    expect(compactPaddingCardClass).toContain('overflow-hidden');
    expect(compactPaddingCardClass).toContain('rounded-xl');
    expect(compactPaddingCardClass).toContain('p-0');
    // Verify that Padding card has content
    const compactPaddingCardContent = compactPaddingCard.locator('[data-slot="card-content"]');
    await expect(compactPaddingCardContent).toBeVisible();
    // Verify that Padding card has image
    const compactPaddingCardImage = compactPaddingCard.locator('img');
    await expect(compactPaddingCardImage).toBeVisible();
    // Verify that image has related class
    const compactPaddingCardImageClass = await compactPaddingCardImage.getAttribute('class');
    expect(compactPaddingCardImageClass).toContain('aspect-square');
    expect(compactPaddingCardImageClass).toContain('h-24');
    expect(compactPaddingCardImageClass).toContain('w-24');
    expect(compactPaddingCardImageClass).toContain('rounded-lg');
    expect(compactPaddingCardImageClass).toContain('object-cover');

    // Verify that Compact Sans Padding card section is visible
    const compactSansPaddingCardSection = compactCardSection.locator('[class="space-y-2"]').nth(1);
    await expect(compactSansPaddingCardSection).toBeVisible();
    // Verify that Compact Padding card is visible
    const compactSansPaddingCard = compactSansPaddingCardSection.locator('[data-slot="card"]');
    await expect(compactSansPaddingCard).toBeVisible();
    // Verify that Padding card has related class
    const compactSansPaddingCardClass = await compactSansPaddingCard.getAttribute('class');
    expect(compactSansPaddingCardClass).toContain('gap-6');
    expect(compactSansPaddingCardClass).toContain('border');
    expect(compactSansPaddingCardClass).toContain('transition-shadow');
    expect(compactSansPaddingCardClass).toContain('focus-visible:outline-none');
    expect(compactSansPaddingCardClass).toContain('shadow-none');
    expect(compactSansPaddingCardClass).toContain('bg-body-bg');
    expect(compactSansPaddingCardClass).toContain('border-transparent');
    expect(compactSansPaddingCardClass).toContain('w-[400px]');
    expect(compactSansPaddingCardClass).toContain('overflow-hidden');
    expect(compactSansPaddingCardClass).toContain('rounded-xl');
    expect(compactSansPaddingCardClass).toContain('p-0');
    // Verify that Sans Padding card has content
    const compactSansPaddingCardContent = compactSansPaddingCard.locator('[data-slot="card-content"]');
    await expect(compactSansPaddingCardContent).toBeVisible();
    // Verify that Sans Padding card has image
    const compactSansPaddingCardImage = compactSansPaddingCard.locator('img');
    await expect(compactSansPaddingCardImage).toBeVisible();
    // Verify that image has related class
    const compactSansPaddingCardImageClass = await compactSansPaddingCardImage.getAttribute('class');
    expect(compactSansPaddingCardImageClass).toContain('h-24');
    expect(compactSansPaddingCardImageClass).toContain('w-24');
    expect(compactSansPaddingCardImageClass).toContain('shrink-0');
    expect(compactSansPaddingCardImageClass).toContain('rounded-l-xl');
    expect(compactSansPaddingCardImageClass).toContain('object-cover');
}

export async function testVerticalDetailCard(page: Page){
    // Verify that Vertical Detail Card is visible
    const verticalDetailCard = page.locator('[id="card-vertical-detail"]');
    await expect(verticalDetailCard).toBeVisible();

    // Verify that Padding card section is visible
    const paddingCardSection = verticalDetailCard.locator('section').nth(0);
    await expect(paddingCardSection).toBeVisible();

    // Verify that Padding card is visible
    const paddingCardOne = paddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(paddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const paddingCardOneClass = await paddingCardOne.getAttribute('class');
    expect(paddingCardOneClass).toContain('border');
    expect(paddingCardOneClass).toContain('transition-shadow');
    expect(paddingCardOneClass).toContain('focus-visible:outline-none');
    expect(paddingCardOneClass).toContain('hover:shadow-xl');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(paddingCardOneClass).toContain('bg-body-bg');
    expect(paddingCardOneClass).toContain('border-border-color');
    expect(paddingCardOneClass).toContain('shadow-none');
    expect(paddingCardOneClass).toContain('hover:shadow-base');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(paddingCardOneClass).toContain('w-[275px]');
    expect(paddingCardOneClass).toContain('overflow-hidden');
    expect(paddingCardOneClass).toContain('rounded-xl');
    expect(paddingCardOneClass).toContain('p-0');
    expect(paddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const paddingCardOneImageSection = paddingCardOne.locator('[class="px-3 pt-3 pb-0"]');
    await expect(paddingCardOneImageSection).toBeVisible();
    // Verify that Padding card has image
    const paddingCardOneImage = paddingCardOneImageSection.locator('img');
    await expect(paddingCardOneImage).toBeVisible();
    // Verify that image has checkbox
    const paddingCardOneCheckbox = paddingCardOneImageSection.locator('button[data-slot="checkbox"]');
    await expect(paddingCardOneCheckbox).toBeVisible();
    // Verify that image has close button
    const paddingCardOneCloseButton = paddingCardOneImageSection.locator('button[aria-label="Close"]');
    await expect(paddingCardOneCloseButton).toBeVisible();
    // Verify that image has badge
    const paddingCardOneBadge = paddingCardOneImageSection.locator('span[data-slot="badge"]');
    await expect(paddingCardOneBadge).toBeVisible();
    // Verify that Padding card has content section
    const paddingCardOneContentSection = paddingCardOne.locator('[data-slot="card-content"]');
    await expect(paddingCardOneContentSection).toBeVisible();
    // Verify that card content has header
    const paddingCardOneContentHeader = paddingCardOneContentSection.locator('[data-slot="card-header"]');
    await expect(paddingCardOneContentHeader).toBeVisible();
    // Verify that card header has title
    const paddingCardOneContentTitle = paddingCardOneContentHeader.locator('[data-slot="card-title"]');
    await expect(paddingCardOneContentTitle).toContainText('Lorem ipsum dolor sit amet consectetur. Morbi...');
    // Verify that card header has action
    const paddingCardOneContentAction = paddingCardOneContentHeader.locator('[data-slot="card-action"]');
    await expect(paddingCardOneContentAction).toBeVisible();
    // Verify that Action has action items
    const actionItemOne = paddingCardOneContentAction.locator('span').nth(0);
    await expect(actionItemOne).toContainText('en-US');
    const actionItemTwo = paddingCardOneContentAction.locator('span').nth(1).locator('svg');
    await expect(actionItemTwo).toBeVisible();
    const actionItemThree = paddingCardOneContentAction.locator('button[aria-label="More options"]');
    await expect(actionItemThree).toBeVisible();
    // Verify that card content has description
    const paddingCardDescription = paddingCardOneContentSection.locator('[data-slot="card-description"]');
    await expect(paddingCardDescription).toContainText('Explore luxurious escapes worldwide with our elite collection of hotels & resorts and...');
    // Verify that card content has footer
    const paddingCardOneFooter = paddingCardOneContentSection.locator('[data-slot="card-footer"]');
    await expect(paddingCardOneFooter).toContainText('By Sitecore');

    // Verify that Sans Padding card section is visible
    const sansPaddingCardSection = verticalDetailCard.locator('section').nth(1);
    await expect(sansPaddingCardSection).toBeVisible();

    // Verify that Sans Padding card is visible
    const sansPaddingCardOne = sansPaddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(sansPaddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const sansPaddingCardOneClass = await sansPaddingCardOne.getAttribute('class');
    expect(sansPaddingCardOneClass).toContain('border');
    expect(sansPaddingCardOneClass).toContain('transition-shadow');
    expect(sansPaddingCardOneClass).toContain('focus-visible:outline-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('bg-body-bg');
    expect(sansPaddingCardOneClass).toContain('border-border-color');
    expect(sansPaddingCardOneClass).toContain('shadow-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-base');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(sansPaddingCardOneClass).toContain('w-[275px]');
    expect(sansPaddingCardOneClass).toContain('overflow-hidden');
    expect(sansPaddingCardOneClass).toContain('rounded-xl');
    expect(sansPaddingCardOneClass).toContain('p-0');
    expect(sansPaddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const sansPaddingCardOneImageSection = sansPaddingCardOne.locator('[class]');
    // Verify that Padding card has image
    const sansPaddingCardOneImage = sansPaddingCardOne.locator('img');
    await expect(sansPaddingCardOneImage).toBeVisible();
    // Verify that image has checkbox
    const sansPaddingCardOneCheckbox = sansPaddingCardOneImageSection.locator('button[data-slot="checkbox"]');
    await expect(sansPaddingCardOneCheckbox).toBeVisible();
    // Verify that image has close button
    const sansPaddingCardOneCloseButton = sansPaddingCardOneImageSection.locator('button[aria-label="Close"]');
    await expect(sansPaddingCardOneCloseButton).toBeVisible();
    // Verify that image has badge
    await expect (sansPaddingCardOneImageSection.locator('span[data-slot="badge"]').nth(0)).toContainText('JPG');
    // Verify that Padding card has content section
    const sansPaddingCardOneContentSection = sansPaddingCardOne.locator('[data-slot="card-content"]');
    await expect(sansPaddingCardOneContentSection).toBeVisible();
    // Verify that card content has header
    const sansPaddingCardOneContentHeader = sansPaddingCardOneContentSection.locator('[data-slot="card-header"]');
    await expect(sansPaddingCardOneContentHeader).toBeVisible();
    // Verify that card header has title
    const sansPaddingCardOneContentTitle = sansPaddingCardOneContentHeader.locator('[data-slot="card-title"]');
    await expect(sansPaddingCardOneContentTitle).toContainText('Lorem ipsum dolor sit amet consectetur. Morbi...');
    // Verify that card header has action
    const sansPaddingCardOneContentAction = sansPaddingCardOneContentHeader.locator('[data-slot="card-action"]');
    await expect(sansPaddingCardOneContentAction).toBeVisible();
    // Verify that Action has action items
    const actionItemOneSans = sansPaddingCardOneContentAction.locator('span').nth(0);
    await expect(actionItemOneSans).toContainText('en-US');
    const actionItemTwoSans = sansPaddingCardOneContentAction.locator('span').nth(1).locator('svg');
    await expect(actionItemTwoSans).toBeVisible();
    const actionItemThreeSans = sansPaddingCardOneContentAction.locator('button[aria-label="More options"]');
    await expect(actionItemThreeSans).toBeVisible();
    // Verify that card content has description
    const sansPaddingCardDescription = sansPaddingCardOneContentSection.locator('[data-slot="card-description"]');
    await expect(sansPaddingCardDescription).toContainText('Explore luxurious escapes worldwide with our elite collection of hotels & resorts and...');
    // Verify that card content has footer
    const sansPaddingCardOneFooter = sansPaddingCardOneContentSection.locator('[data-slot="card-footer"]');
    await expect(sansPaddingCardOneFooter).toContainText('By Sitecore');
}

export async function testVerticalMediumCard(page: Page){
    // Verify that Vertical Medium Card is visible
    const verticalMediumCard = page.locator('[id="card-vertical-medium"]');
    await expect(verticalMediumCard).toBeVisible();

    // Verify that Padding card section is visible
    const paddingCardSection = verticalMediumCard.locator('section').nth(0);
    await expect(paddingCardSection).toBeVisible();

    // Verify that Padding card is visible
    const paddingCardOne = paddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(paddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const paddingCardOneClass = await paddingCardOne.getAttribute('class');
    expect(paddingCardOneClass).toContain('border');
    expect(paddingCardOneClass).toContain('transition-shadow');
    expect(paddingCardOneClass).toContain('focus-visible:outline-none');
    expect(paddingCardOneClass).toContain('hover:shadow-xl');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(paddingCardOneClass).toContain('bg-body-bg');
    expect(paddingCardOneClass).toContain('border-border-color');
    expect(paddingCardOneClass).toContain('shadow-none');
    expect(paddingCardOneClass).toContain('hover:shadow-base');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(paddingCardOneClass).toContain('w-[275px]');
    expect(paddingCardOneClass).toContain('overflow-hidden');
    expect(paddingCardOneClass).toContain('rounded-xl');
    expect(paddingCardOneClass).toContain('p-0');
    expect(paddingCardOneClass).toContain('gap-1');
    // Verify that Padding card has image section
    const paddingCardOneImageSection = paddingCardOne.locator('[class="px-3 pt-3 pb-0"]');
    await expect(paddingCardOneImageSection).toBeVisible();
    // Verify that Padding card has image
    const paddingCardOneImage = paddingCardOneImageSection.locator('img');
    await expect(paddingCardOneImage).toBeVisible();
    // Verify that image has checkbox
    const paddingCardOneCheckbox = paddingCardOneImageSection.locator('button[data-slot="checkbox"]');
    await expect(paddingCardOneCheckbox).toBeVisible();
    // Verify that image has close button
    const paddingCardOneCloseButton = paddingCardOneImageSection.locator('button[aria-label="Close"]');
    await expect(paddingCardOneCloseButton).toBeVisible();
    // Verify that image has badge
    const paddingCardOneBadge = paddingCardOneImageSection.locator('span[data-slot="badge"]');
    await expect(paddingCardOneBadge).toBeVisible();
    // Verify that Padding card has content section
    const paddingCardOneContentSection = paddingCardOne.locator('[data-slot="card-content"]');
    await expect(paddingCardOneContentSection).toBeVisible();
    // Verify that card content has header
    const paddingCardOneContentHeader = paddingCardOneContentSection.locator('[data-slot="card-header"]');
    await expect(paddingCardOneContentHeader).toBeVisible();
    // Verify that card header has title
    const paddingCardOneContentTitle = paddingCardOneContentHeader.locator('[data-slot="card-title"]');
    await expect(paddingCardOneContentTitle).toContainText('Lorem ipsum dolor site amet consectetur. Morbi...');
    // Verify that card header has action
    const paddingCardOneContentAction = paddingCardOneContentHeader.locator('[data-slot="card-action"]');
    await expect(paddingCardOneContentAction).toBeVisible();
    // Verify that Action has action items
    const actionItemTwo = paddingCardOneContentAction.locator('span').locator('svg');
    await expect(actionItemTwo).toBeVisible();
    const actionItemThree = paddingCardOneContentAction.locator('button[aria-label="More options"]');
    await expect(actionItemThree).toBeVisible();

    // Verify that Sans Padding card section is visible
    const sansPaddingCardSection = verticalMediumCard.locator('section').nth(1);
    await expect(sansPaddingCardSection).toBeVisible();

    // Verify that Sans Padding card is visible
    const sansPaddingCardOne = sansPaddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(sansPaddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const sansPaddingCardOneClass = await sansPaddingCardOne.getAttribute('class');
    expect(sansPaddingCardOneClass).toContain('border');
    expect(sansPaddingCardOneClass).toContain('transition-shadow');
    expect(sansPaddingCardOneClass).toContain('focus-visible:outline-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('bg-body-bg');
    expect(sansPaddingCardOneClass).toContain('border-border-color');
    expect(sansPaddingCardOneClass).toContain('shadow-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-base');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(sansPaddingCardOneClass).toContain('w-[275px]');
    expect(sansPaddingCardOneClass).toContain('overflow-hidden');
    expect(sansPaddingCardOneClass).toContain('rounded-xl');
    expect(sansPaddingCardOneClass).toContain('p-0');
    expect(sansPaddingCardOneClass).toContain('gap-1');
    // Verify that Padding card has image section
    const sansPaddingCardOneImageSection = sansPaddingCardOne.locator('[class]');
    // Verify that Padding card has image
    const sansPaddingCardOneImage = sansPaddingCardOne.locator('img');
    await expect(sansPaddingCardOneImage).toBeVisible();
    // Verify that image has checkbox
    const sansPaddingCardOneCheckbox = sansPaddingCardOneImageSection.locator('button[data-slot="checkbox"]');
    await expect(sansPaddingCardOneCheckbox).toBeVisible();
    // Verify that image has close button
    const sansPaddingCardOneCloseButton = sansPaddingCardOneImageSection.locator('button[aria-label="Close"]');
    await expect(sansPaddingCardOneCloseButton).toBeVisible();
    // Verify that image has badge
    await expect (sansPaddingCardOneImageSection.locator('span[data-slot="badge"]').nth(0)).toContainText('JPG');
    // Verify that Padding card has content section
    const sansPaddingCardOneContentSection = sansPaddingCardOne.locator('[data-slot="card-content"]');
    await expect(sansPaddingCardOneContentSection).toBeVisible();
    // Verify that card content has header
    const sansPaddingCardOneContentHeader = sansPaddingCardOneContentSection.locator('[data-slot="card-header"]');
    await expect(sansPaddingCardOneContentHeader).toBeVisible();
    // Verify that card header has title
    const sansPaddingCardOneContentTitle = sansPaddingCardOneContentHeader.locator('[data-slot="card-title"]');
    await expect(sansPaddingCardOneContentTitle).toContainText('Lorem ipsum dolor site amet consectetur. Morbi...');
    // Verify that card header has action
    const sansPaddingCardOneContentAction = sansPaddingCardOneContentHeader.locator('[data-slot="card-action"]');
    await expect(sansPaddingCardOneContentAction).toBeVisible();
    // Verify that Action has action items
    const actionItemTwoSans = sansPaddingCardOneContentAction.locator('span').locator('svg');
    await expect(actionItemTwoSans).toBeVisible();
    const actionItemThreeSans = sansPaddingCardOneContentAction.locator('button[aria-label="More options"]');
    await expect(actionItemThreeSans).toBeVisible();
}

export async function testVerticalSmallCard(page: Page){
    // Verify that Vertical Small Card is visible
    const verticalSmallCard = page.locator('[id="card-vertical-small"]');
    await expect(verticalSmallCard).toBeVisible();

    // Verify that Padding card section is visible
    const paddingCardSection = verticalSmallCard.locator('section').nth(0);
    await expect(paddingCardSection).toBeVisible();

    // Verify that Padding card is visible
    const paddingCardOne = paddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(paddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const paddingCardOneClass = await paddingCardOne.getAttribute('class');
    expect(paddingCardOneClass).toContain('border');
    expect(paddingCardOneClass).toContain('transition-shadow');
    expect(paddingCardOneClass).toContain('focus-visible:outline-none');
    expect(paddingCardOneClass).toContain('hover:shadow-xl');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(paddingCardOneClass).toContain('bg-body-bg');
    expect(paddingCardOneClass).toContain('border-border-color');
    expect(paddingCardOneClass).toContain('shadow-none');
    expect(paddingCardOneClass).toContain('hover:shadow-base');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(paddingCardOneClass).toContain('w-[200px]');
    expect(paddingCardOneClass).toContain('overflow-hidden');
    expect(paddingCardOneClass).toContain('rounded-xl');
    expect(paddingCardOneClass).toContain('p-0');
    expect(paddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const paddingCardOneImageSection = paddingCardOne.locator('[class="px-2 pt-2 pb-0"]');
    await expect(paddingCardOneImageSection).toBeVisible();
    // Verify that Padding card has image
    const paddingCardOneImage = paddingCardOneImageSection.locator('img');
    await expect(paddingCardOneImage).toBeVisible();
    // Verify that Padding card has content section
    const paddingCardOneContentSection = paddingCardOne.locator('[data-slot="card-content"]');
    await expect(paddingCardOneContentSection).toBeVisible();
    // Verify card content text
    await expect(paddingCardOneContentSection.locator('span')).toContainText('Lorem ipsum');
    await expect(paddingCardOneContentSection.locator('button[aria-label="More options"]')).toBeVisible();

    // Verify that Sans Padding card section is visible
    const sansPaddingCardSection = verticalSmallCard.locator('section').nth(1);
    await expect(sansPaddingCardSection).toBeVisible();

    // Verify that Sans Padding card is visible
    const sansPaddingCardOne = sansPaddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(sansPaddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const sansPaddingCardOneClass = await sansPaddingCardOne.getAttribute('class');
    expect(sansPaddingCardOneClass).toContain('border');
    expect(sansPaddingCardOneClass).toContain('transition-shadow');
    expect(sansPaddingCardOneClass).toContain('focus-visible:outline-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('bg-body-bg');
    expect(sansPaddingCardOneClass).toContain('border-border-color');
    expect(sansPaddingCardOneClass).toContain('shadow-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-base');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(sansPaddingCardOneClass).toContain('w-[200px]');
    expect(sansPaddingCardOneClass).toContain('overflow-hidden');
    expect(sansPaddingCardOneClass).toContain('rounded-xl');
    expect(sansPaddingCardOneClass).toContain('p-0');
    expect(sansPaddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const sansPaddingCardOneImageSection = sansPaddingCardOne.locator('[class]');
    // Verify that Padding card has image
    const sansPaddingCardOneImage = sansPaddingCardOne.locator('img');
    await expect(sansPaddingCardOneImage).toBeVisible();
    // Verify that Padding card has content section
    const sansPaddingCardOneContentSection = sansPaddingCardOne.locator('[data-slot="card-content"]');
    await expect(sansPaddingCardOneContentSection).toBeVisible();
    // Verify card content text
    await expect(sansPaddingCardOneContentSection.locator('span')).toContainText('Lorem ipsum');
    await expect(sansPaddingCardOneContentSection.locator('button[aria-label="More options"]')).toBeVisible();
}

export async function testHorizontalDetailCard(page: Page){
    // Verify that Horizontal Detail Card is visible
    const horizontalDetailCard = page.locator('[id="card-horizontal-detail"]');
    await expect(horizontalDetailCard).toBeVisible();

    // Verify that Padding card section is visible
    const paddingCardSection = horizontalDetailCard.locator('section').nth(0);
    await expect(paddingCardSection).toBeVisible();

    // Verify that Padding card is visible
    const paddingCardOne = paddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(paddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const paddingCardOneClass = await paddingCardOne.getAttribute('class');
    expect(paddingCardOneClass).toContain('border');
    expect(paddingCardOneClass).toContain('transition-shadow');
    expect(paddingCardOneClass).toContain('focus-visible:outline-none');
    expect(paddingCardOneClass).toContain('hover:shadow-xl');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(paddingCardOneClass).toContain('bg-body-bg');
    expect(paddingCardOneClass).toContain('border-border-color');
    expect(paddingCardOneClass).toContain('shadow-none');
    expect(paddingCardOneClass).toContain('hover:shadow-base');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(paddingCardOneClass).toContain('w-full');
    expect(paddingCardOneClass).toContain('max-w-[462px]');
    expect(paddingCardOneClass).toContain('overflow-hidden');
    expect(paddingCardOneClass).toContain('rounded-xl');
    expect(paddingCardOneClass).toContain('p-0');
    expect(paddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const paddingCardOneImageSection = paddingCardOne.locator('[class="flex shrink-0 items-start p-3 pr-0"]');
    await expect(paddingCardOneImageSection).toBeVisible();
    // Verify that Padding card has image
    const paddingCardOneImage = paddingCardOneImageSection.locator('img');
    await expect(paddingCardOneImage).toBeVisible();
    // Verify that image has checkbox
    const paddingCardOneCheckbox = paddingCardOneImageSection.locator('button[data-slot="checkbox"]');
    await expect(paddingCardOneCheckbox).toBeVisible();
    // Verify that Padding card has content section
    const paddingCardOneContentSection = paddingCardOne.locator('[data-slot="card-content"]');
    await expect(paddingCardOneContentSection).toBeVisible();
    // Verify that card content has header
    const paddingCardOneContentHeader = paddingCardOneContentSection.locator('[data-slot="card-header"]');
    await expect(paddingCardOneContentHeader).toBeVisible();
    // Verify that card header has title
    const paddingCardOneContentTitle = paddingCardOneContentHeader.locator('[data-slot="card-title"]');
    await expect(paddingCardOneContentTitle).toContainText('Lorem ipsum dolor sit amet consectetur. Morbi nunc sem...');
    // Verify that card header has action
    const paddingCardOneContentAction = paddingCardOneContentHeader.locator('[data-slot="card-action"]');
    await expect(paddingCardOneContentAction).toBeVisible();
    // Verify that Action has action items
    const actionItemOne = paddingCardOneContentAction.locator('span').nth(0);
    await expect(actionItemOne).toContainText('en-US');
    const actionItemTwo = paddingCardOneContentAction.locator('span').nth(1).locator('svg');
    await expect(actionItemTwo).toBeVisible();
    const actionItemThree = paddingCardOneContentAction.locator('button[aria-label="More options"]');
    await expect(actionItemThree).toBeVisible();
    const actionItemFour = paddingCardOneContentAction.locator('button[aria-label="Close"]');
    await expect(actionItemFour).toBeVisible();
    // Verify that card content has description
    const paddingCardDescription = paddingCardOneContentSection.locator('[data-slot="card-description"]');
    await expect(paddingCardDescription).toContainText('Explore luxurious escapes worldwide with our elite collection of hotels & resorts and so many other thi...');
    // Verify that card content has footer
    const paddingCardOneFooter = paddingCardOneContentSection.locator('[data-slot="card-footer"]');
    await expect(paddingCardOneFooter).toContainText('By Sitecore');

    // Verify that Sans Padding card section is visible
    const sansPaddingCardSection = horizontalDetailCard.locator('section').nth(1);
    await expect(sansPaddingCardSection).toBeVisible();

    // Verify that Sans Padding card is visible
    const sansPaddingCardOne = sansPaddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(sansPaddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const sansPaddingCardOneClass = await sansPaddingCardOne.getAttribute('class');
    expect(sansPaddingCardOneClass).toContain('border');
    expect(sansPaddingCardOneClass).toContain('transition-shadow');
    expect(sansPaddingCardOneClass).toContain('focus-visible:outline-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('bg-body-bg');
    expect(sansPaddingCardOneClass).toContain('border-border-color');
    expect(sansPaddingCardOneClass).toContain('shadow-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-base');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(sansPaddingCardOneClass).toContain('w-full');
    expect(sansPaddingCardOneClass).toContain('max-w-[462px]');
    expect(sansPaddingCardOneClass).toContain('overflow-hidden');
    expect(sansPaddingCardOneClass).toContain('rounded-xl');
    expect(sansPaddingCardOneClass).toContain('p-0');
    expect(sansPaddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const sansPaddingCardOneImageSection = sansPaddingCardOne.locator('[class="flex shrink-0 self-stretch"]');
    await expect(sansPaddingCardOneImageSection).toBeVisible();
    // Verify that Padding card has image
    const sansPaddingCardOneImage = sansPaddingCardOneImageSection.locator('img');
    await expect(paddingCardOneImage).toBeVisible();
    // Verify that image has checkbox
    const sansPaddingCardOneCheckbox = sansPaddingCardOneImageSection.locator('button[data-slot="checkbox"]');
    await expect(sansPaddingCardOneCheckbox).toBeVisible();
    // Verify that Padding card has content section
    const sansPaddingCardOneContentSection = sansPaddingCardOne.locator('[data-slot="card-content"]');
    await expect(sansPaddingCardOneContentSection).toBeVisible();
    // Verify that card content has header
    const sansPaddingCardOneContentHeader = sansPaddingCardOneContentSection.locator('[data-slot="card-header"]');
    await expect(sansPaddingCardOneContentHeader).toBeVisible();
    // Verify that card header has title
    const sansPaddingCardOneContentTitle = sansPaddingCardOneContentHeader.locator('[data-slot="card-title"]');
    await expect(sansPaddingCardOneContentTitle).toContainText('Lorem ipsum dolor sit amet consectetur. Morbi nunc sem...');
    // Verify that card header has action
    const sansPaddingCardOneContentAction = sansPaddingCardOneContentHeader.locator('[data-slot="card-action"]');
    await expect(sansPaddingCardOneContentAction).toBeVisible();
    // Verify that Action has action items
    const actionItemOneSans = sansPaddingCardOneContentAction.locator('span').nth(0);
    await expect(actionItemOneSans).toContainText('en-US');
    const actionItemTwoSans = sansPaddingCardOneContentAction.locator('span').nth(1).locator('svg');
    await expect(actionItemTwoSans).toBeVisible();
    const actionItemThreeSans = sansPaddingCardOneContentAction.locator('button[aria-label="More options"]');
    await expect(actionItemThreeSans).toBeVisible();
    // Verify that card content has description
    const sansPaddingCardDescription = sansPaddingCardOneContentSection.locator('[data-slot="card-description"]');
    await expect(sansPaddingCardDescription).toContainText('Explore luxurious escapes worldwide with our elite collection of hotels & resorts and so many other thi...');
    // Verify that card content has footer
    const sansPaddingCardOneFooter = sansPaddingCardOneContentSection.locator('[data-slot="card-footer"]');
    await expect(sansPaddingCardOneFooter).toContainText('By Sitecore');
}

export async function testHorizontalNormalCard(page: Page){
    // Verify that Horizontal Normal Card is visible
    const horizontalNormalCard = page.locator('[id="card-horizontal-normal"]');
    await expect(horizontalNormalCard).toBeVisible();

    // Verify that Padding card section is visible
    const paddingCardSection = horizontalNormalCard.locator('section').nth(0);
    await expect(paddingCardSection).toBeVisible();

    // Verify that Padding card is visible
    const paddingCardOne = paddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(paddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const paddingCardOneClass = await paddingCardOne.getAttribute('class');
    expect(paddingCardOneClass).toContain('border');
    expect(paddingCardOneClass).toContain('transition-shadow');
    expect(paddingCardOneClass).toContain('focus-visible:outline-none');
    expect(paddingCardOneClass).toContain('hover:shadow-xl');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(paddingCardOneClass).toContain('bg-body-bg');
    expect(paddingCardOneClass).toContain('border-border-color');
    expect(paddingCardOneClass).toContain('shadow-none');
    expect(paddingCardOneClass).toContain('hover:shadow-base');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(paddingCardOneClass).toContain('w-full');
    expect(paddingCardOneClass).toContain('max-w-[462px]');
    expect(paddingCardOneClass).toContain('overflow-hidden');
    expect(paddingCardOneClass).toContain('rounded-xl');
    expect(paddingCardOneClass).toContain('p-0');
    expect(paddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const paddingCardOneImageSection = paddingCardOne.locator('[class="flex shrink-0 items-center p-3 pr-0"]');
    await expect(paddingCardOneImageSection).toBeVisible();
    // Verify that Padding card has image
    const paddingCardOneImage = paddingCardOneImageSection.locator('img');
    await expect(paddingCardOneImage).toBeVisible();
    // Verify that Padding card has content section
    const paddingCardOneContentSection = paddingCardOne.locator('[data-slot="card-content"]');
    await expect(paddingCardOneContentSection).toBeVisible();
    // Verify that card header has title
    const paddingCardOneContentTitle = paddingCardOneContentSection.locator('[data-slot="card-title"]');
    await expect(paddingCardOneContentTitle).toContainText('Lorem ipsum dolor sit amet consectetur. Morbi nunc semper lacus in ullam...');
    // Verify that Action has action items
    const actionItemTwo = paddingCardOneContentSection.locator('span').locator('svg');
    await expect(actionItemTwo).toBeVisible();
    const actionItemThree = paddingCardOneContentSection.locator('button[aria-label="More options"]');
    await expect(actionItemThree).toBeVisible();

    // Verify that Sans Padding card section is visible
    const sansPaddingCardSection = horizontalNormalCard.locator('section').nth(1);
    await expect(sansPaddingCardSection).toBeVisible();

    // Verify that Sans Padding card is visible
    const sansPaddingCardOne = sansPaddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(sansPaddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const sansPaddingCardOneClass = await sansPaddingCardOne.getAttribute('class');
    expect(sansPaddingCardOneClass).toContain('border');
    expect(sansPaddingCardOneClass).toContain('transition-shadow');
    expect(sansPaddingCardOneClass).toContain('focus-visible:outline-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('bg-body-bg');
    expect(sansPaddingCardOneClass).toContain('border-border-color');
    expect(sansPaddingCardOneClass).toContain('shadow-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-base');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(paddingCardOneClass).toContain('w-full');
    expect(paddingCardOneClass).toContain('max-w-[462px]');
    expect(sansPaddingCardOneClass).toContain('overflow-hidden');
    expect(sansPaddingCardOneClass).toContain('rounded-xl');
    expect(sansPaddingCardOneClass).toContain('p-0');
    expect(sansPaddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const sansPaddingCardOneImageSection = sansPaddingCardOne.locator('[class="flex shrink-0 self-stretch"]');
    // Verify that Padding card has image
    const sansPaddingCardOneImage = sansPaddingCardOne.locator('img');
    await expect(sansPaddingCardOneImage).toBeVisible();
    // Verify that Padding card has content section
    const sansPaddingCardOneContentSection = sansPaddingCardOne.locator('[data-slot="card-content"]');
    await expect(sansPaddingCardOneContentSection).toBeVisible();
    // Verify that card header has title
    const sansPaddingCardOneContentTitle = sansPaddingCardOneContentSection.locator('[data-slot="card-title"]');
    await expect(sansPaddingCardOneContentTitle).toContainText('Lorem ipsum dolor sit amet consectetur. Morbi nunc semper lacus in ullam...');
    // Verify that Action has action items
    const actionItemTwoSans = sansPaddingCardOneContentSection.locator('span').locator('svg');
    await expect(actionItemTwoSans).toBeVisible();
    const actionItemThreeSans = sansPaddingCardOneContentSection.locator('button[aria-label="More options"]');
    await expect(actionItemThreeSans).toBeVisible();
}

export async function testHorizontalSmallCard(page: Page){
    // Verify that Horizontal Small Card is visible
    const horizontalSmallCard = page.locator('[id="card-horizontal-small"]');
    await expect(horizontalSmallCard).toBeVisible();

    // Verify that Padding card section is visible
    const paddingCardSection = horizontalSmallCard.locator('section').nth(0);
    await expect(paddingCardSection).toBeVisible();

    // Verify that Padding card is visible
    const paddingCardOne = paddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(paddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const paddingCardOneClass = await paddingCardOne.getAttribute('class');
    expect(paddingCardOneClass).toContain('border');
    expect(paddingCardOneClass).toContain('transition-shadow');
    expect(paddingCardOneClass).toContain('focus-visible:outline-none');
    expect(paddingCardOneClass).toContain('hover:shadow-xl');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(paddingCardOneClass).toContain('bg-body-bg');
    expect(paddingCardOneClass).toContain('border-border-color');
    expect(paddingCardOneClass).toContain('shadow-none');
    expect(paddingCardOneClass).toContain('hover:shadow-base');
    expect(paddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(paddingCardOneClass).toContain('w-fit');
    expect(paddingCardOneClass).toContain('max-w-full');
    expect(paddingCardOneClass).toContain('overflow-hidden');
    expect(paddingCardOneClass).toContain('rounded-xl');
    expect(paddingCardOneClass).toContain('p-0');
    expect(paddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const paddingCardOneImageSection = paddingCardOne.locator('[class="flex shrink-0"]');
    await expect(paddingCardOneImageSection).toBeVisible();
    // Verify that Padding card has image
    const paddingCardOneImage = paddingCardOneImageSection.locator('img');
    await expect(paddingCardOneImage).toBeVisible();
    // Verify that Padding card has content section
    const paddingCardOneContentSection = paddingCardOne.locator('[data-slot="card-content"]');
    await expect(paddingCardOneContentSection).toBeVisible();
    // Verify card content text
    await expect(paddingCardOneContentSection.locator('[data-slot="card-title"]')).toContainText('Lorem ipsum dolor');

    // Verify that Sans Padding card section is visible
    const sansPaddingCardSection = horizontalSmallCard.locator('section').nth(1);
    await expect(sansPaddingCardSection).toBeVisible();

    // Verify that Sans Padding card is visible
    const sansPaddingCardOne = sansPaddingCardSection.locator('[data-slot="card"]').nth(0);
    await expect(sansPaddingCardOne).toBeVisible();
    // Verify that Padding card has related class
    const sansPaddingCardOneClass = await sansPaddingCardOne.getAttribute('class');
    expect(sansPaddingCardOneClass).toContain('border');
    expect(sansPaddingCardOneClass).toContain('transition-shadow');
    expect(sansPaddingCardOneClass).toContain('focus-visible:outline-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-xl');
    expect(sansPaddingCardOneClass).toContain('bg-body-bg');
    expect(sansPaddingCardOneClass).toContain('border-border-color');
    expect(sansPaddingCardOneClass).toContain('shadow-none');
    expect(sansPaddingCardOneClass).toContain('hover:shadow-base');
    expect(sansPaddingCardOneClass).toContain('focus-visible:shadow-base');
    expect(sansPaddingCardOneClass).toContain('w-fit');
    expect(sansPaddingCardOneClass).toContain('max-w-full');
    expect(sansPaddingCardOneClass).toContain('overflow-hidden');
    expect(sansPaddingCardOneClass).toContain('rounded-xl');
    expect(sansPaddingCardOneClass).toContain('p-0');
    expect(sansPaddingCardOneClass).toContain('gap-0');
    // Verify that Padding card has image section
    const sansPaddingCardOneImageSection = sansPaddingCardOne.locator('[class="flex shrink-0 self-stretch"]');
    // Verify that Padding card has image
    const sansPaddingCardOneImage = sansPaddingCardOne.locator('img');
    await expect(sansPaddingCardOneImage).toBeVisible();
    // Verify that Padding card has content section
    const sansPaddingCardOneContentSection = sansPaddingCardOne.locator('[data-slot="card-content"]');
    await expect(sansPaddingCardOneContentSection).toBeVisible();
    // Verify card content title
    await expect(sansPaddingCardOneContentSection.locator('[data-slot="card-title"]')).toContainText('Lorem ipsum dolor');
}