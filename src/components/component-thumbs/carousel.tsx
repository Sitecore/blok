const CarouselThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect x="14" y="70" width="111" height="160" rx="6" fill="#B8A9FF" />
    <rect x="285" y="70" width="100" height="160" rx="6" fill="#B8A9FF" />
    <g filter="url(#filter0_dd_1202_4247)">
      <rect x="105" y="30" width="190" height="240" rx="8" fill="#ffffff" />
    </g>
    <circle cx="149" cy="74" r="29" fill="#C6C6C6" />
    <rect x="120" y="230" width="103" height="20" rx="10" fill="#C6C6C6" />
    <rect x="119" y="118" width="87" height="22" rx="11" fill="#C6C6C6" />
    <rect x="119" y="151" width="163" height="21" rx="10.5" fill="#C6C6C6" />
    <rect x="119" y="183" width="152" height="21" rx="10.5" fill="#C6C6C6" />
    <defs>
      <filter
        id="filter0_dd_1202_4247"
        x="100"
        y="29"
        width="200"
        height="250"
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
          result="effect1_dropShadow_1202_4247"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="2" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1202_4247"
        />
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
          result="effect2_dropShadow_1202_4247"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="3" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
        />
        <feBlend
          mode="normal"
          in2="effect1_dropShadow_1202_4247"
          result="effect2_dropShadow_1202_4247"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect2_dropShadow_1202_4247"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default CarouselThumb;
