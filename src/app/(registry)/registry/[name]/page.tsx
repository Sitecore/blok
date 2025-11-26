import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/docsite/component-card";
import { Button } from "@/components/ui/button";
import { getRegistryItem, getRegistryItems } from "@/lib/registry";
import { getPrompt } from "@/lib/utils";
import { demos } from "@/app/demo/[name]/index";
import { Renderer } from "@/app/demo/[name]/renderer";
import InstallationCodeBlock from "@/components/docsite/installation-code-block";
import { Codeblocks } from "@/components/docsite/code-block";

export async function generateStaticParams() {
  const components = getRegistryItems();

  return components.map(({ name }) => ({
    name,
  }));
}

export default async function RegistryItemPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const component = getRegistryItem(name);

  if (!component) {
    notFound();
  }

  const demoData = demos[name];
  const registryUrl = `https://${process.env.NEXT_PUBLIC_REGISTRY_URL ?? ""}/r/${name}.json`;

  return (
    <div className="w-full bg-body-bg px-5 pb-10 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          {/* <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button> */}

          <div className="py-10 flex flex-col gap-6">
            <h2 className="font-semibold text-5xl tracking-tight">
              {component.title}
            </h2>
            <p className="text-lg text-subtle-text">{component.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {/* Preview Section */}
        <div id="preview" className="flex flex-col">
          <div className="relative rounded-lg overflow-hidden min-h-[200px] p-8 bg-subtle-bg flex items-center justify-center">
            {demoData && <Renderer>{demoData.defaultComponent}</Renderer>}
          </div>
        </div>

        {/* Installation Section */}
        <div id="installation" className="flex flex-col gap-3">
          <h2 className="font-semibold text-3xl tracking-tight">Installation</h2>
          <InstallationCodeBlock registryUrl={registryUrl} />
        </div>

        {/* Usage Section */}
        {demoData?.usage && (
          <div id="usage" className="flex flex-col gap-3">
            <h2 className="font-semibold text-3xl tracking-tight">Usage</h2>
            {demoData.usage.map((code: string, index: number) => (
              <Codeblocks key={index} variant="filled" code={code} showLineNumbers={false} />
            ))}
          </div>
        )}

        {/* Examples Section */}
        {demoData?.components && (
          <div id="examples" className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-3xl tracking-tight">Examples</h2>
              <p className="text-sm text-muted-foreground">The following are examples of our {name} classes.</p>
            </div>

            {Object.entries(demoData.components).map(([key, node], index: number) => {
              // Convert key to kebab-case for ID (e.g., "Color scheme" -> "color-scheme")
              const sectionId = key.toLowerCase().replace(/\s+/g, '-');
              return (
                <div key={index} id={sectionId} className="flex flex-col gap-6">
                  <h3 className="font-semibold text-xl tracking-tight">{key}</h3>
                  <div className="relative rounded-lg overflow-hidden min-h-[200px] p-8 bg-subtle-bg flex items-center justify-center">
                    <Renderer>{node}</Renderer>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
