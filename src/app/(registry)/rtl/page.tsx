import { CodeBlock } from "@/components/code-block";
import { Codeblocks } from "@/components/docsite/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const DirectionProviderCode = `"use client";

import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";
import { useEffect, useState } from "react";
import { getDirectionFromLanguage, getBrowserLanguage } from "@/lib/direction-utils";

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  useEffect(() => {
    const browserLang = getBrowserLanguage();
    const direction = getDirectionFromLanguage(browserLang);
    
    setDir(direction);
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", browserLang);
  }, []);

  return <RadixDirectionProvider dir={dir}>{children}</RadixDirectionProvider>;
}`;

const UseDirectionCode = `import { useDirection } from "@radix-ui/react-direction";

export function MyComponent() {
  const direction = useDirection();
  
  return (
    <div className={direction === "rtl" ? "text-right" : "text-left"}>
      Content
    </div>
  );
}`;

const DirectionUtilsCode = `// List of RTL language codes
const RTL_LANGUAGES = [
  "ar", // Arabic
  "he", // Hebrew
  "fa", // Persian/Farsi
  "ur", // Urdu
  "yi", // Yiddish
  "ji", // Yiddish (alternative)
  "ku", // Kurdish
  "ps", // Pashto
  "sd", // Sindhi
] as const;

// Determines if a language code is RTL
export function isRTL(language: string): boolean {
  const langCode = language.toLowerCase().split("-")[0];
  return RTL_LANGUAGES.includes(langCode as typeof RTL_LANGUAGES[number]);
}

// Gets the direction based on language code
export function getDirectionFromLanguage(language: string): "ltr" | "rtl" {
  return isRTL(language) ? "rtl" : "ltr";
}

