"use client";

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

const FILTER_DEMO_ITEMS_A_TO_K: FilterOption[] = [
  { value: "a", label: "A item" },
  { value: "b", label: "B item" },
  { value: "c", label: "C item" },
  { value: "d", label: "D item" },
  { value: "e", label: "E item" },
  { value: "f", label: "F item" },
  { value: "g", label: "G item" },
  { value: "h", label: "H item" },
  { value: "i", label: "I item" },
  { value: "j", label: "J item" },
  { value: "k", label: "K item" },
];

export default function FilterWithSearchDemo() {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValues, setMultiValues] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      <FilterSingleSelect
        value={singleValue}
        onChange={setSingleValue}
        options={FILTER_DEMO_ITEMS_A_TO_K}
        placeholder="Single select filter with search"
        searchable
        searchPlaceholder="Search"
        noResultsText="No results found"
      />

      <FilterMultiSelect
        value={multiValues}
        onChange={setMultiValues}
        options={[]}
        placeholder="Multi select filter with search"
        groups={FILTER_DEMO_AB_GROUPS}
        searchable
        searchPlaceholder="Search"
        noResultsText="No results found"
        maxDisplayItems={2}
      />
    </div>
  );
}
