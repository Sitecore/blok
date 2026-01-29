import fs from "node:fs";
import path from "node:path";
import { CopyableToken } from "@/components/docsite/copyable-token";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertCssVariablesToObject } from "@/lib/token-utils";

const cssPath = path.join(process.cwd(), "src", "app", "borderRadius.css");
const borderRadiusContent = fs.readFileSync(cssPath, "utf-8");

const NOTES: Record<string, string> = {
  md: "The most common radius. Used on many elements, such as inputs, cards, tags, and more.",
  lg: "The preferred larger rounded. Used on modals and large panels.",
  full: "Used for circular elements, such as avatars and buttons.",
};

export default function BorderRadiusPage() {
  const borderRadiuses = convertCssVariablesToObject(
    borderRadiusContent,
    "--rounded-",
  );

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl mb-2">Border radius</h1>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Example</TableHead>
              <TableHead className="px-4">Token</TableHead>
              <TableHead className="px-4">Value</TableHead>
              <TableHead className="px-4">PX</TableHead>
              <TableHead className="px-4">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(borderRadiuses).map(([key, value]) => {
              const pxValue = Number.parseFloat(value) * 16;

              return (
                <TableRow key={key}>
                  <TableCell className="px-4 py-3">
                    <div
                      className="h-16 w-16 min-w-16 bg-pink-200"
                      style={{ borderRadius: value }}
                    />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <CopyableToken token={key} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">{value}</code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">
                      {Number.isNaN(pxValue) ? value : `${pxValue}px`}
                    </code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">
                      {NOTES[key] || ""}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
