import fs from "node:fs";
import path from "node:path";
import { BreakpointsClient } from "./breakpoints-client";

const cssPath = path.join(process.cwd(), "src", "app", "breakpoints.css");
const breakpoints = fs.readFileSync(cssPath, "utf-8");

export default function BreakpointsPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl mb-2">Breakpoints</h1>
      </div>
      <BreakpointsClient content={breakpoints} />
    </div>
  );
}
