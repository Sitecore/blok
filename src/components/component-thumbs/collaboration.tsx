const CollaborationThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Avatar stack with overlapping avatars and add button */}
    <g transform="translate(150, 130)">
      {/* User avatar 1 */}
      <circle cx="0" cy="0" r="20" fill="#9373FF" />
      <text
        x="0"
        y="5"
        fill="white"
        fontSize="12"
        fontWeight="600"
        textAnchor="middle"
      >
        AH
      </text>

      {/* User avatar 2 */}
      <circle
        cx="28"
        cy="0"
        r="20"
        fill="#6987F9"
        stroke="white"
        strokeWidth="3"
      />
      <text
        x="28"
        y="5"
        fill="white"
        fontSize="12"
        fontWeight="600"
        textAnchor="middle"
      >
        CH
      </text>

      {/* User avatar 3 */}
      <circle
        cx="56"
        cy="0"
        r="20"
        fill="#44CBAC"
        stroke="white"
        strokeWidth="3"
      />
      <text
        x="56"
        y="5"
        fill="white"
        fontSize="12"
        fontWeight="600"
        textAnchor="middle"
      >
        FG
      </text>

      {/* Add user button */}
      <circle
        cx="84"
        cy="0"
        r="18"
        fill="#F0EBFF"
        stroke="white"
        strokeWidth="3"
      />
      <path
        d="M78 0H90M84 -6V6"
        stroke="#9373FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </g>

    {/* Subtle card hint below (showing dropdown preview) */}
    <g transform="translate(100, 170)">
      <rect
        x="0"
        y="0"
        width="200"
        height="100"
        rx="8"
        fill="white"
        stroke="#E5E5E5"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Header hint */}
      <text
        x="16"
        y="28"
        fill="#333"
        fontSize="11"
        fontWeight="600"
        opacity="0.7"
      >
        Users
      </text>
      <text x="52" y="28" fill="#999" fontSize="10" opacity="0.7">
        3
      </text>

      {/* User list hint */}
      <circle cx="24" cy="50" r="8" fill="#9373FF" opacity="0.5" />
      <rect
        x="40"
        y="46"
        width="60"
        height="8"
        rx="3"
        fill="#E5E5E5"
        opacity="0.5"
      />

      <circle cx="24" cy="72" r="8" fill="#6987F9" opacity="0.5" />
      <rect
        x="40"
        y="68"
        width="50"
        height="8"
        rx="3"
        fill="#E5E5E5"
        opacity="0.5"
      />
    </g>
  </svg>
);

export default CollaborationThumb;
