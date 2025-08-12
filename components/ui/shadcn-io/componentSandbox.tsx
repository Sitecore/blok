'use client';
import {
  SandboxCodeEditor,
  SandboxConsole,
  SandboxLayout,
  SandboxPreview,
  SandboxProvider,
  SandboxTabs,
  SandboxTabsContent,
  SandboxTabsList,
  SandboxTabsTrigger,
} from '@/components/ui/shadcn-io/sandbox';
import { AppWindowIcon, CodeIcon, TerminalIcon } from 'lucide-react';

const ComponentSandbox = () => (
  <SandboxProvider
    template="react"
    options={{
      externalResources: ["https://cdn.tailwindcss.com","/globals.css"],
    }}
    files={{
        "/App.js": `export default function Example() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-indigo-600">Start your free trial today.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Get started
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}`
      }}
  >
    <SandboxLayout>
      <SandboxTabs defaultValue="preview">
        <SandboxTabsList>
          <SandboxTabsTrigger value="code">
            <CodeIcon size={14} />
            Code
          </SandboxTabsTrigger>
          <SandboxTabsTrigger value="preview">
            <AppWindowIcon size={14} />
            Preview
          </SandboxTabsTrigger>

        </SandboxTabsList>
        <SandboxTabsContent value="code">
          <SandboxCodeEditor showTabs readOnly={true} showReadOnly= {false}/>
        </SandboxTabsContent>
        <SandboxTabsContent value="preview">
          <SandboxPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
            style={{ height: 'auto' }} 
          />
        </SandboxTabsContent>
      </SandboxTabs>
    </SandboxLayout>
  </SandboxProvider>
);
export default ComponentSandbox;