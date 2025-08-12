"use client";

import React from "react";
import CommandSnippet from "@/components/ui/commandSnippet";
import rawComponentsData from "@/lib/componentsData.json";
import { notFound } from "next/navigation";

type Example = {
    type: string;
    code: string;
};

type Installation = {
    label: string;
    code: string;
};

type FileEntry = {
    path: string;
    type: string;
};

type Component = {
    name: string;
    type: string;
    description: string;
    sampleCode: string;
    imageSrc: string;
    installation: Installation[];
    examples: Example[];
    dependencies: string[];
    files: FileEntry[];
};

type ComponentMap = {
    [key: string]: Component;
};

// Instead of assuming params is an object, declare it as a Promise
type PageProps = {
    params: Promise<{
        name: string;
    }>;
};

const componentsData = rawComponentsData as ComponentMap;

export default function ComponentDetailPage({ params }: PageProps) {
    // ✅ unwrap params with React.use()
    const { name } = React.use(params);

    const decodedName = decodeURIComponent(name);
    const component = componentsData[decodedName];

    if (!component) {
        return notFound();
    }

    return (
        <div className="flex w-full flex-row bg-secondary min-h-screen">
            <div className="flex flex-col w-[80%] gap-4 p-4">
                <h1 className="text-5xl font-semibold text-foreground">{component.name}</h1>
                <p className="text-lg text-muted-foreground">{component.description}</p>
                <h2 className="text-3xl text-foreground font-semibold">Installation</h2>
                <CommandSnippet commands={component.installation} />
                <h2 className="text-3xl text-foreground font-semibold">Usage</h2>
                <h2 className="text-3xl text-foreground font-semibold">Examples</h2>
            </div>
        </div>
    );
}
