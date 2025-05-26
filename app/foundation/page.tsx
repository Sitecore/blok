import fs from "fs"
import path from "path"

import BorderRadiusDemo from "@/components/border-radius-demo"
import BreakpointsDemo from "@/components/breakpoints-demo"
import ColorsDemo from "@/components/colors-demo"
import { ComponentWrapper } from "@/components/component-wrapper"
import ShadowDemo from "@/components/shadow-demo"
import TypographyDemo from "@/components/typography-demo"

let cssPath = path.join(process.cwd(), "app", "colors.css")
const colorsContent = fs.readFileSync(cssPath, "utf-8")

cssPath = path.join(process.cwd(), "app", "typography.css")
const typographyContent = fs.readFileSync(cssPath, "utf-8")

cssPath = path.join(process.cwd(), "app", "breakpoints.css")
const breakpointsContent = fs.readFileSync(cssPath, "utf-8")

cssPath = path.join(process.cwd(), "app", "borderRadius.css")
const borderRadiusContent = fs.readFileSync(cssPath, "utf-8")

cssPath = path.join(process.cwd(), "app", "shadows.css")
const shadowsContent = fs.readFileSync(cssPath, "utf-8")

export default function BlocksPage() {
  return (
    <div className="@container grid flex-1 gap-4 p-4">
      <ComponentWrapper name="border-radius">
        <BorderRadiusDemo content={borderRadiusContent} />
      </ComponentWrapper>
      <ComponentWrapper name="breakpoints">
        <BreakpointsDemo content={breakpointsContent} />
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
    </div>
  )
}
