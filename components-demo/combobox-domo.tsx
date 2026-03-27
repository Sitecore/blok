"use client";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemDescription,
  ComboboxItemText,
  ComboboxItemTitle,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { InputGroupAddon } from "@/components/ui/input-group";
import { GlobeIcon } from "lucide-react";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";
import * as React from "react";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const;

const timezones = [
  {
    value: "Americas",
    items: [
      "(GMT-5) New York",
      "(GMT-8) Los Angeles",
      "(GMT-6) Chicago",
      "(GMT-5) Toronto",
      "(GMT-8) Vancouver",
      "(GMT-3) São Paulo",
    ],
  },
  {
    value: "Europe",
    items: [
      "(GMT+0) London",
      "(GMT+1) Paris",
      "(GMT+1) Berlin",
      "(GMT+1) Rome",
      "(GMT+1) Madrid",
      "(GMT+1) Amsterdam",
    ],
  },
  {
    value: "Asia/Pacific",
    items: [
      "(GMT+9) Tokyo",
      "(GMT+8) Shanghai",
      "(GMT+8) Singapore",
      "(GMT+4) Dubai",
      "(GMT+11) Sydney",
      "(GMT+9) Seoul",
    ],
  },
] as const;

const countries = [
  { code: "", value: "", continent: "", label: "Select country" },
  {
    code: "ar",
    value: "argentina",
    label: "Argentina",
    continent: "South America",
  },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  {
    code: "co",
    value: "colombia",
    label: "Colombia",
    continent: "South America",
  },
  { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "it", value: "italy", label: "Italy", continent: "Europe" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  {
    code: "nz",
    value: "new-zealand",
    label: "New Zealand",
    continent: "Oceania",
  },
  { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
  {
    code: "za",
    value: "south-africa",
    label: "South Africa",
    continent: "Africa",
  },
  { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
  {
    code: "gb",
    value: "united-kingdom",
    label: "United Kingdom",
    continent: "Europe",
  },
  {
    code: "us",
    value: "united-states",
    label: "United States",
    continent: "North America",
  },
];

type ProductItem = {
  id: string;
  label: string;
  description: string;
};

const itemsAuthoring: ProductItem[] = [
  {
    id: "xm-cloud",
    label: "XM Cloud",
    description:
      "Cloud-native Sitecore CMS with managed hosting, previews, and deployments.",
  },
  {
    id: "component-builder",
    label: "Component Builder",
    description:
      "Front-end-as-a-service style guide and visual component prototyping for your brand.",
  },
  {
    id: "xmc-forms",
    label: "XMC Forms",
    description: "Design clear, on-brand forms for use directly on the page.",
  },
  {
    id: "page-builder",
    label: "Page builder",
    description:
      "Create and edit pages visually, with layout, content, and multi-user authoring in one place.",
  },
];
const itemsPlatform: ProductItem[] = [
  {
    id: "experience-edge",
    label: "Experience Edge",
    description:
      "Deliver structured content over GraphQL and the CDN for headless experiences.",
  },
  {
    id: "blok",
    label: "Blok",
    description:
      "Sitecore design system for building consistent product experiences.",
  },
  {
    id: "sitecore-search",
    label: "Sitecore Search",
    description:
      "Unified search across content and commerce to power discovery on your sites.",
  },
  {
    id: "sitecore-cdp",
    label: "Sitecore CDP",
    description:
      "Unify customer profiles and activate audiences across marketing channels.",
  },
];


export function ComboboxDemo() {

  const anchor = useComboboxAnchor();

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Combobox</h2>
      
    <div className="flex w-full gap-4">

      {/* Multiple Combobox */}
      <div id="combobox-multiple">
        <Combobox
          multiple
          autoHighlight
          items={frameworks}
          defaultValue={[frameworks[0]]}
        >
          <ComboboxChips ref={anchor} className="w-full max-w-xs">
            <ComboboxValue>
              {(values: readonly string[]) => (
                <React.Fragment>
                  {values.map((value: string) => (
                    <ComboboxChip key={value}>{value}</ComboboxChip>
                  ))}
                  <ComboboxChipsInput />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Combobox With Clear Button */}
      <div id="combobox-clear_button">
        <Combobox items={frameworks} defaultValue={frameworks[0]}>
          <ComboboxInput placeholder="Select a framework" showClear />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Combobox With Groups */}
      <div id="combobox-groups">
        <Combobox items={timezones}>
          <ComboboxInput placeholder="Select a timezone" />
          <ComboboxContent>
            <ComboboxEmpty>No timezones found.</ComboboxEmpty>
            <ComboboxList>
              {(group: (typeof timezones)[number], index: number) => (
                <ComboboxGroup key={group.value} items={group.items}>
                  <ComboboxLabel>{group.value}</ComboboxLabel>
                  <ComboboxCollection>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                  {index < timezones.length - 1 && <ComboboxSeparator />}
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Combobox With Custom Items */}
      <div id="combobox-custom_items">
        <Combobox
          items={countries.filter((country) => country.code !== "")}
          itemToStringValue={(country: (typeof countries)[number]) => country.label}
        >
          <ComboboxInput placeholder="Search countries..." />
          <ComboboxContent>
            <ComboboxEmpty>No countries found.</ComboboxEmpty>
            <ComboboxList>
              {(country: (typeof countries)[number]) => (
                <ComboboxItem key={country.code} value={country}>
                  <div data-slot="item" className="bg-transparent p-0 gap-2.5 ">
                    <div
                      data-slot="item-content"
                      className="flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none"
                    >
                      <div
                        data-slot="item-title"
                        className="flex w-fit items-center gap-2 text-sm leading-snug font-medium whitespace-nowrap"
                      >
                        {country.label}
                      </div>
                      <p
                        data-slot="item-description"
                        className="text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4"
                      >
                        {country.continent} ({country.code})
                      </p>
                    </div>
                  </div>
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Combobox With Auto Highlights */}
      <div id="combobox-auto_highlights">
        <Combobox items={frameworks} autoHighlight>
          <ComboboxInput placeholder="Select a framework" />
          <ComboboxContent>
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Combobox With Input Group */}
      <div id="combobox-input_group">
        <Combobox items={timezones}>
          <ComboboxInput placeholder="Select a timezone">
            <InputGroupAddon>
              <GlobeIcon />
            </InputGroupAddon>
          </ComboboxInput>
          <ComboboxContent alignOffset={-28} className="w-60">
            <ComboboxEmpty>No timezones found.</ComboboxEmpty>
            <ComboboxList>
              {(group: (typeof timezones)[number]) => (
                <ComboboxGroup key={group.value} items={group.items}>
                  <ComboboxLabel>{group.value}</ComboboxLabel>
                  <ComboboxCollection>
                    {(item: string) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      <div id="combobox-with-description">
        <div className="flex flex-wrap items-start gap-8 p-2">
          <div className="flex flex-col gap-2">
            <Combobox
              items={itemsAuthoring}
              itemToStringValue={(item: ProductItem) => item.label}
            >
              <ComboboxInput placeholder="XM Cloud Authoring" className="w-72" />
              <ComboboxContent className="min-w-[22rem]">
                <ComboboxEmpty>No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: ProductItem) => (
                    <ComboboxItem key={item.id} value={item} className="py-2">
                      <ComboboxItemText>
                        <ComboboxItemTitle>{item.label}</ComboboxItemTitle>
                        <ComboboxItemDescription>
                          {item.description}
                        </ComboboxItemDescription>
                      </ComboboxItemText>
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
          <div className="flex flex-col gap-2">
            <Combobox
              items={itemsPlatform}
              itemToStringValue={(item: ProductItem) => item.label}
            >
              <ComboboxInput placeholder="Platform & Data" className="w-72" />
              <ComboboxContent className="min-w-[22rem]">
                <ComboboxEmpty>No results found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: ProductItem) => (
                    <ComboboxItem key={item.id} value={item} className="py-2">
                      <Icon
                        path={mdiInformationOutline}
                        size={1}
                        className="size-5 shrink-0 text-subtle-text"
                      />
                      <ComboboxItemText>
                        <ComboboxItemTitle>{item.label}</ComboboxItemTitle>
                        <ComboboxItemDescription>
                          {item.description}
                        </ComboboxItemDescription>
                      </ComboboxItemText>
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </div>
    
    </div>
    </div>

  );
}