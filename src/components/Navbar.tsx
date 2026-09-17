import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ShieldCheck, Sparkles, Menu, X, ChevronDown, ArrowRight, Bookmark, Check } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { ToolIcon } from './ToolIcon';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPrivacyModal: () => void;
  onOpenAboutModal: () => void;
  onOpenContactModal?: () => void;
  onOpenAuthNotice: () => void;
  onGoHome: () => void;
  onSelectTool?: (toolId: string) => void;
  onScrollToTools?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang = 'it',
  onLanguageChange,
  onOpenPrivacyModal,
  onOpenAboutModal,
  onOpenContactModal,
  onOpenAuthNotice,
  onGoHome,
  onSelectTool,
  onScrollToTools,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleBookmark = () => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcut = isMac ? 'Cmd+D' : 'Ctrl+D';
    alert(
      currentLang === 'it'
        ? `Premi ${shortcut} per aggiungere MyPdfTools ai tuoi Preferiti!`
        : currentLang === 'de'
        ? `Drücke ${shortcut}, um MyPdfTools zu deinen Lesezeichen hinzuzufügen!`
        : `Press ${shortcut} to bookmark MyPdfTools!`
    );
    setBookmarked(true);
    setTimeout(() => setBookmarked(false), 3000);
  };

  const bookmarkLabel =
    currentLang === 'it'
      ? (bookmarked ? 'Premi Ctrl+D!' : 'Preferiti')
      : currentLang === 'de'
      ? (bookmarked ? 'Drücke Strg+D!' : 'Lesezeichen')
      : (bookmarked ? 'Press Ctrl+D!' : 'Bookmark');

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  const aboutText =
    currentLang === 'it' ? 'Chi Siamo' : currentLang === 'de' ? 'Über uns' : 'About';

  const contactText =
    currentLang === 'it' ? 'Contattaci' : currentLang === 'de' ? 'Kontakt' : 'Contact';

  const freeNoticeText =
    currentLang === 'it'
      ? '100% Gratuito'
      : currentLang === 'de'
      ? '100% Kostenlos'
      : '100% Free';

  const viewAllToolsText =
    currentLang === 'it'
      ? 'Vedi tutti gli strumenti nella homepage'
      : currentLang === 'de'
      ? 'Alle Tools auf der Startseite anzeigen'
      : 'View all tools on homepage';

  // Category column headers
  const colHeaders = {
    organize: currentLang === 'it' ? 'Organizza & Comprimi' : currentLang === 'de' ? 'Organisieren & Komprimieren' : 'Organize & Compress',
    convertTo: currentLang === 'it' ? 'Converti in PDF' : currentLang === 'de' ? 'In PDF umwandeln' : 'Convert to PDF',
    convertFrom: currentLang === 'it' ? 'Converti da PDF' : currentLang === 'de' ? 'Aus PDF umwandeln' : 'Convert from PDF',
    editSecurity: currentLang === 'it' ? 'Modifica & Sicurezza' : currentLang === 'de' ? 'Bearbeiten & Sicherheit' : 'Edit & Security',
  };

  // 4 Categorized Columns
  const organizeAndOptimize = useMemo(() => {
    const ids = ['merge-pdf', 'split-pdf', 'compress-pdf', 'organize-pdf', 'rotate-pdf', 'repair-pdf'];
    return ids.map(id => TOOLS.find(tool => tool.id === id)).filter(Boolean);
  }, []);

  const convertToPdf = useMemo(() => {
    const ids = ['jpg-to-pdf', 'word-to-pdf', 'excel-to-pdf', 'powerpoint-to-pdf', 'html-to-pdf'];
    return ids.map(id => TOOLS.find(tool => tool.id === id)).filter(Boolean);
  }, []);

  const convertFromPdf = useMemo(() => {
    const ids = ['pdf-to-jpg', 'pdf-to-word', 'pdf-to-excel', 'pdf-to-powerpoint', 'pdf-to-markdown'];
    return ids.map(id => TOOLS.find(tool => tool.id === id)).filter(Boolean);
  }, []);

  const editAndSecurity = useMemo(() => {
    const ids = ['sign-pdf', 'watermark', 'protect-pdf', 'unlock-pdf', 'edit-pdf', 'page-numbers'];
    return ids.map(id => TOOLS.find(tool => tool.id === id)).filter(Boolean);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToolClick = (toolId: string) => {
    setMegaMenuOpen(false);
    if (onSelectTool) {
      onSelectTool(toolId);
    }
  };

  const handleToggleMenu = () => {
    setMegaMenuOpen(prev => !prev);
  };

  const handleViewAllOnHome = () => {
    setMegaMenuOpen(false);
    if (onScrollToTools) {
      onScrollToTools();
    } else {
      onGoHome();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs">
      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={onGoHome}
            className="text-left group cursor-pointer focus:outline-none flex-shrink-0"
            title="MyPdfTools Home"
          >
            <Logo />
          </button>

          {/* Clean Desktop Navigation & Controls */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            
            {/* All PDF Tools Click-to-Open Menu */}
            <div ref={menuRef} className="relative">
              <button
                onClick={handleToggleMenu}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  megaMenuOpen
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60'
                }`}
                aria-expanded={megaMenuOpen}
              >
                <span>{t.nav.allTools}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    megaMenuOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {/* Mega-Menu Solid White Opaque Dropdown Panel */}
              {megaMenuOpen && (
                <div className="absolute top-full left-0 -ml-16 mt-3 w-[900px] bg-white rounded-3xl p-6 border border-slate-200 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.25)] z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-black/5">
                  <div className="grid grid-cols-4 gap-6">
                    
                    {/* Column 1: Organize & Optimize */}
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {colHeaders.organize}
                      </h4>
                      <div className="space-y-1">
                        {organizeAndOptimize.map(tool => {
                          if (!tool) return null;
                          const title = t.tools[tool.id]?.title || tool.title;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => handleToolClick(tool.id)}
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-colors text-left cursor-pointer group"
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.iconBg}`}>
                                <ToolIcon name={tool.iconName} toolId={tool.id} className="w-4 h-4" />
                              </div>
                              <span className="truncate">{title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 2: Convert to PDF */}
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        {colHeaders.convertTo}
                      </h4>
                      <div className="space-y-1">
                        {convertToPdf.map(tool => {
                          if (!tool) return null;
                          const title = t.tools[tool.id]?.title || tool.title;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => handleToolClick(tool.id)}
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-colors text-left cursor-pointer group"
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.iconBg}`}>
                                <ToolIcon name={tool.iconName} toolId={tool.id} className="w-4 h-4" />
                              </div>
                              <span className="truncate">{title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 3: Convert from PDF */}
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        {colHeaders.convertFrom}
                      </h4>
                      <div className="space-y-1">
                        {convertFromPdf.map(tool => {
                          if (!tool) return null;
                          const title = t.tools[tool.id]?.title || tool.title;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => handleToolClick(tool.id)}
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-colors text-left cursor-pointer group"
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.iconBg}`}>
                                <ToolIcon name={tool.iconName} toolId={tool.id} className="w-4 h-4" />
                              </div>
                              <span className="truncate">{title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Column 4: Edit & Security */}
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        {colHeaders.editSecurity}
                      </h4>
                      <div className="space-y-1">
                        {editAndSecurity.map(tool => {
                          if (!tool) return null;
                          const title = t.tools[tool.id]?.title || tool.title;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => handleToolClick(tool.id)}
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/80 transition-colors text-left cursor-pointer group"
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tool.iconBg}`}>
                                <ToolIcon name={tool.iconName} toolId={tool.id} className="w-4 h-4" />
                              </div>
                              <span className="truncate">{title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Mega-Menu Bottom Action Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">
                      🔒 100% Client-Side • Zero Upload • Privacy Garantita
                    </span>
                    <button
                      onClick={handleViewAllOnHome}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                    >
                      <span>{viewAllToolsText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onOpenAboutModal}
              className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors cursor-pointer"
            >
              {aboutText}
            </button>

            <button
              onClick={onOpenContactModal}
              className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors cursor-pointer"
            >
              {contactText}
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

            {/* Quick Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                bookmarked
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 scale-105'
                  : 'bg-white hover:bg-amber-50/80 text-slate-700 hover:text-amber-700 border-slate-200/80 hover:border-amber-300'
              }`}
              title={currentLang === 'it' ? 'Aggiungi ai preferiti (Ctrl+D / Cmd+D)' : currentLang === 'de' ? 'Zu Lesezeichen hinzufügen (Strg+D / Cmd+D)' : 'Add to Bookmarks (Ctrl+D / Cmd+D)'}
            >
              {bookmarked ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              )}
              <span>{bookmarkLabel}</span>
            </button>

            {/* 100% Free / No Account Needed Notice */}
            <button
              onClick={onOpenAuthNotice}
              className="inline-flex items-center gap-1.5 text-xs font-black bg-slate-900 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{freeNoticeText}</span>
            </button>
          </div>

          {/* Mobile Right Bar: Language Switcher + Hamburger with improved right padding */}
          <div className="flex md:hidden items-center gap-2.5 pr-2 sm:pr-3">
            <LanguageSwitcher
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Clean Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150 shadow-2xl">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onScrollToTools) {
                onScrollToTools();
              } else {
                onGoHome();
              }
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
              if (onOpenContactModal) onOpenContactModal();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2.5 text-sm font-black text-slate-800 hover:bg-emerald-50 rounded-xl"
          >
            ✉️ {contactText}
          </button>

          <button
            onClick={handleBookmark}
            className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
              bookmarked
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : 'bg-white text-slate-700 border-slate-200'
            }`}
          >
            <span className="flex items-center gap-2">
              {bookmarked ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Bookmark className="w-4 h-4 text-amber-500 fill-amber-400" />
              )}
              <span>{bookmarkLabel}</span>
            </span>
            <span className="text-xs text-slate-400 font-medium">Ctrl+D</span>
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
