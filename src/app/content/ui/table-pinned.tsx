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
    currentUsers: "48k+",
    col2: "Design tokens · React · Storybook",
    label: "GA",
    userInitials: "BK",
    dateTime: "Mar 12, 2025 2:15 PM",
  },
  {
    id: 2,
    title: "Component Builder",
    currentUsers: "125k+",
    col2: "Figma · design–dev handoff",
    label: "Preview",
    userInitials: "CB",
    dateTime: "Mar 11, 2025 9:40 AM",
  },
  {
    id: 3,
    title: "Sitecore AI",
    currentUsers: "890k+",
    col2: "Copilots · XM · Content Hub",
    label: "Beta",
    userInitials: "AI",
    dateTime: "Mar 10, 2025 4:22 PM",
  },
  {
    id: 4,
    title: "XM Cloud",
    currentUsers: "2.4M+",
    col2: "Edge · Search · headless APIs",
    label: "GA",
    userInitials: "XM",
    dateTime: "Mar 09, 2025 11:05 AM",
  },
];

export default function TablePinnedDemo() {
  return (
    <div className="w-full">
      <Table size="md" maxWidth={560} pinnedColumnsCount={2}>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 z-40 w-[200px] min-w-[200px] max-w-[200px] bg-body-bg">
              Product
            </TableHead>
            <TableHead className="sticky left-[200px] z-30 w-[132px] min-w-[132px] max-w-[132px] bg-body-bg text-right text-xs">
              Current users
            </TableHead>
            <TableHead className="relative z-0">Capabilities</TableHead>
            <TableHead className="relative z-0">Availability</TableHead>
            <TableHead className="relative z-0">Last activity</TableHead>
            <TableHead className="relative z-0 text-right" aria-hidden />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="sticky left-0 z-40 w-[200px] min-w-[200px] max-w-[200px] bg-body-bg font-semibold">
                <span className="flex min-w-0 items-center gap-2">
                  <UiIcon
                    path={mdiInformationOutline}
                    variant="subtle"
                    colorScheme="neutral"
                    size="sm"
                    className="shrink-0"
                  />
                  <span className="min-w-0 truncate">{row.title}</span>
                </span>
              </TableCell>
              <TableCell className="sticky left-[200px] z-30 w-[132px] min-w-[132px] max-w-[132px] bg-body-bg text-right tabular-nums font-medium">
                {row.currentUsers}
              </TableCell>
              <TableCell className="relative z-0">{row.col2}</TableCell>
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
