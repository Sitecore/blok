"use client";

import { useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon as UiIcon } from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@/lib/icon";
import {
  mdiDotsHorizontal,
  mdiInformationOutline,
  mdiPencilOutline,
} from "@mdi/js";

const rows = [
  {
    id: 1,
    title: "Project Alpha",
    col1: "Text",
    col2: "Text",
    label: "In progress",
    userInitials: "JD",
    dateTime: "Jul 01, 2024 10:37 PM",
  },
  {
    id: 2,
    title: "Project Beta",
    col1: "Text",
    col2: "Text",
    label: "Complete",
    userInitials: "MK",
    dateTime: "Jun 28, 2024 3:20 PM",
  },
  {
    id: 3,
    title: "Project Gamma",
    col1: "Text",
    col2: "Text",
    label: "Draft",
    userInitials: "SA",
    dateTime: "Jun 25, 2024 11:00 AM",
  },
];

export default function TableLgDemo() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  const allSelected = useMemo(
    () => rows.length > 0 && selectedIds.size === rows.length,
    [selectedIds.size],
  );
  const someSelected = selectedIds.size > 0;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(rows.map((r) => r.id)));
    }
  };

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="w-full max-w-4xl">
      <Table size="lg">
        <TableHeader>
          <TableRow>
            <TableHead checkboxColumn>
              <Checkbox
                aria-label="Select all"
                checked={
                  allSelected ? true : someSelected ? "indeterminate" : false
                }
                onCheckedChange={toggleAll}
              />
            </TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead className="text-right" aria-hidden />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={selectedIds.has(row.id) ? "selected" : undefined}
            >
              <TableCell checkboxColumn>
                <Checkbox
                  aria-label={`Select ${row.title}`}
                  checked={selectedIds.has(row.id)}
                  onCheckedChange={() => toggleRow(row.id)}
                />
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <UiIcon
                    path={mdiInformationOutline}
                    variant="subtle"
                    colorScheme="neutral"
                    size="sm"
                    className="shrink-0"
                  />
                  <span className="font-semibold">{row.title}</span>
                </span>
              </TableCell>
              <TableCell>{row.col1}</TableCell>
              <TableCell>{row.col2}</TableCell>
              <TableCell>
                <Badge colorScheme="neutral" size="md">
                  {row.label}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <Avatar className="size-8 bg-teal-600 text-white">
                    <AvatarFallback className="bg-teal-600 text-white text-sm">
                      {row.userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{row.dateTime}</span>
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="inline-flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Edit"
                    className="text-muted-foreground"
                  >
                    <Icon path={mdiPencilOutline} size={1} className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="More actions"
                    className="text-muted-foreground"
                  >
                    <Icon
                      path={mdiDotsHorizontal}
                      size={1}
                      className="size-4"
                    />
                  </Button>
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
