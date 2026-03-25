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

export default function TableDemo() {
  return (
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
          {rows.map((row) => (
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
  );
}
