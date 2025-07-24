import { Loader2Icon } from "lucide-react"
import { Button } from "@/registry/new-york/ui/button"
import { Separator } from "@/registry/new-york/ui/separator"
import Icon from "@mdi/react"
import { mdiInformationOutline, mdiOpenInNew } from "@mdi/js"

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg">
            <Icon path={mdiInformationOutline} />
            Solid lg
          </Button>
          <Button>
            <Icon path={mdiInformationOutline} />
            Solid
          </Button>
          <Button size="sm">
            <Icon path={mdiInformationOutline} />
            Solid sm
          </Button>
          <Button size="xs">
            <Icon path={mdiInformationOutline} />
            Solid xs
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Solid</Button>
          <Button colorScheme="success">Solid success</Button>
          <Button colorScheme="danger">Solid danger</Button>
          <Button colorScheme="neutral">Solid neutral</Button>
          <Button colorScheme="ai">Solid AI</Button>
          <Button disabled>
            <Loader2Icon className="animate-spin" />
            Solid
          </Button>
          <Button>
            Solid
            <Icon path={mdiOpenInNew} />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" variant="outline">
            <Icon path={mdiInformationOutline} />
            Outline lg
          </Button>
          <Button variant="outline">
            <Icon path={mdiInformationOutline} />
            Outline
          </Button>
          <Button size="sm" variant="outline">
            <Icon path={mdiInformationOutline} />
            Outline sm
          </Button>
          <Button size="xs" variant="outline">
            <Icon path={mdiInformationOutline} />
            Outline xs
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline">Outline</Button>
          <Button variant="outline" colorScheme="primary">Outline primary</Button>
          <Button variant="outline" colorScheme="success">Outline success</Button>
          <Button variant="outline" colorScheme="danger">Outline danger</Button>
          <Button disabled variant="outline">
            <Loader2Icon className="animate-spin" />
            Outline
          </Button>
          <Button variant="outline">
            Outline
            <Icon path={mdiOpenInNew} />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" variant="ghost">
            <Icon path={mdiInformationOutline} />
            Ghost lg
          </Button>
          <Button variant="ghost">
            <Icon path={mdiInformationOutline} />
            Ghost
          </Button>
          <Button size="sm" variant="ghost">
            <Icon path={mdiInformationOutline} />
            Ghost sm
          </Button>
          <Button size="xs" variant="ghost">
            <Icon path={mdiInformationOutline} />
            Ghost xs
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost">Ghost</Button>
          <Button variant="ghost" colorScheme="primary">Ghost primary</Button>
          <Button variant="ghost" colorScheme="success">Ghost success</Button>
          <Button variant="ghost" colorScheme="danger">Ghost danger</Button>
          <Button disabled variant="ghost">
            <Loader2Icon className="animate-spin" />
            Ghost
          </Button>
          <Button variant="ghost">
            Ghost
            <Icon path={mdiOpenInNew} />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button size="lg" variant="link">
            <Icon path={mdiInformationOutline} />
            Link lg
          </Button>
          <Button variant="link">
            <Icon path={mdiInformationOutline} />
            Link
          </Button>
          <Button size="sm" variant="link">
            <Icon path={mdiInformationOutline} />
            Link sm
          </Button>
          <Button size="xs" variant="link">
            <Icon path={mdiInformationOutline} />
            Link xs
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="link">Link</Button>
          <Button variant="link" colorScheme="success">Link success</Button>
          <Button variant="link" colorScheme="danger">Link danger</Button>
          <Button variant="link" colorScheme="neutral">Link neutral</Button>
          <Button disabled variant="link">
            <Loader2Icon className="animate-spin" />
            Link
          </Button>
          <Button variant="link">
          Link
            <Icon path={mdiOpenInNew} />
          </Button>
        </div>
        <Separator />


        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-lg">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon-sm">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon-xs">
            <Icon path={mdiInformationOutline} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" colorScheme="success">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" colorScheme="danger">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" colorScheme="neutral">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" colorScheme="ai">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" disabled>
            <Loader2Icon className="animate-spin" />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-lg" variant="outline">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="outline">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon-sm" variant="outline">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon-xs" variant="outline">
            <Icon path={mdiInformationOutline} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon" variant="outline">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="outline" colorScheme="primary">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="outline" colorScheme="success">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="outline" colorScheme="danger">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" disabled variant="outline">
            <Loader2Icon className="animate-spin" />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-lg" variant="ghost">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="ghost">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon-sm" variant="ghost">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon-xs" variant="ghost">
            <Icon path={mdiInformationOutline} />
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon" variant="ghost">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="ghost" colorScheme="primary">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="ghost" colorScheme="success">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button size="icon" variant="ghost" colorScheme="danger">
            <Icon path={mdiInformationOutline} />
          </Button>
          <Button disabled size="icon" variant="ghost">
            <Loader2Icon className="animate-spin" />
          </Button>
        </div>
    </div>
  )
}
