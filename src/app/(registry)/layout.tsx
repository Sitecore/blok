import { SidebarProvider } from "@/components/registry/docsite-sidebar";
import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@/components/registry/registry-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function RegistryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MobileSidebarTrigger />
      <RegistrySidebar />
      <main id="main-content" className="flex w-full justify-center bg-subtle-bg">{children}</main>
      <Toaster />
    </SidebarProvider>
  );
}
