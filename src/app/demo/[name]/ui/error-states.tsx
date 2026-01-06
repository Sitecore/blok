export const errorStates = {
  name: "error-states",
  defaultComponent: "error-states-generic",
  usage: [
    `import { ErrorStates } from "@/components/ui/error-states";`,
    `<ErrorStates variant="generic" />`,
  ],
  components: {
    Generic: "error-states-generic",
    "Bad Request (400)": "error-states-400",
    "Unauthorized (401)": "error-states-401",
    "Forbidden (403)": "error-states-403",
    "Page Not Found (404)": "error-states-404",
    "Internal Server Error (500)": "error-states-500",
    "Service Unavailable (503)": "error-states-503",
  },
};


