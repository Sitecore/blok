import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClosableAlert } from "@/app/demo/[name]/ui/alert-closable";
import { ButtonLinkAlert } from "@/app/demo/[name]/ui/alert-button-Link";
import { FilterInput } from "@/app/demo/[name]/ui/filter-input";
import { FilterSingleSelect } from "@/app/demo/[name]/ui/filter-single-select";

export const filter = {
  name: "alert",
  defaultComponent: (
    <Alert>
      <AlertTitle>Alert</AlertTitle>
      <AlertDescription>
        This is an example of an alert with a title and description.
      </AlertDescription>
    </Alert>
  ),
  usage: [
    `import {\n  Alert,\n  AlertDescription,\n  AlertTitle,\n} from "@/components/ui/alert"`,
    `<Alert>\n  <AlertTitle>Alert</AlertTitle>\n  <AlertDescription>\n    This is an example of an alert with a title and description.\n  </AlertDescription>\n</Alert>`
  ],
  components: {
    "Filter Input": <FilterInput />,
    "Filter Single Select": <FilterSingleSelect />,
    "Filter Multi Select": (
      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This is a success alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    Toggle: (
      <Alert variant="danger">
        <AlertTitle>Danger Alert</AlertTitle>
        <AlertDescription>
          This is a danger alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
  },
};
