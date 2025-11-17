const SheetThumb = ({ className }: { className?: string }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 300"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
<rect x="60" y="70" width="111" height="160" rx="6" fill="#D9D4FF"/>
<g filter="url(#filter0_dd_1202_4798)">
<path d="M151 30H333C337.418 30 341 33.5817 341 38V262C341 266.418 337.418 270 333 270H151V30Z" fill="white"/>
<ellipse cx="183.5" cy="69.75" rx="22.5" ry="22" fill="#C6C6C6"/>
<rect x="161" y="232.25" width="58" height="20" rx="10" fill="#9373FF"/>
<rect x="161" y="105" width="87" height="22" rx="11" fill="#C6C6C6"/>
<rect x="161" y="138" width="163" height="21" rx="10.5" fill="#C6C6C6"/>
<rect x="161" y="170" width="152" height="21" rx="10.5" fill="#C6C6C6"/>
<path d="M327 45.41L325.59 44L320 49.59L314.41 44L313 45.41L318.59 51L313 56.59L314.41 58L320 52.41L325.59 58L327 56.59L321.41 51L327 45.41Z" fill="#6F6F6F"/>
</g>
<defs>
<filter id="filter0_dd_1202_4798" x="146" y="29" width="200" height="250" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_1202_4798"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1202_4798"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect2_dropShadow_1202_4798"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="3"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_1202_4798" result="effect2_dropShadow_1202_4798"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_1202_4798" result="shape"/>
</filter>
</defs>
</svg>


);

export default SheetThumb;

