import { CircularProgress } from "@/components/ui/circular-progress";

export const circularProgress = {
  name: "circular-progress",
  defaultComponent: (
    <div className="flex items-start justify-center w-28"><CircularProgress variant="default" size="md" /></div>
  ),
  usage: [
    `import { CircularProgress } from "@/components/ui/circular-progress";`,
    `<CircularProgress />`,
  ],
  components: {
    Variants: (
      <div className="flex flex-wrap items-center gap-30">
        <CircularProgress variant="default" size="md" />
        <CircularProgress variant="circular" size="md" />
      </div>
    ),
    "With Text Circular Progress":<div className="flex items-start justify-center w-28"> <CircularProgress variant="circular" size="md" message="Loading..." /></div>,
  },
};


