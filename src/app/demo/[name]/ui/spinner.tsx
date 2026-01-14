import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const spinner = {
  name: "spinner",
  defaultComponent: (
    <div className="flex items-center justify-center w-28">
      <Spinner />
    </div>
  ),
  usage: [
    `import { Spinner } from "@/components/ui/spinner";`,
    `<Spinner />`,
  ],
  components: {
    Size: (
      <div className="flex items-center gap-6">
        <Spinner className="size-3" />
        <Spinner className="size-4" />
        <Spinner className="size-6" />
        <Spinner className="size-8" />
      </div>
    ),
    Button: (
      <div className="flex flex-col items-center gap-4">
        <Button disabled size="sm">
          <Spinner />
          Loading...
        </Button>
        <Button variant="outline" disabled size="sm">
          <Spinner />
          Please wait
        </Button>
        <Button variant="ghost" disabled size="sm">
          <Spinner />
          Processing
        </Button>
      </div>
    ),
    Badge: (
      <div className="flex items-center gap-4">
        <Badge>
          <Spinner />
          Syncing
        </Badge>
        <Badge variant="bold" colorScheme="primary">
          <Spinner />
          Updating
        </Badge>
        <Badge variant="bold" colorScheme="success">
          <Spinner />
          Processing
        </Badge>
      </div>
    ),
  },
};

