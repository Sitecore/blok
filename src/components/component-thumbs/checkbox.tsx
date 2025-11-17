const CheckboxThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect
      x="53"
      y="82"
      width="35"
      height="35"
      rx="8"
      fill="var(--color-primary-400)"
    />
    <path d="M80 100H62" stroke="white" strokeWidth="4" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M104 99.5C104 95.0817 108.287 91.5 113.576 91.5H337.424C342.713 91.5 347 95.0817 347 99.5C347 103.918 342.713 107.5 337.424 107.5H113.576C108.287 107.5 104 103.918 104 99.5Z"
      fill="var(--color-primary-400)"
    />
    <rect
      x="95"
      y="135"
      width="31"
      height="31"
      rx="6"
      stroke="var(--color-gray-400)"
      strokeWidth="4"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M144 150.5C144 146.082 147.582 142.5 152 142.5H339C343.418 142.5 347 146.082 347 150.5C347 154.918 343.418 158.5 339 158.5H152C147.582 158.5 144 154.918 144 150.5Z"
      fill="var(--color-gray-400)"
    />
    <rect
      x="93"
      y="184"
      width="35"
      height="35"
      rx="8"
      fill="var(--color-primary-400)"
    />
    <path
      d="M107.625 205.236L120.082 193L122 194.882L107.625 209L99 200.529L100.916 198.647L107.625 205.236Z"
      fill="white"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M144 201.5C144 197.082 147.582 193.5 152 193.5H339C343.418 193.5 347 197.082 347 201.5C347 205.918 343.418 209.5 339 209.5H152C147.582 209.5 144 205.918 144 201.5Z"
      fill="var(--color-primary-400)"
    />
  </svg>
);

export default CheckboxThumb;




