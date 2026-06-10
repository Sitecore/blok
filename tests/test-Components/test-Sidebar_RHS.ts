import { test, expect, Page } from '@playwright/test';

export async function testSidebarRHS(page: Page){
    // Verify that display sidebar RHS default component
    const sidebarRHS = page.locator('[id="sidebar-rhs"]');
    await expect(sidebarRHS).toBeVisible();

    // Verify that sidebar RHS Main content area is visible
    const mainContent = sidebarRHS.locator('main[class="flex-1 overflow-auto bg-subtle-bg p-4"]');
    await expect(mainContent).toBeVisible();
    // Verify that Title is visible
    await expect(mainContent.locator('h2')).toHaveText('Main Content Area');
    // Verify that Description is visible
    await expect(mainContent.locator('p')).toContainText('Collapsible sidebar with stacked navigation tabs. Pass any content as children of SidebarRHS.');

    // Verify that sidebar RHS Separator is visible
    const separator = sidebarRHS.locator('[role="separator"]');
    await expect(separator).toBeVisible();
    await expect(separator).toHaveAttribute('aria-label', 'Resize sidebar');
    await expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    // Verify that the class attributes are present
    const separatorClasses = await separator.getAttribute('class');
    await expect(separatorClasses).toContain('absolute');
    await expect(separatorClasses).toContain('left-0');
    await expect(separatorClasses).toContain('top-0');
    await expect(separatorClasses).toContain('bottom-0');
    await expect(separatorClasses).toContain('w-2');
    await expect(separatorClasses).toContain('cursor-ew-resize');
    await expect(separatorClasses).toContain('z-20');
    await expect(separatorClasses).toContain('group/resize');

    // Verify that sidebar RHS Collapse button is visible
    const collapseButton = sidebarRHS.getByRole('button', { name: 'Collapse sidebar' });
    await expect(collapseButton).toBeVisible();

    // Verify that sidebar RHS sidebar is visible
    const sidebar = sidebarRHS.locator('[class="flex h-full flex-col w-full overflow-hidden opacity-100 transition-opacity duration-200"]');
    await expect(sidebar).toBeVisible();

    // Verify that sidebar is collaps when collapse button is clicked
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');
    await collapseButton.click();
    const collapsedSidebar = sidebarRHS.getByRole('button', { name: 'Expand sidebar' });
    await expect(collapsedSidebar).toHaveAttribute('aria-label', 'Expand sidebar');
    await page.waitForTimeout(500);
    await collapsedSidebar.click();
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse sidebar');

    // Verify that navigation tabs are visible
    // Verify that Overview tab is visible
    const overviewTab = sidebar.locator('span[title="Overview"]');
    await expect(overviewTab).toBeVisible();
    // Verify that Overview description is visible
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
    await expect(usageTabContent.locator('p[class="text-sm text-muted-foreground"]')).toContainText('Briefs that are using this brief type');
    // Verify that search input is visible
    await expect(usageTabContent.locator('[data-slot="search-input"]')).toBeVisible();
    // Verify that content is visible
    const Content = usageTabContent.locator('[class="flex flex-col"]');
    await expect(Content.locator('[class="flex items-center gap-3 rounded-lg p-2"]')).toHaveCount(12);

    // Verify that Comment tab is visible
    const commentTab = sidebar.locator('span[title="Comments"]');
    await expect(commentTab).toBeVisible();
    // Verify that Comment description is visible
    await commentTab.click();
    const commentTabContent = sidebar.locator('[class="flex-1 min-h-0 overflow-auto px-6 py-4"]');
    await expect(commentTabContent.locator('p')).toContainText('Comments tab content.');

    // Verify that Info tab is visible
    const infoTab = sidebar.locator('span[title="Info"]');
    await expect(infoTab).toBeVisible();
    // Verify that Info description is visible
    await infoTab.click();
    // Verify that Label is visible
    const labelContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(0);
    await expect(labelContent.locator('p')).toHaveText('Label');
    await expect(labelContent.locator('span')).toHaveText('The label');
    await expect(labelContent.locator('[data-slot="button"][aria-label="Copy label"]')).toBeVisible();
    // Verify that Name is visible
    const nameContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(1);
    await expect(nameContent.locator('p')).toHaveText('Name');
    await expect(nameContent.locator('span')).toHaveText('Value');
    await expect(nameContent.locator('[data-slot="button"][aria-label="Copy name"]')).toBeVisible();
    // Verify that Created by is visible
    const createdByContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(2);
    await expect(createdByContent.locator('p')).toHaveText('Created by');
    await expect(createdByContent.locator('span')).toHaveText('Value');
    // Verify that Created is visible
    const createdContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(3);
    await expect(createdContent.locator('p')).toHaveText('Created');
    await expect(createdContent.locator('span')).toHaveText('Person, Date');
    // Verify that Updated is visible
    const updatedContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(4);
    await expect(updatedContent.locator('p')).toHaveText('Updated');
    await expect(updatedContent.locator('span')).toHaveText('Person, Date');
}

