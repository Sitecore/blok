"use client";

import {
  SearchInput,
  SearchInputClearButton,
  SearchInputField,
  SearchInputLeftElement,
  SearchInputRightElement,
} from "@/components/ui/search-input";
import { Icon } from "@/lib/icon";
import { mdiMagnify } from "@mdi/js";
import { useState } from "react";

export default function SearchInputDefaultDemo() {
  const [value, setValue] = useState("some text here");

  return (
    <div className="grid gap-4">
      <SearchInput className="w-96">
        <SearchInputLeftElement>
          <Icon path={mdiMagnify} />
        </SearchInputLeftElement>
        <SearchInputField
          placeholder="Search"
          aria-label="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && (
          <SearchInputRightElement>
            <SearchInputClearButton
              onClear={() => setValue("")}
              tooltipLabel="Clear search"
            />
          </SearchInputRightElement>
        )}
      </SearchInput>
    </div>
  );
}
