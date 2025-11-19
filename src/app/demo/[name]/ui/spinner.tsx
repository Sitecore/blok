import { Spinner } from "@/components/ui/spinner";

export const spinner = {
  name: "checkbox",
  defaultComponent: (
    <div className="flex items-start justify-center w-28"><Spinner size="md" /></div>
  ),
  usage: [
    `import { Spinner } from "@/components/ui/spinner";`,
    `<Spinner />`,
  ],
  components: {
    "With Text Spinner":<div className="flex items-start justify-center w-28"> <Spinner size="md" message="Loading..." /></div>,
  },
};
