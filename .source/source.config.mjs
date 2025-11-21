// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
var source_config_default = defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light"
          },
          keepBackground: false
        }
      ]
    ],
    providerImportSource: "@mdx-js/react",
    useMDXComponents: () => "./mdx-components.tsx"
  }
});
var { docs, meta } = defineDocs({
  dir: "src/content/docs"
});
export {
  source_config_default as default,
  docs,
  meta
};
