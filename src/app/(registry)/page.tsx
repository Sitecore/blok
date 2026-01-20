"use client";

import { Button } from "@/components/ui/button";
import { Codeblocks } from "@/components/docsite/code-block";
import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import { externalLinks } from "@/config/links";

export default function Home() {
  return (
    <main className="w-full bg-subtle-bg">
      <div className="bg-body-bg px-32 flex justify-center">
        <div className="flex flex-col space-y-12 py-20 md:py-30 w-full max-w-[1250px]">
          <div className="flex flex-col space-y-6">
            <>
              <img
                src={externalLinks?.Block_Logo || ""}
                alt="Blok"
                width={300}
                height={300}
                className="dark:hidden" // Hide in dark mode
              />
              <img
                src={externalLinks?.Block_Logo_Dark || ""}
                alt="Blok"
                width={300}
                height={300}
                className="hidden dark:block" // Show only in dark mode
              />
            </>
            <h1 className="font-semibold text-5xl">
              Build better products faster
            </h1>
            <p className="text-muted-foreground w-full text-lg">
            Blok is Sitecore's design system. It is used for creating industry leading martech applications.
              <br /> Now, it's publicly available, so that anyone can easily
              build software in the Sitecore product design language.
            </p>
          </div>
          <div className="flex space-x-4">
            <Button
              size="lg"
              onClick={() => {
                const element = document.getElementById("step-1");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get started
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/primitives">Browse primitives</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-32 w-full flex items-center flex-col">
        <div className="flex flex-col space-y-3 py-20 md:pt-30  w-full max-w-[1250px]">
          <h2 className="font-semibold text-3xl md:text-4xl">Prerequisites</h2>
          <p className="">
            Make sure you have the following tools installed before proceeding:
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Badge
                    colorScheme="primary"
                    size="sm"
                    className="w-8 h-8 rounded-[6px] p-0 flex items-center justify-center text-base"
                  >
                    1
                  </Badge>
                  <CardTitle className="text-lg font-semibold">
                    Node.js 16+
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="mb-4">
                  <code className="bg-muted px-1 rounded text-xs">
                    node --version
                  </code>
                </CardDescription>
                <Button
                  variant="outline"
                  colorScheme="neutral"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://nodejs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                    <Icon path={mdiOpenInNew} className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Badge
                    colorScheme="primary"
                    size="sm"
                    className="w-8 h-8 rounded-[6px] p-0 flex items-center justify-center text-base"
                  >
                    2
                  </Badge>
                  <CardTitle className="text-lg font-semibold">
                    npm 10+
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="mb-4">
                  <code className="bg-muted px-1 rounded text-xs">
                    npm --version
                  </code>
                </CardDescription>
                <Button
                  variant="outline"
                  colorScheme="neutral"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more
                    <Icon path={mdiOpenInNew} className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-0">
                <div className="flex items-center gap-3">
                  <Badge
                    colorScheme="primary"
                    size="sm"
                    className="w-8 h-8 rounded-[6px] p-0 flex items-center justify-center text-base"
                  >
                    3
                  </Badge>
                  <CardTitle className="text-lg font-semibold">
                    TailwindCSS
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <CardDescription className="mb-4">
                  Installed & configured
                </CardDescription>
                <Button
                  variant="outline"
                  colorScheme="neutral"
                  size="sm"
                  asChild
                >
                  <a
                    href="https://tailwindcss.com/docs/installation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Setup guide
                    <Icon path={mdiOpenInNew} className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Alert variant="primary" className="flex align-center items-center">
            <AlertDescription className="flex items-col gap-1 text-lg">
              <span className="font-semibold">Tip:</span> This installation
              process is similar to{" "}
              <a
                href="https://ui.shadcn.com/docs/installation"
                className="hover:underline break-words text-primary-fg font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                shadcn/ui
              </a>
              . If you're familiar with that, you'll feel right at home!
            </AlertDescription>
          </Alert>
        </div>

        <div
          id="step-1"
          className="flex flex-col space-y-3 py-10 md:pt-10 scroll-mt-20 w-full max-w-[1250px]"
        >
          <h2 className="font-semibold text-3xl md:text-4xl">
            Step 1: Initialize shadcn/ui
          </h2>
          <p>
            Run the shadcn/ui initialization command in your project's root
            folder:
          </p>
          <Codeblocks code="npx shadcn@latest init" showLineNumbers={false} />
          <p>
            During initialization, choose a base color when prompted. The CLI
            will then:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Automatically detect your Vite setup and Tailwind configuration.
            </li>
            <li>
              Create a{" "}
              <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
                components.json
              </code>{" "}
              configuration file.
            </li>
            <li>Update your CSS with the necessary CSS variables.</li>
            <li>
              Create{" "}
              <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
                src/lib/utils.js
              </code>{" "}
              with utility functions.
            </li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3 py-10 md:pt-10 w-full max-w-[1250px]">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Step 2: Install Blok components
          </h2>
          <p>You can now start adding the Blok components to your project.</p>
          <Codeblocks
            code={`npx shadcn@latest add https://${process.env.NEXT_PUBLIC_REGISTRY_URL}/r/button.json`}
            showLineNumbers={false}
          />
          <Alert variant="primary" className="items-start">
            <AlertDescription className="flex flex-col gap-3 text-lg">
              <div className="flex items-col gap-1">
                Alternatively, you can install the Blok component registry to
                get access to all components.
              </div>
              <div className="max-w-full overflow-x-auto">
                <Codeblocks
                  code={`npx shadcn@latest add https://${process.env.NEXT_PUBLIC_REGISTRY_URL}/r/blok-components.json`}
                  showLineNumbers={false}
                />
              </div>
              <p className="max-w-full">
                This command will install a comprehensive set of components
                including:
              </p>
              <ul className="list-disc list-inside space-y-2 ">
                <li>Basic UI components (Button, Card, Input, etc.)</li>
                <li>Advanced components (Calendar, DataTable, Charts, etc.)</li>
                <li>Layout components (Navigation, Breadcrumbs, etc.)</li>
                <li>Form components (Select, Checkbox, Radio, etc.)</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex flex-col space-y-3 py-10 md:pt-10 w-full max-w-[1250px]">
          <h2 className="font-semibold text-3xl  md:text-4xl">
            Step 3: Test your setup
          </h2>
          <p>
            Update your{" "}
            <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
              src/App.jsx
            </code>{" "}
            to test the installation. Components are imported with the{" "}
            <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
              @/
            </code>{" "}
            alias:
          </p>
          <CodeBlock
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
            lang="tsx"
            showLineNumbers={true}
            className="bg-body-bg border"
          />
        </div>

        <div className="flex flex-col space-y-3 mb-10 py-10 md:pt-10 md:pb-10 w-full max-w-[1250px]">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Step 4: Run your application
          </h2>
          <p>Start the development server:</p>
          <Codeblocks code="npm run dev" showLineNumbers={false} />
          <p className="">
            Your application is now running with functional Blok components.
          </p>
        </div>
      </div>
    </main>
  );
}
