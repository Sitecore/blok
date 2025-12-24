"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { mdiClipboardOutline } from "@mdi/js";
import Icon from "@mdi/react";

interface InstallationCodeBlockProps {
    registryUrl: string;
}

export default function InstallationCodeBlock({ registryUrl }: InstallationCodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("pnpm")
    
    const npxCommand = `npx shadcn@latest add ${registryUrl}`;
    const pnpmCommand = `pnpm dlx shadcn@latest add ${registryUrl}`;
    const yarnCommand = `yarn shadcn@latest add ${registryUrl}`;
    const bunCommand = `bunx --bun shadcn@latest add ${registryUrl}`;

    const commands: Record<string, string> = {
        pnpm: pnpmCommand,
        npm: npxCommand,
        yarn: yarnCommand,
        bun: bunCommand,
    }

    const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(commands[activeTab])
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch (err) {
          console.error("Failed to copy text: ", err)
        }
    }

    return (
        <div dir="ltr" className="rounded-lg bg-subtle-bg p-4">
            <Tabs defaultValue="pnpm" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                    <TabsList variant="soft-rounded">
                        <TabsTrigger variant="soft-rounded" className="rounded-md" value="pnpm">pnpm</TabsTrigger>
                        <TabsTrigger variant="soft-rounded" className="rounded-md" value="npm">npm</TabsTrigger>
                        <TabsTrigger variant="soft-rounded" className="rounded-md" value="yarn">yarn</TabsTrigger>
                        <TabsTrigger variant="soft-rounded" className="rounded-md" value="bun">bun</TabsTrigger>
                    </TabsList>

                    <Button
                        onClick={copyToClipboard}
                        variant="ghost"
                        size="icon-sm"
                        aria-label={copied ? "Code copied to clipboard" : "Copy code to clipboard"}
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
                    <code className="font-mono text-md text-body-text pl-1 wrap-break-words">{pnpmCommand}</code>
                </TabsContent>
                <TabsContent value="npm" className="mt-2 mb-0 pb-2">
                    <code className="font-mono text-md text-body-text pl-1 wrap-break-words">{npxCommand}</code>
                </TabsContent>
                <TabsContent value="yarn" className="mt-2 mb-0 pb-2">
                    <code className="font-mono text-md text-body-text pl-1 wrap-break-words">{yarnCommand}</code>
                </TabsContent>
                <TabsContent value="bun" className="mt-2 mb-0 pb-2">
                    <code className="font-mono text-md text-body-text pl-1 wrap-break-words">{bunCommand}</code>
                </TabsContent>
            </Tabs>
        </div>
    )
}