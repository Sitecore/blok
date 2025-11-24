import fs from "fs";
import path from "path";
import { convertCssVariablesToObject } from "@/lib/token-utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CopyableToken } from "@/components/docsite/copyable-token";

const cssPath = path.join(process.cwd(), "src", "app", "typography.css");
const typographyContent = fs.readFileSync(cssPath, "utf-8");

export default function TypographyPage() {
  const typography = convertCssVariablesToObject(typographyContent, "--text-");

  return (
    <div className="container p-5 md:p-10 xl:pr-[250px]">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl tracking-tight mb-2">Typography</h1>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Token</TableHead>
              <TableHead className="px-4">Value</TableHead>
              <TableHead className="px-4">PX</TableHead>
              <TableHead className="px-4">Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(typography).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell className="px-4 py-3">
                  <CopyableToken token={key} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <code className="font-mono text-sm">{value}</code>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <code className="font-mono text-sm">
                    {parseFloat(value) * 16}px
                  </code>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <p className={`text-${key}`}>text-{key}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
