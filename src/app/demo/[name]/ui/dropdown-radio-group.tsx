"use client"

import { Button } from "@/components/ui/button";
import * as React from "react";
import { DropdownMenu, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuGroup, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

export function DropdownMenuRadioGroupDemo() {
    const [position, setPosition] = React.useState("bottom");
  
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" colorScheme="neutral">
            Radio Group
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel inset>Panel Position</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
              <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right" disabled>
                Right
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }