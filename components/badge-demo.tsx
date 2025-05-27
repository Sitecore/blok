import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/registry/new-york/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge>Neutral</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="yellow">Yellow</Badge>
        <Badge variant="teal">Teal</Badge>
        <Badge variant="cyan">Cyan</Badge>
        <Badge variant="blue">Blue</Badge>
        <Badge variant="pink">Pink</Badge>
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
        <Badge asChild variant="danger">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="success">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="warning">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="yellow">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="teal">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="cyan">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="blue">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
        <Badge asChild variant="pink">
          <a href="#">
            Link <ArrowRightIcon />
          </a>
        </Badge>
      </div>
    </div>
  )
}