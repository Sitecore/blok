export const table = {
  name: "table",
  preview: {
    defaultComponent: "table",
  },
  usage: {
    usage: [
      `import {\n Table,\n TableHeader,\n TableBody,\n TableRow,\n TableCell,\n TableHead\n} from "@/components/ui/table";`,
      `<div className="w-full max-w-3xl">\n <Table> {/* default size is md; use size="sm" | "lg" — Sticky: maxHeight={320} stickyHeader — Pinned: pinnedColumnsCount={2}, use pinned on first column(s) — Max: maxWidth, maxHeight */}\n <TableHeader>\n  <TableRow>\n   <TableHead>Product</TableHead>\n   <TableHead>Category</TableHead>\n   <TableHead>Status</TableHead>\n   <TableHead className="text-right">Teams</TableHead>\n   <TableHead className="text-right">Entitlement</TableHead>\n  </TableRow>\n </TableHeader>\n <TableBody>\n  <TableRow>\n   <TableCell className="font-medium">Blok</TableCell>\n   <TableCell>Developer experience</TableCell>\n   <TableCell>GA</TableCell>\n   <TableCell className="text-right">18</TableCell>\n   <TableCell className="text-right">Standard</TableCell>\n  </TableRow>\n </TableBody>\n</Table>\n</div>`,
    ],
  },
  components: {
    Small: { component: "table-sm" },
    Large: { component: "table-lg" },
    "Sticky header & scroll": { component: "table-sticky-scroll" },
    "Scroll & pin": { component: "table-pinned" },
  },
};
