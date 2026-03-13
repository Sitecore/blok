"use client";

import { SidebarRHS, SidebarRHSProvider } from "@/components/bloks/sidebar-rhs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function SidebarContent() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="border-b-0 pb-0">
          <CardTitle>Sidebar Content</CardTitle>
          <CardDescription>
            This sidebar uses a simple heading in the header
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The header contains just a simple title text, which is the default
            behavior for the sidebar component.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function SidebarRHSDemo() {
  return (
    <div className="h-[550px]">
      <SidebarRHSProvider>
        <div className="w-full h-full flex bg-body-bg">
          {/* Main content area */}
          <main className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Main Content Area</h2>
              <p className="text-muted-foreground">
                This sidebar demonstrates a simple heading-only header. This is
                the default style for the sidebar component.
              </p>
            </div>
          </main>

          {/* Sidebar */}
          <SidebarRHS
            title="Sidebar RHS"
            width="340px"
            minWidth="250px"
            maxWidth="600px"
            height="100%"
            collapsible={true}
            dockable={true}
          >
            <SidebarContent />
          </SidebarRHS>
        </div>
      </SidebarRHSProvider>
    </div>
  );
}
