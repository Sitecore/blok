import type { ReactNode } from "react";
import SonnerThumb from "./changelog-thumbs/5-6-2025.sonner-documentation";

export type ChangelogItem = {
  description: string;
  image: ReactNode;
};

type Changelog = {
  title: string;
  id: string;
  releaseDate: string;
  items: ChangelogItem;
};

export const changelogs: Changelog[] = [
  {
    title: "April 2026 - Sonner Installation Guide Updated",
    id: "april-2026-sonner-installation-guide",
    releaseDate: "2026-05-06",
    items: {
      description: `The Sonner installation guide has been updated to remove confusion around setup and usage. 
            The new guidance clarifies the correct installation flow and expected integration steps, making it easier 
            for you to get the component working without misconfiguration.`,
      image: <SonnerThumb />,
    },
  },
];

export function getChangelogsNewestFirst(): Changelog[] {
  return [...changelogs].sort((a, b) =>
    b.releaseDate.localeCompare(a.releaseDate),
  );
}