export async function testSidebarRHSFixed(page: Page){
    // Verify that display sidebar RHS fixed component
    const sidebarRHS = page.locator('[id="sidebar-rhs-fixed"]');
    await expect(sidebarRHS).toBeVisible();

    // Verify that sidebar RHS Main content area is visible
    const mainContent = sidebarRHS.locator('main[class="flex-1 overflow-auto bg-subtle-bg p-4"]');
    await expect(mainContent).toBeVisible();
    // Verify that Title is visible
    await expect(mainContent.locator('h2')).toHaveText('Main Content Area');
    // Verify that Description is visible
    await expect(mainContent.locator('p')).toContainText('Fixed sidebar — always visible with no collapse or resize controls.');

    // Verify that sidebar RHS sidebar is visible
    const sidebar = sidebarRHS.locator('[class="flex h-full flex-col w-full overflow-hidden opacity-100 transition-opacity duration-200"]');
    await expect(sidebar).toBeVisible();

    // Verify that navigation tabs are visible
    // Verify that Overview tab is visible
    const overviewTab = sidebar.locator('span[title="Overview"]');
    await expect(overviewTab).toBeVisible();
    // Verify that Overview description is visible
    await overviewTab.click();
    const overviewDescription = sidebar.locator('[class="flex flex-col gap-3"]');
    await expect(overviewDescription.locator('h3')).toHaveText('Description');
    await expect(overviewDescription.locator('p')).toContainText('A fixed sidebar stays open with no collapse control or left-edge resize interaction.');
    
    // Verify that Usage tab is visible
    const usageTab = sidebar.locator('span[title="Usage"]');
    await expect(usageTab).toBeVisible();
    // Verify that Versions description is visible
    await usageTab.click();
    const usageTabContent = sidebar.locator('[class="flex flex-col gap-4"]');
    await expect(usageTabContent.locator('p[class="text-sm text-muted-foreground"]')).toContainText('Briefs that are using this brief type');
    // Verify that search input is visible
    await expect(usageTabContent.locator('[data-slot="search-input"]')).toBeVisible();
    // Verify that content is visible
    const Content = usageTabContent.locator('[class="flex flex-col"]');
    await expect(Content.locator('[class="flex items-center gap-3 rounded-lg p-2"]')).toHaveCount(12);

    // Verify that Comment tab is visible
    const commentTab = sidebar.locator('span[title="Comments"]');
    await expect(commentTab).toBeVisible();
    // Verify that Comment description is visible
    await commentTab.click();
    const commentTabContent = sidebar.locator('[class="flex-1 min-h-0 overflow-auto px-6 py-4"]');
    await expect(commentTabContent.locator('p')).toContainText('Comments tab content.');

    // Verify that Info tab is visible
    const infoTab = sidebar.locator('span[title="Info"]');
    await expect(infoTab).toBeVisible();
    // Verify that Info description is visible
    await infoTab.click();
    // Verify that Label is visible
    const labelContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(0);
    await expect(labelContent.locator('p')).toHaveText('Label');
    await expect(labelContent.locator('span')).toHaveText('The label');
    await expect(labelContent.locator('[data-slot="button"][aria-label="Copy label"]')).toBeVisible();
    // Verify that Name is visible
    const nameContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(1);
    await expect(nameContent.locator('p')).toHaveText('Name');
    await expect(nameContent.locator('span')).toHaveText('Value');
    await expect(nameContent.locator('[data-slot="button"][aria-label="Copy name"]')).toBeVisible();
    // Verify that Created by is visible
    const createdByContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(2);
    await expect(createdByContent.locator('p')).toHaveText('Created by');
    await expect(createdByContent.locator('span')).toHaveText('Value');
    // Verify that Created is visible
    const createdContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(3);
    await expect(createdContent.locator('p')).toHaveText('Created');
    await expect(createdContent.locator('span')).toHaveText('Person, Date');
    // Verify that Updated is visible
    const updatedContent = sidebar.locator('[class="flex flex-col gap-1"]').nth(4);
    await expect(updatedContent.locator('p')).toHaveText('Updated');
    await expect(updatedContent.locator('span')).toHaveText('Person, Date');
}