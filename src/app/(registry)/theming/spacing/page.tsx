"use client";

import { CopyableToken } from "@/components/docsite/copyable-token";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SpacingData = {
  name: string;
  spacing: string;
  pixels: string;
};

const SPACING_DATA: SpacingData[] = [
  { name: "0", spacing: "0px", pixels: "0px" },
  { name: "px", spacing: "1px", pixels: "1px" },
  { name: "0.5", spacing: "0.125rem", pixels: "2px" },
  { name: "1", spacing: "0.25rem", pixels: "4px" },
  { name: "1.5", spacing: "0.375rem", pixels: "6px" },
  { name: "2", spacing: "0.5rem", pixels: "8px" },
  { name: "2.5", spacing: "0.625rem", pixels: "10px" },
  { name: "3", spacing: "0.75rem", pixels: "12px" },
  { name: "3.5", spacing: "0.875rem", pixels: "14px" },
  { name: "4", spacing: "1rem", pixels: "16px" },
  { name: "5", spacing: "1.25rem", pixels: "20px" },
  { name: "6", spacing: "1.5rem", pixels: "24px" },
  { name: "7", spacing: "1.75rem", pixels: "28px" },
  { name: "8", spacing: "2rem", pixels: "32px" },
  { name: "9", spacing: "2.25rem", pixels: "36px" },
  { name: "10", spacing: "2.5rem", pixels: "40px" },
  { name: "11", spacing: "2.75rem", pixels: "44px" },
  { name: "12", spacing: "3rem", pixels: "48px" },
  { name: "14", spacing: "3.5rem", pixels: "56px" },
  { name: "16", spacing: "4rem", pixels: "64px" },
  { name: "20", spacing: "5rem", pixels: "80px" },
  { name: "24", spacing: "6rem", pixels: "96px" },
  { name: "28", spacing: "7rem", pixels: "112px" },
  { name: "32", spacing: "8rem", pixels: "128px" },
  { name: "36", spacing: "9rem", pixels: "144px" },
  { name: "40", spacing: "10rem", pixels: "160px" },
  { name: "44", spacing: "11rem", pixels: "176px" },
  { name: "48", spacing: "12rem", pixels: "192px" },
  { name: "52", spacing: "13rem", pixels: "208px" },
  { name: "56", spacing: "14rem", pixels: "224px" },
  { name: "60", spacing: "15rem", pixels: "240px" },
  { name: "64", spacing: "16rem", pixels: "256px" },
  { name: "72", spacing: "18rem", pixels: "288px" },
  { name: "80", spacing: "20rem", pixels: "320px" },
  { name: "96", spacing: "24rem", pixels: "384px" },
];

export default function SpacingPage() {
  const getPixelValue = (pixels: string): number => {
    return Number.parseInt(pixels.replace("px", ""), 10);
  };

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl mb-2">Spacing</h1>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Token</TableHead>
              <TableHead className="px-4">Value</TableHead>
              <TableHead className="px-4">PX</TableHead>
              <TableHead className="px-4 min-w-[400px]">Example</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SPACING_DATA.map((item) => {
              const pixelValue = getPixelValue(item.pixels);
              const previewWidth = pixelValue;

              return (
                <TableRow key={item.name}>
                  <TableCell className="px-4 py-3">
                    <CopyableToken token={item.name} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">{item.spacing}</code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">{item.pixels}</code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div
                      className="bg-primary"
                      style={{
                        width: `${previewWidth}px`,
                        height: "20px",
                        borderRadius: "4px",
                        minWidth: pixelValue === 0 ? "1px" : undefined,
                        border:
                          pixelValue === 0 ? "1px dashed #ccc" : undefined,
                      }}
                      title={`${item.pixels} preview`}
                    />
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
