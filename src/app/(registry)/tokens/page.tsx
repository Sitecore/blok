import fs from "fs";
import path from "path";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BorderRadiusDemo from "./components/border-radius-theme";
import ColorsDemo from "./components/colors-theme";
import { ComponentWrapper } from "./component-wrapper";
import ShadowDemo from "./components/shadow-theme";
import TypographyDemo from "./components/typography-theme";
import BreakpointsDemo from "./components/breakpoint-theme";

let cssPath = path.join(process.cwd(), "src", "app", "colors.css");
const colorsContent = fs.readFileSync(cssPath, "utf-8");

cssPath = path.join(process.cwd(), "src", "app", "typography.css");
const typographyContent = fs.readFileSync(cssPath, "utf-8");

cssPath = path.join(process.cwd(), "src", "app", "borderRadius.css");
const borderRadiusContent = fs.readFileSync(cssPath, "utf-8");

cssPath = path.join(process.cwd(), "src", "app", "shadows.css");
const shadowsContent = fs.readFileSync(cssPath, "utf-8");


cssPath = path.join(process.cwd(), "src", "app", "breakpoints.css");
const breakpoints = fs.readFileSync(cssPath, "utf-8");

export default function TokensPage() {
  return (
    <div className="@container grid flex-1 p-4">
      <div className="container p-5 md:p-10">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>

          <h1 className="font-bold text-3xl tracking-tight">Design Tokens</h1>
          <p className="mt-1 text-muted-foreground">
            A comprehensive overview of all color tokens used in the design
            system
          </p>
        </div>
        <div className=" flex flex-col gap-5">
          <ComponentWrapper name="border-radius">
            <BorderRadiusDemo content={borderRadiusContent} />
          </ComponentWrapper>
          <ComponentWrapper name="colors">
            <ColorsDemo content={colorsContent} />
          </ComponentWrapper>
          <ComponentWrapper name="shadows">
            <ShadowDemo content={shadowsContent} />
          </ComponentWrapper>
          <ComponentWrapper name="typography">
            <TypographyDemo content={typographyContent} />
          </ComponentWrapper>
             <ComponentWrapper name="breakpoints">
            <BreakpointsDemo content={breakpoints} />
          </ComponentWrapper>
        </div>
      </div>
    </div>
  );
}
