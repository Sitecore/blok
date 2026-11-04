const MarketplaceAppIconThumb = ({ className }: { className?: string }) => (
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

export default MarketplaceAppIconThumb;
