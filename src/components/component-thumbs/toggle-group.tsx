const ToggleGroupThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
<rect x="25" y="117" width="160" height="65" rx="12" fill="white"/>
<rect x="47" y="140" width="118" height="20" rx="10" fill="#939393"/>
<rect x="210" y="117" width="160" height="65" rx="12" fill="#9373FF"/>
<rect x="232" y="140" width="118" height="20" rx="10" fill="white"/>
<mask id="path-5-inside-1_1202_4854" fill="white">
<rect y="50" width="400" height="200" rx="8"/>
</mask>
<rect y="50" width="400" height="200" rx="8" stroke="white" strokeWidth="24" strokeDasharray="24 24" mask="url(#path-5-inside-1_1202_4854)"/>
</svg>


);

export default ToggleGroupThumb;

