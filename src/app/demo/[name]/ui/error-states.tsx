export const errorStates = {
  name: "error-states",
  preview: {
    defaultComponent: "error-states-generic",
  },
  usage: {
    usage: [
      `import { ErrorStates } from "@/components/ui/error-states";`,
      `<ErrorStates variant="generic" />`,
    ],
  },
  components: {
    Generic: { component: "error-states-generic" },
    "Bad Request (400)": { component: "error-states-400" },
    "Unauthorized (401)": { component: "error-states-401" },
    "Forbidden (403)": { component: "error-states-403" },
    "Page Not Found (404)": { component: "error-states-404" },
    "Internal Server Error (500)": { component: "error-states-500" },
    "Service Unavailable (503)": { component: "error-states-503" },
  },
};
