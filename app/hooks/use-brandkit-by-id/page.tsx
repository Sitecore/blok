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
const mockBrandkit = createBrandkit({
  id: "brandkit-123",
  organizationId: "org-456",
  name: "Enterprise Brand Kit",
  logo: "https://example.com/enterprise-logo.png",
  status: "published",
  brandName: "Enterprise Corp",
  companyName: "Enterprise Corporation",
  industry: "Technology",
  tags: [
    { category: "industry", values: ["technology"] },
    { category: "region", values: ["global"] },
    { category: "size", values: ["enterprise"] },
  ],
  metadata: {
    lastViewed: "2024-01-15T10:30:00Z",
    customField: "Custom Value",
    priority: "high",
  },
})

export default function UseBrandkitByIdPage() {
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
                npx shadcn@latest add use-brandkit-by-id
              </code>
            </div>
          </div>

          {/* Import */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Import</h3>
            <div className="bg-muted rounded-lg p-4">
              <code className="text-sm">
                {"import { useBrandkitById } from '@sitecore/stream-ui-blok';"}
              </code>
            </div>
          </div>

          {/* Basic Usage */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Basic Usage</h3>
            <div className="bg-muted rounded-lg p-4">
              <code className="text-sm">
                {
                  "const { brandkit, isLoading, error } = useBrandkitById('brandkit-123', { organizationId: 'org-456' });"
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
            The useBrandkitById hook provides a way to fetch and manage a single
            brandkit by ID with detailed information, computed properties, and
            utility functions.
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
const { brandkit, isLoading, error } = useBrandkitById('brandkit-123', {
  organizationId: 'org-456'
});`}
              </pre>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Enhanced Usage</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// Enhanced usage with computed properties
const {
  brandkit,
  displayName,
  isDraft,
  hasLogo,
  utils,
  isLoading
} = useBrandkitById('brandkit-123', { organizationId: 'org-456' });

// Using utility functions
const canEdit = utils.canEdit();
const industryTags = utils.getTagsByCategory('industry');
const customData = utils.getMetadata<string>('customField');
utils.setMetadata('lastViewed', new Date().toISOString());

// Using computed properties
if (isDraft) {
  console.log(\`\${displayName} is a draft brandkit\`);
}

if (hasLogo) {
  console.log(\`\${displayName} has a logo\`);
}`}
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
            <li>Fetch single brandkit by ID with detailed information</li>
            <li>
              Computed properties: displayName, hasLogo, isDraft, isPublished,
              etc.
            </li>
            <li>Utility functions for tag management and metadata</li>
            <li>Status checking and permission utilities</li>
            <li>Error handling and loading states</li>
            <li>Type-safe with TypeScript</li>
            <li>Automatic refetch capabilities</li>
          </ul>
        </CardContent>
      </Card>

      {/* Computed Properties */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Computed Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded border p-2">
              <strong>displayName:</strong> Formatted display name
            </div>
            <div className="rounded border p-2">
              <strong>hasLogo:</strong> Boolean indicating if logo exists
            </div>
            <div className="rounded border p-2">
              <strong>isDraft:</strong> Boolean for draft status
            </div>
            <div className="rounded border p-2">
              <strong>isPublished:</strong> Boolean for published status
            </div>
            <div className="rounded border p-2">
              <strong>isLocked:</strong> Boolean for locked status
            </div>
            <div className="rounded border p-2">
              <strong>tagCategories:</strong> Array of available tag categories
            </div>
          </div>
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
          <div className="rounded border p-3">
            <div className="font-medium">{mockBrandkit.name}</div>
            <div className="text-muted-foreground space-y-1 text-sm">
              <div>ID: {mockBrandkit.id}</div>
              <div>Status: {mockBrandkit.status}</div>
              <div>Industry: {mockBrandkit.industry}</div>
              <div>Company: {mockBrandkit.companyName}</div>
              <div>
                Tags:{" "}
                {mockBrandkit.tags
                  .map((tag) => `${tag.category}:${tag.values.join(", ")}`)
                  .join(", ")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
