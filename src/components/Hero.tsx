import React from 'react';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ShieldCheck, WifiOff } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onOpenPrivacyModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang = 'it', onOpenPrivacyModal }) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  return (
    <section className="pt-12 pb-10 text-center px-4 max-w-5xl mx-auto">
      {/* Trust Pill */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200/80 text-emerald-800 text-xs font-black mb-5 shadow-xs">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{t.hero.badge}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        {t.hero.titleStart}{' '}
        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent block sm:inline">
          {t.hero.titleHighlight}
        </span>
      </h1>

      <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
        {t.hero.subtitle}
      </p>

      {/* Trust Trigger Action */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onOpenPrivacyModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/90 hover:bg-white text-slate-800 text-xs font-black border border-slate-200/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_25px_-4px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{t.hero.privacyButton}</span>
        </button>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">&bull;</span>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-white/60 px-3 py-1.5 rounded-full border border-slate-200/50">
          <WifiOff className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.hero.worksOffline}</span>
        </div>
      </div>
    </section>
  );
};
