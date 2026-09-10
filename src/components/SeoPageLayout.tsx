import React, { useState, useEffect } from 'react';
import { SeoRouteData, SEO_ROUTES } from '../data/seoRoutes';
import { TOOLS } from '../data/tools';
import { ToolItem } from '../types';
import { ToolIcon } from './ToolIcon';
import { AdBanner } from './AdBanner';
import { ShieldCheck, HelpCircle, ArrowLeft, ChevronDown, ChevronUp, Lock, Zap, ArrowRight } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

/* Dynamically imported tool components */
const JpgToPdfTool = React.lazy(() => import('../tools/JpgToPdfTool').then(m => ({ default: m.JpgToPdfTool })));
const PdfToJpgTool = React.lazy(() => import('../tools/PdfToJpgTool').then(m => ({ default: m.PdfToJpgTool })));
const MergePdfTool = React.lazy(() => import('../tools/MergePdfTool').then(m => ({ default: m.MergePdfTool })));
const SplitPdfTool = React.lazy(() => import('../tools/SplitPdfTool').then(m => ({ default: m.SplitPdfTool })));
const RotatePdfTool = React.lazy(() => import('../tools/RotatePdfTool').then(m => ({ default: m.RotatePdfTool })));
const OrganizePdfTool = React.lazy(() => import('../tools/OrganizePdfTool').then(m => ({ default: m.OrganizePdfTool })));
const WatermarkPdfTool = React.lazy(() => import('../tools/WatermarkPdfTool').then(m => ({ default: m.WatermarkPdfTool })));
const PageNumbersTool = React.lazy(() => import('../tools/PageNumbersTool').then(m => ({ default: m.PageNumbersTool })));
const ProtectPdfTool = React.lazy(() => import('../tools/ProtectPdfTool').then(m => ({ default: m.ProtectPdfTool })));
const SignPdfTool = React.lazy(() => import('../tools/SignPdfTool').then(m => ({ default: m.SignPdfTool })));
const PdfToMarkdownTool = React.lazy(() => import('../tools/PdfToMarkdownTool').then(m => ({ default: m.PdfToMarkdownTool })));
const GenericPdfTool = React.lazy(() => import('../tools/GenericPdfTool').then(m => ({ default: m.GenericPdfTool })));

interface SeoPageLayoutProps {
  routeData: SeoRouteData;
  onNavigate: (path: string) => void;
  onOpenPrivacyModal: () => void;
}

