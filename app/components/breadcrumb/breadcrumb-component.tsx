import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/new-york/ui/breadcrumb"
import CustomCodeBlock from "../label/code-block"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/new-york/ui/dropdown-menu"
import { FC } from "react"
import Icon from "@mdi/react"
import { mdiSlashForward } from "@mdi/js"

type DemoObject = {
    id: string;
    title?: string;
    description?: string;
}

type BreadcrumbDemoProps = {
    selectedDemo: DemoObject;
}

export const BreadcrumbDemo: FC<BreadcrumbDemoProps> = ({ selectedDemo }) => {
    const codeSnippet = `import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="size-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Documentation</DropdownMenuItem>
              <DropdownMenuItem>Themes</DropdownMenuItem>
              <DropdownMenuItem>GitHub</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/docs/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
`;

    return (
        <>
            <div className="mt-9 mb-3">
                <p className="text-xl font-semibold">{selectedDemo?.title}</p>
                <p className="font-normal mt-3">{selectedDemo?.description}</p>
            </div>
            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <div className="flex items-center space-x-2">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href="#">Home</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {selectedDemo?.id === "separator" ? (
                                    <CustomSeparator />
                                ) : (
                                    <BreadcrumbSeparator />
                                )}
                                {(selectedDemo?.id === "main" || selectedDemo?.id === "dropdown") && (
                                    <BreadcrumbDropdown 
                                        triggerLabel={selectedDemo?.id === "main" ? undefined : "Components"}
                                    />
                                )}
                                {selectedDemo?.id === "collapsed" && (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbEllipsis />
                                        </BreadcrumbItem>

                                        <BreadcrumbSeparator />
                                    </>
                                )}
                                {selectedDemo?.id !== "dropdown" && (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href="#">Components</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>

                                        {selectedDemo?.id === "separator" ? (
                                            <CustomSeparator />
                                        ) : (
                                            <BreadcrumbSeparator />
                                        )}
                                    </>
                                )}
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>   
                </div>
                <CustomCodeBlock
                    code={[
                        {
                            language: "tsx",
                            filename: "LabelExample.tsx",
                            code: codeSnippet.trim() || ``
                        }
                    ]}
                    defaultValue="tsx"
                    lineNumbers={true}
                />
            </div>
        </>
    )
}

const BreadcrumbDropdown = ({ triggerLabel }: { triggerLabel: string | undefined }) => {
    return (
        <>
            <BreadcrumbItem>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                        {triggerLabel ? (
                            <>{triggerLabel}</>
                        ) : (
                            <>
                                <BreadcrumbEllipsis className="size-4" />
                                <span className="sr-only">Toggle menu</span>
                            </>
                        )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem>Documentation</DropdownMenuItem>
                        <DropdownMenuItem>Themes</DropdownMenuItem>
                        <DropdownMenuItem>GitHub</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
        </>
    )
}

const CustomSeparator = () => {
    return (
        <BreadcrumbSeparator>
            <Icon path={mdiSlashForward} className="mx-2" />
        </BreadcrumbSeparator>
    )
}