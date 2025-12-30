"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiClose, mdiMagnify } from "@mdi/js";

export function FilterInput() {
  const [value, setValue] = React.useState("");

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <Icon
        path={mdiMagnify}
        className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50 size-5 pointer-events-none"
      />
      <Input
        type="input"
        placeholder="Search..."
        aria-label="Search"
        autoComplete="off"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 pr-10"
      />
      {value && (
        <Button
          onClick={handleClear}
          variant="ghost"
          size="icon"
          colorScheme="neutral"
          aria-label="Clear search"
          className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8 text-subtle-text hover:text-body-text focus:outline-none"
        >
          <Icon path={mdiClose} size={1} />
        </Button>
      )}
    </div>
  );
}

