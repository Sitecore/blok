import React, { useEffect, useRef, useState, type ReactNode } from "react"

function useAutoScroll(content: ReactNode | ReactNode[]): {
  contentRef: React.RefObject<HTMLDivElement>
  handleStopAutoScrollingOnScroll: () => void
} {
  const contentRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const [isUserScrolling, setIsUserScrolling] = useState<boolean>(false)

  const handleStopAutoScrollingOnScroll = (): void => {
    setIsUserScrolling(true)
  }

  useEffect(() => {
    if (contentRef.current && !isUserScrolling) {
      const scrollableElement = contentRef.current

      if (scrollableElement.scrollHeight > scrollableElement.clientHeight) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight
      }
    }
  }, [isUserScrolling, content])

  return {
    contentRef,
    handleStopAutoScrollingOnScroll,
  }
}

export { useAutoScroll }
