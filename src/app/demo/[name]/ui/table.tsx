export const table = {
  name: "table",
  preview: {
    defaultComponent: "table",
  },
  usage: {
    usage: [
      `import {\n Table,\n TableHeader,\n TableBody,\n TableRow,\n TableCell,\n TableHead\n} from "@/components/ui/table";`,
      `<div className="w-full max-w-[640px]">\n <Table> {/* default size is md; use size="sm" | "lg" — Sticky: maxHeight={320} stickyHeader — Pinned: pinnedColumnsCount={2}, use pinned on first column(s) — Max: maxWidth, maxHeight */}\n <TableHeader>\n  <TableRow>\n   <TableHead>SKU</TableHead>\n   <TableHead>Name</TableHead>\n   <TableHead>Category</TableHead>\n   <TableHead>Status</TableHead>\n   <TableHead className="text-right">Qty</TableHead>\n   <TableHead className="text-right">Amount</TableHead>\n   <TableHead>Updated</TableHead>\n  </TableRow>\n </TableHeader>\n <TableBody>\n  <TableRow>\n   <TableCell className="text-muted-foreground">SKU-001</TableCell>\n   <TableCell className="font-medium">Item A</TableCell>\n   <TableCell>Hardware</TableCell>\n   <TableCell>Active</TableCell>\n   <TableCell className="text-right">12</TableCell>\n   <TableCell className="text-right">$120.00</TableCell>\n   <TableCell>Mar 01, 2025</TableCell>\n  </TableRow>\n </TableBody>\n</Table>\n</div>`,
    ],
  },
  components: {
    Small: { component: "table-sm" },
    Large: { component: "table-lg" },
    "Sticky header & scroll": { component: "table-sticky-scroll" },
    "Scroll & pin": { component: "table-pinned" },
  },
};
