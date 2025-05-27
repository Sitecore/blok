import { ArrowRightIcon, Loader2Icon, SendIcon } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <div>
          <Button>Default</Button>
          <Button colorScheme="success">Default</Button>
          <Button colorScheme="danger">Default</Button>
          <Button colorScheme="neutral">Default</Button>
          <Button colorScheme="ai">Default</Button>
        </div>

        <div>
          <Button variant="outline">Outline</Button>
          <Button colorScheme="success" variant="outline">
            Outline
          </Button>
          <Button colorScheme="danger" variant="outline">
            Outline
          </Button>
          <Button colorScheme="neutral" variant="outline">
            Outline
          </Button>
        </div>

        <div>
          <Button variant="ghost">Ghost</Button>
          <Button colorScheme="success" variant="ghost">
            Ghost
          </Button>
          <Button colorScheme="danger" variant="ghost">
            Ghost
          </Button>
          <Button colorScheme="neutral" variant="ghost">
            Ghost
          </Button>
        </div>

        <div>
          <Button variant="link">Link</Button>
          <Button colorScheme="success" variant="link">
            Link
          </Button>
          <Button colorScheme="danger" variant="link">
            Link
          </Button>
          <Button colorScheme="neutral" variant="link">
            Link
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button variant="outline">
          <SendIcon /> Send
        </Button>
        <Button variant="outline">
          Learn More <ArrowRightIcon />
        </Button>
        <Button disabled variant="outline">
          <Loader2Icon className="animate-spin" />
          Please wait
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="sm">Small</Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
        <Button variant="link" size="sm">
          Link
        </Button>
        <Button variant="outline" size="sm">
          <SendIcon /> Send
        </Button>
        <Button variant="outline" size="sm">
          Learn More <ArrowRightIcon />
        </Button>
        <Button disabled size="sm" variant="outline">
          <Loader2Icon className="animate-spin" />
          Please wait
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button size="lg">Large</Button>
        <Button variant="outline" size="lg">
          Outline
        </Button>
        <Button variant="ghost" size="lg">
          Ghost
        </Button>
        <Button variant="link" size="lg">
          Link
        </Button>
        <Button variant="outline" size="lg">
          <SendIcon /> Send
        </Button>
        <Button variant="outline" size="lg">
          Learn More <ArrowRightIcon />
        </Button>
        <Button disabled size="lg" variant="outline">
          <Loader2Icon className="animate-spin" />
          Please wait
        </Button>
      </div>
    </div>
  )
}
