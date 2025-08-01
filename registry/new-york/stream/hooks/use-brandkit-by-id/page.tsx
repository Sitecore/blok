"use client"

import { createBrandkit } from "@sitecore/stream-ui-core"

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
      <Card>
        <CardHeader>
          <CardTitle>useBrandkitById Hook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Hook Overview</h3>
              <p className="text-muted-foreground">
                The useBrandkitById hook fetches a single brandkit by ID with
                enhanced utilities and computed properties for detailed brandkit
                management.
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Mock Brandkit Data</h3>
              <div className="bg-muted rounded border p-4">
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
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Usage Example</h3>
              <pre className="bg-muted overflow-x-auto rounded p-4 text-sm">
                {`// Basic usage
const { brandkit, isLoading, error } = useBrandkitById('brandkit-123', {
  organizationId: 'org-456'
});

// Enhanced usage with computed properties
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

            <div>
              <h3 className="mb-2 text-lg font-semibold">Features</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Fetch single brandkit by ID with detailed information</li>
                <li>
                  Computed properties: displayName, hasLogo, isDraft,
                  isPublished, etc.
                </li>
                <li>Utility functions for tag management and metadata</li>
                <li>Status checking and permission utilities</li>
                <li>Error handling and loading states</li>
                <li>Type-safe with TypeScript</li>
                <li>Automatic refetch capabilities</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Computed Properties
              </h3>
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
                  <strong>tagCategories:</strong> Array of available tag
                  categories
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
