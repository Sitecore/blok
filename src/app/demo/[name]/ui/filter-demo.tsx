"use client";

import * as React from "react";
import {
  FilterInput,
  FilterSingleSelect,
  FilterMultiSelect,
  FilterToggle,
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
  { value: "SitecoreXM", label: "Sitecore XM" },
  { value: "Send", label: "Send" },
  { value: "Discover", label: "Discover" },
  { value: "Connect", label: "Connect" },
  { value: "Personalize", label: "Personalize" },
  { value: "ContentOps", label: "Content operations" },
  { value: "Commerce", label: "Sitecore commerce" },
  { value: "Forms", label: "Sitecore forms" },
  { value: "JSS", label: "JavaScript services" },
  { value: "Headless", label: "Headless CMS" },
];

// FILTER INPUT 

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
}

// FILTER SINGLE SELECT 

export function FilterSingleSelectDemo() {
  const [defaultValue, setDefaultValue] = React.useState<string>("");
  const [primaryValue, setPrimaryValue] = React.useState<string>("");

  return (
    <div className="flex flex-col gap-4">
      {/* Default Single Select */}
      <FilterSingleSelect
        value={defaultValue}
        onChange={setDefaultValue}
        options={productOptions}
        placeholder="Select a product"
        groupLabel="Products"
        colorScheme="neutral"
      />
      {/* Primary Single Select */}
      <FilterSingleSelect
        value={primaryValue}
        onChange={setPrimaryValue}
        options={productOptions}
        placeholder="Select a product"
        groupLabel="Products"
        colorScheme="primary"
      />
    </div>
  );
}

// FILTER MULTI SELECT

export function FilterMultiSelectDemo() {
  const [defaultValues, setDefaultValues] = React.useState<string[]>([]);
  const [primaryValues, setPrimaryValues] = React.useState<string[]>([]);
  const [badgeValues, setBadgeValues] = React.useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4">
      {/* Default Multi Select */}
      <FilterMultiSelect
        value={defaultValues}
        onChange={setDefaultValues}
        options={extendedProductOptions}
        placeholder="Select products"
        groupLabel="Products"
        colorScheme="neutral"
      />
      {/* Primary Multi Select */}
      <FilterMultiSelect
        value={primaryValues}
        onChange={setPrimaryValues}
        options={extendedProductOptions}
        placeholder="Select products"
        groupLabel="Products"
        colorScheme="primary"
      />
      {/* Badge Multi Select */}
      <FilterMultiSelect
        value={badgeValues}
        onChange={setBadgeValues}
        options={extendedProductOptions}
        placeholder="Select products"
        groupLabel="Products"
        displayMode="badge"
        colorScheme="neutral"
      />
    </div>
  );
}

// FILTER TOGGLE

export function FilterToggleDemo() {
  const [defaultActive, setDefaultActive] = React.useState(false);
  const [primaryActive, setPrimaryActive] = React.useState(false);

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

// FILTER HORIZONTAL LAYOUT

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
}

