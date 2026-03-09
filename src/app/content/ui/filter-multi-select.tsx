"use client";

import { FilterMultiSelect } from "@/components/ui/filter";
import { useState } from "react";

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

export default function FilterMultiSelectDemo() {
  const [primaryValues, setPrimaryValues] = useState<string[]>([]);
  const [badgeValues, setBadgeValues] = useState<string[]>([]);

  return (
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
  );
}
