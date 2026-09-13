import React, { useState } from 'react';
import { Language } from '../i18n/translations';
import { X, Mail, Check, Copy, Clock, ShieldCheck, ExternalLink, Sparkles, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  currentLang?: Language;
  onClose: () => void;
}

const CONTACT_CONTENT = {
  it: {
    badge: 'Supporto Diretto & Trasparenza',
    title: 'Contattaci',
    subtitle: 'Hai domande, suggerimenti o richieste di collaborazione? Siamo a tua completa disposizione.',
    emailTitle: 'Indirizzo Email Ufficiale',
    emailDesc: 'Per assistenza tecnica, feedback sugli strumenti PDF o domande sulla conformità GDPR:',
    copyBtn: 'Copia Email',
    copiedBtn: 'Email Copiata!',
    sendBtn: 'Invia Email Diretta',
    hoursTitle: 'Tempi di Risposta',
    hoursDesc: 'Rispondiamo abitualmente entro 24 ore lavorative.',
    privacyNoteTitle: '100% Client-Side & Riservatezza',
    privacyNoteDesc: 'Non memorizziamo i tuoi file. Per qualsiasi richiesta relativa alla privacy o cancellazione dati locali, contattaci pure.',
    founderTitle: 'Fondatore & Team di Sviluppo',
    founderDesc: 'Sviluppato e gestito attivamente con cura per garantire strumenti PDF gratuiti e sicuri.',
    domainsLabel: 'Piattaforme Ufficiali: mypdftools.it • mypdftools.de',
    closeBtn: 'Chiudi',
  },
  en: {
    badge: 'Direct Support & Transparency',
    title: 'Contact Us',
    subtitle: 'Have questions, feedback, or business partnership inquiries? We are always here to help.',
    emailTitle: 'Official Contact Email',
    emailDesc: 'For technical support, PDF tool feedback, or GDPR compliance inquiries:',
    copyBtn: 'Copy Email',
    copiedBtn: 'Email Copied!',
    sendBtn: 'Send Direct Email',
    hoursTitle: 'Response Time',
    hoursDesc: 'We typically respond within 24 business hours.',
    privacyNoteTitle: '100% Client-Side & Privacy First',
    privacyNoteDesc: 'Your files are never stored or uploaded. For any inquiries regarding privacy or local cache, feel free to reach out.',
    founderTitle: 'Founder & Development Team',
    founderDesc: 'Actively maintained and developed to provide free, high-speed, and secure PDF tools.',
    domainsLabel: 'Official Platforms: mypdftools.it • mypdftools.de',
    closeBtn: 'Close',
  },
  de: {
    badge: 'Direkter Support & Transparenz',
    title: 'Kontaktieren Sie uns',
    subtitle: 'Haben Sie Fragen, Feedback oder geschäftliche Anfragen? Wir stehen Ihnen gerne zur Verfügung.',
    emailTitle: 'Offizielle E-Mail-Adresse',
    emailDesc: 'Für technischen Support, Feedback zu den PDF-Tools oder Fragen zum Datenschutz:',
    copyBtn: 'E-Mail kopieren',
    copiedBtn: 'E-Mail kopiert!',
    sendBtn: 'Direkte E-Mail senden',
    hoursTitle: 'Antwortzeit',
    hoursDesc: 'Wir antworten in der Regel innerhalb von 24 Geschäftsstunden.',
    privacyNoteTitle: '100% Client-Side & Datenschutz',
    privacyNoteDesc: 'Ihre Dateien werden niemals gespeichert oder hochgeladen. Bei Fragen zu Datenschutz und Sicherheit kontaktieren Sie uns gerne.',
    founderTitle: 'Gründer & Entwicklungsteam',
    founderDesc: 'Aktiv gepflegt und entwickelt, um kostenlose, schnelle und sichere PDF-Tools bereitzustellen.',
    domainsLabel: 'Offizielle Plattformen: mypdftools.it • mypdftools.de',
    closeBtn: 'Schließen',
  },
};

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  currentLang = 'it',
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const content = CONTACT_CONTENT[currentLang] || CONTACT_CONTENT.it;
  const officialEmail = 'khshifat@gmail.com';
  const mailtoLink = `mailto:${officialEmail}?subject=MyPdfTools%20Inquiry%20(${currentLang.toUpperCase()})`;

  const handleCopy = () => {
    navigator.clipboard.writeText(officialEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>{content.title}</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">{content.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Main Email Box */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                {content.emailTitle}
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4 font-medium">
              {content.emailDesc}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex-1 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 font-mono text-xs sm:text-sm font-bold text-slate-800 select-all flex items-center justify-between">
                <span>{officialEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                    copied
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 shadow-2xs'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? content.copiedBtn : content.copyBtn}</span>
                </button>

                <a
                  href={mailtoLink}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{content.sendBtn}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Response Time */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">{content.hoursTitle}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-medium">
                  {content.hoursDesc}
                </p>
              </div>
            </div>

            {/* Privacy Inquiries */}
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex-shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">{content.privacyNoteTitle}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-medium">
                  {content.privacyNoteDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Founder & Direct Connect */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">
                {content.founderTitle}
              </span>
              <h4 className="text-xs font-bold text-slate-800 mt-0.5">
                Shifat Manjum &bull; Lead Developer
              </h4>
              <p className="text-[11px] text-slate-400 font-medium">
                {content.founderDesc}
              </p>
            </div>

            <a
              href="https://github.com/shifat-manjum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold shadow-2xs transition-all flex-shrink-0"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub Profile</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-medium">
            {content.domainsLabel}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer"
          >
            {content.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

