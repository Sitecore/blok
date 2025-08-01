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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>use-brandkits</CardTitle>
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
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            View Demo →
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>use-brandkit-by-id</CardTitle>
          <CardDescription>
            Hook for fetching a single brandkit by ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            Retrieves a specific brandkit by its unique identifier with caching
            and error handling.
          </p>
          <Link
            href="/hooks/use-brandkit-by-id"
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            View Demo →
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
