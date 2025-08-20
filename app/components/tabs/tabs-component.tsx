"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block";
import { RefreshCcw } from "lucide-react";
import { TabsExample } from "./tabs-example";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";

type TabsVariant = "line" | "soft-rounded";
type TabsStyle = "default" | "with-icons" | "content";

type DemoObject = {
  title: string;
  description: string;
  type: TabsVariant;
  options: Record<string, { label: string; value: string; tabsContent?: string }[]>;
};

type TabsDemoProps = {
  selectedDemo?: DemoObject;
};

export const TabsDemo: FC<TabsDemoProps> = ({ selectedDemo }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!selectedDemo) return {};
    const initialSelections: Record<string, { label: string; value: string; tabsContent?: string }> = {};
    Object.entries(selectedDemo.options).forEach(([key, list]) => {
      if (list.length > 0) {
        initialSelections[key] = list[0]; // Set the first item as default
      }
    });
    return initialSelections;
  });

  // Build code snippet dynamically
  const codeSnippet = `
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/new-york/ui/tabs"

export function TabsExample() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList variant="${selectedOptions.variantList?.value || "line"}">
        <TabsTrigger value="tab1" variant="${selectedOptions.variantList?.value || "line"}">
          ${selectedOptions.variantList?.tabsContent || "Tab 1"}
        </TabsTrigger>
        <TabsTrigger value="tab2" variant="${selectedOptions.variantList?.value || "line"}">
          ${selectedOptions.variantList?.tabsContent || "Tab 2"}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">Content for Tab 2</TabsContent>
    </Tabs>
  )
}`.split("\n").filter(line => line.trim() !== "").join("\n");

  const installationCode = [
    {
      language: "tsx",
      filename: "tabs-example.tsx",
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
          <TabsExample
            variant={(selectedOptions.variantList?.value as TabsVariant) || "line"}
            style={(selectedOptions.styleList?.value as TabsStyle) || "default"}
            tabsContent={selectedOptions.variantList?.tabsContent || "Tab 1"}
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
