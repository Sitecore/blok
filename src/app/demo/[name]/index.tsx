import type { ReactElement, ReactNode } from "react";

// ui
import { accordion } from "@/app/demo/[name]/ui/accordion";
import { alert } from "@/app/demo/[name]/ui/alert";
import { alertDialog } from "@/app/demo/[name]/ui/alert-dialog";
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
import { collapsible } from "@/app/demo/[name]/ui/collapsible";
import { combobox } from "@/app/demo/[name]/ui/combobox";
import { command } from "@/app/demo/[name]/ui/command";
import { contextMenu } from "@/app/demo/[name]/ui/context-menu";
import { datePicker } from "@/app/demo/[name]/ui/date-picker";
import { dialog } from "@/app/demo/[name]/ui/dialog";
import { drawer } from "@/app/demo/[name]/ui/drawer";
import { dropdownMenu } from "@/app/demo/[name]/ui/dropdown-menu";
import { form } from "@/app/demo/[name]/ui/form";
import { hoverCard } from "@/app/demo/[name]/ui/hover-card";
import { input } from "@/app/demo/[name]/ui/input";
import { inputOtp } from "@/app/demo/[name]/ui/inputOtp";
import { label } from "@/app/demo/[name]/ui/label";
// import { menuBar } from "@/app/demo/[name]/ui/menu-bar";
import { navigationMenu } from "@/app/demo/[name]/ui/navigation-menu";
import { pagination } from "@/app/demo/[name]/ui/pagination";
import { popover } from "@/app/demo/[name]/ui/popover";
import { progress } from "@/app/demo/[name]/ui/progress";
import { radioGroup } from "@/app/demo/[name]/ui/radio-group";
import { resizable } from "@/app/demo/[name]/ui/resizable";
import { scrollArea } from "@/app/demo/[name]/ui/scroll-area";
import { select } from "@/app/demo/[name]/ui/select";
import { separator } from "@/app/demo/[name]/ui/separator";
import { sheet } from "@/app/demo/[name]/ui/sheet";
import { sidebar } from "@/app/demo/[name]/ui/sidebar";
import { skeleton } from "@/app/demo/[name]/ui/skeleton";
import { slider } from "@/app/demo/[name]/ui/slider";
import { sonner } from "@/app/demo/[name]/ui/sonner";
import { spinner } from "@/app/demo/[name]/ui/spinner";
import { switchComponent } from "@/app/demo/[name]/ui/switch";
import { table } from "@/app/demo/[name]/ui/table";
import { tabs } from "@/app/demo/[name]/ui/tabs";
import { textarea } from "@/app/demo/[name]/ui/textarea";
import { toggle } from "@/app/demo/[name]/ui/toggle";
import { toggleGroup } from "@/app/demo/[name]/ui/toggle-group";
import { tooltip } from "@/app/demo/[name]/ui/tooltip";
import { topbar } from "@/app/demo/[name]/ui/top-bar";

interface Demo {
  name: string; // this must match the `/registries/registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Demo } = {
  // ui
  accordion,
  alert,
  "alert-dialog": alertDialog,
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
  "date-picker": datePicker,
  dialog,
  drawer,
  "dropdown-menu": dropdownMenu,
  "hover-card": hoverCard,
  form,
  input,
  inputOtp,
  label,
  // "menu-bar": menuBar,
  "navigation-menu": navigationMenu,
  pagination,
  popover,
  progress,
  "radio-group": radioGroup,
  resizable,
  "scroll-area": scrollArea,
  select,
  separator,
  sheet,
  sidebar,
  skeleton,
  slider,
  sonner,
  spinner,
  switch: switchComponent,
  table,
  tabs,
  textarea,
  toggle,
  "toggle-group": toggleGroup,
  tooltip,
  topbar,
};
