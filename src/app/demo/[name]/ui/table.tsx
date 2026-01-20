export const table = {
  name: "table",
  preview: {
    defaultComponent: "table",
  },
  usage: {
    usage: [
      `import {\n Table,\n TableHeader,\n TableBody,\n TableRow,\n TableCell,\n TableHead\n} from "@/components/ui/table";`,
      `<Table>\n <TableCaption>A list of your recent invoices.</TableCaption>\n <TableHeader>\n  <TableRow>\n   <TableHead className="w-[100px]">Invoice</TableHead>\n   <TableHead>Status</TableHead>\n   <TableHead>Method</TableHead>\n   <TableHead className="text-right">Amount</TableHead>\n  </TableRow>\n </TableHeader>\n <TableBody>\n  <TableRow>\n   <TableCell className="font-medium">INV001</TableCell>\n   <TableCell>Paid</TableCell>\n   <TableCell>Credit Card</TableCell>\n   <TableCell className="text-right">$250.00</TableCell>\n  </TableRow>\n </TableBody>\n</Table>`,
    ]
  },
  components: {
    "Data table": { component: "table-data", },
  }
};
 
