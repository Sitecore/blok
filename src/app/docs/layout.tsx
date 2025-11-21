import type { ReactNode } from "react";
import { pageTree } from "@/lib/source-utils";
import { MDXWrapper } from "@/components/mdx-wrapper";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MDXWrapper>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-muted/40 hidden lg:block sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <h2 className="font-bold text-lg mb-4">Blok</h2>
            <nav className="space-y-1">
              {pageTree.children.map((item) => {
                if (item.type === "page") {
                  return (
                    <a
                      key={item.url}
                      href={item.url}
                      className="block px-3 py-2 rounded-md text-sm hover:bg-accent"
                    >
                      {item.name}
                    </a>
                  );
                }
                if (item.type === "folder") {
                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="px-3 py-2 text-sm font-semibold">{item.name}</div>
                      {item.children?.map((child) => (
                        <a
                          key={child.url}
                          href={child.url}
                          className="block px-3 py-2 pl-6 rounded-md text-sm hover:bg-accent"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="container max-w-4xl py-6 lg:py-10">
            {children}
          </div>
        </main>
      </div>
    </MDXWrapper>
  );
}
