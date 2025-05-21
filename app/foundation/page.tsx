import fs from "fs"
import path from "path"

import ColorsDemo from "@/components/colors-demo"
import { ComponentWrapper } from "@/components/component-wrapper"
import TypographyDemo from "@/components/typography-demo"

let cssPath = path.join(process.cwd(), "app", "colors.css")
const colorsContent = fs.readFileSync(cssPath, "utf-8")

cssPath = path.join(process.cwd(), "app", "typography.css")
const typographyContent = fs.readFileSync(cssPath, "utf-8")

export default function BlocksPage() {
  return (
    <div className="@container grid flex-1 gap-4 p-4">
      <ComponentWrapper name="colors">
        <ColorsDemo content={colorsContent} />
      </ComponentWrapper>
      <ComponentWrapper name="typography">
        <TypographyDemo content={typographyContent} />
      </ComponentWrapper>
    </div>
  )
}
