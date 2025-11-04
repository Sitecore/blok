import { Codeblocks } from "@/components/registry/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const BlockRegistryCode = `{
  "registries": {
    "@blok": "https://${process.env.NEXT_PUBLIC_REGISTRY_URL}/r/{name}.json"
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
            <div className="p-6">
                <div className="flex flex-col space-y-5 mt-4 p-5 md:mt-8 md:p-10">
                    <h1 className="font-bold text-4xl tracking-tight md:text-4xl">
                        Blok MCP Server
                    </h1>
                    <p className="text-muted-foreground w-full ">
                        <Link href="https://modelcontextprotocol.io" className="underline hover:no-underline" rel="noopener noreferrer">The MCP Server</Link> is an open protocol that enables AI assistants to securely connect to external data sources and tools. With the shadcn MCP server, your AI assistant can:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>List all available components from the Blok registry</li>
                        <li>Find specific components by name or functionality</li>
                        <li>Add components using simple conversational prompts</li>
                        <li>Access Blok components using the <code className="inline text-sm tabular-nums bg-muted px-1 rounded">@blok</code> namespace prefix</li>
                    </ul>

                    <p className="mt-2">
                        For example, you can ask your AI assistant to <em>"build a landing page using components from the Blok registry."</em>
                    </p>
                    <Alert variant="primary">
                        <AlertDescription className="inline">
                            For complete shadcn MCP documentation, see the{" "}
                            <Link href="https://ui.shadcn.com/docs/mcp" target="_blank" className="underline hover:no-underline" rel="noopener noreferrer">official shadcn MCP guide</Link>.
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
            <div className="px-6">
                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
                        Before You Start
                    </h2>
                    <p>
                        Before you initialize an MCP client or try prompts that reference the Blok registry, add the Blok registry to your project so <code className="inline text-sm tabular-nums bg-muted px-1 rounded">@blok/*</code> components can be resolved.
                    </p>
                    <p className="mt-2">
                        Add the following to your <code className="inline text-sm tabular-nums bg-muted px-1 rounded">components.json</code> to configure the Blok registry:
                    </p>
                    <Codeblocks showLineNumbers={true} code={BlockRegistryCode} />
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
                            <TabsTrigger value="claude" className="whitespace-normal">Claude Code</TabsTrigger>
                            <TabsTrigger value="cursor" className="whitespace-normal">Cursor</TabsTrigger>
                            <TabsTrigger value="vscode" className="whitespace-normal">VS Code</TabsTrigger>
                            <TabsTrigger value="codex" className="whitespace-normal">Codex</TabsTrigger>
                        </TabsList>
                        <TabsContent value="claude" className="space-y-2">
                            <p>To initialize an MCP project for Claude using the shadCN CLI, run the following command:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client claude`} />    

                            <p className="mt-2">You can then test that your installation has been successful by trying prompts, for example:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry.</li>
                                <li>Add the button, dialog and card components to my project.</li>
                                <li>Create a contact form using components from the shadcn registry.</li>
                            </ul>

                            <Alert variant="primary" className="mt-4">
                                <AlertDescription className="inline">
                                    You can use <code className="inline text-sm tabular-nums bg-muted px-1 rounded">/mcp</code> command in Claude Code to debug the MCP server.
                                </AlertDescription>
                            </Alert>
                        </TabsContent>
                        <TabsContent value="cursor" className="space-y-2">
                            <p>To initialize an MCP project for Cursor using the shadCN CLI, run the following command:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client cursor`} />

                            <p className="mt-2">You can then test that your installation has been successful by trying prompts, for example:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry.</li>
                                <li>Add the button, dialog and card components to my project.</li>
                                <li>Create a contact form using components from the shadcn registry.</li>
                            </ul>
                        </TabsContent>
                        <TabsContent value="vscode" className="space-y-2">
                            <p>To initialize an MCP project for VS Code using the shadCN CLI, run the following command:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client vscode`} />

                            <p className="mt-2">You can then test that your installation has been successful by trying prompts, for example:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry.</li>
                                <li>Add the button, dialog and card components to my project.</li>
                                <li>Create a contact form using components from the shadcn registry.</li>
                            </ul>
                        </TabsContent>
                        <TabsContent value="codex" className="space-y-2">
                            <p>To initialize an MCP project for Codex using the shadCN CLI, run the following command:</p>
                            <Codeblocks showLineNumbers={false} code={`npx shadcn@latest mcp init --client codex`} />
                            
                            <p className="mt-2">Then, add the following configuration to <code className="inline text-sm tabular-nums bg-muted px-1 rounded">~/.codex/config.toml</code>:</p>
                            <Codeblocks showLineNumbers={false} code={`[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]`} />

                            <p className="mt-2">You can then test that your installation has been successful by trying prompts, for example:</p>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                <li>Show me all available components in the shadcn registry.</li>
                                <li>Add the button, dialog and card components to my project.</li>
                                <li>Create a contact form using components from the shadcn registry.</li>
                            </ul>

                            <Alert variant="primary" className="mt-4">
                                <AlertDescription className="inline">
                                    The <code className="inline text-sm tabular-nums bg-muted px-1 rounded">shadcn</code> CLI cannot automatically update <code className="inline text-sm tabular-nums bg-muted px-1 rounded">~/.codex/config.toml</code>. You'll need to add the configuration manually for Codex.
                                </AlertDescription>
                            </Alert>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 id="configuration" className="font-bold text-3xl tracking-tight md:text-4xl">Configure MCP in Cursor</h2>
                    <p>
                        To configure MCP in Cursor, add the shadcn server to your project's <code className="inline text-sm tabular-nums bg-muted px-1 rounded">.cursor/mcp.json</code> configuration file:
                    </p>
                    <Codeblocks code={CursorConfigurationCode} showLineNumbers={true} />

                    <p className="mt-2">After adding the configuration, enable the shadcn MCP server in Cursor Settings.</p>
                    <p className="mt-2">Once enabled, you should see a green dot next to the shadcn server in the MCP server list and a list of available tools.</p>
                    <p className="mt-2">See the <Link href="https://docs.cursor.com/en/context/mcp#using-mcp-json" target="_blank" className="underline hover:no-underline" rel="noopener noreferrer">Cursor MCP documentation</Link> for more details.</p> 
                </div>

                <div className="flex flex-col space-y-2 mt-4 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">Example Prompts</h2>
                    <p>Once the MCP server is configured, you can interact with the Blok registry with natural language, for example:</p>

                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Show me all available components in the blok registry.</li>
                        <li>What components are available from blok?</li>
                        <li>Find me a hero section from the blok registry.</li>
                        <li>Install @blok/button.</li>
                        <li>Add button, card and alert from the Blok registry.</li>
                        <li>Build a dashboard layout using blok components</li>
                    </ul>
                </div>

                <div className="flex flex-col space-y-2 mt-4 mb-10 p-5 md:mt-2 md:px-10">
                    <h2 className="font-bold text-3xl tracking-tight md:text-4xl">Troubleshooting</h2>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">MCP Not Responding</h3>
                    <p>If the MCP server isn't responding to prompts:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Verify the MCP server is properly configured and enabled in Cursor Settings.</li>
                        <li>Restart Cursor after configuration changes.</li>
                        <li>In Cursor, view logs by clicking View, then click Output, and select <code className="inline text-sm tabular-nums bg-muted px-1 rounded">MCP: project-*</code> in the dropdown.</li>
                    </ol>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">Registry Access Issues</h3>
                    <p>If components aren't loading from the Blok registry:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Verify the <code className="inline text-sm tabular-nums bg-muted px-1 rounded">@blok</code> registry URL is correct</li>
                        <li>Ensure environment variables are set if using private registry</li>
                        <li>Confirm the Blok registry is online and accessible</li>
                        <li>Ensure namespace syntax is correct (<code className="inline text-sm tabular-nums bg-muted px-1 rounded">@blok/component-name</code>)</li>
                    </ol>

                    <h3 className="mt-4 font-bold text-2xl tracking-tight md:text-3xl">No Tools or Prompts</h3>
                    <p>If you see the <code className="inline text-sm tabular-nums bg-muted px-1 rounded">No tools or prompts</code> message:</p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Run <code className="inline text-sm tabular-nums bg-muted px-1 rounded">npx clear-npx-cache</code></li>
                        <li>Try to re-enable the MCP server in Cursor Settings</li>
                        <li>View → Output → select <code className="inline text-sm tabular-nums bg-muted px-1 rounded">MCP: project-*</code> in the dropdown</li>
                    </ol>
                </div>
            </div>
        </main>
    )
}