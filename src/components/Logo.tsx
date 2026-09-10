import React from 'react';

interface LogoProps {
  className?: string;
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showBadge = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none flex-shrink-0 ${className}`}>
      {/* Modern Shield + Document + Conversion SVG Icon */}
      <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-600 flex items-center justify-center shadow-md shadow-emerald-500/25 text-white flex-shrink-0 ring-1 ring-white/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          {/* Folded Document Base */}
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          {/* Lightning / conversion mark */}
          <path d="M10 12l4 4m0-4l-4 4" strokeWidth="2.5" />
        </svg>

        {/* Small Active Trust Pulse Dot */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
        </span>
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
