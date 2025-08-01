'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york/ui/card"
import { createBrandkit } from '@sitecore/stream-ui-core'
import { BrandkitPicker } from "@/registry/new-york/blocks/brandkit-picker/components/brandkit-picker"
import { BrandkitList } from "@/registry/new-york/blocks/brandkit-list/components/brandkit-list"
import { BrandkitItem } from "@/registry/new-york/blocks/brandkit-item/components/brandkit-item"
import { Spinner } from "@/registry/new-york/blocks/spinner/components/spinner"
import { Icon } from "@/registry/new-york/blocks/icon/components/icon"
import { mdiChevronDown, mdiHome, mdiAccount, mdiCog } from '@mdi/js'

// Mock data for demo
const mockBrandkits = [
  createBrandkit({
    id: '1',
    organizationId: 'org-123',
    name: 'Sitecore Brand',
    logo: 'https://example.com/sitecore-logo.png',
    status: 'published',
    brandName: 'Sitecore',
    companyName: 'Sitecore',
    industry: 'Technology'
  }),
  createBrandkit({
    id: '2',
    organizationId: 'org-123',
    name: 'ContentHub Brand',
    logo: 'https://example.com/contenthub-logo.png',
    status: 'published',
    brandName: 'ContentHub',
    companyName: 'Sitecore',
    industry: 'Technology'
  }),
  createBrandkit({
    id: '3',
    organizationId: 'org-123',
    name: 'XM Cloud Brand',
    logo: 'https://example.com/xmcloud-logo.png',
    status: 'published',
    brandName: 'XM Cloud',
    companyName: 'Sitecore',
    industry: 'Technology'
  })
];

const mockRecentBrandkit = createBrandkit({
  id: '1',
  organizationId: 'org-123',
  name: 'Sitecore Brand',
  logo: 'https://example.com/sitecore-logo.png',
  status: 'published',
  brandName: 'Sitecore',
  companyName: 'Sitecore',
  industry: 'Technology'
});

export function StreamBlocks() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Brandkit Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Brandkit Picker</CardTitle>
            <p className="text-sm text-muted-foreground">
              A dropdown picker for selecting brandkits with search functionality
            </p>
          </CardHeader>
          <CardContent>
            <BrandkitPicker
              brandkits={mockBrandkits}
              recentBrandkit={mockRecentBrandkit}
              onSelect={(brandkit) => console.log('Selected:', brandkit)}
              loading={false}
              placeholder="Search brandkits..."
            />
          </CardContent>
        </Card>

        {/* Brandkit List */}
        <Card>
          <CardHeader>
            <CardTitle>Brandkit List</CardTitle>
            <p className="text-sm text-muted-foreground">
              A searchable list of brandkits with recent selection
            </p>
          </CardHeader>
          <CardContent>
            <BrandkitList
              brandkits={mockBrandkits}
              recentBrandkit={mockRecentBrandkit}
              onSelect={(brandkit) => console.log('Selected:', brandkit)}
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
          <p className="text-sm text-muted-foreground">
            Different variants of the brandkit item component
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Default (Ghost)</h4>
              <BrandkitItem
                brandkit={mockRecentBrandkit}
                onSelect={(brandkit) => console.log('Selected:', brandkit)}
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Outline</h4>
              <BrandkitItem
                brandkit={mockRecentBrandkit}
                variant="outline"
                onSelect={(brandkit) => console.log('Selected:', brandkit)}
              />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Without Avatar</h4>
              <BrandkitItem
                brandkit={mockRecentBrandkit}
                showAvatar={false}
                onSelect={(brandkit) => console.log('Selected:', brandkit)}
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
            <p className="text-sm text-muted-foreground">
              Loading spinner component with different sizes
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Spinner size="xs" />
                <span>Extra Small</span>
              </div>
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <span>Small</span>
              </div>
              <div className="flex items-center gap-4">
                <Spinner size="md" />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-4">
                <Spinner size="lg" />
                <span>Large</span>
              </div>
              <div className="flex items-center gap-4">
                <Spinner size="xl" />
                <span>Extra Large</span>
              </div>
              <div className="flex items-center gap-4">
                <Spinner size="md" message="Loading..." />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Icon */}
        <Card>
          <CardHeader>
            <CardTitle>Icon</CardTitle>
            <p className="text-sm text-muted-foreground">
              Icon component with Material Design Icons support
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Icon path={mdiHome} size="xs" />
                <span>Home (xs)</span>
              </div>
              <div className="flex items-center gap-4">
                <Icon path={mdiAccount} size="sm" />
                <span>Account (sm)</span>
              </div>
              <div className="flex items-center gap-4">
                <Icon path={mdiCog} size="md" />
                <span>Settings (md)</span>
              </div>
              <div className="flex items-center gap-4">
                <Icon path={mdiChevronDown} size="lg" />
                <span>Chevron Down (lg)</span>
              </div>
              <div className="flex items-center gap-4">
                <Icon path={mdiHome} size="xl" />
                <span>Home (xl)</span>
              </div>
              <div className="flex items-center gap-4">
                <Icon path={mdiHome} aiGradient="500" />
                <span>Home with AI Gradient</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Information */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Installation</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Install these components using the shadcn/ui CLI:
              </p>
              <div className="bg-muted p-3 rounded-md">
                <code className="text-sm">
                  npx shadcn@latest add brandkit-picker<br/>
                  npx shadcn@latest add brandkit-list<br/>
                  npx shadcn@latest add brandkit-item<br/>
                  npx shadcn@latest add spinner<br/>
                  npx shadcn@latest add icon
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Dependencies</h4>
              <p className="text-sm text-muted-foreground">
                These components require <code className="bg-muted px-1 rounded">@sitecore/stream-ui-core</code> for the Brandkit type and <code className="bg-muted px-1 rounded">@mdi/js</code> for icons.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
