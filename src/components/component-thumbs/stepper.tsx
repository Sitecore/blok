const StepperThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Background container */}
    <rect
      x="20"
      y="120"
      width="360"
      height="60"
      rx="8"
      fill="var(--color-gray-50)"
      className="dark:fill-gray-900"
    />

    {/* Step 1 - Completed (with checkmark) */}
    <circle cx="60" cy="150" r="16" fill="var(--color-primary-500)" />
    <path
      d="M54 150L58 154L66 146"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Connector line 1 - Completed */}
    <rect
      x="76"
      y="148"
      width="48"
      height="4"
      rx="2"
      fill="var(--color-primary-500)"
    />

    {/* Step 2 - Active (border with number) */}
    <circle
      cx="148"
      cy="150"
      r="16"
      fill="var(--color-background)"
      stroke="var(--color-primary-500)"
      strokeWidth="2"
    />
    <text
      x="148"
      y="156"
      textAnchor="middle"
      fontSize="12"
      fontWeight="500"
      fill="var(--color-primary-500)"
    >
      2
    </text>

    {/* Connector line 2 - Pending */}
    <rect
      x="164"
      y="148"
      width="48"
      height="2"
      rx="1"
      fill="var(--color-gray-300)"
    />

    {/* Step 3 - Pending (border with number) */}
    <circle
      cx="236"
      cy="150"
      r="16"
      fill="var(--color-background)"
      stroke="var(--color-gray-300)"
      strokeWidth="2"
    />
    <text
      x="236"
      y="156"
      textAnchor="middle"
      fontSize="12"
      fontWeight="500"
      fill="var(--color-gray-500)"
    >
      3
    </text>

    {/* Connector line 3 - Pending */}
    <rect
      x="252"
      y="148"
      width="48"
      height="2"
      rx="1"
      fill="var(--color-gray-300)"
    />

    {/* Step 4 - Pending (border with number) */}
    <circle
      cx="324"
      cy="150"
      r="16"
      fill="var(--color-background)"
      stroke="var(--color-gray-300)"
      strokeWidth="2"
    />
    <text
      x="324"
      y="156"
      textAnchor="middle"
      fontSize="12"
      fontWeight="500"
      fill="var(--color-gray-500)"
    >
      4
    </text>
  </svg>
);

export default StepperThumb;
