const ScrollAreaThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <mask id="path-1-inside-1_1202_4780" fill="white">
      <rect y="50" width="367" height="200" rx="8" />
    </mask>
    <rect
      y="50"
      width="367"
      height="200"
      rx="8"
      stroke="#D9D4FF"
      strokeWidth="24"
      strokeDasharray="24 24"
      mask="url(#path-1-inside-1_1202_4780)"
    />
    <rect x="381" y="50" width="19" height="140" rx="9.5" fill="#939393" />
  </svg>
);

export default ScrollAreaThumb;
