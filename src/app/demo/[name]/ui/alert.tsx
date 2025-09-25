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
    PrimaryClosable: <ClosableAlert variantProp="primary" />,
    PrimaryLinkBtn: <ButtonLinkAlert variantProp="primary" />,
    Success: (
      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This is a success alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    SuccessClosable: <ClosableAlert variantProp="success" />,
    SuccessLinkBtn: <ButtonLinkAlert variantProp="success" />,
    Danger: (
      <Alert variant="danger">
        <AlertTitle>Danger Alert</AlertTitle>
        <AlertDescription>
          This is a danger alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    DangerClosable: <ClosableAlert variantProp="danger" />,
    DangerLinkBtn: <ButtonLinkAlert variantProp="danger" />,
    Warning: (
      <Alert variant="warning">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This is a warning alert with a title and description.
        </AlertDescription>
      </Alert>
    ),
    WarningClosable: <ClosableAlert variantProp="warning" />,
    WarningLinkBtn: <ButtonLinkAlert variantProp="warning" />,
    
    Descriptive: (
      <Alert variant="primary">
        <AlertTitle>
          This is an extremely long alert title that spans multiple lines to
          demonstrate how the component handles very lengthy headings while
          maintaining readability and proper text wrapping behavior
        </AlertTitle>
        <AlertDescription>
          This is an equally long description that contains detailed information
          about the alert. It shows how the component can accommodate extensive
          content while preserving proper spacing, alignment, and readability
          across different screen sizes and viewport widths. This helps ensure
          the user experience remains consistent regardless of the content
          length.
        </AlertDescription>
      </Alert>
    ),
  },
};
