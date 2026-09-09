import React from 'react';
import { Language } from '../i18n/translations';
import { X, ShieldCheck, Heart, Sparkles, ExternalLink, Mail, Globe, Award, Code2 } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  currentLang?: Language;
  onClose: () => void;
}

const ABOUT_CONTENT: Record<Language, any> = {
  it: {
    badge: 'Chi Siamo & Visione',
    title: 'Informazioni su MyPdfTools',
    subtitle: 'La piattaforma PDF progettata per restituire la privacy agli utenti.',
    missionTitle: 'La Nostra Missione',
    missionDesc: 'MyPdfTools è nata per ridefinire gli standard di sicurezza nel mondo dei convertitori PDF online. Rifiutiamo il modello tradizionale che carica documenti confidenziali sui server cloud: con noi ogni conversione avviene al 100% all\'interno del tuo dispositivo.',
    founderTitle: 'Fondatore & Lead Developer',
    founderName: 'Shifat Manjum',
    founderRole: 'Product Architect & Founder di Zentixx',
    founderStoryTitle: 'La Storia Dietro MyPdfTools',
    founderQuote: '«Come molti professionisti, mi sono trovato spesso a dover convertire documenti fiscali, contratti e dati bancari su siti online, con la costante preoccupazione di dove finissero i miei file. Ho creato MyPdfTools per eliminare per sempre questo timore: niente upload, nessun server intermediario, solo elaborazione pura nella memoria del tuo browser.»',
    stats: [
      { label: 'File Caricati sui Server', value: '0%' },
      { label: 'Privacy Garantita', value: '100%' },
      { label: 'Costo per l\'Utente', value: 'Gratis' },
    ],
    contactTitle: 'Connettiti con il Fondatore',
    closeBtn: 'Chiudi',
  },
  en: {
    badge: 'About & Vision',
    title: 'About MyPdfTools',
    subtitle: 'The privacy-first PDF platform engineered for absolute data protection.',
    missionTitle: 'Our Mission',
    missionDesc: 'MyPdfTools was created to challenge the risky standard of cloud converters. Instead of uploading your confidential tax returns, IDs, and financial files to remote servers, our client-side architecture keeps your files 100% on your device.',
    founderTitle: 'Founder & Lead Developer',
    founderName: 'Shifat Manjum',
    founderRole: 'Product Architect & Founder of Zentixx',
    founderStoryTitle: 'The Story Behind MyPdfTools',
    founderQuote: '“Like many users, I constantly converted sensitive legal documents, invoices, and IDs online, always worrying where my files were stored. I engineered MyPdfTools to eliminate this anxiety once and for all: zero uploads, zero server storage, pure private browser computation.”',
    stats: [
      { label: 'Server Uploads', value: '0%' },
      { label: 'Privacy Guaranteed', value: '100%' },
      { label: 'User Cost', value: 'Free' },
    ],
    contactTitle: 'Connect with the Founder',
    closeBtn: 'Close',
  },
  de: {
    badge: 'Über Uns & Vision',
    title: 'Über MyPdfTools',
    subtitle: 'Die datenschutzorientierte PDF-Plattform für kompromisslose Sicherheit.',
    missionTitle: 'Unsere Mission',
    missionDesc: 'MyPdfTools wurde geschaffen, um das Risiko herkömmlicher Cloud-Konverter zu beseitigen. Anstatt sensible Steuerdaten, Ausweise und Verträge auf Server hochzuladen, verarbeitet unsere Technologie alles zu 100% lokal auf Ihrem Gerät.',
    founderTitle: 'Gründer & Chefentwickler',
    founderName: 'Shifat Manjum',
    founderRole: 'Product Architect & Gründer von Zentixx',
    founderStoryTitle: 'Die Geschichte hinter MyPdfTools',
    founderQuote: '„Wie viele Nutzer musste auch ich vertrauliche Dokumente online umwandeln und hatte stets Sorge, wer darauf zugreift. Aus diesem Grund habe ich MyPdfTools gebaut: Keine Server-Uploads, keine Speicherung, reine private Ausführung im Browser.“',
    stats: [
      { label: 'Server-Uploads', value: '0%' },
      { label: 'Datenschutz', value: '100%' },
      { label: 'Kosten für Nutzer', value: 'Kostenlos' },
    ],
    contactTitle: 'Kontakt zum Gründer',
    closeBtn: 'Schließen',
  },
};

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  currentLang = 'it',
  onClose,
}) => {
  if (!isOpen) return null;

  const content = ABOUT_CONTENT[currentLang] || ABOUT_CONTENT.it;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 px-6 py-6 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider mb-2 border border-emerald-500/30">
              <Sparkles className="w-3 h-3" />
              <span>{content.badge}</span>
            </span>
            <h3 className="text-xl font-black tracking-tight">{content.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5">{content.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Mission */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{content.missionTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {content.missionDesc}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-emerald-50/50 border border-slate-200/80 text-center">
            {content.stats.map((st: any, i: number) => (
              <div key={i}>
                <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {st.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Founder Profile Spotlight Card with Zentixx Box Shadow */}
          <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl p-6 border border-emerald-200/80 shadow-[0_15px_35px_-10px_rgba(16,185,129,0.18)] relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              {/* Avatar Initial Badge */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-emerald-500/30 flex-shrink-0 ring-4 ring-white">
                SM
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">
                    {content.founderName}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Founder
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-500 mt-0.5">
                  {content.founderRole}
                </p>
              </div>
            </div>

            {/* Founder Story Quote */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/70 mb-4 shadow-xs">
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block mb-1">
                {content.founderStoryTitle}
              </span>
              <p className="text-xs text-slate-700 italic leading-relaxed font-medium">
                {content.founderQuote}
              </p>
            </div>

            {/* Social / Direct Connect Links */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-2">
                {content.contactTitle}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://github.com/shifat-manjum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>github.com/shifat-manjum</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <a
                  href="mailto:khshifat@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-bold shadow-xs transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  <span>khshifat@gmail.com</span>
                </a>

                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zentixx Ecosystem</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            www.mypdftools.it &bull; www.mypdftools.de
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {content.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
