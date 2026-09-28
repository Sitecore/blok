const PageHeaderThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Header surface — full bleed, square corners, tabs flush to the bottom */}
    <rect y="34" width="400" height="152" fill="white" />

    {/* Media */}
    <rect x="24" y="58" width="76" height="56" rx="8" fill="#9373FF" />

    {/* Title + status */}
    <rect x="116" y="62" width="132" height="13" rx="6.5" fill="#1F2937" />
    <rect x="258" y="62" width="48" height="13" rx="6.5" fill="#DDD6FE" />

    {/* Description */}
    <rect x="116" y="86" width="168" height="8" rx="4" fill="#D1D5DB" />
    <rect x="116" y="100" width="118" height="8" rx="4" fill="#D1D5DB" />

    {/* Primary action */}
    <rect x="316" y="58" width="60" height="20" rx="10" fill="#6E3FFF" />

    {/* People */}
    <circle
      cx="340"
      cy="98"
      r="9"
      fill="#DADADA"
      stroke="white"
      strokeWidth="2"
    />
    <circle
      cx="356"
      cy="98"
      r="9"
      fill="#939393"
      stroke="white"
      strokeWidth="2"
    />
    <circle
      cx="372"
      cy="98"
      r="9"
      fill="#9373FF"
      stroke="white"
      strokeWidth="2"
    />

    {/* Tabs */}
    <rect x="24" y="158" width="40" height="8" rx="4" fill="#6E3FFF" />
    <rect x="76" y="158" width="32" height="8" rx="4" fill="#D1D5DB" />
    <rect x="120" y="158" width="32" height="8" rx="4" fill="#D1D5DB" />
    <rect x="24" y="182" width="40" height="4" fill="#6E3FFF" />

    {/* Timeline */}
    <rect x="300" y="159" width="76" height="6" rx="3" fill="#E5E7EB" />
    <rect x="300" y="159" width="44" height="6" rx="3" fill="#6E3FFF" />
  </svg>
);

export default PageHeaderThumb;
