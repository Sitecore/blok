"use client";
import React, { FC, useState } from "react";
import CustomCodeBlock from "@/components/code-block";
import { RefreshCcw } from "lucide-react";
import { DialogExample } from "./dialog-example";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/new-york/ui/select";

type DialogVariant = "form" | "scrollable" | "sticky-footer";

type DemoObject = {
  title: string;
  description: string;
  type: DialogVariant;
  options: Record<string, { label: string; value: string; dialogConfig?: any }[]>;
};

type DialogDemoProps = {
  selectedDemo?: DemoObject;
};

export const DialogDemo: FC<DialogDemoProps> = ({ selectedDemo }) => {
  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (!selectedDemo) return {};
    const initialSelections: Record<string, { label: string; value: string; dialogConfig?: any }> = {};
    Object.entries(selectedDemo.options).forEach(([key, list]) => {
      if (list.length > 0) {
        initialSelections[key] = list[0]; // Set the first item as default
      }
    });
    return initialSelections;
  });

  // Build code snippet dynamically
  const codeSnippet = `
import { Button } from "@/registry/new-york/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog"
import { Input } from "@/registry/new-york/ui/input"
import { Label } from "@/registry/new-york/ui/label"

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" colorScheme="neutral">${selectedOptions.variantList?.label || "Open Dialog"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>${selectedOptions.variantList?.dialogConfig?.title || "Dialog Title"}</DialogTitle>
          <DialogDescription>
            ${selectedOptions.variantList?.dialogConfig?.description || "Dialog description goes here."}
          </DialogDescription>
        </DialogHeader>
        ${selectedOptions.variantList?.dialogConfig?.content || `<div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue="Pedro Duarte" />
          </div>
        </div>`}
        ${selectedOptions.variantList?.dialogConfig?.footer || `<DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" colorScheme="neutral">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>`}
      </DialogContent>
    </Dialog>
  )
}`.split("\n").filter(line => line.trim() !== "").join("\n");

  const installationCode = [
    {
      language: "tsx",
      filename: "dialog-example.tsx",
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
          <DialogExample
            variant={(selectedOptions.variantList?.value as DialogVariant) || "form"}
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
