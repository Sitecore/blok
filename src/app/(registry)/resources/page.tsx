"use client";

import BlokFoundationsThumb from "@/components/component-thumbs/blok-foundations";
import CodeGuidelineThumb from "@/components/component-thumbs/code-guideline";
import ContributionGuide from "@/components/component-thumbs/contribution-guide";
import LogosThumb from "@/components/component-thumbs/logos";
import RtlThumb from "@/components/component-thumbs/rtl";
import ShadcnMcpThumb from "@/components/component-thumbs/shadcn-mcp";
import WritingUITextThumb from "@/components/component-thumbs/writing-ui-text";
import { ComponentGridCard } from "@/components/docsite/component-grid-card";
import { Badge } from "@/components/ui/badge";

const guidelinesItems = [
  {
    name: "mcp",
    title: "MCP",
    href: "/mcp",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <ShadcnMcpThumb />
      </div>
    ),
  },
  {
    name: "rtl",
    title: "RTL Support",
    href: "/rtl",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <RtlThumb />
      </div>
    ),
  },
  {
    name: "sitecore-brand-portal",
    title: "Sitecore brand portal",
    href: "https://www.sitecore.com/company/brand-guidelines",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <LogosThumb />
      </div>
    ),
  },
  {
    name: "contribtuion-guide",
    title: "Contribution Guide",
    href: "https://github.com/Sitecore/blok?tab=contributing-ov-file#readme",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <ContributionGuide />
      </div>
    ),
  },
];

const resourcesItems = [
  {
    name: "blok-foundations",
    title: "Blok foundations",
    href: "https://www.figma.com/file/liab04R7gzEYiK1AtveQ6q/Blok-Foundations?type=design&mode=design&t=rGSCngysHfmCUGmC-7",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <BlokFoundationsThumb />
      </div>
    ),
  },
  {
    name: "blok-components",
    title: "Blok components",
    href: "https://www.figma.com/file/x0CUbrC5Kjcuk64VPCnbgz/Blok-Components?type=design&mode=design&t=rGSCngysHfmCUGmC-7",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <BlokFoundationsThumb />
      </div>
    ),
  },
  {
    name: "blok-icons-mdi",
    title: "Blok icons (MDI)",
    href: "https://www.figma.com/file/xDdIuGRS0CrJHOGF1pXlyn/Blok-Icons-(MDI)?type=design&mode=design&t=rGSCngysHfmCUGmC-7",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <BlokFoundationsThumb />
      </div>
    ),
  },
  {
    name: "sitecore-brand-colors",
    title: "Sitecore brand colors",
    href: "https://www.figma.com/file/fMpdOBsbxX15i4Z8GGBn9V/Sitecore-Brand-Colors?type=design&mode=design&t=rGSCngysHfmCUGmC-7",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <BlokFoundationsThumb />
      </div>
    ),
  },
  {
    name: "code-guideline",
    title: "Code guideline",
    href: "https://sitecore.atlassian.net/wiki/x/UQOh3g",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <CodeGuidelineThumb />
      </div>
    ),
  },
  {
    name: "writing-ui-text",
    title: "Writing UI text",
    href: "https://sitecore.atlassian.net/wiki/spaces/SDS/pages/3736404151",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <WritingUITextThumb />
      </div>
    ),
  },
  {
    name: "documentation-style",
    title: "Documentation style",
    href: "https://writing.sitecore.com/style-guide/index.html",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <WritingUITextThumb />
      </div>
    ),
  },
  {
    name: "sitecore-terminology",
    title: "Sitecore terminology",
    href: "https://sitecore.atlassian.net/wiki/spaces/SCPEDIA/pages/4235329557",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <LogosThumb />
      </div>
    ),
  },
];

export default function ResourcesPage() {
  return (
    <div className="w-full p-5 md:p-10 ">
      <div className="max-w-[1250px] mx-auto">
        <div className="mb-8 ">
          <h1 className="font-semibold text-4xl">Resources</h1>
          <p className="mt-2 text-muted-foreground">
            Additional resources, documentation, and helpful links for the Blok
            design system.
          </p>
        </div>

        {/* Guidelines Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold  text-foreground mb-6">
            Public guidelines{" "}
            <Badge size="sm" variant="bold">
              MORE COMING SOON
            </Badge>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(224px,224px))] gap-y-6 gap-x-6 justify-items-start">
            {guidelinesItems.map((item) => (
              <ComponentGridCard
                key={item.name}
                title={item.title}
                href={item.href}
                preview={item.preview}
              />
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Private internal resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(224px,224px))] gap-y-6 gap-x-6 justify-items-start">
            {resourcesItems.map((item) => (
              <ComponentGridCard
                key={item.name}
                title={item.title}
                href={item.href}
                preview={item.preview}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
