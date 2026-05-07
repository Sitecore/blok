import type { ReactNode } from "react";
import May052026SonnerDocumentation from "./changelog-thumbs/5-6-2026.sonner-documentation";

export type ChangelogItem = {
  description: string;
  thumbnail: ReactNode;
};

type Changelog = {
  title: string;
  id: string;
  releaseDate: string;
  log: ChangelogItem;
};

export const changelogs: Changelog[] = [
  {
    title: "April 2026 - Sonner Installation Guide Updated",
    id: "april-2026-sonner-installation-guide",
    releaseDate: "2026-05-06",
    log: May052026SonnerDocumentation,
  },
];

export function getChangelogsNewestFirst(): Changelog[] {
  return [...changelogs].sort((a, b) =>
    b.releaseDate.localeCompare(a.releaseDate),
  );
}
