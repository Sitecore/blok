import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function DangerAlertDemo() {
  return (
    <Alert variant="danger">
      <AlertTitle>Danger Alert</AlertTitle>
      <AlertDescription>
        This is a danger alert with a title and description.
      </AlertDescription>
    </Alert>
  );
}
