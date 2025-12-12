import { test, expect, Page } from '@playwright/test';
import { testAccordian } from './test-Components/test-Accordion';
import { testPrimaryAlert, testClosablePrimaryAlert, testPrimaryAlertLink } from './test-Components/test-Alert';
import { testOpenAlertDialog, testKeepEditing, testDiscard } from './test-Components/test-Alert_Dialog';
import { testPrimaryORDefaultButton, testGhostButton, testDisabledButtons, testIcononlyVariant, testLinkVariant, testOutlineButton, testSizeVariant } from './test-Components/test-Button';
import { testAspectRatio } from './test-Components/test-Aspect_Ratio';
import { testAvatar, testFallbackAvatar, testInteractiveAvatar, testLargeAvatar } from './test-Components/test-Avatar';
import { testBadge, testBadgeBold, testBadgeClosable, testBadgeColor, testBadgeLink, testBadgeSize } from './test-Components/test-Badge';
import { testBreadcrumb, testBreadcrumbItemLinks } from './test-Components/test-BreadCrumb';
import { testSingleCalendar } from './test-Components/test-Calendar';
import { testCardElevation, testCardPadding, testCardStyle, testDefaultCard } from './test-Components/test-Card';
import { testDefaultCarousel } from './test-Components/test-Carousel';
import { testAreaChart } from './test-Components/test-Chart';
import { testCheckbox, testCheckboxDisabled, testCheckboxWithDescription, testCheckEnabledLabel } from './test-Components/test-Checkbox';
import { testCollapsible } from './test-Components/test-Collapsible';
import { testCombobx } from './test-Components/test-Combobox';

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

  test('test_Aspect_Ratio', async ({ page }) => {
    await testAspectRatio(page);
  });

  test('test_Avatar', async ({ page }) => {
    await testAvatar(page);
    await testFallbackAvatar(page);
    await testLargeAvatar(page);
    await testInteractiveAvatar(page);
  });

  test('test_Badge', async ({ page }) => {
    await testBadge(page);
    await testBadgeSize(page);
    await testBadgeColor(page);
    await testBadgeBold(page);
    await testBadgeLink(page);
    await testBadgeClosable(page);
  });

  test('test_Breadcrumb', async ({ page }) => {
    await testBreadcrumb(page);
    await testBreadcrumbItemLinks(page);
  });

  test('test_Calendar', async ({ page }) => {
    await testSingleCalendar(page);
  });

  test('test_Card', async ({ page }) => {
    await testDefaultCard(page);
    await testCardElevation(page);
    await testCardStyle(page);
    await testCardPadding(page);
  });

  test('test_Carousel', async ({ page }) => {
    await testDefaultCarousel(page);
  });

  test('test_Chart', async ({ page }) => {
    await testAreaChart(page);
  });

  test('test_Checkbox', async ({ page }) => {
    await testCheckbox(page);
    await testCheckboxWithDescription(page);
    await testCheckboxDisabled(page);
    await testCheckEnabledLabel(page);
  });

  test('test_Collapsible', async ({ page }) => {
    await testCollapsible(page);
  });

  test('test_Combobox', async ({ page }) => {
    await testCombobx(page);
  });

  test('close', async ({ page }) => {
    await page.close();
  });

});

