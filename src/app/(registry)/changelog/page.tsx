import { mdiLinkVariant } from "@mdi/js";
import Link from "next/link";

import { getChangelogsNewestFirst } from "@/app/(registry)/changelog/changelogs";
import { Icon } from "@/components/ui/icon";

export default function ChangelogPage() {
  return (
    <div className="w-full px-10 flex justify-center">
      <div className="max-w-[800px]">
        <div className="py-12.5">
          <div>
            <h1 className="font-semibold text-4xl">Changelog</h1>
            <p className="mt-2 text-muted-foreground">
              Latest updates and announcements.
            </p>
          </div>
        </div>

        <div className="py-8 space-y-14">
          {getChangelogsNewestFirst().map((entry) => (
            <section key={entry.id} className="space-y-6">
              <h2
                className="scroll-mt-20 flex items-center gap-2 text-3xl font-semibold"
                id={entry.id}
              >
                {entry.title}
                {entry.href ? (
                  <Link
                    href={entry.href}
                    aria-label={`Open ${entry.title}`}
                    title={entry.href}
                    className="inline-flex shrink-0 text-primary-fg hover:text-primary-active"
                  >
                    <Icon path={mdiLinkVariant} size="md" aria-hidden />
                  </Link>
                ) : null}
              </h2>
              <p className="whitespace-pre-line">
                {formatDescription(entry.log.description)}
              </p>
              <div className="h-fit py-12 px-52 flex items-center justify-center rounded-xl bg-primary-bg">
                {entry.log.thumbnail}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDescription(text: string) {
  return text
    .trim()
    .split("\n\n")
    .map((para) =>
      para
        .split("\n")
        .map((line) => line.trim())
        .join(" "),
    )
    .join("\n\n");
}
