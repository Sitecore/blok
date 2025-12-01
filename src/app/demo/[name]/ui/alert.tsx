import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClosableAlert } from "@/app/demo/[name]/ui/alert-closable";
import { ButtonLinkAlert } from "@/app/demo/[name]/ui/alert-button-Link";

export const alert = {
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
    Primary: (
      <Alert variant="primary">
        <AlertTitle>Primary Alert</AlertTitle>
        <AlertDescription>
          This is a primary alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    Success: (
      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This is a success alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    Danger: (
      <Alert variant="danger">
        <AlertTitle>Danger Alert</AlertTitle>
        <AlertDescription>
          This is a danger alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    Warning: (
      <Alert variant="warning">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This is a warning alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    Closable: <ClosableAlert variantProp="primary" />,
    "With Button Link": <ButtonLinkAlert variantProp="primary" />,
  },
};
