"use client";

import {
  FilterSingleSelect,
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

export default function FilterSingleSelectDemo() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-4">
      <FilterSingleSelect
        value={value}
        onChange={setValue}
        options={[]}
        placeholder="Single select filter"
        groups={FILTER_DEMO_AB_GROUPS}
      />
    </div>
  );
}
