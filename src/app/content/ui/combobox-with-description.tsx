"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemDescription,
  ComboboxItemText,
  ComboboxItemTitle,
  ComboboxList,
} from "@/components/ui/combobox";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";

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

export default function ComboboxWithDescriptionDemo() {
  return (
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
  );
}
