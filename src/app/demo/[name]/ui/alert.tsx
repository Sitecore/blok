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
    Primary: { component: "alert-primary" },
    Success: { component: "alert-success" },
    Danger: { component: "alert-danger" },
    Warning: { component: "alert-warning" },
    Closable: { component: "alert-closable" },
    "With Button Link": { component: "alert-button-link" },
  },
};
