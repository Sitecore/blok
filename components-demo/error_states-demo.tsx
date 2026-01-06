import { ErrorStates } from "@/components/ui/error-states";

export function ErrorStatesDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Error States</h2>
    <div className="flex w-full max-w-full gap-4">
      {/* Generic */}
      <div id="error-states-generic">
        <div className="h-[400px]">
          <ErrorStates variant="generic" />
        </div>
      </div>

      {/* 400 */}
      <div id="error-states-400">
        <div className="h-[400px]">
          <ErrorStates variant="400" />
        </div>
      </div>

      {/* 401 */}
      <div id="error-states-401">
        <div className="h-[400px]">
          <ErrorStates variant="401" />
        </div>
      </div>

      {/* 403 */}
      <div id="error-states-403">
        <div className="h-[400px]">
          <ErrorStates variant="403" />
        </div>
      </div>

      {/* 404 */}
      <div id="error-states-404">
        <div className="h-[400px]">
          <ErrorStates variant="404" />
        </div>
      </div>

      {/* 500 */}
      <div id="error-states-500">
        <div className="h-[400px]">
          <ErrorStates variant="500" />
        </div>
      </div>

      {/* 503 */}
      <div id="error-states-503">
        <div className="h-[400px]">
          <ErrorStates variant="503" />
        </div>
      </div>
    </div>
    </div>
  );
}