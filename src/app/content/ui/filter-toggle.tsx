"use client"

import { FilterToggle } from "@/components/ui/filter";
import { useState } from "react";

export default function FilterToggleDemo() {
    const [defaultActive, setDefaultActive] = useState(false);
    const [primaryActive, setPrimaryActive] = useState(false);

    return (
        <div className="flex flex-col gap-4">
            {/* Default Toggle */}
            <FilterToggle
                active={defaultActive}
                onChange={setDefaultActive}
                label="Assigned to me"
                colorScheme="neutral"
            />
            {/* Primary Toggle with Close */}
            <FilterToggle
                active={primaryActive}
                onChange={setPrimaryActive}
                label="Assigned to me"
                colorScheme="primary"
                showClose
            />
        </div>
    );
}