"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronRight, File, Folder } from "lucide-react";
import * as React from "react";

export type FileTreeNodeType = "file" | "folder";

export type FileTreeNode = {
  id: string;
  name: string;
  type?: FileTreeNodeType;
  children?: FileTreeNode[];
  icon?: React.ReactNode;
  disabled?: boolean;
};

type FileTreeContextValue = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  expandedIds: Set<string>;
  toggleExpanded: (id: string, open?: boolean) => void;
  indent: number;
  showIcons: boolean;
  selectFolders: boolean;
};

const FileTreeContext = React.createContext<FileTreeContextValue | null>(null);

const FileTreeDepthContext = React.createContext(0);

function useFileTree() {
  const context = React.useContext(FileTreeContext);
  if (!context) {
    throw new Error("FileTree components must be used within <FileTree>.");
  }
  return context;
}

function useFileTreeDepth() {
  return React.useContext(FileTreeDepthContext);
}

function collectFolderIds(nodes: FileTreeNode[]): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    const isFolder = node.type === "folder" || (node.children?.length ?? 0) > 0;
    if (isFolder) {
      ids.push(node.id);
      if (node.children) {
        ids.push(...collectFolderIds(node.children));
      }
    }
  }
  return ids;
}

function FileTreeProvider({
  selectedId: selectedIdProp,
  defaultSelectedId = null,
  onSelectedChange,
  expandedIds: expandedIdsProp,
  defaultExpandedIds,
  defaultExpandAll = false,
  onExpandedChange,
  indent = 12,
  showIcons = true,
  selectFolders = false,
  data,
  children,
}: {
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  onSelectedChange?: (id: string | null) => void;
  expandedIds?: Set<string> | string[];
  defaultExpandedIds?: string[];
  defaultExpandAll?: boolean;
  onExpandedChange?: (expandedIds: Set<string>) => void;
  indent?: number;
  showIcons?: boolean;
  selectFolders?: boolean;
  data?: FileTreeNode[];
  children?: React.ReactNode;
}) {
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = React.useState<
    string | null
  >(defaultSelectedId);

  const initialExpanded = React.useMemo(() => {
    if (defaultExpandAll && data) {
      return new Set(collectFolderIds(data));
    }
    return new Set(defaultExpandedIds ?? []);
  }, [defaultExpandAll, data, defaultExpandedIds]);

  const [uncontrolledExpandedIds, setUncontrolledExpandedIds] =
    React.useState<Set<string>>(initialExpanded);

  const selectedId = selectedIdProp ?? uncontrolledSelectedId;

  const expandedIds = React.useMemo(() => {
    if (expandedIdsProp === undefined) {
      return uncontrolledExpandedIds;
    }
    return expandedIdsProp instanceof Set
      ? expandedIdsProp
      : new Set(expandedIdsProp);
  }, [expandedIdsProp, uncontrolledExpandedIds]);

  const setSelectedId = React.useCallback(
    (id: string | null) => {
      if (selectedIdProp === undefined) {
        setUncontrolledSelectedId(id);
      }
      onSelectedChange?.(id);
    },
    [onSelectedChange, selectedIdProp],
  );

  const setExpandedIds = React.useCallback(
    (next: Set<string>) => {
      if (expandedIdsProp === undefined) {
        setUncontrolledExpandedIds(next);
      }
      onExpandedChange?.(next);
    },
    [expandedIdsProp, onExpandedChange],
  );

  const toggleExpanded = React.useCallback(
    (id: string, open?: boolean) => {
      const next = new Set(expandedIds);
      const shouldOpen = open ?? !next.has(id);
      if (shouldOpen) {
        next.add(id);
      } else {
        next.delete(id);
      }
      setExpandedIds(next);
    },
    [expandedIds, setExpandedIds],
  );

  const contextValue = React.useMemo<FileTreeContextValue>(
    () => ({
      selectedId,
      setSelectedId,
      expandedIds,
      toggleExpanded,
      indent,
      showIcons,
      selectFolders,
    }),
    [
      selectedId,
      setSelectedId,
      expandedIds,
      toggleExpanded,
      indent,
      showIcons,
      selectFolders,
    ],
  );

  return (
    <FileTreeContext.Provider value={contextValue}>
      {data ? <FileTreeData nodes={data} /> : children}
    </FileTreeContext.Provider>
  );
}

function fileTreeRowHighlightClass(isSelected: boolean) {
  return cn(
    "group/file-tree-row relative w-full",
    "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:right-0",
    "before:transition-colors before:content-['']",
    isSelected
      ? "before:bg-neutral-bg-active"
      : "before:bg-transparent hover:before:bg-neutral-bg",
  );
}

function fileTreeRowContentClass(isSelected: boolean) {
  return cn(
    "relative z-[1] flex w-full min-w-0 cursor-pointer items-center gap-1 py-1.5 pr-2 text-left text-sm text-foreground outline-none",
    "bg-transparent hover:bg-transparent",
    "focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    isSelected && "font-medium",
  );
}

function fileTreeRowPadding(depth: number, indent: number) {
  return { paddingLeft: `calc(${depth * indent}px + 0.5rem)` };
}

