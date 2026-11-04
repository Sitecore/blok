import type { ChangelogItem } from "../changelogs";

const Thumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect x="40" y="64" width="320" height="172" rx="8" fill="white" />
    <rect
      x="56"
      y="84"
      width="36"
      height="8"
      rx="4"
      fill="var(--color-gray-300)"
    />
    <rect
      x="100"
      y="84"
      width="52"
      height="8"
      rx="4"
      fill="var(--color-gray-300)"
    />
    <rect
      x="56"
      y="108"
      width="148"
      height="16"
      rx="4"
      fill="var(--color-gray-700)"
    />
    <rect
      x="56"
      y="132"
      width="188"
      height="8"
      rx="4"
      fill="var(--color-gray-400)"
    />
    <rect
      x="248"
      y="106"
      width="48"
      height="22"
      rx="6"
      fill="var(--color-primary-400)"
    />
    <rect
      x="304"
      y="106"
      width="40"
      height="22"
      rx="6"
      fill="var(--color-gray-100)"
    />
    <rect
      x="56"
      y="176"
      width="44"
      height="8"
      rx="4"
      fill="var(--color-primary-400)"
    />
    <rect
      x="56"
      y="192"
      width="44"
      height="2"
      fill="var(--color-primary-400)"
    />
    <rect
      x="116"
      y="176"
      width="52"
      height="8"
      rx="4"
      fill="var(--color-gray-300)"
    />
    <rect
      x="184"
      y="176"
      width="40"
      height="8"
      rx="4"
      fill="var(--color-gray-300)"
    />
    <rect x="56" y="194" width="288" height="1" fill="var(--color-gray-200)" />
  </svg>
);

const October2026PageHeader: ChangelogItem = {
  description: `A new Page Header Blok has been added so product pages share one header layout instead of composing it from primitives.
    It supports an optional breadcrumb, a title and description, page actions, and optional tabs, and can be customized for each product.`,
  thumbnail: <Thumb />,
};

export default October2026PageHeader;
