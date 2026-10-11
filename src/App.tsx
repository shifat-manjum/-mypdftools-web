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

            {/* In-Depth Editorial Articles & Publisher Content */}
            <section className="max-w-[1500px] mx-auto mt-20 px-4 sm:px-6 lg:px-10 space-y-14">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-wider">
                  {currentLang === 'de'
                    ? 'Redaktionelle Ratgeber & Branchenstandards'
                    : currentLang === 'en'
                    ? 'Editorial Guides & Industry Standards'
                    : 'Guide Editoriali & Standard di Settore'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentLang === 'de'
                    ? 'Alles, was Sie über die sichere Verwaltung von PDF-Dokumenten wissen müssen'
                    : currentLang === 'en'
                    ? 'Everything You Need to Know About Secure PDF Document Management'
                    : 'Tutto Quello che Devi Sapere sulla Gestione Sicura dei Documenti PDF'}
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  {currentLang === 'de'
                    ? 'Technische Einblicke des MyPdfTools-Teams zur DSGVO-Konformität, clientseitigen WebAssembly-Architektur und bewährten Methoden der Dokumentenoptimierung.'
                    : currentLang === 'en'
                    ? 'Technical insights from the MyPdfTools engineering team on GDPR compliance, client-side WebAssembly architecture, and document optimization best practices.'
                    : "Approfondimenti tecnici curati dal team di MyPdfTools sulla conformità normativa GDPR, l'architettura WebAssembly client-side e le migliori pratiche di ottimizzazione documentale."}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Article 1 */}
                <article className="bg-white/95 rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                    <span>{currentLang === 'de' ? 'Recht & Datenschutz' : currentLang === 'en' ? 'Regulations & Privacy' : 'Normativa & Privacy'}</span>
                    <span>&bull;</span>
                    <span>{currentLang === 'de' ? 'Lesezeit: 4 Min.' : currentLang === 'en' ? '4 min read' : 'Tempo di lettura: 4 min'}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    {currentLang === 'de'
                      ? 'Sicherheit bei PDF-Dokumenten: Datenschutz und DSGVO-Konformität für Unternehmen und Freiberufler'
                      : currentLang === 'en'
                      ? 'PDF Document Security: Data Confidentiality and GDPR Compliance for Businesses and Professionals'
                      : 'La Sicurezza nei Documenti PDF: Riservatezza dei Dati e Conformità GDPR per Imprese e Professionisti'}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                    <p>
                      {currentLang === 'de'
                        ? 'Im modernen Arbeitsalltag sind PDF-Dateien das universelle Format für Geschäftsverträge, Steuererklärungen, Gehaltsabrechnungen, medizinische Berichte und Ausweisdokumente. Vielen Nutzern ist jedoch nicht bewusst, dass herkömmliche kostenlose Online-PDF-Konverter diese vertraulichen Dateien auf entfernte Cloud-Server hochladen, die sich oft außerhalb der Europäischen Union befinden.'
                        : currentLang === 'en'
                        ? 'In modern workflows, PDF files serve as the universal standard for commercial contracts, tax returns, payslips, medical records, and identity documents. However, most users are unaware that traditional free online PDF converters upload these sensitive files to remote cloud servers often located outside the European Union.'
                        : "Nel contesto lavorativo moderno, i file PDF rappresentano il formato universale per contratti commerciali, dichiarazioni fiscali (come il Modello 730 o Redditi), buste paga, cartelle cliniche e documenti d'identità. Tuttavia, la maggior parte degli utenti ignora che utilizzare i tradizionali convertitori PDF gratuiti online comporta il caricamento di questi file altamente riservati su server cloud remoti, spesso situati al di fuori dell'Unione Europea."}
                    </p>
                    <p>
                      {currentLang === 'de'
                        ? 'Gemäß Artikel 32 der Datenschutz-Grundverordnung (DSGVO EU 2016/679) ist der Verantwortliche verpflichtet, geeignete technische und organisatorische Maßnahmen zu treffen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten. Die unbefugte Übermittlung von Unternehmens- oder Personaldokumenten an unbekannte Server Dritter stellt eine potenzielle Datenpanne (Data Breach) mit empfindlichen Bußgeldern dar.'
                        : currentLang === 'en'
                        ? 'Under Article 32 of the General Data Protection Regulation (GDPR EU 2016/679), data controllers must implement appropriate technical and organizational measures to ensure security commensurate with risk. Transmitting corporate or personal documents to unknown third-party servers constitutes a potential data breach.'
                        : "Secondo l'Articolo 32 del Regolamento Generale sulla Protezione dei Dati (GDPR UE 2016/679), il titolare del trattamento è obbligato a mettere in atto misure tecniche e organizzative adeguate per garantire un livello di sicurezza commisurato al rischio. L'invio non autorizzato di documenti aziendali o personali a server terzi sconosciuti costituisce una potenziale violazione dei dati (data breach) con sanzioni rilevanti."}
                    </p>
                    <p className="font-semibold text-slate-800">
                      {currentLang === 'de'
                        ? 'MyPdfTools setzt auf das Prinzip «Privacy by Design» (Art. 25 DSGVO): Dateien werden niemals an einen Server gesendet. Die Verarbeitung findet vollständig auf dem lokalen Endgerät des Nutzers statt, wodurch jedes Risiko von Abfangen, unbefugter Speicherung oder unrechtmäßigem Zugriff durch Dritte ausgeschlossen wird.'
                        : currentLang === 'en'
                        ? 'MyPdfTools adopts the "Privacy by Design" principle (Art. 25 GDPR): files are never transmitted to any server. Processing takes place entirely on the user’s local device, eliminating any risk of interception, unauthorized storage, or third-party access.'
                        : "MyPdfTools adotta il principio del «Privacy by Design» (Art. 25 GDPR): i file non vengono mai inviati a nessun server. L'elaborazione avviene interamente sul dispositivo locale dell'utente, eliminando alla radice ogni rischio di intercettazione, archiviazione non autorizzata o accesso illecito da parte di terzi."}
                    </p>
                  </div>
                </article>

                {/* Article 2 */}
                <article className="bg-white/95 rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                    <span>{currentLang === 'de' ? 'Webarchitektur' : currentLang === 'en' ? 'Web Architecture' : 'Architettura Web'}</span>
                    <span>&bull;</span>
                    <span>{currentLang === 'de' ? 'Lesezeit: 3 Min.' : currentLang === 'en' ? '3 min read' : 'Tempo di lettura: 3 min'}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    {currentLang === 'de'
                      ? '100% Client-Side Webarchitektur: Wie WebAssembly und HTML5 Ihre Dokumente schützen'
                      : currentLang === 'en'
                      ? '100% Client-Side Browser Architecture: How WebAssembly and HTML5 Protect Your Files'
                      : 'Architettura 100% Client-Side nel Browser: Come WebAssembly e HTML5 Proteggono i Tuoi File'}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                    <p>
                      {currentLang === 'de'
                        ? 'Jahrelang erforderten komplexe Operationen an PDF-Dateien (wie das Zusammenfügen mehrseitiger Dokumente oder das Rasterisieren hochauflösender Bilder) serverseitige Bibliotheken (wie Ghostscript oder Poppler). Dies zwang Nutzer zu zeitraubenden Uploads und Downloads.'
                        : currentLang === 'en'
                        ? 'For years, advanced PDF operations—such as merging multi-page documents, compressing object streams, or rasterizing high-resolution images—required server-side software libraries like Ghostscript or Poppler, forcing users to endure slow upload and download queues.'
                        : "Per anni, le operazioni avanzate su file PDF (come l'unione di documenti multipagina, la compressione degli stream di oggetti o la rasterizzazione di immagini ad alta risoluzione) hanno richiesto potenti librerie software eseguite su server dedicati (ad esempio basati su Ghostscript o Poppler). Questo modello tradizionale imponeva agli utenti di attendere lenti tempi di upload e download."}
                    </p>
                    <p>
                      {currentLang === 'de'
                        ? 'Mit WebAssembly (Wasm) und modernen HTML5 Canvas APIs können moderne Browser (Chrome, Safari, Firefox, Edge) nun kompilierte Hochleistungsprogramme direkt in der geschützten Sandbox des Clients ausführen.'
                        : currentLang === 'en'
                        ? 'With WebAssembly (Wasm) and modern HTML5 Canvas APIs, browsers (Chrome, Safari, Firefox, Edge) can now execute compiled, high-performance binary engines directly inside the client’s isolated security sandbox.'
                        : "Con l'avvento di WebAssembly (Wasm) e delle moderne API HTML5 Canvas, i browser moderni (Chrome, Safari, Firefox, Edge) sono ora in grado di eseguire codice compilato ad altissime prestazioni direttamente all'interno della sandbox protetta del client."}
                    </p>
                    <p>
                      {currentLang === 'de'
                        ? 'Wenn Sie ein Tool auf MyPdfTools auswählen, liest die Verarbeitungs-Engine die Datei direkt aus dem Arbeitsspeicher Ihres Endgeräts. Mathematische Berechnungen und Optimierungen erfolgen lokal in Echtzeit. Sie können sogar das WLAN deaktivieren – MyPdfTools arbeitet nahtlos offline weiter.'
                        : currentLang === 'en'
                        ? 'When you select a tool on MyPdfTools, the processing engine reads the document bytes directly from your device RAM. Cross-reference (xref) table rebuilding and Flate compression occur instantaneously on your machine—even if you disconnect from Wi-Fi.'
                        : 'Quando selezioni uno strumento su MyPdfTools, il motore di elaborazione legge i byte del documento direttamente dalla memoria RAM del tuo dispositivo. I calcoli matematici, la ricomposizione delle tabelle dei riferimenti incrociati (xref) e la compressione Flate avvengono istantaneamente a livello locale. Puoi persino disattivare la connessione Wi-Fi: MyPdfTools continuerà a elaborare i tuoi documenti senza alcuna interruzione.'}
                    </p>
                  </div>
                </article>

                {/* Article 3 */}
                <article className="bg-white/95 rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                    <span>{currentLang === 'de' ? 'Optimierung & E-Mail' : currentLang === 'en' ? 'Optimization & Email' : 'Ottimizzazione & PEC'}</span>
                    <span>&bull;</span>
                    <span>{currentLang === 'de' ? 'Lesezeit: 4 Min.' : currentLang === 'en' ? '4 min read' : 'Tempo di lettura: 4 min'}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    {currentLang === 'de'
                      ? 'Leitfaden zur intelligenten Komprimierung: PDF-Dateigröße ohne Qualitätsverlust verringern'
                      : currentLang === 'en'
                      ? 'Guide to Smart PDF Compression: Reducing File Size Without Losing Visual Quality'
                      : 'Guida alla Compressione Intelligente: Ridurre le Dimensioni dei PDF Senza Perdere Qualità'}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                    <p>
                      {currentLang === 'de'
                        ? 'In Deutschland und Europa erfordert der digitale Versand von Rechnungen, ELSTER-Steuerbelegen, Behördenunterlagen oder Bewerbungen oft strenge Dateigrößen-Limits (häufig 5 MB bis 20 MB). Zu hoch aufgelöste Scans blockieren oft den E-Mail-Postausgang.'
                        : currentLang === 'en'
                        ? 'Submitting public administration forms, legal filings, tax attachments, or job applications frequently imposes strict attachment size limits (often 5 MB to 30 MB). High-resolution scanner outputs with redundant metadata can easily block submission.'
                        : "In Italia e in Europa, l'invio telematico di atti giudiziari (Processo Civile Telematico - PCT), fatture elettroniche, bandi di concorso pubblico o allegati via Posta Elettronica Certificata (PEC) impone rigidi limiti di peso (spesso compresi tra 5 MB e 30 MB per allegato). Documenti scansionati con risoluzioni eccessive o contenenti metadati ridondanti rischiano di bloccare la trasmissione."}
                    </p>
                    <p>
                      {currentLang === 'de'
                        ? 'Eine effektive PDF-Komprimierung kombiniert zwei komplementäre Verfahren: Verlustfreie Struktur-Optimierung (Entfernung redundanter Metadaten bei 100% gestochen scharfem Vektortext) sowie intelligente Bild-Neuberechnung auf 150–200 DPI für optimale Lesbarkeit.'
                        : currentLang === 'en'
                        ? 'Effective PDF compression balances two techniques: lossless stream optimization (stripping obsolete metadata while keeping vector text 100% sharp) and intelligent image downsampling to 150–200 DPI for crisp screen and print legibility.'
                        : "Una compressione PDF efficace combina due tecniche complementari: l'ottimizzazione lossless dei flussi (rimozione di metadati inutilizzati, anteprime obsolete e flussi XML duplicati mantenendo il testo vettoriale nitido al 100%) e il ricampionamento intelligente delle immagini raster incorporate a 150-200 DPI, ideale per la lettura su schermo e la stampa da ufficio."}
                    </p>
                    <p>
                      {currentLang === 'de'
                        ? 'Mit dem lokalen Komprimierungs-Tool von MyPdfTools reduzieren Sie die Dateigröße drastisch unter Einhaltung aller technischen Behördenstandards.'
                        : currentLang === 'en'
                        ? 'Using MyPdfTools’ local compression engine, you can drastically reduce PDF file weights while meeting technical requirements for public portals and certified email.'
                        : 'Utilizzando lo strumento di compressione locale di MyPdfTools, puoi ridurre drasticamente le dimensioni dei tuoi PDF nel rispetto dei requisiti di conformità tecnica degli enti pubblici, dei portali ministeriali e dei gestori PEC.'}
                    </p>
                  </div>
                </article>

                {/* Article 4 */}
                <article className="bg-white/95 rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-4 text-left">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 uppercase tracking-wide">
                    <span>{currentLang === 'de' ? 'Dokumentenstandards' : currentLang === 'en' ? 'Document Standards' : 'Standard Documentali'}</span>
                    <span>&bull;</span>
                    <span>{currentLang === 'de' ? 'Lesezeit: 3 Min.' : currentLang === 'en' ? '3 min read' : 'Tempo di lettura: 3 min'}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 leading-snug">
                    {currentLang === 'de'
                      ? 'Hochwertige Dokumentenkonvertierung: Von Bildern (JPG, PNG) und Office zu Standard-PDF'
                      : currentLang === 'en'
                      ? 'High-Fidelity Document Conversion: From Images (JPG, PNG) and Office to Standard PDF'
                      : 'Conversione Documentale ad Alta Fedeltà: Da Immagini (JPG, PNG) e Office a PDF Standard'}
                  </h3>
                  <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                    <p>
                      {currentLang === 'de'
                        ? 'Die langfristige Archivierung von Dokumenten erfordert stabile, ISO-konforme Formate. Das Konvertieren von Smartphone-Fotos oder gescannten Ausweisen und Belegen in PDF darf weder Proportionen verzerren noch die Lesbarkeit beeinträchtigen.'
                        : currentLang === 'en'
                        ? 'Long-term document archiving requires stable, ISO-compliant formats. Converting smartphone photos, ID cards, or scanned receipts into PDF must preserve aspect ratios and typographic clarity without distortion.'
                        : 'La conservazione documentale a lungo termine richiede formati stabili, conformi alle specifiche internazionali ISO. Convertire fotografie scattate da smartphone, documenti di riconoscimento (fronte/retro) o ricevute scannerizzate in formato PDF non deve comportare distorsioni delle proporzioni né perdita di leggibilità dei caratteri tipografici.'}
                    </p>
                    <p>
                      {currentLang === 'de'
                        ? 'Der JPG-in-PDF-Konverter von MyPdfTools berechnet automatisch das Seitenverhältnis jedes Bildes und ermöglicht die Anpassung an DIN-A4-Standards mit sauberen Rändern oder den Erhalt der Originalauflösung.'
                        : currentLang === 'en'
                        ? 'The MyPdfTools JPG-to-PDF converter automatically calculates native aspect ratios for each image, allowing you to standardize pages onto international DIN A4 sheets with clean margins.'
                        : "Il convertitore da JPG a PDF di MyPdfTools calcola automaticamente le proporzioni native di ciascuna immagine, consentendo all'utente di scegliere tra l'adattamento ai formati standard (come l'A4 internazionale con margini di sicurezza) o il mantenimento della risoluzione originale."}
                    </p>
                    <p>
                      {currentLang === 'de'
                        ? 'Darüber hinaus stellt die Office-Konvertierung sicher, dass Schriftarten, Layout und Zeilenabstände originalgetreu erhalten bleiben – bereit für behördliche Einreichungen oder digitale Signaturen.'
                        : currentLang === 'en'
                        ? 'Furthermore, our Office conversion tools preserve fonts, pagination, and line spacing faithfully, producing documents ready for institutional sharing or digital signing.'
                        : "Inoltre, la conversione da formati Office garantisce che font, impaginazione e interlinea vengano preservati fedelmente, producendo documenti pronti per la condivisione istituzionale, la firma con Carta d'Identità Elettronica (CIE/SPID) o l'archiviazione notarile."}
                    </p>
                  </div>
                </article>
              </div>
            </section>

            {/* Comprehensive Homepage FAQ Section */}
            <section className="max-w-[1500px] mx-auto mt-20 px-4 sm:px-6 lg:px-10 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                  {currentLang === 'de' ? 'Schnelle Antworten' : currentLang === 'en' ? 'Quick Answers' : 'Risposte Immediate'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {currentLang === 'de'
                    ? 'Häufig gestellte Fragen zu MyPdfTools'
                    : currentLang === 'en'
                    ? 'Frequently Asked Questions About MyPdfTools'
                    : 'Domande Frequenti su MyPdfTools'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  {currentLang === 'de'
                    ? 'Alles, was Sie über Sicherheit, Kosten und die Funktionsweise unserer Plattform wissen müssen.'
                    : currentLang === 'en'
                    ? 'Everything you need to know about security, pricing, and how our local browser platform operates.'
                    : "Tutto quello che c'è da sapere sulla sicurezza, i costi e il funzionamento della nostra piattaforma."}
                </p>
              </div>

              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {currentLang === 'de'
                      ? 'Werden meine PDF-Dateien oder persönliche Daten ins Internet hochgeladen?'
                      : currentLang === 'en'
                      ? 'Are my PDF files or personal information uploaded to the internet?'
                      : 'I miei file PDF o le mie informazioni personali vengono caricati su Internet?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLang === 'de'
                      ? 'Absolut nicht. Im Gegensatz zu fast allen konkurrierenden Diensten operiert MyPdfTools zu 100% in Ihrem Webbrowser mittels lokalem WebAssembly-Code. Keine Datei, kein Bild und keine vertrauliche Information verlässt jemals den Arbeitsspeicher Ihres Endgeräts.'
                      : currentLang === 'en'
                      ? 'Absolutely not. Unlike traditional online services, MyPdfTools operates 100% inside your web browser using local WebAssembly code. No file, image, or confidential information ever leaves your device RAM.'
                      : "Assolutamente no. A differenza di quasi tutti gli altri servizi concorrenti, MyPdfTools opera al 100% all'interno del tuo browser web tramite codice WebAssembly locale. Nessun file, immagine o dato confidenziale lascia mai la memoria RAM del tuo dispositivo."}
                  </p>
                </div>

                <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {currentLang === 'de'
                      ? 'Ist der Dienst wirklich kostenlos? Gibt es versteckte Kosten oder Abonnements?'
                      : currentLang === 'en'
                      ? 'Is the service completely free? Are there hidden fees or subscriptions?'
                      : 'Il servizio è completamente gratuito? Ci sono costi nascosti o abbonamenti?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLang === 'de'
                      ? 'MyPdfTools ist zu 100% kostenlos. Wir verlangen weder Registrierungen noch Kreditkarten, noch begrenzen wir die Anzahl der konvertierbaren Seiten oder Dateien. Die Plattform finanziert sich durch dezente, transparente Anzeigen.'
                      : currentLang === 'en'
                      ? 'MyPdfTools is 100% free. We do not require registrations, credit cards, or watermarks, nor do we limit the number of pages or files you can process.'
                      : 'MyPdfTools è gratuito al 100%. Non richiediamo registrazioni, carte di credito, né limitiamo il numero di file o pagine che puoi convertire. La piattaforma è supportata da annunci pubblicitari non invasivi e trasparenti.'}
                  </p>
                </div>

                <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {currentLang === 'de'
                      ? 'Kann ich MyPdfTools für vertrauliche Geschäfts- oder Behördendokumente nutzen?'
                      : currentLang === 'en'
                      ? 'Can I use MyPdfTools for confidential legal, medical, or tax documents?'
                      : 'Posso usare MyPdfTools per documenti legali, sanitari o fiscali riservati?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLang === 'de'
                      ? 'Ja, genau dafür wurde MyPdfTools entwickelt. Da keine Dateien über das Internet übertragen werden, können Steuerberater, Anwälte, Ärzte und Unternehmen sensible Daten vollkommen DSGVO-konform (EU 2016/679) verarbeiten.'
                      : currentLang === 'en'
                      ? 'Yes, that is exactly why MyPdfTools was built. Because zero bytes are transmitted to external servers, accountants, doctors, lawyers, and businesses can process sensitive files in full compliance with GDPR (EU 2016/679).'
                      : 'Sì, è proprio per questo scopo che MyPdfTools è stato creato. Poiché nessun file viene inviato sui server, professionisti come commercialisti, medici, avvocati e consulenti possono elaborare documenti contenenti dati sensibili in piena conformità con il GDPR (UE 2016/679).'}
                  </p>
                </div>

                <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {currentLang === 'de'
                      ? 'Wie kann ich überprüfen, ob die Plattform wirklich offline funktioniert?'
                      : currentLang === 'en'
                      ? 'How can I verify that the platform truly works offline?'
                      : 'Come posso verificare che la piattaforma funzioni davvero senza connessione?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLang === 'de'
                      ? 'Machen Sie diesen einfachen Test: Öffnen Sie ein beliebiges Tool (z.B. PDF zusammenfügen), trennen Sie Ihr WLAN oder aktivieren Sie den Flugmodus und ziehen Sie Ihre Dateien hinein. Der Vorgang wird sofort komplett offline ausgeführt!'
                      : currentLang === 'en'
                      ? 'Try this simple test: open any tool (such as Merge PDF), disconnect your Wi-Fi or turn on Airplane Mode, and drop your files in. The operation will complete instantaneously offline!'
                      : "Fai questa semplice prova: apri uno strumento qualsiasi (ad esempio Unisci PDF), disconnetti il Wi-Fi o attiva la modalità aereo, e trascina i tuoi file. Vedrai che l'operazione verrà completata all'istante anche da offline!"}
                  </p>
                </div>

                <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {currentLang === 'de'
                      ? 'Gibt es eine Beschränkung der maximalen Dateigröße?'
                      : currentLang === 'en'
                      ? 'Is there a limit on the maximum file size I can process?'
                      : 'Esiste un limite alla dimensione massima dei file caricabili?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLang === 'de'
                      ? 'Es gibt keinerlei künstliche Beschränkungen unsererseits. Die einzige Grenze ist der verfügbare Arbeitsspeicher (RAM) Ihres Computers oder Smartphones, wodurch auch große Dateien problemlos verarbeitet werden können.'
                      : currentLang === 'en'
                      ? 'There are no artificial file size limits imposed by us. The only limit is the available RAM on your computer or smartphone, allowing large multi-megabyte documents to be processed smoothly.'
                      : "Non c'è alcun limite artificiale imposto da noi. L'unico limite è dato dalla memoria RAM disponibile sul tuo computer o smartphone, il che consente di elaborare anche file di centinaia di megabyte senza blocchi."}
                  </p>
                </div>

                <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {currentLang === 'de'
                      ? 'Wer entwickelt und betreibt die Plattform MyPdfTools?'
                      : currentLang === 'en'
                      ? 'Who develops and maintains the MyPdfTools platform?'
                      : 'Chi sviluppa e gestisce la piattaforma MyPdfTools?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLang === 'de'
                      ? 'Die Plattform wird von Shifat Manjum & Saiful Islam (Zentixx) betrieben und gepflegt. Weitere Informationen finden Sie auf den Seiten Über uns, Impressum und Datenschutz im Fußbereich.'
                      : currentLang === 'en'
                      ? 'The platform is founded and actively maintained by Shifat Manjum & Saiful Islam (Zentixx). Full legal details are available in our About Us, Legal Notice, and Privacy Policy pages in the footer.'
                      : 'La piattaforma è fondata e attivamente curata da Shifat Manjum & Saiful Islam (Zentixx). Puoi trovare maggiori dettagli nelle pagine Chi Siamo, Note Legali e Informativa sulla Privacy nel piè di pagina.'}
                  </p>
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
