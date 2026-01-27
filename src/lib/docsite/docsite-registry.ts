import type { ComponentType } from "react";

// PRIMITIVES
import AccordionDemo from "@/app/content/ui/accordion";
import AlertDemo from "@/app/content/ui/alert";
import ButtonLinkAlertDemo from "@/app/content/ui/alert-button-link";
import ClosableAlertDemo from "@/app/content/ui/alert-closable";
import AlertDangerDemo from "@/app/content/ui/alert-danger";
import AlertDialogDemo from "@/app/content/ui/alert-dialog";
import AlertPrimaryDemo from "@/app/content/ui/alert-primary";
import AlertSuccessDemo from "@/app/content/ui/alert-success";
import AlertWarningDemo from "@/app/content/ui/alert-warning";
import AspectRatioDemo from "@/app/content/ui/aspect-ratio";
import AvatarDemo from "@/app/content/ui/avatar";
import AvatarFallbackDemo from "@/app/content/ui/avatar-fallback";
import AvatarInteractiveDemo from "@/app/content/ui/avatar-interactive";
import AvatarLargeDemo from "@/app/content/ui/avatar-large";
import AvatarMenuDemo from "@/app/content/ui/avatar-menu";
import BadgeDemo from "@/app/content/ui/badge";
import BoldBadgeDemo from "@/app/content/ui/badge-bold";
import ClosableBadgeDemo from "@/app/content/ui/badge-closable";
import BadgeColorSchemesDemo from "@/app/content/ui/badge-color-schemes";
import BadgeLinksDemo from "@/app/content/ui/badge-link";
import BadgeSizingDemo from "@/app/content/ui/badge-sizing";
import BreadcrumbDemo from "@/app/content/ui/breadcrumb";
import ButtonDemo from "@/app/content/ui/button";
import ButtonColorSchemeDemo from "@/app/content/ui/button-color-schemes";
import ButtonDisabledDemo from "@/app/content/ui/button-disabled";
import ButtonIconSizingDemo from "@/app/content/ui/button-icon-sizing";
import ButtonIconTextDemo from "@/app/content/ui/button-icon-text";
import ButtonSizingDemo from "@/app/content/ui/button-sizing";
import ButtonVariantsDemo from "@/app/content/ui/button-variants";
import CalendarDemo from "@/app/content/ui/calendar";
import MultipleCalendarDemo from "@/app/content/ui/calendar-multiple";
import CardDefaultDemo from "@/app/content/ui/card";
import CardElevationDemo from "@/app/content/ui/card-elevation";
import CardPaddingDemo from "@/app/content/ui/card-padding";
import CardStyleDemo from "@/app/content/ui/card-style";
import CardStyledDemo from "@/app/content/ui/card-styled";
import CarouselDemo from "@/app/content/ui/carousel";
import CarouselNegativeMarginDemo from "@/app/content/ui/carousel-negative-margin";
import CarouselStartAlignedDemo from "@/app/content/ui/carousel-start-aligned";
import AreaChartDemo from "@/app/content/ui/chart-area";
import BarChartDemo from "@/app/content/ui/chart-bar";
import LineChartDemo from "@/app/content/ui/chart-line";
import BarMixedChartDemo from "@/app/content/ui/chart-mixed-bar";
import PieChartDemo from "@/app/content/ui/chart-pie";
import CheckboxDemo from "@/app/content/ui/checkbox";
import CheckboxWithDescriptionDemo from "@/app/content/ui/checkbox-description";
import DisabledCheckboxDemo from "@/app/content/ui/checkbox-disabled";
import EnabledCheckboxLabelDemo from "@/app/content/ui/checkbox-label";
import CollapsibleDemo from "@/app/content/ui/collapsible";
import ComboboxWithCheckboxDemo from "@/app/content/ui/combobox-checkbox";
import FrameworkComboboxDemo from "@/app/content/ui/combobox-framework";
import TimezoneComboboxDemo from "@/app/content/ui/combobox-timezone";
import UserComboboxDemo from "@/app/content/ui/combobox-user";
import CommandDemo from "@/app/content/ui/command";
import ContextMenuDemo from "@/app/content/ui/context-menu";
import DatePickerSimpleDemo from "@/app/content/ui/date-picker";
import DatePickerWithRangeDemo from "@/app/content/ui/date-picker-range";
import DialogDemo from "@/app/content/ui/dialog";
import ScrollableDialogDemo from "@/app/content/ui/dialog-scrollable";
import StickyFooterDialogDemo from "@/app/content/ui/dialog-sticky-footer";
import DraggableBasicDragDropDemo from "@/app/content/ui/draggable-basic";
import DraggableCustomHandleDemo from "@/app/content/ui/draggable-custom-handle";
import DraggableDragDropSortableDemo from "@/app/content/ui/draggable-drag-drop-sort";
import DrawerDemo from "@/app/content/ui/drawer";
import DrawerDirectionDemo from "@/app/content/ui/drawer-directions";
import DrawerScrollableDemo from "@/app/content/ui/drawer-scrollable";
import DropdownMenuDemo from "@/app/content/ui/dropdown-menu";
import DropdownMenuAvatarDemo from "@/app/content/ui/dropdown-menu-avatar";
import DropdownMenuAvatarOnlyDemo from "@/app/content/ui/dropdown-menu-avatar-only";
import DropdownMenuCheckboxesDemo from "@/app/content/ui/dropdown-menu-checkboxes";
import DropdownMenuIconColorDemo from "@/app/content/ui/dropdown-menu-icon-color";
import DropdownMenuRadioGroupDemo from "@/app/content/ui/dropdown-menu-radio-group";
import EmptyStatesErrorDemo from "@/app/content/ui/empty-states-error";
import EmptyStatesNoSearchResultsDemo from "@/app/content/ui/empty-states-no-search-results";
import EmptyStatesNothingCreatedDemo from "@/app/content/ui/empty-states-nothing-created";
import ErrorStates400Demo from "@/app/content/ui/error-states-400";
import ErrorStates401Demo from "@/app/content/ui/error-states-401";
import ErrorStates403Demo from "@/app/content/ui/error-states-403";
import ErrorStates404Demo from "@/app/content/ui/error-states-404";
import ErrorStates500Demo from "@/app/content/ui/error-states-500";
import ErrorStates503Demo from "@/app/content/ui/error-states-503";
import ErrorStatesGenericDemo from "@/app/content/ui/error-states-generic";
import HoverCardDemo from "@/app/content/ui/hover-card";
import IconColorSchemesDemo from "@/app/content/ui/icon-color-schemes";
import IconDemo from "@/app/content/ui/icon-component";
import FilledIconVariantsDemo from "@/app/content/ui/icon-filled";
import IconSizingDemo from "@/app/content/ui/icon-sizing";
import SubtleIconVariantsDemo from "@/app/content/ui/icon-subtle";
import IconVariantsDemo from "@/app/content/ui/icon-variants";
import InputDemo from "@/app/content/ui/input";
import DisabledInputDemo from "@/app/content/ui/input-disabled";
import InputEmailDemo from "@/app/content/ui/input-email";
import InputFileDemo from "@/app/content/ui/input-file";
import InputPasswordDemo from "@/app/content/ui/input-password";
import InputTextDemo from "@/app/content/ui/input-text";
import InputOTPDemo from "@/app/content/ui/inputotp";
import InputOTPPatternDemo from "@/app/content/ui/inputotp-pattern";
import InputOTPSpacingDemo from "@/app/content/ui/inputotp-spacing";
import LabelDemo from "@/app/content/ui/label";
import NavigationMenuDemo from "@/app/content/ui/navigation-menu";
import NavigationMenuSecondaryDemo from "@/app/content/ui/navigation-menu-secondary";
import PaginationDemo from "@/app/content/ui/pagination";
import PopoverDemo from "@/app/content/ui/popover";
import ProgressDemo from "@/app/content/ui/progress";
import RadioGroupDemo from "@/app/content/ui/radio-group";
import ResizableDemo from "@/app/content/ui/resizable";
import ResizableHandleDemo from "@/app/content/ui/resizable-handle";
import VerticalResizableDemo from "@/app/content/ui/resizable-vertical";
import ScrollAreaDemo from "@/app/content/ui/scroll-area";
import HorizontalScrollAreaDemo from "@/app/content/ui/scroll-area-horizontal";
import SelectDemo from "@/app/content/ui/select";
import DisabledSelectDemo from "@/app/content/ui/select-disabled";
import SelectWithIconDemo from "@/app/content/ui/select-icon";
import SelectLargeListDemo from "@/app/content/ui/select-large-list";
import SeparatorDemo from "@/app/content/ui/separator";
import SheetDemo from "@/app/content/ui/sheet";
import SheetDirectionsDemo from "@/app/content/ui/sheet-directions";
import SidebarDemo from "@/app/content/ui/sidebar";
import SkeletonDemo from "@/app/content/ui/skeleton";
import SkeletonCardListDemo from "@/app/content/ui/skeleton-card";
import SliderDemo from "@/app/content/ui/slider";
import SonnerDemo from "@/app/content/ui/sonner";
import SonnerActionDemo from "@/app/content/ui/sonner-action";
import SonnerClosableDemo from "@/app/content/ui/sonner-closable";
import SonnerErrorDemo from "@/app/content/ui/sonner-error";
import SonnerSuccessDemo from "@/app/content/ui/sonner-success";
import SonnerWarningDemo from "@/app/content/ui/sonner-warning";
import SpinnerDemo from "@/app/content/ui/spinner";
import StackNavigationDemo from "@/app/content/ui/stack-navigation";
import StackNavigationHorizontalDemo from "@/app/content/ui/stack-navigation-horizontal";
import StackNavigationHorizontalTabsDemo from "@/app/content/ui/stack-navigation-horizontal-tabs";
import SwitchDemo from "@/app/content/ui/switch";
import SwitchDangerDemo from "@/app/content/ui/switch-danger";
import SwitchSuccessDemo from "@/app/content/ui/switch-success";
import TableDemo from "@/app/content/ui/table";
import { DataTableDemo } from "@/app/content/ui/table-data";
import TabsDemo from "@/app/content/ui/tabs";
import TabsWithIconsDemo from "@/app/content/ui/tabs-icons";
import TabsLineVariantDemo from "@/app/content/ui/tabs-line";
import TabsLineVariantWithIconsDemo from "@/app/content/ui/tabs-line-icon";
import TabsSoftRoundedVariantDemo from "@/app/content/ui/tabs-soft-rounded";
import TextareaDemo from "@/app/content/ui/textarea";
import TextareaWithDefaultValueDemo from "@/app/content/ui/textarea-default-value";
import DisabledTextareaDemo from "@/app/content/ui/textarea-disabled";
import InvalidTextareaDemo from "@/app/content/ui/textarea-invalid";
import TextareaWithLabelDemo from "@/app/content/ui/textarea-label";
import TextareaWithLabelAndDescriptionDemo from "@/app/content/ui/textarea-label-description";
import LargeTextareaDemo from "@/app/content/ui/textarea-large";
import SmallTextareaDemo from "@/app/content/ui/textarea-small";
import TimePickerDemo from "@/app/content/ui/time-picker";
import RoundedToggleGroupDemo from "@/app/content/ui/toggle-group-rounded";
import SquareToggleGroupDemo from "@/app/content/ui/toggle-group-square";
import RoundedToggleDemo from "@/app/content/ui/toggle-rounded";
import SquareToggleDemo from "@/app/content/ui/toggle-square";
import TooltipDemo from "@/app/content/ui/tooltip";
import TopbarDemo from "@/app/content/ui/topbar";

