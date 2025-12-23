import { SonnerDefault } from "@/app/demo/[name]/ui/sonner-default";
import { SuccessfulSonner } from "@/app/demo/[name]/ui/sonner-success";
import { WarningSonner } from "@/app/demo/[name]/ui/sonner-warning";
import { ErrorSonner } from "@/app/demo/[name]/ui/sonner-error";
import { ActionSonner } from "@/app/demo/[name]/ui/sonner-action";
import { ClosableSonner } from "@/app/demo/[name]/ui/sonner-closable";

export const sonner = {
  name: "sonner",
  defaultComponent: (
    <SonnerDefault />
  ),
  usage: [
    `import { Sonner } from "@/components/ui/sonner";`,
    `<Sonner />`,
  ],
  components: {
    Default: <SonnerDefault />,
    Success: <SuccessfulSonner />,
    Warning: <WarningSonner />,
    Error: <ErrorSonner />,
    Action: <ActionSonner />,
    // Custom: <CustomToastSonner />,
    Closable: <ClosableSonner />,
  },
};
