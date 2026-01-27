const CollapsibleThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect y="32" width="400" height="50" rx="12" fill="#ffffff" />
    <rect x="16" y="47" width="149" height="20" rx="10" fill="#C6C6C6" />
    <path
      d="M368.283 67.7975L362.735 62.25L360.268 64.7175L368.283 72.75L376.315 64.7175L373.83 62.25L368.283 67.7975ZM368.283 46.2025L373.83 51.75L376.298 49.2825L368.283 41.25L360.25 49.2825L362.735 51.75L368.283 46.2025Z"
      fill="#939393"
    />
    <rect y="94" width="400" height="50" rx="12" fill="#C6C6C6" />
    <rect y="156" width="400" height="50" rx="12" fill="#C6C6C6" />
    <rect y="218" width="400" height="50" rx="12" fill="#C6C6C6" />
  </svg>
);

export default CollapsibleThumb;
