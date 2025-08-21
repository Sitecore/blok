'use client'

import CustomCodeBlock from "../label/code-block"
import { FC } from "react"
import { RadioGroup, RadioGroupItem } from "@/registry/new-york/ui/radio-group"
import { Label } from "@/registry/new-york/ui/label"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/new-york/ui/form"
import { Button } from "@/registry/new-york/ui/button"
import { useForm } from "react-hook-form"

type DemoObject = {
    id: string;
    title?: string;
    code?: string;
}

type RadioGroupDemoProps = {
    selectedDemo: DemoObject;
}

export const RadioGroupDemo: FC<RadioGroupDemoProps> = ({ selectedDemo }) => {
    const { id } = selectedDemo;

    return (
        <>
            <div className="mt-9 mb-3">
                <p className="text-xl font-semibold">{selectedDemo?.title}</p>
            </div>

            <div className="rounded-lg bg-white overflow-clip w-full flex flex-col">
                <div className="w-full py-8 min-h-[200px] flex justify-center items-center">
                    <div className="w-full flex justify-center">
                        {id === "main" ? (
                            <RadioGroupComponent />
                        ) : (
                            <RadioGroupForm />
                        )}
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

const RadioGroupComponent = () => {
    return (
        <RadioGroup defaultValue="comfortable">
            <div className="flex items-center gap-3">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center gap-3">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center gap-3">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
            </div>
        </RadioGroup>
    )
}

const RadioGroupForm = () => {
    const FormSchema = z.object({
        type: z.enum(["all", "mentions", "none"], {
            required_error: "You need to select a notification type."
        }),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values", {
            description: (
                <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>Notify me about...</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col"
                                >
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="font-normal">All new messages</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="mentions" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Mentions only</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center gap-3">
                                        <FormControl>
                                            <RadioGroupItem value="none" />
                                        </FormControl>
                                        <FormLabel className="font-normal">Nothing</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}