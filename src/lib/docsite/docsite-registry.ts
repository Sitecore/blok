import { ComponentType } from "react";

// PRIMITIVES
import AccordionDemo from "@/app/content/ui/accordion";
import AlertDemo from "@/app/content/ui/alert";
import AlertPrimaryDemo from "@/app/content/ui/alert-primary";
import AlertSuccessDemo from "@/app/content/ui/alert-success";
import AlertDangerDemo from "@/app/content/ui/alert-danger";
import AlertWarningDemo from "@/app/content/ui/alert-warning";
import ClosableAlertDemo from "@/app/content/ui/alert-closable";
import ButtonLinkAlertDemo from "@/app/content/ui/alert-button-link";
import AlertDialogDemo from "@/app/content/ui/alert-dialog";
import AspectRatioDemo from "@/app/content/ui/aspect-ratio";
import AvatarDemo from "@/app/content/ui/avatar";
import AvatarFallbackDemo from "@/app/content/ui/avatar-fallback";
import AvatarLargeDemo from "@/app/content/ui/avatar-large";
import AvatarInteractiveDemo from "@/app/content/ui/avatar-interactive";
import AvatarMenuDemo from "@/app/content/ui/avatar-menu";
import BadgeDemo from "@/app/content/ui/badge";
import BadgeSizingDemo from "@/app/content/ui/badge-sizing";
import BadgeColorSchemesDemo from "@/app/content/ui/badge-color-schemes";
import BoldBadgeDemo from "@/app/content/ui/badge-bold";
import BadgeLinksDemo from "@/app/content/ui/badge-link";
import ClosableBadgeDemo from "@/app/content/ui/badge-closable";
import BreadcrumbDemo from "@/app/content/ui/breadcrumb";
import ButtonDemo from "@/app/content/ui/button";
import ButtonVariantsDemo from "@/app/content/ui/button-variants";
import ButtonSizingDemo from "@/app/content/ui/button-sizing";
import ButtonColorSchemeDemo from "@/app/content/ui/button-color-schemes";
import ButtonIconSizingDemo from "@/app/content/ui/button-icon-sizing";
import ButtonIconTextDemo from "@/app/content/ui/button-icon-text";
import ButtonDisabledDemo from "@/app/content/ui/button-disabled";
import CalendarDemo from "@/app/content/ui/calendar";
import MultipleCalendarDemo from "@/app/content/ui/calendar-multiple";
import CardDefaultDemo from "@/app/content/ui/card";
import CardElevationDemo from "@/app/content/ui/card-elevation";
import CardStyleDemo from "@/app/content/ui/card-style";
import CardPaddingDemo from "@/app/content/ui/card-padding";
import CardStyledDemo from "@/app/content/ui/card-styled";
import CarouselDemo from "@/app/content/ui/carousel";
import CarouselNegativeMarginDemo from "@/app/content/ui/carousel-negative-margin";
import CarouselStartAlignedDemo from "@/app/content/ui/carousel-start-aligned";
import BarMixedChartDemo from "@/app/content/ui/chart-mixed-bar";
import BarChartDemo from "@/app/content/ui/chart-bar";
import AreaChartDemo from "@/app/content/ui/chart-area";
import LineChartDemo from "@/app/content/ui/chart-line";
import PieChartDemo from "@/app/content/ui/chart-pie";
import CheckboxDemo from "@/app/content/ui/checkbox";
import CheckboxWithDescriptionDemo from "@/app/content/ui/checkbox-description";
import DisabledCheckboxDemo from "@/app/content/ui/checkbox-disabled";
import EnabledCheckboxLabelDemo from "@/app/content/ui/checkbox-label";
import CollapsibleDemo from "@/app/content/ui/collapsible";
import ComboboxWithCheckboxDemo from "@/app/content/ui/combobox-checkbox";
import UserComboboxDemo from "@/app/content/ui/combobox-user";
import TimezoneComboboxDemo from "@/app/content/ui/combobox-timezone";
import FrameworkComboboxDemo from "@/app/content/ui/combobox-framework";
import CommandDemo from "@/app/content/ui/command";
import ContextMenuDemo from "@/app/content/ui/context-menu";
import DatePickerWithRangeDemo from "@/app/content/ui/date-picker-range";
import DatePickerSimpleDemo from "@/app/content/ui/date-picker";
import DialogDemo from "@/app/content/ui/dialog";
import StickyFooterDialogDemo from "@/app/content/ui/dialog-sticky-footer";
import ScrollableDialogDemo from "@/app/content/ui/dialog-scrollable";
import DraggableBasicDragDropDemo from "@/app/content/ui/draggable-basic";
import DraggableSortableDemo from "@/app/content/ui/draggable-sortable";
import DraggableCustomHandleDemo from "@/app/content/ui/draggable-custom-handle";
import DraggableDragDropSortableDemo from "@/app/content/ui/draggable-drag-drop-sort";
import DrawerDemo from "@/app/content/ui/drawer";
import DrawerScrollableDemo from "@/app/content/ui/drawer-scrollable";
import DrawerDirectionDemo from "@/app/content/ui/drawer-directions";
import DropdownMenuCheckboxesDemo from "@/app/content/ui/dropdown-menu-checkboxes";
import DropdownMenuDemo from "@/app/content/ui/dropdown-menu";
import DropdownMenuAvatarDemo from "@/app/content/ui/dropdown-menu-avatar";
import DropdownMenuIconColorDemo from "@/app/content/ui/dropdown-menu-icon-color";
import DropdownMenuAvatarOnlyDemo from "@/app/content/ui/dropdown-menu-avatar-only";
import DropdownMenuRadioGroupDemo from "@/app/content/ui/dropdown-menu-radio-group";
import EmptyStatesErrorDemo from "@/app/content/ui/empty-states-error";
import EmptyStatesNoSearchResultsDemo from "@/app/content/ui/empty-states-no-search-results";
import EmptyStatesNothingCreatedDemo from "@/app/content/ui/empty-states-nothing-created";
import ErrorStates400Demo from "@/app/content/ui/error-states-400";
import ErrorStates403Demo from "@/app/content/ui/error-states-403";
import ErrorStates500Demo from "@/app/content/ui/error-states-500";
import ErrorStates503Demo from "@/app/content/ui/error-states-503";
import ErrorStates404Demo from "@/app/content/ui/error-states-404";
import ErrorStates401Demo from "@/app/content/ui/error-states-401";
import ErrorStatesGenericDemo from "@/app/content/ui/error-states-generic";
import HoverCardDemo from "@/app/content/ui/hover-card";
import IconVariantsDemo from "@/app/content/ui/icon-variants";
import IconDemo from "@/app/content/ui/icon";
import IconColorSchemesDemo from "@/app/content/ui/icon-color-schemes";
import IconSizingDemo from "@/app/content/ui/icon-sizing";
import SubtleIconVariantsDemo from "@/app/content/ui/icon-subtle";
import FilledIconVariantsDemo from "@/app/content/ui/icon-filled";
import InputEmailDemo from "@/app/content/ui/input-email";
import InputDemo from "@/app/content/ui/input";
import InputPasswordDemo from "@/app/content/ui/input-password";
import DisabledInputDemo from "@/app/content/ui/input-disabled";
import InputFileDemo from "@/app/content/ui/input-file";
import InputTextDemo from "@/app/content/ui/input-text";
import InputOTPDemo from "@/app/content/ui/inputotp";
import InputOTPSpacingDemo from "@/app/content/ui/inputotp-spacing";
import InputOTPPatternDemo from "@/app/content/ui/inputotp-pattern";
import LabelDemo from "@/app/content/ui/label";
import NavigationMenuSecondaryDemo from "@/app/content/ui/navigation-menu-secondary";
import NavigationMenuDemo from "@/app/content/ui/navigation-menu";
import PaginationDemo from "@/app/content/ui/pagination";
import PopoverDemo from "@/app/content/ui/popover";
import ProgressDemo from "@/app/content/ui/progress";
import RadioGroupDemo from "@/app/content/ui/radio-group";
import ResizableDemo from "@/app/content/ui/resizable";
import VerticalResizableDemo from "@/app/content/ui/resizable-vertical";
import ResizableHandleDemo from "@/app/content/ui/resizable-handle";
import HorizontalScrollAreaDemo from "@/app/content/ui/scroll-area-horizontal";
import ScrollAreaDemo from "@/app/content/ui/scroll-area";
import SelectDemo from "@/app/content/ui/select";
import DisabledSelectDemo from "@/app/content/ui/select-disabled";
import SelectWithIconDemo from "@/app/content/ui/select-icon";
import SelectLargeListDemo from "@/app/content/ui/select-large-list";
import SeparatorDemo from "@/app/content/ui/separator";
import SheetDemo from "@/app/content/ui/sheet";
import SheetDirectionsDemo from "@/app/content/ui/sheet-directions";
import SidebarDemo from "@/app/content/ui/sidebar";
import SkeletonCardListDemo from "@/app/content/ui/skeleton-card";
import SkeletonDemo from "@/app/content/ui/skeleton";
import SliderDemo from "@/app/content/ui/slider";
import SonnerSuccessDemo from "@/app/content/ui/sonner-success";
import SonnerErrorDemo from "@/app/content/ui/sonner-error";
import SonnerClosableDemo from "@/app/content/ui/sonner-closable";
import SonnerWarningDemo from "@/app/content/ui/sonner-warning";
import SonnerActionDemo from "@/app/content/ui/sonner-action";
import SonnerDemo from "@/app/content/ui/sonner";
import SpinnerVariantsDemo from "@/app/content/ui/spinner-variants";
import WithTextSpinnerDemo from "@/app/content/ui/spinner-text";
import SpinnerDemo from "@/app/content/ui/spinner";
import StackNavigationHorizontalDemo from "@/app/content/ui/stack-navigation-horizontal";
import StackNavigationHorizontalTabsDemo from "@/app/content/ui/stack-navigation-horizontal-tabs";
import StackNavigationDemo from "@/app/content/ui/stack-navigation";
import SwitchDemo from "@/app/content/ui/switch";
import SwitchDangerDemo from "@/app/content/ui/switch-danger";
import SwitchSuccessDemo from "@/app/content/ui/switch-success";
import TableDemo from "@/app/content/ui/table";
import { DataTableDemo } from "@/app/content/ui/table-data";
import TabsDemo from "@/app/content/ui/tabs";
import TabsLineVariantDemo from "@/app/content/ui/tabs-line";
import TabsLineVariantWithIconsDemo from "@/app/content/ui/tabs-line-icon";
import TabsSoftRoundedVariantDemo from "@/app/content/ui/tabs-soft-rounded";
import TabsWithIconsDemo from "@/app/content/ui/tabs-icons";
import TextareaDemo from "@/app/content/ui/textarea";
import TextareaWithLabelDemo from "@/app/content/ui/textarea-label";
import TextareaWithLabelAndDescriptionDemo from "@/app/content/ui/textarea-label-description";
import TextareaWithDefaultValueDemo from "@/app/content/ui/textarea-default-value";
import InvalidTextareaDemo from "@/app/content/ui/textarea-invalid";
import DisabledTextareaDemo from "@/app/content/ui/textarea-disabled";
import SmallTextareaDemo from "@/app/content/ui/textarea-small";
import LargeTextareaDemo from "@/app/content/ui/textarea-large";
import TimePickerDemo from "@/app/content/ui/time-picker";
import RoundedToggleDemo from "@/app/content/ui/toggle-rounded";
import SquareToggleDemo from "@/app/content/ui/toggle-square";
import RoundedToggleGroupDemo from "@/app/content/ui/toggle-group-rounded";
import SquareToggleGroupDemo from "@/app/content/ui/toggle-group-square";
import TopbarDemo from "@/app/content/ui/topbar";
import TooltipDemo from "@/app/content/ui/tooltip";

