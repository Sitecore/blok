const DashboardWidgetThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Card */}
    <rect
      x="24"
      y="24"
      width="352"
      height="172"
      rx="12"
      fill="white"
      stroke="#e5e7eb"
      strokeWidth="1"
    />
    {/* Title */}
    <rect x="44" y="44" width="120" height="14" rx="4" fill="#1f2937" />
    {/* Go to link */}
    <rect x="300" y="44" width="56" height="12" rx="4" fill="#3b82f6" />
    {/* Description */}
    <rect x="44" y="66" width="200" height="10" rx="4" fill="#9ca3af" />
    {/* Filter dropdown */}
    <rect
      x="280"
      y="84"
      width="76"
      height="24"
      rx="6"
      fill="#f3f4f6"
      stroke="#e5e7eb"
      strokeWidth="1"
    />
    {/* Content area */}
    <rect x="44" y="120" width="312" height="60" rx="8" fill="#f9fafb" />
  </svg>
);

export default DashboardWidgetThumb;
