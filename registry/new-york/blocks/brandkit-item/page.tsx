import { createBrandkit } from "@sitecore/stream-ui-core"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

import { BrandkitItem } from "./components/brandkit-item"

// Mock data for demo
const mockBrandkit = createBrandkit({
  id: "1",
  organizationId: "org-123",
  name: "Sitecore Brand",
  logo: "https://example.com/sitecore-logo.png",
  status: "published",
  description: "Sitecore brand assets",
  brandName: "Sitecore",
  companyName: "Sitecore",
  industry: "Technology",
})

export default function BrandkitItemPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Brandkit Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <BrandkitItem
              brandkit={mockBrandkit}
              onSelect={(brandkit) => console.log("Selected:", brandkit)}
            />
            <BrandkitItem
              brandkit={mockBrandkit}
              variant="outline"
              onSelect={(brandkit) => console.log("Selected:", brandkit)}
            />
            <BrandkitItem
              brandkit={mockBrandkit}
              variant="ghost"
              onSelect={(brandkit) => console.log("Selected:", brandkit)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
