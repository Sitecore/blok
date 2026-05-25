import InstallationCodeBlock from "@/components/docsite/installation-code-block";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";

const baseUrl = process.env.NEXT_PUBLIC_REGISTRY_URL ?? "";
const registryUrl = `https://${baseUrl}/r/virtualized-select.json`;

export const selectReact = {
  name: "select-react",
  preview: {
    pre: (
      <Alert>
        <span className="inline text-md [&_p]:leading-relaxed">
          More information:{" "}
          <Link
            href="https://react-select.com/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 no-underline"
          >
            {" "}
            React-Select
          </Link>
        </span>
      </Alert>
    ),
    defaultComponent: "select-react",
  },
  installation: {
    post: (
      <div className="flex w-full flex-col gap-4 pt-3">
        <p className="text-muted-foreground text-base">
          Install{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
            virtualized-select
          </code>{" "}
          for an optimized React Select when you need to render a very large
          list of options. The menu virtualizes rows so performance stays smooth
          with thousands of items.
        </p>
        <InstallationCodeBlock
          registryUrl={registryUrl}
          componentName="virtualized-select"
        />
      </div>
    ),
  },
  usage: {
    usage: [
      `import { SelectReact, type SelectReactOption } from "@/components/ui/select-react";`,
      `const options: SelectReactOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true },
  {
    value: "blok",
    label: "Blok",
    description: "Optional secondary line in the menu (uses text-subtle-text).",
  },
];

<SelectReact
  options={options}
  placeholder="Select an option"
/>`,
    ],
  },
  components: {
    "Virtualized Select": { component: "virtualized-select" },
  },
};
