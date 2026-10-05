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
    <rect
      x="118"
      y="116"
      width="48"
      height="48"
      rx="10"
      fill="var(--color-teal-500)"
    />
    <text
      x="142"
      y="148"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
    >
      C
    </text>
    <rect
      x="176"
      y="116"
      width="48"
      height="48"
      rx="10"
      fill="var(--color-pink-500)"
    />
    <text
      x="200"
      y="148"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
    >
      M
    </text>
    <rect
      x="234"
      y="116"
      width="48"
      height="48"
      rx="10"
      fill="var(--color-purple-500)"
    />
    <text
      x="258"
      y="148"
      textAnchor="middle"
      fill="white"
      fontSize="22"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
    >
      L
    </text>
  </svg>
);

const October2026MarketplaceAppIcon: ChangelogItem = {
  description: `A new Marketplace App Icon Blok has been added for marketplace application icons.
    It shows the application image when a source is provided, and falls back to the first letter of the application name on a stable color from the palette when the image is missing or fails to load.`,
  thumbnail: <Thumb />,
};

export default October2026MarketplaceAppIcon;
