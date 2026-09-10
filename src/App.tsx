import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilters } from './components/CategoryFilters';
import { ToolCard } from './components/ToolCard';
import { AdBanner } from './components/AdBanner';

const ToolPage = React.lazy(() => import('./components/ToolPage').then(m => ({ default: m.ToolPage })));
const PrivacyModal = React.lazy(() => import('./components/PrivacyModal').then(m => ({ default: m.PrivacyModal })));
const AboutModal = React.lazy(() => import('./components/AboutModal').then(m => ({ default: m.AboutModal })));
const AuthNoticeModal = React.lazy(() => import('./components/AuthNoticeModal').then(m => ({ default: m.AuthNoticeModal })));
const LegalModal = React.lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
import type { LegalTab } from './components/LegalModal';
import { TOOLS } from './data/tools';
import { ToolCategory } from './types';
import { Language, TRANSLATIONS } from './i18n/translations';
import { ShieldCheck, Zap, Lock, WifiOff, ArrowUpRight } from 'lucide-react';

// Automatically detect initial language based on URL query, saved preference, domain, or browser language
const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    // 1. Check URL query param (?lang=de, ?lang=it, ?lang=en)
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'it' || urlLang === 'de' || urlLang === 'en') {
        localStorage.setItem('mypdftools_lang', urlLang);
        return urlLang as Language;
      }
    } catch {}

    // 2. Check saved preference in localStorage
    try {
      const saved = localStorage.getItem('mypdftools_lang');
      if (saved === 'it' || saved === 'de' || saved === 'en') {
        return saved as Language;
      }
    } catch {}

    // 3. Domain-based detection: mypdftools.de -> 'de', mypdftools.it -> 'it'
    const host = window.location.hostname.toLowerCase();
    if (host.endsWith('.de') || host.includes('mypdftools.de')) {
      return 'de';
    }
    if (host.endsWith('.it') || host.includes('mypdftools.it')) {
      return 'it';
    }

    // 4. Browser language fallback
    const navLang = (navigator.language || '').toLowerCase();
    if (navLang.startsWith('de')) return 'de';
    if (navLang.startsWith('it')) return 'it';
  }

  return 'it';
};

