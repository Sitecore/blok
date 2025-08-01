import { mdiAccount, mdiChevronDown, mdiCog, mdiHome } from "@mdi/js"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

import { Icon } from "./components/icon"

export default function IconPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Icon</CardTitle>
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
  )
}
