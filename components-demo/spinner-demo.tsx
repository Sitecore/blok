import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function SpinnerDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Spinner</h2>
      <div className="flex w-full max-w-full gap-4">

        {/* Default Spinner */}
        <div id="spinner-default">
          <div className="flex items-center justify-center w-28">
            <Spinner />
          </div>
        </div>

        {/* Size Spinner */}
        <div id="spinner-size">
          <div className="flex items-center gap-6">
            <Spinner className="size-3" />
            <Spinner className="size-4" />
            <Spinner className="size-6" />
            <Spinner className="size-8" />
          </div>
        </div>

        {/* Button Spinner */} 
        <div id="spinner-button">
          <div className="flex flex-col items-center gap-4">
            <Button disabled size="sm">
              <Spinner />
              Loading...
            </Button>
            <Button variant="outline" disabled size="sm">
              <Spinner />
              Please wait
            </Button>
            <Button variant="ghost" disabled size="sm">
              <Spinner />
              Processing
            </Button>
          </div>
        </div>

        {/* Badge Spinner */}
        <div id="spinner-badge">
          <div className="flex items-center gap-4">
            <Badge>
              <Spinner />
              Syncing
            </Badge>
            <Badge variant="bold" colorScheme="primary">
              <Spinner />
              Updating
            </Badge>
            <Badge variant="bold" colorScheme="success">
              <Spinner />
              Processing
            </Badge>
          </div>
        </div>

      </div>
    </div>
  );
}