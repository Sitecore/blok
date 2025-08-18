"use client";
import React, { FC, useState } from "react";
// import CommandSnippet from "@/components/ui/commandSnippet";
import CustomCodeBlock from "@/components/code-block"
import { RefreshCcw } from "lucide-react";

type DemoObject = {
    type: string
    options: Record<string, { label: string; value: string, alertTitle?: string, alertDescription?: string }[]>
};

type textareaDemoProps = {
    selectedDemo?: DemoObject;
};

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/registry/new-york/ui/select"

import { Label } from "@/registry/new-york/ui/label"
import { Textarea } from "@/registry/new-york/ui/textarea"

export const TextareaDemo: FC<textareaDemoProps> = ({ selectedDemo }) => {

    const [selectedOptions, setSelectedOptions] = useState<Record<string, {
        label: string;
        value: string;
    }>>({
        variantList: { label: "Default", value: "default" }
    });



    const codeSnippet = `import { Label } from "@/registry/new-york/ui/label"
import { Textarea } from "@/registry/new-york/ui/textarea"

export function TextareaDemo(){
    <div className="flex w-full flex-col">
        <div className="grid gap-3">
            ${selectedOptions.variantList?.value !== "withoutLabel"
            ? '<Label htmlFor="textarea-demo-message">Label</Label>'
            : ""}
            <Textarea
            ${selectedOptions.variantList?.value === "warning" ? 'aria-invalid="true"' : ""}
            id="textarea-demo-message"
            placeholder="Type your message here."
            rows={6}
            ${selectedOptions.variantList?.value === "disabled" ? "disabled" : ""}
            />
            ${selectedOptions.variantList?.value === "description"
            ? '<div className="text-muted-foreground text-sm">Type your message and press enter to send.</div>'
            : ""}
        </div>
    </div>
}`.split("\n").filter(line => line.trim() !== "").join("\n");



    const installcationCode = [
        {
            language: "jsx",
            filename: "TextareaDemo.jsx",
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
                    onClick={() => setSelectedOptions({
                        variantList: { label: "Default", value: "default" }
                    })}
                    className="w-9 h-9 flex items-center justify-center rounded-md bg-secondary border border-gray-200 text-black [&>svg]:text-black mb-2"
                    title="Reset selections"
                >
                    <RefreshCcw size={16} className="text-black" />
                </button>
            </div>
            <div>
                <div className="bg-white p-25 flex items-center justify-center rounded-t-md ">
                    <div className="flex w-full flex-col">
                        <div className="grid gap-3">
                            {selectedOptions.variantList?.value !== "withoutLabel" && (
                                <Label htmlFor="textarea-demo-message">Label</Label>
                            )}
                            <Textarea
                                aria-invalid={selectedOptions.variantList?.value === "warning" ? "true" : undefined}
                                id="textarea-demo-message"
                                placeholder="Type your message here."
                                rows={6}
                                disabled={selectedOptions.variantList?.value === "disabled"}
                            />
                            {selectedOptions.variantList?.value == "description" && (
                                <div className="text-muted-foreground text-sm">
                                    Type your message and press enter to send.
                                </div>
                            )}

                        </div>
                    </div>
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