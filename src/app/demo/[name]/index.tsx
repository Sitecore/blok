import type { ReactElement, ReactNode } from "react";

// blocks
import { blank } from "@/app/demo/[name]/blocks/blank";
import { dashboard } from "@/app/demo/[name]/blocks/dashboard";
import { store } from "@/app/demo/[name]/blocks/store";
import { topbar } from "@/app/demo/[name]/blocks/top-bar";

// components
import { brandHeader } from "@/app/demo/[name]/components/brand-header";
import { brandSidebar } from "@/app/demo/[name]/components/brand-sidebar";
import { hero } from "@/app/demo/[name]/components/hero";
import { login } from "@/app/demo/[name]/components/login";
import { logo } from "@/app/demo/[name]/components/logo";
import { productGrid } from "@/app/demo/[name]/components/product-grid";
import { promo } from "@/app/demo/[name]/components/promo";

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
import {carousel} from '@/app/demo/[name]/ui/carousel';
import { chart } from "@/app/demo/[name]/ui/chart";
import { checkbox } from "@/app/demo/[name]/ui/checkbox";
import { contextMenu } from "@/app/demo/[name]/ui/context-menu";
import { dataTable } from "@/app/demo/[name]/ui/data-table";
import { datePicker } from "@/app/demo/[name]/ui/date-picker";
import { dialog } from "@/app/demo/[name]/ui/dialog";
import {drawer} from "@/app/demo/[name]/ui/drawer";
import { dropdownMenu } from "@/app/demo/[name]/ui/dropdown-menu";
import { input } from "@/app/demo/[name]/ui/input";
import { inputOtp } from "@/app/demo/[name]/ui/inputOtp";
import { label } from "@/app/demo/[name]/ui/label";
import { menuBar } from "@/app/demo/[name]/ui/menu-bar";
import { navigationMenu } from "@/app/demo/[name]/ui/navigation-menu";
import { radioGroup } from "@/app/demo/[name]/ui/radio-group";
import { resizable } from "@/app/demo/[name]/ui/resizable";
import { select } from "@/app/demo/[name]/ui/select";
import { separator } from "@/app/demo/[name]/ui/separator";
import {sheet} from "@/app/demo/[name]/ui/sheet";
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
import { pagination } from "@/app/demo/[name]/ui/pagination";
import { scrollArea } from "@/app/demo/[name]/ui/scroll-area";
import { popover } from "@/app/demo/[name]/ui/popover";
import { hoverCard } from "@/app/demo/[name]/ui/hover-card";
import { collapsible } from "@/app/demo/[name]/ui/collapsible";
import { progress } from "@/app/demo/[name]/ui/progress";
import { command } from "@/app/demo/[name]/ui/command";
import { combobox } from "@/app/demo/[name]/ui/combobox";

interface Demo {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Demo } = {
  // blocks
  blank,
  store,
  dashboard,
  topbar,

  // components
  hero,
  login,
  promo,
  logo,
  "brand-header": brandHeader,
  "brand-sidebar": brandSidebar,
  "product-grid": productGrid,

  // ui
  accordion,
  "alert-dialog":alertDialog,
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
  "data-table": dataTable,
   drawer,
  "dropdown-menu": dropdownMenu,
  input,
  inputOtp,
  label,
  "menu-bar": menuBar,
  "navigation-menu": navigationMenu,
  progress,
  "scroll-area" :scrollArea,
  "radio-group": radioGroup,
  resizable,
  select,
  separator,
  sheet,
  skeleton,
  slider,
  switch: switchComponent,
  sonner,
  table,
  tabs,
  textarea,
  "toggle-group": toggleGroup,
  tooltip,
  toggle,
  pagination,
  popover,
  "hover-card": hoverCard,
};
