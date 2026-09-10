import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { ShieldCheck, Sparkles, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { TOOLS } from '../data/tools';
import { ToolIcon } from './ToolIcon';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenPrivacyModal: () => void;
  onOpenAboutModal: () => void;
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
  onOpenAuthNotice,
  onGoHome,
  onSelectTool,
  onScrollToTools,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  const aboutText =
    currentLang === 'it' ? 'Chi Siamo' : currentLang === 'de' ? 'Über uns' : 'About';

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
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleToolClick = (toolId: string) => {
    setMegaMenuOpen(false);
    if (onSelectTool) {
      onSelectTool(toolId);
    }
  };

  const handleAllToolsHeaderClick = () => {
    setMegaMenuOpen(false);
    if (onScrollToTools) {
      onScrollToTools();
    } else {
      onGoHome();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
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
            
            {/* All PDF Tools Mega-Menu Trigger */}
            <div
              ref={menuRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={handleAllToolsHeaderClick}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  megaMenuOpen
                    ? 'text-emerald-600 bg-emerald-50/80'
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

              {/* Mega-Menu Floating Dropdown Panel */}
              {megaMenuOpen && (
                <div className="absolute top-full left-0 -ml-12 mt-2 w-[880px] bg-white/98 backdrop-blur-2xl rounded-3xl p-6 border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] z-50 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-slate-900/5">
                  <div className="grid grid-cols-4 gap-6">
                    
                    {/* Column 1: Organize & Optimize */}
                    <div>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-3 px-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
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
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors text-left cursor-pointer group"
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
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
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
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors text-left cursor-pointer group"
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
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
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
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors text-left cursor-pointer group"
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
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
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
                              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-colors text-left cursor-pointer group"
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
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">
                      🔒 100% Client-Side • Zero Upload • Privacy Garantita
                    </span>
                    <button
                      onClick={handleAllToolsHeaderClick}
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
