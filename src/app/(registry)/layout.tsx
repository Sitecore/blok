import { SidebarProvider, SidebarInset } from "@/components/docsite/docsite-sidebar";
import type { ReactNode } from "react";

import {
  MobileSidebarTrigger,
  RegistrySidebar,
} from "@/components/layout/registry-sidebar";
import { Toaster } from "@/components/ui/sonner";
import TopBar from "@/components/layout/topbar";
import { DynamicRightSidebar } from "@/components/layout/dynamic-right-sidebar";

export default function RegistryLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <div className="flex min-h-screen flex-col w-full">
        <header className="sticky top-0 z-50 border-b bg-background border-border">
          <TopBar />
        </header>
        <div className="flex flex-1 relative">
          <SidebarProvider className="flex flex-1 w-full">
            <RegistrySidebar />
            <SidebarInset className="flex flex-col">
              <MobileSidebarTrigger />
              <main id="main-content" className="flex flex-1 w-full justify-center xl:pr-[250px]">
                {children}
              </main>
              <DynamicRightSidebar />
            </SidebarInset>
          </SidebarProvider>
        </div>
        <Toaster />
      </div>
    </>
  );
}
