import React from 'react';
import { ToolItem } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ArrowRight } from 'lucide-react';
import { ToolIcon } from './ToolIcon';

interface ToolCardProps {
  tool: ToolItem;
  currentLang?: Language;
  onClick: () => void;
}

interface CardTheme {
  gradientText: string;
  gradientBar: string;
  glowShadow: string;
  borderColor: string;
  accentText: string;
}

const getToolTheme = (toolId: string, category: string): CardTheme => {
  // 1. Image conversions (Amber / Orange)
  if (toolId === 'jpg-to-pdf' || toolId === 'pdf-to-jpg') {
    return {
      gradientText: 'from-amber-600 via-orange-500 to-amber-700',
      gradientBar: 'from-amber-500 via-orange-500 to-amber-600',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.22)]',
      borderColor: 'hover:border-amber-400/60',
      accentText: 'text-amber-600',
    };
  }

  // 2. Microsoft Word (Royal Blue / Indigo)
  if (toolId === 'word-to-pdf' || toolId === 'pdf-to-word') {
    return {
      gradientText: 'from-blue-600 via-indigo-600 to-sky-600',
      gradientBar: 'from-blue-600 via-indigo-500 to-sky-500',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.22)]',
      borderColor: 'hover:border-blue-400/60',
      accentText: 'text-blue-600',
    };
  }

  // 3. Microsoft Excel (Emerald / Forest Green)
  if (toolId === 'excel-to-pdf' || toolId === 'pdf-to-excel') {
    return {
      gradientText: 'from-emerald-600 via-teal-600 to-green-700',
      gradientBar: 'from-emerald-500 via-teal-500 to-green-600',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.22)]',
      borderColor: 'hover:border-emerald-400/60',
      accentText: 'text-emerald-600',
    };
  }

  // 4. Microsoft PowerPoint (Vibrant Orange / Red)
  if (toolId === 'powerpoint-to-pdf' || toolId === 'pdf-to-powerpoint') {
    return {
      gradientText: 'from-orange-600 via-red-500 to-amber-600',
      gradientBar: 'from-orange-500 via-red-500 to-amber-500',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(234,88,12,0.22)]',
      borderColor: 'hover:border-orange-400/60',
      accentText: 'text-orange-600',
    };
  }

  // 5. PDF Compression / Optimization (Cyber Emerald & Teal)
  if (toolId === 'compress-pdf' || category === 'optimize') {
    return {
      gradientText: 'from-emerald-600 via-teal-500 to-cyan-600',
      gradientBar: 'from-emerald-500 via-teal-500 to-cyan-500',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(20,184,166,0.25)]',
      borderColor: 'hover:border-teal-400/60',
      accentText: 'text-teal-600',
    };
  }

  // 6. Security & Sign (Rose / Crimson / Ruby)
  if (category === 'security' || toolId === 'sign-pdf' || toolId === 'protect-pdf' || toolId === 'unlock-pdf') {
    return {
      gradientText: 'from-rose-600 via-pink-600 to-red-600',
      gradientBar: 'from-rose-500 via-pink-500 to-red-500',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(225,29,72,0.22)]',
      borderColor: 'hover:border-rose-400/60',
      accentText: 'text-rose-600',
    };
  }

  // 7. Organize (Merge, Split, Rotate, Pages) (Purple / Violet / Indigo)
  if (category === 'organize' || toolId === 'merge-pdf' || toolId === 'split-pdf') {
    return {
      gradientText: 'from-purple-600 via-violet-600 to-indigo-600',
      gradientBar: 'from-purple-500 via-violet-500 to-indigo-500',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(147,51,234,0.22)]',
      borderColor: 'hover:border-purple-400/60',
      accentText: 'text-purple-600',
    };
  }

  // 8. Intelligence / AI (Fuchsia / Neon Violet)
  if (category === 'intelligence' || toolId === 'pdf-to-markdown') {
    return {
      gradientText: 'from-fuchsia-600 via-purple-600 to-pink-600',
      gradientBar: 'from-fuchsia-500 via-purple-500 to-pink-500',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(217,70,239,0.25)]',
      borderColor: 'hover:border-fuchsia-400/60',
      accentText: 'text-fuchsia-600',
    };
  }

  // 9. Edit & Annotate (Sky / Blue / Cyan)
  if (category === 'edit' || toolId === 'edit-pdf' || toolId === 'watermark' || toolId === 'page-numbers') {
    return {
      gradientText: 'from-sky-600 via-blue-600 to-indigo-600',
      gradientBar: 'from-sky-500 via-blue-500 to-indigo-500',
      glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(14,165,233,0.22)]',
      borderColor: 'hover:border-sky-400/60',
      accentText: 'text-sky-600',
    };
  }

  // Default fallback
  return {
    gradientText: 'from-emerald-600 via-teal-600 to-emerald-700',
    gradientBar: 'from-emerald-500 via-teal-500 to-emerald-600',
    glowShadow: 'hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.22)]',
    borderColor: 'hover:border-emerald-400/60',
    accentText: 'text-emerald-600',
  };
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, currentLang = 'it', onClick }) => {
  // Localized title & description
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;
  const localized = t.tools[tool.id];
  const title = localized?.title || tool.title;
  const description = localized?.description || tool.description;

  const theme = getToolTheme(tool.id, tool.category);

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
      className={`group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/90 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06),0_4px_10px_-2px_rgba(0,0,0,0.03)] ${theme.glowShadow} hover:-translate-y-2 ${theme.borderColor} transition-all duration-300 cursor-pointer flex flex-col justify-between text-left h-full ring-1 ring-slate-900/5 min-h-[220px] overflow-hidden`}
    >
      {/* Top Gradient Accent Bar on Hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${theme.gradientBar} opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 origin-left`}
      />

      {/* Top row: Icon and Optional Badge */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm ${tool.iconBg}`}
          >
            <ToolIcon name={tool.iconName} toolId={tool.id} className="w-7 h-7" />
          </div>

          {tool.badge && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200 uppercase tracking-wide shadow-2xs">
              {tool.badge}
            </span>
          )}
        </div>

        {/* Title with Modern Font and Vibrant Gradient on Hover */}
        <h3
          className={`text-[17.5px] font-black tracking-tight leading-snug text-slate-900 transition-all duration-300 group-hover:bg-gradient-to-r ${theme.gradientText} group-hover:bg-clip-text group-hover:text-transparent`}
        >
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
        <span
          className={`${theme.accentText} font-black flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0 whitespace-nowrap`}
        >
          <span>{t.openTool}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
