"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block";
import { RefreshCcw } from "lucide-react";
import { SkeletonExample } from "./skeleton-example";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";

type SkeletonVariant = "avatar" | "text" | "card" | "mixed";

type DemoObject = {
  title: string;
  description: string;
  type: SkeletonVariant;
  options: Record<string, { label: string; value: string; skeletonConfig?: any }[]>;
};

type SkeletonDemoProps = {
  selectedDemo?: DemoObject;
};

export const SkeletonDemo: FC<SkeletonDemoProps> = ({ selectedDemo }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!selectedDemo) return {};
    const initialSelections: Record<string, { label: string; value: string; skeletonConfig?: any }> = {};
    Object.entries(selectedDemo.options).forEach(([key, list]) => {
      if (list.length > 0) {
        initialSelections[key] = list[0]; // Set the first item as default
      }
    });
    return initialSelections;
  });

  // Build code snippet dynamically
  const codeSnippet = `
import { Skeleton } from "@/registry/new-york/ui/skeleton"

export function SkeletonExample() {
  return (
    <div className="flex w-full flex-wrap items-start gap-4">
      ${selectedOptions.variantList?.skeletonConfig?.code || `<div className="flex items-center gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>`}
    </div>
  )
}`.split("\n").filter(line => line.trim() !== "").join("\n");

  const installationCode = [
    {
      language: "tsx",
      filename: "skeleton-example.tsx",
      code: codeSnippet,
    },
  ];

  if (!selectedDemo) return <div></div>;

  return (
    <div>
      {/* Show title only once */}
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl font-semibold">
          {selectedDemo.title}
        </h1>
      </div>
      
      <div className="flex gap-1 items-end">
        {Object.entries(selectedDemo.options).map(([key, list]) => (
          <div key={key} className="p-2 pl-0">
            <div className="rounded-md">
              <Select
                key={selectedOptions[key]?.value ?? "reset"}
                value={selectedOptions[key]?.value ?? undefined}
                onValueChange={(value) => {
                  const selected = list.find(opt => opt.value === value);
                  if (selected) {
                    setSelectedOptions(prev => ({ ...prev, [key]: selected }));
                  }
                }}
              >
                <SelectTrigger className="bg-secondary border border-gray-200 text-black [&>svg]:text-black">
                  <SelectValue placeholder={`Select ${key.replace("List", "")}`} className="[&>span]:text-black" />
                </SelectTrigger>
                <SelectContent className="bg-secondary">
                  {list.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="text-black">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
        <button
          onClick={() => setSelectedOptions({})}
          className="w-9 h-9 flex items-center justify-center rounded-md bg-secondary border border-gray-200 text-black [&>svg]:text-black mb-2"
          title="Reset selections"
        >
          <RefreshCcw size={16} className="text-black" />
        </button>
      </div>
      
      <div>
        <div className="bg-white p-25 flex items-center justify-center rounded-t-md">
          <SkeletonExample
            variant={(selectedOptions.variantList?.value as SkeletonVariant) || "avatar"}
          />
        </div>
        <CustomCodeBlock
          containerClassNames="!rounded-t-none"
          bodyClassNames="bg-gray-100"
          code={installationCode}
          defaultValue="tsx"
          lineNumbers
        />
      </div>
    </div>
  );
};
