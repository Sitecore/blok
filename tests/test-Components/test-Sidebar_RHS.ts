import { test, expect, Page } from '@playwright/test';

export async function testSidebarRHS(page: Page){
    // Verify that display sidebar RHS default component
    const sidebarRHS = page.locator('[id="sidebar-rhs"]');
    await expect(sidebarRHS).toBeVisible();

    // Verify that sidebar RHS Main content area is visible
    const mainContent = sidebarRHS.locator('main[class="flex-1 overflow-auto p-4"]');
    await expect(mainContent).toBeVisible();
    // Verify that Title is visible
    await expect(mainContent.locator('h2')).toHaveText('Main Content Area');
    // Verify that Description is visible
    await expect(mainContent.locator('p')).toContainText('This sidebar demonstrates a simple heading-only header. This is the default style for the sidebar component.');

    // Verify that sidebar RHS Separator is visible
    const separator = sidebarRHS.locator('[role="separator"]');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('aria-label', 'Resize sidebar');
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    // Verify that the class attributes are present
    const separatorClasses = await separator.getAttribute('class');
    await expect(separatorClasses).toContain('absolute');
    await expect(separatorClasses).toContain('-left-1');
    await expect(separatorClasses).toContain('top-0 bottom-0');
    await expect(separatorClasses).toContain('w-2');
    await expect(separatorClasses).toContain('cursor-ew-resize');
    await expect(separatorClasses).toContain('z-20');
    await expect(separatorClasses).toContain('hover:bg-primary/20');
    await expect(separatorClasses).toContain('transition-colors group');

    // Verify that sidebar RHS Collapse button is visible
    const collapseButton = sidebarRHS.getByRole('button', { name: 'Collapse sidebar' });
    await expect(collapseButton).toBeVisible();

    // Verify that sidebar RHS sidebar is visible
    const sidebar = sidebarRHS.locator('[class="flex h-full flex-col w-full overflow-hidden opacity-100 transition-opacity duration-200"]');
    await expect(sidebar).toBeVisible();

    // Verify that Title is visible
    await expect(sidebar.locator('h2')).toHaveText('Sidebar RHS');
    // Verify that Undock button is visible
    const undockButton = sidebar.getByRole('button', { name: 'Undock sidebar' });
    await expect(undockButton).toBeVisible();

    // Verify that Sidebar content is visible
    const sidebarContent = sidebar.locator('[data-slot="card"]');
    await expect(sidebarContent).toBeVisible();
    // Verify that Card Header is visible
    const cardHeader = sidebarContent.locator('[data-slot="card-header"]');
    await expect(cardHeader).toBeVisible();
    // Verify that Card Title is visible
    const cardTitle = sidebarContent.locator('[data-slot="card-title"]');
    await expect(cardTitle).toContainText('Sidebar Content');
    // Verify that Card Description is visible
    const cardDescription = sidebarContent.locator('[data-slot="card-description"]');
    await expect(cardDescription).toContainText('This sidebar uses a simple heading in the header');
    // Verify that Card Content is visible
    const cardContent = sidebarContent.locator('[data-slot="card-content"]');
    await expect(cardContent).toBeVisible();
    await expect(cardContent).toContainText('The header contains just a simple title text, which is the default behavior for the sidebar component.');

    // Verify that sidebar is collaps when collapse button is clicked
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    await collapseButton.click();
    const collapsedSidebar = sidebarRHS.getByRole('button', { name: 'Expand sidebar' });
    await expect(collapsedSidebar).toHaveAttribute('aria-label', 'Expand sidebar');
    await page.waitForTimeout(500);
    await collapsedSidebar.click();
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');

    // Verify that sidebar is undock when undock button is clicked
    await undockButton.click();
    const undockedSidebar = page.locator('[class="fixed z-50 bg-body-bg border border-border rounded-lg shadow-lg overflow-hidden transition-all ease-in-out duration-200"]');
    await expect(undockedSidebar).toBeVisible();

    // Verify that sidebar is dock when dock button is clicked
    const dockedButton = undockedSidebar.locator('[data-slot="button"][aria-label="Dock sidebar"]');
    await expect(dockedButton).toBeVisible();
    await dockedButton.click();
    await expect(dockedButton).toBeHidden();
    await expect(undockButton).toBeVisible();
}

