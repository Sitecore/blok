"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FilterMultiSelect,
  type FilterOption,
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

/** Renders option with small circular avatar (initial) + label, for dropdown rows. */
function renderOptionWithAvatar(option: FilterOption) {
  const initial = option.label.charAt(0).toUpperCase();
  return (
    <span className="flex items-center gap-2 min-w-0">
      <Avatar className="size-6 shrink-0 rounded-full bg-violet-100 dark:bg-violet-900/40">
        <AvatarFallback className="rounded-full bg-violet-100 text-violet-700 text-xs font-medium dark:bg-violet-900/40 dark:text-violet-300">
          {initial}
        </AvatarFallback>
      </Avatar>
      <span className="truncate">{option.label}</span>
    </span>
  );
}

export default function FilterWithAvatarDemo() {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValues, setMultiValues] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <FilterSingleSelect
        value={singleValue}
        onChange={setSingleValue}
        options={[]}
        placeholder="Single select filter"
        groups={FILTER_DEMO_AB_GROUPS}
        searchable
        showSearch={false}
        noResultsText="No results found"
        renderOption={renderOptionWithAvatar}
      />

      <FilterMultiSelect
        value={multiValues}
        onChange={setMultiValues}
        options={[]}
        placeholder="Multi-select filter"
        groups={FILTER_DEMO_AB_GROUPS}
        searchable
        showSearch={false}
        noResultsText="No results found"
        maxDisplayItems={2}
        renderOption={renderOptionWithAvatar}
      />
    </div>
  );
}
