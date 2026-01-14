"use client";
import { ActionBar } from "@/components/ui/action-bar";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  mdiCloudUploadOutline,
  mdiCloudOffOutline,
  mdiContentCopy,
  mdiArchiveOutline,
  mdiTrashCanOutline,
} from "@mdi/js";

export function ActionBarDemo() {

  const [isOpen, setIsOpen] = useState(false);
  const buttons = [
    {
      label: "Publish",
      icon: mdiCloudUploadOutline,
      onClick: () => console.log("Publish clicked"),
      variant: "outline" as const,
      colorScheme: "neutral" as const,
    },
    {
      label: "Unpublish",
      icon: mdiCloudOffOutline,
      onClick: () => console.log("Unpublish clicked"),
      variant: "outline" as const,
      colorScheme: "neutral" as const,
    },
    {
      label: "Duplicate",
      icon: mdiContentCopy,
      onClick: () => console.log("Duplicate clicked"),
      variant: "default" as const,
      colorScheme: "primary" as const,
    },
  ];
  const menuItems = [
    {
      label: "Archive",
      icon: mdiArchiveOutline,
      onClick: () => console.log("Archive clicked"),
      variant: "default" as const,
    },
    {
      label: "Delete",
      icon: mdiTrashCanOutline,
      onClick: () => console.log("Delete clicked"),
      variant: "destructive" as const,
    },
  ];

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Action Bar</h2>

        <div id="action-bar">
          <div className="relative w-full overflow-hidden rounded-md ">
            <div className="flex items-center gap-2 p-4">
              <Checkbox
                id="action-bar-checkbox"
                checked={isOpen}
                onCheckedChange={(checked) => setIsOpen(checked === true)}
              />
              <label
                htmlFor="action-bar-checkbox"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Show action bar
              </label>
            </div>
            <ActionBar
              isOpen={isOpen}
              onOpenChange={setIsOpen}
              selectedCount={3}
              buttons={buttons}
              menuItems={menuItems}
            />
          </div>
        </div>

    </div>
  );
}