"use client"

import Link from "next/link"
import { createBrandkit } from "@sitecore/stream-ui-core"

import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

// Mock data for demo - ContentHub specific brandkits
const mockBrandkits = [
  createBrandkit({
    id: "ch-1",
    organizationId: "contenthub-brand-123",
    name: "Nike Global Brand",
    logo: "https://example.com/nike-logo.png",
    status: "published",
    brandName: "Nike",
    companyName: "Nike Inc.",
    industry: "Sports & Apparel",
  }),
  createBrandkit({
    id: "ch-2", 
    organizationId: "contenthub-brand-123",
    name: "Nike Air Max Collection",
    logo: "https://example.com/nike-airmax-logo.png",
    status: "draft",
    brandName: "Nike Air Max",
    companyName: "Nike Inc.",
    industry: "Sports & Apparel",
  }),
  createBrandkit({
    id: "ch-3",
    organizationId: "contenthub-brand-123", 
    name: "Nike Basketball",
    logo: "",
    status: "published",
    brandName: "Nike Basketball",
    companyName: "Nike Inc.",
    industry: "Sports & Apparel",
  }),
]

export default function UseContentHubBrandkitsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <Link href="/hooks">
          <Button variant="outline" className="mb-4">
            ← Back to Hooks
          </Button>
        </Link>
      </div>

      {/* Quick Start */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Installation</h3>
            <div className="bg-muted rounded-lg p-4">
              <code className="text-sm">
                npx shadcn@latest add use-contenthub-brandkits
              </code>
            </div>
          </div>

          {/* Import */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Import</h3>
            <div className="bg-muted rounded-lg p-4">
              <code className="text-sm">
                {"import { useContentHubBrandkits } from '@/registry/new-york/stream/hooks/use-contenthub-brandkits';"}
              </code>
            </div>
          </div>

          {/* Basic Usage */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Basic Usage</h3>
            <div className="bg-muted rounded-lg p-4">
              <code className="text-sm">
                {
                  "const { brandkits, isLoading, error } = useContentHubBrandkits({ brandId: 123 });"
                }
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hook Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Hook Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            The useContentHubBrandkits hook provides access to brandkits from ContentHub API 
            for a specific brand ID. It maintains the same interface as useBrandkits for 
            consistent developer experience, with client-side filtering and search capabilities.
          </p>
        </CardContent>
      </Card>

      {/* Key Differences */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Key Differences from Standard Hook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-green-600">ContentHub Hook</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Requires <code className="bg-muted rounded px-1">brandId</code> (number)</li>
                  <li>• Uses ContentHub API endpoints</li>
                  <li>• Client-side search/filtering only</li>
                  <li>• No server-side pagination</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600">Standard Hook</h4>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Requires <code className="bg-muted rounded px-1">organizationId</code> (string)</li>
                  <li>• Uses standard Stream API</li>
                  <li>• Server-side search/filtering</li>
                  <li>• Server-side pagination support</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Basic Usage</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// Basic ContentHub usage
const { brandkits, isLoading, error } = useContentHubBrandkits({
  brandId: 123  // ContentHub brand ID (number)
});`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">With Search (Client-side)</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// With client-side search filtering
const { brandkits, isLoading, error } = useContentHubBrandkits({
  brandId: 123,
  search: 'nike'  // Client-side filtering
});`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Enhanced Usage</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// Full usage with utilities (same interface as useBrandkits)
const {
  brandkits,
  draftBrandkits,
  publishedBrandkits,
  totalCount,
  utils,
  isLoading,
  error,
  refetch
} = useContentHubBrandkits({
  brandId: 123,
  search: 'nike'
});

// Same utilities as standard hook
const brandkitByName = utils.findByName('Nike Air');
const publishedOnly = utils.filterByStatus('published');
const displayNames = utils.getDisplayNames();
const summary = utils.summary();

// Refetch data
await refetch();`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Reference */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>API Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Options</h4>
              <div className="mt-2">
                <code className="bg-muted rounded p-2 text-sm">
                  brandId: number (required) - ContentHub brand identifier
                </code>
              </div>
              <div className="mt-2">
                <code className="bg-muted rounded p-2 text-sm">
                  search?: string - Client-side search term for filtering
                </code>
              </div>
            </div>

            <div>
              <h4 className="font-semibold">Return Value</h4>
              <div className="mt-2 space-y-1 text-sm">
                <div>• <strong>brandkits</strong>: Brandkit[] - Filtered brandkit array</div>
                <div>• <strong>isLoading</strong>: boolean - Loading state</div>
                <div>• <strong>error</strong>: Error | null - Error state</div>
                <div>• <strong>refetch</strong>: () =&gt; Promise&lt;void&gt; - Refetch function</div>
                <div>• <strong>draftBrandkits</strong>: Brandkit[] - Draft brandkits only</div>
                <div>• <strong>publishedBrandkits</strong>: Brandkit[] - Published brandkits only</div>
                <div>• <strong>totalCount</strong>: number - Total brandkit count</div>
                <div>• <strong>pagination</strong>: object - Pagination metadata (limited for ContentHub)</div>
                <div>• <strong>utils</strong>: object - Utility functions for data manipulation</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>Fetch brandkits from ContentHub API by brand ID</li>
            <li>Client-side search and filtering capabilities</li>
            <li>Same interface as useBrandkits for consistency</li>
            <li>Computed properties: draftBrandkits, publishedBrandkits, totalCount</li>
            <li>Utility functions for filtering and searching</li>
            <li>Error handling and loading states</li>
            <li>Automatic refetch capabilities</li>
            <li>Type-safe with TypeScript</li>
          </ul>
        </CardContent>
      </Card>

      {/* Dependencies */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Dependencies</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">
            This hook requires the following dependencies:
          </p>
          <ul className="space-y-1 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">•</span>
              <code className="bg-muted rounded px-2 py-1">
                @sitecore/stream-ui-core
              </code>
              <span className="text-muted-foreground">
                - for ContentHub API clients, Brandkit types, and transformation utilities
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Mock Data Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Mock Data Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {mockBrandkits.map((brandkit) => (
              <div key={brandkit.id} className="rounded border p-3">
                <div className="font-medium">{brandkit.name}</div>
                <div className="text-muted-foreground text-sm">
                  Status: {brandkit.status} | Industry: {brandkit.industry}
                </div>
                <div className="text-muted-foreground text-xs">
                  ContentHub ID: {brandkit.id}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}