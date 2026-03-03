"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import { mdiClipboardOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

interface InstallationCodeBlockProps {
  registryUrl: string;
  /** Telemetry: component/block name (e.g. "button"). */
  componentName?: string;
}

export default function InstallationCodeBlock({
  registryUrl,
  componentName,
}: InstallationCodeBlockProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("pnpm");

  const npxCommand = `npx shadcn@latest add ${registryUrl}`;
  const pnpmCommand = `pnpm dlx shadcn@latest add ${registryUrl}`;
  const yarnCommand = `yarn shadcn@latest add ${registryUrl}`;
  const bunCommand = `bunx --bun shadcn@latest add ${registryUrl}`;

  const commands: Record<string, string> = {
    pnpm: pnpmCommand,
    npm: npxCommand,
    yarn: yarnCommand,
    bun: bunCommand,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(commands[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      const payload: Record<string, unknown> = {
        section: "installation",
        package_manager: activeTab,
      };
      if (componentName && pathname) {
        if (pathname.startsWith("/primitives/")) {
          payload.component_name = componentName;
        } else if (pathname.startsWith("/bloks/")) {
          payload.block_name = componentName;
        }
      }
      track(TELEMETRY_EVENTS.copy_code, payload);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const payload: Record<string, unknown> = { package_manager: value };
    if (componentName && pathname) {
      if (pathname.startsWith("/primitives/")) {
        payload.component_name = componentName;
      } else if (pathname.startsWith("/bloks/")) {
        payload.block_name = componentName;
      }
    }
    track(TELEMETRY_EVENTS.installation_tab_switch, payload);
  };

  return (
    <div dir="ltr" className="rounded-lg bg-subtle-bg p-4">
      <Tabs defaultValue="pnpm" onValueChange={handleTabChange}>
        <div className="flex items-center justify-between">
          <TabsList variant="soft-rounded">
            <TabsTrigger
              variant="soft-rounded"
              className="rounded-md"
              value="pnpm"
            >
              pnpm
            </TabsTrigger>
            <TabsTrigger
              variant="soft-rounded"
              className="rounded-md"
              value="npm"
            >
              npm
            </TabsTrigger>
            <TabsTrigger
              variant="soft-rounded"
              className="rounded-md"
              value="yarn"
            >
              yarn
            </TabsTrigger>
            <TabsTrigger
              variant="soft-rounded"
              className="rounded-md"
              value="bun"
            >
              bun
            </TabsTrigger>
          </TabsList>

          <Button
            onClick={copyToClipboard}
            variant="ghost"
            size="icon-sm"
            aria-label={
              copied ? "Code copied to clipboard" : "Copy code to clipboard"
            }
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Icon
                className="text-muted-foreground"
                path={mdiClipboardOutline}
                size={0.8}
              />
            )}
          </Button>
        </div>

        <TabsContent value="pnpm" className="mt-2 mb-0 pb-2">
          <code className="font-mono text-md text-body-text pl-1 wrap-break-words">
            {pnpmCommand}
          </code>
        </TabsContent>
        <TabsContent value="npm" className="mt-2 mb-0 pb-2">
          <code className="font-mono text-md text-body-text pl-1 wrap-break-words">
            {npxCommand}
          </code>
        </TabsContent>
        <TabsContent value="yarn" className="mt-2 mb-0 pb-2">
          <code className="font-mono text-md text-body-text pl-1 wrap-break-words">
            {yarnCommand}
          </code>
        </TabsContent>
        <TabsContent value="bun" className="mt-2 mb-0 pb-2">
          <code className="font-mono text-md text-body-text pl-1 wrap-break-words">
            {bunCommand}
          </code>
        </TabsContent>
      </Tabs>
    </div>
  );
}
