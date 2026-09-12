import React, { useState } from 'react';
import { Language } from '../i18n/translations';
import { ShieldCheck, Scale, Calculator, Users, Briefcase, CheckCircle2, Lock, ArrowRight, Cpu, WifiOff } from 'lucide-react';

interface ProfessionalTrustSectionProps {
  currentLang: Language;
  onOpenPrivacyModal: () => void;
}

interface PersonaData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  badge: string;
  description: string;
  examples: string[];
}

export const ProfessionalTrustSection: React.FC<ProfessionalTrustSectionProps> = ({
  currentLang = 'it',
  onOpenPrivacyModal,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const CONTENT: Record<Language, {
    badge: string;
    headline: string;
    subheadline: string;
    gdprBadge: string;
    ramBadge: string;
    personas: PersonaData[];
    verificationNote: string;
    verifyAction: string;
    offlinePrompt: string;
  }> = {
    it: {
      badge: 'Conformità GDPR Art. 28 • Sicurezza per Dati Riservati',
      headline: 'La scelta sicura per Commercialisti, Avvocati, HR e Professionisti',
      subheadline: 'Caricare contratti, buste paga e documenti fiscali su convertitori cloud viola il GDPR e mette a rischio la riservatezza dei tuoi clienti. Con MyPdfTools, i file vengono elaborati unicamente nella RAM del tuo browser: zero upload, zero sub-processori terzi.',
      gdprBadge: 'Nessun Sub-responsabile del Trattamento (Zero Terze Parti)',
      ramBadge: 'Elaborazione al 100% nella memoria del dispositivo',
      personas: [
        {
          id: 'accounting',
          icon: Calculator,
          title: 'Commercialisti & Fisco',
          badge: 'Fatture & Fiscale',
          description: 'Elabora dichiarazioni fiscali, bilanci, CU e modelli F24 senza che escano mai dalla tua postazione di lavoro.',
          examples: ['Unione di ricevute e bilanci d’esercizio', 'Protezione con password di cedolini fiscali', 'Conversione istantanea da/a immagini per perizie'],
        },
        {
          id: 'legal',
          icon: Scale,
          title: 'Avvocati & Studi Legali',
          badge: 'Segreto Professionale',
          description: 'Mantieni intatto il segreto professionale: atti giudiziari, accordi di riservatezza (NDA) e contratti d’affari non transitano su Internet.',
          examples: ['Firma di contratti e accordi preliminari', 'Numerazione pagine per fascicoli di causa', 'Divisione ed estrazione di allegati legali'],
        },
        {
          id: 'hr',
          icon: Users,
          title: 'Risorse Umane & HR',
          badge: 'Privacy Dipendenti',
          description: 'Gestisci buste paga, contratti di lavoro e documenti d’identità del personale nel pieno rispetto dello statuto dei lavoratori e del GDPR.',
          examples: ['Unione contratti e schede anagrafiche', 'Filigrana riservata su documenti interni', 'Organizzazione di fascicoli del personale'],
        },
        {
          id: 'freelance',
          icon: Briefcase,
          title: 'Freelance & Consulenti',
          badge: 'Costo Zero & Veloce',
          description: 'Firma preventivi, unisci report e converti documenti per i tuoi clienti senza pagare 20€/mese per licenze software proprietarie.',
          examples: ['Firma digitale visiva di accordi e preventivi', 'Compressione PDF per invio rapido via email', 'Conversione di report in formato condivisibile'],
        },
      ],
      verificationNote: 'Verifica tecnica immediata: Apri gli Strumenti di Sviluppo (tasto F12 > scheda Network) o stacca il Wi-Fi. Noterai che non viene inviato nemmeno un singolo byte del tuo file.',
      verifyAction: 'Consulta la Garanzia di Privacy Tecnica',
      offlinePrompt: 'Funziona anche al 100% offline via Desktop PWA',
    },
    de: {
      badge: 'DSGVO Art. 28 Konformität • Schutz sensibler Berufsdaten',
      headline: 'Die sichere Wahl für Steuerberater, Anwälte, HR und Freiberufler',
      subheadline: 'Das Hochladen von Verträgen, Gehaltsabrechnungen und Steuerdaten in Online-Clouds gefährdet das Berufsgeheimnis und verstößt gegen Datenschutzauflagen. MyPdfTools verarbeitet alle Dokumente ausschließlich lokal im Arbeitsspeicher Ihres Browsers.',
      gdprBadge: 'Keine Unterauftragsverarbeiter (Keine Drittparteien)',
      ramBadge: '100% Verarbeitung im lokalen Arbeitsspeicher',
      personas: [
        {
          id: 'accounting',
          icon: Calculator,
          title: 'Steuerberater & Buchhaltung',
          badge: 'Steuern & Finanzen',
          description: 'Steuererklärungen, Bilanzen, Belege und Finanzberichte bearbeiten, ohne dass vertrauliche Daten Ihr Büro verlassen.',
          examples: ['Zusammenfügen von Jahresabschlüssen und Belegen', 'Passwortschutz für vertrauliche Steuerakten', 'Konvertierung von Prüfberichten und Rechnungen'],
        },
        {
          id: 'legal',
          icon: Scale,
          title: 'Rechtsanwälte & Notare',
          badge: 'Anwaltsgeheimnis',
          description: 'Schützen Sie das Mandantengeheimnis: Verträge, Schriftsätze, Gutachten und NDAs gelangen niemals auf fremde Server.',
          examples: ['Signieren von Mandatsvereinbarungen', 'Paginierung von Gerichts- und Beweisakten', 'Extrahieren vertraulicher Vertragsanhänge'],
        },
        {
          id: 'hr',
          icon: Users,
          title: 'Personalwesen & HR',
          badge: 'Mitarbeiterdaten',
          description: 'Gehaltsabrechnungen, Arbeitsverträge und Personalakten unter strenger Einhaltung der Mitarbeiter-Datenschutzrichtlinien handhaben.',
          examples: ['Zusammenführung von Arbeitsverträgen & Zeugnissen', 'Vertraulichkeits-Wasserzeichen auf Dokumenten', 'Reorganisation von Bewerberunterlagen'],
        },
        {
          id: 'freelance',
          icon: Briefcase,
          title: 'Freiberufler & Berater',
          badge: 'Kostenfrei & Flexibel',
          description: 'Kundenangebote unterschreiben, Projektberichte komprimieren und Dokumente bearbeiten – ohne teure monatliche Adobe-Abonnements.',
          examples: ['Visuelle Unterschrift auf Angeboten', 'PDF-Komprimierung für den E-Mail-Versand', 'Zuverlässige Offline-Nutzung beim Kunden vor Ort'],
        },
      ],
      verificationNote: 'Sofortiger technischer Beweis: Öffnen Sie die Entwicklertools (Taste F12 > Netzwerk) oder trennen Sie Ihr WLAN. Es wird kein einziges Byte Ihrer Datei übertragen.',
      verifyAction: 'Technische Datenschutz-Garantie ansehen',
      offlinePrompt: 'Funktioniert zu 100% offline als Desktop-App',
    },
    en: {
      badge: 'GDPR Art. 28 Compliance • Enterprise-Grade Confidentiality',
      headline: 'The Safe Choice for Accountants, Legal Teams, HR & Freelancers',
      subheadline: 'Uploading contracts, payroll, and tax filings to cloud PDF tools introduces severe compliance and data breach liabilities. With MyPdfTools, documents are processed entirely inside your browser memory: zero cloud uploads, zero data sub-processors.',
      gdprBadge: 'Zero Third-Party Sub-processors (No Cloud Exposure)',
      ramBadge: '100% Local Browser Memory Execution',
      personas: [
        {
          id: 'accounting',
          icon: Calculator,
          title: 'Accountants & Tax Pros',
          badge: 'Taxes & Financials',
          description: 'Process tax filings, audits, balance sheets, and invoices with complete confidence that client financial records never leak.',
          examples: ['Combine annual statements and receipts', 'Password protect sensitive client tax returns', 'Convert scans to clean PDF formats in seconds'],
        },
        {
          id: 'legal',
          icon: Scale,
          title: 'Lawyers & Legal Counsel',
          badge: 'Attorney-Client Privilege',
          description: 'Uphold strict professional confidentiality: NDAs, litigation filings, and client agreements never touch remote web servers.',
          examples: ['Sign confidential settlement agreements', 'Bates-style page numbering for legal exhibits', 'Extract and split sensitive case evidence'],
        },
        {
          id: 'hr',
          icon: Users,
          title: 'HR & People Operations',
          badge: 'Employee Privacy',
          description: 'Handle employee payroll summaries, IDs, background checks, and employment agreements in full compliance with privacy regulations.',
          examples: ['Merge employment contracts and onboarding packs', 'Apply confidential watermarks to internal guidelines', 'Organize personnel review binders securely'],
        },
        {
          id: 'freelance',
          icon: Briefcase,
          title: 'Freelancers & Consultants',
          badge: '100% Free & Fast',
          description: 'Sign proposals, merge deliverables, and convert client decks effortlessly without paying $20/month for Adobe Acrobat subscriptions.',
          examples: ['Sign client proposals & NDAs instantly', 'Compress large presentation decks for email', 'Work completely offline on airplanes or remote sites'],
        },
      ],
      verificationNote: 'Instant technical proof: Open Developer Tools (F12 > Network tab) or turn off your Wi-Fi. You will see exactly 0 bytes of your document transmitted.',
      verifyAction: 'View Technical Privacy Guarantee',
      offlinePrompt: 'Works 100% offline as installable desktop app',
    },
  };

  const content = CONTENT[currentLang] || CONTENT.it;
  const currentPersona = content.personas[activeTab] || content.personas[0];
  const PersonaIcon = currentPersona.icon;

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 mt-8 mb-10">
      <div className="bg-gradient-to-br from-white/95 via-slate-50/90 to-emerald-50/40 rounded-3xl border border-slate-200/90 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.05)] p-6 sm:p-10 relative overflow-hidden backdrop-blur-sm">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{content.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {content.headline}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {content.subheadline}
          </p>
        </div>

        {/* Quick Compliance Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-[11px] sm:text-xs font-bold text-slate-700">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{content.gdprBadge}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>{content.ramBadge}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <WifiOff className="w-3.5 h-3.5 text-teal-600" />
            <span>{content.offlinePrompt}</span>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-4xl mx-auto">
          {content.personas.map((persona, idx) => {
            const Icon = persona.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={persona.id}
                onClick={() => setActiveTab(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 scale-[1.02]'
                    : 'bg-white/80 hover:bg-white text-slate-800 border-slate-200/80 hover:border-emerald-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {persona.badge}
                  </span>
                </div>
                <div className="mt-3 font-black text-xs">
                  {persona.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Role Feature Detail Box */}
        <div className="mt-6 max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <PersonaIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{currentPersona.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{currentPersona.description}</p>
              </div>
            </div>
            <button
              onClick={onOpenPrivacyModal}
              className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-700 hover:underline cursor-pointer shrink-0"
            >
              <span>{content.verifyAction}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentPersona.examples.map((example, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-semibold bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{example}</span>
              </div>
            ))}
          </div>

          {/* Technical Proof Banner */}
          <div className="mt-5 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-center justify-between flex-wrap gap-2 text-xs text-emerald-900 font-medium">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span className="text-[11px] sm:text-xs">{content.verificationNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
