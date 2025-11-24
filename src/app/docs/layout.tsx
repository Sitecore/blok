import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { DocsSidebar } from "@/components/docs-sidebar";
import TopBar from "@/components/layout/topbar";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        enabled: false,
      }}
      nav={{
        component:       <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background border-border w-full" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
        <TopBar />
      </header>,
      }}
    >
      <div className="flex w-full max-w-full">
        <DocsSidebar tree={source.pageTree} />
        <div className="flex flex-1 min-w-0">
          {children}
        </div>
      </div>
    </DocsLayout>
  );
}
