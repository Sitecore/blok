"use client";
import * as React from "react";
import { ActionBar } from "@/components/ui/action-bar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  mdiArchiveOutline,
  mdiCloudOffOutline,
  mdiCloudUploadOutline,
  mdiContentCopy,
  mdiTrashCanOutline,
} from "@mdi/js";
import { useState } from "react";

export function ActionBarDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const handlePublish = React.useCallback(() => {
    console.log("Publish clicked");
  }, []);

  const handleUnpublish = React.useCallback(() => {
    console.log("Unpublish clicked");
  }, []);

  const handleDuplicate = React.useCallback(() => {
    console.log("Duplicate clicked");
  }, []);

  const handleArchive = React.useCallback(() => {
    console.log("Archive clicked");
  }, []);

  const handleDelete = React.useCallback(() => {
    console.log("Delete clicked");
  }, []);

  const buttons = React.useMemo(
    () => [
      {
        label: "Publish",
        icon: mdiCloudUploadOutline,
        onClick: handlePublish,
        variant: "outline" as const,
        colorScheme: "neutral" as const,
      },
      {
        label: "Unpublish",
        icon: mdiCloudOffOutline,
        onClick: handleUnpublish,
        variant: "outline" as const,
        colorScheme: "neutral" as const,
      },
      {
        label: "Duplicate",
        icon: mdiContentCopy,
        onClick: handleDuplicate,
        variant: "default" as const,
        colorScheme: "primary" as const,
      },
    ],
    [handlePublish, handleUnpublish, handleDuplicate]
  );

  const menuItems = React.useMemo(
    () => [
      {
        label: "Archive",
        icon: mdiArchiveOutline,
        onClick: handleArchive,
        variant: "default" as const,
      },
      {
        label: "Delete",
        icon: mdiTrashCanOutline,
        onClick: handleDelete,
        variant: "destructive" as const,
      },
    ],
    [handleArchive, handleDelete]
  );

  return (
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
  );
}
