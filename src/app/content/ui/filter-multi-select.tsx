"use client";

import {
  FilterMultiSelect,
  type FilterSingleSelectGroup,
} from "@/components/ui/filter";
import { useState } from "react";

const FILTER_DEMO_AB_GROUPS: FilterSingleSelectGroup[] = [
  {
    label: "A GROUP TITLE",
    options: [
      { value: "a-a", label: "A item" },
      { value: "a-b", label: "B item" },
      { value: "a-c", label: "C item" },
      { value: "a-d", label: "D item" },
      { value: "a-e", label: "E item" },
    ],
  },
  {
    label: "B GROUP TITLE",
    options: [
      { value: "b-a", label: "A item" },
      { value: "b-b", label: "B item" },
      { value: "b-c", label: "C item" },
      { value: "b-d", label: "D item" },
      { value: "b-e", label: "E item" },
      { value: "b-f", label: "F item" },
    ],
  },
];

export default function FilterMultiSelectDemo() {
  const [primaryValues, setPrimaryValues] = useState<string[]>([]);
  const [badgeValues, setBadgeValues] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <FilterMultiSelect
        value={primaryValues}
        onChange={setPrimaryValues}
        options={[]}
        placeholder="Multi-select filter"
        groups={FILTER_DEMO_AB_GROUPS}
      />
      <FilterMultiSelect
        value={badgeValues}
        onChange={setBadgeValues}
        options={[]}
        placeholder="Multi-select filter"
        groups={FILTER_DEMO_AB_GROUPS}
        displayMode="badge"
      />
    </div>
  );
}
