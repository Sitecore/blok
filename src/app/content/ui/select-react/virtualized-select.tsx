"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  type SelectReactOption,
  VirtualizedSelect,
} from "@/components/ui/virtualized-select";

function versionOptionIcon(major: number, minor: number) {
  return (
    <Avatar className="size-8 shrink-0">
      <AvatarFallback className="text-xs font-medium">
        {`${major}.${minor}`}
      </AvatarFallback>
    </Avatar>
  );
}

function createVersionOptions(count: number): SelectReactOption[] {
  const options: SelectReactOption[] = [];
  let x = 1;
  let y = 0;
  let z = 0;

  for (let i = 0; i < count; i++) {
    const version = `v${x}.${y}.${z}`;
    const release = `${x}.${y}.${z}`;

    options.push({
      value: version,
      label: version,
      description: `release ${release}`,
      icon: versionOptionIcon(x, y),
    });

    if (i === count - 1) break;

    z += 1;
    if (z > 9) {
      z = 0;
      y += 1;
      if (y > 9) {
        y = 0;
        x += 1;
      }
    }
  }

  return options;
}

const options = createVersionOptions(2000);

export default function VirtualizedSelectDemo() {
  return (
    <div className="p-2 w-[320px]">
      <VirtualizedSelect
        options={options}
        placeholder="Select a version"
        aria-label="Select a version"
      />
    </div>
  );
}
