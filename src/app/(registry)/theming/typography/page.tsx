import fs from "node:fs";
import path from "node:path";
import { CopyableToken } from "@/components/docsite/copyable-token";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertCssVariablesToObject } from "@/lib/token-utils";

const cssPath = path.join(process.cwd(), "src", "app", "typography.css");
const typographyContent = fs.readFileSync(cssPath, "utf-8");

const fonts = [
  {
    token: "heading",
    value:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  {
    token: "body",
    value:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  {
    token: "mono",
    value:
      'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
];

const fontWeights = [
  { token: "normal", value: "400", example: "Normal text" },
  { token: "medium", value: "500", example: "Medium text" },
  { token: "semibold", value: "600", example: "Semibold text" },
];

export default function TypographyPage() {
  const typography = convertCssVariablesToObject(typographyContent, "--text-");

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-12">
        <h1 className="font-semibold text-4xl mb-2">Typography</h1>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <h2 className="font-semibold text-2xl ">Fonts</h2>
        <Alert variant="primary">
          <AlertDescription>
            <p>
              All text in this design system uses a{" "}
              <a
                href="https://css-tricks.com/snippets/css/system-font-stack/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 no-underline hover:underline"
              >
                system font stack
              </a>
              , a common practice in modern digital products. This means the
              font is inherited from the operating system of the user.
            </p>
          </AlertDescription>
        </Alert>
        <p className="text-muted-foreground">
          We use the following fonts families:
        </p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Token</TableHead>
                <TableHead className="px-4">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fonts.map((font) => (
                <TableRow key={font.token}>
                  <TableCell className="px-3 py-3">
                    <CopyableToken token={font.token} />
                  </TableCell>
                  <TableCell className="px-3 py-3">
                    <code className="font-mono text-xs break-all">
                      {font.value}
                    </code>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <h2 className="font-semibold text-2xl">Font Weights</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Token</TableHead>
                <TableHead className="px-4">Value</TableHead>
                <TableHead className="px-4">Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fontWeights.map((weight) => (
                <TableRow key={weight.token}>
                  <TableCell className="px-4 py-3">
                    <CopyableToken token={weight.token} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">{weight.value}</code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <p className={`font-${weight.token}`}>{weight.example}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <h2 className="font-semibold text-2xl ">Font Sizes</h2>
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
                      {Number.parseFloat(value) * 16}px
                    </code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <p className={`text-${key}`}>Text size {key}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
