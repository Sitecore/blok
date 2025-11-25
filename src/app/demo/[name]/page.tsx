import { notFound } from "next/navigation";
import { demos } from "@/app/demo/[name]/index";
import { Renderer } from "@/app/demo/[name]/renderer";
import InstallationCodeBlock from "@/components/docsite/installation-code-block";
import { Codeblocks } from "@/components/docsite/code-block";
import { ReactNode } from "react";
import DemoTab from "@/components/demo-tab";

export async function generateStaticParams() {
  return Object.keys(demos).map((name) => ({
    name,
  }));
}

const baseUrl = process.env.NEXT_PUBLIC_REGISTRY_URL ?? "";

export default async function DemoPage({
  params,
}: { 
  params: Promise<{ name: string }> 
}) {
  const { name } = await params;

  const { defaultComponent, usage, components } = demos[name];
  if (!demos[name]) {
    notFound();
  }

  const registryUrl = `https://${baseUrl}/r/${name}.json`;

  let codeMap: Record<string, string> = {};
  try {
    codeMap = await import(`@/app/content/ui/${name}.json`) as unknown as Record<string, string>;
  } catch (error) {
    codeMap = {};
  }

  return (
      <div className="flex min-h-[100vh] w-full flex-col gap-12 bg-body-bg">
        <div className="flex flex-col">
          <div className="relative rounded-lg overflow-hidden min-h-[200px] p-8 bg-subtle-bg flex items-center justify-center">
            <Renderer>{defaultComponent}</Renderer>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-3xl tracking-tight">Installation</h2>
          <InstallationCodeBlock registryUrl={registryUrl} />
        </div>

        {usage && (
          <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-3xl tracking-tight">Usage</h2>
            {usage.map((code: string, index: number) => (
              <Codeblocks key={index} variant="filled" code={code} showLineNumbers={false} />
            ))}
          </div>
        )}
        
        {components && (
          <div className="flex flex-col gap-9">
            <div className="flex flex-col gap-6">
              <h2 className="font-semibold text-3xl tracking-tight">Examples</h2>
              <p className="text-sm text-muted-foreground">The following are examples of our {name} classes.</p>
            </div>

            {components &&
              Object.entries(components).map(([key, node], index: number) => {
                return (
                  <div key={index} className="flex flex-col gap-6">
                    <h3 className="font-semibold text-xl tracking-tight">{key}</h3>
                    <DemoTab
                      key={key} 
                      code={codeMap[key] ?? ""} 
                      component={componentDemo(node)} 
                    />
                  </div>
                );
            })}
          </div>
        )}
      </div>
  );
}

const componentDemo = (component: ReactNode) => {
  return (
      <div className="relative rounded-lg overflow-hidden">
          <Renderer>{component}</Renderer>
      </div>
  );
}