import { Codeblocks } from "@/components/registry/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const BlockRegistryCode = `{
  "registries": {
    "@blok": "https://blok.example.com/r/{name}.json"
  }
}`

const CursorConfigurationCode = `{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}`

export default function MCPPage() {
    return (
        <main className="w-full">
            <div className="bg-body-bg p-6">
                <div className="flex flex-col space-y-5 mt-4 p-5 md:mt-8 md:p-10">
                    <h1 className="font-bold text-4xl tracking-tight md:text-4xl">
                        MCP Server for Blok Registry
                    </h1>
                    <p className="text-muted-foreground w-full ">
                        The MCP Server allows AI assistants to interact with components from the Blok registry. You can browse available components, search for specific ones, and install them directly into your project using natural language.
                    </p>
                </div>
            </div>
            <div className="px-6">
                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <p>
                        For example, you can ask an AI assistant to
                        <em> "Build a landing page using components from the blok registry"</em> 
                    </p>
                    <Alert variant="primary">
                        <AlertDescription className="inline">
                            For complete shadcn MCP documentation, see the{" "}
                            <Link href="https://ui.shadcn.com/docs/cli/mcp" target="_blank" className="underline hover:no-underline" rel="noopener noreferrer">official shadcn MCP guide</Link>.
                        </AlertDescription>
                    </Alert>

                    <p className="mt-2">Configure the Blok registry in your <code className="inline text-sm tabular-nums bg-muted px-1 rounded">components.json</code>:</p>
                    <Codeblocks code={BlockRegistryCode} showLineNumbers={true} />
                </div>

                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
                        Quick Start
                    </h2>
                    <p>
                        Select your MCP client and follow the instructions to configure the shadcn MCP server. If you'd like to do it manually, see the {" "}
                        <Link href="#configuration" className="underline hover:no-underline">Configuration</Link> section.
                    </p>
                    <Tabs defaultValue="claude">
                        <TabsList>
                            <TabsTrigger value="claude">Claude Code</TabsTrigger>
                            <TabsTrigger value="cursor">Cursor</TabsTrigger>
                            <TabsTrigger value="vscode">VS Code</TabsTrigger>
                            <TabsTrigger value="codex">Codex</TabsTrigger>
                        </TabsList>
                        <TabsContent value="claude" className="space-y-2">
                            <p>Run the following command in your project:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client claude`} />    

                            <p className="mt-2">Restart Claude Code and try the following prompts:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry</li>
                                <li>Add the button, dialog and card components to my project</li>
                                <li>Create a contact form using components from the shadcn registry</li>
                            </ul>

                            <Alert variant="primary" className="mt-4">
                                <AlertDescription className="inline">
                                    You can use <code className="inline text-sm tabular-nums bg-muted px-1 rounded">/mcp</code> command in Claude Code to debug the MCP server.
                                </AlertDescription>
                            </Alert>
                        </TabsContent>
                        <TabsContent value="cursor" className="space-y-2">
                            <p>Run the following command in your project:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client cursor`} />

                            <p className="mt-2">Open Cursor Settings and Enable the MCP server for shadcn. Then try the following prompts:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry</li>
                                <li>Add the button, dialog and card components to my project</li>
                                <li>Create a contact form using components from the shadcn registry</li>
                            </ul>
                        </TabsContent>
                        <TabsContent value="vscode" className="space-y-2">
                            <p>Run the following command in your project:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client vscode`} />

                            <p className="mt-2">Open <code className="inline text-sm tabular-nums bg-muted px-1 rounded">.vscode/mcp.json</code> and click <code className="inline text-sm tabular-nums bg-muted px-1 rounded">Start</code> next to the shadcn server. Then try the following prompts with GitHub Copilot:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry</li>
                                <li>Add the button, dialog and card components to my project</li>
                                <li>Create a contact form using components from the shadcn registry</li>
                            </ul>
                        </TabsContent>
                        <TabsContent value="codex" className="space-y-2">
                            <Alert variant="primary">
                                <AlertDescription className="inline">
                                    The <code className="inline text-sm tabular-nums bg-muted px-1 rounded">shadcn</code> CLI cannot automatically update <code className="inline text-sm tabular-nums bg-muted px-1 rounded">~/.codex/config.toml</code>. You'll need to add it manually.
                                </AlertDescription>
                            </Alert>

                            <p>Run the following command in your project:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client codex`} />
                            
                            <p className="mt-2">Then, add the following configuration to <code className="inline text-sm tabular-nums bg-muted px-1 rounded">~/.codex/config.toml</code>:</p>
                            <Codeblocks showLineNumbers={false} code={`[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]`} />

                            <p className="mt-2">Restart Codex and try the following prompts:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry</li>
                                <li>Add the button, dialog and card components to my project</li>
                                <li>Create a contact form using components from the shadcn registry</li>
                            </ul>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">What is MCP?</h2>
                    <p><Link href="https://www.modelcontextprotocol.io/" target="_blank" className="underline hover:no-underline" rel="noopener noreferrer">Model Context Protocol (MCP)</Link> is an open protocol that enables AI assistants to securely connect to external data sources and tools. With the shadcn MCP server, your AI assistant gains direct access to:</p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Browse Components - List all available components from the Blok registry</li>
                        <li>Search Components - Find specific components by name or functionality</li>
                        <li>Install with Natural Language - Add components using simple conversational prompts</li>
                        <li>Registry Namespaces - Access Blok components using the <code>@blok</code> namespace prefix</li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">Configuration</h2>
                    <p>
                        To configure MCP in Cursor, add the shadcn server to your project's <code className="inline text-sm tabular-nums bg-muted px-1 rounded">.cursor/mcp.json</code> configuration file:
                    </p>
                    <Codeblocks code={CursorConfigurationCode} showLineNumbers={true} />
                    <p className="mt-2">After adding the configuration, enable the shadcn MCP server in Cursor Settings.</p>
                    <p className="mt-2">Once enabled, you should see a green dot next to the shadcn server in the MCP server list and a list of available tools.</p>
                    <p className="mt-2">See the <Link href="https://docs.cursor.com/en/context/mcp#using-mcp-json" target="_blank" className="underline hover:no-underline" rel="noopener noreferrer">Cursor MCP documentation</Link> for more details.</p> 
                </div>

                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">Configuring the Blok Registry</h2>
                    <p>The MCP server accesses the Blok registry through your project's <code className="inline text-sm tabular-nums bg-muted px-1 rounded">components.json</code> configuration.</p>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">Registry Namespace</h3>
                    <p>A <strong>registry namespace</strong> (like <code className="inline text-sm tabular-nums bg-muted px-1 rounded">@blok</code>) is a way to identify and access components from custom registries. The namespace prefix tells the CLI which registry to fetch components from, allowing you to use multiple sources alongside the default shadcn/ui registry.</p>
                    <p className="mt-2">Configure the Blok registry in your <code className="inline text-sm tabular-nums bg-muted px-1 rounded">components.json</code>:</p>
                    <Codeblocks showLineNumbers={true} code={BlockRegistryCode} />
                </div>

                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">Example Prompts</h2>
                    <p>Once the MCP server is configured, you can use natural language to interact with the Blok registry:</p>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">Browse & Search</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Show me all available components in the blok registry</li>
                        <li>What components are available from blok?</li>
                        <li>Find me a hero section from the blok registry</li>
                    </ul>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">Install Components</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Install @blok/button</li>
                        <li>Add button, card and alert from the blok registry</li>
                    </ul>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">Build with Components</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Build a dashboard layout using blok components</li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-2 mt-4 mb-10 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">Troubleshooting</h2>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">MCP Not Responding</h3>
                    <p>If the MCP server isn't responding to prompts:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Check Configuration - Verify the MCP server is properly configured and enabled in Cursor Settings</li>
                        <li>Restart Cursor - Restart Cursor after configuration changes</li>
                        <li>Check Logs - In Cursor, view logs under View → Output and select <code>MCP: project-*</code> in the dropdown</li>
                    </ol>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">Registry Access Issues</h3>
                    <p>If components aren't loading from the Blok registry:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Check components.json - Verify the <code>@blok</code> registry URL is correct</li>
                        <li>Test Authentication - Ensure environment variables are set if using private registry</li>
                        <li>Verify Registry - Confirm the Blok registry is online and accessible</li>
                        <li>Check Namespace - Ensure namespace syntax is correct (<code>@blok/component-name</code>)</li>
                    </ol>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">No Tools or Prompts</h3>
                    <p>If you see the <code>No tools or prompts</code> message:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Clear the npx cache - Run <code>npx clear-npx-cache</code></li>
                        <li>Re-enable the MCP server - Try to re-enable the MCP server in Cursor Settings</li>
                        <li>Check Logs - View → Output → select <code>MCP: project-*</code> in the dropdown</li>
                    </ol>
                </div>
            </div>
        </main>
    )
}