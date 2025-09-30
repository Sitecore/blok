import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  type SyntheticEvent,
} from "react"
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiOpenInNew,
} from "@mdi/js"
import { createPortal } from "react-dom"

import { Button } from "@/registry/new-york/ui/button"

import { cn } from "../../lib/utils"
import { StreamIcon } from "../../ui/stream-icon"
import { GetDocumentProxyUrl } from "./GetDocumentProxyUrl"
import type { Source } from "./types"

export interface LightBoxProps {
  images: Source[]
  imagesContainerClassName?: string
  imageContainerClassName?: string
  imageClassName?: string
}

const MAX_PHOTOS = 3

export function LightBox({
  images,
  imagesContainerClassName,
  imageContainerClassName,
  imageClassName,
}: LightBoxProps): React.ReactNode {
  /* Hooks */
  const [imageIndex, setImageIndex] = useState(0)
  const [showLightBox, setShowLightBox] = useState(false)
  const clickOutsideRef = useRef<HTMLDivElement | null>(null)

  /* Computed */
  const imagesLength = images?.length
  const selectedImage = images[imageIndex]
  const body = document.querySelector("body") ?? ({} as HTMLBodyElement)

  const handleOpenLightBoxOnClick = (imageIndex: number): void => {
    setShowLightBox(true)
    setImageIndex(imageIndex)
  }

  /* Events */
  const handleCloseOnClick = useCallback(
    (e: SyntheticEvent<HTMLButtonElement | HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setShowLightBox(false)
    },
    []
  )

  const handleImageControlsOnClick = (type: "prev" | "next"): void => {
    switch (type) {
      case "prev":
        setImageIndex((prev) => (prev === 0 ? 0 : prev - 1))
        break
      case "next":
        setImageIndex((prev) => (prev === imagesLength - 1 ? prev : prev + 1))
        break
    }
  }

  useEffect(() => {
    let outsideEl = null

    if (showLightBox && clickOutsideRef.current) {
      outsideEl = clickOutsideRef.current
      outsideEl.addEventListener("click", function () {
        setShowLightBox(false)
      })
    }

    return (): void => {
      outsideEl?.removeEventListener("click", function () {
        setShowLightBox(false)
      })
    }
  }, [showLightBox])

  if (!images?.length) return null

  const lightBoxSection = (
    <section
      data-testid={`lightbox_main_section`}
      className={cn(
        "bg-blackAlpha-900 pointer-events-none fixed inset-0 z-[60] flex flex-col items-center opacity-0 transition-all duration-300",
        showLightBox && "pointer-events-auto opacity-100"
      )}
    >
      <header className="flex w-full items-center justify-between px-7 py-5">
        <h4 className="text-xl font-semibold text-white">
          {selectedImage?.title || selectedImage?.name}
        </h4>
        <div className="flex items-center justify-between space-x-1">
          <Button data-testid={`lightbox_button_goto_source`} className="p-0">
            <GetDocumentProxyUrl
              url={selectedImage?.url}
              item={(url) => {
                return (
                  <a
                    href={url}
                    className="flex h-full w-full items-center justify-center space-x-2 px-4 py-2 text-white"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span className="truncate">Go to source</span>
                    <StreamIcon path={mdiOpenInNew} />
                  </a>
                )
              }}
            />
          </Button>
          <Button
            data-testid={`lightbox_button_close`}
            className="border-none bg-transparent text-white hover:bg-transparent active:bg-transparent"
            variant="outline"
            onClick={handleCloseOnClick}
          >
            <StreamIcon path={mdiClose} />
          </Button>
        </div>
      </header>
      <div
        ref={clickOutsideRef}
        className="flex h-full w-full items-center justify-center px-10 py-8"
      >
        <GetDocumentProxyUrl
          url={selectedImage?.url}
          item={(url) => {
            return (
              <img
                data-testid={`lightbox_image`}
                alt={selectedImage?.title}
                src={url}
              />
            )
          }}
        />
      </div>
      <footer className="flex w-full items-center justify-center space-x-4 px-7 py-5">
        <Button
          data-testid={`lightbox_button_prev`}
          className="border-none bg-neutral-800 p-2 text-white hover:bg-neutral-800 active:bg-neutral-800"
          variant="outline"
          onClick={() => handleImageControlsOnClick("prev")}
        >
          <StreamIcon path={mdiChevronLeft} />
        </Button>
        <span
          data-testid={`lightbox_images_size`}
          className="text-sm font-normal text-white"
        >
          {imageIndex + 1} / {imagesLength}
        </span>
        <Button
          data-testid={`lightbox_button_next`}
          className="border-none bg-neutral-800 p-2 text-white hover:bg-neutral-800 active:bg-neutral-800"
          variant="outline"
          onClick={() => handleImageControlsOnClick("next")}
        >
          <StreamIcon path={mdiChevronRight} />
        </Button>
      </footer>
    </section>
  )

  return (
    <>
      <div
        data-testid={`lightbox_container_images_preview`}
        className={cn(
          "m-[6px] flex flex-wrap items-center",
          imagesContainerClassName
        )}
      >
        {images
          ?.filter((_, index) => index < MAX_PHOTOS)
          .map(({ url, title }, index) => (
            <div
              key={`max_${index}`}
              className={cn(
                'after:content-[" "] after:hover:bg-neutral-fg relative z-0 m-[6px] h-auto w-[230px] cursor-pointer after:absolute after:inset-0 after:z-10',
                imageContainerClassName
              )}
              onClick={() => handleOpenLightBoxOnClick(index)}
            >
              <GetDocumentProxyUrl
                url={url}
                item={(url) => {
                  return (
                    <img
                      data-testid={`lightbox_image_preview_${index}`}
                      className={cn("w-[230px]", imageClassName)}
                      alt={`${title} preview`}
                      src={url}
                    />
                  )
                }}
              />
            </div>
          ))}
        {images?.length > MAX_PHOTOS && (
          <div
            className={cn(
              "text-blackAlpha-600 bg-blackAlpha-200 hover:bg-neutral-fg z-0 m-[6px] flex h-[150px] w-[150px] cursor-pointer items-center justify-center self-center text-xl font-semibold",
              imageContainerClassName
            )}
            onClick={() => handleOpenLightBoxOnClick(MAX_PHOTOS)}
          >
            +{images?.length - MAX_PHOTOS}
          </div>
        )}
      </div>
      {createPortal(lightBoxSection, body)}
    </>
  )
}
