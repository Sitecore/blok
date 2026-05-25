"use client";

import { CodeBlock, type CopyCodeContext } from "@/components/code-block";
import { DemoCodeExplorer } from "@/components/docsite/demo-code-explorer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { LoadedDemoCodeFile } from "@/lib/docsite/demo-code-files";
import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import { usePathname } from "next/navigation";
import { type ReactNode, useCallback, useRef } from "react";

const PREVIEW_INTERACTION_THROTTLE_MS = 3000;

interface DemoTabProps {
  id?: string;
  code: string;
  /** When multiple entries are provided (bloks), the Code tab shows a file tree + editor. */
  codeFiles?: LoadedDemoCodeFile[];
  component: ReactNode;
  defaultTab?: "preview" | "code";
  /** Telemetry: component/block name (e.g. "button"). */
  componentName?: string;
  /** Telemetry: "main" | "examples". */
  section?: "main" | "examples";
  /** Telemetry: example id (e.g. "ButtonVariant"). */
  exampleId?: string;
  /** Telemetry: example title. */
  exampleTitle?: string;
}

export default function DemoTab({
  id,
  code,
  codeFiles,
  component,
  defaultTab = "preview",
  componentName,
  section = "main",
  exampleId,
  exampleTitle,
}: DemoTabProps) {
  const pathname = usePathname();
  const lastPreviewInteractionBySectionRef = useRef<Record<string, number>>({});

  const handlePreviewInteraction = useCallback(
    (interactionType: "click" | "focus") => {
      if (!componentName) return;
      const now = Date.now();
      const throttleKey =
        section === "examples" ? (exampleId ?? "examples") : "main";
      const last = lastPreviewInteractionBySectionRef.current[throttleKey] ?? 0;
      if (now - last < PREVIEW_INTERACTION_THROTTLE_MS) return;
      lastPreviewInteractionBySectionRef.current[throttleKey] = now;

      const payload: Record<string, unknown> = {
        section,
        interaction_type: interactionType,
        ...(section === "examples" && {
          example_id: exampleId,
          example_title: exampleTitle,
        }),
      };
      if (pathname) {
        if (pathname.startsWith("/primitives/")) {
          payload.component_name = componentName;
        } else if (pathname.startsWith("/bloks/")) {
          payload.block_name = componentName;
        }
      }
      track(TELEMETRY_EVENTS.preview_interaction, payload);
    },
    [componentName, section, exampleId, exampleTitle, pathname],
  );

  const copyCodeContext: CopyCodeContext | undefined = componentName
    ? {
        section: section === "examples" ? "examples" : "preview",
        page_name: componentName,
        ...(section === "examples" && {
          example_id: exampleId,
          example_title: exampleTitle,
        }),
      }
    : undefined;

  const handleTabChange = (value: string) => {
    if (value !== "preview" && value !== "code") return;
    const payload: Record<string, unknown> = {
      tab: value,
      section,
      ...(section === "examples" && {
        example_id: exampleId,
        example_title: exampleTitle,
      }),
    };
    if (componentName && pathname) {
      if (pathname.startsWith("/primitives/")) {
        payload.component_name = componentName;
      } else if (pathname.startsWith("/bloks/")) {
        payload.block_name = componentName;
      }
    }
    track(TELEMETRY_EVENTS.demo_tab_switch, payload);
  };

  return (
    <Tabs
      id={id}
      defaultValue={defaultTab}
      className="gap-0"
      onValueChange={handleTabChange}
    >
      <TabsList className="w-full rounded-none justify-start">
        <TabsTrigger value="preview" className="border-b">
          Preview
        </TabsTrigger>
        <TabsTrigger value="code" className="border-b">
          Code
        </TabsTrigger>
        <TabsTrigger
          value=""
          className="w-full pointer-events-none border-b"
          aria-hidden="true"
          tabIndex={-1}
        />
      </TabsList>
      <TabsContent
        value="preview"
        className="min-h-[200px] p-8 bg-subtle-bg flex items-center justify-center rounded-b-md"
      >
        <div
          className="min-h-[200px] w-full flex items-center justify-center"
          onClick={() => handlePreviewInteraction("click")}
          onFocusCapture={() => handlePreviewInteraction("focus")}
          role="presentation"
        >
          {component}
        </div>
      </TabsContent>

      <TabsContent
        value="code"
        dir="ltr"
        className="min-h-[200px] rounded-b-md p-0"
      >
        {codeFiles && codeFiles.length > 0 ? (
          <DemoCodeExplorer
            files={codeFiles}
            copyCodeContext={copyCodeContext}
          />
        ) : (
          <CodeBlock
            code={code}
            className="rounded-t-none rounded-b-md"
            copyCodeContext={copyCodeContext}
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
