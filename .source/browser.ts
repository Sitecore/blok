// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../src/content/docs/index.mdx?collection=docs"), "installation.mdx": () => import("../src/content/docs/installation.mdx?collection=docs"), "components/button.mdx": () => import("../src/content/docs/components/button.mdx?collection=docs"), "components/card.mdx": () => import("../src/content/docs/components/card.mdx?collection=docs"), "components/index.mdx": () => import("../src/content/docs/components/index.mdx?collection=docs"), }),
};
export default browserCollections;