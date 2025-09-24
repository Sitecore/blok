import type { ReactElement, ReactNode } from "react";

// ui
import { accordion } from "@/app/demo/[name]/ui/accordion";
import { alertDialog } from "@/app/demo/[name]/ui/alert-dialog";
import { alert } from "@/app/demo/[name]/ui/alert";
import { aspectRatio } from "@/app/demo/[name]/ui/aspect-ratio";
import { avatar } from "@/app/demo/[name]/ui/avatar";
import { badge } from "@/app/demo/[name]/ui/badge";
import { breadcrumb } from "@/app/demo/[name]/ui/breadcrumb";
import { button } from "@/app/demo/[name]/ui/button";
import { calendar } from "@/app/demo/[name]/ui/calendar";
import { card } from "@/app/demo/[name]/ui/card";
import { carousel } from "@/app/demo/[name]/ui/carousel";
import { chart } from "@/app/demo/[name]/ui/chart";
import { checkbox } from "@/app/demo/[name]/ui/checkbox";
import { contextMenu } from "@/app/demo/[name]/ui/context-menu";
import { datePicker } from "@/app/demo/[name]/ui/date-picker";
import { dialog } from "@/app/demo/[name]/ui/dialog";
import { drawer } from "@/app/demo/[name]/ui/drawer";
import { dropdownMenu } from "@/app/demo/[name]/ui/dropdown-menu";
import { input } from "@/app/demo/[name]/ui/input";
import { inputOtp } from "@/app/demo/[name]/ui/inputOtp";
import { label } from "@/app/demo/[name]/ui/label";
// import { menuBar } from "@/app/demo/[name]/ui/menu-bar";
import { navigationMenu } from "@/app/demo/[name]/ui/navigation-menu";
import { radioGroup } from "@/app/demo/[name]/ui/radio-group";
import { resizable } from "@/app/demo/[name]/ui/resizable";
import { select } from "@/app/demo/[name]/ui/select";
import { separator } from "@/app/demo/[name]/ui/separator";
import { sheet } from "@/app/demo/[name]/ui/sheet";
import { sidebar } from "@/app/demo/[name]/ui/sidebar";
import { skeleton } from "@/app/demo/[name]/ui/skeleton";
import { slider } from "@/app/demo/[name]/ui/slider";
import { sonner } from "@/app/demo/[name]/ui/sonner";
import { switchComponent } from "@/app/demo/[name]/ui/switch";
import { table } from "@/app/demo/[name]/ui/table";
import { tabs } from "@/app/demo/[name]/ui/tabs";
import { textarea } from "@/app/demo/[name]/ui/textarea";
import { toggleGroup } from "@/app/demo/[name]/ui/toggle-group";
import { tooltip } from "@/app/demo/[name]/ui/tooltip";
import { toggle } from "@/app/demo/[name]/ui/toggle";
import { topbar } from "@/app/demo/[name]/ui/top-bar";
import { pagination } from "@/app/demo/[name]/ui/pagination";
import { scrollArea } from "@/app/demo/[name]/ui/scroll-area";
import { popover } from "@/app/demo/[name]/ui/popover";
import { hoverCard } from "@/app/demo/[name]/ui/hover-card";
import { collapsible } from "@/app/demo/[name]/ui/collapsible";
import { progress } from "@/app/demo/[name]/ui/progress";
import { command } from "@/app/demo/[name]/ui/command";
import { combobox } from "@/app/demo/[name]/ui/combobox";
import { spinner } from "@/app/demo/[name]/ui/spinner";

interface Demo {
  name: string; // this must match the `/registries/registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Demo } = {
  // ui
  accordion,
  "alert-dialog": alertDialog,
  alert,
  "aspect-ratio": aspectRatio,
  avatar,
  badge,
  breadcrumb,
  button,
  calendar,
  card,
  carousel,
  chart,
  checkbox,
  collapsible,
  combobox,
  "context-menu": contextMenu,
  command,
  dialog,
  "date-picker": datePicker,
  drawer,
  "dropdown-menu": dropdownMenu,
  input,
  inputOtp,
  label,
  // "menu-bar": menuBar,
  "navigation-menu": navigationMenu,
  progress,
  "scroll-area": scrollArea,
  "radio-group": radioGroup,
  resizable,
  select,
  separator,
  sheet,
  sidebar,
  skeleton,
  slider,
  spinner,
  switch: switchComponent,
  sonner,
  table,
  tabs,
  textarea,
  "toggle-group": toggleGroup,
  tooltip,
  toggle,
  topbar,
  pagination,
  popover,
  "hover-card": hoverCard,
};
