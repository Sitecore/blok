import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export function StreamHooks() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              use-brandkits
              <Link
                href="/hooks/use-brandkits"
                className="text-sm font-normal text-blue-600 hover:text-blue-800"
              >
                View Demo →
              </Link>
            </CardTitle>
            <CardDescription>
              Hook for fetching and managing brandkit lists
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Provides functionality to fetch, search, and manage brandkit
              collections with loading states and error handling.
            </p>
            <Link
              href="/hooks/use-brandkits"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Demo →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              use-brandkit-by-id
              <Link
                href="/hooks/use-brandkit-by-id"
                className="text-sm font-normal text-blue-600 hover:text-blue-800"
              >
                View Demo →
              </Link>
            </CardTitle>
            <CardDescription>
              Hook for fetching a single brandkit by ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Retrieves a specific brandkit by its unique identifier with
              caching and error handling.
            </p>
            <Link
              href="/hooks/use-brandkit-by-id"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Demo →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              use-contenthub-brandkits
              <Link
                href="/hooks/use-contenthub-brandkits"
                className="text-sm font-normal text-blue-600 hover:text-blue-800"
              >
                View Demo →
              </Link>
            </CardTitle>
            <CardDescription>
              Hook for fetching brandkits from ContentHub API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 text-sm">
              Retrieves brandkits from ContentHub for a specific brand ID with
              client-side filtering and the same interface as useBrandkits.
            </p>
            <Link
              href="/hooks/use-contenthub-brandkits"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View Demo →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Usage Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Installation */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Installation</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Install these hooks using the shadcn/ui CLI:
            </p>
            <div className="bg-muted space-y-2 rounded-lg p-4">
              <code className="block text-sm">
                npx shadcn@latest add use-brandkits
              </code>
              <code className="block text-sm">
                npx shadcn@latest add use-brandkit-by-id
              </code>
              <code className="block text-sm">
                npx shadcn@latest add use-contenthub-brandkits
              </code>
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Dependencies</h3>
            <p className="text-muted-foreground mb-2 text-sm">
              These hooks require the following dependencies:
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
          </div>

          {/* Client Setup */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Client Setup (Optional)</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Hooks use pre-configured clients, but you can customize the setup if needed:
            </p>
            <div className="bg-muted rounded-lg p-4 mb-4">
              <code className="text-sm block whitespace-pre-wrap">
{`import { brandsClient, createStreamFetch } from '@sitecore/stream-ui-core';

// Minimal setup (optional - hooks handle this automatically)
const client = brandsClient.setConfig({
  baseUrl: 'https://ai-brands-api-euw-dev.sitecore-staging.cloud',
  fetch: createStreamFetch({
    tokenProvider: async () => process.env.NEXT_PUBLIC_AUTH_TOKEN
  })
});`}
              </code>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              For complete configuration options, authentication setup, and production deployment, see the{" "}
              <a 
                href="https://github.com/Sitecore-PD/sitecore.ai.stream/wiki/API-GUIDE" 
                className="text-blue-600 hover:text-blue-800 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                official API Guide
              </a>.
            </p>
          </div>

          {/* Usage Examples */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Usage Examples</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Simple hook usage with automatic client configuration:
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Standard Stream API</h4>
                <div className="bg-muted rounded-lg p-4">
                  <code className="text-sm block whitespace-pre-wrap">
{`import { useBrandkits } from '@/registry/new-york/stream/hooks/use-brandkits';

// Requires organizationId (string)
const { brandkits, isLoading, error, utils } = useBrandkits({
  organizationId: 'org-123',
  pageSize: 10,
  search: 'nike'
});

// Use computed values and utilities
const draftBrandkits = brandkits.filter(utils.isDraft);
const summary = utils.summary();`}
                  </code>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">ContentHub API</h4>
                <div className="bg-muted rounded-lg p-4">
                  <code className="text-sm block whitespace-pre-wrap">
{`import { useContentHubBrandkits } from '@/registry/new-york/stream/hooks/use-contenthub-brandkits';

// Requires brandId (number)
const { brandkits, isLoading, error, utils } = useContentHubBrandkits({
  brandId: 123,
  search: 'nike'
});

// Same interface as useBrandkits
const publishedBrandkits = utils.filterByStatus('published');
const brandkitByName = utils.findByName('Nike Air');`}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-green-600">✓</span>
                <span>Automatic loading states and error handling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-green-600">✓</span>
                <span>Computed properties for filtered data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-green-600">✓</span>
                <span>Utility functions for data manipulation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-green-600">✓</span>
                <span>TypeScript support with full type safety</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-green-600">✓</span>
                <span>Automatic refetch capabilities</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
