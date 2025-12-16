import { ErrorStates } from "@/components/ui/error-states";

export const errorStates = {
  name: "error-states",
  defaultComponent: (
    <div id="error-states-default" className="h-[400px]">
      <ErrorStates variant="generic" />
    </div>
  ),
  usage: [
    `import { ErrorStates } from "@/components/ui/error-states";`,
    `<ErrorStates variant="generic" />`,
  ],
  components: {
    Generic: (
      <div id="error-states-generic" className="h-[400px]">
        <ErrorStates variant="generic" />
      </div>
    ),
    "Bad Request (400)": (
      <div id="error-states-400" className="h-[400px]">
        <ErrorStates variant="400" />
      </div>
    ),
    "Unauthorized (401)": (
      <div id="error-states-401" className="h-[400px]">
        <ErrorStates variant="401" />
      </div>
    ),
    "Forbidden (403)": (
      <div id="error-states-403" className="h-[400px]">
        <ErrorStates variant="403" />
      </div>
    ),
    "Page Not Found (404)": (
      <div id="error-states-404" className="h-[400px]">
        <ErrorStates variant="404" />
      </div>
    ),
    "Internal Server Error (500)": (
      <div id="error-states-500" className="h-[400px]">
        <ErrorStates variant="500" />
      </div>
    ),
    "Service Unavailable (503)": (
      <div id="error-states-503" className="h-[400px]">
        <ErrorStates variant="503" />
      </div>
    ),
  },
};