export const SeoPageLayout: React.FC<SeoPageLayoutProps> = ({
  routeData,
  onNavigate,
  onOpenPrivacyModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toolItem: ToolItem = TOOLS.find((t) => t.id === routeData.toolId) || TOOLS[0];
  const lang: Language = routeData.lang;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.it;

  // Dynamic meta update on client-side route transitions
  useEffect(() => {
    document.title = routeData.metaTitle;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', routeData.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', routeData.canonical);

    // Dynamic FAQ Schema Injection
    const schemaScriptId = 'faq-schema-jsonld';
    let schemaScript = document.getElementById(schemaScriptId) as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = schemaScriptId;
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: routeData.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };
    schemaScript.text = JSON.stringify(faqSchema);
  }, [routeData]);

  const renderTool = () => {
    switch (routeData.toolId) {
      case 'jpg-to-pdf':
        return <JpgToPdfTool currentLang={lang} />;
      case 'pdf-to-jpg':
        return <PdfToJpgTool currentLang={lang} />;
      case 'merge-pdf':
        return <MergePdfTool currentLang={lang} />;
      case 'split-pdf':
        return <SplitPdfTool currentLang={lang} />;
      case 'rotate-pdf':
        return <RotatePdfTool currentLang={lang} />;
      case 'organize-pdf':
        return <OrganizePdfTool currentLang={lang} />;
      case 'watermark':
        return <WatermarkPdfTool currentLang={lang} />;
      case 'page-numbers':
        return <PageNumbersTool currentLang={lang} />;
      case 'protect-pdf':
        return <ProtectPdfTool mode="protect" currentLang={lang} />;
      case 'unlock-pdf':
        return <ProtectPdfTool mode="unlock" currentLang={lang} />;
      case 'sign-pdf':
        return <SignPdfTool currentLang={lang} />;
      case 'pdf-to-markdown':
        return <PdfToMarkdownTool currentLang={lang} />;
      default:
        return <GenericPdfTool tool={toolItem} currentLang={lang} />;
    }
  };

  const backHomeLabel =
    lang === 'it' ? 'Torna a tutti gli strumenti' : lang === 'de' ? 'Zurück zur Übersicht' : 'Back to all tools';

  const relatedTitle =
    lang === 'it' ? 'Altri strumenti PDF consigliati' : lang === 'de' ? 'Weitere empfohlene PDF-Tools' : 'Related PDF Tools';

  return (
    <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-10 py-8 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div>
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{backHomeLabel}</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`w-13 h-13 rounded-2xl flex items-center justify-center ${toolItem.iconBg} shadow-md flex-shrink-0`}>
              <ToolIcon name={toolItem.iconName} className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                  {routeData.h1}
                </h1>
                {routeData.badge && (
                  <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {routeData.badge}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium max-w-3xl leading-relaxed">
                {routeData.intro}
              </p>
            </div>
          </div>

          {/* Privacy Pill */}
          <button
            onClick={onOpenPrivacyModal}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-200 shadow-xs transition-all cursor-pointer flex-shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Client-Side Private</span>
          </button>
        </div>
      </div>

      {/* Top Ad Slot */}
      <AdBanner format="horizontal" />

      {/* Interactive Tool Container with Zentixx Box Shadow */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),0_10px_20px_-5px_rgba(0,0,0,0.04)] p-6 sm:p-8 ring-1 ring-slate-900/5 min-h-[380px]">
        <React.Suspense
          fallback={
            <div className="flex flex-col items-center justify-center min-h-[320px]">
              <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-xs font-bold text-slate-400">Loading tool...</p>
            </div>
          }
        >
          {renderTool()}
        </React.Suspense>
      </div>

      {/* Trust & Local Processing Proof */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-emerald-950">
              {lang === 'it' ? 'Elaborazione Sicura al 100% nel tuo Browser' : lang === 'de' ? '100% Lokale Browser-Verarbeitung' : '100% Local In-Browser Processing'}
            </h4>
            <p className="text-xs text-emerald-800 font-medium mt-0.5">
              {lang === 'it'
                ? 'Nessun file viene inviato a server esterni. I tuoi documenti rimangono esclusivamente nella RAM del tuo dispositivo.'
                : lang === 'de'
                ? 'Ihre Daten verlassen Ihr Gerät nicht. Alle Rechenoperationen laufen verschlüsselt im lokalen Arbeitsspeicher.'
                : 'Zero bytes uploaded. Your documents never leave your computer or phone memory.'}
            </p>
          </div>
        </div>
        <button
          onClick={onOpenPrivacyModal}
          className="text-xs font-black text-emerald-700 hover:text-emerald-900 whitespace-nowrap cursor-pointer"
        >
          {t.hero.privacyButton} &rarr;
        </button>
      </div>

      {/* How-To 3-Step Guide */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          {lang === 'it'
            ? `Come usare ${routeData.h1} in 3 semplici passaggi`
            : lang === 'de'
            ? `So funktioniert ${routeData.h1} in 3 einfachen Schritten`
            : `How to use ${routeData.h1} in 3 easy steps`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {routeData.steps.map((step, idx) => (
            <div key={idx} className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/60 space-y-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-emerald-600 text-white text-xs font-black">
                {idx + 1}
              </span>
              <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion FAQ Section with FAQPage Schema */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-5 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2.5">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {lang === 'it' ? 'Domande Frequenti (FAQ)' : lang === 'de' ? 'Häufig gestellte Fragen (FAQ)' : 'Frequently Asked Questions'}
          </h2>
        </div>
        <div className="space-y-3 pt-2">
          {routeData.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-emerald-700 hover:bg-slate-50/70 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-600 leading-relaxed font-medium border-t border-slate-100 bg-slate-50/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Internal Linking: Related Tools Grid */}
      {routeData.relatedSlugs && routeData.relatedSlugs.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {relatedTitle}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {routeData.relatedSlugs.map((relSlug) => {
              const targetRoute = SEO_ROUTES[relSlug];
              const relTool = targetRoute ? TOOLS.find((t) => t.id === targetRoute.toolId) || toolItem : toolItem;
              const relTitle = targetRoute?.h1 || relSlug;
              const relDesc = targetRoute?.metaDescription || '';

              return (
                <button
                  key={relSlug}
                  onClick={() => onNavigate(`/${relSlug}`)}
                  className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_30px_-6px_rgba(16,185,129,0.18)] hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-600 transition-colors">
                      <ToolIcon name={relTool.iconName} className="w-5 h-5" />
                    </div>
                    <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                      {relTitle}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 font-medium">
                      {relDesc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{lang === 'it' ? 'Usa strumento' : lang === 'de' ? 'Tool öffnen' : 'Open tool'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

