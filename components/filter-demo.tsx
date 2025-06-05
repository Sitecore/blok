"use client"

import * as React from "react"

import { Filter } from "@/app/blocks/filter"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "svelte", label: "SvelteKit" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
]

const statuses = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
  { value: "scheduled", label: "Scheduled" },
]

const tags = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
  { value: "enhancement", label: "Enhancement" },
  { value: "documentation", label: "Documentation" },
  { value: "design", label: "Design" },
  { value: "performance", label: "Performance" },
]

export function FilterDemo() {
  const [selectedFramework, setSelectedFramework] = React.useState<typeof frameworks[number] | null>(null)
  const [selectedStatuses, setSelectedStatuses] = React.useState<typeof statuses[number][]>([])
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<typeof frameworks[number][]>([])
  const [selectedStatusesMulti, setSelectedStatusesMulti] = React.useState<typeof statuses[number][]>([])
  const [selectedTags, setSelectedTags] = React.useState<typeof tags[number][]>([])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Single Select</h3>
        <div className="flex flex-wrap items-start gap-4">
          <Filter
            items={frameworks}
            placeholder="Framework"
            selectedItems={selectedFramework ? [selectedFramework] : []}
            onSelect={(value) => setSelectedFramework(value as typeof frameworks[number] | null)}
            onClear={() => setSelectedFramework(null)}
          />
          <Filter
            items={statuses}
            placeholder="Status"
            selectedItems={selectedStatuses}
            onSelect={(value) => setSelectedStatuses(value as typeof statuses[number][])}
            onClear={() => setSelectedStatuses([])}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Multi Select</h3>
        <div className="flex flex-wrap items-start gap-4">
          <Filter
            items={frameworks}
            placeholder="Frameworks"
            variant="multi"
            selectedItems={selectedFrameworks}
            onSelect={(value) => setSelectedFrameworks(value as typeof frameworks[number][])}
            onClear={() => setSelectedFrameworks([])}
          />
          <Filter
            items={statuses}
            placeholder="Statuses"
            variant="multi"
            selectedItems={selectedStatusesMulti}
            onSelect={(value) => setSelectedStatusesMulti(value as typeof statuses[number][])}
            onClear={() => setSelectedStatusesMulti([])}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-medium">Badge Select</h3>
        <div className="flex flex-wrap items-start gap-4">
          <Filter
            items={tags}
            placeholder="Tags"
            variant="badge"
            selectedItems={selectedTags}
            onSelect={(value) => setSelectedTags(value as typeof tags[number][])}
            onClear={() => setSelectedTags([])}
          />
        </div>
      </div>
    </div>
  )
} 