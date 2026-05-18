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
    title: "Blok",
    label: "GA",
    userInitials: "BK",
    dateTime: "Mar 12, 2025 2:15 PM",
  },
  {
    id: 2,
    title: "Component Builder",
    label: "Preview",
    userInitials: "CB",
    dateTime: "Mar 12, 2025 1:50 PM",
  },
  {
    id: 3,
    title: "Sitecore AI",
    label: "Beta",
    userInitials: "AI",
    dateTime: "Mar 12, 2025 11:20 AM",
  },
  {
    id: 4,
    title: "XM Cloud",
    label: "GA",
    userInitials: "XM",
    dateTime: "Mar 11, 2025 4:40 PM",
  },
  {
    id: 5,
    title: "Content Hub ONE",
    label: "GA",
    userInitials: "CH",
    dateTime: "Mar 11, 2025 10:05 AM",
  },
  {
    id: 6,
    title: "Sitecore Personalize",
    label: "GA",
    userInitials: "PR",
    dateTime: "Mar 10, 2025 3:30 PM",
  },
  {
    id: 7,
    title: "Sitecore Search",
    label: "Preview",
    userInitials: "SR",
    dateTime: "Mar 10, 2025 9:15 AM",
  },
  {
    id: 8,
    title: "OrderCloud",
    label: "GA",
    userInitials: "OC",
    dateTime: "Mar 09, 2025 5:00 PM",
  },
  {
    id: 9,
    title: "Sitecore CDP",
    label: "GA",
    userInitials: "CD",
    dateTime: "Mar 09, 2025 12:45 PM",
  },
  {
    id: 10,
    title: "Experience Edge",
    label: "GA",
    userInitials: "EE",
    dateTime: "Mar 08, 2025 4:55 PM",
  },
  {
    id: 11,
    title: "Sitecore Connect",
    label: "Beta",
    userInitials: "SC",
    dateTime: "Mar 08, 2025 8:10 AM",
  },
  {
    id: 12,
    title: "Page Builder",
    label: "GA",
    userInitials: "PB",
    dateTime: "Mar 07, 2025 2:25 PM",
  },
  {
    id: 13,
    title: "Sitecore Forms",
    label: "GA",
    userInitials: "SF",
    dateTime: "Mar 07, 2025 9:00 AM",
  },
  {
    id: 14,
    title: "SXA",
    label: "GA",
    userInitials: "SX",
    dateTime: "Mar 06, 2025 3:40 PM",
  },
  {
    id: 15,
    title: "Experience Editor",
    label: "GA",
    userInitials: "XE",
    dateTime: "Mar 06, 2025 11:55 AM",
  },
];

export default function TableStickyScrollDemo() {
  return (
    <div className="w-[680px] max-w-full">
      <Table size="md" maxHeight={320} stickyHeader>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Last activity</TableHead>
            <TableHead className="text-right" aria-hidden />
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
