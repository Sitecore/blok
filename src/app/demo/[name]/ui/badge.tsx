import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react"
import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"

export const badge = {
  name: "badge",
  defaultComponent: (
    <Badge>Badge</Badge>
  ),
  usage: [
    `import { Badge } from "@/components/ui/badge"`,
    `<Badge>Badge</Badge>`
  ],
  components: {
    // Sizes
    "Size Small": <Badge size="sm">Size sm</Badge>,
    "Size Medium": <Badge size="md">Size md</Badge>,
    "Size Large": <Badge size="lg">Size lg</Badge>,

    // Default (neutral + colorSchemes)
    "Default Neutral": <Badge>Default Neutral</Badge>,
    "Default Primary": <Badge colorScheme="primary">Default Primary</Badge>,
    "Default Danger": <Badge colorScheme="danger">Default Danger</Badge>,
    "Default Success": <Badge colorScheme="success">Default Success</Badge>,
    "Default Warning": <Badge colorScheme="warning">Default Warning</Badge>,
    "Default Yellow": <Badge colorScheme="yellow">Default Yellow</Badge>,
    "Default Teal": <Badge colorScheme="teal">Default Teal</Badge>,
    "Default Cyan": <Badge colorScheme="cyan">Default Cyan</Badge>,
    "Default Blue": <Badge colorScheme="blue">Default Blue</Badge>,
    "Default Pink": <Badge colorScheme="pink">Default Pink</Badge>,

    // Bold variants
    "Bold Neutral": <Badge variant="bold">Bold Neutral</Badge>,
    "Bold Primary": (
      <Badge variant="bold" colorScheme="primary">
        Bold Primary
      </Badge>
    ),
    "Bold Danger": (
      <Badge variant="bold" colorScheme="danger">
        Bold Danger
      </Badge>
    ),
    "Bold Success": (
      <Badge variant="bold" colorScheme="success">
        Bold Success
      </Badge>
    ),
    "Bold Warning": (
      <Badge variant="bold" colorScheme="warning">
        Bold Warning
      </Badge>
    ),
    "Bold Yellow": (
      <Badge variant="bold" colorScheme="yellow">
        Bold Yellow
      </Badge>
    ),
    "Bold Teal": (
      <Badge variant="bold" colorScheme="teal">
        Bold Teal
      </Badge>
    ),
    "Bold Cyan": (
      <Badge variant="bold" colorScheme="cyan">
        Bold Cyan
      </Badge>
    ),
    "Bold Blue": (
      <Badge variant="bold" colorScheme="blue">
        Bold Blue
      </Badge>
    ),
    "Bold Pink": (
      <Badge variant="bold" colorScheme="pink">
        Bold Pink
      </Badge>
    ),

    // Default links
    "Default Link": (
      <Badge asChild>
        <a href="#">
          Default Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    "Default Link Primary": (
      <Badge asChild colorScheme="primary">
        <a href="#">
          Default Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    "Default Link Danger": (
      <Badge asChild colorScheme="danger">
        <a href="#">
          Default Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),

    // Bold links
    "Bold Link": (
      <Badge asChild variant="bold">
        <a href="#">
          Bold Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    "Bold Link Primary": (
      <Badge asChild variant="bold" colorScheme="primary">
        <a href="#">
          Bold Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    "Bold Link Danger": (
      <Badge asChild variant="bold" colorScheme="danger">
        <a href="#">
          Bold Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),

    // Closable badges
    "Closable Neutral": (
      <Badge>
        Closable Neutral <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Primary": (
      <Badge colorScheme="primary">
        Closable Primary <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Danger": (
      <Badge colorScheme="danger">
        Closable Danger <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Success": (
      <Badge colorScheme="success">
        Closable Success <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Warning": (
      <Badge colorScheme="warning">
        Closable Warning <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),

    // Closable bold badges
    "Closable Bold Neutral": (
      <Badge variant="bold">
        Closable Bold <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Bold Primary": (
      <Badge variant="bold" colorScheme="primary">
        Closable Bold Primary <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Bold Danger": (
      <Badge variant="bold" colorScheme="danger">
        Closable Bold Danger <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),

    // Closable with different sizes
    "Closable Small": (
      <Badge size="sm" colorScheme="blue">
        Small <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Medium": (
      <Badge size="md" colorScheme="teal">
        Medium <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    "Closable Large": (
      <Badge size="lg" colorScheme="pink">
        Large <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
  },
}
