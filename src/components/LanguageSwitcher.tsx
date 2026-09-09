import React from 'react';
import { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang = 'it',
  onLanguageChange,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center bg-slate-100/90 hover:bg-slate-200/70 p-1 rounded-full border border-slate-200 shadow-inner transition-colors ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {LANGUAGES.map(({ code, label, flag }) => {
        const isActive = currentLang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => onLanguageChange(code)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-white text-slate-900 shadow-[0_2px_8px_rgba(0,0,0,0.12)] scale-100 font-black ring-1 ring-slate-900/5'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
            }`}
            aria-label={`Switch to ${label}`}
            aria-pressed={isActive}
          >
            <span className="text-xs">{flag}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

