import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export const table = {
  name: "table",
  defaultComponent: (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  usage: [
    `import {\n Table,\n TableHeader,\n TableBody,\n TableRow,\n TableCell,\n TableHead\n} from "@/components/ui/table";`,
    `<Table>\n <TableCaption>A list of your recent invoices.</TableCaption>\n <TableHeader>\n  <TableRow>\n   <TableHead className="w-[100px]">Invoice</TableHead>\n   <TableHead>Status</TableHead>\n   <TableHead>Method</TableHead>\n   <TableHead className="text-right">Amount</TableHead>\n  </TableRow>\n </TableHeader>\n <TableBody>\n  <TableRow>\n   <TableCell className="font-medium">INV001</TableCell>\n   <TableCell>Paid</TableCell>\n   <TableCell>Credit Card</TableCell>\n   <TableCell className="text-right">$250.00</TableCell>\n  </TableRow>\n </TableBody>\n</Table>`,
  ],
};
