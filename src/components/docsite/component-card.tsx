"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { OpenInV0Button } from "@/components/docsite/open-in-v0";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Component } from "@/lib/registry";
import InstallationCodeBlock from "./installation-code-block";

interface ComponentCardProps {
  component: Component;
  baseUrl: string;
  prompt: string;
}

export function ComponentCard({
  component,
  baseUrl,
  prompt,
}: ComponentCardProps) {
  const [copied, setCopied] = useState(false);

  const registryUrl = `https://${baseUrl}/r/${component.name}.json`;

  const npxCommand = `npx shadcn@latest add ${registryUrl}`;
  const pnpmCommand = `pnpm dlx shadcn@latest add ${registryUrl}`;
  const yarnCommand = `yarn shadcn@latest add ${registryUrl}`;
  const bunCommand = `bunx --bun shadcn@latest add ${registryUrl}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(npxCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <section>
      <div id="starting-kit">
        <div className="h-[800px] w-full overflow-hidden">
          <iframe
            id="iframe"
            src={`/demo/${component.name}`}
            className="h-full w-full"
            title="Page Preview"
          />
        </div>
      </div>
    </section>
  );
}
