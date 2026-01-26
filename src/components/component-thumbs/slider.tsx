interface SliderThumbProps {
  className?: string;
}

const SliderThumb = ({ className }: SliderThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <line
      x1="57"
      y1="150"
      x2="343"
      y2="150"
      stroke="var(--color-gray-300)"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <line
      x1="57"
      y1="150"
      x2="273"
      y2="150"
      stroke="var(--color-primary-400)"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <g filter="url(#filter0_d_3_122)">
      <circle cx="277" cy="150" r="12" fill="white" />
    </g>
    <defs>
      <filter
        id="filter0_d_3_122"
        x="262"
        y="138"
        width="30"
        height="31"
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
        <feMorphology
          radius="1"
          operator="erode"
          in="SourceAlpha"
          result="effect1_dropShadow_3_122"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_3_122"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_3_122"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SliderThumb;
