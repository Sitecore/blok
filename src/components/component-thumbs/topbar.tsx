const TopbarThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect y="123" width="400" height="54" rx="8" fill="white" />
    <rect x="12" y="135" width="30" height="30" rx="15" fill="#9373FF" />
    <rect x="50" y="141" width="50" height="18" rx="9" fill="#939393" />
    <path
      d="M109.262 145L115 150.737L120.738 145L122.5 146.775L115 154.275L107.5 146.775L109.262 145Z"
      fill="#6F6F6F"
    />
    <rect x="138" y="141" width="76" height="18" rx="9" fill="#939393" />
    <rect x="224" y="141" width="50" height="18" rx="9" fill="#939393" />
    <path
      d="M283.262 145L289 150.737L294.738 145L296.5 146.775L289 154.275L281.5 146.775L283.262 145Z"
      fill="#6F6F6F"
    />
    <rect x="358" y="135" width="30" height="30" rx="15" fill="#DADADA" />
  </svg>
);

export default TopbarThumb;
