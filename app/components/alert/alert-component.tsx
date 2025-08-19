"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block"
import { RefreshCcw } from "lucide-react";

type AlertVariant = "success" | "warning" | "primary" | "default" | "danger";


type DemoOption = {
  label: string;
  value: string;
  alertTitle?: string;
  alertDescription?: string;
  color?: string;
};

type DemoObject = {
  title: string;
  description: string;
  type: AlertVariant;
  options: Record<string, DemoOption[]>
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

  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!selectedDemo) return {};
    const initialSelections: Record<string, DemoOption> = {};
    Object.entries(selectedDemo.options).forEach(([key, list]) => {
      if (list.length > 0) {
        initialSelections[key] = list[0]; // Set the first item as default
      }
    });
    return initialSelections;
  });


  const codeSnippet = `
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/registry/new-york/ui/alert"


export function AlertDemo(){
<Alert variant="${selectedOptions.variantDropdownList?.value || "primary"}" ${selectedOptions.colorDropdownList?.color ? `className="${selectedOptions.colorDropdownList.color}"` : ""}>
    <AlertTitle>
      ${selectedOptions.variantDropdownList?.alertTitle || "Default Title"}
    </AlertTitle>
    <AlertDescription>
      ${selectedOptions.variantDropdownList?.alertDescription || "Default description"}
    </AlertDescription>
  </Alert>
}
`


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
              <h1 className="text-2xl md:text-3xl font-semibold pb-2">
                {selectedDemo.title}
              </h1>
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
                  <SelectValue placeholder={`Select ${key.replace("DropdownList", "")}`} className="[&>span]:text-black" />
                </SelectTrigger>
                <SelectContent className="bg-secondary">
                  {list.map(opt => (
                    <SelectItem key={opt.value} value={opt.value} className="text-black">
                      {key === "colorDropdownList" && opt.color && (
                        <span className={`w-4 h-4 ${opt.color} rounded-sm border border-gray-300`} />
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
        <div className="bg-white p-25 flex items-center justify-center rounded-t-md ">
          <Alert
            className={`${selectedOptions.colorDropdownList?.color || ""} [&>svg]:text-${selectedOptions.variantDropdownList?.value || "primary"}-500`}
            variant={(selectedOptions.variantDropdownList?.value as AlertVariant) || "primary"}
          >
            <AlertTitle>
              {selectedOptions.variantDropdownList?.alertTitle || "Default Title"}
            </AlertTitle>
            <AlertDescription>
              {selectedOptions.variantDropdownList?.alertDescription || "Default description"}
            </AlertDescription>
          </Alert>
        </div>
        <CustomCodeBlock
          containerClassNames="!rounded-t-none"
          bodyClassNames="bg-gray-100"
          code={installcationCode}
          defaultValue="jsx"
          lineNumbers
        />

      </div>

    </div >
  );
};