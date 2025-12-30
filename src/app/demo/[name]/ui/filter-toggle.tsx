"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiClose } from "@mdi/js";
import { cn } from "@/lib/utils";

export function FilterToggle() {
  const [defaultActive, setDefaultActive] = React.useState(false);
  const [primaryActive, setPrimaryActive] = React.useState(false);

  const handleDefaultToggle = () => {
    setDefaultActive((prev) => !prev);
  };

  const handlePrimaryToggle = () => {
    setPrimaryActive((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* //Default Toggle */}
      <Button
        onClick={handleDefaultToggle}
        variant="outline"
        className={cn(
          "w-fit rounded-md px-3 py-2 h-9",
          defaultActive && "bg-neutral-bg"
        )}
      >
        <span className="font-medium">Assigned to me</span>
      </Button>
      {/* //Primary Toggle */}
      <Button
        onClick={handlePrimaryToggle}
        variant="outline"
        className={cn(
          "w-fit rounded-md px-3 py-2 h-9",
          primaryActive &&
            "bg-primary-bg text-primary-fg border-primary hover:bg-primary-bg hover:text-primary-fg"
        )}
      >
        <span className="font-medium">Assigned to me</span>
        {primaryActive && (
          <span
            className="cursor-pointer rounded-full p-0.5 hover:bg-neutral-bg-active flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setPrimaryActive(false);
            }}
          >
            <Icon path={mdiClose} size={1.1} className="pointer-events-none" />
          </span>
        )}
      </Button>
    </div>
  );
}

