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
    code?: string;
}

type BreadcrumbDemoProps = {
    selectedDemo: DemoObject;
}

export const BreadcrumbDemo: FC<BreadcrumbDemoProps> = ({ selectedDemo }) => {
    const { id } = selectedDemo;

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

                                <ConditionalSeparator id={id} />

                                {id === "main" || id === "dropdown" ? (
                                    <BreadcrumbDropdown triggerLabel={id === "main" ? undefined : "Components"} />
                                ) : id === "collapsed" ? (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbEllipsis />
                                        </BreadcrumbItem>

                                        <BreadcrumbSeparator />
                                    </>
                                ) : null}

                                {id !== "dropdown" && (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href="#">Components</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        <ConditionalSeparator id={id} />
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
                            code: selectedDemo?.code?.trim() || ``
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

const ConditionalSeparator = ({ id }: { id: string }) => {
    return id === "separator" ? (
        <BreadcrumbSeparator>
            <Icon path={mdiSlashForward} className="mx-2" />
        </BreadcrumbSeparator>
    ) : (
        <BreadcrumbSeparator />
    )
}