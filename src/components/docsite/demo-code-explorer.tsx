"use client";

import { CodeBlock, type CopyCodeContext } from "@/components/code-block";
import { FileTree } from "@/components/ui/file-tree";
import {
  type LoadedDemoCodeFile,
  collectFolderIdsFromTree,
  defaultSelectedCodeFileId,
  demoCodeFilesToTree,
} from "@/lib/docsite/demo-code-files";
import { cn } from "@/lib/utils";
import { FileCode2 } from "lucide-react";
import * as React from "react";

interface DemoCodeExplorerProps {
  files: LoadedDemoCodeFile[];
  className?: string;
  copyCodeContext?: CopyCodeContext;
}

const explorerHeaderClass =
  "flex h-11 min-h-11 shrink-0 items-center gap-2 border-b bg-muted px-3";

export function DemoCodeExplorer({
  files,
  className,
  copyCodeContext,
}: DemoCodeExplorerProps) {
  const treeData = React.useMemo(() => demoCodeFilesToTree(files), [files]);
  const filesById = React.useMemo(
    () => new Map(files.map((file) => [file.id, file])),
    [files],
  );

  const [selectedId, setSelectedId] = React.useState<string | null>(() =>
    defaultSelectedCodeFileId(files),
  );

  React.useEffect(() => {
    setSelectedId(defaultSelectedCodeFileId(files));
  }, [files]);

  const selected = selectedId ? filesById.get(selectedId) : undefined;
  const expandedIds = React.useMemo(
    () => collectFolderIdsFromTree(treeData),
    [treeData],
  );

  return (
    <div
      className={cn(
        "flex min-h-[420px] w-full overflow-hidden rounded-b-md border-t bg-background",
        className,
      )}
    >
      <aside className="flex w-[240px] shrink-0 flex-col border-r bg-muted">
        <div className={explorerHeaderClass}>
          <p className="text-sm font-medium leading-none text-foreground">
            Files
          </p>
        </div>
        <div className="scrollbar-themed flex-1 overflow-auto py-1">
          <FileTree
            data={treeData}
            selectedId={selectedId}
            onSelectedChange={setSelectedId}
            defaultExpandedIds={expandedIds}
            className="w-full"
          />
        </div>
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-muted">
        <div className={explorerHeaderClass}>
          {selected ? (
            <>
              <FileCode2 className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate font-mono text-xs leading-none">
                {selected.id}
              </span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground">Select a file</span>
          )}
        </div>
        {selected ? (
          <div className="min-h-0 overflow-hidden">
            <CodeBlock
              code={selected.code}
              lang={selected.language}
              className="max-h-[400px] rounded-none border-0"
              copyCodeContext={copyCodeContext}
            />
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-muted-foreground">
            Select a file
          </div>
        )}
      </div>
    </div>
  );
}
