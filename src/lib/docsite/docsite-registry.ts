import type { ComponentType } from "react";

// PRIMITIVES
import AccordionDemo from "@/app/content/ui/accordion/accordion";
import { ActionBarDemo } from "@/app/content/ui/action-bar/action-bar";
import AlertDemo from "@/app/content/ui/alert/alert";
import AlertPrimaryDemo from "@/app/content/ui/alert/alert-primary";
import AlertSuccessDemo from "@/app/content/ui/alert/alert-success";
import AlertDangerDemo from "@/app/content/ui/alert/alert-danger";
import AlertWarningDemo from "@/app/content/ui/alert/alert-warning";
import ClosableAlertDemo from "@/app/content/ui/alert/alert-closable";
import ButtonLinkAlertDemo from "@/app/content/ui/alert/alert-button-link";
import AlertDialogDemo from "@/app/content/ui/alert-dialog/alert-dialog";
import AspectRatioDemo from "@/app/content/ui/aspect-ratio/aspect-ratio";
import AvatarDemo from "@/app/content/ui/avatar/avatar";
import AvatarFallbackDemo from "@/app/content/ui/avatar/avatar-fallback";
import AvatarLargeDemo from "@/app/content/ui/avatar/avatar-large";
import AvatarInteractiveDemo from "@/app/content/ui/avatar/avatar-interactive";
import AvatarMenuDemo from "@/app/content/ui/avatar/avatar-menu";
import BadgeDemo from "@/app/content/ui/badge/badge";
import BadgeSizingDemo from "@/app/content/ui/badge/badge-sizing";
import BadgeColorSchemesDemo from "@/app/content/ui/badge/badge-color-schemes";
import BoldBadgeDemo from "@/app/content/ui/badge/badge-bold";
import BadgeLinksDemo from "@/app/content/ui/badge/badge-link";
import ClosableBadgeDemo from "@/app/content/ui/badge/badge-closable";
import BreadcrumbDemo from "@/app/content/ui/breadcrumb/breadcrumb";
import ButtonDemo from "@/app/content/ui/button/button";
import ButtonVariantsDemo from "@/app/content/ui/button/button-variants";
import ButtonSizingDemo from "@/app/content/ui/button/button-sizing";
import ButtonColorSchemeDemo from "@/app/content/ui/button/button-color-schemes";
import ButtonIconSizingDemo from "@/app/content/ui/button/button-icon-sizing";
import ButtonIconTextDemo from "@/app/content/ui/button/button-icon-text";
import ButtonDisabledDemo from "@/app/content/ui/button/button-disabled";
import ButtonLoadingDemo from "@/app/content/ui/button/button-loading";
import CalendarDemo from "@/app/content/ui/calendar/calendar";
import MultipleCalendarDemo from "@/app/content/ui/calendar/calendar-multiple";
import CardDefaultDemo from "@/app/content/ui/card/card";
import CardElevationDemo from "@/app/content/ui/card/card-elevation";
import CardStyleDemo from "@/app/content/ui/card/card-style";
import CardPaddingDemo from "@/app/content/ui/card/card-padding";
import CardStyledDemo from "@/app/content/ui/card/card-styled";
import CardVersionsDemo from "@/app/content/ui/card/card-versions";
import CardVerticalDemo from "@/app/content/ui/card/card-vertical";
import CardVerticalMediumDemo from "@/app/content/ui/card/card-vertical-medium";
import CardVerticalSmallDemo from "@/app/content/ui/card/card-vertical-small";
import CardHorizontalDetailDemo from "@/app/content/ui/card/card-horizontal-detail";
import CardHorizontalNormalDemo from "@/app/content/ui/card/card-horizontal-normal";
import CardHorizontalSmallDemo from "@/app/content/ui/card/card-horizontal-small";
import CarouselDemo from "@/app/content/ui/carousel/carousel";
import CarouselStartAlignedDemo from "@/app/content/ui/carousel/carousel-start-aligned";
import CarouselNegativeMarginDemo from "@/app/content/ui/carousel/carousel-negative-margin";
import AreaChartDemo from "@/app/content/ui/chart/chart-area";
import BarChartDemo from "@/app/content/ui/chart/chart-bar";
import BarMixedChartDemo from "@/app/content/ui/chart/chart-mixed-bar";
import LineChartDemo from "@/app/content/ui/chart/chart-line";
import PieChartDemo from "@/app/content/ui/chart/chart-pie";
import CheckboxDemo from "@/app/content/ui/checkbox/checkbox";
import CheckboxWithDescriptionDemo from "@/app/content/ui/checkbox/checkbox-description";
import DisabledCheckboxDemo from "@/app/content/ui/checkbox/checkbox-disabled";
import EnabledCheckboxLabelDemo from "@/app/content/ui/checkbox/checkbox-label";
import CircularProgressDemo from "@/app/content/ui/circular-progress/circular-progress";
import CollapsibleDemo from "@/app/content/ui/collapsible/collapsible";
import ComboboxDemo from "@/app/content/ui/combobox/combobox";
import ComboboxMultipleDemo from "@/app/content/ui/combobox/combobox-multiple";
import ComboboxWithDescriptionDemo from "@/app/content/ui/combobox/combobox-with-description";
import ComboboxWithClearDemo from "@/app/content/ui/combobox/combobox-clear-button";
import ComboboxWithGroupsAndSeparatorDemo from "@/app/content/ui/combobox/combobox-groups";
import ComboboxWithCustomItemsDemo from "@/app/content/ui/combobox/combobox-custom-items";
import ComboboxAutoHighlightDemo from "@/app/content/ui/combobox/combobox-auto-highlight";
import ComboxboxInputGroupDemo from "@/app/content/ui/combobox/combobox-input-group";
import CommandDemo from "@/app/content/ui/command/command";
import ContextMenuDemo from "@/app/content/ui/context-menu/context-menu";
import DatePickerSimpleDemo from "@/app/content/ui/date-picker/date-picker";
import DatePickerWithRangeDemo from "@/app/content/ui/date-picker/date-picker-range";
import DialogDemo from "@/app/content/ui/dialog/dialog";
import ScrollableDialogDemo from "@/app/content/ui/dialog/dialog-scrollable";
import StickyFooterDialogDemo from "@/app/content/ui/dialog/dialog-sticky-footer";
import DraggableBasicDragDropDemo from "@/app/content/ui/draggable/draggable-basic";
import DraggableCustomHandleDemo from "@/app/content/ui/draggable/draggable-custom-handle";
import DraggableDragDropSortableDemo from "@/app/content/ui/draggable/draggable-drag-drop-sort";
import DropdownMenuDemo from "@/app/content/ui/dropdown/dropdown-menu";
import DropdownMenuCheckboxesDemo from "@/app/content/ui/dropdown/dropdown-menu-checkboxes";
import DropdownMenuRadioGroupDemo from "@/app/content/ui/dropdown/dropdown-menu-radio-group";
import DropdownMenuAvatarDemo from "@/app/content/ui/dropdown/dropdown-menu-avatar";
import DropdownMenuAvatarOnlyDemo from "@/app/content/ui/dropdown/dropdown-menu-avatar-only";
import DropdownMenuIconColorDemo from "@/app/content/ui/dropdown/dropdown-menu-icon-color";
import DropdownMenuWithDescriptionDemo from "@/app/content/ui/dropdown/dropdown-menu-with-description";
import EditableDemo from "@/app/content/ui/editable/editable";
import EditableTextareaDemo from "@/app/content/ui/editable/editable-textarea";
import EmptyStatesNoSearchResultsDemo from "@/app/content/ui/empty-states/empty-states-no-search-results";
import EmptyStatesNothingCreatedDemo from "@/app/content/ui/empty-states/empty-states-nothing-created";
import EmptyStatesErrorDemo from "@/app/content/ui/empty-states/empty-states-error";
import ErrorStatesGenericDemo from "@/app/content/ui/error-states/error-states-generic";
import ErrorStates400Demo from "@/app/content/ui/error-states/error-states-400";
import ErrorStates401Demo from "@/app/content/ui/error-states/error-states-401";
import ErrorStates403Demo from "@/app/content/ui/error-states/error-states-403";
import ErrorStates404Demo from "@/app/content/ui/error-states/error-states-404";
import ErrorStates500Demo from "@/app/content/ui/error-states/error-states-500";
import ErrorStates503Demo from "@/app/content/ui/error-states/error-states-503";
import FieldDemo from "@/app/content/ui/field/field";
import FieldInputDemo from "@/app/content/ui/field/field-input";
import FieldTextareaDemo from "@/app/content/ui/field/field-textarea";
import FieldSelectDemo from "@/app/content/ui/field/field-select";
import FieldCheckboxDemo from "@/app/content/ui/field/field-checkbox";
import FieldRadioGroupDemo from "@/app/content/ui/field/field-radio-group";
import FieldSwitchDemo from "@/app/content/ui/field/field-switch";
import FieldWithSeparatorDemo from "@/app/content/ui/field/field-separator";
import FieldWithErrorDemo from "@/app/content/ui/field/field-error";
import FieldInputWithIconDemo from "@/app/content/ui/field/field-input-icon";
import FieldInputWithAddonDemo from "@/app/content/ui/field/field-input-addon";
import FieldDisabledDemo from "@/app/content/ui/field/field-disabled";
import FieldReadOnlyDemo from "@/app/content/ui/field/field-readonly";
import FieldSmallDemo from "@/app/content/ui/field/field-small";
import FieldInputTypesDemo from "@/app/content/ui/field/field-input-types";
import FilterDemo from "@/app/content/ui/filter/filter";
import FilterInputDemo from "@/app/content/ui/filter/filter-input";
import FilterSingleSelectDemo from "@/app/content/ui/filter/filter-single-select";
import FilterMultiSelectDemo from "@/app/content/ui/filter/filter-multi-select";
import FilterWithSearchDemo from "@/app/content/ui/filter/filter-with-search";
import FilterWithAvatarDemo from "@/app/content/ui/filter/filter-with-avatar";
import IconDemo from "@/app/content/ui/icon/icon-component";
import IconVariantsDemo from "@/app/content/ui/icon/icon-variants";
import IconSizingDemo from "@/app/content/ui/icon/icon-sizing";
import IconColorSchemesDemo from "@/app/content/ui/icon/icon-color-schemes";
import SubtleIconVariantsDemo from "@/app/content/ui/icon/icon-subtle";
import FilledIconVariantsDemo from "@/app/content/ui/icon/icon-filled";
import InputDemo from "@/app/content/ui/input/input";
import InputEmailDemo from "@/app/content/ui/input/input-email";
import InputTextDemo from "@/app/content/ui/input/input-text";
import InputPasswordDemo from "@/app/content/ui/input/input-password";
import InputFileDemo from "@/app/content/ui/input/input-file";
import DisabledInputDemo from "@/app/content/ui/input/input-disabled";
import SearchInputDefaultDemo from "@/app/content/ui/search-input/search-input-default";
import InputGroupDemo from "@/app/content/ui/input-group/input-group";
import InputGroupURLDemo from "@/app/content/ui/input-group/input-group-url";
import InputGroupDropdownDemo from "@/app/content/ui/input-group/input-group-dropdown";
import InputOTPDemo from "@/app/content/ui/input-otp/inputotp";
import InputOTPPatternDemo from "@/app/content/ui/input-otp/inputotp-pattern";
import InputOTPSpacingDemo from "@/app/content/ui/input-otp/inputotp-spacing";
import KbdDemo from "@/app/content/ui/kbd/kbd";
import KbdGroupDemo from "@/app/content/ui/kbd/kbd-group";
import KbdButtonDemo from "@/app/content/ui/kbd/kbd-button";
import KbdTooltipDemo from "@/app/content/ui/kbd/kbd-tooltip";
import KbdShortcutDemo from "@/app/content/ui/kbd/kbd-shortcut";
import LabelDemo from "@/app/content/ui/label/label";
import NavigationMenuDemo from "@/app/content/ui/navigation-menu/navigation-menu";
import NavigationMenuSecondaryDemo from "@/app/content/ui/navigation-menu/navigation-menu-secondary";
import PaginationDemo from "@/app/content/ui/pagination/pagination";
import PopoverDemo from "@/app/content/ui/popover/popover";
import ProgressDemo from "@/app/content/ui/progress/progress";
import RadioGroupDemo from "@/app/content/ui/radio-group/radio-group";
import ResizableDemo from "@/app/content/ui/resizable/resizable";
import VerticalResizableDemo from "@/app/content/ui/resizable/resizable-vertical";
import ResizableHandleDemo from "@/app/content/ui/resizable/resizable-handle";
import ScrollAreaDemo from "@/app/content/ui/scroll-area/scroll-area";
import HorizontalScrollAreaDemo from "@/app/content/ui/scroll-area/scroll-area-horizontal";
import SelectDemo from "@/app/content/ui/select/select";
import SelectLargeListDemo from "@/app/content/ui/select/select-large-list";
import SelectWithIconDemo from "@/app/content/ui/select/select-icon";
import DisabledSelectDemo from "@/app/content/ui/select/select-disabled";
import SelectReactDemo from "@/app/content/ui/select-react/select-react";
import SeparatorDemo from "@/app/content/ui/separator/separator";
import SheetDemo from "@/app/content/ui/sheet/sheet";
import SheetDirectionsDemo from "@/app/content/ui/sheet/sheet-directions";
import SidebarDemo from "@/app/content/ui/sidebar/sidebar";
import SidebarDefaultDemo from "@/app/content/ui/sidebar/sidebar-default";
import SidebarLeadingIconDemo from "@/app/content/ui/sidebar/sidebar-leading-icon";
import SidebarTrailingIconDemo from "@/app/content/ui/sidebar/sidebar-trailing-icon";
import SidebarIconCombinationDemo from "@/app/content/ui/sidebar/sidebar-icon-combination";
import SkeletonDemo from "@/app/content/ui/skeleton/skeleton";
import SkeletonCardListDemo from "@/app/content/ui/skeleton/skeleton-card";
import SliderDemo from "@/app/content/ui/slider/slider";
import SonnerDemo from "@/app/content/ui/sonner/sonner";
import SonnerSuccessDemo from "@/app/content/ui/sonner/sonner-success";
import SonnerWarningDemo from "@/app/content/ui/sonner/sonner-warning";
import SonnerErrorDemo from "@/app/content/ui/sonner/sonner-error";
import SonnerActionDemo from "@/app/content/ui/sonner/sonner-action";
import SonnerClosableDemo from "@/app/content/ui/sonner/sonner-closable";
import SpinnerDemo from "@/app/content/ui/spinner/spinner";
import SpinnerSizeDemo from "@/app/content/ui/spinner/spinner-size";
import StackNavigationDemo from "@/app/content/ui/stack-navigation/stack-navigation";
import StackNavigationHorizontalDemo from "@/app/content/ui/stack-navigation/stack-navigation-horizontal";
import StackNavigationHorizontalTabsDemo from "@/app/content/ui/stack-navigation/stack-navigation-horizontal-tabs";
import StackNavigationColorSchemesDemo from "@/app/content/ui/stack-navigation/stack-navigation-color-schemes";
import StepperDemo from "@/app/content/ui/stepper/stepper";
import SwitchDemo from "@/app/content/ui/switch/switch";
import SwitchDangerDemo from "@/app/content/ui/switch/switch-danger";
import SwitchSuccessDemo from "@/app/content/ui/switch/switch-success";
import TableDemo from "@/app/content/ui/table/table";
import TableLgDemo from "@/app/content/ui/table/table-lg";
import TablePinnedDemo from "@/app/content/ui/table/table-pinned";
import TableSmDemo from "@/app/content/ui/table/table-sm";
import TableStickyScrollDemo from "@/app/content/ui/table/table-sticky-scroll";
import TabsDemo from "@/app/content/ui/tabs/tabs";
import TabsLineVariantDemo from "@/app/content/ui/tabs/tabs-line";
import TabsLineVariantWithIconsDemo from "@/app/content/ui/tabs/tabs-line-icon";
import TabsSoftRoundedVariantDemo from "@/app/content/ui/tabs/tabs-soft-rounded";
import TabsWithIconsDemo from "@/app/content/ui/tabs/tabs-icons";
import TextareaDemo from "@/app/content/ui/textarea/textarea";
import InvalidTextareaDemo from "@/app/content/ui/textarea/textarea-invalid";
import TextareaWithLabelDemo from "@/app/content/ui/textarea/textarea-label";
import TextareaWithLabelAndDescriptionDemo from "@/app/content/ui/textarea/textarea-label-description";
import DisabledTextareaDemo from "@/app/content/ui/textarea/textarea-disabled";
import SmallTextareaDemo from "@/app/content/ui/textarea/textarea-small";
import LargeTextareaDemo from "@/app/content/ui/textarea/textarea-large";
import TextareaWithDefaultValueDemo from "@/app/content/ui/textarea/textarea-default-value";
import TimePickerDemo from "@/app/content/ui/time-picker/time-picker";
import TimelineDemo from "@/app/content/ui/timeline/timeline";
import TimelineVariantsDemo from "@/app/content/ui/timeline/timeline-variants";
import TimelineSizesDemo from "@/app/content/ui/timeline/timeline-sizes";
import TimelineConnectorVariantsDemo from "@/app/content/ui/timeline/timeline-connector-variants";
import SquareToggleDemo from "@/app/content/ui/toggle/toggle-square";
import RoundedToggleDemo from "@/app/content/ui/toggle/toggle-rounded";
import SquareToggleGroupDemo from "@/app/content/ui/toggle-group/toggle-group-square";
import RoundedToggleGroupDemo from "@/app/content/ui/toggle-group/toggle-group-rounded";
import ToggleSizesDemo from "@/app/content/ui/toggle/toggle-sizes";
import ToggleVariantsDemo from "@/app/content/ui/toggle/toggle-variants";
import ToggleGroupSizesDemo from "@/app/content/ui/toggle-group/toggle-group-sizes";
import ToggleOutlineGroupDemo from "@/app/content/ui/toggle-group/toggle-outline-group";
import TooltipDemo from "@/app/content/ui/tooltip/tooltip";

