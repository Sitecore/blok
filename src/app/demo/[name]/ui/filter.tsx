import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClosableAlert } from "@/app/demo/[name]/ui/alert-closable";
import { ButtonLinkAlert } from "@/app/demo/[name]/ui/alert-button-Link";
import { FilterInput } from "@/app/demo/[name]/ui/filter-input";
import { FilterSingleSelect } from "@/app/demo/[name]/ui/filter-single-select";
import { FilterMultiSelect } from "@/app/demo/[name]/ui/filter-multi-select";
import { FilterToggle } from "@/app/demo/[name]/ui/filter-toggle";
import { FilterHorizontalLayout } from "@/app/demo/[name]/ui/filter-horizontal-layout";

export const filter = {
  name: "alert",
  defaultComponent: <FilterHorizontalLayout />,
 
  components: {
    "Filter Input": <FilterInput />,
    "Filter Single Select": <FilterSingleSelect />,
    "Filter Multi Select": <FilterMultiSelect />,
    Toggle: <FilterToggle />,
  },
};
