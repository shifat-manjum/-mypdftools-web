import React from 'react';

interface LogoProps {
  className?: string;
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showBadge = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none flex-shrink-0 ${className}`}>
      {/* Modern 3D Isometric Layered Document Icon */}
      <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white flex-shrink-0 ring-1 ring-white/15 overflow-hidden">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute inset-0 bg-radial from-emerald-500/30 to-transparent pointer-events-none" />
        
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 relative z-10"
        >
          <defs>
            <linearGradient id="logoFrontGrad" x1="14" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#34d399" />
              <stop offset="50%" stop-color="#10b981" />
              <stop offset="100%" stop-color="#047857" />
            </linearGradient>
            <linearGradient id="logoBackGrad" x1="10" y1="14" x2="30" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#059669" />
              <stop offset="100%" stop-color="#064e3b" />
            </linearGradient>
            <linearGradient id="logoFold" x1="28" y1="8" x2="38" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#a7f3d0" />
              <stop offset="100%" stop-color="#34d399" />
            </linearGradient>
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.45" />
            </filter>
          </defs>

          {/* 3D Back Sheet (Depth Layer) */}
          <path
            d="M10 18C10 16 11.5 14.5 13.5 14.5H29L37 22.5V36.5C37 38.5 35.5 40 33.5 40H13.5C11.5 40 10 38.5 10 36.5V18Z"
            fill="url(#logoBackGrad)"
            opacity="0.75"
          />

          {/* 3D Front Elevated Glowing Sheet */}
          <g filter="url(#logoShadow)">
            <path
              d="M15 10C15 8 16.5 6.5 18.5 6.5H31L40 15.5V33.5C40 35.5 38.5 37 36.5 37H18.5C16.5 37 15 35.5 15 33.5V10Z"
              fill="url(#logoFrontGrad)"
            />
            {/* Inner Top Edge Specular Lighting */}
            <path
              d="M16 10C16 8.5 17 7.5 18.5 7.5H30.5L39 16V33.5C39 35 38 36 36.5 36H18.5C17 36 16 35 16 33.5V10Z"
              stroke="#FFFFFF"
              strokeOpacity="0.4"
              strokeWidth="0.8"
            />

            {/* 3D Folded Flap */}
            <path
              d="M31 6.5V13C31 14.2 31.8 15 33 15H39.5L31 6.5Z"
              fill="url(#logoFold)"
            />
            <path
              d="M31 6.5L39.5 15"
              stroke="#FFFFFF"
              strokeOpacity="0.7"
              strokeWidth="0.8"
            />

            {/* Tactile 3D Embossed Document Lines */}
            <rect x="20" y="20" width="13" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.9" />
            <rect x="20" y="24.5" width="10" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.65" />
            <rect x="20" y="29" width="15" height="2" rx="1" fill="#FFFFFF" fillOpacity="0.4" />
          </g>
        </svg>

        {/* Pulsing Active Status Micro-dot */}
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_8px_#34d399]" />
      </div>

      <div className="flex flex-col text-left justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="text-xl font-black tracking-tight text-slate-900">
            My<span className="text-emerald-600">Pdf</span>Tools
          </span>
          {showBadge && (
            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
              PRO
            </span>
          )}
        </div>
        <span className="text-[10px] font-bold text-slate-400 mt-1 tracking-wider uppercase leading-none">
          100% Private • Browser-Native
        </span>
      </div>
    </div>
  );
};
