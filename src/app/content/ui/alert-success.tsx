import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertSuccessDemo() {
  return (
    <Alert variant="success">
      <AlertTitle>Success Alert</AlertTitle>
      <AlertDescription>
        This is a success alert with a title and description.
      </AlertDescription>
    </Alert>
  );
}
