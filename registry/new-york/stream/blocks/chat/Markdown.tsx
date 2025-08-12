import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import { cn } from "@/lib/utils"

import { getDocumentProxyUrl } from "./utils"

export interface MarkdownProps {
  id?: string
  text: string
  className?: string
  componentClassName?: string
}

export function Markdown({
  id,
  text = "",
  className = "",
  componentClassName = "",
}: MarkdownProps): React.ReactNode {
  return (
    <div
      data-testid={`markdown-container-div-${id}`}
      id={id}
      className="h-full w-full"
    >
      <ReactMarkdown
        className={cn(
          "prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-full break-words",
          className
        )}
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return (
              <div className={cn("mb-2", componentClassName)}>{children}</div>
            )
          },

          img({ src, ...rest }) {
            return (
              <div className="mb-2 bg-gray-50 py-2">
                <img
                  {...rest}
                  contentEditable={false}
                  alt={rest.alt || ""}
                  src={getDocumentProxyUrl(src as string)}
                  height={400}
                  className="mx-auto my-0 w-full max-w-2xl"
                />
              </div>
            )
          },

          a({ href, ...rest }) {
            return (
              <a
                {...rest}
                contentEditable={false}
                href={getDocumentProxyUrl(href!)}
                target="_blank"
                className="text-md text-subtle-text underline underline-offset-2"
              />
            )
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
