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
    title: "Row 1",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "SA",
    dateTime: "Jul 01, 2024 10:37 PM",
  },
  {
    id: 2,
    title: "Row 2",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "JD",
    dateTime: "Jul 01, 2024 9:15 AM",
  },
  {
    id: 3,
    title: "Row 3",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "MK",
    dateTime: "Jun 30, 2024 4:20 PM",
  },
  {
    id: 4,
    title: "Row 4",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "SA",
    dateTime: "Jun 30, 2024 11:00 AM",
  },
  {
    id: 5,
    title: "Row 5",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "AL",
    dateTime: "Jun 29, 2024 2:45 PM",
  },
  {
    id: 6,
    title: "Row 6",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "JD",
    dateTime: "Jun 29, 2024 8:30 AM",
  },
  {
    id: 7,
    title: "Row 7",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "MK",
    dateTime: "Jun 28, 2024 6:00 PM",
  },
  {
    id: 8,
    title: "Row 8",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "SA",
    dateTime: "Jun 28, 2024 1:15 PM",
  },
  {
    id: 9,
    title: "Row 9",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "AL",
    dateTime: "Jun 27, 2024 9:45 AM",
  },
  {
    id: 10,
    title: "Row 10",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "JD",
    dateTime: "Jun 27, 2024 3:30 PM",
  },
  {
    id: 11,
    title: "Row 11",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "MK",
    dateTime: "Jun 26, 2024 10:20 AM",
  },
  {
    id: 12,
    title: "Row 12",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "SA",
    dateTime: "Jun 26, 2024 5:00 PM",
  },
  {
    id: 13,
    title: "Row 13",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "AL",
    dateTime: "Jun 25, 2024 11:40 AM",
  },
  {
    id: 14,
    title: "Row 14",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "JD",
    dateTime: "Jun 25, 2024 7:15 PM",
  },
  {
    id: 15,
    title: "Row 15",
    col1: "Text",
    col2: "Text",
    label: "Label",
    userInitials: "MK",
    dateTime: "Jun 24, 2024 2:00 PM",
  },
];

export default function TableStickyScrollDemo() {
  return (
    <div className="w-[680px] max-w-full">
      <Table size="md" maxHeight={320} stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Label</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
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
