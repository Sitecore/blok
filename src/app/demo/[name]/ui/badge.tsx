import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon } from "lucide-react"
import Icon from "@mdi/react"
import { mdiClose } from "@mdi/js"

export const badge = {
  name: "badge",
  components: {
    // Sizes
    SizeSm: <Badge size="sm">Size sm</Badge>,
    SizeMd: <Badge size="md">Size md</Badge>,
    SizeLg: <Badge size="lg">Size lg</Badge>,

    // Default (neutral + colorSchemes)
    DefaultNeutral: <Badge>Default Neutral</Badge>,
    DefaultPrimary: <Badge colorScheme="primary">Default Primary</Badge>,
    DefaultDanger: <Badge colorScheme="danger">Default Danger</Badge>,
    DefaultSuccess: <Badge colorScheme="success">Default Success</Badge>,
    DefaultWarning: <Badge colorScheme="warning">Default Warning</Badge>,
    DefaultYellow: <Badge colorScheme="yellow">Default Yellow</Badge>,
    DefaultTeal: <Badge colorScheme="teal">Default Teal</Badge>,
    DefaultCyan: <Badge colorScheme="cyan">Default Cyan</Badge>,
    DefaultBlue: <Badge colorScheme="blue">Default Blue</Badge>,
    DefaultPink: <Badge colorScheme="pink">Default Pink</Badge>,

    // Bold variants
    BoldNeutral: <Badge variant="bold">Bold Neutral</Badge>,
    BoldPrimary: (
      <Badge variant="bold" colorScheme="primary">
        Bold Primary
      </Badge>
    ),
    BoldDanger: (
      <Badge variant="bold" colorScheme="danger">
        Bold Danger
      </Badge>
    ),
    BoldSuccess: (
      <Badge variant="bold" colorScheme="success">
        Bold Success
      </Badge>
    ),
    BoldWarning: (
      <Badge variant="bold" colorScheme="warning">
        Bold Warning
      </Badge>
    ),
    BoldYellow: (
      <Badge variant="bold" colorScheme="yellow">
        Bold Yellow
      </Badge>
    ),
    BoldTeal: (
      <Badge variant="bold" colorScheme="teal">
        Bold Teal
      </Badge>
    ),
    BoldCyan: (
      <Badge variant="bold" colorScheme="cyan">
        Bold Cyan
      </Badge>
    ),
    BoldBlue: (
      <Badge variant="bold" colorScheme="blue">
        Bold Blue
      </Badge>
    ),
    BoldPink: (
      <Badge variant="bold" colorScheme="pink">
        Bold Pink
      </Badge>
    ),

    // Default links
    DefaultLink: (
      <Badge asChild>
        <a href="#">
          Default Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    DefaultLinkPrimary: (
      <Badge asChild colorScheme="primary">
        <a href="#">
          Default Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    DefaultLinkDanger: (
      <Badge asChild colorScheme="danger">
        <a href="#">
          Default Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),

    // Bold links
    BoldLink: (
      <Badge asChild variant="bold">
        <a href="#">
          Bold Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    BoldLinkPrimary: (
      <Badge asChild variant="bold" colorScheme="primary">
        <a href="#">
          Bold Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),
    BoldLinkDanger: (
      <Badge asChild variant="bold" colorScheme="danger">
        <a href="#">
          Bold Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    ),

    // Closable badges
    ClosableNeutral: (
      <Badge>
        Closable Neutral <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosablePrimary: (
      <Badge colorScheme="primary">
        Closable Primary <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosableDanger: (
      <Badge colorScheme="danger">
        Closable Danger <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosableSuccess: (
      <Badge colorScheme="success">
        Closable Success <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosableWarning: (
      <Badge colorScheme="warning">
        Closable Warning <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),

    // Closable bold badges
    ClosableBoldNeutral: (
      <Badge variant="bold">
        Closable Bold <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosableBoldPrimary: (
      <Badge variant="bold" colorScheme="primary">
        Closable Bold Primary <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosableBoldDanger: (
      <Badge variant="bold" colorScheme="danger">
        Closable Bold Danger <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),

    // Closable with different sizes
    ClosableSmall: (
      <Badge size="sm" colorScheme="blue">
        Small <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosableMedium: (
      <Badge size="md" colorScheme="teal">
        Medium <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
    ClosableLarge: (
      <Badge size="lg" colorScheme="pink">
        Large <Icon path={mdiClose} className="size-3" />
      </Badge>
    ),
  },
}
