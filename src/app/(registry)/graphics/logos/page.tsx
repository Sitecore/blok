"use client";

import { copyToClipboard } from "@/components/docsite/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const logosData = [
  {
    brand: "Sitecore",
    type: "Logo",
    filename: "logo-sitecore",
  },
  {
    brand: "Sitecore",
    type: "Mark",
    filename: "mark-sitecore",
  },
  {
    brand: "SitecoreAI",
    type: "Logo",
    filename: "logo-sitecoreai",
  },
  {
    brand: "SitecoreAI",
    type: "Mark",
    filename: "mark-sitecoreai",
  },
  {
    brand: "Sitecore Cloud Portal",
    type: "Logo",
    filename: "logo-sc_cloud_portal",
  },
  {
    brand: "Sitecore Demos",
    type: "Logo",
    filename: "logo-sc_demo",
  },
  {
    brand: "SitecoreAI Deploy",
    type: "Logo",
    filename: "logo-sitecoreai_deploy",
  },
  {
    brand: "SitecoreAI Deploy",
    type: "Mark",
    filename: "mark-sitecoreai_deploy",
  },
  {
    brand: "Sitecore Developers",
    type: "Logo",
    filename: "logo-sc_developers",
  },
  {
    brand: "Sitecore Documentation",
    type: "Logo",
    filename: "logo-sc_doc",
  },
  {
    brand: "Sitecore Learning",
    type: "Logo",
    filename: "logo-sc_learning",
  },
  {
    brand: "Sitecore MVP Program",
    type: "Logo",
    filename: "logo-sc_mvp",
  },
  {
    brand: "Sitecore Partner Network",
    type: "Logo",
    filename: "logo-sc_partners",
  },
  {
    brand: "Sitecore Support",
    type: "Logo",
    filename: "logo-sc_support",
  },
  {
    brand: "Blok",
    type: "Logo",
    filename: "logo-blok",
  },
  {
    brand: "Blok",
    type: "Mark",
    filename: "mark-blok",
  },
  {
    brand: "CDP",
    type: "Logo",
    filename: "logo-cdp",
  },
  {
    brand: "CDP",
    type: "Mark",
    filename: "mark-cdp",
  },
  {
    brand: "Connect",
    type: "Logo",
    filename: "logo-connect",
  },
  {
    brand: "Connect",
    type: "Mark",
    filename: "mark-connect",
  },
  {
    brand: "Content Hub",
    type: "Logo",
    filename: "logo-content_hub",
  },
  {
    brand: "Content Hub",
    type: "Mark",
    filename: "mark-content_hub",
  },
  {
    brand: "Content Hub ONE",
    type: "Logo",
    filename: "logo-content_hub_one",
  },
  {
    brand: "Content Hub ONE",
    type: "Mark",
    filename: "mark-content_hub_one",
  },
  {
    brand: "OrderCloud",
    type: "Logo",
    filename: "logo-ordercloud",
  },
  {
    brand: "OrderCloud",
    type: "Mark",
    filename: "mark-ordercloud",
  },
  {
    brand: "Personalize",
    type: "Logo",
    filename: "logo-personalize",
  },
  {
    brand: "Personalize",
    type: "Mark",
    filename: "mark-personalize",
  },
  {
    brand: "Search",
    type: "Logo",
    filename: "logo-search",
  },
  {
    brand: "Search",
    type: "Mark",
    filename: "mark-search",
  },
  {
    brand: "Stream",
    type: "Logo",
    filename: "logo-stream",
  },
  {
    brand: "Stream",
    type: "Mark",
    filename: "mark-stream",
  },
  {
    brand: "XM Cloud",
    type: "Logo",
    filename: "logo-xm_cloud",
  },
  {
    brand: "XM Cloud",
    type: "Mark",
    filename: "mark-xm_cloud",
  },
  {
    brand: "XM Cloud Content",
    type: "Logo",
    filename: "logo-xm_cloud_content",
  },
  {
    brand: "XM Cloud Content",
    type: "Mark",
    filename: "mark-xm_cloud_content",
  },
  {
    brand: "XM Cloud Deploy",
    type: "Logo",
    filename: "logo-xm_cloud_deploy",
  },
  {
    brand: "XM Cloud Deploy",
    type: "Mark",
    filename: "mark-xm_cloud_deploy",
  },
  {
    brand: "Experience Manager",
    type: "Logo",
    filename: "logo-xm",
  },
  {
    brand: "Experience Manager",
    type: "Mark",
    filename: "mark-xm",
  },
  {
    brand: "Experience Platform",
    type: "Logo",
    filename: "logo-xp",
  },
  {
    brand: "Experience Platform",
    type: "Mark",
    filename: "mark-xp",
  },
  {
    brand: "Experience Commerce",
    type: "Logo",
    filename: "logo-xc",
  },
  {
    brand: "Experience Commerce",
    type: "Mark",
    filename: "mark-xc",
  },
];

export default function LogosPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl tracking-tight">Logos</h1>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <Alert variant="primary">
          <AlertTitle className="text-base font-semibold mb-1">
            Recommended use
          </AlertTitle>
          <AlertDescription>
            We recommend using the URL as your image source to use the logos
            inside your product UI. This way, if we make any changes to the
            logo, it will automatically be updated in your product.
          </AlertDescription>
        </Alert>

        <Card style="filled">
          <CardContent className="flex flex-col gap-2">
            <a
              href="https://sitecore.atlassian.net/wiki/spaces/SDS/pages/3990487063"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 no-underline text-sm"
            >
              Product Design usage guidelines
            </a>
            <a
              href="/graphics/favicons"
              className="text-primary hover:text-primary/80 no-underline text-sm"
            >
              Favicons
            </a>
            <a
              href="https://sitecore.atlassian.net/wiki/spaces/UX/blog/2022/10/04/3949690986"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 no-underline text-sm"
            >
              Blog post about logos
            </a>
          </CardContent>
        </Card>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 min-w-[200px]">
                  SVG (Normal)
                </TableHead>
                <TableHead className="px-4 min-w-[200px]">SVG (Dark)</TableHead>
                <TableHead className="px-4">Brand</TableHead>
                <TableHead className="px-4">Type</TableHead>
                <TableHead className="px-4">URL (Normal)</TableHead>
                <TableHead className="px-4">URL (Dark)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logosData.map(({ filename, brand, type }, index) => (
                <TableRow key={`${filename}-${index}`}>
                  <TableCell className="px-4 py-3 min-w-[200px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() =>
                            copyToClipboard(
                              `https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/${filename}`
                            )
                          }
                          className="cursor-pointer h-7 flex items-center"
                        >
                          <img
                            src={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/${filename}`}
                            alt={brand}
                            className="h-7 object-contain object-left"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Copy URL</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="px-4 py-3 min-w-[200px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() =>
                            copyToClipboard(
                              `https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/${filename}-dark`
                            )
                          }
                          className="cursor-pointer h-7 flex items-center"
                        >
                          <img
                            src={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/${filename}-dark`}
                            alt={`${brand} Dark`}
                            className="h-7 object-contain object-left"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Copy URL</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-sm whitespace-nowrap">
                    {brand}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge colorScheme="neutral" size="sm">
                      {type}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <a
                      href={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/${filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 no-underline text-sm transition-colors whitespace-nowrap"
                    >
                      URL (Normal)
                    </a>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <a
                      href={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/${filename}-dark`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 no-underline text-sm transition-colors whitespace-nowrap"
                    >
                      URL (Dark)
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
