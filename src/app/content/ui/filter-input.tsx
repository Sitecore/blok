"use client"

import { FilterInput } from "@/components/ui/filter";
import { useState } from "react";

export default function FilterInputDemo() {
    const [value, setValue] = useState("");

    return (
        <FilterInput
            value={value}
            onChange={setValue}
            placeholder="Search..."
            ariaLabel="Search"
        />
    );
}