export async function testSidebarRHSTabs(page: Page){
    // Verify that display sidebar RHS Heading with Tabscomponent
    const sidebarRHS = page.locator('[id="sidebar-rhs-tabs"]');
    await expect(sidebarRHS).toBeVisible();

    // Verify that sidebar RHS Main content area is visible
    const mainContent = sidebarRHS.locator('main[class="flex-1 overflow-auto p-4"]');
    await expect(mainContent).toBeVisible();
    // Verify that Title is visible
    await expect(mainContent.locator('h2')).toHaveText('Main Content Area');
    // Verify that Description is visible
    await expect(mainContent.locator('p')).toContainText('This sidebar demonstrates a header with stack navigation horizontal tabs. Click on the tabs in the sidebar header to see them in action.');

    // Verify that sidebar RHS Separator is visible
    const separator = sidebarRHS.locator('[role="separator"]');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('aria-label', 'Resize sidebar');
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    // Verify that the class attributes are present
    const separatorClasses = await separator.getAttribute('class');
    await expect(separatorClasses).toContain('absolute');
    await expect(separatorClasses).toContain('-left-1');
    await expect(separatorClasses).toContain('top-0 bottom-0');
    await expect(separatorClasses).toContain('w-2');
    await expect(separatorClasses).toContain('cursor-ew-resize');
    await expect(separatorClasses).toContain('z-20');
    await expect(separatorClasses).toContain('hover:bg-primary/20');
    await expect(separatorClasses).toContain('transition-colors group');

    // Verify that sidebar RHS Collapse button is visible
    const collapseButton = sidebarRHS.getByRole('button', { name: 'Collapse sidebar' });
    await expect(collapseButton).toBeVisible();

    // Verify that sidebar RHS sidebar is visible
    const sidebar = sidebarRHS.locator('[class="flex h-full flex-col w-full overflow-hidden opacity-100 transition-opacity duration-200"]');
    await expect(sidebar).toBeVisible();

    // Verify that navigation tabs are visible
    // Verify that Overview tab is visible
    const overviewTab = sidebar.locator('span[title="Overview"]');
    await expect(overviewTab).toBeVisible();
    // Verify that Overview description is visible
    const overviewDescription = sidebar.locator('[class="flex flex-col gap-3"]').nth(0);
    await expect(overviewDescription.locator('h3')).toHaveText('Description');
    await expect(overviewDescription.locator('p')).toContainText('Sitecore is a leading digital experience platform that empowers organizations to create, manage, and deliver personalized content across all channels. With its powerful content management system, mark');
    await expect(overviewDescription.locator('button')).toHaveText('Read more');
    // Verify that Overview content is visible
    const overviewContent = sidebar.locator('[class="flex flex-col gap-3"]').nth(1);
    await expect(overviewContent.locator('h3')).toHaveText('To do');
    await expect(overviewContent.locator('button[data-slot="checkbox"]').nth(0)).toBeVisible();
    await expect(overviewContent.locator('span[data-slot="badge"]')).toHaveText('@Anne Schmeler');
    await expect(overviewContent.locator('button[data-slot="checkbox"]').nth(1)).toBeVisible();
    await expect(overviewContent.locator('input[data-slot="input"]')).toHaveAttribute('placeholder', 'Add new to-do, type @ to mention someone');
    
    // Verify that Versions tab is visible
    const versionsTab = sidebar.locator('span[title="Versions"]');
    await expect(versionsTab).toBeVisible();
    // Verify that Versions description is visible
    await versionsTab.click();
    const versionsDescription = sidebar.locator('[class="flex flex-col gap-4"]');
    await expect(versionsDescription.locator('h3').nth(0)).toHaveText('Versions');
    await expect(versionsDescription.locator('button[data-slot="button"]')).toHaveText('Create version');
    const versionsAccordion = versionsDescription.locator('[data-slot="accordion"]');
    await expect(versionsAccordion.locator('[data-slot="accordion-item"]')).toHaveCount(5);

    // Verify that Usage tab is visible
    const usageTab = sidebar.locator('span[title="Usage"]');
    await expect(usageTab).toBeVisible();
    // Verify that Versions description is visible
    await usageTab.click();
    const usageTabs = sidebar.locator('[data-slot="tabs"]');
    const usageTabList = usageTabs.locator('[data-slot="tabs-list"]');
    // Verify that Used by button and content is visible
    const usedBy = usageTabList.locator('[data-slot="tabs-trigger"]').getByText('Used by');
    await expect(usedBy).toBeVisible();
    const usedByContent = usageTabs.locator('[data-slot="tabs-content"]').nth(0);
    await expect(usedByContent).toHaveAttribute('data-state', 'active');
    await expect(usedByContent).toHaveAttribute('data-orientation', 'horizontal');
    await expect(usedByContent).toHaveAttribute('role', 'tabpanel');
    // Verify that Using button and content is visible
    const using = usageTabList.locator('[data-slot="tabs-trigger"]').getByText('Using');
    await expect(using).toBeVisible();
    await using.click();
    const usingContent = usageTabs.locator('[data-slot="tabs-content"]').nth(1);
    await expect(usingContent).toHaveAttribute('data-state', 'active');
    await expect(usingContent).toHaveAttribute('data-orientation', 'horizontal');
    await expect(usingContent).toHaveAttribute('role', 'tabpanel');

    // Verify that Undock button is visible
    const undockButton = sidebar.getByRole('button', { name: 'Undock sidebar' });
    await expect(undockButton).toBeVisible();

    // Verify that sidebar is collaps when collapse button is clicked
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    await collapseButton.click();
    const collapsedSidebar = sidebarRHS.getByRole('button', { name: 'Expand sidebar' });
    await expect(collapsedSidebar).toHaveAttribute('aria-label', 'Expand sidebar');
    await page.waitForTimeout(500);
    await collapsedSidebar.click();
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');

    // Verify that sidebar is undock when undock button is clicked
    await undockButton.click();
    const undockedSidebar = page.locator('[class="fixed z-50 bg-body-bg border border-border rounded-lg shadow-lg overflow-hidden transition-all ease-in-out duration-200"]');
    await expect(undockedSidebar).toBeVisible();

    // Verify that sidebar is dock when dock button is clicked
    const dockedButton = undockedSidebar.locator('[data-slot="button"][aria-label="Dock sidebar"]');
    await expect(dockedButton).toBeVisible();
    await dockedButton.click();
    await expect(dockedButton).toBeHidden();
    await expect(undockButton).toBeVisible();
}

