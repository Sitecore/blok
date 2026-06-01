import { sidebarRhsCodeFiles } from "@/lib/docsite/blok-demo-code-files";

/** Usage sample — separate strings so `{` is not parsed as template interpolation in .tsx */
const sidebarRhsUsageCode = [
  'import { SidebarRHSProvider, SidebarRHS } from "@/components/bloks/sidebar-rhs";',
  'import { StackNavigation } from "@/components/ui/stack-navigation";',
  "",
  "<SidebarRHSProvider>",
  '  <div className="relative w-full h-screen flex">',
  '    <main className="flex-1 overflow-auto">{/* page content */}</main>',
  "    <SidebarRHS",
  "      header={",
  "        <StackNavigation",
  "          items={navItems}",
  '          orientation="horizontal"',
  '          colorScheme="neutral"',
  "          pathname={activeTab}",
  "          onItemClick={(item, e) => {",
  "            e.preventDefault();",
  "            setActiveTab(item.path);",
  "            return false;",
  "          }}",
  '          className="shadow-none h-auto bg-transparent p-0 w-full"',
  "        />",
  "      }",
  '      width="360px"',
  '      height="100vh"',
  "      collapsible",
  "      dockable={false}",
  "    >",
  "      {/* Any content for the active tab */}",
  "      {yourTabContent}",
  "    </SidebarRHS>",
  "    {/* dockable={true} — optional: show undock control for floating draggable sidebar */}",
  "  </div>",
  "</SidebarRHSProvider>",
].join("\n");

export const sidebarRhs = {
  name: "sidebar-rhs",
  preview: {
    defaultComponent: "sidebar-rhs",
    codeFiles: sidebarRhsCodeFiles,
    contentClassName:
      "p-0 h-[720px] min-h-[720px] max-h-[720px] w-full items-stretch justify-start",
    wrapperClassName: "rounded-none h-[720px] w-full",
  },
  components: {
    Fixed: {
      component: "sidebar-rhs-fixed",
      contentClassName:
        "p-0 h-[720px] min-h-[720px] max-h-[720px] w-full items-stretch justify-start",
      wrapperClassName: "rounded-none h-[720px] w-full",
    },
  },
  usage: {
    usage: [sidebarRhsUsageCode],
  },
};
