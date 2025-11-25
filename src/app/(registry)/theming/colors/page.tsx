import fs from "fs";
import path from "path";
import { ColorsClient } from "./colors-client";

let cssPath = path.join(process.cwd(), "src", "app", "colors.css");
const colorsContent = fs.readFileSync(cssPath, "utf-8");

cssPath = path.join(process.cwd(), "src", "app", "globals.css");
const globalsContent = fs.readFileSync(cssPath, "utf-8");

const combinedColorsContent = `${colorsContent}\n${globalsContent}`;

export default function ColorsPage() {
  return (
    <div className="container p-5 md:p-10 xl:pr-[250px]">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl tracking-tight mb-2">Colors</h1>
      </div>
      <ColorsClient content={combinedColorsContent} />
    </div>
  );
}
