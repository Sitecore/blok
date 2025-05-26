import { AlertCircleIcon, ArrowRightIcon, CheckIcon } from "lucide-react"

import { Badge } from "@/registry/new-york/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge asChild>
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="primary">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="outline">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="destructive">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="warning">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="success">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="info">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
      </div>
    </div>
  )
}
