import { Spinner } from "@/components/ui/spinner";

export const spinner = {
  name: "checkbox",
  defaultComponent: (
    <div className="flex items-start justify-center w-28"><Spinner variant="default" size="md" /></div>
  ),
  usage: [
    `import { Spinner } from "@/components/ui/spinner";`,
    `<Spinner />`,
  ],
  components: {
    Variants: (
      <div className="flex flex-wrap items-center gap-30">
        <Spinner variant="default" size="md" />
        <Spinner variant="circular" size="md" />
      </div>
    ),
    "With Text Spinner":<div className="flex items-start justify-center w-28"> <Spinner variant="circular" size="md" message="Loading..." /></div>,
  },
};
