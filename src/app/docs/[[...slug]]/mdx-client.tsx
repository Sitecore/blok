"use client";

import IntroductionPage from "@/content/docs/index.mdx"
import InstallationPage from "@/content/docs/installation.mdx"
import ComponentsIndexPage from "@/content/docs/components/index.mdx"
import ButtonPage from "@/content/docs/components/button.mdx"
import CardPage from "@/content/docs/components/card.mdx"

// Map slugs to MDX components
const pageMap: Record<string, React.ComponentType> = {
  "": IntroductionPage,
  "installation": InstallationPage,
  "components": ComponentsIndexPage,
  "components/button": ButtonPage,
  "components/card": CardPage,
}

export function MDXClient({ slug }: { slug: string[] | undefined }) {
  const slugKey = slug ? slug.join("/") : "";
  const PageComponent = pageMap[slugKey];

  if (!PageComponent) {
    return <div>Page not found</div>;
  }

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      <PageComponent />
    </div>
  );
}