import AllSitesSectionDemo from "@/app/content/bloks/all-site-section";
import CollaborationDemo from "@/app/content/bloks/collaboration";
import PinnedSitesSectionDemo from "@/app/content/bloks/pinned-site-section";
// BLOKS
import SiteCardDemo from "@/app/content/bloks/site-card";
import { ActionBarDemo } from "@/app/content/ui/action-bar";
import CircularProgressDemo from "@/app/content/ui/circular-progress";
import CircularProgressWithTextDemo from "@/app/content/ui/circular-progress-text";
import CircularProgressVariantsDemo from "@/app/content/ui/circular-progress-variants";
import EditableDemo from "@/app/content/ui/editable";
import EditableTextareaDemo from "@/app/content/ui/editable-textarea";
import FieldDemo from "@/app/content/ui/field";
import FieldCheckboxDemo from "@/app/content/ui/field-checkbox";
import FieldDisabledDemo from "@/app/content/ui/field-disabled";
import FieldWithErrorDemo from "@/app/content/ui/field-error";
import FieldInputDemo from "@/app/content/ui/field-input";
import FieldInputWithAddonDemo from "@/app/content/ui/field-input-addon";
import FieldInputWithIconDemo from "@/app/content/ui/field-input-icon";
import FieldInputTypesDemo from "@/app/content/ui/field-input-types";
import FieldRadioGroupDemo from "@/app/content/ui/field-radio-group";
import FieldReadOnlyDemo from "@/app/content/ui/field-readonly";
import FieldSelectDemo from "@/app/content/ui/field-select";
import FieldWithSeparatorDemo from "@/app/content/ui/field-separator";
import FieldSmallDemo from "@/app/content/ui/field-small";
import FieldSwitchDemo from "@/app/content/ui/field-switch";
import FieldTextareaDemo from "@/app/content/ui/field-textarea";
import InputGroupDemo from "@/app/content/ui/input-group";
import InputGroupDropdownDemo from "@/app/content/ui/input-group-dropdown";
import InputGroupSearchDemo from "@/app/content/ui/input-group-search";
import InputGroupURLDemo from "@/app/content/ui/input-group-url";
import KbdDemo from "@/app/content/ui/kbd";
import KbdButtonDemo from "@/app/content/ui/kbd-button";
import KbdGroupDemo from "@/app/content/ui/kbd-group";
import KbdShortcutDemo from "@/app/content/ui/kbd-shortcut";
import KbdTooltipDemo from "@/app/content/ui/kbd-tooltip";
import SelectReactDemo from "@/app/content/ui/select-react";
import SpinnerBadgeDemo from "@/app/content/ui/spinner-badge";
import SpinnerButtonDemo from "@/app/content/ui/spinner-button";
import SpinnerSizeDemo from "@/app/content/ui/spinner-size";
import StepperDemo from "@/app/content/ui/stepper";
import TimelineDemo from "@/app/content/ui/timeline";
import TimelineConnectorVariantsDemo from "@/app/content/ui/timeline-connector-variants";
import TimelineSizesDemo from "@/app/content/ui/timeline-sizes";
import TimelineVariantsDemo from "@/app/content/ui/timeline-variants";
import FilterDemo from "@/app/content/ui/filter";
import FilterInputDemo from "@/app/content/ui/filter-input";
import FilterSingleSelectDemo from "@/app/content/ui/filter-single-select";
import FilterMultiSelectDemo from "@/app/content/ui/filter-multi-select";
import FilterToggleDemo from "@/app/content/ui/filter-toggle";

