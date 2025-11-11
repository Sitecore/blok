import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/registry/component-card";
import { Button } from "@/components/ui/button";
import { getRegistryItem, getRegistryItems } from "@/lib/registry";
import { getPrompt } from "@/lib/utils";

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

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
          <h2 className="font-bold text-3xl tracking-tight break-words">
            {component.title}
          </h2>
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
