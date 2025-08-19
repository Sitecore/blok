"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";
import { SelectExample } from "./selectVarent";

type SelectVariant = "default" | "largeList" | "withIcon" | "disabled";

interface CodeItem {
  language: string;
  filename: string;
  code: string;
}

type DemoObject = {
  title: string;
  description?: string;
  type: SelectVariant;
  showTitle?: boolean;
  codeContent?: CodeItem[];
};

type SelectDemoProps = {
  selectedDemo: DemoObject;
};

const placeholderMap: Record<SelectVariant, string> = {
  default: "Select a fruit",
  largeList: "Large List",
  withIcon: "With Icon",
  disabled: "Disabled",
};

export const SelectDemo: FC<SelectDemoProps> = ({ selectedDemo }) => {
  const [selectType, setSelectType] = useState<SelectVariant>(selectedDemo.type);
  const [key, setKey] = useState<number>(0); 

  const selectOptions = [
    { value: "default", label: "Default" },
    { value: "largeList", label: "Large list" },
    { value: "withIcon", label: "With icon" },
    { value: "disabled", label: "Disabled" },
  ];

  const handleSelectTypeChange = (value: string) => {
    if (["default", "largeList", "withIcon", "disabled"].includes(value)) {
      setSelectType(value as SelectVariant);
      setKey(prev => prev + 1);
    }
  };

const codeSnippet= `
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
${placeholderMap[selectType] === "With Icon" ? `import { mdiChartBar, mdiChartLine, mdiChartPie, mdiCircleOutline } from "@mdi/js"
import Icon from "@mdi/react"
` : ""}
export function SelectExample() {
  return (
    <Select${placeholderMap[selectType] === "Disabled" ? " disabled" : ""}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder=${placeholderMap[selectType] === "With Icon" ? `{ 
            <>
              <Icon path={mdiCircleOutline} size={0.9} className="text-neutral-foreground" />
               With Icon
            </>
          } 
        />`: `"${placeholderMap[selectType]}"/>`}
      </SelectTrigger>
      <SelectContent> ${(() => {
          switch (selectType) {
            case "default":
              return `
        <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes" disabled>
              Grapes
            </SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>`;
            case "largeList":
              return `
        {Array.from({ length: 100 }).map((_, i) => (
          <SelectItem key={i} value={\`item-\${i}\`}>
            Item {i}
          </SelectItem>
        ))}`;
            case "withIcon":
              return `
        <SelectGroup>
            <SelectLabel>Chart Types</SelectLabel>
            <SelectItem value="line">
              <Icon path={mdiChartLine} size={0.8} />
              Line
            </SelectItem>
            <SelectItem value="bar">
              <Icon path={mdiChartBar} size={0.8} />
              Bar
            </SelectItem>
            <SelectItem value="pie">
              <Icon path={mdiChartPie} size={0.8} />
              Pie
            </SelectItem>
          </SelectGroup>`;
            case "disabled":
              return `
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes" disabled>
            Grapes
        </SelectItem>
        <SelectItem value="pineapple">Pineapple</SelectItem>`;
            default:
              return "";
          }
        })()}
      </SelectContent>
    </Select>
  );
}
`.trim();

const sampleCode = [
  {
    language: "jsx",
    filename: "SelectDemo.jsx",
    code: codeSnippet
  },
];


  return (
    <div>
      {selectedDemo.showTitle !== false && (
        <h2 className="mb-2 text-xl font-semibold md:text-2xl">
          {selectedDemo.title}
        </h2>
      )}

      <div className="mb-4">
        <Select value={selectType} onValueChange={handleSelectTypeChange}>
          <SelectTrigger className="bg-secondary border border-gray-200 text-black [&>svg]:text-black w-[180px]">
            <SelectValue
              placeholder={`Select variant`}
              className="[&>span]:text-black"
            />
          </SelectTrigger>
          <SelectContent className="bg-secondary">
            {selectOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-black">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-center rounded-t-md bg-white p-25">
        <div className="w-75">
          <SelectExample key={key} variant={selectType} />
        </div>
      </div>

      <CustomCodeBlock
        code={sampleCode}
        defaultValue="jsx"
        lineNumbers
        containerClassNames="!rounded-t-none"
        bodyClassNames="bg-gray-100"
      />
    </div>
  );
};
