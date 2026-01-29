const InputGroupThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Input container */}
    <rect x="60" y="126" width="280" height="49" rx="8" fill="white" />

    {/* Search icon on left */}
    <circle
      cx="94"
      cy="150"
      r="8"
      stroke="var(--color-gray-500)"
      strokeWidth="2.5"
      fill="none"
    />
    <path
      d="M100 156L106 162"
      stroke="var(--color-gray-500)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />

    {/* Divider line */}
    <path
      d="M120 135L120 166"
      stroke="var(--color-gray-200)"
      strokeWidth="1.5"
    />

    {/* Placeholder text */}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M134 150.5C134 148.015 136.015 146 138.5 146H220.5C222.985 146 225 148.015 225 150.5C225 152.985 222.985 155 220.5 155H138.5C136.015 155 134 152.985 134 150.5Z"
      fill="var(--color-gray-400)"
    />

    {/* Kbd shortcut on right */}
    <rect
      x="285"
      y="140"
      width="40"
      height="20"
      rx="4"
      fill="var(--color-gray-100)"
      stroke="var(--color-gray-300)"
      strokeWidth="1"
    />
    <text
      x="305"
      y="154"
      textAnchor="middle"
      fontSize="10"
      fontFamily="monospace"
      fill="var(--color-gray-500)"
    >
      ⌘K
    </text>

    {/* Focus ring */}
    <rect
      x="60"
      y="126"
      width="280"
      height="49"
      rx="8"
      stroke="var(--color-primary-400)"
      strokeWidth="4"
    />
  </svg>
);

export default InputGroupThumb;
