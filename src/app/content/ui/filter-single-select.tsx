"use client"

import { FilterSingleSelect } from "@/components/ui/filter";
import { useState } from "react";

const productOptions = [
    { value: "XMCloud", label: "XM Cloud" },
    { value: "contentHub", label: "Content Hub" },
    { value: "CDP", label: "CDP" },
    { value: "Blok", label: "Blok", disabled: true },
];

export default function FilterSingleSelectDemo() {
    const [defaultValue, setDefaultValue] = useState<string>("");
    const [primaryValue, setPrimaryValue] = useState<string>("");

    return (
        <div className="flex flex-col gap-4">
            {/* Default Single Select */}
            <FilterSingleSelect
                value={defaultValue}
                onChange={setDefaultValue}
                options={productOptions}
                placeholder="Select a product"
                groupLabel="Products"
                colorScheme="neutral"
            />
            {/* Primary Single Select */}
            <FilterSingleSelect
                value={primaryValue}
                onChange={setPrimaryValue}
                options={productOptions}
                placeholder="Select a product"
                groupLabel="Products"
                colorScheme="primary"
            />
        </div>
    );
}