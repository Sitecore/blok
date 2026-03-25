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

const BLOCKCN_FILTER_GROUPS: FilterSingleSelectGroup[] = [
  {
    label: "Platform & commerce",
    options: [
      { value: "XMCloud", label: "XM Cloud" },
      { value: "contentHub", label: "Content Hub" },
      { value: "CDP", label: "CDP" },
      { value: "Blok", label: "Blok", disabled: true },
      { value: "OrderCloud", label: "Order cloud" },
      { value: "SitecoreXP", label: "Sitecore XP" },
      { value: "SitecoreXM", label: "Sitecore XM" },
      { value: "Send", label: "Send" },
    ],
  },
  {
    label: "Experience & content",
    options: [
      { value: "Discover", label: "Discover" },
      { value: "Connect", label: "Connect" },
      { value: "Personalize", label: "Personalize" },
      { value: "ContentOps", label: "Content operations" },
      { value: "Commerce", label: "Sitecore commerce" },
      { value: "Forms", label: "Sitecore forms" },
      { value: "JSS", label: "JavaScript services" },
      { value: "Headless", label: "Headless CMS" },
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
        groups: BLOCKCN_FILTER_GROUPS,
      },
    },
    {
      type: "multi-select",
      key: "products",
      props: {
        options: [],
        placeholder: "Multi-select filter",
        groups: BLOCKCN_FILTER_GROUPS,
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
