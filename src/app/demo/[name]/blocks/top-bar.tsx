import Topbar from "@/components/blocks/top-bar";
import MinimalLayout from "./minimal-layout";

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
