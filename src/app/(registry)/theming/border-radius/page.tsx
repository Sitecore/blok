import { RightSidebar } from "@/components/docsite/right-sidebar";
import { getRightSidebarMetadata } from "@/lib/right-sidebar-metadata";

export default function BorderRadiusPage() {
  const metadata = getRightSidebarMetadata("theming-border-radius");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0">
        <div className="container p-5 md:p-10">
          <div className="mb-8">
            <h1 className="font-bold text-4xl tracking-tight">Border Radius</h1>
          </div>
        </div>
      </div>
      
      <RightSidebar
        sections={metadata.sections}
        links={metadata.links}
      />
    </div>
  );
}

