"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block";
import { RefreshCcw } from "lucide-react";
import { AvatarExample } from "./avatar-example";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";

type AvatarVariant = "default" | "fallback-only" | "size" | "rounded" | "group" | "group-interactive";

type DemoObject = {
  title: string;
  description: string;
  type: AvatarVariant;
  options: Record<string, { label: string; value: string; className?: string; src?: string; alt?: string; fallback?: string }[]>;
};

type AvatarDemoProps = {
  selectedDemo?: DemoObject;
};

export const AvatarDemo: FC<AvatarDemoProps> = ({ selectedDemo }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!selectedDemo) return {};
    const initialSelections: Record<string, { label: string; value: string; className?: string; src?: string; alt?: string; fallback?: string }> = {};
    Object.entries(selectedDemo.options).forEach(([key, list]) => {
      if (list.length > 0) {
        initialSelections[key] = list[0]; // Set the first item as default
      }
    });
    return initialSelections;
  });

  // Build code snippet dynamically
  const getCodeSnippet = () => {
    const baseCode = `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"

export function AvatarExample() {
  return (`;

    let componentCode = "";
    
    if (selectedOptions.variantList?.value === "group" || selectedOptions.variantList?.value === "group-interactive") {
      const groupClasses = selectedOptions.variantList.value === "group-interactive" 
        ? "*:data-[slot=avatar]:ring-background flex -space-x-2 hover:space-x-1 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out"
        : "*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale";
      
      componentCode = `
    <div className="${groupClasses}">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>`;
    } else {
      const className = selectedOptions.sizeList?.className || selectedOptions.roundingList?.className || "";
      const classNameAttr = className ? ` className="${className}"` : "";
      const imageCode = selectedOptions.variantList?.value !== "fallback-only" ? `
      <AvatarImage src="${selectedOptions.variantList?.src || "https://github.com/shadcn.png"}" alt="${selectedOptions.variantList?.alt || "@shadcn"}" />` : "";
      const fallback = selectedOptions.variantList?.fallback || "CN";
      
      componentCode = `
    <Avatar${classNameAttr}>${imageCode}
      <AvatarFallback>${fallback}</AvatarFallback>
    </Avatar>`;
    }

    return (baseCode + componentCode + `
  )
}`).split("\n").filter(line => line.trim() !== "").join("\n");
  };

  const codeSnippet = getCodeSnippet();

  const installationCode = [
    {
      language: "tsx",
      filename: "avatar-example.tsx",
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
          <AvatarExample
            variant={selectedOptions.variantList?.value as AvatarVariant || "default"}
            src={selectedOptions.variantList?.value === "fallback-only" ? undefined : (selectedOptions.variantList?.src || "https://github.com/shadcn.png")}
            alt={selectedOptions.variantList?.value === "fallback-only" ? undefined : (selectedOptions.variantList?.alt || "@shadcn")}
            fallback={selectedOptions.variantList?.fallback || "CN"}
            className={selectedOptions.sizeList?.className || selectedOptions.roundingList?.className || ""}
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
