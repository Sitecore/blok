import { ArrowRightIcon } from "lucide-react"

import { Badge } from "@/registry/new-york/ui/badge"

export function BadgeDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Size sm</Badge>
          <Badge size="md">Size md</Badge>
          <Badge size="lg">Size lg</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>Default Neutral</Badge>
          <Badge colorScheme="primary">Default Primary</Badge>
          <Badge colorScheme="danger">Default Danger</Badge>
          <Badge colorScheme="success">Default Success</Badge>
          <Badge colorScheme="warning">Default Warning</Badge>
          <Badge colorScheme="yellow">Default Yellow</Badge>
          <Badge colorScheme="teal">Default Teal</Badge>
          <Badge colorScheme="cyan">Default Cyan</Badge>
          <Badge colorScheme="blue">Default Blue</Badge>
          <Badge colorScheme="pink">Default Pink</Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="bold">Bold Neutral</Badge>
          <Badge variant="bold" colorScheme="primary">
            Bold Primary
          </Badge>
          <Badge variant="bold" colorScheme="danger">
            Bold Danger
          </Badge>
          <Badge variant="bold" colorScheme="success">
            Bold Success
          </Badge>
          <Badge variant="bold" colorScheme="warning">
            Bold Warning
          </Badge>
          <Badge variant="bold" colorScheme="yellow">
            Bold Yellow
          </Badge>
          <Badge variant="bold" colorScheme="teal">
            Bold Teal
          </Badge>
          <Badge variant="bold" colorScheme="cyan">
            Bold Cyan
          </Badge>
          <Badge variant="bold" colorScheme="blue">
            Bold Blue
          </Badge>
          <Badge variant="bold" colorScheme="pink">
            Bold Pink
          </Badge>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge asChild>
            <a href="#">
              Default Link <ArrowRightIcon />
            </a>
          </Badge>
          <Badge asChild colorScheme="primary">
            <a href="#">
              Default Link <ArrowRightIcon />
            </a>
          </Badge>
          <Badge asChild colorScheme="danger">
            <a href="#">
              Default Link <ArrowRightIcon />
            </a>
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge asChild variant="bold">
            <a href="#">
              Bold Link <ArrowRightIcon />
            </a>
          </Badge>
          <Badge asChild variant="bold" colorScheme="primary">
            <a href="#">
              Bold Link <ArrowRightIcon />
            </a>
          </Badge>
          <Badge asChild variant="bold" colorScheme="danger">
            <a href="#">
              Bold Link <ArrowRightIcon />
            </a>
          </Badge>
        </div>
      </div>
    </div>
  )
}
