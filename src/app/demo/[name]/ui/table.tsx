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

export const featureTable = [
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
  components: {
    Default: (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Feature</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Benefit</TableHead>
            <TableHead className="text-left">Use case</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {featureTable.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.feature}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.benefit}</TableCell>
              <TableCell className="text-left">{item.useCase}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
  },
};
