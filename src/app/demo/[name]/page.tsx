import { notFound } from "next/navigation";
import React, { ComponentType } from "react";
import { demos } from "@/app/demo/[name]/index";
import { Renderer } from "@/app/demo/[name]/renderer";
import InstallationCodeBlock from "@/components/docsite/installation-code-block";
import { ReactNode } from "react";
import DemoTab from "@/components/demo-tab";
import { CodeBlock } from "@/components/code-block";
import { docsiteRegistry } from "@/lib/docsite/docsite-registry";
import { loadFromRegistry } from "@/lib/docsite/load-from-registry";

export const dynamicParams = false;

export async function generateStaticParams() {
  return Object.keys(demos).map((name) => ({ name }));
}

const baseUrl = process.env.NEXT_PUBLIC_REGISTRY_URL ?? "";

export default async function DemoPage({
  params,
}: { 
  params: Promise<{ name: string }> 
}) {
  const { name } = await params;

  const demo = demos[name];
  if (!demo) notFound();

  const { 
    preview, 
    installation, 
    usage, 
    components 
  } = demo;

  const registryUrl = `https://${baseUrl}/r/${name}.json`;

  // Default component
  const defaultEntry = await loadFromRegistry(
    preview.defaultComponent as keyof typeof docsiteRegistry
  );

  if (!defaultEntry) notFound();

  // Examples
  const exampleSections = components
    ? await Promise.all(
        Object.entries(components).map(async ([title, component]) => {
          const entry = await loadFromRegistry(
            component.component as keyof typeof docsiteRegistry
          );

          if (!entry) return null;

          return (
            <div key={title} id={component.component as string} className="flex flex-col gap-6">
              <h3 className="font-semibold text-xl">{title}</h3>
              {component.pre}
              <DemoTab
                code={entry.code}
                component={componentDemo(React.createElement(entry.Component as ComponentType<any>))}
              />
              {component.post}
            </div>
          );
        })
      )
    : null;

  return (
    <div className="flex min-h-screen w-full flex-col gap-12 bg-body-bg">  
      {/* Preview */}
      {preview.pre}
      <DemoTab
        key={name}
        id="preview"
        code={defaultEntry.code}
        component={componentDemo(React.createElement(defaultEntry.Component as ComponentType<any>))}
      />
      {preview.post}

      {/* Installation */}
      <div id="installation" className="flex flex-col gap-3">
        <h2 className="font-semibold text-3xl">Installation</h2>
        {installation?.pre}
        <InstallationCodeBlock registryUrl={registryUrl} />
        {installation?.post}
      </div>

      {/* Usage */}
      {usage && (
        <div id="usage" className="flex flex-col gap-3">
          <h2 className="font-semibold text-3xl">Usage</h2>
          {usage.pre}
          {usage.usage.map((code: string, index: number) => (
            <CodeBlock key={index} code={code} />
          ))}
          {usage.post}
        </div>
      )}
  
      {/* Examples */}
      {exampleSections && (
        <div id="examples" className="flex flex-col gap-9">
          <div className="flex flex-col gap-6">
            <h2 className="font-semibold text-3xl">Examples</h2>
            <p className="text-sm text-muted-foreground">
              The following are examples of our {name} components.
            </p>
          </div>
          {exampleSections}
        </div>
      )}
    </div>
  );
}

const componentDemo = (component: ReactNode) => {
  return (
      <div className="relative rounded-lg">
          <Renderer>{component}</Renderer>
      </div>
  );
}