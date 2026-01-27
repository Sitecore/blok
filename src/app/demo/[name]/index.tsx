import type { ReactElement, ReactNode } from "react";

// PRIMITIVES
import { accordion } from "@/app/demo/[name]/ui/accordion";
import { actionBar } from "@/app/demo/[name]/ui/action-bar";
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
import { circularProgress } from "@/app/demo/[name]/ui/circular-progress";
import { collapsible } from "@/app/demo/[name]/ui/collapsible";
import { combobox } from "@/app/demo/[name]/ui/combobox";
import { command } from "@/app/demo/[name]/ui/command";
import { contextMenu } from "@/app/demo/[name]/ui/context-menu";
import { datePicker } from "@/app/demo/[name]/ui/date-picker";
import { dialog } from "@/app/demo/[name]/ui/dialog";
import { draggable } from "@/app/demo/[name]/ui/draggable";
import { dropdownMenu } from "@/app/demo/[name]/ui/dropdown-menu";
import { editable } from "@/app/demo/[name]/ui/editable";
import { emptyStates } from "@/app/demo/[name]/ui/empty-states";
import { errorStates } from "@/app/demo/[name]/ui/error-states";
import { field } from "@/app/demo/[name]/ui/field";
import { filter } from "@/app/demo/[name]/ui/filter";
import { icon } from "@/app/demo/[name]/ui/icon-component";
import { input } from "@/app/demo/[name]/ui/input";
import { inputGroup } from "@/app/demo/[name]/ui/input-group";
import { inputOtp } from "@/app/demo/[name]/ui/inputOtp";
import { kbd } from "@/app/demo/[name]/ui/kbd";
import { label } from "@/app/demo/[name]/ui/label";
import { navigationMenu } from "@/app/demo/[name]/ui/navigation-menu";
import { pagination } from "@/app/demo/[name]/ui/pagination";
import { popover } from "@/app/demo/[name]/ui/popover";
import { progress } from "@/app/demo/[name]/ui/progress";
import { radioGroup } from "@/app/demo/[name]/ui/radio-group";
import { resizable } from "@/app/demo/[name]/ui/resizable";
import { scrollArea } from "@/app/demo/[name]/ui/scroll-area";
import { select } from "@/app/demo/[name]/ui/select";
import { selectReact } from "@/app/demo/[name]/ui/select-react";
import { separator } from "@/app/demo/[name]/ui/separator";
import { sheet } from "@/app/demo/[name]/ui/sheet";
import { sidebar } from "@/app/demo/[name]/ui/sidebar";
import { skeleton } from "@/app/demo/[name]/ui/skeleton";
import { slider } from "@/app/demo/[name]/ui/slider";
import { sonner } from "@/app/demo/[name]/ui/sonner";
import { spinner } from "@/app/demo/[name]/ui/spinner";
import { stackNavigation } from "@/app/demo/[name]/ui/stack-navigation";
import { stepper } from "@/app/demo/[name]/ui/stepper";
import { switchComponent } from "@/app/demo/[name]/ui/switch";
import { table } from "@/app/demo/[name]/ui/table";
import { tabs } from "@/app/demo/[name]/ui/tabs";
import { textarea } from "@/app/demo/[name]/ui/textarea";
import { timePicker } from "@/app/demo/[name]/ui/time-picker";
import { timeline } from "@/app/demo/[name]/ui/timeline";
import { toggle } from "@/app/demo/[name]/ui/toggle";
import { toggleGroup } from "@/app/demo/[name]/ui/toggle-group";
import { tooltip } from "@/app/demo/[name]/ui/tooltip";
import { topbar } from "@/app/demo/[name]/ui/topbar";

// BLOKS
import { allSite } from "@/app/demo/[name]/bloks/all-site";
import { collaboration } from "@/app/demo/[name]/bloks/collaboration";
import { pinnedSite } from "@/app/demo/[name]/bloks/pinned-site";
import { siteCard } from "@/app/demo/[name]/bloks/site-card";

interface Demo {
  name: string; // this must match the `/registries/registry.json` name
  preview: {
    pre?: ReactNode | ReactElement;
    defaultComponent: string;
    post?: ReactNode | ReactElement;
  };
  installation?: {
    pre?: ReactNode | ReactElement;
    post?: ReactNode | ReactElement;
  };
  usage?: {
    pre?: ReactNode | ReactElement;
    usage: string[];
    post?: ReactNode | ReactElement;
  };
  components?: {
    [name: string]: {
      pre?: ReactNode | ReactElement;
      component: ReactNode | ReactElement;
      post?: ReactNode | ReactElement;
    };
  };
}

export const demos: { [name: string]: Demo } = {
  // PRIMITIVES
  accordion,
  "action-bar": actionBar,
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
  command,
  "context-menu": contextMenu,
  "date-picker": datePicker,
  dialog,
  draggable,
  "dropdown-menu": dropdownMenu,
  editable,
  "empty-states": emptyStates,
  "error-states": errorStates,
  field,
  filter,
  icon,
  input,
  "input-group": inputGroup,
  inputOtp,
  kbd,
  label,
  "navigation-menu": navigationMenu,
  pagination,
  popover,
  progress,
  "radio-group": radioGroup,
  resizable,
  "scroll-area": scrollArea,
  select,
  "select-react": selectReact,
  separator,
  sheet,
  sidebar,
  skeleton,
  slider,
  sonner,
  "circular-progress": circularProgress,
  spinner,
  switch: switchComponent,
  "stack-navigation": stackNavigation,
  stepper,
  table,
  tabs,
  textarea,
  timeline,
  "time-picker": timePicker,
  toggle,
  "toggle-group": toggleGroup,
  tooltip,
  topbar,

  // BLOKS
  "all-site": allSite,
  "site-card": siteCard,
  "pinned-site": pinnedSite,
  collaboration,
};
