const ChartThumb = ({ className }: { className?: string }) => (
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
      d="M83.5 174.218C57.6144 145.562 30.1667 161.885 19 174.218V272.5H378.5V74C372 65.2821 376.9 72.3179 364.5 54.7179C352.1 37.1179 341 47.3845 337 54.7179C332.667 63.5512 321.8 85.5179 313 102.718C304.2 119.918 299 123.5 287 124.718C282.833 124.885 260.5 127 253 129.218C227.59 136.732 221 187.218 190.5 216.218C166.1 239.418 137 225.885 125.5 216.218C121.833 214.551 109.5 203 83.5 174.218Z"
      fill="url(#paint0_linear_1202_4314)"
    />
    <path
      d="M19 174.218C30.1667 161.885 57.6144 145.562 83.5 174.218C109.5 203 121.833 214.551 125.5 216.218C137 225.885 166.1 239.418 190.5 216.218C221 187.218 227.59 136.732 253 129.218C260.5 127 282.833 124.885 287 124.718C299 123.5 304.2 119.918 313 102.718C321.8 85.5179 332.667 63.5512 337 54.7179C341 47.3845 352.1 37.1179 364.5 54.7179C376.9 72.3179 372 65.2821 378.5 74"
      stroke="#6E3FFF"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_1202_4314"
        x1="198.75"
        y1="45"
        x2="198.75"
        y2="272.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6E3FFF" />
        <stop offset="1" stopColor="#6E3FFF" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

export default ChartThumb;
