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
  
const rowsTable = [
  {
    id: 1,
    product: "Blok",
    category: "Developer experience",
    status: "GA",
    workspaces: "18",
    tier: "Standard",
  },
  {
    id: 2,
    product: "Component Builder",
    category: "Composable authoring",
    status: "Preview",
    workspaces: "6",
    tier: "Enterprise",
  },
  {
    id: 3,
    product: "Sitecore AI",
    category: "AI & intelligent automation",
    status: "Beta",
    workspaces: "42",
    tier: "Add-on",
  },
  {
    id: 4,
    product: "XM Cloud",
    category: "Composable DXP",
    status: "GA",
    workspaces: "31",
    tier: "Enterprise",
  },
];

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

const rowsStickyHeader = [
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

const rowsScrollPin = [
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
  
export function TableDemo() {

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
      <div>
        <h2 className="font-semibold text-4xl wrap-break-words">Table</h2>
        {/* Feature Table */}
        <div id="table">
          <div className="w-full max-w-3xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Teams</TableHead>
                  <TableHead className="text-right">Entitlement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rowsTable.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.product}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell className="text-right">{row.workspaces}</TableCell>
                    <TableCell className="text-right">{row.tier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

      <br />

        {/* Small Table */}
        <div id="table-small">
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
        </div>

        <br />

        {/* Large Table */}
        <div id="table-large">
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
        </div> 

        <br />

        {/* Sticky Header Table */}
        <div id="table-sticky-header">
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
                {rowsStickyHeader.map((row) => (
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
        </div>

        <br />

        {/* Scroll Pin Table */}
        <div id="table-scroll-pin">
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
                {rowsScrollPin.map((row) => (
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
        </div>

      </div>
    );
}