"use client"

import { createBrandkit } from "@sitecore/stream-ui-core"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

// Mock data for ContentHub demo
const mockContentHubBrandkits = [
  createBrandkit({
    id: "ch-1",
    organizationId: "contenthub-brand-123",
    name: "Nike Air Max",
    logo: "https://example.com/nike-logo.png",
    status: "published",
    brandName: "Nike",
    companyName: "Nike Inc",
    industry: "Sports & Athletic",
  }),
  createBrandkit({
    id: "ch-2",
    organizationId: "contenthub-brand-123",
    name: "Adidas Boost",
    logo: "https://example.com/adidas-logo.png",
    status: "draft",
    brandName: "Adidas",
    companyName: "Adidas Group",
    industry: "Sports & Athletic",
  }),
  createBrandkit({
    id: "ch-3",
    organizationId: "contenthub-brand-123",
    name: "Nike Jordan",
    logo: "",
    status: "published",
    brandName: "Nike",
    companyName: "Nike Inc",
    industry: "Sports & Athletic",
  }),
]

export default function UseContentHubBrandkitsPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>useContentHubBrandkits Hook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Hook Overview</h3>
              <p className="text-muted-foreground">
                The useContentHubBrandkits hook fetches brandkits from ContentHub API for a specific brand.
                It returns the same interface as useBrandkits() for consistent developer experience.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Mock ContentHub Data</h3>
              <div className="grid gap-2">
                {mockContentHubBrandkits.map((brandkit) => (
                  <div key={brandkit.id} className="rounded border p-3">
                    <div className="font-medium">{brandkit.name}</div>
                    <div className="text-muted-foreground text-sm">
                      Status: {brandkit.status} | Brand: {brandkit.brandName} | Industry: {brandkit.industry}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Usage Examples</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// Basic usage
const { brandkits, isLoading, error } = useContentHubBrandkits({
  brandId: 123
});

// With search filtering
const {
  brandkits,
  utils,
  draftBrandkits
} = useContentHubBrandkits({
  brandId: 123,
  search: 'nike'
});

// Same utilities as default hook
const brandkitByName = utils.findByName('Nike Air');
const summary = utils.summary();

// Using utility functions
const publishedItems = utils.filterByStatus('published');
const names = utils.getDisplayNames();
const stats = utils.summary();
console.log(\`Total: \${stats.total}, Published: \${stats.published}\`);`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">ContentHub-Specific Features</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Simplified interface with ContentHub brand ID (number)</li>
                <li>Client-side search filtering (ContentHub API doesn't support server-side search)</li>
                <li>Same return interface as useBrandkits for consistency</li>
                <li>ContentHub-specific API transformation and normalization</li>
                <li>No pagination support (ContentHub limitation)</li>
                <li>Built-in error handling for ContentHub API responses</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Parameters</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <code className="bg-muted rounded px-2 py-1">brandId: number</code> - Required ContentHub brand ID
                </div>
                <div>
                  <code className="bg-muted rounded px-2 py-1">search?: string</code> - Optional search term (client-side filtering)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}