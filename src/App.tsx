import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilters } from './components/CategoryFilters';
import { ToolCard } from './components/ToolCard';
import { AdBanner } from './components/AdBanner';

const ToolPage = React.lazy(() => import('./components/ToolPage').then(m => ({ default: m.ToolPage })));
import { SeoPageLayout } from './components/SeoPageLayout';
import { StaticLegalPage, LegalPageType } from './components/StaticLegalPage';
const PrivacyModal = React.lazy(() => import('./components/PrivacyModal').then(m => ({ default: m.PrivacyModal })));
const AboutModal = React.lazy(() => import('./components/AboutModal').then(m => ({ default: m.AboutModal })));
const ContactModal = React.lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const AuthNoticeModal = React.lazy(() => import('./components/AuthNoticeModal').then(m => ({ default: m.AuthNoticeModal })));
const LegalModal = React.lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
import { ErrorBoundary } from './components/ErrorBoundary';
import type { LegalTab } from './components/LegalModal';
import { TOOLS } from './data/tools';
import { ToolCategory } from './types';
import { Language, TRANSLATIONS } from './i18n/translations';
import { TOOL_TO_PRIMARY_SLUG, findToolBySlug } from './data/toolSlugs';
import { getSeoRoute, SeoRouteData } from './data/seoRoutes';
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

    // 2. Domain-based detection: mypdftools.de -> 'de', mypdftools.it -> 'it'
    const host = window.location.hostname.toLowerCase();
    const isGermanDomain = host.endsWith('.de') || host.includes('mypdftools.de');
    const isItalianDomain = host.endsWith('.it') || host.includes('mypdftools.it');

    // 3. Check saved preference in localStorage
    try {
      const saved = localStorage.getItem('mypdftools_lang');
      if (saved === 'it' || saved === 'de' || saved === 'en') {
        if (isGermanDomain && saved === 'it') {
          return 'de';
        }
        if (isItalianDomain && saved === 'de') {
          return 'it';
        }
        return saved as Language;
      }
    } catch {}

    if (isGermanDomain) {
      return 'de';
    }
    if (isItalianDomain) {
      return 'it';
    }

    // 4. Browser language fallback
    const navLang = (navigator.language || '').toLowerCase();
    if (navLang.startsWith('de')) return 'de';
    if (navLang.startsWith('it')) return 'it';
  }

  return 'it';
};

