import { type ToolInvocationUIPart } from "@ai-sdk/ui-utils"
import { remarkDocx } from "@m2d/remark-docx"
import {
  abTestingClient,
  brainstormingClient,
  brandsClient,
  briefClient,
  chatClient,
  createStreamFetch,
  documentsClient,
  type ContentModelRead,
  type ListUserChatMessagesModelResponseV2,
} from "@sitecore/stream-ui-core"
import { merge, omit, uniqueId } from "lodash"
import rehypeParse from "rehype-parse"
import rehypeRemark from "rehype-remark"
import { remark } from "remark"
import remarkHtml from "remark-html"
import remarkStringify from "remark-stringify"
import { toast } from "sonner"
import strip from "strip-markdown"

import {
  type ExtractSourceRecordProps,
  type ExtractSourcesProps,
} from "../types"
import type { Source } from "../types"
import { type SearchContentProps, type WorkflowItem } from "../Workflow"

/**
 * A list of tools that are allowed to be utilized within the application or system.
 * Each tool in the list represents a specific functionality or feature that is
 * permissible for use. This constant serves as a reference to define the scope of
 * operations that the system can perform.
 *
 * Tools included in this array:
 * - 'knowledge_search': Enables searching within a knowledge base or related resources.
 * - 'web_search': Facilitates searching for information on the web.
 * - 'brand_knowledge': Accesses information related to specific brands.
 * - 'answer': Provides direct answers to queries.
 * - 'followup_questions': Allows for asking follow-up questions related to a query or context.
 * - 'brief': Generates summaries or brief overviews of information.
 * - 'brainstorming': Assists in generating ideas or exploring creative solutions.
 *
 * The variable is intended to be used as a control mechanism to identify functional capabilities
 * that are authorized for operations.
 */
const ALLOWED_TOOLS = [
  "knowledge_search",
  "web_search",
  "brand_knowledge",
  "answer",
  "followup_questions",
  "brief",
  "brainstorming",
]

/**
 * An object that maps keys to their corresponding titles representing various tool source categories.
 *
 * The object contains the following key-value pairs:
 * - `knowledge_search`: Represents the title for knowledge source tools.
 * - `web_search`: Represents the title for web-based source tools.
 * - `brand_knowledge`: Represents the title for sources from the Brand Kit section.
 *
 * This configuration is intended to provide descriptive titles for displaying or referencing
 * specific tool categories across an application.
 */
export const TOOLS_SOURCES_TITLES = {
  knowledge_search: "Knowledge sources",
  web_search: "Web sources",
  brand_knowledge: "Brand Kit section sources",
}

/**
 * A regular expression pattern used to match and remove specific characters from text.
 *
 * This regex matches the following characters:
 * - Newline characters (`\n`)
 * - Carriage return characters (`\r`)
 * - Whitespace characters (such as spaces and tabs, represented by `\s`)
 * - Backslashes (`\`)
 *
 * The global flag (`g`) ensures that all occurrences of the matched characters
 * in the target string are identified and replaced or removed.
 *
 * Use this regular expression to sanitize or normalize text by stripping
 * out unwanted characters as defined in the pattern.
 */
export const STRIP_TEXT_REGEX = /[\n\r\s\\]/g

/**
 * Configures and initializes multiple API clients for streaming messages
 * based on the given parameters.
 *
 * @param {string} token - The authentication token used to access the APIs.
 * @param {string} region - The region identifier to determine the API base URLs.
 * @param {'dev' | 'qa' | 'staging' | 'preprod' | 'prod'} env - The environment
 * key specifying which stage of the platform to connect to.
 * @return {{clientsLoaded: boolean}} - An object indicating whether the API
 * clients were successfully configured and loaded.
 */
