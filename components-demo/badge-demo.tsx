import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react"
import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"
  
export function BadgeDemo() {
  return (
    <div className="grid gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Badge</h2>

      {/* Default Badge */}
      <Badge>Badge</Badge>

      {/* Size Variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge size="sm">Size sm</Badge>
        <Badge size="md">Size md</Badge>
        <Badge size="lg">Size lg</Badge>
      </div>

      {/* Color Scheme Variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Neutral</Badge>
        <Badge colorScheme="primary">Primary</Badge>
        <Badge colorScheme="danger">Danger</Badge>
        <Badge colorScheme="success">Success</Badge>
        <Badge colorScheme="warning">Warning</Badge>
        <Badge colorScheme="yellow">Yellow</Badge>
        <Badge colorScheme="teal">Teal</Badge>
        <Badge colorScheme="cyan">Cyan</Badge>
        <Badge colorScheme="blue">Blue</Badge>
        <Badge colorScheme="pink">Pink</Badge>
      </div>

      {/* Bold Variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="bold">Bold Neutral</Badge>
        <Badge variant="bold" colorScheme="primary">Bold Primary</Badge>
        <Badge variant="bold" colorScheme="danger">Bold Danger</Badge>
        <Badge variant="bold" colorScheme="success">Bold Success</Badge>
        <Badge variant="bold" colorScheme="warning">Bold Warning</Badge>
        <Badge variant="bold" colorScheme="yellow">Bold Yellow</Badge>
        <Badge variant="bold" colorScheme="teal">Bold Teal</Badge>
        <Badge variant="bold" colorScheme="cyan">Bold Cyan</Badge>
        <Badge variant="bold" colorScheme="blue">Bold Blue</Badge>
        <Badge variant="bold" colorScheme="pink">Bold Pink</Badge>
      </div>

      {/* Link Variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge asChild>
          <a href="#">Default Link <ArrowRightIcon className="size-3" /></a>
        </Badge>
        <Badge asChild colorScheme="primary">
          <a href="#">Primary Link <ArrowRightIcon className="size-3" /></a>
        </Badge>
        <Badge asChild colorScheme="danger">
          <a href="#">Danger Link <ArrowRightIcon className="size-3" /></a>
        </Badge>
      </div>

      {/* Bold Link Variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge asChild variant="bold">
          <a href="#">Bold Link <ArrowRightIcon className="size-3" /></a>
        </Badge>
        <Badge asChild variant="bold" colorScheme="primary">
          <a href="#">Bold Primary Link <ArrowRightIcon className="size-3" /></a>
        </Badge>
        <Badge asChild variant="bold" colorScheme="danger">
          <a href="#">Bold Danger Link <ArrowRightIcon className="size-3" /></a>
        </Badge>
      </div>

      {/* Closable Variants */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Closable Neutral <Icon path={mdiClose} className="size-3" /></Badge>
        <Badge colorScheme="primary">Closable Primary <Icon path={mdiClose} className="size-3" /></Badge>
        <Badge colorScheme="danger">Closable Danger <Icon path={mdiClose} className="size-3" /></Badge>
      </div>

      {/* Closable Bold */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="bold">Closable Bold <Icon path={mdiClose} className="size-3" /></Badge>
        <Badge variant="bold" colorScheme="primary">Closable Bold Primary <Icon path={mdiClose} className="size-3" /></Badge>
        <Badge variant="bold" colorScheme="danger">Closable Bold Danger <Icon path={mdiClose} className="size-3" /></Badge>
      </div>

      {/* Closable Sizes */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge size="sm" colorScheme="blue">
          Small <Icon path={mdiClose} className="size-3" />
        </Badge>
        <Badge size="md" colorScheme="teal">
          Medium <Icon path={mdiClose} className="size-3" />
        </Badge>
        <Badge size="lg" colorScheme="pink">
          Large <Icon path={mdiClose} className="size-3" />
        </Badge>
      </div>
      
    </div>
  )
}
  