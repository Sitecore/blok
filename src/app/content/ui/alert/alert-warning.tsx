import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function WarningAlertDemo() {
  return (
    <Alert variant="warning">
      <AlertTitle>Warning Alert</AlertTitle>
      <AlertDescription>
        This is a warning alert with a title and description.
      </AlertDescription>
    </Alert>
  );
}
