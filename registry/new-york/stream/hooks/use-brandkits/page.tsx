"use client"

import { createBrandkit } from "@sitecore/stream-ui-core"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

// Mock data for demo
const mockBrandkits = [
  createBrandkit({
    id: "1",
    organizationId: "org-123",
    name: "Sitecore Brand",
    logo: "https://example.com/sitecore-logo.png",
    status: "published",
    brandName: "Sitecore",
    companyName: "Sitecore",
    industry: "Technology",
  }),
  createBrandkit({
    id: "2",
    organizationId: "org-123",
    name: "Marketing Kit",
    logo: "https://example.com/marketing-logo.png",
    status: "draft",
    brandName: "Marketing",
    companyName: "Marketing Corp",
    industry: "Marketing",
  }),
  createBrandkit({
    id: "3",
    organizationId: "org-123",
    name: "Design System",
    logo: "",
    status: "published",
    brandName: "Design",
    companyName: "Design Inc",
    industry: "Design",
  }),
]

export default function UseBrandkitsPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>useBrandkits Hook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Hook Overview</h3>
              <p className="text-muted-foreground">
                The useBrandkits hook provides a comprehensive way to fetch and
                manage brandkit data with built-in utilities and computed
                properties.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Mock Data</h3>
              <div className="grid gap-2">
                {mockBrandkits.map((brandkit) => (
                  <div key={brandkit.id} className="rounded border p-3">
                    <div className="font-medium">{brandkit.name}</div>
                    <div className="text-muted-foreground text-sm">
                      Status: {brandkit.status} | Industry: {brandkit.industry}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Usage Example</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// Basic usage
const { brandkits, isLoading, error } = useBrandkits({
  organizationId: 'org-123',
  pageSize: 10,
  pageNumber: 1,
});

// Enhanced usage with computed properties
const {
  brandkits,
  draftBrandkits,
  publishedBrandkits,
  totalCount,
  utils,
  isLoading
} = useBrandkits({
  organizationId: 'org-123',
  pageSize: 20
});

// Using utility functions
const brandkitByName = utils.findByName('My Brandkit');
const draftBrandkits = utils.filterByStatus('draft');
const industryBrandkits = utils.filterByTag('industry', 'technology');
const displayNames = utils.getDisplayNames();
const summary = utils.summary();`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Features</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Fetch brandkits with pagination and filtering</li>
                <li>
                  Computed properties: draftBrandkits, publishedBrandkits,
                  totalCount
                </li>
                <li>Utility functions for filtering and searching</li>
                <li>Error handling and loading states</li>
                <li>Automatic refetch capabilities</li>
                <li>Type-safe with TypeScript</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
