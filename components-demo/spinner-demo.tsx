import { Spinner } from "@/components/ui/spinner";

export function SpinnerDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Spinner</h2>
      <div className="flex w-full max-w-full gap-4">

        {/* Default Spinner */}
        <div id="spinner-default">
          <div className="flex items-center justify-center gap-4 w-28">
            <Spinner variant="default" />
            <Spinner variant="primary" />
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

      </div>
    </div>
  );
}