import { Spinner } from "@/components/ui/spinner";

export const spinner = {
  name: "checkbox",
  components: {
    Default: <div className="flex items-start justify-center w-28"><Spinner size="md" /></div>,
    WithTextSpinner:<div className="flex items-start justify-center w-28"> <Spinner size="md" message="Loading..." /></div>,
  },
};
