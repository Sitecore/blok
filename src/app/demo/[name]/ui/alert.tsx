import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ClosableAlert } from "@/app/demo/[name]/ui/alert-closable";
import { ButtonLinkAlert } from "./alert-button-Link";

export const alert = {
  name: "alert",
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
    BtnLink: <ButtonLinkAlert variantProp="primary" />,
  },
};
