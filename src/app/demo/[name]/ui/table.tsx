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
import { TableDemo } from "@/app/demo/[name]/ui/table-demo";

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

export const table = {
  name: "table",
  defaultComponent: (
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
  ),
  usage: [
    `import {\n Table,\n TableHeader,\n TableBody,\n TableRow,\n TableCell,\n TableHead\n} from "@/components/ui/table";`,
    `<Table>\n <TableCaption>A list of your recent invoices.</TableCaption>\n <TableHeader>\n  <TableRow>\n   <TableHead className="w-[100px]">Invoice</TableHead>\n   <TableHead>Status</TableHead>\n   <TableHead>Method</TableHead>\n   <TableHead className="text-right">Amount</TableHead>\n  </TableRow>\n </TableHeader>\n <TableBody>\n  <TableRow>\n   <TableCell className="font-medium">INV001</TableCell>\n   <TableCell>Paid</TableCell>\n   <TableCell>Credit Card</TableCell>\n   <TableCell className="text-right">$250.00</TableCell>\n  </TableRow>\n </TableBody>\n</Table>`,
  ],
  components: {
    "Data table": ( <TableDemo />)
  }
};
 