export function useStreamMessagesClientsConfig(
  token: string,
  region: string,
  env: "dev" | "qa" | "staging" | "preprod" | "prod"
): {
  clientsLoaded: boolean
} {
  if (!token || !region || !env) {
    toast.error("Missing required parameters")
    return {
      clientsLoaded: false,
    }
  }

  const baseUrlEnv = {
    dev: "-dev.sitecore-staging.cloud",
    qa: "-qa.sitecore-staging.cloud",
    staging: "-staging.sitecore-staging.cloud",
    preprod: "-preprod.sitecorecloud.io",
    prod: "sitecorecloud.io",
  }

  try {
    brandsClient.setConfig({
      baseUrl: `https://ai-brands-api-${region}${baseUrlEnv[env]}`,
      fetch: createStreamFetch({
        tokenProvider: async () => token,
        refreshTokenProvider: async () => token,
      }),
    })

    chatClient.setConfig({
      baseUrl: `https://ai-chat-api-${region}${baseUrlEnv[env]}`,
      fetch: createStreamFetch({
        tokenProvider: async () => token,
        refreshTokenProvider: async () => token,
      }),
    })

    documentsClient.setConfig({
      baseUrl: `https://ai-documents-api-${region}${baseUrlEnv[env]}`,
      fetch: createStreamFetch({
        tokenProvider: async () => token,
        refreshTokenProvider: async () => token,
      }),
    })

    abTestingClient.setConfig({
      baseUrl: `https://ai-ab-testing-api-${region}${baseUrlEnv[env]}`,
      fetch: createStreamFetch({
        tokenProvider: async () => token,
        refreshTokenProvider: async () => token,
      }),
    })

    briefClient.setConfig({
      baseUrl: `https://ai-brief-api-${region}${baseUrlEnv[env]}`,
      fetch: createStreamFetch({
        tokenProvider: async () => token,
        refreshTokenProvider: async () => token,
      }),
    })

    brainstormingClient.setConfig({
      baseUrl: `https://ai-brainstorming-api-${region}${baseUrlEnv[env]}`,
      fetch: createStreamFetch({
        tokenProvider: async () => token,
        refreshTokenProvider: async () => token,
      }),
    })

    return {
      clientsLoaded: true,
    }
  } catch (error) {
    toast.error("Error loading clients")
    return {
      clientsLoaded: false,
    }
  }
}

/**
 * Converts a given Markdown string into plain text by stripping out all Markdown syntax.
 *
 * @param {string} markdownText - The string containing Markdown content to be converted.
 * @return {string} The plain text representation of the given Markdown content.
 */
export function markdownToPlainText(markdownText: string): string {
  const file = remark().use(strip).processSync(markdownText)
  return String(file)
}

/**
 * Converts a given Markdown string to its corresponding HTML representation.
 *
 * @param {string} markdownText - The input string written in Markdown syntax.
 * @return {string} - The converted string in HTML format.
 */
export function markdownToHtml(markdownText: string): string {
  const file = remark().use(remarkHtml).processSync(markdownText)
  return String(file)
}

/**
 * Converts a Markdown formatted string into a Microsoft Word document format (DOCX).
 * This function utilizes remark and remarkDocx libraries for the conversion process.
 *
 * @param {string} markdownText - The string containing Markdown content to be converted.
 * @return {VFile} Returns a VFile object containing the converted DOCX document data.
 */
export function markdownToDocx(markdownText: string) {
  return remark().use(remarkDocx).processSync(markdownText)
}

/**
 * Converts the given markdown text into a DOCX file and triggers a download.
 *
 * @param {string} markdownText - The markdown content to be converted into a DOCX file.
 * @param {string} [fileName='document'] - The desired name for the downloaded DOCX file (excluding the file extension).
 * @return {void} This function does not return any value; it initiates a file download in the browser.
 */
