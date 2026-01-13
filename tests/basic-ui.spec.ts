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
import { testCombobxFramework, testCombobxTimezone, testCombobxUser, testCombobxWithCheckbox } from './test-Components/test-Combobox';
import { testCommand } from './test-Components/test-Command';
import { testContextMenu } from './test-Components/test-Context_menu';
import { testSingleDatePicker } from './test-Components/test-Date_picker';
import { testDialog } from './test-Components/test-Dialog';
import { testDraggable } from './test-Components/test-Draggable';
import { testDropdown } from './test-Components/test-Dropdown';
import { testEmptyStates } from './test-Components/test-Empty_States';
import { testErrorStates } from './test-Components/test-Error_States';
import { testIconColors, testIconFilledVariants, testIconSizes, testIconSubtleVariants, testIconVariants } from './test-Components/test-Icon';
import { testInput } from './test-Components/test-Input';
import { testInputOTP } from './test-Components/test-Input_OTP';
import { testLabel } from './test-Components/test-Label';
import { testNavigationMenu } from './test-Components/test-Navigation_Menu';
import { testPagination } from './test-Components/test-Pagination';
import { testPopover } from './test-Components/test-Popover';
import { testProgress } from './test-Components/test-Progress';
import { testRadioGroup } from './test-Components/test-Radio_Group';
import { testResizableHorizontal, testResizableVertical, testResizableWithHandle } from './test-Components/test-Resizable';
import { testScrollAreaHorizontal, testScrollAreaVertical } from './test-Components/test-Scroll_Area';
import { testSelectDefault } from './test-Components/test-Select';
import { testSeparator } from './test-Components/test-Separator';
import { testSheetDefault } from './test-Components/test-Sheet';
import { testSidebar } from './test-Components/test-Sidebar';
import { testSkeletonDefault } from './test-Components/test-Skeleton';
import { testSlider } from './test-Components/test-Slider';
import { testToastAction, testToastClosable, testToastError, testToastNormal, testToastSuccessful, testToastWarning } from './test-Components/test-Sonner';
import { testCircularProgressDefault, testCircularProgressVariant, testCircularProgressWithText } from './test-Components/test-Circular_Progress';
import { testStackNavigationHorizontal, testStackNavigationHorizontalTabs, testStackNavigationVertical } from './test-Components/test-Stack_Navigation';
import { testSwitchDanger, testSwitchPrimary, testSwitchSuccess } from './test-Components/test-Switch';
import { testDataTable, testTable } from './test-Components/test-Table';
import { testTabsDefault, testTabsLine, testTabsLineIcons, testTabsSoftRounded, testTabsSoftRoundedIcons } from './test-Components/test-Tabs';
import { testTextareaBasic, testTextareaDisabled, testTextareaInvalid, testTextareaLarge, testTextareaSmall, testTextareaWithDefaultValue, testTextareaWithLabel, testTextareaWithLabelAndDescription } from './test-Components/test-Textarea';
import { testTimePicker } from './test-Components/test-Time_picker';
import { testToggleRounded, testToggleSquare } from './test-Components/test-Toggle';
import { testToggleGroupRounded, testToggleGroupSquare } from './test-Components/test-Toggle_group';
import { testTooltip } from './test-Components/test-Tooltip';
import { testTopbar } from './test-Components/test-Topbar';
import { testTimelineConnectors, testTimelineDefault, testTimelineSizes, testTimelineVariant } from './test-Components/test-Timeline';
import { testSpinnerBadge, testSpinnerButton, testSpinnerDefault, testSpinnerSize } from './test-Components/test-Spinner';
import { testStepper } from './test-Components/test-Stepper';


