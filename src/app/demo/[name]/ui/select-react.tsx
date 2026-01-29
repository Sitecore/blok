import { Alert } from "@/components/ui/alert";
import Link from "next/link";

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
  usage: {
    usage: [
      `import { SelectReact, type SelectReactOption } from "@/components/ui/select-react";`,
      `const options: SelectReactOption[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3", disabled: true },
];

<SelectReact
  options={options}
  placeholder="Select an option"
/>`,
    ],
  },
};
