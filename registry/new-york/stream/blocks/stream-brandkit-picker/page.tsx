import { createBrandkit } from "@sitecore/stream-ui-core"

import { StreamBrandkitPicker } from "./components/stream-brandkit-picker"

const mockBrandkits = [
  createBrandkit({
    id: "1",
    organizationId: "org-1",
    name: "Sitecore Brand",
    logo: "https://mms-delivery.sitecore.com/1234567890/logo.png",
    description: "Official Sitecore brand guidelines",
    tags: [{ category: "technology", values: ["technology", "enterprise"] }],
  }),
  createBrandkit({
    id: "2",
    organizationId: "org-1",
    name: "Marketing Campaign",
    logo: "https://mms-delivery.sitecore.com/0987654321/campaign.png",
    description: "Q1 Marketing campaign assets",
    tags: [{ category: "marketing", values: ["marketing", "campaign"] }],
  }),
  createBrandkit({
    id: "3",
    organizationId: "org-1",
    name: "Product Launch",
    logo: "https://mms-delivery.sitecore.com/1122334455/product.png",
    description: "New product launch materials",
    tags: [{ category: "product", values: ["product", "launch"] }],
  }),
]

const mockRecentBrandkit = createBrandkit({
  id: "1",
  organizationId: "org-1",
  name: "Sitecore Brand",
  logo: "https://mms-delivery.sitecore.com/1234567890/logo.png",
  description: "Official Sitecore brand guidelines",
  tags: [{ category: "technology", values: ["technology", "enterprise"] }],
})

export default function StreamBrandkitPickerPage() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Stream Brandkit Picker</h1>
        <p className="text-muted-foreground">
          A dropdown picker for selecting brandkits with search functionality
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Default State</h2>
          <StreamBrandkitPicker
            brandkits={mockBrandkits}
            recentBrandkit={mockRecentBrandkit}
            onSelect={(brandkit) => console.log("Selected:", brandkit)}
            loading={false}
            placeholder="Search brandkits..."
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Loading State</h2>
          <StreamBrandkitPicker
            brandkits={[]}
            loading={true}
            onSelect={(brandkit) => console.log("Selected:", brandkit)}
            placeholder="Search brandkits..."
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Empty State</h2>
          <StreamBrandkitPicker
            brandkits={[]}
            loading={false}
            onSelect={(brandkit) => console.log("Selected:", brandkit)}
            placeholder="Search brandkits..."
            emptyStateMessage="No brandkits available"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Disabled State</h2>
          <StreamBrandkitPicker
            brandkits={mockBrandkits}
            recentBrandkit={mockRecentBrandkit}
            onSelect={(brandkit) => console.log("Selected:", brandkit)}
            loading={false}
            disabled={true}
            placeholder="Search brandkits..."
          />
        </div>
      </div>
    </div>
  )
}
