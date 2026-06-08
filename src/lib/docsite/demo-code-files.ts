import type { FileTreeNode } from "@/components/ui/file-tree";

export type DemoCodeFileSource = {
  /** Virtual path in the file tree (e.g. `all-site/all-site-section.tsx`). */
  id: string;
  /** Path relative to the repo root. */
  path: string;
  language?: string;
  default?: boolean;
};

export type LoadedDemoCodeFile = DemoCodeFileSource & {
  code: string;
};

export function languageFromDemoPath(filePath: string): string {
  if (filePath.endsWith(".json")) return "json";
  if (filePath.endsWith(".css")) return "css";
  return "tsx";
}

/** Build nested file-tree nodes from virtual paths (e.g. `app/dashboard/page.tsx`). */
export function demoCodeFilesToTree(
  files: LoadedDemoCodeFile[],
): FileTreeNode[] {
  type Branch = {
    node: FileTreeNode;
    children: Map<string, Branch>;
  };

  const root = new Map<string, Branch>();

  for (const file of files) {
    const segments = file.id.split("/").filter(Boolean);
    let branch = root;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isFile = i === segments.length - 1;
      const nodeId = segments.slice(0, i + 1).join("/");

      if (!branch.has(segment)) {
        branch.set(segment, {
          node: {
            id: isFile ? file.id : nodeId,
            name: segment,
            type: isFile ? "file" : "folder",
          },
          children: new Map(),
        });
      }

      const entry = branch.get(segment);
      if (!entry) continue;

      if (isFile) {
        entry.node = {
          id: file.id,
          name: segment,
          type: "file",
        };
      } else {
        branch = entry.children;
      }
    }
  }

  const mapToNodes = (map: Map<string, Branch>): FileTreeNode[] =>
    [...map.values()]
      .map(({ node, children }) => {
        const childNodes = mapToNodes(children);
        if (childNodes.length > 0) {
          return { ...node, type: "folder" as const, children: childNodes };
        }
        return node;
      })
      .sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "folder" ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });

  return mapToNodes(root);
}

export function collectFolderIdsFromTree(nodes: FileTreeNode[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (node.type === "folder" || (node.children?.length ?? 0) > 0) {
      ids.push(node.id);
      if (node.children) {
        ids.push(...collectFolderIdsFromTree(node.children));
      }
    }
  }
  return ids;
}

export function defaultSelectedCodeFileId(
  files: LoadedDemoCodeFile[],
): string | null {
  const marked = files.find((f) => f.default);
  if (marked) return marked.id;
  const appDemo = files.find(
    (f) =>
      f.id.startsWith("app/content/bloks/") &&
      f.id.endsWith(".tsx") &&
      !f.id.includes("mock"),
  );
  if (appDemo) return appDemo.id;
  const demoTsx = files.find(
    (f) => f.id.endsWith(".tsx") && !f.id.includes("mock"),
  );
  if (demoTsx) return demoTsx.id;
  return files[0]?.id ?? null;
}

/** Single entry for blok Code tab file trees. */
export function demoCodeFile(
  id: string,
  path: string,
  options?: { default?: boolean; language?: string },
): DemoCodeFileSource {
  return { id, path, ...options };
}

/** Helpers for blok demo `preview.codeFiles` configuration. */
export function blokCodeFiles(
  root: string,
  entries: Array<{ name: string; path: string; default?: boolean }>,
): DemoCodeFileSource[] {
  return entries.map((entry) => ({
    id: `${root}/${entry.name}`,
    path: entry.path,
    default: entry.default,
  }));
}
