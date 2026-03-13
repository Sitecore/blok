const SidebarRHSThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Main content area (left side) */}
    <path
      d="M50 38C50 33.5817 53.5817 30 58 30H242V270H58C53.5817 270 50 266.418 50 262V38Z"
      fill="white"
    />
    <rect x="60" y="59" width="87" height="22" rx="11" fill="#C6C6C6" />
    <rect x="60" y="92" width="163" height="21" rx="10.5" fill="#E5E5E5" />
    <rect x="60" y="124" width="152" height="21" rx="10.5" fill="#E5E5E5" />
    <rect x="60" y="156" width="152" height="21" rx="10.5" fill="#E5E5E5" />

    {/* Right sidebar */}
    <path
      d="M242 30H342C346.418 30 350 33.5817 350 38V262C350 266.418 346.418 270 342 270H242V30Z"
      fill="#D9D4FF"
    />
    <rect x="252" y="59" width="70" height="22" rx="11" fill="#B8A9FF" />
    <rect x="252" y="92" width="80" height="21" rx="10.5" fill="#E5E5E5" />
    <rect x="252" y="124" width="80" height="21" rx="10.5" fill="#E5E5E5" />
    <rect x="252" y="156" width="80" height="21" rx="10.5" fill="#E5E5E5" />

    {/* Resize handle indicator */}
    <rect x="240" y="120" width="2" height="60" rx="1" fill="#9373FF" />

    {/* Collapse button indicator */}
    <circle
      cx="230"
      cy="150"
      r="8"
      fill="white"
      stroke="#9373FF"
      strokeWidth="1.5"
    />
    <path
      d="M226 146L230 150L226 154"
      stroke="#9373FF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export default SidebarRHSThumb;
