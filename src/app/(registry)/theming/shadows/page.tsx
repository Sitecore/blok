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
import { Card, CardContent } from "@/components/ui/card";
import { CopyableToken } from "@/components/docsite/copyable-token";

const cssPath = path.join(process.cwd(), "src", "app", "shadows.css");
const shadowsContent = fs.readFileSync(cssPath, "utf-8");

const NOTES: Record<string, string> = {
  xs: "Looks like a light 1px border",
  base: "Top bar",
  lg: "Modal, Drawer",
  outline: "Used as focus ring",
  "dark-lg": "Only used in dark mode",
};

export default function ShadowsPage() {
  const shadows = convertCssVariablesToObject(shadowsContent, "--shadow-");

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl mb-2">Shadows</h1>
      </div>
      <Card style="filled">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Example</TableHead>
                <TableHead className="px-4">Token</TableHead>
                <TableHead className="px-4">Value</TableHead>
                <TableHead className="px-4">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(shadows).map(([key, value]) => {
                return (
                  <TableRow key={key}>
                    <TableCell className="px-4 py-3">
                      <div
                        className="h-16 w-16 min-w-16 rounded-md bg-background"
                        style={{ boxShadow: value }}
                      />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <CopyableToken token={key} />
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <code className="font-mono text-sm">{value}</code>
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
        </CardContent>
      </Card>
    </div>
  );
}
