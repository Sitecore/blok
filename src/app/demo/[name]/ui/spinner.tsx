import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

export const spinner = {
  name: "spinner",
  defaultComponent: (
    <div className="flex items-center justify-center w-28">
      <Spinner />
    </div>
  ),
  usage: [
    `import { Spinner } from "@/components/ui/spinner";`,
    `<Spinner size="md" />`,
  ],
  components: {
    Size: (
      <div className="flex items-center gap-6">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
    ),
    Decorative: (
      <div className="flex items-center gap-6">
        <Spinner
          thickness="4px"
          emptyColor="var(--color-neutral-200)"
          color="var(--color-primary-500)"
          size="xl"
        />
      </div>
    ),
  },
};

