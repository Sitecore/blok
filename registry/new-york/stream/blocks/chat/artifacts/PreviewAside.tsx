import React, {
  ReactNode,
  SyntheticEvent,
  useEffect,
  useId,
  useRef,
} from "react"
import { mdiArrowExpand, mdiClose } from "@mdi/js"
import { useAtom, useAtomValue } from "jotai"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/new-york/ui/select"

import { Icon } from "../Icon"
import { RectangleStar } from "../icons/RectangleStar"
import { Spinner } from "../Spinner"
import { artifactsAtom, chatIdAtom, isLoadingAtom } from "../store/atoms"
import { firstCharToUpperCase } from "../utils"

export interface PreviewAsideVersions {
  selected: string
  available: string[]
}

export interface PreviewAsideProps {
  id: string
  children?: ReactNode | ReactNode[]
  versions?: PreviewAsideVersions
  buttonTitle?: string
  asideTitle?: string
  isActionPending?: boolean
  isPreview?: boolean
  onSelectVersion?: (value: string) => void
  onOpen?: (e?: SyntheticEvent<HTMLDivElement>) => void
  onClose?: (e?: SyntheticEvent<HTMLButtonElement>) => void
  onSelectNewVersion?: () => void
  footerContent?: {
    start?: ReactNode | ReactNode[]
    end?: ReactNode | ReactNode[]
  }
}

export function setPreviewAsideMaxVersions(
  ver: string,
  maxAllowedNumberOfVersions: number = 10
): string[] {
  const maxVersions: string[] = []
  const version = Number(ver)

  for (
    let i = Math.max(1, version - maxAllowedNumberOfVersions + 1);
    i <= version;
    i++
  ) {
    maxVersions.push(String(i))
  }
  return maxVersions
}

