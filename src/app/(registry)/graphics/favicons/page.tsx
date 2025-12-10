import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const faviconsData = [
  {
    brand: "Sitecore",
    name: "sitecore",
  },
  {
    brand: "Blok",
    name: "blok",
  },
  {
    brand: "CDP",
    name: "cdp",
  },
  {
    brand: "Connect",
    name: "connect",
  },
  {
    brand: "Content Hub",
    name: "content_hub",
  },
  {
    brand: "Content Hub ONE",
    name: "content_hub_one",
  },
  {
    brand: "OrderCloud",
    name: "ordercloud",
  },
  {
    brand: "Personalize",
    name: "personalize",
  },
  {
    brand: "Search",
    name: "search",
  },
  {
    brand: "Stream",
    name: "stream",
  },
  {
    brand: "XM Cloud",
    name: "xm_cloud",
  },
  {
    brand: "XM Cloud Content",
    name: "xm_cloud_content",
  },
  {
    brand: "XM Cloud Deploy",
    name: "xm_cloud_deploy",
  },
  {
    brand: "Experience Manager",
    name: "xm",
  },
  {
    brand: "Experience Platform",
    name: "xp",
  },
  {
    brand: "Experience Commerce",
    name: "xc",
  },
  {
    brand: "SitecoreAI Deploy",
    name: "sitecoreai_deploy",
  },
  {
    brand: "SitecoreAI",
    name: "sitecoreai",
  },
];

export default function FaviconsPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl ">Favicons</h1>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <Alert variant="primary">
          <AlertDescription className="flex">
            To install the favicon you need, paste the corresponding code in the{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono whitespace-normal break-words">
              {`<head>`}
            </code>{" "}
            tag of your app
          </AlertDescription>
        </Alert>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 min-w-[100px]">Preview</TableHead>
                <TableHead className="px-4 min-w-[200px]">Brand</TableHead>
                <TableHead className="px-4">Code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faviconsData.map(({ brand, name }, index) => (
                <TableRow key={`${name}-${index}`}>
                  <TableCell className="px-4 min-w-[100px]">
                    <img
                      src={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/mark-${name}`}
                      alt={brand}
                      className="h-6 object-contain object-left"
                    />
                  </TableCell>
                  <TableCell className="px-4 min-w-[200px] whitespace-nowrap">
                    {brand}
                  </TableCell>
                  <TableCell className="px-4">
                    <pre className="p-3 rounded bg-muted text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                      {`<link rel="icon" type="image/svg+xml" href="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/mark-${name}">\n`}
                      {`<link rel="icon" type="image/png" sizes="32x32" href="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/favicon-${name}?t=favicon32">\n`}
                      {`<link rel="icon" type="image/png" sizes="128x128" href="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/favicon-${name}?t=favicon128">\n`}
                      {`<link rel="apple-touch-icon" type="image/png" sizes="180x180" href="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/favicon-${name}?t=favicon180">\n`}
                      {`<link rel="icon" type="image/png" sizes="192x192" href="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/favicon-${name}?t=favicon192">`}
                    </pre>
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
