import { BrandSidebar } from "@/components/brand-sidebar";
import { SidebarProvider } from "@/components/registry/docsite-sidebar";

export const brandSidebar = {
  name: "brand-sidebar",
  components: {
    Default: (
      <SidebarProvider>
        <BrandSidebar />
      </SidebarProvider>
    ),
  },
};
