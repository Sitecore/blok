import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsRightSidebar } from '@/components/docs-right-sidebar';
import { getMDXComponents } from '../../../../mdx-components';

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="flex w-full">
     <div className="flex-1">
  <DocsPage tableOfContent={{ enabled: false }}>
    <DocsTitle>{page.data.title}</DocsTitle>
    <DocsDescription>{page.data.description}</DocsDescription>
    <DocsBody>
      <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
    </DocsBody>
  </DocsPage>
</div>
      <DocsRightSidebar
  toc={page.data.toc?.map(item => ({
    ...item,
    title: typeof item.title === "string" ? item.title : "",
  }))}
/>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}