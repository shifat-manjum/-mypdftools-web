import React from 'react';

interface LogoProps {
  className?: string;
  showBadge?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', showBadge = true }) => {
  return (
    <div className={`flex items-center gap-3 select-none flex-shrink-0 ${className}`}>
      {/* 3D Circular Emblem with Transparent Background */}
      <div className="relative w-11 h-11 flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
        <img
          src="/logo-circle.png"
          alt="MyPdfTools Logo"
          width={44}
          height={44}
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(225,29,72,0.2)] select-none"
        />
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
