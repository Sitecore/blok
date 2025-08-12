import React from "react"
import { mdiArrowRight, mdiLinkVariant } from "@mdi/js"
import { uniqueId } from "lodash"

import { cn } from "@/lib/utils"
import { StreamIcon } from "@/registry/new-york/stream/ui/stream-icon"

import { Source } from "./types"
import { getDocumentProxyUrl } from "./utils"

interface SourceItemProps {
  index?: number
  sources: [string, Source[]]
}

export function SourceItem({ sources }: SourceItemProps): React.ReactNode {
  const [toolTitle, _sources] = sources

  /* Computed */
  const contentTestId = toolTitle.split(" ").join("_").toLowerCase()

  return (
    <div className="mb-6 flex flex-col">
      <h4
        className="text-blackAlpha-900 text-xl font-semibold"
        data-testid={`all_sources_${contentTestId}`}
      >
        {toolTitle}
      </h4>
      {_sources.map((source: Source, index: number) => {
        const {
          name = "",
          description = "",
          url = "",
          title = "",
          snippet = "",
        } = source

        return (
          <div key={`source_item_${uniqueId()}`}>
            <a
              href={getDocumentProxyUrl(url)}
              className="bg-subtle-bg my-1 flex cursor-pointer flex-col space-y-2 rounded-lg p-3"
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`all_sources_source_item_${contentTestId}_${index}`}
            >
              <header className="flex items-center text-lg font-semibold text-black">
                {toolTitle === "Web sources" && (
                  <StreamIcon path={mdiLinkVariant} />
                )}
                <span className={cn("", toolTitle === "Web sources" && "ml-2")}>
                  {name || title || ""}
                </span>
              </header>
              <div className="text-md text-blackAlpha-900 font-normal">
                {description || snippet || ""}
              </div>
              <footer className="flex justify-end">
                <StreamIcon path={mdiArrowRight} />
              </footer>
            </a>
          </div>
        )
      })}
    </div>
  )
}
