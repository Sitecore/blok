import { Button } from "@/components/ui/button";
import { Codeblocks } from "@/components/registry/code-block";
import Link from "next/link";
import { MCPTabs } from "@/components/registry/mcp-tabs";

const InstallationCode = `npx shadcn@latest add https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/r/blok-components.json `;

const sampleButtonCode = `import { Button } from "@/components/ui/button"
export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button>Button</Button>
    </div>
  )
}`;

export default function Home() {
  return (
    <main className="w-full">
      <div className="bg-white p-6 ">
        <div className="flex flex-col space-y-5 mt-4 p-5 md:mt-8 md:p-10">
          <h1 className="font-bold text-4xl tracking-tight md:text-4xl">
            Build better products faster
          </h1>
          <p className="text-muted-foreground w-full ">
            Blok is Sitecore's product design system: the UI framework and style
            guide we use to build great apps. It's publicly available, so that
            anyone can easily build software in the Sitecore product design
            language.
          </p>
          <div className="flex space-x-4">
            {/* <Button className="bg-primary text-white px-4 py-2 rounded-full text-xs">
              Get started
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-gray-300 text-gray-600 hover:bg-gray-100 text-xs w-30"
            >
              Browse blocks
            </Button> */}
          </div>
        </div>
      </div>
      <div className="px-6">
        <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:p-10">
          <h1 className="font-bold text-3xl tracking-tight md:text-4xl">
            Add registry
          </h1>
          <p>
            Start by adding all Blok components from the registry to your
            codebase.
          </p>

          <Codeblocks code={InstallationCode} showLineNumbers={false} />
        </div>
        <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
          <h1 className="font-bold text-3xl tracking-tight md:text-4xl">
            Add component to page
          </h1>
          <p>
            The command above will add the components to your project. You can
            then import component onto pages like this.
          </p>
          <p className="text-muted-foreground">(example used: button):</p>
          <Codeblocks code={sampleButtonCode} />

          <div className="pt-8">
            <h1 className="font-bold text-3xl tracking-tight md:text-4xl">
              MCP
            </h1>
            <p className="pt-2">
              Integrate this registry with AI IDEs using Model Context Protocol
              (MCP) using the following configuration. This utilizes this
              Registry's theme tokens and CSS variables with the Shadcn CLI. To
              ensure this works, double check that the{" "}
              <Link href="/r/registry.json">
                <code className="inline text-sm tabular-nums underline">
                  style:theme
                </code>
              </Link>{" "}
              contains the same colors as your{" "}
              <code className="inline text-sm tabular-nums">tokens.css</code>
            </p>

            <div className="pt-2">
              <MCPTabs
                rootUrl={process.env.VERCEL_PROJECT_PRODUCTION_URL ?? ""}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
