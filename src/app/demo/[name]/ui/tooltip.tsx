import { CodeBlock } from "@/components/code-block";

const ROOT_LAYOUT_TOOLTIP_SNIPPET = `import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <TooltipProvider>
          <main>{children}</main>
        </TooltipProvider>
      </body>
    </html>
  )
}`;

export const tooltip = {
  name: "tooltip",
  preview: {
    defaultComponent: "tooltip",
  },
  installation: {
    post: (
      <div className="flex flex-col gap-3 pt-3">
        <h3 className="font-semibold text-lg tracking-tight">
          Add the TooltipProvider component.
        </h3>
        <p className="text-lg text-muted-foreground">
          Mount in your root layout{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-md">
            src/app/layout.tsx
          </code>{" "}
          so tooltips can render anywhere in the app.
        </p>
        <div className="overflow-hidden rounded-lg">
          <CodeBlock
            code={ROOT_LAYOUT_TOOLTIP_SNIPPET}
            className="rounded-none border-0 shadow-none"
            copyCodeContext={{ section: "installation", page_name: "tooltip" }}
          />
        </div>
        <p className="text-lg text-muted-foreground">
          <strong>Note:</strong> Tooltips use the nearest{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-md">
            TooltipProvider
          </code>
          . If a tooltip needs different settings, such as{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-md">
            delayDuration
          </code>
          , wrap it in its own{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-md">
            TooltipProvider
          </code>
          .
        </p>
      </div>
    ),
  },
  usage: {
    usage: [
      `import {\n  Tooltip,\n  TooltipTrigger,\n  TooltipContent\n} from "@/components/ui/tooltip";`,
      `<Tooltip>\n  <TooltipTrigger asChild>\n    <Button variant="outline">Hover</Button>\n  </TooltipTrigger>\n  <TooltipContent side="bottom">Add to library</TooltipContent>\n</Tooltip>`,
    ],
  },
};
