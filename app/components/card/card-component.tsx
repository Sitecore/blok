"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block";
import { RefreshCcw } from "lucide-react";
import { CardExample } from "./card-example";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";

type CardElevation = "none" | "xs" | "sm" | "base" | "md" | "lg";
type CardStyle = "flat" | "outline" | "filled";
type CardPadding = "sm" | "md" | "lg";

type DemoObject = {
  title: string;
  description: string;
  type: string;
  options: Record<string, { label: string; value: string; className?: string }[]>;
};

type CardDemoProps = {
  selectedDemo?: DemoObject;
};

export const CardDemo: FC<CardDemoProps> = ({ selectedDemo }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!selectedDemo) return {};
    const initialSelections: Record<string, { label: string; value: string; className?: string }> = {};
    Object.entries(selectedDemo.options).forEach(([key, list]) => {
      if (list.length > 0) {
        initialSelections[key] = list[0]; // Set the first item as default
      }
    });
    return initialSelections;
  });

  // Build code snippet dynamically
  const getCodeSnippet = () => {
    const baseCode = `import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export function CardExample() {
  return (
    <Card
      style="${selectedOptions.styleList?.value || "outline"}"
      elevation="${selectedOptions.elevationList?.value || "base"}"
      padding="${selectedOptions.paddingList?.value || "lg"}"
      className="w-[400px]"
    >
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Style: ${selectedOptions.styleList?.value || "outline"}, Elevation: ${selectedOptions.elevationList?.value || "base"}, Padding: ${selectedOptions.paddingList?.value || "lg"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card demonstrates the ${selectedOptions.styleList?.value || "outline"} style with ${selectedOptions.elevationList?.value || "base"} elevation and ${selectedOptions.paddingList?.value || "lg"} padding.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Action</Button>
      </CardFooter>
    </Card>
  )
}`;

    return baseCode.split("\n").filter(line => line.trim() !== "").join("\n");
  };

  const codeSnippet = getCodeSnippet();

  const installationCode = [
    {
      language: "tsx",
      filename: "card-example.tsx",
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
          <CardExample
            variant="elevation"
            style={selectedOptions.styleList?.value as CardStyle || "outline"}
            elevation={selectedOptions.elevationList?.value as CardElevation || "base"}
            padding={selectedOptions.paddingList?.value as CardPadding || "lg"}
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
