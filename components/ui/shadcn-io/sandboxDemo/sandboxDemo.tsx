import { Sandpack } from "@codesandbox/sandpack-react";

export default function SandboxDemo() {
    return (
        <Sandpack
            template="react"

            customSetup={{
                entry: "/index.tsx",
                dependencies: {
                    react: "18.2.0",
                    "react-dom": "18.2.0",
                    typescript: "latest"
                }
            }}

            options={{
                externalResources: [
                    "https://cdn.tailwindcss.com"
                ],
                visibleFiles: ["/index.tsx", "/myButton.tsx"],
                activeFile: "/index.tsx"
            }}
            files={{
                "/myButton.tsx": {
                    code: `import React from "react";

                    export default function MyButton() {
                    return (
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Click Me 
                        </button>
                    );
                    }`,
                    readOnly: false
                },
                "/index.tsx": {
                    code: `import React from "react";
import ReactDOM from "react-dom";
import MyButton from "./myButton";

const App = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Hello from Sandpack</h1>
    <MyButton />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));`,
                    active: true
                },
                "/public/index.html": {
                    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Sandpack</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
                }
            }}
        />
    );
}
