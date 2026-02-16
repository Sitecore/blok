export const usage = `"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function ExampleCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}`;

export const combobox = {
  name: "combobox",
  preview: {
    defaultComponent: "combobox",
  },
  usage: {
    usage: [
      `import {\n  Combobox,\n  ComboboxContent,\n  ComboboxEmpty,\n  ComboboxInput,\n  ComboboxItem,\n  ComboboxList,\n} from "@/components/ui/combobox"`,
      `const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]\n\nexport function ExampleCombobox() {\n  return (\n    <Combobox items={frameworks}>\n      <ComboboxInput placeholder="Select a framework" />\n      <ComboboxContent>\n        <ComboboxEmpty>No items found.</ComboboxEmpty>\n        <ComboboxList>\n          {(item) => (\n            <ComboboxItem key={item} value={item}>\n              {item}\n            </ComboboxItem>\n          )}\n        </ComboboxList>\n      </ComboboxContent>\n    </Combobox>\n  )\n}`,
    ],
  },
  components: {
    Multiple: { component: "combobox-multiple" },
    "Clear Button": { component: "combobox-clear-button" },
    Groups: { component: "combobox-groups" },
    "Custom Items": { component: "combobox-custom-items" },
    Invalid: { component: "combobox-invalid" },
    Disabled: { component: "combobox-disabled" },
    "Auto Highlight": { component: "combobox-auto-highlight" },
    "Input Group": { component: "combobox-input-group" },
  },
};
