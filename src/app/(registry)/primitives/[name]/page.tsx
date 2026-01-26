import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/docsite/component-card";

import { getComponents, getRegistryItem } from "@/lib/registry";

export const dynamicParams = false;

export async function generateStaticParams() {
  const components = getComponents();

  return components.map(({ name }) => ({
    name,
  }));
}

export default async function PrimitiveItemPage({
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
    <div className="w-full max-w-[1250px] mx-auto bg-body-bg pb-10 px-5 md:px-10">
      <div className="flex items-center justify-between">
        <div>
          <div className="py-10 flex flex-col gap-6">
            <h2 className="font-semibold text-4xl wrap-break-words">
              {component.title}
            </h2>
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
