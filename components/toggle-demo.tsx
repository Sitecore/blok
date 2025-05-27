import { BoldIcon, BookmarkIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

import { Toggle } from "@/registry/new-york/ui/toggle"

export function ToggleDemo() {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-6">
        <Toggle aria-label="Toggle italic">
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="square">
          <UnderlineIcon />
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="square" disabled>
          Disabled
        </Toggle>
        <Toggle variant="rounded" aria-label="Toggle italic">
          <ItalicIcon />
          Italic
        </Toggle>
        <Toggle
          aria-label="Toggle book"
          className="data-[state=on]:[&_svg]:fill-accent-foreground"
        >
          <BookmarkIcon />
        </Toggle>
      </div>

      {/* Rounded variant demos */}
      <div className="mt-6 flex flex-wrap items-center gap-6">
        <Toggle aria-label="Toggle italic" variant="rounded">
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="rounded">
          <UnderlineIcon />
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="rounded" disabled>
          Disabled
        </Toggle>
        <Toggle variant="rounded" aria-label="Toggle italic">
          <ItalicIcon />
          Italic
        </Toggle>
        <Toggle
          aria-label="Toggle book"
          variant="rounded"
          className="data-[state=on]:[&_svg]:fill-accent-foreground"
        >
          <BookmarkIcon />
        </Toggle>
        {/* <Toggle variant="rounded" aria-label="Toggle italic" size="sm">
          Small
        </Toggle>
        <Toggle variant="rounded" aria-label="Toggle italic" size="lg">
          Large
        </Toggle> */}
      </div>
    </div>
  )
}
