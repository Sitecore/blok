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

function renderOptionWithAvatar(option: FilterOption) {
  return (
    <span className="flex items-center gap-2 min-w-0">
      <Avatar className="size-6 shrink-0">
        <AvatarFallback className="bg-primary-bg text-primary-fg text-xs font-medium">
          {option.label.charAt(0).toUpperCase()}
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
        groups={BLOCKCN_FILTER_GROUPS}
        placeholder="Single select filter"
        renderOption={renderOptionWithAvatar}
      />

      <FilterMultiSelect
        value={multiValues}
        onChange={setMultiValues}
        options={[]}
        groups={BLOCKCN_FILTER_GROUPS}
        placeholder="Multi-select filter"
        renderOption={renderOptionWithAvatar}
      />
    </div>
  );
}