export function saveToDocx(
  markdownText: string,
  fileName: string = "document"
): void {
  const { result } = markdownToDocx(markdownText) as unknown as {
    result: Promise<Blob>
  }

  result.then((blob) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${fileName}.docx`
    link.click()
    URL.revokeObjectURL(url)
  })
}

/**
 * Converts a string of HTML content into Markdown format.
 *
 * @param {string} htmlText - The HTML string to be converted to Markdown.
 * @return {string} The converted Markdown string.
 */
export function htmlToMarkdown(htmlText: string): string {
  const file = remark()
    .use(rehypeParse, { emitParseErrors: true, duplicateAttribute: false })
    .use(rehypeRemark)
    .use(remarkStringify)
    .processSync(htmlText)

  return String(file)
}

/**
 * Replaces all occurrences of escaped newline characters (\n) with actual newline characters in the provided string.
 *
 * @param {string} text - The input string where escaped newline characters will be replaced. Defaults to an empty string if no input is provided.
 * @return {string} The resulting string with escaped newline characters replaced by actual newline characters.
 */
export function replaceNewLines(text: string = ""): string {
  return text.replace(/\\n/g, "\n")
}

/**
 * Formats a given date input into a localized string in the format "Month Day, Year".
 *
 * @param {string | number | Date} input - The date input to be formatted. It can be a string, timestamp, or Date object.
 * @return {string} The formatted date string in the "Month Day, Year" format.
 */
export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

/**
 * Copies the provided text to the system clipboard.
 *
 * @param {string} text - The text content to copy to the clipboard.
 * @return {void} This function does not return a value.
 * @throws Will throw an error if the window object is not defined.
 */
export function copyToClipboard(text: string): void {
  if (typeof window === "undefined")
    throw new Error("Could not copy to clipboard, window is not defined.")

  if (window.navigator.clipboard) {
    window.navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Text copied to clipboard successfully")
      })
      .catch((err) => {
        toast.error("Failed to copy text: ", err)
      })
  }
}

/**
 * Pauses execution for a specified duration.
 *
 * @param {number} ms - The duration to sleep in milliseconds.
 * @return {Promise<void>} A promise that resolves after the specified duration.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Converts the first character of a given string to uppercase.
 *
 * @param {string} text - The input string. Defaults to an empty string if not provided.
 * @return {string} A new string with the first character converted to uppercase.
 */
export function firstCharToUpperCase(text: string = ""): string {
  return `${text?.charAt(0).toUpperCase()}${text?.slice(1)}`
}

/**
 * Removes duplicate objects from an array based on a specified property.
 *
 * @param {T[]} obj - The array of objects to filter for duplicates.
 * @param {K} prop - The property used to determine uniqueness.
 * @return {T[]} An array with duplicates removed based on the specified property.
 */
export function removeDuplicatesFromArray<T, K extends keyof T>(
  obj: T[],
  prop: K
): T[] {
  return Object.values(
    obj.reduce((acc, cur) => {
      const key = String(cur[prop]) as string | number | symbol

      return {
        ...acc,
        [key]: cur,
      }
    }, {})
  )
}

/**
 * Combines multiple source objects into a single aggregated source object, filtering out entries without valid content.
 *
 * @param {...ExtractSourceRecordProps[]} sources - One or more source objects to be merged and processed.
 * @return {ExtractSourcesProps} The aggregated and filtered sources object as per the defined processing rules.
 */
export function createSources(
  ...sources: ExtractSourceRecordProps[]
): ExtractSourcesProps {
  return Object.entries(
    merge({}, ...sources) as ExtractSourceRecordProps
  ).filter(([, sources]) => !!sources?.length)
}

/**
 * A variable representing the extraction of Brand Kit section sources
 * from a workflow. This provides a mapping for the source of records
 * related to Brand Kit sections.
 *
 * @constant
 * @type {ExtractSourceRecordProps}
 * @default {'Brand Kit section sources': []}
 */
export const extractBrandkitSourcesFromWorkflow: ExtractSourceRecordProps = {
  "Brand Kit section sources": [],
}

/**
 * Extracts source records from the brainstorming tool invocation found in the given array of parts.
 *
 * @param {ToolInvocationUIPart[] | undefined} parts - An array of tool invocation UI parts. If undefined, an empty array is assumed.
 * @return {ExtractSourceRecordProps} An aggregated object containing source records mapped to their corresponding source titles based on predefined tool source titles.
 */
export function extractSourcesFromBrainstorming(
  parts: ToolInvocationUIPart[] | undefined
): ExtractSourceRecordProps {
  const partBrainstorming =
    parts?.filter(
      (part: ToolInvocationUIPart) =>
        part?.toolInvocation?.toolName === "brainstorming"
    ) ?? []

  const workflowSearchItems =
    partBrainstorming?.[0]?.toolInvocation?.args?.result?.workflow.filter(
      ({ name }: WorkflowItem) => name === "search"
    ) ?? []

  const workflowSearchContent = workflowSearchItems
    .reduce(
      (acc: SearchContentProps[], cur: WorkflowItem): SearchContentProps[] => {
        return [...acc, ...(cur.content as SearchContentProps[])]
      },
      [] as SearchContentProps[]
    )
    .map(
      (
        item: Record<
          keyof typeof TOOLS_SOURCES_TITLES | "question",
          Source[] | string
        >
      ) => omit(item, ["question"])
    )

  return (
    workflowSearchContent.reduce(
      (
        acc: ExtractSourceRecordProps,
        cur: ExtractSourceRecordProps
      ): ExtractSourceRecordProps => {
        const source: ExtractSourceRecordProps = {
          ...acc,
        }

        for (const key in cur) {
          const sourceName =
            TOOLS_SOURCES_TITLES[key as keyof typeof TOOLS_SOURCES_TITLES]

          const value = !Array.isArray(cur[key]) ? [] : cur[key]

          source[sourceName] = removeDuplicatesFromArray(
            sourceName in source ? [...source[sourceName], ...value] : value,
            "url"
          )
        }

        return {
          ...source,
        }
      },
      {} as ExtractSourceRecordProps
    ) ?? {}
  )
}

/**
 * Extracts and organizes sources from the provided ToolInvocationUIPart array.
 *
 * @param {ToolInvocationUIPart[] | undefined} parts - An array of ToolInvocationUIPart objects or undefined.
 * Each object in the array may contain tool invocation data, including tool name and arguments.
 * The arguments may include data about sources with properties such as type and URL.
 *
 * @return {ExtractSourceRecordProps} An object where the keys represent source names derived from tool names,
 * and the values are arrays of sources associated with those tools. Only sources with valid URLs and
 * non-image types are included.
 */
export function extractSourcesFromParts(
  parts: ToolInvocationUIPart[] | undefined
): ExtractSourceRecordProps {
  return (
    parts?.reduce((accParts, curPart): ExtractSourceRecordProps => {
      const { toolName, args } = curPart?.toolInvocation ?? {}
      const sourceName =
        TOOLS_SOURCES_TITLES[toolName as keyof typeof TOOLS_SOURCES_TITLES] ??
        ""
      const sources =
        args?.data?.sources?.filter(
          ({ type, url }: Source) => type !== "image" && !!url?.length
        ) ?? []

      if (!sources?.length) return accParts

      return {
        ...accParts,
        ...(sourceName in accParts
          ? { [sourceName]: [...accParts[sourceName], ...sources] }
          : { [sourceName]: sources }),
      }
    }, {} as ExtractSourceRecordProps) ?? {}
  )
}

/**
 * Parses the stringified JSON properties of an object, leaving non-JSON string properties unchanged.
 *
 * @param {Record<string, unknown>} obj - The object containing properties to parse.
 * @return {Record<string, unknown>} A new object with parsed JSON properties where applicable.
 */
function jsonParseProperties(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const parsedObj: Record<string, unknown> = {}

  for (const key in obj) {
    const value = obj[key]

    try {
      parsedObj[key] = JSON.parse(value as string)
    } catch {
      parsedObj[key] = value
    }
  }

  return parsedObj
}

/**
 * Creates a part object that represents a tool invocation with specified properties.
 *
 * @param {string} toolName - The name of the tool to be invoked.
 * @param {object} props - The properties or arguments to be included in the tool invocation.
 * @return {object} Returns an object representing the tool invocation, including the tool call ID, tool name, and arguments.
 */
function createPart(toolName: string, props: object): object {
  return {
    type: "tool-invocation",
    toolInvocation: {
      toolCallId: uniqueId(),
      toolName,
      args: {
        ...props,
      },
    },
  }
}

/**
 * Processes an array of content models to create assistant message parts that match specified tools.
 *
 * @param {ContentModelRead[]} content - An array of content models to filter and transform into message parts.
 * @return {object[]} - An array of objects representing the assistant message parts.
 */
function createAssistantMessageParts(content: ContentModelRead[]): object[] {
  return content
    .filter((cnt: ContentModelRead) => ALLOWED_TOOLS.includes(cnt.tool))
    .map((cnt: ContentModelRead) => {
      const { tool: toolName, value } = cnt

      return createPart(
        toolName,
        jsonParseProperties(value as Record<string, unknown>)
      )
    })
}

/**
 * Converts a list of user chat message models from a database format to a format suitable for AI processing.
 *
 * @param {ListUserChatMessagesModelResponseV2[]} messages - The list of messages to be converted. Each message contains properties such as role, content, and timestamp.
 * @return {unknown} The processed list of messages sorted by timestamp, where user and assistant messages are converted into respective formats.
 */
export function dbMessagesToAIMessages(
  messages: ListUserChatMessagesModelResponseV2[]
): unknown {
  return (messages || [])
    .sort((a, b) => a.timestamp - b.timestamp)
    .map((message) => {
      const { role, content } = message

      if (role === "user") {
        const userMessageContent = Array.isArray(message.content)
          ? message.content
              .filter((cnt: ContentModelRead) => cnt.tool === "none")
              .map((cnt) => cnt.value)
              .join("")
          : message.content

        return {
          ...message,
          content: userMessageContent,
        }
      }
      if (role === "assistant") {
        return {
          ...message,
          annotations: [
            {
              id: message.id,
              references: message.references,
            },
          ],
          parts: createAssistantMessageParts(content as ContentModelRead[]),
        }
      }
    })
}
