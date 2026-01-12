import { test, expect, Page } from '@playwright/test';

export async function testTimelineDefault(page: Page){
    // Verify that default timeline is visible
    const timelineDefault = page.locator('#timeline-default');
    await expect(timelineDefault).toBeVisible();

    // Verify that timeline has items
    // Verify Timeline item1 (Product Shipped)
    const timelineItem1 = timelineDefault.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItem1).toBeVisible();
    // Verify Timeline item1 has separator (separator is the line that connects the items)
    await expect(timelineItem1.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    await expect(timelineItem1.locator('[data-slot="timeline-connector"]')).toBeVisible();
    // Verify Timeline item has content
    // Verify Timeline item1 content has title
    const item1Title = timelineItem1.locator('[data-slot="timeline-title"]');
    await expect(item1Title).toHaveText('Product Shipped');
    // Verify Timeline item1 content has description
    const item1Description = timelineItem1.locator('[data-slot="timeline-description"]');
    await expect(item1Description).toHaveText('13th May 2021');

    // Verify Timeline item2 (Order Confirmed)
    const timelineItem2 = timelineDefault.locator('[data-slot="timeline-item"]').nth(1);
    await expect(timelineItem2).toBeVisible();
    // Verify Timeline item2 has separator (separator is the line that connects the items)
    await expect(timelineItem2.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    await expect(timelineItem2.locator('[data-slot="timeline-connector"]')).toBeVisible();
    // Verify Timeline item has content
    // Verify Timeline item2 content has title
    const item2Title = timelineItem2.locator('[data-slot="timeline-title"]');
    await expect(item2Title).toHaveText('Order Confirmed');
    // Verify Timeline item2 content has description
    const item2Description = timelineItem2.locator('[data-slot="timeline-description"]');
    await expect(item2Description).toHaveText('18th May 2021');

    // Verify Timeline item3 (Order Delivered)
    const timelineItem3 = timelineDefault.locator('[data-slot="timeline-item"]').nth(2);
    await expect(timelineItem3).toBeVisible();
    // Verify Timeline item3 has separator (this has only indicator, no connector)
    await expect(timelineItem3.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    // Verify Timeline item has content
    // Verify Timeline item3 content has title
    const item3Title = timelineItem3.locator('[data-slot="timeline-title"]');
    await expect(item3Title).toHaveText('Order Delivered');
    // Verify Timeline item3 content has description
    const item3Description = timelineItem3.locator('[data-slot="timeline-description"]');
    await expect(item3Description).toHaveText('20th May 2021, 10:30am');
}

export async function testTimelineVariant(page: Page){
    // Verify that timeline variant is visible
    const timelineVariant = page.locator('#timeline-variants');
    await expect(timelineVariant).toBeVisible();

    // Verify that timeline has timeline-root elements
    const timelineRoot1 = timelineVariant.locator('[data-slot="timeline-root"]').nth(0);
    // Verify Timeline item1
    const timelineItem1 = timelineRoot1.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItem1).toBeVisible();
    // Verify Timeline item1 has separator (separator is the line that connects the items)
    const separatorItem1 = timelineItem1.locator('[data-slot="timeline-separator"]')
    await expect(separatorItem1.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    await expect(separatorItem1.locator('[data-slot="timeline-connector"]')).toBeVisible();
    // Verify Timeline item1 has content
    const contentItem1 = timelineItem1.locator('[data-slot="timeline-content"]');
    // Verify Timeline item1 content has title
    const item1Title = contentItem1.locator('[data-slot="timeline-title"]');
    await expect(item1Title).toHaveText('Christian created a new project');

    // Verify Timeline item2
    const timelineItem2 = timelineRoot1.locator('[data-slot="timeline-item"]').nth(1);
    await expect(timelineItem2).toBeVisible();
    // Verify Timeline item2 has separator (separator is the line that connects the items)
    const separatorItem2 = timelineItem2.locator('[data-slot="timeline-separator"]')
    await expect(separatorItem2.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    // Verify Timeline item2 has content
    const contentItem2 = timelineItem2.locator('[data-slot="timeline-content"]');
    // Verify Timeline item2 content has title and text
    const item2Title = contentItem2.locator('[data-slot="timeline-title"]');
    await expect(item2Title.getByText('Christian changed status from')).toBeVisible();
    await expect(item2Title.getByText('In progress')).toBeVisible();
    await expect(item2Title.getByText('Completed')).toBeVisible();
}

export async function testTimelineSizes(page: Page){
    // Verify that timeline sizes is visible
    const timelineSizes = page.locator('#timeline-sizes');
    await expect(timelineSizes).toBeVisible();

    // Verify that small timeline items are present
    const smallSection = timelineSizes.locator('div').filter({ hasText: 'Small' });
    // Verify that timeline has timeline-root elements
    const timelineRootSM = smallSection.locator('[data-slot="timeline-root"]');
    // Verify Timeline item1 (Product Shipped)
    const timelineItemSM1 = timelineRootSM.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItemSM1).toBeVisible();
    // Verify Timeline item1 has separator (separator is the line that connects the items)
    const separatorItemSM1 = timelineItemSM1.locator('[data-slot="timeline-separator"]')
    const indicatorItemSM1 = separatorItemSM1.locator('[data-slot="timeline-indicator"]');
    await expect(indicatorItemSM1).toBeVisible();
    // Verify that indicatorItem1 has the expected classes
    const classListSM = await indicatorItemSM1.getAttribute('class');
    expect(classListSM).toContain('size-5');
    await expect(separatorItemSM1.locator('[data-slot="timeline-connector"]')).toBeVisible();
    // Verify Timeline item1 has content
    const contentItemSM1 = timelineItemSM1.locator('[data-slot="timeline-content"]');
    // Verify Timeline item1 content has title
    const item1Title = contentItemSM1.locator('[data-slot="timeline-title"]');
    await expect(item1Title).toHaveText('Product Shipped');
    // Verify Timeline item2 (Order Confirmed)
    const timelineItemSM2 = timelineRootSM.locator('[data-slot="timeline-item"]').nth(1);
    await expect(timelineItemSM2).toBeVisible();
    // Verify Timeline item2 has separator (separator is the line that connects the items)
    const separatorItemSM2 = timelineItemSM2.locator('[data-slot="timeline-separator"]')
    await expect(separatorItemSM2.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    // Verify Timeline item2 has content
    const contentItemSM2 = timelineItemSM2.locator('[data-slot="timeline-content"]');
    // Verify Timeline item2 content has title
    const item2Title = contentItemSM2.locator('[data-slot="timeline-title"]');
    await expect(item2Title).toHaveText('Order Confirmed');

    // Verify that Medium timeline items are present
    const mediumSection = timelineSizes.locator('div').filter({ hasText: 'Medium' });
    // Verify that timeline has timeline-root elements
    const timelineRootMD = mediumSection.locator('[data-slot="timeline-root"]').nth(1);
    // Verify Timeline itemMD1 (Product Shipped)
    const timelineItemMD1 = timelineRootMD.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItemMD1).toBeVisible();
    // Verify Timeline item1 has separator (separator is the line that connects the items)
    const separatorItemMD1 = timelineItemMD1.locator('[data-slot="timeline-separator"]')
    const indicatorItemMD1 = separatorItemMD1.locator('[data-slot="timeline-indicator"]');
    await expect(indicatorItemMD1).toBeVisible();
    // Verify that indicatorItemMD1 has the expected classes
    const classListMD = await indicatorItemMD1.getAttribute('class');
    expect(classListMD).toContain('size-8');

    // Verify that Large timeline items are present
    const largeSection = timelineSizes.locator('div').filter({ hasText: 'Large' });
    // Verify that timeline has timeline-root elements
    const timelineRootLG = largeSection.locator('[data-slot="timeline-root"]').nth(2);
    // Verify Timeline itemLG1 (Product Shipped)
    const timelineItemLG1 = timelineRootLG.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItemLG1).toBeVisible();
    // Verify Timeline itemLG1 has separator (separator is the line that connects the items)
    const separatorItemLG1 = timelineItemLG1.locator('[data-slot="timeline-separator"]')
    const indicatorItemLG1 = separatorItemLG1.locator('[data-slot="timeline-indicator"]');
    await expect(indicatorItemLG1).toBeVisible();
    // Verify that indicatorItemLG1 has the expected classes
    const classListLG = await indicatorItemLG1.getAttribute('class');
    expect(classListLG).toContain('size-10');
}

export async function testTimelineConnectors(page: Page){
    // Verify that timeline connectors section is visible
    const connectorsSection = page.locator('#timeline-connectors');
    await expect(connectorsSection).toBeVisible();

    // Verify that display solid connector timeline
    const solidSection = connectorsSection.locator('div').filter({ hasText: 'Solid' });
    // Verify that timeline has timeline-root elements
    const timelineRootSL = solidSection.locator('[data-slot="timeline-root"]').nth(0);
    // Verify Timeline item1 (Product Shipped)
    const timelineItemSL1 = timelineRootSL.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItemSL1).toBeVisible();
    // Verify Timeline item1 has separator (separator is the line that connects the items)
    const separatorItemSL1 = timelineItemSL1.locator('[data-slot="timeline-separator"]')
    const indicatorItemSL1 = separatorItemSL1.locator('[data-slot="timeline-indicator"]');
    await expect(indicatorItemSL1).toBeVisible();
    await expect(separatorItemSL1.locator('[data-slot="timeline-connector"]')).toBeVisible();
    // Verify Timeline item1 has content
    const contentItemSL1 = timelineItemSL1.locator('[data-slot="timeline-content"]');
    // Verify Timeline item1 content has title
    const item1Title = contentItemSL1.locator('[data-slot="timeline-title"]');
    await expect(item1Title).toHaveText('Step 1');
    // Verify Timeline item2 (Order Confirmed)
    const timelineItemSL2 = timelineRootSL.locator('[data-slot="timeline-item"]').nth(1);
    await expect(timelineItemSL2).toBeVisible();
    // Verify Timeline item2 has separator (separator is the line that connects the items)
    const separatorItemSL2 = timelineItemSL2.locator('[data-slot="timeline-separator"]')
    await expect(separatorItemSL2.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    // Verify Timeline item2 has content
    const contentItemSL2 = timelineItemSL2.locator('[data-slot="timeline-content"]');
    // Verify Timeline item2 content has title
    const item2Title = contentItemSL2.locator('[data-slot="timeline-title"]');
    await expect(item2Title).toHaveText('Step 2');

    // Verify that display dashed connector timeline
    const dashedSection = connectorsSection.locator('div').filter({ hasText: 'Dashed' });
    // Verify that timeline has timeline-root elements
    const timelineRootDS = dashedSection.locator('[data-slot="timeline-root"]').nth(1);
    // Verify Timeline item1 (Product Shipped)
    const timelineItemDS1 = timelineRootDS.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItemDS1).toBeVisible();
    // Verify Timeline item1 has separator (separator is the line that connects the items)
    const separatorItemDS1 = timelineItemDS1.locator('[data-slot="timeline-separator"]')
    await expect(separatorItemDS1.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    const connectorItemDS1 = separatorItemDS1.locator('[data-slot="timeline-connector"]');
    await expect(connectorItemDS1).toBeVisible();
    // Verify that connector has the expected classes
    const classListDS = await connectorItemDS1.getAttribute('class');
    expect(classListDS).toContain('border-dashed');

    // Verify that display dotted connector timeline
    const dottedSection = connectorsSection.locator('div').filter({ hasText: 'Dotted' });
    // Verify that timeline has timeline-root elements
    const timelineRootDT = dottedSection.locator('[data-slot="timeline-root"]').nth(2);
    // Verify Timeline item1 (Product Shipped)
    const timelineItemDT1 = timelineRootDT.locator('[data-slot="timeline-item"]').nth(0);
    await expect(timelineItemDT1).toBeVisible();
    // Verify Timeline item1 has separator (separator is the line that connects the items)
    const separatorItemDT1 = timelineItemDT1.locator('[data-slot="timeline-separator"]')
    await expect(separatorItemDT1.locator('[data-slot="timeline-indicator"]')).toBeVisible();
    const connectorItemDT1 = separatorItemDT1.locator('[data-slot="timeline-connector"]');
    await expect(connectorItemDT1).toBeVisible();
    // Verify that connector has the expected classes
    const classListDT = await connectorItemDT1.getAttribute('class');
    expect(classListDT).toContain('border-dotted');
}