"use client";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React from "react";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex rounded-t-md bg-body-bg">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex w-full flex-col gap-2 md:w-[350px]"
      >
        <div className="flex items-center justify-between gap-4 px-4">
          <h4 className="line-clamp-1 text-sm font-semibold">
            @products
          </h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" colorScheme={"neutral"} size="icon" aria-label="Toggle collapsible content">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
          @XMCloud
        </div>
        <CollapsibleContent className="flex flex-col gap-2">
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
            @ContentHub
          </div>
          <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-xs">
            @CDP
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