// BLOKS
import SiteCardDemo from "@/app/content/bloks/site-card";
import AllSitesSectionDemo from "@/app/content/bloks/all-site-section";
import PinnedSitesSectionDemo from "@/app/content/bloks/pinned-site-section";

export interface DocsiteRegistryEntry {
    name: string;
    path: string;
    component?: ComponentType<any>; // optional
}

export const docsiteRegistry: Record<string, DocsiteRegistryEntry> = {
    // PRIMITIVES
    "accordion": {
        name: "accordion",
        path: "src/app/content/ui/accordion.tsx",
        component: AccordionDemo,
    },
    "alert": {
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
    "avatar": {
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
    "badge": {
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
    "breadcrumb": {
        name: "breadcrumb",
        path: "src/app/content/ui/breadcrumb.tsx",
        component: BreadcrumbDemo,
    },
    "button": {
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
    "calendar": {
        name: "calendar",
        path: "src/app/content/ui/calendar.tsx",
        component: CalendarDemo,
    },
    "calendar-multiple": {
        name: "calendar-multiple",
        path: "src/app/content/ui/calendar-multiple.tsx",
        component: MultipleCalendarDemo,
    },
    "card": {
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
    "carousel": {
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
    "checkbox": {
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
    "collapsible": {
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
    "command": {
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
    "dialog": {
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
    "draggable-sortable-list": {
        name: "draggable-sortable-list",
        path: "src/app/content/ui/draggable-sortable.tsx",
        component: DraggableSortableDemo,
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
    "drawer": {
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
    "icon": {
        name: "icon",
        path: "src/app/content/ui/icon.tsx",
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
    "input": {
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
    "inputOtp": {
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
    "label": {
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
    "pagination": {
        name: "pagination",
        path: "src/app/content/ui/pagination.tsx",
        component: PaginationDemo,
    },
    "popover": {
        name: "popover",
        path: "src/app/content/ui/popover.tsx",
        component: PopoverDemo,
    },
    "progress": {
        name: "progress",
        path: "src/app/content/ui/progress.tsx",
        component: ProgressDemo,
    },
    "radio-group": {
        name: "radio-group",
        path: "src/app/content/ui/radio-group.tsx",
        component: RadioGroupDemo,
    },
    "resizable": {
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
    "select": {
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
    "separator": {
        name: "separator",
        path: "src/app/content/ui/separator.tsx",
        component: SeparatorDemo,
    },
    "sheet": {
        name: "sheet",
        path: "src/app/content/ui/sheet.tsx",
        component: SheetDemo,
    },
    "sheet-directions": {
        name: "sheet-directions",
        path: "src/app/content/ui/sheet-directions.tsx",
        component: SheetDirectionsDemo,
    },
    "sidebar": {
        name: "sidebar",
        path: "src/app/content/ui/sidebar.tsx",
        component: SidebarDemo,
    },
    "skeleton": {
        name: "skeleton",
        path: "src/app/content/ui/skeleton.tsx",
        component: SkeletonDemo,
    },
    "skeleton-card": {
        name: "skeleton-card",
        path: "src/app/content/ui/skeleton-card.tsx",
        component: SkeletonCardListDemo,
    },
    "slider": {
        name: "slider",
        path: "src/app/content/ui/slider.tsx",
        component: SliderDemo,
    },
    "sonner": {
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
    "spinner": {
        name: "spinner",
        path: "src/app/content/ui/spinner.tsx",
        component: SpinnerDemo,
    },
    "spinner-variants": {
        name: "spinner-variants",
        path: "src/app/content/ui/spinner-variants.tsx",
        component: SpinnerVariantsDemo,
    },
    "spinner-text": {
        name: "spinner-text",
        path: "src/app/content/ui/spinner-text.tsx",
        component: WithTextSpinnerDemo,
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
    "switch": {
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
    "table": {
        name: "table",
        path: "src/app/content/ui/table.tsx",
        component: TableDemo,
    },
    "table-data": {
        name: "table-data",
        path: "src/app/content/ui/table-data.tsx",
        component: DataTableDemo,
    },
    "tabs": {
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
    "textarea": {
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
    "tooltip": {
        name: "tooltip",
        path: "src/app/content/ui/tooltip.tsx",
        component: TooltipDemo,
    },
    "topbar": {
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
    "pinned-site": {
        name: "pinned-site",
        path: "src/app/content/bloks/pinned-site-section.tsx",
        component: PinnedSitesSectionDemo,
    },
}