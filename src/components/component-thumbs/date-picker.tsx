const DatePickerThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <rect x="24" y="120" width="353" height="61" rx="10" fill="white" />
    <rect
      x="24"
      y="120"
      width="353"
      height="61"
      rx="10"
      stroke="#9373FF"
      strokeWidth="4"
    />
    <path
      d="M68.25 136.5H66.5V133H63V136.5H49V133H45.5V136.5H43.75C41.8075 136.5 40.25 138.075 40.25 140V164.5C40.25 165.428 40.6187 166.318 41.2751 166.975C41.9315 167.631 42.8217 168 43.75 168H68.25C69.1783 168 70.0685 167.631 70.7249 166.975C71.3813 166.318 71.75 165.428 71.75 164.5V140C71.75 139.072 71.3813 138.182 70.7249 137.525C70.0685 136.869 69.1783 136.5 68.25 136.5ZM68.25 164.5H43.75V147H68.25V164.5ZM68.25 143.5H43.75V140H68.25V143.5ZM56 152.25H64.75V161H56V152.25Z"
      fill="#939393"
    />
    <rect x="102" y="141" width="136" height="20" rx="10" fill="#939393" />
    <rect x="251" y="141" width="105" height="20" rx="10" fill="#939393" />
  </svg>
);

export default DatePickerThumb;
