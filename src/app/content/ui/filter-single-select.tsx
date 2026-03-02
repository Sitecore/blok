"use client";

import { FilterSingleSelect } from "@/components/ui/filter";
import { useState } from "react";

const productOptions = [
  { value: "XMCloud", label: "XM Cloud" },
  { value: "contentHub", label: "Content Hub" },
  { value: "CDP", label: "CDP" },
  { value: "Blok", label: "Blok", disabled: true },
];

export default function FilterSingleSelectDemo() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="flex flex-col gap-4">
      <FilterSingleSelect
        value={value}
        onChange={setValue}
        options={productOptions}
        placeholder="Select a product"
        groupLabel="Products"
      />
    </div>
  );
}
