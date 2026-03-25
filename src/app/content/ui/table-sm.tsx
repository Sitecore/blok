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
    title: "Blok",
    category: "Developer experience",
    label: "GA",
    userInitials: "BK",
    dateTime: "Mar 12, 2025 2:15 PM",
  },
  {
    id: 2,
    title: "Component Builder",
    category: "Composable authoring",
    label: "Preview",
    userInitials: "CB",
    dateTime: "Mar 11, 2025 9:40 AM",
  },
  {
    id: 3,
    title: "Sitecore AI",
    category: "Intelligent automation",
    label: "Beta",
    userInitials: "AI",
    dateTime: "Mar 10, 2025 4:22 PM",
  },
  {
    id: 4,
    title: "XM Cloud",
    category: "Composable DXP",
    label: "GA",
    userInitials: "XM",
    dateTime: "Mar 09, 2025 11:05 AM",
  },
];

export default function TableSmDemo() {
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
      <Table size="sm">
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
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Last activity</TableHead>
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
              <TableCell>{row.category}</TableCell>
              <TableCell>
                <Badge colorScheme="neutral" size="sm">
                  {row.label}
                </Badge>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  <Avatar className="size-6 bg-teal-600 text-white">
                    <AvatarFallback className="bg-teal-600 text-white text-xs">
                      {row.userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{row.dateTime}</span>
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