// Gets the browser's preferred language
export function getBrowserLanguage(): string {
  if (typeof window === "undefined") return "en";
  const languages = navigator.languages || [navigator.language];
  return languages[0] || "en";
}`;

const RTL_LANGUAGES = [
  { code: "ar", name: "Arabic" },
  { code: "he", name: "Hebrew" },
  { code: "fa", name: "Persian/Farsi" },
  { code: "ur", name: "Urdu" },
  { code: "yi", name: "Yiddish" },
  { code: "ji", name: "Yiddish (alternative)" },
  { code: "ku", name: "Kurdish" },
  { code: "ps", name: "Pashto" },
  { code: "sd", name: "Sindhi" },
];

export default function RTLPage() {
  return (
    <main className="w-full">
      <div className="px-32 max-w-[1250px] mx-auto">
        <div className="flex flex-col space-y-5 p-5 md:p-10">
          <h1 className="font-semibold text-4xl md:text-4xl">
            Right-to-Left (RTL) Support
          </h1>
          <p className="w-full">
            Right-to-Left (RTL) is a text direction used by languages such as
            Arabic, Hebrew, Persian, and Urdu. The Blok design system provides{" "}
            <strong>automatic RTL support</strong> based on the user's browser
            language preference. When an RTL language is detected, the entire UI
            layout flips horizontally - sidebars move to the opposite side, text
            aligns to the right, and navigation elements flip direction. Code
            blocks always remain LTR for readability.
          </p>
          <Alert variant="primary">
            <AlertDescription className="inline">
              The Blok design system uses{" "}
              <Link
                href="https://www.radix-ui.com/primitives/docs/utilities/direction-provider"
                target="_blank"
                className="underline hover:no-underline"
                rel="noopener noreferrer"
              >
                Radix UI Direction Provider
              </Link>{" "}
              to enable automatic RTL support.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="px-32 max-w-[1250px] mx-auto">
        <div className="flex flex-col space-y-3 p-5 md:pt-2 md:px-10">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Supported RTL Languages
          </h2>
          <p>The following languages are automatically detected as RTL:</p>
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {RTL_LANGUAGES.map((lang) => (
                <div key={lang.code} className="p-4 border rounded-lg bg-card">
                  <div className="font-mono text-sm text-muted-foreground">
                    {lang.code}
                  </div>
                  <div className="font-medium mt-1">{lang.name}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            <strong>Note:</strong> Any language not in this list defaults to LTR
            (Left-to-Right).
          </p>
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-2 md:px-10">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Installation
          </h2>
          <p>Install the required dependency from your command line:</p>
          <Codeblocks
            showLineNumbers={false}
            code="npm install @radix-ui/react-direction"
            variant="outline"
          />
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-2 md:px-10">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Direction Utilities
          </h2>
          <p>
            Create utility functions for detecting RTL languages and getting the
            browser language:
          </p>
          <CodeBlock
            code={DirectionUtilsCode}
            lang="typescript"
            showLineNumbers={true}
            className="bg-body-bg border"
          />
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-2 md:px-10">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Direction Provider
          </h2>
          <p>
            The{" "}
            <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
              DirectionProvider
            </code>{" "}
            wraps your app to provide global reading direction. It enables all
            Radix UI primitives to inherit the global reading direction.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-xl mb-2">API Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border mt-2">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-border p-2 text-left">
                        Prop
                      </th>
                      <th className="border border-border p-2 text-left">
                        Type
                      </th>
                      <th className="border border-border p-2 text-left">
                        Default
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">
                        <code className="text-sm">dir</code>
                      </td>
                      <td className="border border-border p-2">
                        <code className="text-sm">"ltr" | "rtl"</code>
                      </td>
                      <td className="border border-border p-2 text-muted-foreground">
                        No default value
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-2 md:px-10">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Implementation
          </h2>
          <p>
            To implement RTL support in your application, wrap your app with the{" "}
            <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
              DirectionProvider
            </code>{" "}
            component:
          </p>
          <CodeBlock
            code={DirectionProviderCode}
            lang="tsx"
            showLineNumbers={true}
            className="bg-body-bg border"
          />
          <p className="mt-4">
            The provider automatically detects the browser language and sets the
            appropriate direction. You can also use the{" "}
            <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
              useDirection()
            </code>{" "}
            hook in your components to access the current direction:
          </p>
          <CodeBlock
            code={UseDirectionCode}
            lang="tsx"
            showLineNumbers={true}
            className="bg-body-bg border"
          />
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-2 md:px-10">
          <h2 className="font-semibold text-3xl md:text-4xl">
            How to Add RTL Support
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
            <li>
              <strong className="text-foreground">
                Install the dependency
              </strong>{" "}
              (see Installation section above)
            </li>
            <li>
              <strong className="text-foreground">
                Create direction utilities
              </strong>{" "}
              (optional, for automatic detection):
              <p className="mt-2">
                Create a utility file to detect RTL languages and get browser
                language. See{" "}
                <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
                  src/lib/direction-utils.ts
                </code>{" "}
                for reference.
              </p>
            </li>
            <li>
              <strong className="text-foreground">
                Wrap your app with DirectionProvider
              </strong>
              :
              <p className="mt-2">
                In your root layout, wrap your application with the
                DirectionProvider component (see Implementation section above).
              </p>
            </li>
            <li>
              <strong className="text-foreground">
                Use the useDirection hook
              </strong>
              :
              <p className="mt-2">
                In components that need to adapt to RTL, use the{" "}
                <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
                  useDirection()
                </code>{" "}
                hook from{" "}
                <code className="inline text-sm tabular-nums bg-muted px-1 rounded">
                  @radix-ui/react-direction
                </code>{" "}
                (see Examples section below).
              </p>
            </li>
          </ol>
        </div>

        <div className="flex flex-col space-y-3 p-5 md:pt-2 md:px-10 pb-20">
          <h2 className="font-semibold text-3xl md:text-4xl">
            Examples
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-xl mb-2">Basic Usage</h3>
              <CodeBlock
                code={`import { DirectionProvider as RadixDirectionProvider } from "@radix-ui/react-direction";

export default function App() {
  return (
    <RadixDirectionProvider dir="rtl">
      {/* Your app content */}
    </RadixDirectionProvider>
  );
}`}
                lang="tsx"
                showLineNumbers={true}
                className="bg-body-bg border"
              />
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-2">
                Using the Hook in Components
              </h3>
              <CodeBlock
                code={`import { useDirection } from "@radix-ui/react-direction";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const direction = useDirection();
  
  return (
    <aside className={cn(
      "fixed top-0 h-full",
      direction === "rtl" ? "right-0" : "left-0"
    )}>
      {/* Sidebar content */}
    </aside>
  );
}`}
                lang="tsx"
                showLineNumbers={true}
                className="bg-body-bg border"
              />
            </div>

            <div className="mb-10">
              <h3 className="font-semibold text-xl mb-2">
                Keeping Code Blocks LTR
              </h3>
              <p className="text-muted-foreground mb-2">
                Code blocks should always remain LTR for readability:
              </p>
              <CodeBlock
                code={`export function CodeBlock({ code }: { code: string }) {
  return (
    <div dir="ltr">
      <pre className="overflow-x-auto p-4">
        <code>{code}</code>
      </pre>
    </div>
  );
}`}
                lang="tsx"
                showLineNumbers={true}
                className="bg-body-bg border"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

