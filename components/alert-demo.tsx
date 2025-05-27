import {
  CheckCircle2Icon,
  GiftIcon,
  PopcornIcon,
  ShieldAlertIcon,
} from "lucide-react"
import { mdiAlertCircle, mdiCheckCircle, mdiInformation } from "@mdi/js";
import Icon from "@mdi/react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert"
import { Button } from "@/registry/new-york/ui/button"

export function AlertDemo() {
  return (
    <div className="grid max-w-xl items-start gap-4">
    
      <Alert variant="primary">
        <AlertDescription>
          This is a default (primary) alert. No title, only description.
        </AlertDescription>
      </Alert>
      {/* <Alert>
        <AlertDescription>
          This one has a description only. No title. No icon.
        </AlertDescription>
      </Alert>
      <Alert>
        <PopcornIcon />
        <AlertTitle>Let&apos;s try one with icon and title.</AlertTitle>
      </Alert>
      <Alert>
        <ShieldAlertIcon />
        <AlertTitle>
          This is a very long alert title that demonstrates how the component
          handles extended text content and potentially wraps across multiple
          lines
        </AlertTitle>
      </Alert>
      <Alert>
        <GiftIcon />
        <AlertDescription>
          This is a very long alert description that demonstrates how the
          component handles extended text content and potentially wraps across
          multiple lines
        </AlertDescription>
      </Alert> */}
      
      {/*<Alert variant="danger">
        <AlertCircleIcon />
        <AlertTitle>Something went wrong!</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertCircleIcon />
        <AlertTitle>Unable to process your payment.</AlertTitle>
        <AlertDescription>
          <p>Please verify your billing information and try again.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Check your card details</li>
            <li>Ensure sufficient funds</li>
            <li>Verify billing address</li>
          </ul>
        </AlertDescription>
      </Alert> */}
      {/* <Alert>
        <CheckCircle2Icon />
        <AlertTitle className="max-w-[calc(100%-4rem)] overflow-ellipsis">
          The selected emails have been marked as spam.
        </AlertTitle>
        <Button
          size="sm"
          variant="outline"
          className="absolute top-2.5 right-3 h-6 shadow-none"
        >
          Undo
        </Button>
      </Alert> */}
     
      <Alert variant="primary">
        <AlertTitle>Primary Alert</AlertTitle>
        <AlertDescription>
          This is a primary alert with a title and description.
        </AlertDescription>
      </Alert>
      <Alert variant="danger">
        <AlertTitle>Danger Alert</AlertTitle>
        <AlertDescription>
          This is a danger alert with a title and description.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>
          This is a warning alert with a title and description.
        </AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>
          This is a success alert with a title and description.
        </AlertDescription>
      </Alert>
       <Alert variant="primary">
        <AlertTitle>Closable Alert</AlertTitle>
        <AlertDescription>
          This is a primary alert with a title and description and even a close button.
        </AlertDescription>
         <Button
          size="sm"
          variant="link"
          className="absolute top-2.5 right-3 h-6 shadow-none"
        >
          Click
        </Button>
      </Alert>
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
    </div>
  )
}
