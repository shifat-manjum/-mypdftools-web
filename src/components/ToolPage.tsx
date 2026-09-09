import React from 'react';
import { ToolItem } from '../types';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { SEO_DATA } from '../data/seoContent';
import { TOOLS } from '../data/tools';
import { AdBanner } from './AdBanner';
import { ShieldCheck, HelpCircle, ArrowLeft } from 'lucide-react';
import * as Icons from 'lucide-react';

import { JpgToPdfTool } from '../tools/JpgToPdfTool';
import { PdfToJpgTool } from '../tools/PdfToJpgTool';
import { MergePdfTool } from '../tools/MergePdfTool';
import { SplitPdfTool } from '../tools/SplitPdfTool';
import { RotatePdfTool } from '../tools/RotatePdfTool';
import { OrganizePdfTool } from '../tools/OrganizePdfTool';
import { WatermarkPdfTool } from '../tools/WatermarkPdfTool';
import { PageNumbersTool } from '../tools/PageNumbersTool';
import { ProtectPdfTool } from '../tools/ProtectPdfTool';
import { SignPdfTool } from '../tools/SignPdfTool';
import { PdfToMarkdownTool } from '../tools/PdfToMarkdownTool';
import { GenericPdfTool } from '../tools/GenericPdfTool';

interface ToolPageProps {
  tool: ToolItem;
  currentLang?: Language;
  onBackToHome: () => void;
  onSelectOtherTool: (toolId: string) => void;
  onOpenPrivacyModal: () => void;
}

export const ToolPage: React.FC<ToolPageProps> = ({
  tool,
  currentLang = 'it',
  onBackToHome,
  onSelectOtherTool,
  onOpenPrivacyModal,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.it;
  const localized = t.tools[tool.id];
  const title = localized?.title || tool.title;
  const description = localized?.description || tool.description;

  const seo = SEO_DATA[tool.id];
  const IconComponent = (Icons as any)[tool.iconName] || Icons.FileText;

  const backLabel =
    currentLang === 'it'
      ? 'Torna a tutti gli strumenti'
      : currentLang === 'de'
      ? 'Zurück zu allen Tools'
      : 'Back to all tools';

  const howToTitle =
    currentLang === 'it'
      ? `Come usare ${title} in 3 semplici passaggi`
      : currentLang === 'de'
      ? `So nutzen Sie ${title} in 3 einfachen Schritten`
      : `How to use ${title} in 3 easy steps`;

  const faqTitle =
    currentLang === 'it'
      ? 'Domande Frequenti'
      : currentLang === 'de'
      ? 'Häufig gestellte Fragen (FAQ)'
      : 'Frequently Asked Questions';

  const relatedTitle =
    currentLang === 'it'
      ? 'Altri strumenti PDF popolari'
      : currentLang === 'de'
      ? 'Weitere beliebte PDF-Werkzeuge'
      : 'Other popular PDF tools';

  const privacyHighlight =
    currentLang === 'it'
      ? 'Elaborazione al 100% nel tuo browser. Nessun file viene trasmesso a server esterni.'
      : currentLang === 'de'
      ? '100% lokale Verarbeitung im Browser. Es werden keine Daten an Server gesendet.'
      : (seo?.privacyHighlight || 'All processing happens in your computer memory. Zero data is sent to external servers.');

  const renderToolBody = () => {
    switch (tool.id) {
      case 'jpg-to-pdf':
        return <JpgToPdfTool />;
      case 'pdf-to-jpg':
        return <PdfToJpgTool />;
      case 'merge-pdf':
        return <MergePdfTool />;
      case 'split-pdf':
        return <SplitPdfTool />;
      case 'rotate-pdf':
        return <RotatePdfTool />;
      case 'organize-pdf':
        return <OrganizePdfTool />;
      case 'watermark':
        return <WatermarkPdfTool />;
      case 'page-numbers':
        return <PageNumbersTool />;
      case 'protect-pdf':
        return <ProtectPdfTool mode="protect" />;
      case 'unlock-pdf':
        return <ProtectPdfTool mode="unlock" />;
      case 'sign-pdf':
        return <SignPdfTool />;
      case 'pdf-to-markdown':
        return <PdfToMarkdownTool />;
      default:
        return <GenericPdfTool tool={tool} />;
    }
  };

  const relatedTools = TOOLS.filter((t) => t.id !== tool.id).slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* Breadcrumb & Title */}
      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{backLabel}</span>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tool.iconBg} shadow-md`}>
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-medium">
                {description}
              </p>
            </div>
          </div>

          {/* Privacy Pill */}
          <button
            onClick={onOpenPrivacyModal}
            className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 text-xs font-extrabold border border-emerald-200/80 shadow-xs transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{t.nav.privateBadge}</span>
          </button>
        </div>
      </div>

      {/* Top Ad Banner Slot */}
      <AdBanner format="horizontal" />

      {/* Main Interactive Tool Container with Zentixx Box Shadow */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.08),0_10px_20px_-5px_rgba(0,0,0,0.04)] p-6 sm:p-8 ring-1 ring-slate-900/5">
        {renderToolBody()}
      </div>

      {/* Trust Callout under Workspace */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-emerald-950">
              {currentLang === 'it' ? 'I tuoi documenti rimangono privati' : currentLang === 'de' ? 'Ihre Dokumente bleiben privat' : 'Your documents stay private'}
            </h4>
            <p className="text-[11px] text-emerald-800 font-medium">
              {privacyHighlight}
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

      {/* Mid-Page Ad Slot */}
      <AdBanner format="horizontal" />

      {/* How It Works Guide */}
      {seo && (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">
            {howToTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {seo.steps.map((step, idx) => (
              <div key={idx} className="space-y-1.5">
                <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">
                  {currentLang === 'it' ? 'Passaggio' : currentLang === 'de' ? 'Schritt' : 'Step'} {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions */}
      {seo && seo.faqs.length > 0 && (
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {faqTitle}
            </h2>
          </div>
          <div className="space-y-3 pt-2">
            {seo.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-1">
                <h4 className="text-xs font-bold text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Tools */}
      <div className="space-y-4 pt-4">
        <h3 className="text-base font-black text-slate-900 tracking-tight">
          {relatedTitle}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {relatedTools.map((rel) => {
            const RelIcon = (Icons as any)[rel.iconName] || Icons.FileText;
            const relLocalized = t.tools[rel.id];
            const relTitle = relLocalized?.title || rel.title;
            const relDesc = relLocalized?.description || rel.description;

            return (
              <button
                key={rel.id}
                onClick={() => onSelectOtherTool(rel.id)}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/90 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_30px_-6px_rgba(16,185,129,0.15)] hover:border-emerald-500/50 hover:-translate-y-1 transition-all duration-300 text-left group flex flex-col justify-between cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-emerald-50 text-slate-700 group-hover:text-emerald-600 transition-colors shadow-2xs">
                  <RelIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {relTitle}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 font-medium">
                    {relDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
