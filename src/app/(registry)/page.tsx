import { Button } from "@/components/ui/button";
import { Codeblocks } from "@/components/registry/code-block";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

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
      <div className="bg-body-bg p-6 ">
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
            {/* <Button className="bg-primary-fg text-inverse-text px-4 py-2 rounded-full text-xs">
              Get started
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-border-color text-subtle-text hover:bg-subtle-bg text-xs w-30"
            >
              Browse blocks
            </Button> */}
          </div>
        </div>
      </div>
      <div className="px-6">

        <div className="flex flex-col space-y-4 mt-4 p-5 md:mt-2 md:px-10">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Prerequisites
          </h2>
          <p className="text-muted-foreground">
            Make sure you have these tools installed before proceeding:
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Card style="outline" padding="md" className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Badge colorScheme="primary" size="sm" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    1
                  </Badge>
                  <CardTitle className="text-base">Node.js 16+</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="mb-2">
                  <code className="bg-muted px-1 rounded text-xs">node --version</code>
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="text-xs h-7"
                >
                  <a 
                    href="https://nodejs.org/" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download →
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card style="outline" padding="md" className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Badge colorScheme="primary" size="sm" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    2
                  </Badge>
                  <CardTitle className="text-base">npm 10+</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="mb-2">
                  <code className="bg-muted px-1 rounded text-xs">npm --version</code>
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="text-xs h-7"
                >
                  <a 
                    href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more →
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card style="outline" padding="md" className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Badge colorScheme="primary" size="sm" className="w-6 h-6 rounded-full p-0 flex items-center justify-center">
                    3
                  </Badge>
                  <CardTitle className="text-base">TailwindCSS</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="mb-2">
                  Installed & configured
                </CardDescription>
                <Button 
                  variant="outline" 
                  size="sm" 
                  asChild
                  className="text-xs h-7"
                >
                  <a 
                    href="https://tailwindcss.com/docs/installation" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Setup guide →
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Alert variant="primary" className="items-center">
            <AlertDescription className="flex items-center gap-1">
              <strong>Tip:</strong> This installation process is similar to{" "}
              <a 
                href="https://ui.shadcn.com/docs/installation" 
                className="underline hover:no-underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                shadcn/ui
              </a>
              . If you're familiar with that, you'll feel right at home!
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Step 1: Initialize shadcn/ui
          </h2>
          <p className="pt-2">
            Run the shadcn/ui initialization command in your project's root folder:
          </p>
          <Codeblocks 
            code="npx shadcn@latest init" 
            showLineNumbers={false} 
          />
          <p className="pt-2">
            During initialization, choose a base color when prompted. The CLI will then:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Automatically detect your Vite setup and Tailwind configuration.</li>
            <li>Create a <code className="inline text-sm tabular-nums bg-muted px-1 rounded">components.json</code> configuration file.</li>
            <li>Update your CSS with the necessary CSS variables.</li>
            <li>Create <code className="inline text-sm tabular-nums bg-muted px-1 rounded">src/lib/utils.js</code> with utility functions.</li>
          </ul>
        </div>

        <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Step 2: Install Blok components
          </h2>
          <p className="pt-2">
            You can now start adding the Blok components to your project.
          </p>
          <Codeblocks 
            code="npx shadcn@latest add https://blok-shadcn.vercel.app/r/button.json" 
            showLineNumbers={false} 
          />
          <Alert variant="primary" className="items-start mt-4">
            <AlertDescription className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                Alternatively, you can install the Blok component registry to get access to all components.
              </div>
              
              <Codeblocks 
                code="npx shadcn@latest add https://blok-shadcn.vercel.app/r/blok-components.json" 
                showLineNumbers={false} 
              />
              <p className="pt-2">
            This command will install a comprehensive set of components including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Basic UI components (Button, Card, Input, etc.)</li>
            <li>Advanced components (Calendar, DataTable, Charts, etc.)</li>
            <li>Layout components (Navigation, Breadcrumbs, etc.)</li>
            <li>Form components (Select, Checkbox, Radio, etc.)</li>
          </ul>
            </AlertDescription>
          </Alert>
          
        </div>

        <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Step 3: Test your setup
          </h2>
          <p className="pt-2">
            Update your <code className="inline text-sm tabular-nums bg-muted px-1 rounded">src/App.jsx</code> to test the installation. Components are imported with the <code className="inline text-sm tabular-nums bg-muted px-1 rounded">@/</code> alias:
          </p>
          <Codeblocks 
            code={`import { Button } from "@/components/ui/button"

export default function MyComponent() {
  return (
    <div>
      <Button variant="default">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`} 
            showLineNumbers={true} 
          />
        </div>

        <div className="flex flex-col space-y-2 mt-4 mb-10 p-5 md:mt-2 md:px-10">
          <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
            Step 4: Run your application
          </h2>
          <p className="pt-2">
            Start the development server:
          </p>
          <Codeblocks 
            code="npm run dev" 
            showLineNumbers={false} 
          />
          <p className="pt-2 text-muted-foreground">
            Your application is now running with functional BlokCN components.
          </p>
        </div>
      </div>
    </main>
  );
}
