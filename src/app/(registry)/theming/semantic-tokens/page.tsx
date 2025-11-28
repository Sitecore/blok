import fs from "fs";
import path from "path";
import { SemanticTokensClient } from "./semantic-tokens-client";

const cssPath = path.join(process.cwd(), "src", "app", "globals.css");
const globalsContent = fs.readFileSync(cssPath, "utf-8");

export default function SemanticTokensPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl mb-2">
          Semantic tokens
        </h1>
      </div>
      <SemanticTokensClient content={globalsContent} />
    </div>
  );
}
