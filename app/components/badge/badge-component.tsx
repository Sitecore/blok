"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block";
import { RefreshCcw } from "lucide-react";
import { BadgeExample } from "./badge-example";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";

type BadgeVariant = "default" | "bold";
type BadgeSize = "sm" | "md" | "lg";
type BadgeColorScheme = "neutral" | "primary" | "danger" | "success" | "warning" | "yellow" | "teal" | "cyan" | "blue" | "pink";

type DemoObject = {
  title: string;
  description: string;
  type: BadgeVariant;
  options: Record<string, { label: string; value: string; badgeText?: string }[]>;
};

type BadgeDemoProps = {
  selectedDemo?: DemoObject;
};

export const BadgeDemo: FC<BadgeDemoProps> = ({ selectedDemo }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!selectedDemo) return {};
    const initialSelections: Record<string, { label: string; value: string; badgeText?: string }> = {};
    Object.entries(selectedDemo.options).forEach(([key, list]) => {
      if (list.length > 0) {
        initialSelections[key] = list[0]; // Set the first item as default
      }
    });
    return initialSelections;
  });

  // Build code snippet dynamically
  const codeSnippet = `
import { Badge } from "@/registry/new-york/ui/badge"

export function BadgeExample() {
  return (
    <Badge variant="${selectedOptions.variantList?.value || "default"}" size="${selectedOptions.sizeList?.value || "md"}" colorScheme="${selectedOptions.colorList?.value || "neutral"}">
      ${selectedOptions.variantList?.badgeText || "Badge"}
    </Badge>
  )
}`.split("\n").filter(line => line.trim() !== "").join("\n");

  const installationCode = [
    {
      language: "tsx",
      filename: "badge-example.tsx",
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
          <BadgeExample
            variant={(selectedOptions.variantList?.value as BadgeVariant) || "default"}
            size={(selectedOptions.sizeList?.value as BadgeSize) || "md"}
            colorScheme={(selectedOptions.colorList?.value as BadgeColorScheme) || "neutral"}
            showIcon={false}
            showLink={false}
            text={selectedOptions.variantList?.badgeText || "Badge"}
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
