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
  FilterBar,
  type FilterDefinition,
} from "@/components/ui/filter";`,

      `"use client";

import { useCallback, useState } from "react";
import {
  FilterBar,
  type FilterDefinition,
  type FilterSingleSelectGroup,
} from "@/components/ui/filter";

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

export default function FilterDemo() {
  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({
    search: "",
    singleGrouped: "",
    products: [],
  });

  const filters: FilterDefinition[] = [
    {
      type: "input",
      key: "search",
      props: {
        placeholder: "Search...",
        ariaLabel: "Search",
        width: "w-64",
      },
    },
    {
      type: "single-select",
      key: "singleGrouped",
      props: {
        options: [],
        placeholder: "Single select filter",
        groups: FILTER_DEMO_AB_GROUPS,
      },
    },
    {
      type: "multi-select",
      key: "products",
      props: {
        options: [],
        placeholder: "Multi-select filter",
        groups: FILTER_DEMO_AB_GROUPS,
      },
    },
  ];

  const handleChange = useCallback((key: string, value: unknown) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleClearAll = useCallback(() => {
    setFilterValues({
      search: "",
      singleGrouped: "",
      products: [],
    });
  }, []);

  return (
    <FilterBar
      filters={filters}
      values={filterValues}
      onChange={handleChange}
      onClearAll={handleClearAll}
      showClearAll
      clearAllText="Clear all"
    />
  );
}`,
    ],
  },
  components: {
    "Filter Input": { component: "filter-input" },
    "Filter Single Select": { component: "filter-single-select" },
    "Filter Multi Select": { component: "filter-multi-select" },
    "Filter with Search": { component: "filter-with-search" },
    "Filter with image/avatar": { component: "filter-with-avatar" },
  },
};
