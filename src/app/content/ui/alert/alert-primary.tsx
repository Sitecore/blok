import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertPrimaryDemo() {
  return (
    <Alert variant="primary">
      <AlertTitle>Primary Alert</AlertTitle>
      <AlertDescription>
        This is a primary alert with a title and description.
      </AlertDescription>
    </Alert>
  );
}