test.describe('UI BLOK QA Automation', () => {

  test.beforeEach('Base URL', async ({ page }) => {
    // adjust baseURL in playwright config, or use full URL:
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 120000 });
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

  test('test_Button', async ({ page }) => {
    await testPrimaryORDefaultButton(page);
    await testOutlineButton(page);
    await testGhostButton(page);
    await testLinkVariant(page);
    await testSizeVariant(page);
    await testIcononlyVariant(page);
    await testDisabledButtons(page);
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
    await testCombobxFramework(page);
    await testCombobxUser(page);
    await testCombobxTimezone(page);
    await testCombobxWithCheckbox(page);
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

  test('test_Draggable', async ({ page }) => {
    await testDraggable(page);
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

  test('test_Icon', async ({ page }) => {
    await testIconVariants(page);
    await testIconSizes(page);
    await testIconColors(page);
    await testIconSubtleVariants(page);
    await testIconFilledVariants(page);
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

  test('test_Scroll_Area', async ({ page }) => {
    await testScrollAreaVertical(page);
    await testScrollAreaHorizontal(page);
  });

  test('test_Select', async ({ page }) => {
    await testSelectDefault(page);
  });

  test('test_Separator', async ({ page }) => {
    await testSeparator(page);
  });

  test('test_Sheet', async ({ page }) => {
    await testSheetDefault(page);
  });

  test('test_Sidebar', async ({ page }) => {
    await testSidebar(page);
  });

  test('test_Skeleton', async ({ page }) => {
    await testSkeletonDefault(page);
  });

  test('test_Slider', async ({ page }) => {
    await testSlider(page);
  });

  test('test_Sonner', async ({ page }) => {
    await testToastNormal(page);
    await testToastSuccessful(page);
    await testToastWarning(page);
    await testToastError(page);
    await testToastAction(page);
    await testToastClosable(page);
  });

  test('test_Stack_Navigation', async ({ page }) => {
    await testStackNavigationVertical(page);
    await testStackNavigationHorizontal(page);
    await testStackNavigationHorizontalTabs(page);
  });

  test('test_Switch', async ({ page }) => {
    await testSwitchPrimary(page);  
    await testSwitchDanger(page);
    await testSwitchSuccess(page);
  });

  test('test_Table', async ({ page }) => {
    await testTable(page);
    await testDataTable(page);
  });

  test('test_Tabs', async ({ page }) => {
    await testTabsDefault(page);
    await testTabsLine(page);
    await testTabsLineIcons(page);
    await testTabsSoftRounded(page);
    await testTabsSoftRoundedIcons(page);
  });

  test('test_Textarea', async ({ page }) => {
    await testTextareaBasic(page);
    await testTextareaInvalid(page);
    await testTextareaWithLabel(page);
    await testTextareaWithLabelAndDescription(page);
    await testTextareaDisabled(page);
    await testTextareaSmall(page);
    await testTextareaLarge(page);
    await testTextareaWithDefaultValue(page);
  });

  test('test_Time_picker', async ({ page }) => {
    await testTimePicker(page);
  });

  test('test_Toggle', async ({ page }) => {
    await testToggleSquare(page);
    await testToggleRounded(page);
  });

  test('test_Toggle_group', async ({ page }) => {
    await testToggleGroupSquare(page);
    await testToggleGroupRounded(page);
  });

  test('test_Tooltip', async ({ page }) => {
    await testTooltip(page);
  });

  test('test_Topbar', async ({ page }) => {
    await testTopbar(page);
  });

  test('test_Timeline', async ({ page }) => {
    await testTimelineDefault(page);
    await testTimelineVariant(page);
    await testTimelineSizes(page);
    await testTimelineConnectors(page);
  });

  test('test_Circular_Progress', async ({ page }) => {
    await testCircularProgressDefault(page);
    await testCircularProgressVariant(page);
    await testCircularProgressWithText(page);
  });

  test('test_Spinner', async ({ page }) => {
    await testSpinnerDefault(page);
    await testSpinnerSize(page);
    await testSpinnerButton(page);
    await testSpinnerBadge(page);
  });

  test('test_Stepper', async ({ page }) => {
    await testStepper(page);
  });

  test('close', async ({ page }) => {
    await page.close();
  });

});
