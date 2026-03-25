"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  FilterMultiSelect,
  type FilterOption,
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

export default function FilterWithAvatarDemo() {
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValues, setMultiValues] = useState<string[]>([]);

  return (
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
        maxDisplayItems={2}
        renderOption={renderOptionWithAvatar}
      />
    </div>
  );
}
