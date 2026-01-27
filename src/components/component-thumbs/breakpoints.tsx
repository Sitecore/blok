interface BreakpointsThumbProps {
  className?: string;
}

const BreakpointsThumb = ({ className }: BreakpointsThumbProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 170 94"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <g clipPath="url(#clip0_1204_1985)">
      <path
        d="M113.083 59.2916H103.25V42.0833H113.083M115.542 37.1666H100.792C100.14 37.1666 99.5144 37.4256 99.0534 37.8866C98.5923 38.3476 98.3333 38.9729 98.3333 39.6249V64.2083C98.3333 64.8602 98.5923 65.4855 99.0534 65.9466C99.5144 66.4076 100.14 66.6666 100.792 66.6666H115.542C116.194 66.6666 116.819 66.4076 117.28 65.9466C117.741 65.4855 118 64.8602 118 64.2083V39.6249C118 38.9729 117.741 38.3476 117.28 37.8866C116.819 37.4256 116.194 37.1666 115.542 37.1666ZM68.8333 32.2499H113.083V27.3333H68.8333C67.5294 27.3333 66.2788 27.8513 65.3567 28.7733C64.4347 29.6954 63.9167 30.9459 63.9167 32.2499V59.2916H59V66.6666H93.4167V59.2916H68.8333V32.2499Z"
        fill="#6E3FFF"
      />
    </g>
    <defs>
      <clipPath id="clip0_1204_1985">
        <rect width="170" height="94" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default BreakpointsThumb;