export const App: React.FC = () => {
  // Domain-based default: German on mypdftools.de, Italian on mypdftools.it
  const [currentLang, setCurrentLang] = useState<Language>(getInitialLanguage);
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentToolId, setCurrentToolId] = useState<string | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [authNoticeOpen, setAuthNoticeOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState<{ isOpen: boolean; tab: LegalTab }>({
    isOpen: false,
    tab: 'privacy',
  });

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('mypdftools_lang', lang);
    } catch {
      // Ignore in restricted environments
    }
  };

  // Dynamic document title & HTML lang update based on active language
  useEffect(() => {
    document.documentElement.lang = currentLang;
    if (currentLang === 'it') {
      document.title = 'MyPdfTools — Strumenti PDF 100% Gratuiti e Privati (Zero Upload)';
    } else if (currentLang === 'de') {
      document.title = 'MyPdfTools — 100% Kostenlose & Private PDF-Tools (Kein Upload)';
    } else {
      document.title = 'MyPdfTools — 100% Free & Private In-Browser PDF Suite';
    }
  }, [currentLang]);

  // Hash-based routing to support direct URLs like www.mypdftools.it/#/jpg-to-pdf, #/privacy-policy, etc.
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash === 'privacy-policy') {
        setLegalModalState({ isOpen: true, tab: 'privacy' });
      } else if (hash === 'terms-of-service') {
        setLegalModalState({ isOpen: true, tab: 'terms' });
      } else if (hash === 'cookie-policy') {
        setLegalModalState({ isOpen: true, tab: 'cookies' });
      } else if (hash && TOOLS.some((tool) => tool.id === hash)) {
        setCurrentToolId(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentToolId(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToTool = (toolId: string) => {
    window.location.hash = `#/${toolId}`;
  };

  const navigateHome = () => {
    window.location.hash = '';
    setCurrentToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTool = useMemo(() => {
    return TOOLS.find((tool) => tool.id === currentToolId) || null;
  }, [currentToolId]);

  const filteredTools = useMemo(() => {
    return TOOLS.filter((tool) => {
      const matchesCategory =
        activeCategory === 'all' ||
        tool.category === activeCategory ||
        (activeCategory === 'workflows' && tool.badge);

      const localized = t.tools[tool.id];
      const titleToSearch = (localized?.title || tool.title).toLowerCase();
      const descToSearch = (localized?.description || tool.description).toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        query === '' ||
        titleToSearch.includes(query) ||
        descToSearch.includes(query) ||
        tool.id.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, t]);

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9]/70 via-[#ecfdf5]/30 to-[#eff6ff]/40 overflow-x-hidden">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-200/25 to-teal-200/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse duration-1000" />
      <div className="absolute top-60 right-10 w-[450px] h-[450px] bg-gradient-to-br from-indigo-200/20 to-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation Bar with Language Switcher */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenAboutModal={() => setAboutModalOpen(true)}
        onOpenAuthNotice={() => setAuthNoticeOpen(true)}
        onGoHome={navigateHome}
      />

      {/* Main Content: Tool View or Catalog */}
      <main className="flex-1 pb-20 relative z-10">
        {activeTool ? (
          <Suspense fallback={
            <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 py-20 flex flex-col items-center justify-center min-h-[450px]">
              <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4 shadow-sm"></div>
              <p className="text-sm font-black text-slate-700">{t.nav.allTools}...</p>
            </div>
          }>
            <ToolPage
              tool={activeTool}
              currentLang={currentLang}
              onBackToHome={navigateHome}
              onSelectOtherTool={navigateToTool}
              onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
            />
          </Suspense>
        ) : (
          <div>
            <Hero
              currentLang={currentLang}
              onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
            />

            {/* Top Leaderboard Ad Slot */}
            <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 mb-6">
              <AdBanner format="horizontal" />
            </div>

            <CategoryFilters
              currentLang={currentLang}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Tools Grid with Zentixx Box Shadows */}
            <section className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10">
              {filteredTools.length === 0 ? (
                <div className="text-center py-16 bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-bold text-slate-500">
                    {t.noToolsFound} "{searchQuery}"
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="mt-3 text-xs font-black text-emerald-600 hover:underline cursor-pointer"
                  >
                    {t.clearFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
                  {filteredTools.map((tool) => (
                    <div key={tool.id} className="min-h-[220px]">
                      <ToolCard
                        tool={tool}
                        currentLang={currentLang}
                        onClick={() => navigateToTool(tool.id)}
                      />
                    </div>
                  ))}

                  {/* "Create a workflow" Banner Card */}
                  {(activeCategory === 'all' || activeCategory === 'workflows') && (
                    <div className="bg-gradient-to-br from-white/90 via-emerald-50/50 to-teal-50/70 backdrop-blur-md rounded-2xl p-6 border border-emerald-200/80 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.2)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between text-left group ring-1 ring-emerald-500/10 min-h-[220px]">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mb-4 shadow-sm">
                          <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 leading-snug">
                          {t.createWorkflowTitle}
                        </h3>
                        <p className="mt-2.5 text-[13px] text-slate-600 leading-relaxed font-medium">
                          {t.createWorkflowDesc}
                        </p>
                      </div>
                      <button
                        onClick={() => navigateToTool('merge-pdf')}
                        className="mt-5 inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 group-hover:text-emerald-900 transition-colors cursor-pointer"
                      >
                        <span>{t.createWorkflowBtn}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Bottom Content Ad Slot */}
            <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 mt-12">
              <AdBanner format="horizontal" />
            </div>

            {/* Privacy & Trust Proof Section */}
            <section className="max-w-[1500px] mx-auto mt-16 px-4 sm:px-6 lg:px-10">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-700/60 ring-1 ring-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-2xl mx-auto text-center space-y-3 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.trustSection.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {t.trustSection.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    {t.trustSection.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-center relative z-10">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3.5 shadow-sm">
                      <Lock className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black text-white">{t.trustSection.zeroUploadsTitle}</h4>
                    <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed">
                      {t.trustSection.zeroUploadsDesc}
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto mb-3.5 shadow-sm">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black text-white">{t.trustSection.instantSpeedTitle}</h4>
                    <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed">
                      {t.trustSection.instantSpeedDesc}
                    </p>
                  </div>

                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3.5 shadow-sm">
                      <WifiOff className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-black text-white">{t.trustSection.offlineReadyTitle}</h4>
                    <p className="text-xs text-slate-300 mt-2 font-medium leading-relaxed">
                      {t.trustSection.offlineReadyDesc}
                    </p>
                  </div>
                </div>

                <div className="mt-9 text-center relative z-10">
                  <button
                    onClick={() => setPrivacyModalOpen(true)}
                    className="px-7 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-105 cursor-pointer"
                  >
                    {t.trustSection.readGuaranteeBtn} &rarr;
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer with Language Options */}
      <footer className="bg-white/90 backdrop-blur-xl border-t border-slate-200/80 py-10 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} MyPdfTools (mypdftools.it • mypdftools.de). {t.footer.rights}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600">
              <button onClick={() => navigateToTool('jpg-to-pdf')} className="hover:text-emerald-600 cursor-pointer">{t.tools['jpg-to-pdf']?.title || 'JPG to PDF'}</button>
              <button onClick={() => navigateToTool('pdf-to-jpg')} className="hover:text-emerald-600 cursor-pointer">{t.tools['pdf-to-jpg']?.title || 'PDF to JPG'}</button>
              <button onClick={() => navigateToTool('merge-pdf')} className="hover:text-emerald-600 cursor-pointer">{t.tools['merge-pdf']?.title || 'Merge PDF'}</button>
              <button onClick={() => navigateToTool('split-pdf')} className="hover:text-emerald-600 cursor-pointer">{t.tools['split-pdf']?.title || 'Split PDF'}</button>
              <button onClick={() => setLegalModalState({ isOpen: true, tab: 'privacy' })} className="text-slate-800 hover:text-emerald-600 cursor-pointer font-bold">{currentLang === 'it' ? 'Privacy Policy' : currentLang === 'de' ? 'Datenschutz' : 'Privacy Policy'}</button>
              <button onClick={() => setLegalModalState({ isOpen: true, tab: 'terms' })} className="text-slate-800 hover:text-emerald-600 cursor-pointer font-bold">{currentLang === 'it' ? 'Termini di Servizio' : currentLang === 'de' ? 'AGB' : 'Terms of Service'}</button>
              <button onClick={() => setLegalModalState({ isOpen: true, tab: 'cookies' })} className="text-slate-800 hover:text-emerald-600 cursor-pointer font-bold">Cookie Policy</button>
              <button onClick={() => setPrivacyModalOpen(true)} className="text-emerald-600 font-black hover:underline cursor-pointer">{t.footer.privacyGuarantee}</button>
              <button onClick={() => setAboutModalOpen(true)} className="text-slate-800 font-black hover:text-emerald-600 cursor-pointer">{currentLang === 'it' ? 'Chi Siamo (Founder)' : currentLang === 'de' ? 'Über uns (Gründer)' : 'About (Founder)'}</button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 max-w-2xl mx-auto font-medium">
            {t.footer.disclaimer}
          </p>
        </div>
      </footer>

      {/* Modals rendered on-demand */}
      {privacyModalOpen && (
        <Suspense fallback={null}>
          <PrivacyModal
            isOpen={privacyModalOpen}
            currentLang={currentLang}
            onClose={() => setPrivacyModalOpen(false)}
          />
        </Suspense>
      )}

      {aboutModalOpen && (
        <Suspense fallback={null}>
          <AboutModal
            isOpen={aboutModalOpen}
            currentLang={currentLang}
            onClose={() => setAboutModalOpen(false)}
          />
        </Suspense>
      )}

      {authNoticeOpen && (
        <Suspense fallback={null}>
          <AuthNoticeModal
            isOpen={authNoticeOpen}
            currentLang={currentLang}
            onClose={() => setAuthNoticeOpen(false)}
          />
        </Suspense>
      )}

      {legalModalState.isOpen && (
        <Suspense fallback={null}>
          <LegalModal
            isOpen={legalModalState.isOpen}
            initialTab={legalModalState.tab}
            currentLang={currentLang}
            onClose={() => setLegalModalState((prev) => ({ ...prev, isOpen: false }))}
          />
        </Suspense>
      )}
    </div>
  );
};