export async function testSidebarRHSBrief(page: Page){
    // Verify that display sidebar RHS Brief component
    const sidebarRHS = page.locator('[id="sidebar-rhs-brief"]');
    await expect(sidebarRHS).toBeVisible();

    // Verify that sidebar RHS Main content area is visible
    const mainContent = sidebarRHS.locator('main[class="flex-1 overflow-auto p-4"]');
    await expect(mainContent).toBeVisible();
    // Verify that Title is visible
    await expect(mainContent.locator('h2')).toHaveText('Main Content Area');
    // Verify that Description is visible
    await expect(mainContent.locator('p')).toContainText('This sidebar demonstrates a header with stack navigation horizontal tabs. Click on the tabs in the sidebar header to see them in action.');

    // Verify that sidebar RHS Separator is visible
    const separator = sidebarRHS.locator('[role="separator"]');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('aria-label', 'Resize sidebar');
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    // Verify that the class attributes are present
    const separatorClasses = await separator.getAttribute('class');
    await expect(separatorClasses).toContain('absolute');
    await expect(separatorClasses).toContain('-left-1');
    await expect(separatorClasses).toContain('top-0 bottom-0');
    await expect(separatorClasses).toContain('w-2');
    await expect(separatorClasses).toContain('cursor-ew-resize');
    await expect(separatorClasses).toContain('z-20');
    await expect(separatorClasses).toContain('hover:bg-primary/20');
    await expect(separatorClasses).toContain('transition-colors group');

    // Verify that sidebar RHS Collapse button is visible
    const collapseButton = sidebarRHS.getByRole('button', { name: 'Collapse sidebar' });
    await expect(collapseButton).toBeVisible();

    // Verify that sidebar RHS sidebar is visible
    const sidebar = sidebarRHS.locator('[class="flex h-full flex-col w-full overflow-hidden opacity-100 transition-opacity duration-200"]');
    await expect(sidebar).toBeVisible();

    // Verify that navigation tabs are visible
    // Verify that Overview tab is visible
    const overviewTab = sidebar.locator('span[title="Overview"]');
    await expect(overviewTab).toBeVisible();
    // Verify that Overview description is visible
    const overviewDescription = sidebar.locator('[class="flex flex-col gap-3"]').nth(0);
    await expect(overviewDescription.locator('h3')).toHaveText('Description');
    await expect(overviewDescription.locator('p')).toContainText('Sitecore is a leading digital experience platform that empowers organizations to create, manage, and deliver personalized content across all channels. With its powerful content management system, mark');
    await expect(overviewDescription.locator('button')).toHaveText('Read more');
    // Verify that Overview content is visible
    const overviewContent = sidebar.locator('[class="flex flex-col gap-3"]').nth(1);
    await expect(overviewContent.locator('h3')).toHaveText('To do');
    await expect(overviewContent.locator('button[data-slot="checkbox"]').nth(0)).toBeVisible();
    await expect(overviewContent.locator('span[data-slot="badge"]')).toHaveText('@Anne Schmeler');
    await expect(overviewContent.locator('button[data-slot="checkbox"]').nth(1)).toBeVisible();
    await expect(overviewContent.locator('input[data-slot="input"]')).toHaveAttribute('placeholder', 'Add new to-do, type @ to mention someone');

    // Verify that Comment tab is visible
    const commentTab = sidebar.locator('span[title="Comment"]');
    await expect(commentTab).toBeVisible();
    // Verify that Comment description is visible
    await commentTab.click();
    await expect(sidebar.locator('[class="flex gap-3"]')).toHaveCount(4);

    // Verify that Info tab is visible
    const infoTab = sidebar.locator('span[title="Info"]');
    await expect(infoTab).toBeVisible();
    // Verify that Info description is visible
    await infoTab.click();
    await expect(sidebar.locator('h3')).toHaveText('Details');
    await expect(sidebar.locator('[class="flex flex-col gap-1"]')).toHaveCount(5);
    
    // Verify that Undock button is visible
    const undockButton = sidebar.getByRole('button', { name: 'Undock sidebar' });
    await expect(undockButton).toBeVisible();

    // Verify that sidebar is collaps when collapse button is clicked
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    await collapseButton.click();
    const collapsedSidebar = sidebarRHS.getByRole('button', { name: 'Expand sidebar' });
    await expect(collapsedSidebar).toHaveAttribute('aria-label', 'Expand sidebar');
    await page.waitForTimeout(500);
    await collapsedSidebar.click();
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');

    // Verify that sidebar is undock when undock button is clicked
    await undockButton.click();
    const undockedSidebar = page.locator('[class="fixed z-50 bg-body-bg border border-border rounded-lg shadow-lg overflow-hidden transition-all ease-in-out duration-200"]');
    await expect(undockedSidebar).toBeVisible();

    // Verify that sidebar is dock when dock button is clicked
    const dockedButton = undockedSidebar.locator('[data-slot="button"][aria-label="Dock sidebar"]');
    await expect(dockedButton).toBeVisible();
    await dockedButton.click();
    await expect(dockedButton).toBeHidden();
    await expect(undockButton).toBeVisible();
}

