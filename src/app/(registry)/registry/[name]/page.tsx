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
    <div className="w-full max-w-[1250px] mx-auto bg-body-bg pb-10 px-5 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          {/* <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button> */}

          <div className="py-10 flex flex-col gap-6">
            <h2 className="font-semibold text-4xl">
              {component.title}
            </h2>
            <p className="text-lg text-subtle-text">{component.description}</p>
          </div>
        </div>
      </div>
      <ComponentCard
        component={component}
        baseUrl={process.env.NEXT_PUBLIC_REGISTRY_URL ?? ""}
        prompt={getPrompt()}
      />
    </div>
  );
}
