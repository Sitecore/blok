const ActionBarThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 80 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect y="200" width="410" height="60" rx="8" fill="white" />
    <rect x="12" y="212" width="24" height="24" rx="12" fill="#6F6F6F" />
    <rect x="44" y="218" width="60" height="12" rx="6" fill="#939393" />
    <rect x="280" y="212" width="24" height="24" rx="12" fill="#9373FF" />
    <rect x="312" y="212" width="24" height="24" rx="12" fill="#9373FF" />
    <rect x="344" y="212" width="24" height="24" rx="12" fill="#9373FF" />
    <rect x="376" y="212" width="24" height="24" rx="12" fill="#DADADA" />
  </svg>
);

export default ActionBarThumb;
