export const alert = {
  name: "alert",
  preview: {
    defaultComponent: "alert",
  },
  usage: {
    usage: [
      `import {\n  Alert,\n  AlertDescription,\n  AlertTitle,\n} from "@/components/ui/alert"`,
      `<Alert>\n  <AlertTitle>Alert</AlertTitle>\n  <AlertDescription>\n    This is an example of an alert with a title and description.\n  </AlertDescription>\n</Alert>`,
    ],
  },
  components: {
    "alert-primary": { component: "alert-primary" },
    "alert-success": { component: "alert-success" },
    "alert-danger": { component: "alert-danger" },
    "alert-warning": { component: "alert-warning" },
    "alert-closable": { component: "alert-closable" },
    "alert-button-link": { component: "alert-button-link" },
  },
};
