"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FilterBar,
  type FilterDefinition,
  FilterInput,
  FilterMultiSelect,
  type FilterOption,
  FilterSingleSelect,
  type FilterSingleSelectGroup,
} from "@/components/ui/filter";
import { useCallback, useState } from "react";

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

export function FilterDemo() {

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

  const [value, setValue] = useState("");

  const [primaryValues, setPrimaryValues] = useState<string[]>([]);
  const [badgeValues, setBadgeValues] = useState<string[]>([]);

  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValues, setMultiValues] = useState<string[]>([]);
  
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
            value={value}
            onChange={setValue}
            options={[]}
            placeholder="Single select filter"
            groups={BLOCKCN_FILTER_GROUPS}
          />
        </div>
      </div>

      <div id='filter-multi-select'>
        <div className="flex flex-col gap-4">
          <FilterMultiSelect
            value={primaryValues}
            onChange={setPrimaryValues}
            options={[]}
            placeholder="Multi-select filter"
            groups={BLOCKCN_FILTER_GROUPS}
          />
          <FilterMultiSelect
            value={badgeValues}
            onChange={setBadgeValues}
            options={[]}
            placeholder="Multi-select filter"
            groups={BLOCKCN_FILTER_GROUPS}
            displayMode="badge"
          />
        </div>
      </div>

      <div id='filter-with-search'>
      <div className="flex flex-col gap-4">
      <FilterSingleSelect
        value={singleValue}
        onChange={setSingleValue}
        options={[]}
        groups={BLOCKCN_FILTER_GROUPS}
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
        groups={BLOCKCN_FILTER_GROUPS}
        searchable
        searchPlaceholder="Search"
        noResultsText="No results found"
      />
    </div>
      </div>

      <div id='filter-with-image'>
        <div className="flex flex-col gap-4">
          <FilterSingleSelect
            value={singleValue}
            onChange={setSingleValue}
            options={[]}
            placeholder="Single select filter"
            groups={BLOCKCN_FILTER_GROUPS}
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
            groups={BLOCKCN_FILTER_GROUPS}
            searchable
            showSearch={false}
            noResultsText="No results found"
            renderOption={renderOptionWithAvatar}
          />
        </div>
      </div>

    </div>

  );
}
