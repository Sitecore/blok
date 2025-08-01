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
                npx shadcn@latest add use-brandkits
              </code>
            </div>
          </div>

          {/* Import */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Import</h3>
            <div className="bg-muted rounded-lg p-4">
              <code className="text-sm">
                {"import { useBrandkits } from '@sitecore/stream-ui-blok';"}
              </code>
            </div>
          </div>

          {/* Basic Usage */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Basic Usage</h3>
            <div className="bg-muted rounded-lg p-4">
              <code className="text-sm">
                {
                  "const { brandkits, isLoading, error } = useBrandkits({ organizationId: 'org-123', pageSize: 10, pageNumber: 1 });"
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
            The useBrandkits hook provides a comprehensive way to fetch and
            manage brandkit data with built-in utilities and computed
            properties.
          </p>
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
                {`// Basic usage
const { brandkits, isLoading, error } = useBrandkits({
  organizationId: 'org-123',
  pageSize: 10,
  pageNumber: 1,
});`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Enhanced Usage</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// Enhanced usage with computed properties
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
                - for Brandkit types and API services
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
