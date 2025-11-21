// @ts-nocheck
import { default as __fd_glob_6 } from "../src/content/docs/components/meta.json?collection=meta"
import { default as __fd_glob_5 } from "../src/content/docs/meta.json?collection=meta"
import * as __fd_glob_4 from "../src/content/docs/components/index.mdx?collection=docs"
import * as __fd_glob_3 from "../src/content/docs/components/card.mdx?collection=docs"
import * as __fd_glob_2 from "../src/content/docs/components/button.mdx?collection=docs"
import * as __fd_glob_1 from "../src/content/docs/installation.mdx?collection=docs"
import * as __fd_glob_0 from "../src/content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "src/content/docs", {"index.mdx": __fd_glob_0, "installation.mdx": __fd_glob_1, "components/button.mdx": __fd_glob_2, "components/card.mdx": __fd_glob_3, "components/index.mdx": __fd_glob_4, });

export const meta = await create.meta("meta", "src/content/docs", {"meta.json": __fd_glob_5, "components/meta.json": __fd_glob_6, });