// BLOKS
import AllSitesSectionDemo from "@/app/content/bloks/all-site-section/all-site-section";
import CollaborationDemo from "@/app/content/bloks/collaboration/collaboration";
import DashboardWidgetDemo from "@/app/content/bloks/dashboard-widget/dashboard-widget";
import DashboardWidgetWhiteBgLargeDemo from "@/app/content/bloks/dashboard-widget/dashboard-widget-white-bg-large";
import DashboardWidgetGrayBgLargeDemo from "@/app/content/bloks/dashboard-widget/dashboard-widget-gray-bg-large";
import PinnedSitesSectionDemo from "@/app/content/bloks/pinned-site-section/pinned-site-section";
import PromptInputDemo from "@/app/content/bloks/prompt-input/prompt-input";
import PromptInputFloatingDemo from "@/app/content/bloks/prompt-input/prompt-input-floating";
import PromptInputQueuedDemo from "@/app/content/bloks/prompt-input/prompt-input-queued";
import PromptInputQuestionsDemo from "@/app/content/bloks/prompt-input/prompt-input-questions";
import SidebarRHSDemo from "@/app/content/bloks/sidebar-rhs/sidebar-rhs";
import SidebarRHSHeadingWithTabsDemo from "@/app/content/bloks/sidebar-rhs/sidebar-rhs-heading-with-tabs";
import SidebarRHSBriefDemo from "@/app/content/bloks/sidebar-rhs/sidebar-rhs-brief";
import SidebarRHSBriefTypeDemo from "@/app/content/bloks/sidebar-rhs/sidebar-rhs-brief-type";
import SidebarRHSContentDemo from "@/app/content/bloks/sidebar-rhs/sidebar-rhs-content";
import SiteCardDemo from "@/app/content/bloks/site-card/site-card";
import TopbarDemo from "@/app/content/bloks/topbar/topbar";

