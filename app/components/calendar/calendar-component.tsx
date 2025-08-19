"use client";

import React, { FC, useState } from "react";
import { Calendar } from "@/registry/new-york/ui/calendar";
import CustomCodeBlock from "@/components/code-block";
import { RefreshCcw } from "lucide-react";
import type { DateRange } from "react-day-picker"; // ✅ Correct type


import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/registry/new-york/ui/select";
import { boolean } from "zod";


type DemoOption = {
    label: string;
    value: string;
};

type DemoObject = {
    title: string;
    type: string;
    options: Record<string, DemoOption[]>;
};

type CalendarDemoProps = {
    selectedDemo?: DemoObject;
};

export const CalendarDemo: FC<CalendarDemoProps> = ({ selectedDemo }) => {

    const [selectedOptions, setSelectedOptions] = useState(() => {
        if (!selectedDemo) return {};
        const initialSelections: Record<string, DemoOption> = {};
        Object.entries(selectedDemo.options).forEach(([key, list]) => {
            if (list.length > 0) {
                initialSelections[key] = list[0];
            }
        });
        return initialSelections;
    });

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [range, setRange] = useState<DateRange | undefined>();

    const mode = selectedOptions.variantDropdownList?.value || "default";
    const numberOfMonths = parseInt(selectedOptions.MonthViewDropdownList?.value || "1");
    const isDisabled = selectedOptions.isDisabledList?.value === "disabled";

    const codeSnippet = `import React, { useState } from "react";
${mode === "dateRange" ? `import type { DateRange } from "react-day-picker";` : null}
import { Calendar } from "@/registry/new-york/ui/calendar";

export function MenubarDemo(){
    ${mode === "default" ? "const [date, setDate] = useState<Date | undefined>(new Date());" : null}
    ${mode === "dateRange" ? "const [range, setRange] = useState<DateRange | undefined>();" : null}
    <Calendar
    mode="${mode === "default" ? "single" : "range"}"
    ${mode === "default" ? "selected={date}" : "selected={range}"}
    ${mode === "default" ? "onSelect={setDate}" : "onSelect={setRange}"}
    numberOfMonths={${numberOfMonths}}
    ${isDisabled ? `disabled={(date) => date > new Date() || date < new Date("1900-01-01")}` : null}
    className="rounded-md border shadow-sm"
    />
}`
.split("\n")
.filter(line => !line.includes("null"))
.join("\n");

    const installcationCode = [
        {
            language: "tsx",
            filename: "calendar.tsx",
            code: codeSnippet,
        },
    ];

    if (!selectedDemo) return <div />;

    return (
        <div>
            <div className="flex gap-1 items-end flex-wrap">
                {Object.entries(selectedDemo.options).map(([key, list]) => (
                    <div key={key} className="p-2 pl-0">
                        <h1 className="text-2xl md:text-3xl font-semibold pb-2">
                            {selectedDemo.title}
                        </h1>
                        <Select
                            key={selectedOptions[key]?.value ?? "reset"}
                            value={selectedOptions[key]?.value}
                            onValueChange={(value) => {
                                const selected = list.find((opt) => opt.value === value);
                                if (selected) {
                                    setSelectedOptions((prev) => ({ ...prev, [key]: selected }));
                                }
                            }}
                        >
                            <SelectTrigger className="bg-secondary border border-gray-200 text-black">
                                <SelectValue
                                    placeholder={key.replace(/View|Dropdown|List/g, "")}
                                />
                            </SelectTrigger>
                            <SelectContent className="bg-secondary text-black">
                                {list.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ))}
                <button
                    onClick={() => setSelectedOptions({})}
                    className="w-9 h-9 flex items-center justify-center rounded-md bg-secondary border border-gray-200 text-black mb-2"
                    title="Reset selections"
                >
                    <RefreshCcw size={16} className="text-black" />
                </button>
            </div>

            <div className="bg-white p-6 flex items-center justify-center rounded-t-md">
                {mode === "default" && (
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={numberOfMonths}
                        className="rounded-md border shadow-sm"
                        disabled={
                            isDisabled
                                ? (date) => date > new Date() || date < new Date("1900-01-01")
                                : undefined
                        }
                    />
                )}

                {mode === "dateRange" && (
                    <Calendar
                        mode="range"
                        selected={range}
                        onSelect={setRange}
                        numberOfMonths={numberOfMonths}
                        disabled={
                            isDisabled
                                ? (date) => date > new Date() || date < new Date("1900-01-01")
                                : undefined
                        }
                        className="rounded-md border shadow-sm"
                    />
                )}
            </div>

            <CustomCodeBlock
                containerClassNames="!rounded-t-none"
                bodyClassNames="bg-gray-100"
                code={installcationCode}
                defaultValue="tsx"
                lineNumbers
            />
        </div>
    );
};
