"use client";

import {
  FilterMultiSelect,
  FilterSingleSelect,
  type FilterSingleSelectGroup,
} from "@/components/ui/filter";
import { useState } from "react";

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

export default function FilterWithSearchDemo() {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValues, setMultiValues] = useState<string[]>([]);

  return (
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
  );
}
