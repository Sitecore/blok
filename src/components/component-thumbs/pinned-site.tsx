const PinnedSiteThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <g clipPath="url(#clip0_1440_2451)">
      <rect x="73" y="98" width="121" height="104" rx="12" fill="white" />
      <rect x="73" y="97.5" width="121" height="77" fill="#D9D9D9" />
      <rect x="81" y="181.5" width="82" height="14" rx="7" fill="#939393" />
    </g>
    <g clipPath="url(#clip1_1440_2451)">
      <rect x="205" y="98" width="121" height="104" rx="12" fill="white" />
      <rect x="205" y="97.5" width="121" height="77" fill="#9373FF" />
      <rect x="213" y="181.5" width="82" height="14" rx="7" fill="#939393" />
    </g>
    <defs>
      <clipPath id="clip0_1440_2451">
        <rect x="73" y="98" width="121" height="104" rx="12" fill="white" />
      </clipPath>
      <clipPath id="clip1_1440_2451">
        <rect x="205" y="98" width="121" height="104" rx="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default PinnedSiteThumb;
