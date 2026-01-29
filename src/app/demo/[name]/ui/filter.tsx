export const filter = {
  name: "filter",
  preview: {
    defaultComponent: "filter",
  },
  usage: {
    usage: [
      `import {
  FilterInput,
  FilterSingleSelect,
  FilterMultiSelect,
  FilterToggle,
  FilterBar,
  type FilterDefinition,
} from "@/components/ui/filter";`,

      `// Single Select Filter
"use client";

import * as React from "react";
import { FilterSingleSelect } from "@/components/ui/filter";

const productOptions = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
];

export function FilterSingleSelectDemo() {
  const [value, setValue] = React.useState<string>("");

  return (
    <FilterSingleSelect
      value={value}
      onChange={setValue}
      options={productOptions}
      placeholder="Select a product"
      groupLabel="Products"
      colorScheme="primary"
    />
  );
}`
    ],
  },
  components: {
    "Filter Input": { component: "filter-input", },
    "Filter Single Select": { component: "filter-single-select", },
    "Filter Multi Select": { component: "filter-multi-select", },
    "Filter Toggle": { component: "filter-toggle", },
  },
};
