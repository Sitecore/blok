const BadgeThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M53 149.5C53 144.253 57.2477 140 62.4875 140H216.512C221.752 140 226 144.253 226 149.5C226 154.747 221.752 159 216.512 159H62.4875C57.2477 159 53 154.747 53 149.5Z"
      fill="var(--color-gray-400)"
    />
    <rect
      x="240"
      y="123"
      width="107"
      height="53"
      rx="6"
      fill="var(--color-primary-100)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M251 149.5C251 144.253 255.248 140 260.487 140H326.512C331.752 140 336 144.253 336 149.5C336 154.747 331.752 159 326.512 159H260.487C255.248 159 251 154.747 251 149.5Z"
      fill="var(--color-primary-400)"
    />
  </svg>
);

export default BadgeThumb;
