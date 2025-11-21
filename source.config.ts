import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
    providerImportSource: "@mdx-js/react",
    useMDXComponents: () => "./mdx-components.tsx",
  },
});

export const { docs, meta } = defineDocs({
  dir: "src/content/docs",
});