export interface DocsiteRegistryEntry {
  name: string;
  path: string;
  component?: ComponentType<any>; // optional
}

export const docsiteRegistry: Record<string, DocsiteRegistryEntry> = {
  // PRIMITIVES
  accordion: {
    name: "accordion",
    path: "src/app/content/ui/accordion/accordion.tsx",
    component: AccordionDemo,
  },
  "action-bar": {
    name: "action-bar",
    path: "src/app/content/ui/action-bar/action-bar.tsx",
    component: ActionBarDemo,
  },
  alert: {
    name: "alert",
    path: "src/app/content/ui/alert/alert.tsx",
    component: AlertDemo,
  },
  "alert-primary": {
    name: "alert-primary",
    path: "src/app/content/ui/alert/alert-primary.tsx",
    component: AlertPrimaryDemo,
  },
  "alert-success": {
    name: "alert-success",
    path: "src/app/content/ui/alert/alert-success.tsx",
    component: AlertSuccessDemo,
  },
  "alert-danger": {
    name: "alert-danger",
    path: "src/app/content/ui/alert/alert-danger.tsx",
    component: AlertDangerDemo,
  },
  "alert-warning": {
    name: "alert-warning",
    path: "src/app/content/ui/alert/alert-warning.tsx",
    component: AlertWarningDemo,
  },
  "alert-closable": {
    name: "alert-closable",
    path: "src/app/content/ui/alert/alert-closable.tsx",
    component: ClosableAlertDemo,
  },
  "alert-button-link": {
    name: "alert-button-link",
    path: "src/app/content/ui/alert/alert-button-link.tsx",
    component: ButtonLinkAlertDemo,
  },
  "alert-dialog": {
    name: "alert-dialog",
    path: "src/app/content/ui/alert-dialog/alert-dialog.tsx",
    component: AlertDialogDemo,
  },
  "aspect-ratio": {
    name: "aspect-ratio",
    path: "src/app/content/ui/aspect-ratio/aspect-ratio.tsx",
    component: AspectRatioDemo,
  },
  avatar: {
    name: "avatar",
    path: "src/app/content/ui/avatar/avatar.tsx",
    component: AvatarDemo,
  },
  "avatar-fallback": {
    name: "avatar-fallback",
    path: "src/app/content/ui/avatar/avatar-fallback.tsx",
    component: AvatarFallbackDemo,
  },
  "avatar-large": {
    name: "avatar-large",
    path: "src/app/content/ui/avatar/avatar-large.tsx",
    component: AvatarLargeDemo,
  },
  "avatar-interactive": {
    name: "avatar-interactive",
    path: "src/app/content/ui/avatar/avatar-interactive.tsx",
    component: AvatarInteractiveDemo,
  },
  "avatar-menu": {
    name: "avatar-menu",
    path: "src/app/content/ui/avatar/avatar-menu.tsx",
    component: AvatarMenuDemo,
  },
  badge: {
    name: "badge",
    path: "src/app/content/ui/badge/badge.tsx",
    component: BadgeDemo,
  },
  "badge-sizing": {
    name: "badge-sizing",
    path: "src/app/content/ui/badge/badge-sizing.tsx",
    component: BadgeSizingDemo,
  },
  "badge-color-schemes": {
    name: "badge-color-schemes",
    path: "src/app/content/ui/badge/badge-color-schemes.tsx",
    component: BadgeColorSchemesDemo,
  },
  "badge-bold": {
    name: "badge-bold",
    path: "src/app/content/ui/badge/badge-bold.tsx",
    component: BoldBadgeDemo,
  },
  "badge-link": {
    name: "badge-link",
    path: "src/app/content/ui/badge/badge-link.tsx",
    component: BadgeLinksDemo,
  },
  "badge-closable": {
    name: "badge-closable",
    path: "src/app/content/ui/badge/badge-closable.tsx",
    component: ClosableBadgeDemo,
  },
  breadcrumb: {
    name: "breadcrumb",
    path: "src/app/content/ui/breadcrumb/breadcrumb.tsx",
    component: BreadcrumbDemo,
  },
  button: {
    name: "button",
    path: "src/app/content/ui/button/button.tsx",
    component: ButtonDemo,
  },
  "button-variants": {
    name: "button-variants",
    path: "src/app/content/ui/button/button-variants.tsx",
    component: ButtonVariantsDemo,
  },
  "button-sizing": {
    name: "button-sizing",
    path: "src/app/content/ui/button/button-sizing.tsx",
    component: ButtonSizingDemo,
  },
  "button-color-schemes": {
    name: "button-color-schemes",
    path: "src/app/content/ui/button/button-color-schemes.tsx",
    component: ButtonColorSchemeDemo,
  },
  "button-icon-sizing": {
    name: "button-icon-sizing",
    path: "src/app/content/ui/button/button-icon-sizing.tsx",
    component: ButtonIconSizingDemo,
  },
  "button-icon-text": {
    name: "button-icon-text",
    path: "src/app/content/ui/button/button-icon-text.tsx",
    component: ButtonIconTextDemo,
  },
  "button-disabled": {
    name: "button-disabled",
    path: "src/app/content/ui/button/button-disabled.tsx",
    component: ButtonDisabledDemo,
  },
  "button-loading": {
    name: "button-loading",
    path: "src/app/content/ui/button/button-loading.tsx",
    component: ButtonLoadingDemo,
  },
  calendar: {
    name: "calendar",
    path: "src/app/content/ui/calendar/calendar.tsx",
    component: CalendarDemo,
  },
  "calendar-multiple": {
    name: "calendar-multiple",
    path: "src/app/content/ui/calendar/calendar-multiple.tsx",
    component: MultipleCalendarDemo,
  },
  card: {
    name: "card",
    path: "src/app/content/ui/card/card.tsx",
    component: CardDefaultDemo,
  },
  "card-elevation": {
    name: "card-elevation",
    path: "src/app/content/ui/card/card-elevation.tsx",
    component: CardElevationDemo,
  },
  "card-style": {
    name: "card-style",
    path: "src/app/content/ui/card/card-style.tsx",
    component: CardStyleDemo,
  },
  "card-padding": {
    name: "card-padding",
    path: "src/app/content/ui/card/card-padding.tsx",
    component: CardPaddingDemo,
  },
  "card-styled": {
    name: "card-styled",
    path: "src/app/content/ui/card/card-styled.tsx",
    component: CardStyledDemo,
  },
  "card-versions": {
    name: "card-versions",
    path: "src/app/content/ui/card/card-versions.tsx",
    component: CardVersionsDemo,
  },
  "card-vertical": {
    name: "card-vertical",
    path: "src/app/content/ui/card/card-vertical.tsx",
    component: CardVerticalDemo,
  },
  "card-vertical-medium": {
    name: "card-vertical-medium",
    path: "src/app/content/ui/card/card-vertical-medium.tsx",
    component: CardVerticalMediumDemo,
  },
  "card-vertical-small": {
    name: "card-vertical-small",
    path: "src/app/content/ui/card/card-vertical-small.tsx",
    component: CardVerticalSmallDemo,
  },
  "card-horizontal-detail": {
    name: "card-horizontal-detail",
    path: "src/app/content/ui/card/card-horizontal-detail.tsx",
    component: CardHorizontalDetailDemo,
  },
  "card-horizontal-normal": {
    name: "card-horizontal-normal",
    path: "src/app/content/ui/card/card-horizontal-normal.tsx",
    component: CardHorizontalNormalDemo,
  },
  "card-horizontal-small": {
    name: "card-horizontal-small",
    path: "src/app/content/ui/card/card-horizontal-small.tsx",
    component: CardHorizontalSmallDemo,
  },
  carousel: {
    name: "carousel",
    path: "src/app/content/ui/carousel/carousel.tsx",
    component: CarouselDemo,
  },
  "carousel-start-aligned": {
    name: "carousel-start-aligned",
    path: "src/app/content/ui/carousel/carousel-start-aligned.tsx",
    component: CarouselStartAlignedDemo,
  },
  "carousel-negative-margin": {
    name: "carousel-negative-margin",
    path: "src/app/content/ui/carousel/carousel-negative-margin.tsx",
    component: CarouselNegativeMarginDemo,
  },
  "area-chart": {
    name: "area-chart",
    path: "src/app/content/ui/chart/chart-area.tsx",
    component: AreaChartDemo,
  },
  "bar-chart": {
    name: "bar-chart",
    path: "src/app/content/ui/chart/chart-bar.tsx",
    component: BarChartDemo,
  },
  "mixed-bar-chart": {
    name: "mixed-bar-chart",
    path: "src/app/content/ui/chart/chart-mixed-bar.tsx",
    component: BarMixedChartDemo,
  },
  "line-chart": {
    name: "line-chart",
    path: "src/app/content/ui/chart/chart-line.tsx",
    component: LineChartDemo,
  },
  "pie-chart": {
    name: "pie-chart",
    path: "src/app/content/ui/chart/chart-pie.tsx",
    component: PieChartDemo,
  },
  checkbox: {
    name: "checkbox",
    path: "src/app/content/ui/checkbox/checkbox.tsx",
    component: CheckboxDemo,
  },
  "checkbox-description": {
    name: "checkbox-description",
    path: "src/app/content/ui/checkbox/checkbox-description.tsx",
    component: CheckboxWithDescriptionDemo,
  },
  "checkbox-disabled": {
    name: "checkbox-disabled",
    path: "src/app/content/ui/checkbox/checkbox-disabled.tsx",
    component: DisabledCheckboxDemo,
  },
  "checkbox-label": {
    name: "checkbox-label",
    path: "src/app/content/ui/checkbox/checkbox-label.tsx",
    component: EnabledCheckboxLabelDemo,
  },
  "circular-progress": {
    name: "circular-progress",
    path: "src/app/content/ui/circular-progress/circular-progress.tsx",
    component: CircularProgressDemo,
  },
  collapsible: {
    name: "collapsible",
    path: "src/app/content/ui/collapsible/collapsible.tsx",
    component: CollapsibleDemo,
  },
  combobox: {
    name: "combobox",
    path: "src/app/content/ui/combobox/combobox.tsx",
    component: ComboboxDemo,
  },
  "combobox-multiple": {
    name: "combobox-multiple",
    path: "src/app/content/ui/combobox/combobox-multiple.tsx",
    component: ComboboxMultipleDemo,
  },
  "combobox-clear-button": {
    name: "combobox-clear-button",
    path: "src/app/content/ui/combobox/combobox-clear-button.tsx",
    component: ComboboxWithClearDemo,
  },
  "combobox-groups": {
    name: "combobox-groups",
    path: "src/app/content/ui/combobox/combobox-groups.tsx",
    component: ComboboxWithGroupsAndSeparatorDemo,
  },
  "combobox-custom-items": {
    name: "combobox-custom-items",
    path: "src/app/content/ui/combobox/combobox-custom-items.tsx",
    component: ComboboxWithCustomItemsDemo,
  },
  "combobox-auto-highlight": {
    name: "combobox-auto-highlight",
    path: "src/app/content/ui/combobox/combobox-auto-highlight.tsx",
    component: ComboboxAutoHighlightDemo,
  },
  "combobox-input-group": {
    name: "combobox-input-group",
    path: "src/app/content/ui/combobox/combobox-input-group.tsx",
    component: ComboxboxInputGroupDemo,
  },
  "combobox-with-description": {
    name: "combobox-with-description",
    path: "src/app/content/ui/combobox/combobox-with-description.tsx",
    component: ComboboxWithDescriptionDemo,
  },
  command: {
    name: "command",
    path: "src/app/content/ui/command/command.tsx",
    component: CommandDemo,
  },
  "context-menu": {
    name: "context-menu",
    path: "src/app/content/ui/context-menu/context-menu.tsx",
    component: ContextMenuDemo,
  },
  "date-picker-simple": {
    name: "date-picker-simple",
    path: "src/app/content/ui/date-picker/date-picker.tsx",
    component: DatePickerSimpleDemo,
  },
  "date-picker-range": {
    name: "date-picker-range",
    path: "src/app/content/ui/date-picker/date-picker-range.tsx",
    component: DatePickerWithRangeDemo,
  },
  dialog: {
    name: "dialog",
    path: "src/app/content/ui/dialog/dialog.tsx",
    component: DialogDemo,
  },
  "dialog-scrollable": {
    name: "dialog-scrollable",
    path: "src/app/content/ui/dialog/dialog-scrollable.tsx",
    component: ScrollableDialogDemo,
  },
  "dialog-sticky-footer": {
    name: "dialog-sticky-footer",
    path: "src/app/content/ui/dialog/dialog-sticky-footer.tsx",
    component: StickyFooterDialogDemo,
  },
  "draggable-basic": {
    name: "draggable-basic",
    path: "src/app/content/ui/draggable/draggable-basic.tsx",
    component: DraggableBasicDragDropDemo,
  },
  "draggable-custom-handle": {
    name: "draggable-custom-handle",
    path: "src/app/content/ui/draggable/draggable-custom-handle.tsx",
    component: DraggableCustomHandleDemo,
  },
  "draggable-sortable-drop": {
    name: "draggable-sortable-drop",
    path: "src/app/content/ui/draggable/draggable-drag-drop-sort.tsx",
    component: DraggableDragDropSortableDemo,
  },
  "dropdown-menu": {
    name: "dropdown-menu",
    path: "src/app/content/ui/dropdown/dropdown-menu.tsx",
    component: DropdownMenuDemo,
  },
  "dropdown-menu-checkboxes": {
    name: "dropdown-menu-checkboxes",
    path: "src/app/content/ui/dropdown/dropdown-menu-checkboxes.tsx",
    component: DropdownMenuCheckboxesDemo,
  },
  "dropdown-menu-radio-group": {
    name: "dropdown-menu-radio-group",
    path: "src/app/content/ui/dropdown/dropdown-menu-radio-group.tsx",
    component: DropdownMenuRadioGroupDemo,
  },
  "dropdown-menu-avatar": {
    name: "dropdown-menu-avatar",
    path: "src/app/content/ui/dropdown/dropdown-menu-avatar.tsx",
    component: DropdownMenuAvatarDemo,
  },
  "dropdown-menu-avatar-only": {
    name: "dropdown-menu-avatar-only",
    path: "src/app/content/ui/dropdown/dropdown-menu-avatar-only.tsx",
    component: DropdownMenuAvatarOnlyDemo,
  },
  "dropdown-menu-icon-color": {
    name: "dropdown-menu-icon-color",
    path: "src/app/content/ui/dropdown/dropdown-menu-icon-color.tsx",
    component: DropdownMenuIconColorDemo,
  },
  "dropdown-menu-with-description": {
    name: "dropdown-menu-with-Description",
    path: "src/app/content/ui/dropdown/dropdown-menu-with-description.tsx",
    component: DropdownMenuWithDescriptionDemo,
  },
  editable: {
    name: "editable",
    path: "src/app/content/ui/editable/editable.tsx",
    component: EditableDemo,
  },
  "editable-textarea": {
    name: "editable-textarea",
    path: "src/app/content/ui/editable/editable-textarea.tsx",
    component: EditableTextareaDemo,
  },
  "empty-states-no-results": {
    name: "empty-states-no-results",
    path: "src/app/content/ui/empty-states/empty-states-no-search-results.tsx",
    component: EmptyStatesNoSearchResultsDemo,
  },
  "empty-states-nothing-created": {
    name: "empty-states-nothing-created",
    path: "src/app/content/ui/empty-states/empty-states-nothing-created.tsx",
    component: EmptyStatesNothingCreatedDemo,
  },
  "empty-states-error": {
    name: "empty-states-error",
    path: "src/app/content/ui/empty-states/empty-states-error.tsx",
    component: EmptyStatesErrorDemo,
  },
  "error-states-generic": {
    name: "error-states-generic",
    path: "src/app/content/ui/error-states/error-states-generic.tsx",
    component: ErrorStatesGenericDemo,
  },
  "error-states-400": {
    name: "error-states-400",
    path: "src/app/content/ui/error-states/error-states-400.tsx",
    component: ErrorStates400Demo,
  },
  "error-states-401": {
    name: "error-states-401",
    path: "src/app/content/ui/error-states/error-states-401.tsx",
    component: ErrorStates401Demo,
  },
  "error-states-403": {
    name: "error-states-403",
    path: "src/app/content/ui/error-states/error-states-403.tsx",
    component: ErrorStates403Demo,
  },
  "error-states-404": {
    name: "error-states-404",
    path: "src/app/content/ui/error-states/error-states-404.tsx",
    component: ErrorStates404Demo,
  },
  "error-states-500": {
    name: "error-states-500",
    path: "src/app/content/ui/error-states/error-states-500.tsx",
    component: ErrorStates500Demo,
  },
  "error-states-503": {
    name: "error-states-503",
    path: "src/app/content/ui/error-states/error-states-503.tsx",
    component: ErrorStates503Demo,
  },
  field: {
    name: "field",
    path: "src/app/content/ui/field/field.tsx",
    component: FieldDemo,
  },
  "field-input": {
    name: "field-input",
    path: "src/app/content/ui/field/field-input.tsx",
    component: FieldInputDemo,
  },
  "field-textarea": {
    name: "field-textarea",
    path: "src/app/content/ui/field/field-textarea.tsx",
    component: FieldTextareaDemo,
  },
  "field-select": {
    name: "field-select",
    path: "src/app/content/ui/field/field-select.tsx",
    component: FieldSelectDemo,
  },
  "field-checkbox": {
    name: "field-checkbox",
    path: "src/app/content/ui/field/field-checkbox.tsx",
    component: FieldCheckboxDemo,
  },
  "field-radio-group": {
    name: "field-radio-group",
    path: "src/app/content/ui/field/field-radio-group.tsx",
    component: FieldRadioGroupDemo,
  },
  "field-switch": {
    name: "field-switch",
    path: "src/app/content/ui/field/field-switch.tsx",
    component: FieldSwitchDemo,
  },
  "field-with-separator": {
    name: "field-separator",
    path: "src/app/content/ui/field/field-separator.tsx",
    component: FieldWithSeparatorDemo,
  },
  "field-with-error": {
    name: "field-with-error",
    path: "src/app/content/ui/field/field-error.tsx",
    component: FieldWithErrorDemo,
  },
  "field-input-icon": {
    name: "field-input-icon",
    path: "src/app/content/ui/field/field-input-icon.tsx",
    component: FieldInputWithIconDemo,
  },
  "field-input-addon": {
    name: "field-input-addon",
    path: "src/app/content/ui/field/field-input-addon.tsx",
    component: FieldInputWithAddonDemo,
  },
  "field-disabled": {
    name: "field-disabled",
    path: "src/app/content/ui/field/field-disabled.tsx",
    component: FieldDisabledDemo,
  },
  "field-readonly": {
    name: "field-readonly",
    path: "src/app/content/ui/field/field-readonly.tsx",
    component: FieldReadOnlyDemo,
  },
  "field-small": {
    name: "field-small",
    path: "src/app/content/ui/field/field-small.tsx",
    component: FieldSmallDemo,
  },
  "field-input-types": {
    name: "field-input-types",
    path: "src/app/content/ui/field/field-input-types.tsx",
    component: FieldInputTypesDemo,
  },
  filter: {
    name: "filter",
    path: "src/app/content/ui/filter/filter.tsx",
    component: FilterDemo,
  },
  "filter-input": {
    name: "filter-input",
    path: "src/app/content/ui/filter/filter-input.tsx",
    component: FilterInputDemo,
  },
  "filter-single-select": {
    name: "filter-single-select",
    path: "src/app/content/ui/filter/filter-single-select.tsx",
    component: FilterSingleSelectDemo,
  },
  "filter-multi-select": {
    name: "filter-multi-select",
    path: "src/app/content/ui/filter/filter-multi-select.tsx",
    component: FilterMultiSelectDemo,
  },
  "filter-with-search": {
    name: "filter-with-search",
    path: "src/app/content/ui/filter/filter-with-search.tsx",
    component: FilterWithSearchDemo,
  },
  "filter-with-avatar": {
    name: "filter-with-avatar",
    path: "src/app/content/ui/filter/filter-with-avatar.tsx",
    component: FilterWithAvatarDemo,
  },
  icon: {
    name: "icon",
    path: "src/app/content/ui/icon/icon-component.tsx",
    component: IconDemo,
  },
  "icon-variants": {
    name: "icon-variants",
    path: "src/app/content/ui/icon/icon-variants.tsx",
    component: IconVariantsDemo,
  },
  "icon-sizing": {
    name: "icon-sizing",
    path: "src/app/content/ui/icon/icon-sizing.tsx",
    component: IconSizingDemo,
  },
  "icon-color-schemes": {
    name: "icon-color-schemes",
    path: "src/app/content/ui/icon/icon-color-schemes.tsx",
    component: IconColorSchemesDemo,
  },
  "icon-subtle": {
    name: "icon-subtle",
    path: "src/app/content/ui/icon/icon-subtle.tsx",
    component: SubtleIconVariantsDemo,
  },
  "icon-filled": {
    name: "icon-filled",
    path: "src/app/content/ui/icon/icon-filled.tsx",
    component: FilledIconVariantsDemo,
  },
  input: {
    name: "input",
    path: "src/app/content/ui/input/input.tsx",
    component: InputDemo,
  },
  "input-email": {
    name: "input-email",
    path: "src/app/content/ui/input/input-email.tsx",
    component: InputEmailDemo,
  },
  "input-text": {
    name: "input-text",
    path: "src/app/content/ui/input/input-text.tsx",
    component: InputTextDemo,
  },
  "input-password": {
    name: "input-password",
    path: "src/app/content/ui/input/input-password.tsx",
    component: InputPasswordDemo,
  },
  "input-file": {
    name: "input-file",
    path: "src/app/content/ui/input/input-file.tsx",
    component: InputFileDemo,
  },
  "input-disabled": {
    name: "input-disabled",
    path: "src/app/content/ui/input/input-disabled.tsx",
    component: DisabledInputDemo,
  },
  "input-group": {
    name: "input-group",
    path: "src/app/content/ui/input-group/input-group.tsx",
    component: InputGroupDemo,
  },
  "input-group-url": {
    name: "input-group-url",
    path: "src/app/content/ui/input-group/input-group-url.tsx",
    component: InputGroupURLDemo,
  },
  "input-group-dropdown": {
    name: "input-group-dropdown",
    path: "src/app/content/ui/input-group/input-group-dropdown.tsx",
    component: InputGroupDropdownDemo,
  },
  inputOtp: {
    name: "inputOtp",
    path: "src/app/content/ui/input-otp/inputotp.tsx",
    component: InputOTPDemo,
  },
  "inputOtp-pattern": {
    name: "inputOtp-pattern",
    path: "src/app/content/ui/input-otp/inputotp-pattern.tsx",
    component: InputOTPPatternDemo,
  },
  "inputOtp-spacing": {
    name: "inputOtp-spacing",
    path: "src/app/content/ui/input-otp/inputotp-spacing.tsx",
    component: InputOTPSpacingDemo,
  },
  kbd: {
    name: "kbd",
    path: "src/app/content/ui/kbd/kbd.tsx",
    component: KbdDemo,
  },
  "kbd-group": {
    name: "kbd-group",
    path: "src/app/content/ui/kbd/kbd-group.tsx",
    component: KbdGroupDemo,
  },
  "kbd-button": {
    name: "kbd-button",
    path: "src/app/content/ui/kbd/kbd-button.tsx",
    component: KbdButtonDemo,
  },
  "kbd-tooltip": {
    name: "kbd-tooltip",
    path: "src/app/content/ui/kbd/kbd-tooltip.tsx",
    component: KbdTooltipDemo,
  },
  "kbd-shortcut": {
    name: "kbd-shortcut",
    path: "src/app/content/ui/kbd/kbd-shortcut.tsx",
    component: KbdShortcutDemo,
  },
  label: {
    name: "label",
    path: "src/app/content/ui/label/label.tsx",
    component: LabelDemo,
  },
  sidebar: {
    name: "sidebar",
    path: "src/app/content/ui/sidebar/sidebar.tsx",
    component: SidebarDemo,
  },
  "sidebar-default": {
    name: "sidebar-default",
    path: "src/app/content/ui/sidebar/sidebar-default.tsx",
    component: SidebarDefaultDemo,
  },
  "sidebar-leading-icon": {
    name: "sidebar-leading-icon",
    path: "src/app/content/ui/sidebar/sidebar-leading-icon.tsx",
    component: SidebarLeadingIconDemo,
  },
  "sidebar-trailing-icon": {
    name: "sidebar-trailing-icon",
    path: "src/app/content/ui/sidebar/sidebar-trailing-icon.tsx",
    component: SidebarTrailingIconDemo,
  },
  "sidebar-icon-combination": {
    name: "sidebar-icon-combination",
    path: "src/app/content/ui/sidebar/sidebar-icon-combination.tsx",
    component: SidebarIconCombinationDemo,
  },
  "stack-navigation": {
    name: "stack-navigation",
    path: "src/app/content/ui/stack-navigation/stack-navigation.tsx",
    component: StackNavigationDemo,
  },
  "stack-navigation-horizontal": {
    name: "stack-navigation-horizontal",
    path: "src/app/content/ui/stack-navigation/stack-navigation-horizontal.tsx",
    component: StackNavigationHorizontalDemo,
  },
  "stack-navigation-horizontal-tabs": {
    name: "stack-navigation-horizontal-tabs",
    path: "src/app/content/ui/stack-navigation/stack-navigation-horizontal-tabs.tsx",
    component: StackNavigationHorizontalTabsDemo,
  },
  "stack-navigation-color-schemes": {
    name: "stack-navigation-color-schemes",
    path: "src/app/content/ui/stack-navigation/stack-navigation-color-schemes.tsx",
    component: StackNavigationColorSchemesDemo,
  },
  "navigation-menu": {
    name: "navigation-menu",
    path: "src/app/content/ui/navigation-menu/navigation-menu.tsx",
    component: NavigationMenuDemo,
  },
  "navigation-menu-secondary": {
    name: "navigation-menu-secondary",
    path: "src/app/content/ui/navigation-menu/navigation-menu-secondary.tsx",
    component: NavigationMenuSecondaryDemo,
  },
  pagination: {
    name: "pagination",
    path: "src/app/content/ui/pagination/pagination.tsx",
    component: PaginationDemo,
  },
  popover: {
    name: "popover",
    path: "src/app/content/ui/popover/popover.tsx",
    component: PopoverDemo,
  },
  progress: {
    name: "progress",
    path: "src/app/content/ui/progress/progress.tsx",
    component: ProgressDemo,
  },
  "radio-group": {
    name: "radio-group",
    path: "src/app/content/ui/radio-group/radio-group.tsx",
    component: RadioGroupDemo,
  },
  resizable: {
    name: "resizable",
    path: "src/app/content/ui/resizable/resizable.tsx",
    component: ResizableDemo,
  },
  "resizable-vertical": {
    name: "resizable-vertical",
    path: "src/app/content/ui/resizable/resizable-vertical.tsx",
    component: VerticalResizableDemo,
  },
  "resizable-handle": {
    name: "resizable-handle",
    path: "src/app/content/ui/resizable/resizable-handle.tsx",
    component: ResizableHandleDemo,
  },
  "scroll-area": {
    name: "scroll-area",
    path: "src/app/content/ui/scroll-area/scroll-area.tsx",
    component: ScrollAreaDemo,
  },
  "scroll-area-horizontal": {
    name: "scroll-area-horizontal",
    path: "src/app/content/ui/scroll-area/scroll-area-horizontal.tsx",
    component: HorizontalScrollAreaDemo,
  },
  "search-input": {
    name: "search-input",
    path: "src/app/content/ui/search-input/search-input-default.tsx",
    component: SearchInputDefaultDemo,
  },
  select: {
    name: "select",
    path: "src/app/content/ui/select/select.tsx",
    component: SelectDemo,
  },
  "select-large-list": {
    name: "select-large-list",
    path: "src/app/content/ui/select/select-large-list.tsx",
    component: SelectLargeListDemo,
  },
  "select-icon": {
    name: "select-icon",
    path: "src/app/content/ui/select/select-icon.tsx",
    component: SelectWithIconDemo,
  },
  "select-disabled": {
    name: "select-disabled",
    path: "src/app/content/ui/select/select-disabled.tsx",
    component: DisabledSelectDemo,
  },
  "select-react": {
    name: "select-react",
    path: "src/app/content/ui/select-react/select-react.tsx",
    component: SelectReactDemo,
  },
  separator: {
    name: "separator",
    path: "src/app/content/ui/separator/separator.tsx",
    component: SeparatorDemo,
  },
  sheet: {
    name: "sheet",
    path: "src/app/content/ui/sheet/sheet.tsx",
    component: SheetDemo,
  },
  "sheet-directions": {
    name: "sheet-directions",
    path: "src/app/content/ui/sheet/sheet-directions.tsx",
    component: SheetDirectionsDemo,
  },
  skeleton: {
    name: "skeleton",
    path: "src/app/content/ui/skeleton/skeleton.tsx",
    component: SkeletonDemo,
  },
  "skeleton-card": {
    name: "skeleton-card",
    path: "src/app/content/ui/skeleton/skeleton-card.tsx",
    component: SkeletonCardListDemo,
  },
  slider: {
    name: "slider",
    path: "src/app/content/ui/slider/slider.tsx",
    component: SliderDemo,
  },
  sonner: {
    name: "sonner",
    path: "src/app/content/ui/sonner/sonner.tsx",
    component: SonnerDemo,
  },
  "sonner-success": {
    name: "sonner-success",
    path: "src/app/content/ui/sonner/sonner-success.tsx",
    component: SonnerSuccessDemo,
  },
  "sonner-warning": {
    name: "sonner-warning",
    path: "src/app/content/ui/sonner/sonner-warning.tsx",
    component: SonnerWarningDemo,
  },
  "sonner-error": {
    name: "sonner-error",
    path: "src/app/content/ui/sonner/sonner-error.tsx",
    component: SonnerErrorDemo,
  },
  "sonner-action": {
    name: "sonner-action",
    path: "src/app/content/ui/sonner/sonner-action.tsx",
    component: SonnerActionDemo,
  },
  "sonner-closable": {
    name: "sonner-closable",
    path: "src/app/content/ui/sonner/sonner-closable.tsx",
    component: SonnerClosableDemo,
  },
  spinner: {
    name: "spinner",
    path: "src/app/content/ui/spinner/spinner.tsx",
    component: SpinnerDemo,
  },
  "spinner-size": {
    name: "spinner-size",
    path: "src/app/content/ui/spinner/spinner-size.tsx",
    component: SpinnerSizeDemo,
  },
  stepper: {
    name: "stepper",
    path: "src/app/content/ui/stepper/stepper.tsx",
    component: StepperDemo,
  },
  switch: {
    name: "switch",
    path: "src/app/content/ui/switch/switch.tsx",
    component: SwitchDemo,
  },
  "switch-danger": {
    name: "switch-danger",
    path: "src/app/content/ui/switch/switch-danger.tsx",
    component: SwitchDangerDemo,
  },
  "switch-success": {
    name: "switch-success",
    path: "src/app/content/ui/switch/switch-success.tsx",
    component: SwitchSuccessDemo,
  },
  table: {
    name: "table",
    path: "src/app/content/ui/table/table.tsx",
    component: TableDemo,
  },
  "table-sm": {
    name: "table-sm",
    path: "src/app/content/ui/table/table-sm.tsx",
    component: TableSmDemo,
  },
  "table-lg": {
    name: "table-lg",
    path: "src/app/content/ui/table/table-lg.tsx",
    component: TableLgDemo,
  },
  "table-sticky-scroll": {
    name: "table-sticky-scroll",
    path: "src/app/content/ui/table/table-sticky-scroll.tsx",
    component: TableStickyScrollDemo,
  },
  "table-pinned": {
    name: "table-pinned",
    path: "src/app/content/ui/table/table-pinned.tsx",
    component: TablePinnedDemo,
  },
  tabs: {
    name: "tabs",
    path: "src/app/content/ui/tabs/tabs.tsx",
    component: TabsDemo,
  },
  "tabs-line": {
    name: "tabs-line",
    path: "src/app/content/ui/tabs/tabs-line.tsx",
    component: TabsLineVariantDemo,
  },
  "tabs-line-icon": {
    name: "tabs-line-icon",
    path: "src/app/content/ui/tabs/tabs-line-icon.tsx",
    component: TabsLineVariantWithIconsDemo,
  },
  "tabs-soft-rounded": {
    name: "tabs-soft-rounded",
    path: "src/app/content/ui/tabs/tabs-soft-rounded.tsx",
    component: TabsSoftRoundedVariantDemo,
  },
  "tabs-icons": {
    name: "tabs-icons",
    path: "src/app/content/ui/tabs/tabs-icons.tsx",
    component: TabsWithIconsDemo,
  },
  textarea: {
    name: "textarea",
    path: "src/app/content/ui/textarea/textarea.tsx",
    component: TextareaDemo,
  },
  "textarea-invalid": {
    name: "textarea-invalid",
    path: "src/app/content/ui/textarea/textarea-invalid.tsx",
    component: InvalidTextareaDemo,
  },
  "textarea-with-label": {
    name: "textarea-with-label",
    path: "src/app/content/ui/textarea/textarea-label.tsx",
    component: TextareaWithLabelDemo,
  },
  "textarea-with-label-and-description": {
    name: "textarea-with-label-and-description",
    path: "src/app/content/ui/textarea/textarea-label-description.tsx",
    component: TextareaWithLabelAndDescriptionDemo,
  },
  "textarea-disabled": {
    name: "textarea-disabled",
    path: "src/app/content/ui/textarea/textarea-disabled.tsx",
    component: DisabledTextareaDemo,
  },
  "textarea-small": {
    name: "textarea-small",
    path: "src/app/content/ui/textarea/textarea-small.tsx",
    component: SmallTextareaDemo,
  },
  "textarea-large": {
    name: "textarea-large",
    path: "src/app/content/ui/textarea/textarea-large.tsx",
    component: LargeTextareaDemo,
  },
  "textarea-with-default-value": {
    name: "textarea-with-default-value",
    path: "src/app/content/ui/textarea/textarea-default-value.tsx",
    component: TextareaWithDefaultValueDemo,
  },
  "time-picker": {
    name: "time-picker",
    path: "src/app/content/ui/time-picker/time-picker.tsx",
    component: TimePickerDemo,
  },
  timeline: {
    name: "timeline",
    path: "src/app/content/ui/timeline/timeline.tsx",
    component: TimelineDemo,
  },
  "timeline-variants": {
    name: "timeline-variants",
    path: "src/app/content/ui/timeline/timeline-variants.tsx",
    component: TimelineVariantsDemo,
  },
  "timeline-sizes": {
    name: "timeline-sizes",
    path: "src/app/content/ui/timeline/timeline-sizes.tsx",
    component: TimelineSizesDemo,
  },
  "timeline-connector-variants": {
    name: "timeline-connector-variants",
    path: "src/app/content/ui/timeline/timeline-connector-variants.tsx",
    component: TimelineConnectorVariantsDemo,
  },
  "toggle-square": {
    name: "toggle-square",
    path: "src/app/content/ui/toggle/toggle-square.tsx",
    component: SquareToggleDemo,
  },
  "toggle-sizes": {
    name: "toggle-sizes",
    path: "src/app/content/ui/toggle/toggle-sizes.tsx",
    component: ToggleSizesDemo,
  },
  "toggle-variants": {
    name: "toggle-variants",
    path: "src/app/content/ui/toggle/toggle-variants.tsx",
    component: ToggleVariantsDemo,
  },
  "toggle-rounded": {
    name: "toggle-rounded",
    path: "src/app/content/ui/toggle/toggle-rounded.tsx",
    component: RoundedToggleDemo,
  },
  "toggle-group-square": {
    name: "toggle-group-square",
    path: "src/app/content/ui/toggle-group/toggle-group-square.tsx",
    component: SquareToggleGroupDemo,
  },
  "toggle-group-rounded": {
    name: "toggle-group-rounded",
    path: "src/app/content/ui/toggle-group/toggle-group-rounded.tsx",
    component: RoundedToggleGroupDemo,
  },
  "toggle-group-sizes": {
    name: "toggle-group-sizes",
    path: "src/app/content/ui/toggle-group/toggle-group-sizes.tsx",
    component: ToggleGroupSizesDemo,
  },
  "toggle-outline-group": {
    name: "toggle-outline-group",
    path: "src/app/content/ui/toggle-group/toggle-outline-group.tsx",
    component: ToggleOutlineGroupDemo,
  },
  tooltip: {
    name: "tooltip",
    path: "src/app/content/ui/tooltip/tooltip.tsx",
    component: TooltipDemo,
  },

  // BLOKS
  "all-site": {
    name: "all-site",
    path: "src/app/content/bloks/all-site-section/all-site-section.tsx",
    component: AllSitesSectionDemo,
  },
  collaboration: {
    name: "collaboration",
    path: "src/app/content/bloks/collaboration/collaboration.tsx",
    component: CollaborationDemo,
  },
  "dashboard-widget": {
    name: "dashboard-widget",
    path: "src/app/content/bloks/dashboard-widget/dashboard-widget.tsx",
    component: DashboardWidgetDemo,
  },
  "dashboard-widget-white-bg-large": {
    name: "dashboard-widget-white-bg-large",
    path: "src/app/content/bloks/dashboard-widget/dashboard-widget-white-bg-large.tsx",
    component: DashboardWidgetWhiteBgLargeDemo,
  },
  "dashboard-widget-gray-bg-large": {
    name: "dashboard-widget-gray-bg-large",
    path: "src/app/content/bloks/dashboard-widget/dashboard-widget-gray-bg-large.tsx",
    component: DashboardWidgetGrayBgLargeDemo,
  },
  "pinned-site": {
    name: "pinned-site",
    path: "src/app/content/bloks/pinned-site-section/pinned-site-section.tsx",
    component: PinnedSitesSectionDemo,
  },
  "prompt-input": {
    name: "prompt-input",
    path: "src/app/content/bloks/prompt-input/prompt-input.tsx",
    component: PromptInputDemo,
  },
  "prompt-input-floating": {
    name: "prompt-input-floating",
    path: "src/app/content/bloks/prompt-input/prompt-input-floating.tsx",
    component: PromptInputFloatingDemo,
  },
  "prompt-input-queued": {
    name: "prompt-input-queued",
    path: "src/app/content/bloks/prompt-input/prompt-input-queued.tsx",
    component: PromptInputQueuedDemo,
  },
  "prompt-input-questions": {
    name: "prompt-input-questions",
    path: "src/app/content/bloks/prompt-input/prompt-input-questions.tsx",
    component: PromptInputQuestionsDemo,
  },
  "sidebar-rhs": {
    name: "sidebar-rhs",
    path: "src/app/content/bloks/sidebar-rhs/sidebar-rhs.tsx",
    component: SidebarRHSDemo,
  },
  "sidebar-rhs-heading-with-tabs": {
    name: "sidebar-rhs-heading-with-tabs",
    path: "src/app/content/bloks/sidebar-rhs/sidebar-rhs-heading-with-tabs.tsx",
    component: SidebarRHSHeadingWithTabsDemo,
  },
  "sidebar-rhs-brief": {
    name: "sidebar-rhs-brief",
    path: "src/app/content/bloks/sidebar-rhs/sidebar-rhs-brief.tsx",
    component: SidebarRHSBriefDemo,
  },
  "sidebar-rhs-brief-type": {
    name: "sidebar-rhs-brief-type",
    path: "src/app/content/bloks/sidebar-rhs/sidebar-rhs-brief-type.tsx",
    component: SidebarRHSBriefTypeDemo,
  },
  "sidebar-rhs-content": {
    name: "sidebar-rhs-content",
    path: "src/app/content/bloks/sidebar-rhs/sidebar-rhs-content.tsx",
    component: SidebarRHSContentDemo,
  },
  "site-card": {
    name: "site-card",
    path: "src/app/content/bloks/site-card/site-card.tsx",
    component: SiteCardDemo,
  },
  topbar: {
    name: "topbar",
    path: "src/app/content/bloks/topbar/topbar.tsx",
    component: TopbarDemo,
  },
};
