import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

import { Spinner } from "./components/spinner"

export default function SpinnerPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Spinner</CardTitle>
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
    </div>
  )
}
