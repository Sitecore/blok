"use client";

import type * as React from "react";

// Import all component thumbnails
import AccordionThumb from "@/components/component-thumbs/accordion";
import ActionBarThumb from "@/components/component-thumbs/action-bar";
import AlertThumb from "@/components/component-thumbs/alert";
import AlertDialogThumb from "@/components/component-thumbs/alert-dialog";
import AllSiteThumb from "@/components/component-thumbs/all-site";
import AspectRatioThumb from "@/components/component-thumbs/aspect-ratio";
import AvatarThumb from "@/components/component-thumbs/avatar";
import BadgeThumb from "@/components/component-thumbs/badge";
import BreadcrumbThumb from "@/components/component-thumbs/breadcrumb";
import ButtonThumb from "@/components/component-thumbs/button";
import CalendarThumb from "@/components/component-thumbs/calendar";
import CardThumb from "@/components/component-thumbs/card";
import CarouselThumb from "@/components/component-thumbs/carousel";
import ChartThumb from "@/components/component-thumbs/chart";
import CheckboxThumb from "@/components/component-thumbs/checkbox";
import CircularProgressThumb from "@/components/component-thumbs/circular-progress";
import CollaborationThumb from "@/components/component-thumbs/collaboration";
import CollapsibleThumb from "@/components/component-thumbs/collapsible";
import ComboboxThumb from "@/components/component-thumbs/combobox";
import CommandThumb from "@/components/component-thumbs/command";
import ContextMenuThumb from "@/components/component-thumbs/context-menu";
import DatePickerThumb from "@/components/component-thumbs/date-picker";
import DialogThumb from "@/components/component-thumbs/dialog";
import DraggableThumb from "@/components/component-thumbs/draggable";
import DrawerThumb from "@/components/component-thumbs/drawer";
import DropdownMenuThumb from "@/components/component-thumbs/dropdown-menu";
import EmptyStateThumb from "@/components/component-thumbs/empty-state";
import ErrorStateThumb from "@/components/component-thumbs/error-state";
import HoverCardThumb from "@/components/component-thumbs/hover-card";
import InputThumb from "@/components/component-thumbs/input";
import InputGroupThumb from "@/components/component-thumbs/input-group";
import KbdThumb from "@/components/component-thumbs/kbd";
import LabelThumb from "@/components/component-thumbs/label";
import NavigationMenuThumb from "@/components/component-thumbs/navigation-menu";
import PaginationThumb from "@/components/component-thumbs/pagination";
import PinInputThumb from "@/components/component-thumbs/pin-input";
import PinnedSiteThumb from "@/components/component-thumbs/pinned-site";
import PopoverThumb from "@/components/component-thumbs/popover";
import ProgressThumb from "@/components/component-thumbs/progress";
import RadioThumb from "@/components/component-thumbs/radio";
import RadioGroupThumb from "@/components/component-thumbs/radio-group";
import ResizableThumb from "@/components/component-thumbs/resizable";
import ScrollAreaThumb from "@/components/component-thumbs/scroll-area";
import SelectThumb from "@/components/component-thumbs/select";
import SeparatorThumb from "@/components/component-thumbs/separator";
import SheetThumb from "@/components/component-thumbs/sheet";
import SidebarThumb from "@/components/component-thumbs/sidebar";
import SiteCardThumb from "@/components/component-thumbs/site-card";
import SkeletonThumb from "@/components/component-thumbs/skeleton";
import SliderThumb from "@/components/component-thumbs/slider";
import SonnerThumb from "@/components/component-thumbs/sonner";
import SpinnerThumb from "@/components/component-thumbs/spinner";
import StepperThumb from "@/components/component-thumbs/stepper";
import SwitchThumb from "@/components/component-thumbs/switch";
import TableThumb from "@/components/component-thumbs/table";
import TabsThumb from "@/components/component-thumbs/tabs";
import TextareaThumb from "@/components/component-thumbs/textarea";
import TimePickerThumb from "@/components/component-thumbs/time-picker";
import ToggleThumb from "@/components/component-thumbs/toggle";
import ToggleGroupThumb from "@/components/component-thumbs/toggle-group";
import TooltipThumb from "@/components/component-thumbs/tooltip";
import TopbarThumb from "@/components/component-thumbs/topbar";

// Map component names to their thumbnail components
const componentThumbnails: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  accordion: AccordionThumb,
  "action-bar": ActionBarThumb,
  alert: AlertThumb,
  "alert-dialog": AlertDialogThumb,
  "aspect-ratio": AspectRatioThumb,
  avatar: AvatarThumb,
  badge: BadgeThumb,
  breadcrumb: BreadcrumbThumb,
  button: ButtonThumb,
  calendar: CalendarThumb,
  card: CardThumb,
  carousel: CarouselThumb,
  chart: ChartThumb,
  checkbox: CheckboxThumb,
  collapsible: CollapsibleThumb,
  combobox: ComboboxThumb,
  command: CommandThumb,
  "context-menu": ContextMenuThumb,
  "date-picker": DatePickerThumb,
  draggable: DraggableThumb,
  drawer: DrawerThumb,
  "dropdown-menu": DropdownMenuThumb,
  "empty-states": EmptyStateThumb,
  "error-states": ErrorStateThumb,
  "hover-card": HoverCardThumb,
  input: InputThumb,
  "input-group": InputGroupThumb,
  inputOtp: PinInputThumb,
  "navigation-menu": NavigationMenuThumb,
  pagination: PaginationThumb,
  popover: PopoverThumb,
  progress: ProgressThumb,
  radio: RadioThumb,
  "radio-group": RadioGroupThumb,
  resizable: ResizableThumb,
  "scroll-area": ScrollAreaThumb,
  select: SelectThumb,
  separator: SeparatorThumb,
  sheet: SheetThumb,
  sidebar: SidebarThumb,
  sonner: SonnerThumb,
  skeleton: SkeletonThumb,
  slider: SliderThumb,
  "circular-progress": CircularProgressThumb,
  spinner: SpinnerThumb,
  stepper: StepperThumb,
  switch: SwitchThumb,
  table: TableThumb,
  tabs: TabsThumb,
  textarea: TextareaThumb,
  "time-picker": TimePickerThumb,
  toggle: ToggleThumb,
  "toggle-group": ToggleGroupThumb,
  topbar: TopbarThumb,
  tooltip: TooltipThumb,
  dialog: DialogThumb,
  label: LabelThumb,
  kbd: KbdThumb,
  "all-site": AllSiteThumb,
  "pinned-site": PinnedSiteThumb,
  "site-card": SiteCardThumb,
  collaboration: CollaborationThumb,
};

interface ComponentThumbProps {
  componentName: string;
  className?: string;
}

export function ComponentThumb({
  componentName,
  className,
}: ComponentThumbProps) {
  const ThumbnailComponent = componentThumbnails[componentName];

  if (!ThumbnailComponent) {
    return null;
  }

  return <ThumbnailComponent className={className} />;
}

export function hasComponentThumbnail(componentName: string): boolean {
  return componentName in componentThumbnails;
}
