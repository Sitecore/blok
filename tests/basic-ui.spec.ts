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
import { testCommand } from './test-Components/test-Command';
import { testContextMenu } from './test-Components/test-Context_menu';
import { testSingleDatePicker } from './test-Components/test-Date_picker';
import { testDialog } from './test-Components/test-Dialog';
import { testDrawer } from './test-Components/test-Drawer';
import { testDropdown } from './test-Components/test-Dropdown';
import { testEmptyStates } from './test-Components/test-Empty_States';
import { testErrorStates } from './test-Components/test-Error_States';
import { testHoverCard } from './test-Components/test-Hover_Card';
import { testInput } from './test-Components/test-Input';
import { testInputOTP } from './test-Components/test-Input_OTP';
import { testLabel } from './test-Components/test-Label';
import { testNavigationMenu } from './test-Components/test-Navigation_Menu';
import { testPagination } from './test-Components/test-Pagination';
import { testPopover } from './test-Components/test-Popover';
import { testProgress } from './test-Components/test-Progress';
import { testRadioGroup } from './test-Components/test-Radio_Group';
import { testResizableHorizontal, testResizableVertical, testResizableWithHandle } from './test-Components/test-Resizable';

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

  test('test_Command', async ({ page }) => {
    await testCommand(page);
  });

  test('test_Context_menu', async ({ page }) => {
    await testContextMenu(page);
  });

  test('test_Date_picker', async ({ page }) => {
    await testSingleDatePicker(page);
  });

  test('test_Dialog', async ({ page }) => {
    await testDialog(page);
  });

  test('test_Drawer', async ({ page }) => {
    await testDrawer(page);
  });

  test('test_Dropdown', async ({ page }) => {
    await testDropdown(page);
  });

  test('test_Empty_States', async ({ page }) => {
    await testEmptyStates(page);
  });

  test('test_Error_States', async ({ page }) => {
    await testErrorStates(page);
  });

  test('test_Hover_Card', async ({ page }) => {
    await testHoverCard(page);
  });

  test('test_Input', async ({ page }) => {
    await testInput(page);
  });

  test('test_Input_OTP', async ({ page }) => {
    await testInputOTP(page);
  });

  test('test_Label', async ({ page }) => {
    await testLabel(page);
  });

  test('test_Navigation_Menu', async ({ page }) => {
    await testNavigationMenu(page);
  });

  test('test_Pagination', async ({ page }) => {
    await testPagination(page);
  });

  test('test_Popover', async ({ page }) => {
    await testPopover(page);
  });

  test('test_Progress', async ({ page }) => {
    await testProgress(page);
  });

  test('test_Radio_Group', async ({ page }) => {
    await testRadioGroup(page);
  });

  test('test_Resizable', async ({ page }) => {
    await testResizableHorizontal(page);
    await testResizableVertical(page);
    await testResizableWithHandle(page);
  });

  test('close', async ({ page }) => {
    await page.close();
  });

});
