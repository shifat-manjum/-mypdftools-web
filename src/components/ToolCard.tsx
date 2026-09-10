import React from 'react';
import { ToolItem } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: ToolItem;
  currentLang?: Language;
  onClick: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, currentLang = 'it', onClick }) => {
  const IconComponent = (Icons as any)[tool.iconName] || Icons.FileText;

  // Localized title & description
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;
  const localized = t.tools[tool.id];
  const title = localized?.title || tool.title;
  const description = localized?.description || tool.description;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(16,185,129,0.22),0_15px_30px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between text-left h-full ring-1 ring-slate-900/5 hover:ring-emerald-500/20 min-h-[220px]"
    >
      {/* Top row: Icon and Optional Badge */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${tool.iconBg}`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          {tool.badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide shadow-2xs">
              {tool.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug tracking-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-[13px] text-slate-500 line-clamp-3 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Bottom indicator */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-slate-600">
        <span className="truncate pr-2">
          {tool.isImplemented ? t.instantBrowserTool : t.standardTool}
        </span>
        <span className="text-emerald-600 font-black flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0 whitespace-nowrap">
          <span>{t.openTool}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
