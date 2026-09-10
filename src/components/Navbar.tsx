import React, { useState } from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ShieldCheck, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectTool: (toolId: string) => void;
  onOpenPrivacyModal: () => void;
  onOpenAboutModal: () => void;
  onOpenAuthNotice: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang = 'it',
  onLanguageChange,
  onOpenPrivacyModal,
  onOpenAboutModal,
  onOpenAuthNotice,
  onGoHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  const aboutText =
    currentLang === 'it' ? 'Chi Siamo' : currentLang === 'de' ? 'Über uns' : 'About';

  const freeNoticeText =
    currentLang === 'it'
      ? '100% Gratuito'
      : currentLang === 'de'
      ? '100% Kostenlos'
      : '100% Free';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo - Fixed and unconstrained */}
          <button
            onClick={onGoHome}
            className="text-left group cursor-pointer focus:outline-none flex-shrink-0"
            title="MyPdfTools Home"
          >
            <Logo />
          </button>

          {/* Clean Desktop Navigation & Controls */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <button
              onClick={onGoHome}
              className="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors cursor-pointer"
            >
              {t.nav.allTools}
            </button>

            <button
              onClick={onOpenAboutModal}
              className="px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors cursor-pointer"
            >
              {aboutText}
            </button>

            {/* 100% Private Trust Badge */}
            <button
              onClick={onOpenPrivacyModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50/90 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/90 shadow-2xs transition-all cursor-pointer"
              title="Privacy Guarantee"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>{t.nav.privateBadge}</span>
            </button>

            {/* Clean Segmented Language Switcher (IT | EN | DE) */}
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />

            {/* 100% Free / No Account Needed Notice */}
            <button
              onClick={onOpenAuthNotice}
              className="inline-flex items-center gap-1.5 text-xs font-black bg-slate-900 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{freeNoticeText}</span>
            </button>
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-2xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-xl">
          <button
            onClick={() => {
              onGoHome();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2.5 text-sm font-black text-slate-800 hover:bg-emerald-50 rounded-xl"
          >
            📂 {t.nav.allTools}
          </button>

          <button
            onClick={() => {
              onOpenAboutModal();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2.5 text-sm font-black text-slate-800 hover:bg-emerald-50 rounded-xl"
          >
            ✨ {aboutText} (Shifat Manjum)
          </button>

          <button
            onClick={() => {
              onOpenPrivacyModal();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2.5 text-sm font-black text-emerald-700 bg-emerald-50 rounded-xl"
          >
            🔒 {t.nav.privateBadge}
          </button>

          <button
            onClick={() => {
              onOpenAuthNotice();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-center px-4 py-2.5 text-xs font-black bg-slate-900 text-white rounded-xl shadow-xs"
          >
            🎉 {freeNoticeText} — Nessun Account Richiesto
          </button>
        </div>
      )}
    </header>
  );
};