export interface DocsiteRegistryEntry {
  name: string;
  path: string;
  component?: ComponentType<any>; // optional
}

export const docsiteRegistry: Record<string, DocsiteRegistryEntry> = {
  // PRIMITIVES
  accordion: {
    name: "accordion",
    path: "src/app/content/ui/accordion.tsx",
    component: AccordionDemo,
  },
  "action-bar": {
    name: "action-bar",
    path: "src/app/content/ui/action-bar.tsx",
    component: ActionBarDemo,
  },
  alert: {
    name: "alert",
    path: "src/app/content/ui/alert.tsx",
    component: AlertDemo,
  },
  "alert-primary": {
    name: "alert-primary",
    path: "src/app/content/ui/alert-primary.tsx",
    component: AlertPrimaryDemo,
  },
  "alert-success": {
    name: "alert-success",
    path: "src/app/content/ui/alert-success.tsx",
    component: AlertSuccessDemo,
  },
  "alert-danger": {
    name: "alert-danger",
    path: "src/app/content/ui/alert-danger.tsx",
    component: AlertDangerDemo,
  },
  "alert-warning": {
    name: "alert-warning",
    path: "src/app/content/ui/alert-warning.tsx",
    component: AlertWarningDemo,
  },
  "alert-closable": {
    name: "alert-closable",
    path: "src/app/content/ui/alert-closable.tsx",
    component: ClosableAlertDemo,
  },
  "alert-button-link": {
    name: "alert-button-link",
    path: "src/app/content/ui/alert-button-link.tsx",
    component: ButtonLinkAlertDemo,
  },
  "alert-dialog": {
    name: "alert-dialog",
    path: "src/app/content/ui/alert-dialog.tsx",
    component: AlertDialogDemo,
  },
  "aspect-ratio": {
    name: "aspect-ratio",
    path: "src/app/content/ui/aspect-ratio.tsx",
    component: AspectRatioDemo,
  },
  avatar: {
    name: "avatar",
    path: "src/app/content/ui/avatar.tsx",
    component: AvatarDemo,
  },
  "avatar-fallback": {
    name: "avatar-fallback",
    path: "src/app/content/ui/avatar-fallback.tsx",
    component: AvatarFallbackDemo,
  },
  "avatar-large": {
    name: "avatar-large",
    path: "src/app/content/ui/avatar-large.tsx",
    component: AvatarLargeDemo,
  },
  "avatar-interactive": {
    name: "avatar-interactive",
    path: "src/app/content/ui/avatar-interactive.tsx",
    component: AvatarInteractiveDemo,
  },
  "avatar-menu": {
    name: "avatar-menu",
    path: "src/app/content/ui/avatar-menu.tsx",
    component: AvatarMenuDemo,
  },
  badge: {
    name: "badge",
    path: "src/app/content/ui/badge.tsx",
    component: BadgeDemo,
  },
  "badge-sizing": {
    name: "badge-sizing",
    path: "src/app/content/ui/badge-sizing.tsx",
    component: BadgeSizingDemo,
  },
  "badge-color-schemes": {
    name: "badge-color-schemes",
    path: "src/app/content/ui/badge-color-schemes.tsx",
    component: BadgeColorSchemesDemo,
  },
  "badge-bold": {
    name: "badge-bold",
    path: "src/app/content/ui/badge-bold.tsx",
    component: BoldBadgeDemo,
  },
  "badge-link": {
    name: "badge-link",
    path: "src/app/content/ui/badge-link.tsx",
    component: BadgeLinksDemo,
  },
  "badge-closable": {
    name: "badge-closable",
    path: "src/app/content/ui/badge-closable.tsx",
    component: ClosableBadgeDemo,
  },
  breadcrumb: {
    name: "breadcrumb",
    path: "src/app/content/ui/breadcrumb.tsx",
    component: BreadcrumbDemo,
  },
  button: {
    name: "button",
    path: "src/app/content/ui/button.tsx",
    component: ButtonDemo,
  },
  "button-variants": {
    name: "button-variants",
    path: "src/app/content/ui/button-variants.tsx",
    component: ButtonVariantsDemo,
  },
  "button-sizing": {
    name: "button-sizing",
    path: "src/app/content/ui/button-sizing.tsx",
    component: ButtonSizingDemo,
  },
  "button-color-schemes": {
    name: "button-color-schemes",
    path: "src/app/content/ui/button-color-schemes.tsx",
    component: ButtonColorSchemeDemo,
  },
  "button-icon-sizing": {
    name: "button-icon-sizing",
    path: "src/app/content/ui/button-icon-sizing.tsx",
    component: ButtonIconSizingDemo,
  },
  "button-icon-text": {
    name: "button-icon-text",
    path: "src/app/content/ui/button-icon-text.tsx",
    component: ButtonIconTextDemo,
  },
  "button-disabled": {
    name: "button-disabled",
    path: "src/app/content/ui/button-disabled.tsx",
    component: ButtonDisabledDemo,
  },
  calendar: {
    name: "calendar",
    path: "src/app/content/ui/calendar.tsx",
    component: CalendarDemo,
  },
  "calendar-multiple": {
    name: "calendar-multiple",
    path: "src/app/content/ui/calendar-multiple.tsx",
    component: MultipleCalendarDemo,
  },
  card: {
    name: "card",
    path: "src/app/content/ui/card.tsx",
    component: CardDefaultDemo,
  },
  "card-elevation": {
    name: "card-elevation",
    path: "src/app/content/ui/card-elevation.tsx",
    component: CardElevationDemo,
  },
  "card-style": {
    name: "card-style",
    path: "src/app/content/ui/card-style.tsx",
    component: CardStyleDemo,
  },
  "card-padding": {
    name: "card-padding",
    path: "src/app/content/ui/card-padding.tsx",
    component: CardPaddingDemo,
  },
  "card-styled": {
    name: "card-styled",
    path: "src/app/content/ui/card-styled.tsx",
    component: CardStyledDemo,
  },
  carousel: {
    name: "carousel",
    path: "src/app/content/ui/carousel.tsx",
    component: CarouselDemo,
  },
  "carousel-start-aligned": {
    name: "carousel-start-aligned",
    path: "src/app/content/ui/carousel-start-aligned.tsx",
    component: CarouselStartAlignedDemo,
  },
  "carousel-negative-margin": {
    name: "carousel-negative-margin",
    path: "src/app/content/ui/carousel-negative-margin.tsx",
    component: CarouselNegativeMarginDemo,
  },
  "area-chart": {
    name: "area-chart",
    path: "src/app/content/ui/chart-area.tsx",
    component: AreaChartDemo,
  },
  "bar-chart": {
    name: "bar-chart",
    path: "src/app/content/ui/chart-bar.tsx",
    component: BarChartDemo,
  },
  "mixed-bar-chart": {
    name: "mixed-bar-chart",
    path: "src/app/content/ui/chart-mixed-bar.tsx",
    component: BarMixedChartDemo,
  },
  "line-chart": {
    name: "line-chart",
    path: "src/app/content/ui/chart-line.tsx",
    component: LineChartDemo,
  },
  "pie-chart": {
    name: "pie-chart",
    path: "src/app/content/ui/chart-pie.tsx",
    component: PieChartDemo,
  },
  checkbox: {
    name: "checkbox",
    path: "src/app/content/ui/checkbox.tsx",
    component: CheckboxDemo,
  },
  "checkbox-description": {
    name: "checkbox-description",
    path: "src/app/content/ui/checkbox-description.tsx",
    component: CheckboxWithDescriptionDemo,
  },
  "checkbox-disabled": {
    name: "checkbox-disabled",
    path: "src/app/content/ui/checkbox-disabled.tsx",
    component: DisabledCheckboxDemo,
  },
  "checkbox-label": {
    name: "checkbox-label",
    path: "src/app/content/ui/checkbox-label.tsx",
    component: EnabledCheckboxLabelDemo,
  },
  "circular-progress": {
    name: "circular-progress",
    path: "src/app/content/ui/circular-progress.tsx",
    component: CircularProgressDemo,
  },
  "circular-progress-variants": {
    name: "circular-progress-variants",
    path: "src/app/content/ui/circular-progress-variants.tsx",
    component: CircularProgressVariantsDemo,
  },
  "circular-progress-text": {
    name: "circular-progress-text",
    path: "src/app/content/ui/circular-progress-text.tsx",
    component: CircularProgressWithTextDemo,
  },
  collapsible: {
    name: "collapsible",
    path: "src/app/content/ui/collapsible.tsx",
    component: CollapsibleDemo,
  },
  "combobox-framework": {
    name: "combobox-framework",
    path: "src/app/content/ui/combobox-framework.tsx",
    component: FrameworkComboboxDemo,
  },
  "combobox-user": {
    name: "combobox-user",
    path: "src/app/content/ui/combobox-user.tsx",
    component: UserComboboxDemo,
  },
  "combobox-timezone": {
    name: "combobox-timezone",
    path: "src/app/content/ui/combobox-timezone.tsx",
    component: TimezoneComboboxDemo,
  },
  "combobox-checkbox": {
    name: "combobox-checkbox",
    path: "src/app/content/ui/combobox-checkbox.tsx",
    component: ComboboxWithCheckboxDemo,
  },
  command: {
    name: "command",
    path: "src/app/content/ui/command.tsx",
    component: CommandDemo,
  },
  "context-menu": {
    name: "context-menu",
    path: "src/app/content/ui/context-menu.tsx",
    component: ContextMenuDemo,
  },
  "date-picker-simple": {
    name: "date-picker-simple",
    path: "src/app/content/ui/date-picker.tsx",
    component: DatePickerSimpleDemo,
  },
  "date-picker-range": {
    name: "date-picker-range",
    path: "src/app/content/ui/date-picker-range.tsx",
    component: DatePickerWithRangeDemo,
  },
  dialog: {
    name: "dialog",
    path: "src/app/content/ui/dialog.tsx",
    component: DialogDemo,
  },
  "dialog-scrollable": {
    name: "dialog-scrollable",
    path: "src/app/content/ui/dialog-scrollable.tsx",
    component: ScrollableDialogDemo,
  },
  "dialog-sticky-footer": {
    name: "dialog-sticky-footer",
    path: "src/app/content/ui/dialog-sticky-footer.tsx",
    component: StickyFooterDialogDemo,
  },
  "draggable-basic": {
    name: "draggable-basic",
    path: "src/app/content/ui/draggable-basic.tsx",
    component: DraggableBasicDragDropDemo,
  },
  "draggable-custom-handle": {
    name: "draggable-custom-handle",
    path: "src/app/content/ui/draggable-custom-handle.tsx",
    component: DraggableCustomHandleDemo,
  },
  "draggable-sortable-drop": {
    name: "draggable-sortable-drop",
    path: "src/app/content/ui/draggable-drag-drop-sort.tsx",
    component: DraggableDragDropSortableDemo,
  },
  drawer: {
    name: "drawer",
    path: "src/app/content/ui/drawer.tsx",
    component: DrawerDemo,
  },
  "drawer-scrollable": {
    name: "drawer-scrollable",
    path: "src/app/content/ui/drawer-scrollable.tsx",
    component: DrawerScrollableDemo,
  },
  "drawer-direction": {
    name: "drawer-direction",
    path: "src/app/content/ui/drawer-directions.tsx",
    component: DrawerDirectionDemo,
  },
  "dropdown-menu": {
    name: "dropdown-menu",
    path: "src/app/content/ui/dropdown-menu.tsx",
    component: DropdownMenuDemo,
  },
  "dropdown-menu-checkboxes": {
    name: "dropdown-menu-checkboxes",
    path: "src/app/content/ui/dropdown-menu-checkboxes.tsx",
    component: DropdownMenuCheckboxesDemo,
  },
  "dropdown-menu-radio-group": {
    name: "dropdown-menu-radio-group",
    path: "src/app/content/ui/dropdown-menu-radio-group.tsx",
    component: DropdownMenuRadioGroupDemo,
  },
  "dropdown-menu-avatar": {
    name: "dropdown-menu-avatar",
    path: "src/app/content/ui/dropdown-menu-avatar.tsx",
    component: DropdownMenuAvatarDemo,
  },
  "dropdown-menu-avatar-only": {
    name: "dropdown-menu-avatar-only",
    path: "src/app/content/ui/dropdown-menu-avatar-only.tsx",
    component: DropdownMenuAvatarOnlyDemo,
  },
  "dropdown-menu-icon-color": {
    name: "dropdown-menu-icon-color",
    path: "src/app/content/ui/dropdown-menu-icon-color.tsx",
    component: DropdownMenuIconColorDemo,
  },
  editable: {
    name: "editable",
    path: "src/app/content/ui/editable.tsx",
    component: EditableDemo,
  },
  "editable-textarea": {
    name: "editable-textarea",
    path: "src/app/content/ui/editable-textarea.tsx",
    component: EditableTextareaDemo,
  },
  "empty-states-no-results": {
    name: "empty-states-no-results",
    path: "src/app/content/ui/empty-states-no-search-results.tsx",
    component: EmptyStatesNoSearchResultsDemo,
  },
  "empty-states-nothing-created": {
    name: "empty-states-nothing-created",
    path: "src/app/content/ui/empty-states-nothing-created.tsx",
    component: EmptyStatesNothingCreatedDemo,
  },
  "empty-states-error": {
    name: "empty-states-error",
    path: "src/app/content/ui/empty-states-error.tsx",
    component: EmptyStatesErrorDemo,
  },
  "error-states-generic": {
    name: "error-states-generic",
    path: "src/app/content/ui/error-states-generic.tsx",
    component: ErrorStatesGenericDemo,
  },
  "error-states-400": {
    name: "error-states-400",
    path: "src/app/content/ui/error-states-400.tsx",
    component: ErrorStates400Demo,
  },
  "error-states-401": {
    name: "error-states-401",
    path: "src/app/content/ui/error-states-401.tsx",
    component: ErrorStates401Demo,
  },
  "error-states-403": {
    name: "error-states-403",
    path: "src/app/content/ui/error-states-403.tsx",
    component: ErrorStates403Demo,
  },
  "error-states-404": {
    name: "error-states-404",
    path: "src/app/content/ui/error-states-404.tsx",
    component: ErrorStates404Demo,
  },
  "error-states-500": {
    name: "error-states-500",
    path: "src/app/content/ui/error-states-500.tsx",
    component: ErrorStates500Demo,
  },
  "error-states-503": {
    name: "error-states-503",
    path: "src/app/content/ui/error-states-503.tsx",
    component: ErrorStates503Demo,
  },
  "hover-card": {
    name: "hover-card",
    path: "src/app/content/ui/hover-card.tsx",
    component: HoverCardDemo,
  },
  field: {
    name: "field",
    path: "src/app/content/ui/field.tsx",
    component: FieldDemo,
  },
  "field-input": {
    name: "field-input",
    path: "src/app/content/ui/field-input.tsx",
    component: FieldInputDemo,
  },
  "field-textarea": {
    name: "field-textarea",
    path: "src/app/content/ui/field-textarea.tsx",
    component: FieldTextareaDemo,
  },
  "field-select": {
    name: "field-select",
    path: "src/app/content/ui/field-select.tsx",
    component: FieldSelectDemo,
  },
  "field-checkbox": {
    name: "field-checkbox",
    path: "src/app/content/ui/field-checkbox.tsx",
    component: FieldCheckboxDemo,
  },
  "field-radio-group": {
    name: "field-radio-group",
    path: "src/app/content/ui/field-radio-group.tsx",
    component: FieldRadioGroupDemo,
  },
  "field-switch": {
    name: "field-switch",
    path: "src/app/content/ui/field-switch.tsx",
    component: FieldSwitchDemo,
  },
  "field-with-separator": {
    name: "field-separator",
    path: "src/app/content/ui/field-separator.tsx",
    component: FieldWithSeparatorDemo,
  },
  "field-with-error": {
    name: "field-with-error",
    path: "src/app/content/ui/field-error.tsx",
    component: FieldWithErrorDemo,
  },
  "field-input-icon": {
    name: "field-input-icon",
    path: "src/app/content/ui/field-input-icon.tsx",
    component: FieldInputWithIconDemo,
  },
  "field-input-addon": {
    name: "field-input-addon",
    path: "src/app/content/ui/field-input-addon.tsx",
    component: FieldInputWithAddonDemo,
  },
  "field-disabled": {
    name: "field-disabled",
    path: "src/app/content/ui/field-disabled.tsx",
    component: FieldDisabledDemo,
  },
  "field-readonly": {
    name: "field-readonly",
    path: "src/app/content/ui/field-readonly.tsx",
    component: FieldReadOnlyDemo,
  },
  "field-small": {
    name: "field-small",
    path: "src/app/content/ui/field-small.tsx",
    component: FieldSmallDemo,
  },
  "field-input-types": {
    name: "field-input-types",
    path: "src/app/content/ui/field-input-types.tsx",
    component: FieldInputTypesDemo,
  },
      "filter": {
        name: "filter",
        path: "src/app/content/ui/filter.tsx",
        component: FilterDemo,
    },
    "filter-input": {
        name: "filter-input",
        path: "src/app/content/ui/filter-input.tsx",
        component: FilterInputDemo,
    },
    "filter-single-select": {
        name: "filter-single-select",
        path: "src/app/content/ui/filter-single-select.tsx",
        component: FilterSingleSelectDemo,
    },
    "filter-multi-select": {
        name: "filter-multi-select",
        path: "src/app/content/ui/filter-multi-select.tsx",
        component: FilterMultiSelectDemo,
    },
    "filter-toggle": {
        name: "filter-toggle",
        path: "src/app/content/ui/filter-toggle.tsx",
        component: FilterToggleDemo,
    },
  icon: {
    name: "icon",
    path: "src/app/content/ui/icon-component.tsx",
    component: IconDemo,
  },
  "icon-variants": {
    name: "icon-variants",
    path: "src/app/content/ui/icon-variants.tsx",
    component: IconVariantsDemo,
  },
  "icon-sizing": {
    name: "icon-sizing",
    path: "src/app/content/ui/icon-sizing.tsx",
    component: IconSizingDemo,
  },
  "icon-color-schemes": {
    name: "icon-color-schemes",
    path: "src/app/content/ui/icon-color-schemes.tsx",
    component: IconColorSchemesDemo,
  },
  "icon-subtle": {
    name: "icon-subtle",
    path: "src/app/content/ui/icon-subtle.tsx",
    component: SubtleIconVariantsDemo,
  },
  "icon-filled": {
    name: "icon-filled",
    path: "src/app/content/ui/icon-filled.tsx",
    component: FilledIconVariantsDemo,
  },
  input: {
    name: "input",
    path: "src/app/content/ui/input.tsx",
    component: InputDemo,
  },
  "input-email": {
    name: "input-email",
    path: "src/app/content/ui/input-email.tsx",
    component: InputEmailDemo,
  },
  "input-text": {
    name: "input-text",
    path: "src/app/content/ui/input-text.tsx",
    component: InputTextDemo,
  },
  "input-password": {
    name: "input-password",
    path: "src/app/content/ui/input-password.tsx",
    component: InputPasswordDemo,
  },
  "input-file": {
    name: "input-file",
    path: "src/app/content/ui/input-file.tsx",
    component: InputFileDemo,
  },
  "input-disabled": {
    name: "input-disabled",
    path: "src/app/content/ui/input-disabled.tsx",
    component: DisabledInputDemo,
  },
  "input-group": {
    name: "input-group",
    path: "src/app/content/ui/input-group.tsx",
    component: InputGroupDemo,
  },
  "input-group-search": {
    name: "input-group-search",
    path: "src/app/content/ui/input-group-search.tsx",
    component: InputGroupSearchDemo,
  },
  "input-group-url": {
    name: "input-group-url",
    path: "src/app/content/ui/input-group-url.tsx",
    component: InputGroupURLDemo,
  },
  "input-group-dropdown": {
    name: "input-group-dropdown",
    path: "src/app/content/ui/input-group-dropdown.tsx",
    component: InputGroupDropdownDemo,
  },
  inputOtp: {
    name: "inputOtp",
    path: "src/app/content/ui/inputotp.tsx",
    component: InputOTPDemo,
  },
  "inputOtp-pattern": {
    name: "inputOtp-pattern",
    path: "src/app/content/ui/inputotp-pattern.tsx",
    component: InputOTPPatternDemo,
  },
  "inputOtp-spacing": {
    name: "inputOtp-spacing",
    path: "src/app/content/ui/inputotp-spacing.tsx",
    component: InputOTPSpacingDemo,
  },
  kbd: {
    name: "kbd",
    path: "src/app/content/ui/kbd.tsx",
    component: KbdDemo,
  },
  "kbd-group": {
    name: "kbd-group",
    path: "src/app/content/ui/kbd-group.tsx",
    component: KbdGroupDemo,
  },
  "kbd-button": {
    name: "kbd-button",
    path: "src/app/content/ui/kbd-button.tsx",
    component: KbdButtonDemo,
  },
  "kbd-tooltip": {
    name: "kbd-tooltip",
    path: "src/app/content/ui/kbd-tooltip.tsx",
    component: KbdTooltipDemo,
  },
  "kbd-shortcut": {
    name: "kbd-shortcut",
    path: "src/app/content/ui/kbd-shortcut.tsx",
    component: KbdShortcutDemo,
  },
  label: {
    name: "label",
    path: "src/app/content/ui/label.tsx",
    component: LabelDemo,
  },
  "navigation-menu": {
    name: "navigation-menu",
    path: "src/app/content/ui/navigation-menu.tsx",
    component: NavigationMenuDemo,
  },
  "navigation-menu-secondary": {
    name: "navigation-menu-secondary",
    path: "src/app/content/ui/navigation-menu-secondary.tsx",
    component: NavigationMenuSecondaryDemo,
  },
  pagination: {
    name: "pagination",
    path: "src/app/content/ui/pagination.tsx",
    component: PaginationDemo,
  },
  popover: {
    name: "popover",
    path: "src/app/content/ui/popover.tsx",
    component: PopoverDemo,
  },
  progress: {
    name: "progress",
    path: "src/app/content/ui/progress.tsx",
    component: ProgressDemo,
  },
  "radio-group": {
    name: "radio-group",
    path: "src/app/content/ui/radio-group.tsx",
    component: RadioGroupDemo,
  },
  resizable: {
    name: "resizable",
    path: "src/app/content/ui/resizable.tsx",
    component: ResizableDemo,
  },
  "resizable-vertical": {
    name: "resizable-vertical",
    path: "src/app/content/ui/resizable-vertical.tsx",
    component: VerticalResizableDemo,
  },
  "resizable-handle": {
    name: "resizable-handle",
    path: "src/app/content/ui/resizable-handle.tsx",
    component: ResizableHandleDemo,
  },
  "scroll-area": {
    name: "scroll-area",
    path: "src/app/content/ui/scroll-area.tsx",
    component: ScrollAreaDemo,
  },
  "scroll-area-horizontal": {
    name: "scroll-area-horizontal",
    path: "src/app/content/ui/scroll-area-horizontal.tsx",
    component: HorizontalScrollAreaDemo,
  },
  select: {
    name: "select",
    path: "src/app/content/ui/select.tsx",
    component: SelectDemo,
  },
  "select-large-list": {
    name: "select-large-list",
    path: "src/app/content/ui/select-large-list.tsx",
    component: SelectLargeListDemo,
  },
  "select-icon": {
    name: "select-icon",
    path: "src/app/content/ui/select-icon.tsx",
    component: SelectWithIconDemo,
  },
  "select-disabled": {
    name: "select-disabled",
    path: "src/app/content/ui/select-disabled.tsx",
    component: DisabledSelectDemo,
  },
  "select-react": {
    name: "select-react",
    path: "src/app/content/ui/select-react.tsx",
    component: SelectReactDemo,
  },
  separator: {
    name: "separator",
    path: "src/app/content/ui/separator.tsx",
    component: SeparatorDemo,
  },
  sheet: {
    name: "sheet",
    path: "src/app/content/ui/sheet.tsx",
    component: SheetDemo,
  },
  "sheet-directions": {
    name: "sheet-directions",
    path: "src/app/content/ui/sheet-directions.tsx",
    component: SheetDirectionsDemo,
  },
  sidebar: {
    name: "sidebar",
    path: "src/app/content/ui/sidebar.tsx",
    component: SidebarDemo,
  },
  skeleton: {
    name: "skeleton",
    path: "src/app/content/ui/skeleton.tsx",
    component: SkeletonDemo,
  },
  "skeleton-card": {
    name: "skeleton-card",
    path: "src/app/content/ui/skeleton-card.tsx",
    component: SkeletonCardListDemo,
  },
  slider: {
    name: "slider",
    path: "src/app/content/ui/slider.tsx",
    component: SliderDemo,
  },
  sonner: {
    name: "sonner",
    path: "src/app/content/ui/sonner.tsx",
    component: SonnerDemo,
  },
  "sonner-success": {
    name: "sonner-success",
    path: "src/app/content/ui/sonner-success.tsx",
    component: SonnerSuccessDemo,
  },
  "sonner-warning": {
    name: "sonner-warning",
    path: "src/app/content/ui/sonner-warning.tsx",
    component: SonnerWarningDemo,
  },
  "sonner-error": {
    name: "sonner-error",
    path: "src/app/content/ui/sonner-error.tsx",
    component: SonnerErrorDemo,
  },
  "sonner-action": {
    name: "sonner-action",
    path: "src/app/content/ui/sonner-action.tsx",
    component: SonnerActionDemo,
  },
  "sonner-closable": {
    name: "sonner-closable",
    path: "src/app/content/ui/sonner-closable.tsx",
    component: SonnerClosableDemo,
  },
  spinner: {
    name: "spinner",
    path: "src/app/content/ui/spinner.tsx",
    component: SpinnerDemo,
  },
  "spinner-size": {
    name: "spinner-size",
    path: "src/app/content/ui/spinner-size.tsx",
    component: SpinnerSizeDemo,
  },
  "spinner-button": {
    name: "spinner-button",
    path: "src/app/content/ui/spinner-button.tsx",
    component: SpinnerButtonDemo,
  },
  "spinner-badge": {
    name: "spinner-badge",
    path: "src/app/content/ui/spinner-badge.tsx",
    component: SpinnerBadgeDemo,
  },
  "stack-navigation": {
    name: "stack-navigation",
    path: "src/app/content/ui/stack-navigation.tsx",
    component: StackNavigationDemo,
  },
  "stack-navigation-horizontal": {
    name: "stack-navigation-horizontal",
    path: "src/app/content/ui/stack-navigation-horizontal.tsx",
    component: StackNavigationHorizontalDemo,
  },
  "stack-navigation-horizontal-tabs": {
    name: "stack-navigation-horizontal-tabs",
    path: "src/app/content/ui/stack-navigation-horizontal-tabs.tsx",
    component: StackNavigationHorizontalTabsDemo,
  },
  stepper: {
    name: "stepper",
    path: "src/app/content/ui/stepper.tsx",
    component: StepperDemo,
  },
  switch: {
    name: "switch",
    path: "src/app/content/ui/switch.tsx",
    component: SwitchDemo,
  },
  "switch-danger": {
    name: "switch-danger",
    path: "src/app/content/ui/switch-danger.tsx",
    component: SwitchDangerDemo,
  },
  "switch-success": {
    name: "switch-success",
    path: "src/app/content/ui/switch-success.tsx",
    component: SwitchSuccessDemo,
  },
  table: {
    name: "table",
    path: "src/app/content/ui/table.tsx",
    component: TableDemo,
  },
  "table-data": {
    name: "table-data",
    path: "src/app/content/ui/table-data.tsx",
    component: DataTableDemo,
  },
  tabs: {
    name: "tabs",
    path: "src/app/content/ui/tabs.tsx",
    component: TabsDemo,
  },
  "tabs-line": {
    name: "tabs-line",
    path: "src/app/content/ui/tabs-line.tsx",
    component: TabsLineVariantDemo,
  },
  "tabs-line-icon": {
    name: "tabs-line-icon",
    path: "src/app/content/ui/tabs-line-icon.tsx",
    component: TabsLineVariantWithIconsDemo,
  },
  "tabs-soft-rounded": {
    name: "tabs-soft-rounded",
    path: "src/app/content/ui/tabs-soft-rounded.tsx",
    component: TabsSoftRoundedVariantDemo,
  },
  "tabs-icons": {
    name: "tabs-icons",
    path: "src/app/content/ui/tabs-icons.tsx",
    component: TabsWithIconsDemo,
  },
  textarea: {
    name: "textarea",
    path: "src/app/content/ui/textarea.tsx",
    component: TextareaDemo,
  },
  "textarea-invalid": {
    name: "textarea-invalid",
    path: "src/app/content/ui/textarea-invalid.tsx",
    component: InvalidTextareaDemo,
  },
  "textarea-with-label": {
    name: "textarea-with-label",
    path: "src/app/content/ui/textarea-label.tsx",
    component: TextareaWithLabelDemo,
  },
  "textarea-with-label-and-description": {
    name: "textarea-with-label-and-description",
    path: "src/app/content/ui/textarea-label-description.tsx",
    component: TextareaWithLabelAndDescriptionDemo,
  },
  "textarea-disabled": {
    name: "textarea-disabled",
    path: "src/app/content/ui/textarea-disabled.tsx",
    component: DisabledTextareaDemo,
  },
  "textarea-small": {
    name: "textarea-small",
    path: "src/app/content/ui/textarea-small.tsx",
    component: SmallTextareaDemo,
  },
  "textarea-large": {
    name: "textarea-large",
    path: "src/app/content/ui/textarea-large.tsx",
    component: LargeTextareaDemo,
  },
  "textarea-with-default-value": {
    name: "textarea-with-default-value",
    path: "src/app/content/ui/textarea-default-value.tsx",
    component: TextareaWithDefaultValueDemo,
  },
  "time-picker": {
    name: "time-picker",
    path: "src/app/content/ui/time-picker.tsx",
    component: TimePickerDemo,
  },
  timeline: {
    name: "timeline",
    path: "src/app/content/ui/timeline.tsx",
    component: TimelineDemo,
  },
  "timeline-variants": {
    name: "timeline-variants",
    path: "src/app/content/ui/timeline-variants.tsx",
    component: TimelineVariantsDemo,
  },
  "timeline-sizes": {
    name: "timeline-sizes",
    path: "src/app/content/ui/timeline-sizes.tsx",
    component: TimelineSizesDemo,
  },
  "timeline-connector-variants": {
    name: "timeline-connector-variants",
    path: "src/app/content/ui/timeline-connector-variants.tsx",
    component: TimelineConnectorVariantsDemo,
  },
  "toggle-square": {
    name: "toggle-square",
    path: "src/app/content/ui/toggle-square.tsx",
    component: SquareToggleDemo,
  },
  "toggle-rounded": {
    name: "toggle-rounded",
    path: "src/app/content/ui/toggle-rounded.tsx",
    component: RoundedToggleDemo,
  },
  "toggle-group-square": {
    name: "toggle-group-square",
    path: "src/app/content/ui/toggle-group-square.tsx",
    component: SquareToggleGroupDemo,
  },
  "toggle-group-rounded": {
    name: "toggle-group-rounded",
    path: "src/app/content/ui/toggle-group-rounded.tsx",
    component: RoundedToggleGroupDemo,
  },
  tooltip: {
    name: "tooltip",
    path: "src/app/content/ui/tooltip.tsx",
    component: TooltipDemo,
  },
  topbar: {
    name: "topbar",
    path: "src/app/content/ui/topbar.tsx",
    component: TopbarDemo,
  },

  // BLOKS
  "site-card": {
    name: "site-card",
    path: "src/app/content/bloks/site-card.tsx",
    component: SiteCardDemo,
  },
  "all-site": {
    name: "all-site",
    path: "src/app/content/bloks/all-site-section.tsx",
    component: AllSitesSectionDemo,
  },
  collaboration: {
    name: "collaboration",
    path: "src/app/content/bloks/collaboration.tsx",
    component: CollaborationDemo,
  },
  "pinned-site": {
    name: "pinned-site",
    path: "src/app/content/bloks/pinned-site-section.tsx",
    component: PinnedSitesSectionDemo,
  },
};
