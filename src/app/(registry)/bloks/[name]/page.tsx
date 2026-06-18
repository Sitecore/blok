import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/docsite/component-card";

import { getBlocks, getRegistryItem } from "@/lib/registry";

export const dynamicParams = false;

export async function generateStaticParams() {
  const blocks = getBlocks();

  return blocks.map(({ name }) => ({
    name,
  }));
}

export default async function BlokItemPage({
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
    <div className="mx-auto w-full min-w-0 max-w-[1250px] overflow-x-hidden bg-body-bg px-5 pb-10 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="py-10 flex flex-col gap-6">
            <h1 className="font-semibold text-4xl wrap-break-words">
              {component.title}
            </h1>
            <p className="text-lg text-subtle-text wrap-break-words">
              {component.description}
            </p>
          </div>
        </div>
      </div>
      <ComponentCard component={component} />
    </div>
  );
}