export function PreviewAside({
  children,
  id,
  isActionPending,
  versions,
  buttonTitle = "",
  asideTitle = "",
  isPreview,
  onSelectVersion,
  onSelectNewVersion,
  onOpen,
  onClose,
  footerContent = {},
}: PreviewAsideProps): React.ReactNode {
  const { start, end } = footerContent

  /* Hooks */
  const mounted = useRef<boolean>(false)
  const artifactId = useId()

  /* Atoms */
  const isLoading = useAtomValue(isLoadingAtom)
  const [artifacts, setArtifacts] = useAtom(artifactsAtom)
  const chatId = useAtomValue(chatIdAtom)

  /* Computed */
  const areVersionsAvailable = !!versions?.available?.length
  const portalPlaceHolder =
    document.getElementById("artifactsPortalPlaceholder") ?? ({} as HTMLElement)
  const isPortalPlaceHolderAvailable = !!Object.keys(portalPlaceHolder).length
  const isArtifactOpenWhileGenerating =
    !mounted.current && chatId && isLoading && !(artifactId in artifacts)
  const _isPreview = isPreview ?? !artifacts?.[artifactId]?.open

  /* Keep open if the last artifact to be rendered in the chat */
  useEffect(() => {
    if (isArtifactOpenWhileGenerating) {
      setArtifacts({ [artifactId]: { open: true } })
    }
  }, [artifactId, isArtifactOpenWhileGenerating, setArtifacts])

  /* Events */
  function handleOpenOnClick(e: SyntheticEvent<HTMLDivElement>): void {
    setArtifacts({ [artifactId]: { open: true } })
    onOpen?.(e)
  }

  function handleVersionOnSelect(value: string): void {
    if (value === "new") {
      onSelectNewVersion?.()
      return
    }
    onSelectVersion?.(value)
  }

  const handleCloseOnClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
    setArtifacts({ [artifactId]: { open: false } })
    onClose?.(e)
  }

  const buttonPreviewAside = (
    <div
      data-testid={`preview_aside_${id}_${!_isPreview ? "open" : "closed"}`}
      className="flex w-1/2 items-center rounded-lg border border-transparent bg-purple-200 p-3 text-purple-600"
    >
      <RectangleStar fill="#5319E0" />
      <div className="ml-2 flex w-full justify-between">
        <span
          className="line-clamp-2 flex text-left text-base font-semibold text-[#5319E0]"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {firstCharToUpperCase(buttonTitle)}
        </span>
        <span className="text-blackAlpha-500 flex items-center text-sm font-normal">
          {isActionPending ? (
            <Spinner size="xs" />
          ) : (
            areVersionsAvailable && <span>v{versions?.selected}</span>
          )}
        </span>
      </div>
    </div>
  )

  const asideContainer = (
    <Card
      data-testid={`preview_aside_${id}`}
      className={cn(
        "border-blackAlpha-100 hover:border-blackAlpha-200 relative h-[175px] rounded-lg border bg-white px-5 py-2 transition-all",
        _isPreview
          ? 'after:content-[" "] cursor-pointer after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[50px] after:rounded-b-lg'
          : "h-full rounded-none border-none",
        (isLoading || isActionPending) &&
          'after:content-[" "] after:pointer-events-auto after:absolute after:inset-0'
      )}
      onClick={_isPreview ? handleOpenOnClick : undefined}
    >
      <CardHeader className="flex flex-row justify-between space-y-0 p-0">
        <div
          data-testid={`preview_aside_versions_${id}`}
          className="flex items-center gap-2"
        >
          <RectangleStar />
          {!_isPreview && areVersionsAvailable && handleVersionOnSelect && (
            <Select
              data-testid={`preview_aside_version_select_${id}}`}
              onValueChange={handleVersionOnSelect}
              value={versions.selected}
              disabled={_isPreview || isActionPending}
            >
              <SelectTrigger
                data-testid={`preview_aside_version_trigger_${id}`}
                className="text-neutral-fg text-md h-6 w-min gap-1 border-none px-1 font-semibold"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {/*<div data-testid={`preview_aside_version_new_version`}>
                  <SelectItem value="new" className="cursor-pointer">
                    <Icon path={mdiPlus} /> New version
                  </SelectItem>
                </div>*/}
                {versions.available.map((version: string, index: number) => (
                  <div
                    data-testid={`preview_aside_version_${index}`}
                    key={`${version}_${index}`}
                  >
                    <SelectItem value={version} className="cursor-pointer">
                      v{version}
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>
          )}
          {isActionPending && <Spinner size="xs" />}
        </div>
        <div className="flex items-center gap-2">
          {_isPreview && areVersionsAvailable && (
            <span className="text-neutral-fg text-md h-6 w-min gap-1 border-none px-1 font-semibold">
              v{versions?.selected}
            </span>
          )}
          <Button
            data-testid={`preview_aside_close_button_${id}`}
            variant={"ghost"}
            colorScheme="neutral"
            size={"icon"}
            onClick={!_isPreview ? handleCloseOnClick : undefined}
          >
            <Icon path={!_isPreview ? mdiClose : mdiArrowExpand} />
          </Button>
        </div>
      </CardHeader>
      <CardContent
        className={cn("overflow-hidden px-0", !_isPreview && "overflow-y-auto")}
        data-testid="scroll-contain-artifact"
      >
        <CardTitle className="pt-5 pb-3.5 text-lg font-semibold">
          {firstCharToUpperCase(asideTitle)}
        </CardTitle>
        <div className="relative">{children}</div>
      </CardContent>
      {!_isPreview && (
        <CardFooter className="flex items-center justify-between px-0">
          <div className="flex items-center gap-4 self-start">{start}</div>
          <div className="flex items-center gap-4 self-end">{end}</div>
        </CardFooter>
      )}
    </Card>
  )

  return (
    <>
      {!_isPreview
        ? isPortalPlaceHolderAvailable && (
            <>
              {buttonPreviewAside}
              {createPortal(asideContainer, portalPlaceHolder)}
            </>
          )
        : asideContainer}
    </>
  )
}
