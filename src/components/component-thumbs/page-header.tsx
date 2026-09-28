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
    {/* Media */}
    <rect x="24" y="28" width="56" height="56" rx="10" fill="#e5e7eb" />
    {/* Back */}
    <rect x="96" y="28" width="72" height="8" rx="3" fill="#9ca3af" />
    {/* Title */}
    <rect x="96" y="46" width="160" height="14" rx="4" fill="#1f2937" />
    {/* Status */}
    <rect x="264" y="48" width="52" height="12" rx="3" fill="#dbeafe" />
    {/* Description */}
    <rect x="96" y="70" width="180" height="8" rx="3" fill="#9ca3af" />
    <rect x="96" y="84" width="140" height="8" rx="3" fill="#9ca3af" />
    {/* Tags */}
    <rect x="96" y="104" width="40" height="14" rx="3" fill="#f3f4f6" />
    <rect x="142" y="104" width="48" height="14" rx="3" fill="#f3f4f6" />
    <rect x="196" y="104" width="36" height="14" rx="3" fill="#f3f4f6" />
    {/* Actions */}
    <rect x="280" y="28" width="48" height="22" rx="11" fill="#5548d9" />
    <rect x="334" y="32" width="42" height="14" rx="4" fill="#e5e7eb" />
    {/* People */}
    <circle cx="348" cy="72" r="10" fill="#c7d2fe" />
    <circle cx="362" cy="72" r="10" fill="#a5b4fc" />
    <circle cx="376" cy="72" r="10" fill="#818cf8" />
    {/* Tabs */}
    <rect x="24" y="148" width="56" height="10" rx="3" fill="#5548d9" />
    <rect x="90" y="148" width="40" height="10" rx="3" fill="#d1d5db" />
    <rect x="140" y="148" width="44" height="10" rx="3" fill="#d1d5db" />
    <line x1="24" y1="168" x2="376" y2="168" stroke="#e5e7eb" strokeWidth="1" />
    {/* Timeline */}
    <rect x="250" y="148" width="60" height="6" rx="3" fill="#e5e7eb" />
    <rect x="250" y="148" width="12" height="6" rx="3" fill="#5548d9" />
    <rect x="318" y="146" width="58" height="10" rx="3" fill="#9ca3af" />
  </svg>
);

export default PageHeaderThumb;
