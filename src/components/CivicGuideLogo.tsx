import React from 'react';

interface CivicGuideLogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  useImage?: boolean;
}

export const CivicGuideLogo: React.FC<CivicGuideLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  useImage = false
}) => {
  // Dimensions based on size
  const iconDimensions = {
    xs: 28,
    sm: 36,
    md: 44,
    lg: 64,
    xl: 96
  }[size];

  // If user requests the photo/raster logo directly
  if (useImage) {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src="/logo.jpg"
          alt="CivicGuide Logo"
          className="rounded-full object-cover shadow-xs border border-[#8ca38f]/30"
          style={{ width: iconDimensions, height: iconDimensions }}
          onError={(e) => {
            // Fallback if image fails to load
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {variant !== 'icon' && (
          <div className="flex flex-col">
            <div className="flex items-center tracking-tight leading-none">
              <span className="font-serif font-extrabold text-[#0f3460] dark:text-[#60a5fa] text-xl sm:text-2xl">
                Civic
              </span>
              <span className="font-serif font-extrabold text-[#168038] dark:text-[#4ade80] text-xl sm:text-2xl relative inline-flex items-center">
                Gu
                <span className="relative inline-flex flex-col items-center">
                  {/* Leaf on top of the 'i' */}
                  <svg
                    className="w-2.5 h-2.5 text-[#168038] dark:text-[#4ade80] absolute -top-2 left-0 animate-pulse"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM17.5 13C15.5 15 13 16.5 10 16.5C8 16.5 6.5 15.5 6.5 14C6.5 11 11 8.5 15 7.5C16.5 7.1 17.5 8 17.5 9.5C17.5 10.8 17.5 11.9 17.5 13Z" />
                  </svg>
                  ı
                </span>
                de
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium text-[#737067] dark:text-[#94a3b8] tracking-wide mt-0.5">
              Government Scheme & Service Finder
            </span>
          </div>
        )}
      </div>
    );
  }

  // Pure SVG Emblem Component matching the official emblem design
  const renderEmblem = () => (
    <svg
      width={iconDimensions}
      height={iconDimensions}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-xs"
    >
      {/* Definitions for gradients and shadows */}
      <defs>
        <linearGradient id="blueHandGrad" x1="20" y1="120" x2="150" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#124e8f" />
          <stop offset="100%" stopColor="#0b305e" />
        </linearGradient>

        <linearGradient id="glassRimGrad" x1="70" y1="30" x2="160" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e5ba3" />
          <stop offset="100%" stopColor="#09284f" />
        </linearGradient>

        <linearGradient id="leafGrad" x1="40" y1="10" x2="160" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>

        <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Outer circular background glow */}
      <circle cx="100" cy="100" r="96" fill="#fcfbf7" className="dark:fill-[#151f2b]" />

      {/* Green decorative swooshes / foliage on left and top */}
      <path
        d="M40 70 C30 110, 50 160, 100 180 C140 180, 175 145, 180 105 C185 70, 160 35, 125 22 C110 16, 95 18, 90 24 C85 30, 95 38, 110 42 C140 50, 160 75, 155 105 C150 135, 120 160, 90 160 C65 160, 50 130, 55 100 C58 85, 52 70, 40 70 Z"
        fill="url(#leafGrad)"
        opacity="0.9"
      />

      {/* Blue Caring Hand Support at bottom */}
      <path
        d="M 35 120 C 35 150, 65 175, 115 175 C 145 175, 165 160, 172 145 C 160 148, 140 152, 118 152 C 80 152, 60 135, 52 118 C 45 102, 35 105, 35 120 Z"
        fill="url(#blueHandGrad)"
      />

      {/* Citizen silhouettes on left: adult and child */}
      {/* Adult in blue */}
      <circle cx="58" cy="88" r="7" fill="#124e8f" />
      <path d="M 50 115 C 50 102, 66 102, 66 115 Z" fill="#124e8f" />

      {/* Child/Youth in vibrant green with joyfully raised arms */}
      <circle cx="74" cy="94" r="6" fill="#16a34a" />
      <path d="M 67 118 C 67 107, 81 107, 81 118 Z" fill="#16a34a" />
      {/* Joyful arms */}
      <path d="M 66 106 Q 60 98, 56 100" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 82 106 Q 88 98, 92 100" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Magnifying Glass Lens & Frame */}
      <g filter="url(#subtleShadow)">
        {/* Glass Outer Rim */}
        <circle cx="108" cy="85" r="48" fill="url(#glassRimGrad)" />
        {/* Glass Inner Lens */}
        <circle cx="108" cy="85" r="40" fill="#ffffff" />

        {/* Magnifying Glass Handle */}
        <path
          d="M 142 119 L 168 145 C 172 149, 176 145, 172 141 L 146 115 Z"
          fill="#09284f"
          stroke="#09284f"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Inside the Magnifying Glass Lens: Document with Indian Emblem */}
      {/* Document Sheet */}
      <rect x="88" y="58" width="40" height="54" rx="4" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Ashoka Pillar / Emblem silhouette representation at top of document */}
      <path
        d="M 103 64 L 113 64 M 104 64 L 104 71 L 112 71 L 112 64 M 102 71 L 114 71 M 106 71 L 106 74 L 110 74 L 110 71 M 104 74 L 112 74"
        stroke="#0c3464"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Ashoka Chakra tiny circle */}
      <circle cx="108" cy="72.5" r="1.5" fill="#0c3464" />

      {/* Checkboxes with green tick marks on document */}
      {/* Row 1 */}
      <rect x="92" y="79" width="5.5" height="5.5" rx="1" fill="#16a34a" />
      <path d="M 93 81.5 L 94.5 83 L 96.5 80" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="101" y1="82" x2="123" y2="82" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />

      {/* Row 2 */}
      <rect x="92" y="87" width="5.5" height="5.5" rx="1" fill="#16a34a" />
      <path d="M 93 89.5 L 94.5 91 L 96.5 88" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="101" y1="90" x2="120" y2="90" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />

      {/* Row 3 */}
      <rect x="92" y="95" width="5.5" height="5.5" rx="1" fill="#16a34a" />
      <path d="M 93 97.5 L 94.5 99 L 96.5 96" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="101" y1="98" x2="118" y2="98" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />

      {/* 5 Distinct Category Pills fanning out from the right (as depicted in official logo) */}
      {/* 1. Education (Blue) */}
      <g transform="translate(132, 42)">
        <rect width="60" height="14" rx="7" fill="#1d70b8" />
        <path d="M 6 7 L 10 4.5 L 14 7 L 10 9.5 Z M 10 9.5 L 10 11.5" stroke="#ffffff" strokeWidth="1" fill="#ffffff" />
        <text x="17" y="10.5" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Education</text>
      </g>

      {/* 2. Healthcare (Green) */}
      <g transform="translate(142, 60)">
        <rect width="55" height="14" rx="7" fill="#16a34a" />
        <path d="M 8 5 V 10 M 5.5 7.5 H 10.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
        <text x="15" y="10.5" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Healthcare</text>
      </g>

      {/* 3. Financial Support (Orange/Saffron) */}
      <g transform="translate(146, 78)">
        <rect width="52" height="14" rx="7" fill="#f27212" />
        <text x="5" y="10.5" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="sans-serif">₹</text>
        <text x="14" y="10.5" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">Financial</text>
      </g>

      {/* 4. Housing (Purple) */}
      <g transform="translate(140, 96)">
        <rect width="52" height="14" rx="7" fill="#80489c" />
        <path d="M 6 10 V 7 L 9.5 4.5 L 13 7 V 10 Z" stroke="#ffffff" strokeWidth="1" fill="#ffffff" />
        <text x="16" y="10.5" fill="#ffffff" fontSize="7" fontWeight="bold" fontFamily="sans-serif">Housing</text>
      </g>

      {/* 5. And More (Amber) */}
      <g transform="translate(130, 114)">
        <rect width="52" height="14" rx="7" fill="#e59b12" />
        <circle cx="8" cy="6" r="2" fill="#ffffff" />
        <circle cx="12" cy="6" r="2" fill="#ffffff" />
        <text x="16" y="10.5" fill="#ffffff" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">And More</text>
      </g>
    </svg>
  );

  // If icon-only
  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderEmblem()}
      </div>
    );
  }

  // Horizontal variant (default for navbar and headers)
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
        {renderEmblem()}
        <div className="flex flex-col text-left">
          <div className="flex items-center tracking-tight leading-none">
            <span className="font-serif font-extrabold text-[#0f3460] dark:text-[#60a5fa] text-xl sm:text-2xl">
              Civic
            </span>
            <span className="font-serif font-extrabold text-[#168038] dark:text-[#4ade80] text-xl sm:text-2xl relative inline-flex items-center">
              Gu
              <span className="relative inline-flex flex-col items-center">
                {/* Decorative green leaf on 'i' */}
                <svg
                  className="w-2.5 h-2.5 text-[#168038] dark:text-[#4ade80] absolute -top-2 left-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM17.5 13C15.5 15 13 16.5 10 16.5C8 16.5 6.5 15.5 6.5 14C6.5 11 11 8.5 15 7.5C16.5 7.1 17.5 8 17.5 9.5C17.5 10.8 17.5 11.9 17.5 13Z" />
                </svg>
                ı
              </span>
              de
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-[#737067] dark:text-[#94a3b8] tracking-wide mt-0.5 whitespace-nowrap">
            Government Scheme & Service Finder
          </span>
        </div>
      </div>
    );
  }

  // Full / Vertical display (great for Welcome hero or About modal)
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {renderEmblem()}
      <div className="mt-3 flex flex-col items-center">
        <div className="flex items-center tracking-tight leading-none">
          <span className="font-serif font-extrabold text-[#0f3460] dark:text-[#60a5fa] text-2xl sm:text-3xl">
            Civic
          </span>
          <span className="font-serif font-extrabold text-[#168038] dark:text-[#4ade80] text-2xl sm:text-3xl relative inline-flex items-center">
            Gu
            <span className="relative inline-flex flex-col items-center">
              <svg
                className="w-3 h-3 text-[#168038] dark:text-[#4ade80] absolute -top-2.5 left-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM17.5 13C15.5 15 13 16.5 10 16.5C8 16.5 6.5 15.5 6.5 14C6.5 11 11 8.5 15 7.5C16.5 7.1 17.5 8 17.5 9.5C17.5 10.8 17.5 11.9 17.5 13Z" />
              </svg>
              ı
            </span>
            de
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1.5 w-full max-w-xs">
          <div className="h-[1px] bg-[#cbd5e1] dark:bg-[#334155] flex-1" />
          <span className="text-[11px] font-semibold text-[#1d2d44] dark:text-[#cbd5e1] uppercase tracking-wider whitespace-nowrap">
            Government Scheme & Service Finder
          </span>
          <div className="h-[1px] bg-[#cbd5e1] dark:bg-[#334155] flex-1" />
        </div>

        {/* Tagline • discover • Match • Apply • */}
        <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold">
          <span className="text-[#1d70b8] dark:text-[#38bdf8]">• discover</span>
          <span className="text-[#168038] dark:text-[#4ade80]">• Match</span>
          <span className="text-[#f27212] dark:text-[#fb923c]">• Apply •</span>
        </div>
      </div>
    </div>
  );
};