// Helper to extract clean path from pathname or fallback to hash
const getPathFromLocation = (): string => {
  if (typeof window === 'undefined') return '';
  const rawPath = window.location.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
  const hash = window.location.hash.replace(/^#\/?/, '');
  return rawPath || hash;
};

const LEGAL_ROUTE_MAP: Record<string, LegalPageType> = {
  'impressum': 'impressum',
  'note-legali': 'impressum',
  'datenschutz': 'privacy',
  'privacy-policy': 'privacy',
  'privacy': 'privacy',
  'ueber-uns': 'about',
  'chi-siamo': 'about',
  'about': 'about',
  'kontakt': 'contact',
  'contatti': 'contact',
  'contact': 'contact',
  'nutzungsbedingungen': 'terms',
  'agb': 'terms',
  'terms-of-service': 'terms',
  'terms': 'terms',
  'cookie-policy': 'cookies',
  'cookies': 'cookies',
};

export const App: React.FC = () => {
  const initialPath = useMemo(() => getPathFromLocation(), []);
  const initialSeoRoute = useMemo(() => (initialPath ? getSeoRoute(initialPath) || null : null), [initialPath]);
  const initialMatch = useMemo(
    () => (!initialSeoRoute && initialPath ? findToolBySlug(initialPath) : null),
    [initialSeoRoute, initialPath]
  );
  const initialToolId = initialSeoRoute ? initialSeoRoute.toolId : (initialMatch ? initialMatch.toolId : null);
  const initialLang = initialSeoRoute?.lang || initialMatch?.lang || getInitialLanguage();

  // Domain-based default: German on mypdftools.de, Italian on mypdftools.it
  const [currentLang, setCurrentLang] = useState<Language>(initialLang);
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState<string>(initialPath);
  const [currentSeoRoute, setCurrentSeoRoute] = useState<SeoRouteData | null>(initialSeoRoute);
  const [currentToolId, setCurrentToolId] = useState<string | null>(initialToolId);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [authNoticeOpen, setAuthNoticeOpen] = useState(false);
  const [legalModalState, setLegalModalState] = useState<{ isOpen: boolean; tab: LegalTab }>({
    isOpen: false,
    tab: 'privacy',
  });

  const activeLegalType = currentPath ? LEGAL_ROUTE_MAP[currentPath] || null : null;

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem('mypdftools_lang', lang);
    } catch {
      // Ignore in restricted environments
    }

    // If currently viewing a tool or SEO page, switch to that tool's translated URL
    const activeId = currentToolId || currentSeoRoute?.toolId;
    if (activeId && TOOL_TO_PRIMARY_SLUG[activeId]) {
      const targetSlug = TOOL_TO_PRIMARY_SLUG[activeId][lang] || TOOL_TO_PRIMARY_SLUG[activeId].it;
      if (targetSlug && targetSlug !== currentPath) {
        navigateToPath(targetSlug);
      }
    }
  };

  // Sync SEO route and tool ID synchronously whenever currentPath changes
  useEffect(() => {
    if (!currentPath) {
      setCurrentSeoRoute(null);
      setCurrentToolId(null);
      return;
    }

    if (activeLegalType) {
      setCurrentSeoRoute(null);
      setCurrentToolId(null);
      if (['impressum', 'datenschutz', 'nutzungsbedingungen', 'agb', 'ueber-uns', 'kontakt'].includes(currentPath)) {
        setCurrentLang('de');
      } else if (['note-legali', 'chi-siamo', 'contatti'].includes(currentPath)) {
        setCurrentLang('it');
      }
      return;
    }

    const seo = getSeoRoute(currentPath);
    setCurrentSeoRoute(seo || null);
    if (seo) {
      setCurrentToolId(seo.toolId);
      if (seo.lang && (seo.lang === 'it' || seo.lang === 'de' || seo.lang === 'en')) {
        setCurrentLang(seo.lang);
      }
    } else {
      const match = findToolBySlug(currentPath);
      if (match) {
        setCurrentToolId(match.toolId);
        if (match.lang) {
          setCurrentLang(match.lang);
        }
      } else if (TOOLS.some((tool) => tool.id === currentPath)) {
        setCurrentToolId(currentPath);
      } else {
        setCurrentToolId(null);
      }
    }
  }, [currentPath, activeLegalType]);

  // Dynamic document title & HTML lang update based on active language or legal page
  useEffect(() => {
    document.documentElement.lang = currentLang;

    if (activeLegalType) {
      const titles: Record<LegalPageType, { it: string; de: string; en: string }> = {
        impressum: {
          it: 'Note Legali & Impressum — MyPdfTools',
          de: 'Impressum & Gesetzliche Anbieterkennzeichnung (§ 5 DDG) — MyPdfTools',
          en: 'Legal Notice & Impressum — MyPdfTools',
        },
        privacy: {
          it: 'Informativa sulla Privacy (GDPR UE 2016/679) — MyPdfTools',
          de: 'Datenschutzerklärung (EU-DSGVO) — MyPdfTools',
          en: 'Privacy Policy (EU GDPR) — MyPdfTools',
        },
        terms: {
          it: 'Termini e Condizioni di Utilizzo — MyPdfTools',
          de: 'Allgemeine Geschäfts- & Nutzungsbedingungen (AGB) — MyPdfTools',
          en: 'Terms and Conditions of Use — MyPdfTools',
        },
        about: {
          it: 'Chi Siamo & Visione — MyPdfTools',
          de: 'Über uns & Unsere Philosophie — MyPdfTools',
          en: 'About Us & Our Mission — MyPdfTools',
        },
        contact: {
          it: 'Contatti & Assistenza Tecnica — MyPdfTools',
          de: 'Kontakt & Technischer Support — MyPdfTools',
          en: 'Contact & Support — MyPdfTools',
        },
        cookies: {
          it: 'Informativa sui Cookie — MyPdfTools',
          de: 'Cookie-Richtlinie & Privatsphäre — MyPdfTools',
          en: 'Cookie Policy & Privacy — MyPdfTools',
        },
      };
      document.title = titles[activeLegalType]?.[currentLang] || titles[activeLegalType]?.en || 'MyPdfTools';
    } else if (!currentSeoRoute && !currentToolId) {
      if (currentLang === 'it') {
        document.title = 'MyPdfTools — Strumenti PDF 100% Gratuiti e Privati (Zero Upload)';
      } else if (currentLang === 'de') {
        document.title = 'MyPdfTools — 100% Kostenlose & Private PDF-Tools (Kein Upload)';
      } else {
        document.title = 'MyPdfTools — 100% Free & Private In-Browser PDF Suite';
      }
    }
  }, [currentLang, currentSeoRoute, currentToolId, activeLegalType]);

  // Google Analytics (GA4) pageview tracking on SPA navigation
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname + window.location.hash,
      });
    }
  }, [currentPath, currentToolId, currentLang, activeLegalType]);

  // Clean pathname + fallback hash routing
  useEffect(() => {
    const syncRouteFromLocation = () => {
      const activeRouteSlug = getPathFromLocation();
      setCurrentPath(activeRouteSlug);

      if (TOOLS.some((tool) => tool.id === activeRouteSlug)) {
        setCurrentToolId(activeRouteSlug);
      } else if (!activeRouteSlug) {
        setCurrentToolId(null);
      }
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, []);

  const navigateToPath = (path: string) => {
    const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
    if (!clean) {
      navigateHome();
      return;
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', `/${clean}`);
    } else {
      window.history.pushState(null, '', `/${clean}`);
    }
    setCurrentPath(clean);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTool = (toolId: string) => {
    const primarySlug = TOOL_TO_PRIMARY_SLUG[toolId]?.[currentLang] || TOOL_TO_PRIMARY_SLUG[toolId]?.it;
    if (primarySlug) {
      navigateToPath(primarySlug);
    } else {
      window.history.pushState(null, '', `/${toolId}`);
      setCurrentPath(toolId);
      setCurrentToolId(toolId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateHome = () => {
    if (window.location.pathname !== '/' || window.location.hash) {
      window.history.pushState(null, '', '/');
    }
    setCurrentPath('');
    setCurrentToolId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTools = () => {
    if (currentPath || currentToolId) {
      navigateHome();
      setTimeout(() => {
        const el = document.getElementById('tools-catalog');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    } else {
      const el = document.getElementById('tools-catalog');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
        onOpenContactModal={() => setContactModalOpen(true)}
        onOpenAuthNotice={() => setAuthNoticeOpen(true)}
        onGoHome={navigateHome}
        onSelectTool={navigateToTool}
        onScrollToTools={scrollToTools}
      />

      {/* Main Content: SEO Landing Page, Tool View, or Catalog */}
      <main className="flex-1 pb-20 relative z-10">
        <ErrorBoundary>
        {activeLegalType ? (
          <StaticLegalPage
            type={activeLegalType}
            currentLang={currentLang}
            onGoHome={navigateHome}
          />
        ) : currentSeoRoute ? (
          <SeoPageLayout
            routeData={currentSeoRoute}
            onNavigate={navigateToPath}
            onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
          />
        ) : activeTool ? (
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
        ) : currentPath ? (
          <div className="max-w-2xl mx-auto my-20 p-12 bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200 text-center shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-3">404 — {currentLang === 'it' ? 'Pagina Non Trovata' : currentLang === 'de' ? 'Seite Nicht Gefunden' : 'Page Not Found'}</h2>
            <p className="text-sm text-slate-600 mb-6 font-medium">
              {currentLang === 'it' ? 'La pagina richiesta non esiste o è stata spostata.' : 'Die angeforderte Seite existiert nicht oder wurde verschoben.'}
            </p>
            <button
              onClick={navigateHome}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs shadow-sm cursor-pointer transition-all"
            >
              {currentLang === 'it' ? 'Torna alla Home' : 'Zur Startseite'}
            </button>
          </div>
        ) : (
          <div>
            <Hero
              currentLang={currentLang}
              onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
            />

            <div id="tools-catalog" className="scroll-mt-24">
              <CategoryFilters
                currentLang={currentLang}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

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
        </ErrorBoundary>
      </main>

      {/* Footer with Language Options */}
      <footer className="bg-white/90 backdrop-blur-xl border-t border-slate-200/80 py-10 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} MyPdfTools (mypdftools.it • mypdftools.de). {t.footer.rights}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 text-xs font-bold text-slate-600">
              <button onClick={() => navigateToTool('jpg-to-pdf')} className="px-2.5 py-2 min-h-[44px] inline-flex items-center hover:text-emerald-600 cursor-pointer">{t.tools['jpg-to-pdf']?.title || 'JPG to PDF'}</button>
              <button onClick={() => navigateToTool('pdf-to-jpg')} className="px-2.5 py-2 min-h-[44px] inline-flex items-center hover:text-emerald-600 cursor-pointer">{t.tools['pdf-to-jpg']?.title || 'PDF to JPG'}</button>
              <button onClick={() => navigateToTool('merge-pdf')} className="px-2.5 py-2 min-h-[44px] inline-flex items-center hover:text-emerald-600 cursor-pointer">{t.tools['merge-pdf']?.title || 'Merge PDF'}</button>
              <button onClick={() => navigateToTool('split-pdf')} className="px-2.5 py-2 min-h-[44px] inline-flex items-center hover:text-emerald-600 cursor-pointer">{t.tools['split-pdf']?.title || 'Split PDF'}</button>
              
              {currentLang === 'de' ? (
                <>
                  <a
                    href="/impressum"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('impressum');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    Impressum
                  </a>
                  <a
                    href="/datenschutz"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('datenschutz');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    Datenschutz
                  </a>
                  <a
                    href="/nutzungsbedingungen"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('nutzungsbedingungen');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    AGB
                  </a>
                  <a
                    href="/cookie-policy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('cookie-policy');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    Cookie-Richtlinie
                  </a>
                  <button onClick={() => setPrivacyModalOpen(true)} className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-emerald-600 font-black hover:underline cursor-pointer">{t.footer.privacyGuarantee}</button>
                  <a
                    href="/ueber-uns"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('ueber-uns');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 font-black hover:text-emerald-600 cursor-pointer"
                  >
                    Über uns
                  </a>
                  <a
                    href="/kontakt"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('kontakt');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 font-black hover:text-emerald-600 cursor-pointer"
                  >
                    Kontakt
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="/note-legali"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('note-legali');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    Note Legali
                  </a>
                  <a
                    href="/privacy-policy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('privacy-policy');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-of-service"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('terms-of-service');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    Termini di Servizio
                  </a>
                  <a
                    href="/cookie-policy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('cookie-policy');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 hover:text-emerald-600 cursor-pointer font-bold"
                  >
                    Cookie Policy
                  </a>
                  <button onClick={() => setPrivacyModalOpen(true)} className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-emerald-600 font-black hover:underline cursor-pointer">{t.footer.privacyGuarantee}</button>
                  <a
                    href="/chi-siamo"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('chi-siamo');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 font-black hover:text-emerald-600 cursor-pointer"
                  >
                    Chi Siamo
                  </a>
                  <a
                    href="/contatti"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToPath('contatti');
                    }}
                    className="px-2.5 py-2 min-h-[44px] inline-flex items-center text-slate-800 font-black hover:text-emerald-600 cursor-pointer"
                  >
                    Contattaci
                  </a>
                </>
              )}
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

      {contactModalOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={contactModalOpen}
            currentLang={currentLang}
            onClose={() => setContactModalOpen(false)}
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
