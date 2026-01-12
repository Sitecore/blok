"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { ArrowDown, ArrowUp } from "lucide-react";
  
  const featureTable = [
    {
      feature: "Personalization",
      description: "Deliver tailored experiences based on user behavior and preferences.",
      benefit: "Increase engagement and conversion rates.",
      useCase: "Personalized product recommendations on e-commerce sites.",
    },
    {
      feature: "Composable DXP",
      description: "Modular architecture for flexibility and scalability.",
      benefit: "Faster innovation and reduced time-to-market.",
      useCase: "Launching new microsites without disrupting existing systems.",
    },
    {
      feature: "Content Management",
      description: "Centralized platform for creating and managing digital content.",
      benefit: "Consistent brand messaging across channels.",
      useCase: "Managing global campaigns with localized content.",
    },
    {
      feature: "AI-Powered Insights",
      description: "Predictive analytics and automated recommendations.",
      benefit: "Smarter decisions and optimized campaigns.",
      useCase: "Using AI to optimize ad spend and predict customer churn.",
    },
  ];

  export type Product_Data = {
    id: number;
    Keyword: string;
    Clicks: number;
    CTR: string;
    Change: string;
    Views: number;
    Visits: number;
    Unique_views: number;
  };

  export const data: Product_Data[] = [
    {
      id: 1,
      Keyword: "Product search",
      Clicks: 235,
      CTR: "24.00%",
      Change: "+50.8K",
      Views: 235,
      Visits: 235,
      Unique_views: 235,
    },
    {
      id: 2,
      Keyword: "Pricing",
      Clicks: 2032,
      CTR: "15.20%",
      Change: "-5 sec",
      Views: 2032,
      Visits: 2032,
      Unique_views: 2032,
    },
    {
      id: 3,
      Keyword: "Features",
      Clicks: 1245,
      CTR: "8.20%",
      Change: "+50.8K",
      Views: 1245,
      Visits: 1245,
      Unique_views: 1245,
    },
    {
      id: 4,
      Keyword: "Support",
      Clicks: 456,
      CTR: "21.40%",
      Change: "+50.8K",
      Views: 456,
      Visits: 456,
      Unique_views: 456,
    },
  ];

  export const columns: ColumnDef<Product_Data>[] = [
    { accessorKey: "Keyword", header: "Keyword" },
    { accessorKey: "Clicks", header: "Clicks" },
    { accessorKey: "CTR", header: "CTR" },
    {
      accessorKey: "Change",
      header: "Change",
      cell: ({ row }) => {
        const rawValue: string = row.getValue("Change");
        const isPositive = rawValue.startsWith("+");
        const isNegative = rawValue.startsWith("-");
        const cleanValue = rawValue.replace(/^[-+]/, "").trim();
        return (
          <span
            className={`flex items-center gap-1 ${
              isPositive ? "text-green-500" : isNegative ? "text-red-500" : ""
            }`}
          >
            {isPositive && <ArrowUp size={11} />}
            {isNegative && <ArrowDown size={11} />}
            {cleanValue}
          </span>
        );
      },
    },
    { accessorKey: "Views", header: "Views" },
    { accessorKey: "Visits", header: "Visits" },
    { accessorKey: "Unique_views", header: "Unique views" },
  ];
  
export function TableDemo() {

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });
  
    return (
      <div>
        <h2 className="font-semibold text-4xl wrap-break-words">Table</h2>
        {/* Feature Table */}
        <div id="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Feature</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
                <TableHead className="w-[250px]">Benefit</TableHead>
                <TableHead className="text-left w-[300px]">Use case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featureTable.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium break-words whitespace-normal">{item.feature}</TableCell>
                  <TableCell className="break-words whitespace-normal">{item.description}</TableCell>
                  <TableCell className="break-words whitespace-normal">{item.benefit}</TableCell>
                  <TableCell className="text-left break-words whitespace-normal">{item.useCase}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      <br />

        {/* Data Table */}
        <div id="data-table">
        <div className="w-full">
          <Table className="table-fixed">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={`py-4 ${
                        header.column.id === "Keyword" ? "font-semibold" : ""
                      }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={`py-4 ${
                          cell.column.id === "Keyword" ? "font-semibold" : ""
                        }`}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        </div>
      </div>
    );
}