import MinimalLayout from "./minimal-layout";
import { SidebarPage } from "./sidebar-page";

export const sidebar = {
  name: "sidebar",
  components: {
    Default: (
      <MinimalLayout>
        <SidebarPage />
      </MinimalLayout>
    ),
  },
};
