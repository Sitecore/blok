import { CircularProgress } from "@/components/ui/circular-progress";

export function CircularProgressDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Circular Progress</h2>
      <div className="flex w-full max-w-full gap-4">
        {/* Default Circular Progress */}
        <div id="circular-default">
          <div className="flex items-start justify-center w-28">
            <CircularProgress variant="default" size="md" />
          </div>
        </div>

        {/* Variant Circular Progress */}
        <div id="circular-variant">
          <div className="flex flex-wrap items-center gap-30">
            {/* <CircularProgress variant="default" size="md" /> */}
            <CircularProgress variant="circular" size="md" />
          </div>
        </div>

        {/* Circular Progress with Text Message */}
        <div id="circular-withText">
          <div className="flex items-start justify-center w-28"> 
            <CircularProgress variant="circular" size="md" message="Loading..." />
          </div>
        </div>
      </div>
    </div>
  );
}