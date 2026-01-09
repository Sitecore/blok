const KbdThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* First keyboard key - ⌘ */}
    <rect
      x="48"
      y="120"
      width="60"
      height="60"
      rx="8"
      fill="white"
      stroke="var(--color-gray-300)"
      strokeWidth="2"
    />
    <text
      x="78"
      y="160"
      textAnchor="middle"
      fill="var(--color-gray-600)"
      fontSize="28"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      ⌘
    </text>

    {/* Second keyboard key - Shift */}
    <rect
      x="120"
      y="120"
      width="60"
      height="60"
      rx="8"
      fill="white"
      stroke="var(--color-gray-300)"
      strokeWidth="2"
    />
    <text
      x="150"
      y="160"
      textAnchor="middle"
      fill="var(--color-gray-600)"
      fontSize="28"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      ⇧
    </text>

    {/* Third keyboard key - K */}
    <rect
      x="192"
      y="120"
      width="60"
      height="60"
      rx="8"
      fill="var(--color-primary-100)"
      stroke="var(--color-primary-400)"
      strokeWidth="2"
    />
    <text
      x="222"
      y="160"
      textAnchor="middle"
      fill="var(--color-primary-600)"
      fontSize="24"
      fontWeight="600"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      K
    </text>

    {/* Plus sign between groups */}
    <text
      x="280"
      y="158"
      textAnchor="middle"
      fill="var(--color-gray-400)"
      fontSize="24"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      +
    </text>

    {/* Fourth keyboard key - Enter */}
    <rect
      x="300"
      y="120"
      width="60"
      height="60"
      rx="8"
      fill="white"
      stroke="var(--color-gray-300)"
      strokeWidth="2"
    />
    <text
      x="330"
      y="160"
      textAnchor="middle"
      fill="var(--color-gray-600)"
      fontSize="24"
      fontFamily="system-ui, -apple-system, sans-serif"
    >
      ⏎
    </text>
  </svg>
);

export default KbdThumb;


