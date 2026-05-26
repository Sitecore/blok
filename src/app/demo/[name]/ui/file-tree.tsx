export const fileTree = {
  name: "File Tree",
  preview: {
    defaultComponent: "file-tree",
  },
  usage: {
    usage: [
      `import {\n  FileTree,\n  FileTreeFile,\n  FileTreeFolder,\n  type FileTreeNode,\n} from "@/components/ui/file-tree"`,
      `const data: FileTreeNode[] = [\n  {\n    id: "app",\n    name: "app",\n    type: "folder",\n    children: [\n      { id: "page.tsx", name: "page.tsx", type: "file" },\n    ],\n  },\n]\n\n<FileTree\n  data={data}\n  defaultSelectedId="page.tsx"\n  defaultExpandedIds={["app"]}\n/>`,
      `<FileTree defaultSelectedId="page.tsx">\n  <FileTreeFolder nodeId="app" name="app" defaultOpen>\n    <FileTreeFile nodeId="page.tsx" name="page.tsx" />\n  </FileTreeFolder>\n</FileTree>`,
    ],
  },
};
