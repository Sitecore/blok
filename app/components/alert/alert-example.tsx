import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert"

interface AlertExampleProps {
  variant: "success" | "warning" | "primary" | "default" | "danger";
  title: string;
  description: string;
}

export function AlertExample({ variant, title, description }: AlertExampleProps) {
  return (
    <Alert variant={variant}>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}
