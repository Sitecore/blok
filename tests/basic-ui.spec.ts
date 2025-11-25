import { test, expect, Page } from '@playwright/test';
import { testAccordian } from './test-Components/test-Accordion';
import { testPrimaryAlert, testClosablePrimaryAlert, testPrimaryAlertLink } from './test-Components/test-Alert';
import { testOpenAlertDialog, testKeepEditing, testDiscard } from './test-Components/test-Alert_Dialog';
import { testPrimaryORDefaultButton, testGhostButton, testDisabledButtons, testIcononlyVariant, testLinkVariant, testOutlineButton, testSizeVariant } from './test-Components/test-Button';


test.describe('UI BLOK QA Automation', () => {

  test.beforeEach('Base URL', async ({ page }) => {
    // adjust baseURL in playwright config, or use full URL:
    await page.goto('/');
  });

  test('test_Accordion', async ({ page }) => {
    await testAccordian(page);
  });

  test('test_Alert', async ({ page }) => {
    await testPrimaryAlert(page);
    await testClosablePrimaryAlert(page);
    await testPrimaryAlertLink(page);
  });

  test('test_Alert_Dialog', async ({ page }) => {
    await testOpenAlertDialog(page);
    await testKeepEditing(page);
    await testDiscard(page);
  });

  test('test_Button', async ({ page }) => {
    await testPrimaryORDefaultButton(page);
    await testOutlineButton(page);
    await testGhostButton(page);
    await testLinkVariant(page);
    await testDisabledButtons(page);
    await testIcononlyVariant(page);
    await testSizeVariant(page);
  });

  test('close', async ({ page }) => {
    await page.close();
  });

});

