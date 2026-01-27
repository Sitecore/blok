const TimelineThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* First indicator */}
    <circle
      cx="100"
      cy="70"
      r="16"
      stroke="var(--color-gray-400)"
      strokeWidth="3"
      fill="var(--color-background)"
    />
    {/* Connector line 1 */}
    <rect x="98" y="90" width="4" height="50" fill="var(--color-gray-300)" />
    {/* First content */}
    <rect
      x="140"
      y="55"
      width="140"
      height="12"
      rx="6"
      fill="var(--color-gray-500)"
    />
    <rect
      x="140"
      y="75"
      width="90"
      height="10"
      rx="5"
      fill="var(--color-gray-300)"
    />

    {/* Second indicator */}
    <circle
      cx="100"
      cy="150"
      r="16"
      stroke="var(--color-gray-400)"
      strokeWidth="3"
      fill="var(--color-background)"
    />
    {/* Connector line 2 */}
    <rect x="98" y="170" width="4" height="50" fill="var(--color-gray-300)" />
    {/* Second content */}
    <rect
      x="140"
      y="135"
      width="120"
      height="12"
      rx="6"
      fill="var(--color-gray-500)"
    />
    <rect
      x="140"
      y="155"
      width="70"
      height="10"
      rx="5"
      fill="var(--color-gray-300)"
    />

    {/* Third indicator */}
    <circle
      cx="100"
      cy="230"
      r="16"
      stroke="var(--color-gray-400)"
      strokeWidth="3"
      fill="var(--color-background)"
    />
    {/* Third content */}
    <rect
      x="140"
      y="215"
      width="160"
      height="12"
      rx="6"
      fill="var(--color-gray-500)"
    />
    <rect
      x="140"
      y="235"
      width="100"
      height="10"
      rx="5"
      fill="var(--color-gray-300)"
    />
  </svg>
);

export default TimelineThumb;
