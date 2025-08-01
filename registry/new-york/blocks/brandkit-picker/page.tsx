import { createBrandkit } from "@sitecore/stream-ui-core"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

import { BrandkitPicker } from "./components/brandkit-picker"

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
]

export default function BrandkitPickerPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Brandkit Picker</CardTitle>
        </CardHeader>
        <CardContent>
          <BrandkitPicker
            brandkits={mockBrandkits}
            onSelect={(brandkit) => console.log("Selected:", brandkit)}
            loading={false}
            placeholder="Search brandkits..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
