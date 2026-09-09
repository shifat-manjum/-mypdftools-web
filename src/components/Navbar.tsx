import React, { useState } from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ShieldCheck, ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onSelectTool: (toolId: string) => void;
  onOpenPrivacyModal: () => void;
  onOpenAboutModal: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang = 'it',
  onLanguageChange,
  onSelectTool,
  onOpenPrivacyModal,
  onOpenAboutModal,
  onGoHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [convertDropdownOpen, setConvertDropdownOpen] = useState(false);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={onGoHome}
              className="text-left group cursor-pointer focus:outline-none"
              title="MyPdfTools Home"
            >
              <Logo />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-slate-700">
              <button
                onClick={() => onSelectTool('merge-pdf')}
                className="px-3 py-2 rounded-xl hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors"
              >
                {t.nav.mergePdf}
              </button>
              <button
                onClick={() => onSelectTool('split-pdf')}
                className="px-3 py-2 rounded-xl hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors"
              >
                {t.nav.splitPdf}
              </button>
              <button
                onClick={() => onSelectTool('compress-pdf')}
                className="px-3 py-2 rounded-xl hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors"
              >
                {t.nav.compressPdf}
              </button>

              {/* Convert PDF Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setConvertDropdownOpen(!convertDropdownOpen)}
                  onBlur={() => setTimeout(() => setConvertDropdownOpen(false), 200)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors"
                >
                  <span>{t.nav.convertPdf}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {convertDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-56 bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-slate-900/5">
                    <div className="px-3 py-1 text-[10px] font-black text-slate-400 tracking-wider">
                      {t.nav.convertToPdf}
                    </div>
                    <button
                      onClick={() => { onSelectTool('jpg-to-pdf'); setConvertDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {t.tools['jpg-to-pdf']?.title || 'JPG to PDF'}
                    </button>
                    <button
                      onClick={() => { onSelectTool('word-to-pdf'); setConvertDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {t.tools['word-to-pdf']?.title || 'Word to PDF'}
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <div className="px-3 py-1 text-[10px] font-black text-slate-400 tracking-wider">
                      {t.nav.convertFromPdf}
                    </div>
                    <button
                      onClick={() => { onSelectTool('pdf-to-jpg'); setConvertDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {t.tools['pdf-to-jpg']?.title || 'PDF to JPG'}
                    </button>
                    <button
                      onClick={() => { onSelectTool('pdf-to-word'); setConvertDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {t.tools['pdf-to-word']?.title || 'PDF to Word'}
                    </button>
                    <button
                      onClick={() => { onSelectTool('pdf-to-markdown'); setConvertDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      {t.tools['pdf-to-markdown']?.title || 'PDF to Markdown'}
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={onGoHome}
                className="px-3 py-2 rounded-xl hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors"
              >
                {t.nav.allTools}
              </button>

              <button
                onClick={onOpenAboutModal}
                className="px-3 py-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors cursor-pointer"
              >
                {currentLang === 'it' ? 'Chi Siamo' : currentLang === 'de' ? 'Über uns' : 'About'}
              </button>
            </nav>
          </div>

          {/* Right Header Controls: Language Switcher + Trust Pill + Auth Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Zentixx Reusable Language Switcher */}
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />

            {/* 100% Private Trust Badge */}
            <button
              onClick={onOpenPrivacyModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200/80 shadow-xs transition-all transform hover:scale-105"
              title="Privacy Guarantee"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">{t.nav.privateBadge}</span>
              <span className="md:hidden">{t.nav.privateShort}</span>
            </button>

            <button className="hidden sm:inline-block text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-2">
              {t.nav.login}
            </button>
            <button className="text-xs font-extrabold bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all transform active:scale-95">
              {t.nav.signUp}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-slate-400">Lingua / Language</span>
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />
          </div>
          <button
            onClick={() => { onSelectTool('merge-pdf'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-emerald-50 rounded-xl"
          >
            {t.nav.mergePdf}
          </button>
          <button
            onClick={() => { onSelectTool('split-pdf'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-emerald-50 rounded-xl"
          >
            {t.nav.splitPdf}
          </button>
          <button
            onClick={() => { onSelectTool('compress-pdf'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-emerald-50 rounded-xl"
          >
            {t.nav.compressPdf}
          </button>
          <button
            onClick={() => { onSelectTool('jpg-to-pdf'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-emerald-50 rounded-xl"
          >
            {t.tools['jpg-to-pdf']?.title || 'JPG to PDF'}
          </button>
          <button
            onClick={() => { onSelectTool('pdf-to-jpg'); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-emerald-50 rounded-xl"
          >
            {t.tools['pdf-to-jpg']?.title || 'PDF to JPG'}
          </button>
          <button
            onClick={() => { onOpenPrivacyModal(); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-black text-emerald-700 bg-emerald-50 rounded-xl"
          >
            🔒 {t.hero.privacyButton}
          </button>
          <button
            onClick={() => { onOpenAboutModal(); setMobileMenuOpen(false); }}
            className="block w-full text-left px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            ✨ {currentLang === 'it' ? 'Chi Siamo (MyPdfTools & Founder)' : currentLang === 'de' ? 'Über uns & Gründer' : 'About MyPdfTools & Founder'}
          </button>
        </div>
      )}
    </header>
  );
};
