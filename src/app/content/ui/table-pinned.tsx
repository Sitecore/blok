"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    title: "Product A",
    col1: "Data 1",
    col2: "Data 2",
    col3: "Data 3",
    label: "Label",
    userInitials: "SA",
    dateTime: "Jul 01, 2024 10:37 PM",
  },
  {
    id: 2,
    title: "Product B",
    col1: "Data 1",
    col2: "Data 2",
    col3: "Data 3",
    label: "Label",
    userInitials: "JD",
    dateTime: "Jun 30, 2024 3:20 PM",
  },
  {
    id: 3,
    title: "Product C",
    col1: "Data 1",
    col2: "Data 2",
    col3: "Data 3",
    label: "Label",
    userInitials: "MK",
    dateTime: "Jun 29, 2024 11:00 AM",
  },
];

export default function TablePinnedDemo() {
  return (
    <div className="w-full">
      <Table size="md" maxWidth={560} pinnedColumnsCount={2}>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[140px] sticky left-0 z-40 bg-body-bg">
              Label
            </TableHead>
            <TableHead className="min-w-[80px] sticky left-[140px] z-30 bg-body-bg">
              Label
            </TableHead>
            <TableHead className="relative z-0">Label</TableHead>
            <TableHead className="relative z-0">Label</TableHead>
            <TableHead className="relative z-0">Label</TableHead>
            <TableHead className="relative z-0">Label</TableHead>
            <TableHead className="relative z-0 text-right" aria-hidden />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="min-w-[140px] font-semibold sticky left-0 z-40 bg-body-bg">
                <span className="flex items-center gap-2">
                  <UiIcon
                    path={mdiInformationOutline}
                    variant="subtle"
                    colorScheme="neutral"
                    size="sm"
                    className="shrink-0"
                  />
                  {row.title}
                </span>
              </TableCell>
              <TableCell className="min-w-[80px] sticky left-[140px] z-30 bg-body-bg">
                {row.col1}
              </TableCell>
              <TableCell className="relative z-0">{row.col2}</TableCell>
              <TableCell className="relative z-0">{row.col3}</TableCell>
              <TableCell className="relative z-0">
                <Badge colorScheme="neutral" size="md">
                  {row.label}
                </Badge>
              </TableCell>
              <TableCell className="relative z-0">
                <span className="flex items-center gap-2">
                  <Avatar className="size-8 bg-teal-600 text-white">
                    <AvatarFallback className="bg-teal-600 text-white text-sm">
                      {row.userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{row.dateTime}</span>
                </span>
              </TableCell>
              <TableCell className="relative z-0 text-right">
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