export async function testSidebarRHSBriefType(page: Page){
    // Verify that display sidebar RHS Brief Type component
    const sidebarRHS = page.locator('[id="sidebar-rhs-brief-type"]');
    await expect(sidebarRHS).toBeVisible();

    // Verify that sidebar RHS Main content area is visible
    const mainContent = sidebarRHS.locator('main[class="flex-1 overflow-auto p-4"]');
    await expect(mainContent).toBeVisible();
    // Verify that Title is visible
    await expect(mainContent.locator('h2')).toHaveText('Main Content Area');
    // Verify that Description is visible
    await expect(mainContent.locator('p')).toContainText('This sidebar demonstrates a brief-type example with horizontal tabs for Overview, Usage, Comment, and Info.');

    // Verify that sidebar RHS Separator is visible
    const separator = sidebarRHS.locator('[role="separator"]');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('aria-label', 'Resize sidebar');
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    // Verify that the class attributes are present
    const separatorClasses = await separator.getAttribute('class');
    await expect(separatorClasses).toContain('absolute');
    await expect(separatorClasses).toContain('-left-1');
    await expect(separatorClasses).toContain('top-0 bottom-0');
    await expect(separatorClasses).toContain('w-2');
    await expect(separatorClasses).toContain('cursor-ew-resize');
    await expect(separatorClasses).toContain('z-20');
    await expect(separatorClasses).toContain('hover:bg-primary/20');
    await expect(separatorClasses).toContain('transition-colors group');

    // Verify that sidebar RHS Collapse button is visible
    const collapseButton = sidebarRHS.getByRole('button', { name: 'Collapse sidebar' });
    await expect(collapseButton).toBeVisible();

    // Verify that sidebar RHS sidebar is visible
    const sidebar = sidebarRHS.locator('[class="flex h-full flex-col w-full overflow-hidden opacity-100 transition-opacity duration-200"]');
    await expect(sidebar).toBeVisible();

    // Verify that navigation tabs are visible
    // Verify that Overview tab is visible
    const overviewTab = sidebar.locator('span[title="Overview"]');
    await expect(overviewTab).toBeVisible();
    // Verify that Overview description is visible
    await overviewTab.click();
    const overviewDescription = sidebar.locator('[class="flex flex-col gap-3"]').nth(0);
    await expect(overviewDescription.locator('h3')).toHaveText('Description');
    await expect(overviewDescription.locator('p')).toContainText('Sitecore is a leading digital experience platform that empowers organizations to create, manage, and deliver personalized content across all channels. With its powerful content management system, mark');
    await expect(overviewDescription.locator('button')).toHaveText('Read more');
    
    // Verify that Usage tab is visible
    const usageTab = sidebar.locator('span[title="Usage"]');
    await expect(usageTab).toBeVisible();
    // Verify that Versions description is visible
    await usageTab.click();
    const usageTabContent = sidebar.locator('[class="flex flex-col gap-4"]');
    await expect(usageTabContent.locator('h3')).toHaveText('Briefs that are using this brief type');
    // Verify that search input is visible
    await expect(usageTabContent.locator('[data-slot="search-input"]')).toBeVisible();
    // Verify that content is visible
    const Content = usageTabContent.locator('[class="flex flex-col"]');
    await expect(Content.locator('[class="flex items-start justify-between py-2 first:pt-0"]')).toHaveCount(5);

    // Verify that Comment tab is visible
    const commentTab = sidebar.locator('span[title="Comment"]');
    await expect(commentTab).toBeVisible();
    // Verify that Comment description is visible
    await commentTab.click();
    await expect(sidebar.locator('[class="flex gap-3"]')).toHaveCount(4);

    // Verify that Info tab is visible
    const infoTab = sidebar.locator('span[title="Info"]');
    await expect(infoTab).toBeVisible();
    // Verify that Info description is visible
    await infoTab.click();
    await expect(sidebar.locator('h3')).toHaveText('Details');
    await expect(sidebar.locator('[class="flex flex-col gap-1"]')).toHaveCount(5);
    
    // Verify that Undock button is visible
    const undockButton = sidebar.getByRole('button', { name: 'Undock sidebar' });
    await expect(undockButton).toBeVisible();

    // Verify that sidebar is collaps when collapse button is clicked
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    await collapseButton.click();
    const collapsedSidebar = sidebarRHS.getByRole('button', { name: 'Expand sidebar' });
    await expect(collapsedSidebar).toHaveAttribute('aria-label', 'Expand sidebar');
    await page.waitForTimeout(500);
    await collapsedSidebar.click();
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');

    // Verify that sidebar is undock when undock button is clicked
    await undockButton.click();
    const undockedSidebar = page.locator('[class="fixed z-50 bg-body-bg border border-border rounded-lg shadow-lg overflow-hidden transition-all ease-in-out duration-200"]');
    await expect(undockedSidebar).toBeVisible();

    // Verify that sidebar is dock when dock button is clicked
    const dockedButton = undockedSidebar.locator('[data-slot="button"][aria-label="Dock sidebar"]');
    await expect(dockedButton).toBeVisible();
    await dockedButton.click();
    await expect(dockedButton).toBeHidden();
    await expect(undockButton).toBeVisible();
}

