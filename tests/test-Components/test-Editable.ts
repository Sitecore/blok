import { test, expect, Page } from '@playwright/test';

export async function testEditableInput(page: Page){
    // Verify that the Editable Input section is visible
    const editableInputSection = page.locator('[id="editable-input"]');
    await expect(editableInputSection).toBeVisible();

    // Check that preview shows the default value
    const preview = editableInputSection.locator('[data-slot="editable-preview"]');
    await expect(preview).toBeVisible();
    await expect(preview).toHaveText('Click to edit this text');

    // Verify that enter edit mode when preview is clicked
    await preview.click();
    // Verify input is visible and preview is hidden
    const input = editableInputSection.locator('[data-slot="editable-input"]');
    await expect(input).toBeVisible();
    await expect(preview).not.toBeVisible();

    // Verify that allow editing text in input mode
    await input.clear();
    await input.fill('New edited text');
    await expect(input).toHaveValue('New edited text');

    // Verify that submit changes on Enter key
    await input.press('Enter');
    // Verify preview shows the new value
    await expect(preview).toBeVisible();
    await expect(preview).toHaveText('New edited text');

    // Verify that show placeholder when empty
    // Enter edit mode
    await preview.click();
    // Clear the input
    await input.clear();
    await input.press('Enter');
    // Verify placeholder is shown
    await expect(preview).toBeVisible();
    // The preview should show placeholder text when empty
    const previewText = await preview.textContent();
    expect(previewText).toBeTruthy();
}

export async function testEditableTextarea(page: Page){
    // Verify that the Editable Textarea section is visible
    const editableTextareaSection = page.locator('[id="editable-textarea"]');
    await expect(editableTextareaSection).toBeVisible();

    // Check that preview shows the default value
    const preview = editableTextareaSection.locator('[data-slot="editable-preview"]');
    await expect(preview).toBeVisible();
    await expect(preview).toHaveText('This is a longer piece of text that spans multiple lines. Click to edit it and add more content.');

    // Verify that enter edit mode when preview is clicked
    await preview.click();
    // Verify input is visible and preview is hidden
    const textarea = editableTextareaSection.locator('[data-slot="editable-textarea"]');
    await expect(textarea).toBeVisible();
    await expect(preview).not.toBeVisible();

    // Verify that allow editing text in textarea mode
    await textarea.clear();
    await textarea.fill('New edited text');
    await expect(textarea).toHaveValue('New edited text');

    // Verify that submit changes on Ctrl+Enter key
    // Use Ctrl+Enter (or Cmd+Enter on Mac)
    const isMac = process.platform === 'darwin';
    await textarea.press(isMac ? 'Meta+Enter' : 'Control+Enter');
    // Verify preview shows the new value
    await expect(preview).toBeVisible();
    await expect(preview).toHaveText('New edited text');

    // Verify that allow Enter key for new lines without submitting
    await preview.click();
    await textarea.clear();
    await textarea.fill('Line 1');
    await page.waitForTimeout(100);
    await textarea.press('Enter');
    await page.waitForTimeout(100);
    await textarea.type('Line 2');
    // Verify textarea still has both lines (not submitted)
    await expect(textarea).toHaveValue('Line 1\nLine 2');
    await expect(preview).not.toBeVisible();

    // Verify that show placeholder when empty
    // Clear the input
    await textarea.clear();
    await textarea.press('Control+Enter');
    // Verify placeholder is shown
    await expect(preview).toBeVisible();
    // The preview should show placeholder text when empty
    const previewText = await preview.textContent();
    expect(previewText).toBeTruthy();
}

export async function testEditableWithError(page: Page){
    // Verify that the Editable Textarea section is visible
    const editableWithErrorSection = page.locator('[id="editable-with-error"]');
    await expect(editableWithErrorSection).toBeVisible();

    // Check that preview shows the default value
    const preview = editableWithErrorSection.locator('span[data-slot="editable-preview"]');
    await expect(preview).toBeVisible();
    await expect(preview).toHaveText('Click to edit this text');

    // Verify that enter edit mode when preview is clicked
    await preview.click();
    // Verify input is visible and preview is hidden
    const input = editableWithErrorSection.locator('input[data-slot="editable-input"]');
    await expect(input).toBeVisible();
    await expect(preview).not.toBeVisible();

    // Verify that show error message after clicking on the preview
    const errorMessage = editableWithErrorSection.locator('[data-slot="editable-error"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText('This field is required');
    // Verify that error message has the correct classes
    const classerrorMessage = await errorMessage.getAttribute('class');
    expect(classerrorMessage).toContain('text-sm');
    expect(classerrorMessage).toContain('text-destructive');
    expect(classerrorMessage).toContain('absolute');
    expect(classerrorMessage).toContain('w-max');
    expect(classerrorMessage).toContain('bg-white');
    expect(classerrorMessage).toContain('rounded-sm');
    expect(classerrorMessage).toContain('shadow-lg');
    expect(classerrorMessage).toContain('py-1');
    expect(classerrorMessage).toContain('px-2');
    expect(classerrorMessage).toContain('bottom-[calc(-100%+var(--spacing)*0.5)]');
    expect(classerrorMessage).toContain('cursor-default');
    expect(classerrorMessage).toContain('z-10');

    // Verify that allow editing text in input mode
    await input.fill('New edited text');
    await expect(input).toHaveValue('New edited text');
}