function FileTreeChevron({ open }: { open: boolean }) {
  return (
    <ChevronRight
      className={cn(
        "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
        open && "rotate-90",
      )}
      aria-hidden
    />
  );
}

function FileTreeIconSlot({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center text-muted-foreground [&>svg]:size-4",
        className,
      )}
    >
      {children}
    </span>
  );
}

function FileTreeFolder({
  nodeId,
  name,
  icon,
  disabled,
  defaultOpen,
  className,
  children,
}: {
  nodeId: string;
  name: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const {
    selectedId,
    setSelectedId,
    expandedIds,
    toggleExpanded,
    indent,
    showIcons,
    selectFolders,
  } = useFileTree();
  const depth = useFileTreeDepth();

  React.useEffect(() => {
    if (defaultOpen) {
      toggleExpanded(nodeId, true);
    }
  }, [defaultOpen, nodeId, toggleExpanded]);

  const isOpen = expandedIds.has(nodeId);
  const isSelected = selectFolders && selectedId === nodeId;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={(open) => toggleExpanded(nodeId, open)}
      disabled={disabled}
      data-slot="file-tree-folder"
      className="w-full"
    >
      <div
        role="treeitem"
        aria-expanded={isOpen}
        aria-selected={isSelected}
        aria-disabled={disabled || undefined}
        className={cn(fileTreeRowHighlightClass(isSelected), className)}
      >
        <CollapsibleTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={fileTreeRowContentClass(isSelected)}
            style={fileTreeRowPadding(depth, indent)}
            onClick={() => {
              if (selectFolders && !disabled) {
                setSelectedId(nodeId);
              }
            }}
          >
            <FileTreeChevron open={isOpen} />
            {showIcons && (
              <FileTreeIconSlot>
                {icon ?? <Folder className="size-4" />}
              </FileTreeIconSlot>
            )}
            <span className="truncate">{name}</span>
          </button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <FileTreeDepthContext.Provider value={depth + 1}>
          <div role="group">{children}</div>
        </FileTreeDepthContext.Provider>
      </CollapsibleContent>
    </Collapsible>
  );
}

function FileTreeFile({
  nodeId,
  name,
  icon,
  disabled,
  className,
}: {
  nodeId: string;
  name: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const { selectedId, setSelectedId, indent, showIcons } = useFileTree();
  const depth = useFileTreeDepth();
  const isSelected = selectedId === nodeId;

  return (
    <div
      role="treeitem"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-slot="file-tree-file"
      className={cn(fileTreeRowHighlightClass(isSelected), className)}
    >
      <button
        type="button"
        disabled={disabled}
        className={fileTreeRowContentClass(isSelected)}
        style={fileTreeRowPadding(depth, indent)}
        onClick={() => {
          if (disabled) return;
          setSelectedId(nodeId);
        }}
      >
        <span className="size-4 shrink-0" aria-hidden />
        {showIcons && (
          <FileTreeIconSlot>
            {icon ?? <File className="size-4" />}
          </FileTreeIconSlot>
        )}
        <span className="truncate">{name}</span>
      </button>
    </div>
  );
}

function FileTreeData({ nodes }: { nodes: FileTreeNode[] }) {
  return (
    <>
      {nodes.map((node) => (
        <FileTreeDataNode key={node.id} node={node} />
      ))}
    </>
  );
}

function FileTreeDataNode({ node }: { node: FileTreeNode }) {
  const isFolder = node.type === "folder" || (node.children?.length ?? 0) > 0;

  if (isFolder) {
    return (
      <FileTreeFolder
        nodeId={node.id}
        name={node.name}
        icon={node.icon}
        disabled={node.disabled}
      >
        {node.children?.map((child) => (
          <FileTreeDataNode key={child.id} node={child} />
        ))}
      </FileTreeFolder>
    );
  }

  return (
    <FileTreeFile
      nodeId={node.id}
      name={node.name}
      icon={node.icon}
      disabled={node.disabled}
    />
  );
}

function FileTree({
  className,
  ...props
}: React.ComponentProps<"div"> & {
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  onSelectedChange?: (id: string | null) => void;
  expandedIds?: Set<string> | string[];
  defaultExpandedIds?: string[];
  defaultExpandAll?: boolean;
  onExpandedChange?: (expandedIds: Set<string>) => void;
  indent?: number;
  showIcons?: boolean;
  selectFolders?: boolean;
  data?: FileTreeNode[];
}) {
  const { data, ...providerProps } = props;

  return (
    <div
      data-slot="file-tree"
      role="tree"
      className={cn(
        "flex w-full min-w-0 flex-col gap-px text-foreground",
        className,
      )}
    >
      <FileTreeProvider data={data} {...providerProps}>
        {props.children}
      </FileTreeProvider>
    </div>
  );
}

function FileTreeList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="file-tree-list"
      role="presentation"
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  );
}

export {
  FileTree,
  FileTreeList,
  FileTreeFolder,
  FileTreeFile,
  FileTreeProvider,
  useFileTree,
};