export async function testSidebarRHSContent(page: Page){
    // Verify that display sidebar RHS Content component
    const sidebarRHS = page.locator('[id="sidebar-rhs-content"]');
    await expect(sidebarRHS).toBeVisible();

    // Verify that sidebar RHS Main content area is visible
    const mainContent = sidebarRHS.locator('main[class="flex-1 overflow-auto p-4"]');
    await expect(mainContent).toBeVisible();
    // Verify that Title is visible
    await expect(mainContent.locator('h2')).toHaveText('Main Content Area');
    // Verify that Description is visible
    await expect(mainContent.locator('p')).toContainText('This sidebar demonstrates a header with stack navigation horizontal tabs. Click on the tabs in the sidebar header to see them in action.');

    // Verify that sidebar RHS Separator is visible
    const separator = sidebarRHS.locator('[role="separator"]');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('aria-label', 'Resize sidebar');
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    // Verify that the class attributes are present
    const separatorClasses = await separator.getAttribute('class');
    await expect(separatorClasses).toContain('absolute');
    await expect(separatorClasses).toContain('-left-1');
    await expect(separatorClasses).toContain('top-0 bottom-0');
    await expect(separatorClasses).toContain('w-2');
    await expect(separatorClasses).toContain('cursor-ew-resize');
    await expect(separatorClasses).toContain('z-20');
    await expect(separatorClasses).toContain('hover:bg-primary/20');
    await expect(separatorClasses).toContain('transition-colors group');

    // Verify that sidebar RHS Collapse button is visible
    const collapseButton = sidebarRHS.getByRole('button', { name: 'Collapse sidebar' });
    await expect(collapseButton).toBeVisible();

    // Verify that sidebar RHS sidebar is visible
    const sidebar = sidebarRHS.locator('[class="flex h-full flex-col w-full overflow-hidden opacity-100 transition-opacity duration-200"]');
    await expect(sidebar).toBeVisible();

    // Verify that navigation tabs are visible
    // Verify that Overview tab is visible
    const overviewTab = sidebar.locator('span[title="Overview"]');
    await expect(overviewTab).toBeVisible();
    // Verify that Overview content is visible
    await overviewTab.click();
    const overviewContent = sidebar.locator('[class="flex flex-col gap-4"]');
    await expect(overviewContent.locator('label').nth(0)).toHaveText('Total Variants');
    await expect(overviewContent.locator('span').nth(0)).toHaveText('18');
    await expect(overviewContent.getByText('3 Draft')).toHaveText('3 Draft');
    await expect(overviewContent.getByText('3 Active')).toHaveText('3 Active');
    await expect(overviewContent.locator('label').nth(1)).toHaveText('Sites');
    await expect(overviewContent.locator('span').nth(3)).toHaveText('3');
    // Verify that Overview description is visible
    const overviewDescription = sidebar.locator('[class="flex flex-col gap-3"]');
    await expect(overviewDescription.locator('h3')).toHaveText('Description');
    await expect(overviewDescription.locator('p')).toContainText('Sitecore is a leading digital experience platform that empowers organizations to create, manage, and deliver personalized content across all channels. With its powerful content management system, mark');
    await expect(overviewDescription.locator('button')).toHaveText('Read more');
    
    // Verify that Usage tab is visible
    const usageTab = sidebar.locator('span[title="Usage"]');
    await expect(usageTab).toBeVisible();
    // Verify that Versions description is visible
    await usageTab.click();
    const usageTabs = sidebar.locator('[data-slot="tabs"]');
    const usageTabList = usageTabs.locator('[data-slot="tabs-list"]');
    // Verify that Used by button and content is visible
    const Insights = usageTabList.locator('[data-slot="tabs-trigger"]').getByText('Insights');
    await expect(Insights).toBeVisible();
    const InsightsContent = usageTabs.locator('[data-slot="tabs-content"]').nth(0);
    await expect(InsightsContent).toHaveAttribute('data-state', 'active');
    await expect(InsightsContent).toHaveAttribute('data-orientation', 'horizontal');
    await expect(InsightsContent).toHaveAttribute('role', 'tabpanel');
    // Verify that Using button and content is visible
    const Sites = usageTabList.locator('[data-slot="tabs-trigger"]').getByText('Sites');
    await expect(Sites).toBeVisible();
    await Sites.click();
    const SitesContent = usageTabs.locator('[data-slot="tabs-content"]').nth(1);
    await expect(SitesContent).toHaveAttribute('data-state', 'active');
    await expect(SitesContent).toHaveAttribute('data-orientation', 'horizontal');
    await expect(SitesContent).toHaveAttribute('role', 'tabpanel');

    // Verify that Info tab is visible
    const infoTab = sidebar.locator('span[title="Info"]');
    await expect(infoTab).toBeVisible();
    // Verify that Info description is visible
    await infoTab.click();
    await expect(sidebar.locator('h3')).toHaveText('Details');
    await expect(sidebar.locator('[class="flex flex-col gap-1"]')).toHaveCount(5);
    
    // Verify that Undock button is visible
    const undockButton = sidebar.getByRole('button', { name: 'Undock sidebar' });
    await expect(undockButton).toBeVisible();

    // Verify that sidebar is collaps when collapse button is clicked
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    await collapseButton.click();
    const collapsedSidebar = sidebarRHS.getByRole('button', { name: 'Expand sidebar' });
    await expect(collapsedSidebar).toHaveAttribute('aria-label', 'Expand sidebar');
    await page.waitForTimeout(500);
    await collapsedSidebar.click();
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');

    // Verify that sidebar is undock when undock button is clicked
    await undockButton.click();
    const undockedSidebar = page.locator('[class="fixed z-50 bg-body-bg border border-border rounded-lg shadow-lg overflow-hidden transition-all ease-in-out duration-200"]');
    await expect(undockedSidebar).toBeVisible();

    // Verify that sidebar is dock when dock button is clicked
    const dockedButton = undockedSidebar.locator('[data-slot="button"][aria-label="Dock sidebar"]');
    await expect(dockedButton).toBeVisible();
    await dockedButton.click();
    await expect(dockedButton).toBeHidden();
    await expect(undockButton).toBeVisible();
}