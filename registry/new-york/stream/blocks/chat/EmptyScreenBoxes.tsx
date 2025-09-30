"use client"

import { memo, type JSX } from "react"
import {
  mdiAccountBadgeOutline,
  mdiArrowBottomRight,
  mdiChatOutline,
  mdiFileDocument,
  mdiHeadLightbulb,
  mdiLightbulbOnOutline,
} from "@mdi/js"
import { useAtom } from "jotai"

import { cn } from "@/lib/utils"

import { useAiChatProvider } from "../chat/hooks/useAiChatProvider"
import { Icon } from "../chat/Icon"
import { configAtom } from "./store/atoms"

export type ExamplePrompt = {
  icon: JSX.Element
  content: string
}

const ExamplePrompts: ExamplePrompt[] = [
  {
    icon: (
      <Icon
        path={mdiAccountBadgeOutline}
        className="text-3xl text-purple-500"
      />
    ),
    content: "Who is our target consumer?",
  },
  {
    icon: <Icon path={mdiChatOutline} className="text-3xl text-rose-600" />,
    content: "Can you describe to me our brand tone of voice?",
  },
  {
    icon: (
      <Icon path={mdiLightbulbOnOutline} className="text-3xl text-green-300" />
    ),
    content: "What is our brand big idea?",
  },
  {
    icon: <Icon path={mdiHeadLightbulb} className="text-3xl text-blue-400" />,
    content: "Brainstorm some headline ideas for my new campaign",
  },
  {
    icon: <Icon path={mdiFileDocument} className="text-3xl text-yellow-400" />,
    content: "Create a brief for my new campaign targeting my consumers",
  },
]

export type MemoizedEmptyScreenBoxes = {
  setInput: React.Dispatch<React.SetStateAction<string>>
  brandKitStateId: string
}

export const EmptyScreenBoxes = () => {
  const { setInput } = useAiChatProvider()

  return <MemoizedEmptyScreenBoxes {...{ setInput, brandKitStateId: "" }} />
}

const MemoizedEmptyScreenBoxes = memo(function MemoizedEmptyScreenBoxes({
  setInput,
  brandKitStateId,
}: MemoizedEmptyScreenBoxes) {
  const [config] = useAtom(configAtom)

  const isBrandkitIdAvailable = !!brandKitStateId?.length

  const onClick = (content: string) => {
    setInput(content)
  }

  const Prompts = config?.examplePrompts?.length
    ? config.examplePrompts
    : ExamplePrompts

  return (
    <div className="grid grid-cols-3 items-stretch gap-4 p-1">
      {Prompts.map(({ content, icon }, index) => (
        <button
          key={`${content}}-${index}`}
          className={cn(
            "text-body-text flex w-full flex-col items-center justify-between gap-5 rounded-xl bg-gray-50 p-5 hover:bg-gray-100",
            {
              "col-span-2": index === Prompts.length - 1,
            }
          )}
          onClick={() => onClick(content)}
        >
          <p className="text-body-text m-0 line-clamp-3 text-center text-lg">
            {content}
          </p>

          <div className="flex w-full">
            {icon ? (
              icon
            ) : (
              <Icon
                path={mdiArrowBottomRight}
                className="text-md neutral-fg ml-auto"
              />
            )}
          </div>
        </button>
      ))}
    </div>
  )
})
