import fs from "fs";
import path from "path";
import { convertCssVariablesToObject } from "@/lib/token-utils";
import { TypographyClient } from "./typography-client";

const cssPath = path.join(process.cwd(), "src", "app", "typography.css");
const typographyContent = fs.readFileSync(cssPath, "utf-8");

export default function TypographyPage() {
  const typography = convertCssVariablesToObject(typographyContent, "--text-");

  return (
    <div className="container p-5 md:p-10 xl:pr-[250px]">
      <div className="mb-8">
        <h1 className="font-bold text-4xl tracking-tight mb-2">Typography</h1>
      </div>
      <TypographyClient typography={typography} />
    </div>
  );
}
