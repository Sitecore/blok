"use client";

import { useState } from "react";
import { FilterBar, type FilterDefinition, FilterInput, FilterSingleSelect, FilterMultiSelect, FilterToggle } from "@/components/ui/filter";

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

export function FilterDemo() {

  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({
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

  const [value, setValue] = useState("");

  const [defaultValue, setDefaultValue] = useState<string>("");
  const [primaryValue, setPrimaryValue] = useState<string>("");

  const [defaultValues, setDefaultValues] = useState<string[]>([]);
  const [primaryValues, setPrimaryValues] = useState<string[]>([]);
  const [badgeValues, setBadgeValues] = useState<string[]>([]);

  const [defaultActive, setDefaultActive] = useState(false);
  const [primaryActive, setPrimaryActive] = useState(false);
  
  return (

    <div className="grid gap-4">
    <h2 className="font-semibold text-4xl wrap-break-words">Filter</h2>

      <div id='filter-default'>
        <FilterBar
            filters={filters}
            values={filterValues}
            onChange={handleChange}
            onClearAll={handleClearAll}
            showClearAll
            clearAllText="Clear all"
        />
      </div>

      <div id='filter-input'>
        <FilterInput
            value={value}
            onChange={setValue}
            placeholder="Search..."
            ariaLabel="Search"
        />
      </div>

      <div id='filter-single-select'>
        <div className="flex gap-4">
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
      </div>

      <div id='filter-multi-select'>
        <div className="flex gap-4">
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
      </div>

      <div id='filter-toggle'>
        <div className="flex gap-4">
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
      </div>

    </div>

  );
}
