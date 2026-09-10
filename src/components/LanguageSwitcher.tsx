import React from 'react';
import { Language } from '../i18n/translations';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang = 'it',
  onLanguageChange,
  className = '',
}) => {
  return (
    <div
      className={`inline-flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner flex-shrink-0 ${className}`}
      role="group"
      aria-label="Language selector"
    >
      {LANGUAGES.map(({ code, label }) => {
        const isActive = currentLang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onLanguageChange(code);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-black uppercase transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-900/5'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
            }`}
            aria-label={`Switch to ${label}`}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

