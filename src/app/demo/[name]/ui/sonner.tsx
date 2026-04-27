import { CodeBlock } from "@/components/code-block";

const ROOT_LAYOUT_TOASTER_SNIPPET = `import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}`;

export const sonner = {
  name: "sonner",
  preview: {
    defaultComponent: "sonner",
  },
  installation: {
    post: (
      <div className="flex flex-col gap-3 pt-3">
        <h3 className="font-semibold text-lg tracking-tight">
          Add the Toaster component.
        </h3>
        <p className="text-lg text-muted-foreground">
          Mount in your root layout{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-md">
            src/app/layout.tsx
          </code>{" "}
          so notifications can render anywhere in the app.
        </p>
        <div className="overflow-hidden rounded-lg">
          <CodeBlock
            code={ROOT_LAYOUT_TOASTER_SNIPPET}
            className="rounded-none border-0 shadow-none"
            copyCodeContext={{ section: "installation", page_name: "sonner" }}
          />
        </div>
      </div>
    ),
  },
  usage: {
    usage: [`import { Toaster } from "@/components/ui/sonner";`, `<Toaster />`],
  },
  components: {
    Default: { component: "sonner" },
    Success: { component: "sonner-success" },
    Warning: { component: "sonner-warning" },
    Error: { component: "sonner-error" },
    Action: { component: "sonner-action" },
    // Custom: "sonner-custom",
    Closable: { component: "sonner-closable" },
  },
};
