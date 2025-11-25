import { ErrorStates } from "@/components/ui/error-states";

export const errorStates = {
  name: "error-states",
  defaultComponent: (
    <div className="h-[400px]">
      <ErrorStates variant="generic" />
    </div>
  ),
  usage: [
    `import { ErrorStates } from "@/components/ui/error-states";`,
    `<ErrorStates variant="generic" />`,
  ],
  components: {
    Generic: (
      <div className="h-[400px]">
        <ErrorStates variant="generic" />
      </div>
    ),
    "Bad Request (400)": (
      <div className="h-[400px]">
        <ErrorStates variant="400" />
      </div>
    ),
    "Unauthorized (401)": (
      <div className="h-[400px]">
        <ErrorStates variant="401" />
      </div>
    ),
    "Forbidden (403)": (
      <div className="h-[400px]">
        <ErrorStates variant="403" />
      </div>
    ),
    "Page Not Found (404)": (
      <div className="h-[400px]">
        <ErrorStates variant="404" />
      </div>
    ),
    "Internal Server Error (500)": (
      <div className="h-[400px]">
        <ErrorStates variant="500" />
      </div>
    ),
    "Service Unavailable (503)": (
      <div className="h-[400px]">
        <ErrorStates variant="503" />
      </div>
    ),
  },
};

