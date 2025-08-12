"use client"

import { createBrandkit } from "@sitecore/stream-ui-core"

import { ChatHistoryDemo } from "@/components/chat-history-demo"
import { StreamMessagesDemo } from "@/components/stream-messages-demo"
import { StreamBrandkitItem } from "@/registry/new-york/stream/blocks/stream-brandkit-picker/components/stream-brandkit-item"
import { StreamBrandkitList } from "@/registry/new-york/stream/blocks/stream-brandkit-picker/components/stream-brandkit-list"
import { StreamBrandkitPicker } from "@/registry/new-york/stream/blocks/stream-brandkit-picker/components/stream-brandkit-picker"
import { StreamSpinner } from "@/registry/new-york/stream/ui/stream-spinner"
import {
  Card,
  CardContent,
  CardDescription,
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
    name: "ContentHub Brand",
    logo: "https://example.com/contenthub-logo.png",
    status: "published",
    brandName: "ContentHub",
    companyName: "Sitecore",
    industry: "Technology",
  }),
  createBrandkit({
    id: "3",
    organizationId: "org-123",
    name: "XM Cloud Brand",
    logo: "https://example.com/xmcloud-logo.png",
    status: "published",
    brandName: "XM Cloud",
    companyName: "Sitecore",
    industry: "Technology",
  }),
]

const mockRecentBrandkit = createBrandkit({
  id: "1",
  organizationId: "org-123",
  name: "Sitecore Brand",
  logo: "https://example.com/sitecore-logo.png",
  status: "published",
  brandName: "Sitecore",
  companyName: "Sitecore",
  industry: "Technology",
})

export function StreamBlocks() {
  return (
    <div className="space-y-6">
      {/* Chat Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Brandkit Chat Messages</CardTitle>
          <p className="text-muted-foreground text-sm">
            Messages component for displaying brandkit chat messages
          </p>
        </CardHeader>
        <CardContent>
          <StreamMessagesDemo />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Brandkit Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Brandkit Picker</CardTitle>
            <p className="text-muted-foreground text-sm">
              A dropdown picker for selecting brandkits with search
              functionality
            </p>
          </CardHeader>
          <CardContent>
            <StreamBrandkitPicker
              brandkits={mockBrandkits}
              recentBrandkit={mockRecentBrandkit}
              onSelect={(brandkit) => console.log("Selected:", brandkit)}
              loading={false}
              placeholder="Search brandkits..."
            />
          </CardContent>
        </Card>

        {/* Brandkit List */}
        <Card>
          <CardHeader>
            <CardTitle>Brandkit List</CardTitle>
            <p className="text-muted-foreground text-sm">
              A searchable list of brandkits with recent selection
            </p>
          </CardHeader>
          <CardContent>
            <StreamBrandkitList
              brandkits={mockBrandkits}
              recentBrandkit={mockRecentBrandkit}
              onSelect={(brandkit) => console.log("Selected:", brandkit)}
              loading={false}
              placeholder="Search brandkits..."
            />
          </CardContent>
        </Card>
      </div>

      {/* Brandkit Items */}
      <Card>
        <CardHeader>
          <CardTitle>Brandkit Item Variants</CardTitle>
          <p className="text-muted-foreground text-sm">
            Different variants of the brandkit item component
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Default (Ghost)</h4>
              <StreamBrandkitItem
                brandkit={mockRecentBrandkit}
                onSelect={(brandkit) => console.log("Selected:", brandkit)}
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Outline</h4>
              <StreamBrandkitItem
                brandkit={mockRecentBrandkit}
                variant="outline"
                onSelect={(brandkit) => console.log("Selected:", brandkit)}
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Without Avatar</h4>
              <StreamBrandkitItem
                brandkit={mockRecentBrandkit}
                showAvatar={false}
                onSelect={(brandkit) => console.log("Selected:", brandkit)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spinner and Icon Components */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Spinner */}
        <Card>
          <CardHeader>
            <CardTitle>Spinner</CardTitle>
            <p className="text-muted-foreground text-sm">
              Loading spinner component with different sizes
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <StreamSpinner size="xs" />
                <span>Extra Small</span>
              </div>
              <div className="flex items-center gap-4">
                <StreamSpinner size="sm" />
                <span>Small</span>
              </div>
              <div className="flex items-center gap-4">
                <StreamSpinner size="md" />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-4">
                <StreamSpinner size="lg" />
                <span>Large</span>
              </div>
              <div className="flex items-center gap-4">
                <StreamSpinner size="xl" />
                <span>Extra Large</span>
              </div>
              <div className="flex items-center gap-4">
                <StreamSpinner size="md" message="Loading..." />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ChatHistory Component */}
      <Card>
        <CardHeader>
          <CardTitle>Chat History</CardTitle>
          <CardDescription>Chat History Component Demo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChatHistoryDemo />
        </CardContent>
      </Card>

      {/* Hooks */}
      <Card>
        <CardHeader>
          <CardTitle>Stream Hooks</CardTitle>
          <p className="text-muted-foreground text-sm">
            React hooks for managing brandkit data and API interactions
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">useBrandkits</h4>
              <p className="text-muted-foreground text-xs">
                Hook for fetching and managing brandkit lists with pagination,
                filtering, and utilities.
              </p>
              <div className="bg-muted rounded p-2 text-xs">
                <code>npx shadcn@latest add use-brandkits</code>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">useBrandkitById</h4>
              <p className="text-muted-foreground text-xs">
                Hook for fetching a single brandkit by ID with computed
                properties and utilities.
              </p>
              <div className="bg-muted rounded p-2 text-xs">
                <code>npx shadcn@latest add use-brandkit-by-id</code>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Information */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium">Installation</h4>
              <p className="text-muted-foreground mb-2 text-sm">
                Install these components using the shadcn/ui CLI:
              </p>
              <div className="bg-muted rounded-md p-3">
                <code className="text-sm">
                  npx shadcn@latest add brandkit-picker
                  <br />
                  npx shadcn@latest add brandkit-list
                  <br />
                  npx shadcn@latest add brandkit-item
                  <br />
                  npx shadcn@latest add spinner
                  <br />
                  npx shadcn@latest add use-brandkits
                  <br />
                  npx shadcn@latest add use-brandkit-by-id
                </code>
              </div>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium">Dependencies</h4>
              <p className="text-muted-foreground text-sm">
                These components require{" "}
                <code className="bg-muted rounded px-1">
                  @sitecore/stream-ui-core
                </code>{" "}
                for the Brandkit type and{" "}
                <code className="bg-muted rounded px-1">@mdi/js</code> for
                icons.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
