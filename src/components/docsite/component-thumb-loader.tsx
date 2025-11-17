"use client";

import * as React from "react";

// Import all component thumbnails
import AccordionThumb from "@/components/component-thumbs/accordion";
import AlertThumb from "@/components/component-thumbs/alert";
import AlertDialogThumb from "@/components/component-thumbs/alert-dialog";
import AvatarThumb from "@/components/component-thumbs/avatar";
import BadgeThumb from "@/components/component-thumbs/badge";
import BreadcrumbThumb from "@/components/component-thumbs/breadcrumb";
import ButtonThumb from "@/components/component-thumbs/button";
import CardThumb from "@/components/component-thumbs/card";
import CheckboxThumb from "@/components/component-thumbs/checkbox";
import DrawerThumb from "@/components/component-thumbs/drawer";
import InputThumb from "@/components/component-thumbs/input";
import PinInputThumb from "@/components/component-thumbs/pin-input";
import PopoverThumb from "@/components/component-thumbs/popover";
import ProgressThumb from "@/components/component-thumbs/progress";
import RadioThumb from "@/components/component-thumbs/radio";
import SelectThumb from "@/components/component-thumbs/select";
import SkeletonThumb from "@/components/component-thumbs/skeleton";
import SliderThumb from "@/components/component-thumbs/slider";
import SpinnerThumb from "@/components/component-thumbs/spinner";
import SwitchThumb from "@/components/component-thumbs/switch";
import TableThumb from "@/components/component-thumbs/table";
import TabsThumb from "@/components/component-thumbs/tabs";
import TextareaThumb from "@/components/component-thumbs/textarea";
import TooltipThumb from "@/components/component-thumbs/tooltip";

// Map component names to their thumbnail components
const componentThumbnails: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  accordion: AccordionThumb,
  alert: AlertThumb,
  "alert-dialog": AlertDialogThumb,
  avatar: AvatarThumb,
  badge: BadgeThumb,
  breadcrumb: BreadcrumbThumb,
  button: ButtonThumb,
  card: CardThumb,
  checkbox: CheckboxThumb,
  drawer: DrawerThumb,
  input: InputThumb,
  inputOtp: PinInputThumb,
  popover: PopoverThumb,
  progress: ProgressThumb,
  radio: RadioThumb,
  select: SelectThumb,
  skeleton: SkeletonThumb,
  slider: SliderThumb,
  spinner: SpinnerThumb,
  switch: SwitchThumb,
  table: TableThumb,
  tabs: TabsThumb,
  textarea: TextareaThumb,
  tooltip: TooltipThumb,
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
