import Topbar from "@/components/ui/top-bar";
import MinimalLayout from "../blocks/minimal-layout";

export const topbar = {
  name: "topbar",
  defaultComponent: (
    <MinimalLayout>
      <Topbar />
    </MinimalLayout>
  ),
  usage: [
    `import Topbar from "@/components/ui/top-bar";`,
    `<Topbar />`,
  ],
};
