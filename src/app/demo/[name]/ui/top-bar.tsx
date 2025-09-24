import Topbar from "@/components/ui/top-bar";
import MinimalLayout from "../blocks/minimal-layout";

export const topbar = {
  name: "topbar",
  components: {
    Default: (
      <MinimalLayout>
        <Topbar />
      </MinimalLayout>
    ),
  },
};
