import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemDescription,
  DropdownMenuItemText,
  DropdownMenuItemTitle,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icon";
import { mdiInformationOutline } from "@mdi/js";

type DescItem = {
  title: string;
  textValue: string;
  description: string;
};

const itemsAuthoring: DescItem[] = [
  {
    title: "XM Cloud",
    textValue: "XM Cloud",
    description:
      "Cloud-native Sitecore CMS with managed hosting, previews, and deployments.",
  },
  {
    title: "Component Builder",
    textValue: "Component Builder",
    description:
      "Front-end-as-a-service style guide and visual component prototyping for your brand.",
  },
  {
    title: "XMC Forms",
    textValue: "XMC Forms",
    description: "Design clear, on-brand forms for use directly on the page.",
  },
  {
    title: "Page builder",
    textValue: "Page builder",
    description:
      "Create and edit pages visually, with layout, content, and multi-user authoring in one place.",
  },
];

const itemsPlatform: DescItem[] = [
  {
    title: "Experience Edge",
    textValue: "Experience Edge",
    description:
      "Deliver structured content over GraphQL and the CDN for headless experiences.",
  },
  {
    title: "Blok",
    textValue: "Blok",
    description:
      "Sitecore design system for building consistent product experiences.",
  },
  {
    title: "Sitecore Search",
    textValue: "Sitecore Search",
    description:
      "Unified search across content and commerce to power discovery on your sites.",
  },
  {
    title: "Sitecore CDP",
    textValue: "Sitecore CDP",
    description:
      "Unify customer profiles and activate audiences across marketing channels.",
  },
];

export default function DropdownMenuWithDescriptionDemo() {
  return (
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" colorScheme="neutral">
              XM Cloud Authoring
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[22rem]">
            <DropdownMenuGroup>
              {itemsAuthoring.map(({ title, textValue, description }) => (
                <DropdownMenuItem
                  key={textValue}
                  className="py-2"
                  textValue={textValue}
                >
                  <DropdownMenuItemText>
                    <DropdownMenuItemTitle>{title}</DropdownMenuItemTitle>
                    <DropdownMenuItemDescription>
                      {description}
                    </DropdownMenuItemDescription>
                  </DropdownMenuItemText>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" colorScheme="neutral">
              Platform & Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[22rem]">
            <DropdownMenuGroup>
              {itemsPlatform.map(({ title, textValue, description }) => (
                <DropdownMenuItem
                  key={textValue}
                  className="py-2"
                  textValue={textValue}
                >
                  <Icon
                    path={mdiInformationOutline}
                    size={1}
                    className="size-5 shrink-0 text-subtle-text"
                  />
                  <DropdownMenuItemText>
                    <DropdownMenuItemTitle>{title}</DropdownMenuItemTitle>
                    <DropdownMenuItemDescription>
                      {description}
                    </DropdownMenuItemDescription>
                  </DropdownMenuItemText>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
