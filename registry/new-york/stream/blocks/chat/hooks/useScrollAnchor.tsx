import React, { useCallback, useEffect, useRef, useState } from "react"
import { UIMessage } from "@ai-sdk/ui-utils"

export interface ScrollAnchorProps {
  messagesRef: React.RefObject<HTMLDivElement>
  scrollRef: React.RefObject<HTMLDivElement>
  scrollToBottom: () => void
  isAtBottom: boolean
}

export function useScrollAnchor(messages: UIMessage[]): ScrollAnchorProps {
  const messagesRef = useRef<HTMLDivElement>({} as HTMLDivElement) // The container holding the messages
  const scrollRef = useRef<HTMLDivElement>({} as HTMLDivElement) // The scrollable div itself
  const lastScrollTopRef = useRef<number>(0)

  const [isAtBottom, setIsAtBottom] = useState(true)
  const [direction, setDirection] = useState<"up" | "down">("down")

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [])

  useEffect(() => {
    if (messagesRef.current) {
      const observer = new window.ResizeObserver(() => {
        if (scrollRef.current && isAtBottom && direction === "down") {
          scrollRef.current.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
          })
        }
      })

      for (const child of messagesRef.current.children) {
        observer.observe(child)
      }

      return () => {
        observer.disconnect()
      }
    }
  }, [messages.length, isAtBottom, direction])

  useEffect(() => {
    const { current } = scrollRef

    if (current) {
      const handleScroll = (event: Event) => {
        const target = event.target as HTMLDivElement
        const offset = 75 // Buffer for determining if you're near the bottom
        const atBottom =
          target.scrollTop + target.clientHeight >= target.scrollHeight - offset

        setDirection(
          target.scrollTop > lastScrollTopRef.current ? "down" : "up"
        )
        lastScrollTopRef.current = Math.max(0, target.scrollTop) // Prevent negative values

        setIsAtBottom(atBottom)
      }

      current.addEventListener("scroll", handleScroll, {
        passive: true,
      })

      return () => {
        current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return {
    messagesRef,
    scrollRef,
    scrollToBottom,
    isAtBottom,
  }
}
