import { RightSidebar } from "@/components/docsite/right-sidebar";
import { getRightSidebarMetadata } from "@/lib/right-sidebar-metadata";

export default function TypographyPage() {
  const metadata = getRightSidebarMetadata("theming-typography");

  return (
    <div className="flex w-full">
      <div className="flex-1 min-w-0">
        <div className="container p-5 md:p-10">
          <div className="mb-8">
            <h1 className="font-bold text-4xl tracking-tight">Typography</h1>
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

