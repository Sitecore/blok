import {
  FilterInputDemo,
  FilterSingleSelectDemo,
  FilterMultiSelectDemo,
  FilterToggleDemo,
  FilterHorizontalLayoutDemo,
} from "@/app/demo/[name]/ui/filter-demo";

export const filter = {
  name: "filter",
  defaultComponent: <FilterHorizontalLayoutDemo />,
  usage: [
    `import {
  FilterInput,
  FilterSingleSelect,
  FilterMultiSelect,
  FilterToggle,
  FilterBar,
  type FilterDefinition,
} from "@/components/ui/filter";`,
    `// FilterBar - Composable Filter Layout (Default)
"use client";

import * as React from "react";
import {
  FilterBar,
  type FilterDefinition,
} from "@/components/ui/filter";

const productOptions = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
];

const extendedProductOptions = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
  { value: "OrderCloud", label: "Order cloud" },
  { value: "SitecoreXP", label: "Sitecore XP" },
];

export function FilterHorizontalLayoutDemo() {
  const [filterValues, setFilterValues] = React.useState<Record<string, unknown>>({
    search: "",
    product: "",
    products: [],
    assignedToMe: false,
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
      key: "product",
      props: {
        options: productOptions,
        placeholder: "Select a product",
        groupLabel: "Products",
        colorScheme: "primary",
      },
    },
    {
      type: "multi-select",
      key: "products",
      props: {
        options: extendedProductOptions,
        placeholder: "Select products",
        groupLabel: "Products",
        colorScheme: "primary",
      },
    },
    {
      type: "toggle",
      key: "assignedToMe",
      props: {
        label: "Assigned to me",
        colorScheme: "primary",
        showClose: true,
      },
    },
  ];

  const handleChange = (key: string, value: unknown) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setFilterValues({
      search: "",
      product: "",
      products: [],
      assignedToMe: false,
    });
  };

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
    `// Filter Input
"use client";

import * as React from "react";
import { FilterInput } from "@/components/ui/filter";

export function FilterInputDemo() {
  const [value, setValue] = React.useState("");

  return (
    <FilterInput
      value={value}
      onChange={setValue}
      placeholder="Search..."
      ariaLabel="Search"
    />
  );
}`,
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
}`,
    `// Multi Select Filter
"use client";

import * as React from "react";
import { FilterMultiSelect } from "@/components/ui/filter";

const productOptions = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
  { value: "OrderCloud", label: "Order cloud" },
  { value: "SitecoreXP", label: "Sitecore XP" },
];

export function FilterMultiSelectDemo() {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <FilterMultiSelect
      value={values}
      onChange={setValues}
      options={productOptions}
      placeholder="Select products"
      groupLabel="Products"
      colorScheme="primary"
      maxDisplayItems={3}
    />
  );
}`,
    `// Toggle Filter
"use client";

import * as React from "react";
import { FilterToggle } from "@/components/ui/filter";

export function FilterToggleDemo() {
  const [active, setActive] = React.useState(false);

  return (
    <FilterToggle
      active={active}
      onChange={setActive}
      label="Assigned to me"
      colorScheme="primary"
      showClose
    />
  );
}`,
  ],
  components: {
    "Filter Input": <FilterInputDemo />,
    "Filter Single Select": <FilterSingleSelectDemo />,
    "Filter Multi Select": <FilterMultiSelectDemo />,
    Toggle: <FilterToggleDemo />,
  },
};
