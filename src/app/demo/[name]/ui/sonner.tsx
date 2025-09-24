import {
  ActionSonner,
  ClosableSonner,
  ErrorSonner,
  Sonner,
  SuccessfulSonner,
  WarningSonner,
} from "@/app/demo/[name]/ui/sonner-toasts";

export const sonner = {
  name: "sonner",
  components: {
    Default: <Sonner />,
    Success: <SuccessfulSonner />,
    Warning: <WarningSonner />,
    Error: <ErrorSonner />,
    Action: <ActionSonner />,
    Closable: <ClosableSonner />,
  },
};
