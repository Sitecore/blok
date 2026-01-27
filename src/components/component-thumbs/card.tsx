const CardThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <g filter="url(#filter0_dd_303_2)">
      <rect x="89" y="56" width="222" height="188" rx="8" fill="white" />
      <rect
        x="103"
        y="74"
        width="195"
        height="66"
        fill="var(--color-gray-300)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103 164.5C103 162.015 105.015 160 107.5 160H178.5C180.985 160 183 162.015 183 164.5C183 166.985 180.985 169 178.5 169H107.5C105.015 169 103 166.985 103 164.5Z"
        fill="var(--color-gray-500)"
      />
      <rect
        x="106"
        y="183"
        width="136"
        height="9"
        rx="4.5"
        fill="var(--color-gray-500)"
      />
      <rect
        x="106"
        y="206"
        width="192"
        height="9"
        rx="4.5"
        fill="var(--color-gray-500)"
      />
    </g>
    <defs>
      <filter
        id="filter0_dd_303_2"
        x="86"
        y="54"
        width="228"
        height="194"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_303_2"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1.5" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_303_2"
          result="effect2_dropShadow_303_2"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_303_2"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default CardThumb;
