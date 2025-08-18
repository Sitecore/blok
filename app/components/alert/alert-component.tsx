"use client";
import React, { FC, useState } from "react";
// import CommandSnippet from "@/components/ui/commandSnippet";
import CustomCodeBlock from "@/components/code-block"
import { RefreshCcw } from "lucide-react";

type AlertVariant = "success" | "warning" | "primary" | "default" | "danger";


type DemoObject = {
  title: string;
  description: string;
  type: AlertVariant;
  options: Record<string, { label: string; value: string, alertTitle?: string, alertDescription?: string }[]>
};

type AlertDemoProps = {
  selectedDemo?: DemoObject;
};

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert"

export const AlertDemo: FC<AlertDemoProps> = ({ selectedDemo }) => {

  const [selectedOptions, setSelectedOptions] = useState<Record<string, {
    label: string;
    value: string;
    alertTitle?: string;
    alertDescription?: string
  }>>({});

  const colorMap: Record<string, string> = {
    primary: "bg-primary-100",
    secondary: "bg-secondary",
    blue: "bg-blue-100",
    green: "bg-green-100",
  };

  // Build code snippet dynamically
  const codeSnippet = `
<Alert 
  variant="${selectedOptions.variantList?.value || "primary"}"
  className="${colorMap[selectedOptions.colorList?.value] || ""}">
  <AlertTitle>
    ${selectedOptions.variantList?.alertTitle || "Default Title"}
  </AlertTitle>
  <AlertDescription>
    ${selectedOptions.variantList?.alertDescription || "Default description"}
  </AlertDescription>
</Alert>
`.trim();


  const installcationCode = [
    {
      language: "cmd",
      filename: "cmd",
      code: codeSnippet,
    },
  ]

  if (!selectedDemo) return <div></div>;

  return (
    <div>
      <div className="flex gap-1 items-end">
        {Object.entries(selectedDemo.options).map(([key, list]) => (
          <div key={key} className="p-2 pl-0">
            <div className="rounded-md">
              {Object.keys(selectedDemo.options).length === 1 && (
                <h1 className="text-2xl md:text-3xl font-semibold pb-2">
                  {selectedDemo.title}
                </h1>
              )}


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
                      {key === "colorList" && colorMap[opt.value] && (
                        <span className={`w-4 h-4 ${colorMap[opt.value]} rounded-sm border border-gray-300`} />
                      )}
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
          <Alert
            className={`${colorMap[selectedOptions.colorList?.value] || ""} [&>svg]:text-${selectedOptions.variantList?.value || "primary"}-500`}
            variant={(selectedOptions.variantList?.value as AlertVariant) || "primary"}
          >
            <AlertTitle>
              {selectedOptions.variantList?.alertTitle || "Default Title"}
            </AlertTitle>
            <AlertDescription>
              {selectedOptions.variantList?.alertDescription || "Default description"}
            </AlertDescription>
          </Alert>
        </div>
        <CustomCodeBlock bgColor="bg-gray-100" code={installcationCode} defaultValue="code" />

      </div>

    </div >
  );
};