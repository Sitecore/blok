import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      tree={source.pageTree}
      {...baseOptions()}
      sidebar={{
        enabled: false,
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
