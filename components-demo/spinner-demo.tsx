import { Spinner } from "@/components/ui/spinner";

export function SpinnerDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Spinner</h2>
      <div className="flex w-full max-w-full gap-4">
        {/* Default Spinner */}
        <div id="spinner-default">
          <div className="flex items-start justify-center w-28">
            <Spinner  variant="default" size="md" />
          </div>
        </div>

        {/* Circular Spinner */}
        <div id="spinner-circular">
          <div className="flex flex-wrap items-center gap-30">
            <Spinner variant="circular" size="md" />
          </div>
        </div>

        {/* Spinner with Message */}
        <div id="spinner-with-message">
          <div className="flex items-start justify-center w-28">
            <Spinner variant="circular" size="md"  message="Loading..." />
          </div>
        </div>
      </div>
    </div>
  );
}