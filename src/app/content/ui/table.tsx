import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = [
  {
    id: 1,
    sku: "SKU-001",
    name: "Item A",
    category: "Hardware",
    status: "Active",
    qty: "12",
    amount: "$120.00",
    updated: "Mar 01, 2025",
  },
  {
    id: 2,
    sku: "SKU-002",
    name: "Item B",
    category: "Software",
    status: "Pending",
    qty: "4",
    amount: "$89.50",
    updated: "Feb 28, 2025",
  },
  {
    id: 3,
    sku: "SKU-003",
    name: "Item C",
    category: "Hardware",
    status: "Active",
    qty: "28",
    amount: "$240.00",
    updated: "Feb 26, 2025",
  },
];

export default function TableDemo() {
  return (
    <div className="w-full max-w-[640px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SKU</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Qty</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="text-muted-foreground">{row.sku}</TableCell>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell className="text-right">{row.qty}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
              <TableCell>{row.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
