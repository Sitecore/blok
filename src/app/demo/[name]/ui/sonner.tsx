import {
  ActionSonner,
  CustomToastSonner,
  ClosableSonner,
  ErrorSonner,
  Sonner,
  SuccessfulSonner,
  WarningSonner,
} from "@/app/demo/[name]/ui/sonner-toasts";

export const sonner = {
  name: "sonner",
  defaultComponent: (
    <Sonner />
  ),
  usage: [
    `import { Sonner } from "@/components/ui/sonner";`,
    `<Sonner />`,
  ],
  components: {
    Default: <Sonner />,
    Success: <SuccessfulSonner />,
    Warning: <WarningSonner />,
    Error: <ErrorSonner />,
    Action: <ActionSonner />,
    // Custom: <CustomToastSonner />,
    Closable: <ClosableSonner />,
  },
};
