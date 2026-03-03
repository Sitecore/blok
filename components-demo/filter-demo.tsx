"use client";

import { FilterBar, type FilterDefinition, FilterInput, FilterSingleSelect, FilterMultiSelect } from "@/components/ui/filter";
import { useState } from "react";

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

const productOptionsSingleSelect = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
];

export function FilterDemo() {

  const [filterValues, setFilterValues] = useState<Record<string, unknown>>({
    search: "",
    product: "",
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
      key: "product",
      props: {
        options: productOptions,
        placeholder: "Select a product",
        groupLabel: "Products",
      },
    },
    {
      type: "multi-select",
      key: "products",
      props: {
        options: extendedProductOptions,
        placeholder: "Select products",
        groupLabel: "Products",
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
    });
  };

  const [value, setValue] = useState("");
  
  const [valueSingleSelect, setValueSingleSelect] = useState<string>("");

  const [primaryValues, setPrimaryValues] = useState<string[]>([]);
  const [badgeValues, setBadgeValues] = useState<string[]>([]);
  
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
        <div className="flex flex-col gap-4">
          <FilterSingleSelect
            value={valueSingleSelect} // Single select value
            onChange={setValueSingleSelect} // Single select onChange
            options={productOptionsSingleSelect} // Single select options
            placeholder="Select a product"
            groupLabel="Products"
          />
        </div>
      </div>

      <div id='filter-multi-select'>
        <div className="flex flex-col gap-4">
          {/* Primary Multi Select */}
          <FilterMultiSelect
            value={primaryValues}
            onChange={setPrimaryValues}
            options={extendedProductOptions}
            placeholder="Select products"
            groupLabel="Products"
          />
          {/* Badge Multi Select */}
          <FilterMultiSelect
            value={badgeValues}
            onChange={setBadgeValues}
            options={extendedProductOptions}
            placeholder="Select products"
            groupLabel="Products"
            displayMode="badge"
          />
        </div>
      </div>

    </div>

  );
}
