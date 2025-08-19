"use client";
import React, { FC } from "react";
import CustomCodeBlock from "@/components/code-block"
import { RefreshCcw } from "lucide-react";

type DemoObject = {
    type: string
    options: Record<string, { label: string; value: string }[]>
};

type textareaDemoProps = {
    selectedDemo?: DemoObject;
};


import { Textarea } from "@/registry/new-york/ui/textarea"

export const CalendarDemo: FC<textareaDemoProps> = ({ selectedDemo }) => {

    const codeSnippet = ``.split("\n").filter(line => line.trim() !== "").join("\n");



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
           
        </div >
    );
};