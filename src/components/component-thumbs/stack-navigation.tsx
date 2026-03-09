const StackNavigationThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    {/* Background */}
    <rect width="72" height="300" fill="white" />

    {/* Navigation items */}
    {/* Active item */}
    <rect x="6" y="6" width="60" height="56" rx="6" fill="#B8A9FF" />
    <circle cx="36" cy="24" r="8" fill="#6F6F6F" />
    <rect x="20" y="38" width="32" height="6" rx="3" fill="#6F6F6F" />

    {/* Inactive items */}
    <rect x="6" y="68" width="60" height="56" rx="6" fill="transparent" />
    <circle cx="36" cy="86" r="8" fill="#C6C6C6" />
    <rect x="20" y="100" width="32" height="6" rx="3" fill="#C6C6C6" />

    <rect x="6" y="130" width="60" height="56" rx="6" fill="transparent" />
    <circle cx="36" cy="148" r="8" fill="#C6C6C6" />
    <rect x="20" y="162" width="32" height="6" rx="3" fill="#C6C6C6" />

    <rect x="6" y="192" width="60" height="56" rx="6" fill="transparent" />
    <circle cx="36" cy="210" r="8" fill="#C6C6C6" />
    <rect x="20" y="224" width="32" height="6" rx="3" fill="#C6C6C6" />

    {/* Divider */}
    <rect x="12" y="254" width="48" height="1" fill="#E0E0E0" />

    {/* Last item */}
    <rect x="6" y="260" width="60" height="56" rx="6" fill="transparent" />
    <circle cx="36" cy="278" r="8" fill="#C6C6C6" />
    <rect x="20" y="292" width="32" height="6" rx="3" fill="#C6C6C6" />

    {/* Content area */}
    <rect x="90" y="0" width="310" height="300" fill="#F5F5F5" />
    <rect x="110" y="30" width="270" height="20" rx="10" fill="#E0E0E0" />
    <rect x="110" y="70" width="200" height="12" rx="6" fill="#E0E0E0" />
    <rect x="110" y="100" width="240" height="12" rx="6" fill="#E0E0E0" />
    <rect x="110" y="130" width="180" height="12" rx="6" fill="#E0E0E0" />
  </svg>
);

export default StackNavigationThumb;
