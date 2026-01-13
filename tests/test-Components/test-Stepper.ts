import { test, expect, Page } from '@playwright/test';

export async function testStepper(page: Page){
    // Verify that stepper is visible
    const stepper = page.locator('#stepper');
    await expect(stepper).toBeVisible();

    // Verify Stepper container is visible
    const stepperContainer = stepper.locator('[class="flex items-center p-6 rounded-lg bg-muted/30 w-full gap-4"]');
    await expect(stepperContainer).toBeVisible();

    // Verify First step is visible
    const firstStep = stepperContainer.locator('div').nth(0);
    await expect(firstStep).toBeVisible();
    // Verify First Step Icon is visible
    const firstStepIcon = firstStep.locator('div').nth(0);
    await expect(firstStepIcon).toBeVisible();
    // Verify First Step Icon has the expected status
    const firstIconStatus = firstStepIcon.locator('div').nth(0);
    // Verify First Step Icon has the expected classes
    const firstIconClasses = await firstIconStatus.getAttribute('class');
    expect(firstIconClasses).toContain('rounded-full font-medium transition-colors bg-primary text-white size-8 text-sm');
    // Verify First Step Description is visible
    const firstStepDescription = firstStep.locator('div').nth(1);
    await expect(firstStepDescription).toBeVisible();
    // Verify First Step Description has the expected title
    const firstStepTitle = firstStep.getByText('First');
    await expect(firstStepTitle).toBeVisible();
    // Verify First Step Description has the expected text
    const firstStepText = firstStep.getByText('Contact info');
    await expect(firstStepText).toBeVisible();

    // Verify that have connector lines between first and second steps
    const connectorLine = stepperContainer.locator('[class*="h-0.5"][class*="w-full"]').first();
    await expect(connectorLine).toBeVisible();
    // Verify that connector line has the expected classes
    const connectorLineClasses = await connectorLine.getAttribute('class');
    expect(connectorLineClasses).toContain('transition-colors bg-primary h-0.5 w-full');

    // Verify Second step is visible - find it by containing "Second" text
    const secondStep = stepperContainer.locator('div').filter({ hasText: 'Second' }).first();
    await expect(secondStep).toBeVisible();
    // Verify Second Step Icon is visible
    const secondStepIcon = secondStep.locator('div').nth(0);
    await expect(secondStepIcon).toBeVisible();
    // Verify Second Step Icon has the expected status
    const secondIconStatus = secondStepIcon.locator('div').nth(0);
    await expect(secondIconStatus).toBeVisible();
    // Verify Second Step Icon has the expected classes
    const secondIconClasses = await secondIconStatus.getAttribute('class');
    expect(secondIconClasses).toContain('transition-colors border-2 border-primary bg-background text-primary size-8 text-sm');
    // Verify Second Step Description is visible
    const secondStepDescription = secondStep.locator('div').nth(1);
    await expect(secondStepDescription).toBeVisible();
    // Verify Second Step Description has the expected title
    const secondStepTitle = secondStep.getByText('Second');
    await expect(secondStepTitle).toBeVisible();
    // Verify Second Step Description has the expected text
    const secondStepText = secondStep.getByText('Date & time');
    await expect(secondStepText).toBeVisible();

    // Verify that have connector lines between second and third steps
    const connectorLine2 = stepperContainer.locator('[class*="h-px"][class*="w-full"]').first();
    await expect(connectorLine2).toBeVisible();
    // Verify that connector line2 has the expected classes
    const connectorLineClasses2 = await connectorLine2.getAttribute('class');
    expect(connectorLineClasses2).toContain('transition-colors bg-border h-px w-full');

    // Verify Third step is visible - find it by containing "Third" text
    const thirdStep = stepperContainer.locator('div').filter({ hasText: 'Third' }).first();
    await expect(thirdStep).toBeVisible();
    // Verify Third Step Icon is visible
    const thirdStepIcon = thirdStep.locator('div').nth(0);
    await expect(thirdStepIcon).toBeVisible();
    // Verify Third Step Icon has the expected status
    const thirdIconStatus = thirdStepIcon.locator('div').nth(0);
    await expect(thirdIconStatus).toBeVisible();
    // Verify Third Step Icon has the expected classes
    const thirdIconClasses = await thirdIconStatus.getAttribute('class');
    expect(thirdIconClasses).toContain('transition-colors border-2 border-border bg-background text-muted-foreground');
    // Verify Third Step Description is visible
    const thirdStepDescription = thirdStep.locator('div').nth(1);
    await expect(thirdStepDescription).toBeVisible();
    // Verify Third Step Description has the expected title
    const thirdStepTitle = thirdStep.getByText('Third');
    await expect(thirdStepTitle).toBeVisible();
    // Verify Third Step Description has the expected text
    const thirdStepText = thirdStep.getByText('Select rooms');
    await expect(thirdStepText).toBeVisible();
}