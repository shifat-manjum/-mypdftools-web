import React from 'react';
import { Language } from '../i18n/translations';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AuthNoticeModalProps {
  isOpen: boolean;
  currentLang?: Language;
  onClose: () => void;
}

const AUTH_NOTICE_CONTENT: Record<Language, any> = {
  it: {
    tag: 'Accesso Libero & Illimitato',
    title: 'MyPdfTools è 100% Gratuito',
    subtitle: 'Nessun account, login o carta di credito richiesti!',
    description:
      'Crediamo che convertire e gestire i propri documenti debba essere semplice, privato e accessibile a tutti. Non devi registrarti né creare password per utilizzare tutti i nostri 30+ strumenti.',
    perks: [
      { title: 'Nessuna registrazione', desc: 'Usa subito qualsiasi strumento senza cedere la tua email o dati personali.' },
      { title: 'Zero costi nascosti', desc: 'Tutti gli strumenti PDF sono gratuiti e senza limiti artificiali giornalieri.' },
      { title: '100% Privato nel tuo browser', desc: 'I tuoi file non lasciano mai il tuo dispositivo. Zero upload su server.' },
    ],
    actionBtn: 'Inizia a convertire subito',
  },
  en: {
    tag: 'Open & Free Access',
    title: 'MyPdfTools is 100% Free',
    subtitle: 'No account, login, or credit card needed!',
    description:
      'We believe converting and working with PDFs should be effortless, private, and accessible to everyone. You do not need an account, password, or subscription to use any of our 30+ tools.',
    perks: [
      { title: 'No sign-up required', desc: 'Use all tools immediately without providing your email address.' },
      { title: 'Zero paywalls or limits', desc: 'Every tool is completely free with no annoying daily limits.' },
      { title: '100% In-browser privacy', desc: 'Your confidential documents never leave your computer.' },
    ],
    actionBtn: 'Start converting now',
  },
  de: {
    tag: 'Freier & Unbegrenzter Zugriff',
    title: 'MyPdfTools ist 100% kostenlos',
    subtitle: 'Kein Konto, Login oder Kreditkarte erforderlich!',
    description:
      'Wir sind überzeugt, dass die Arbeit mit PDFs einfach, vertraulich und für jeden frei zugänglich sein sollte. Sie müssen sich nicht registrieren, um alle über 30 Tools uneingeschränkt zu nutzen.',
    perks: [
      { title: 'Keine Registrierung', desc: 'Alle Werkzeuge direkt nutzen, ohne persönliche Daten preiszugeben.' },
      { title: 'Keine versteckten Gebühren', desc: 'Vollkommen kostenlos ohne tägliche Beschränkungen.' },
      { title: '100% Privat im Browser', desc: 'Ihre Dateien verlassen zu keinem Zeitpunkt Ihr Endgerät.' },
    ],
    actionBtn: 'Jetzt loslegen',
  },
};

export const AuthNoticeModal: React.FC<AuthNoticeModalProps> = ({
  isOpen,
  currentLang = 'it',
  onClose,
}) => {
  if (!isOpen) return null;

  const content = AUTH_NOTICE_CONTENT[currentLang] || AUTH_NOTICE_CONTENT.it;

  const handleAction = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/10 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent */}
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          {/* Icon Badge */}
          <div className="mx-auto w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-100 via-teal-100 to-indigo-100 text-emerald-600 flex items-center justify-center shadow-inner border border-emerald-200/80">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider mb-2.5 border border-emerald-200/80">
              {content.tag}
            </span>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              {content.title}
            </h3>
            <p className="text-sm font-bold text-emerald-600 mt-1">
              {content.subtitle}
            </p>
            <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-medium max-w-md mx-auto">
              {content.description}
            </p>
          </div>

          {/* Perks list */}
          <div className="space-y-3 text-left pt-2">
            {content.perks.map((perk: any, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 shadow-2xs"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900">{perk.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal font-medium">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={handleAction}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-lg shadow-emerald-600/25 transition-all transform active:scale-98 cursor-pointer"
            >
              {content.actionBtn} &rarr;
            </button>
            <p className="text-[11px] text-slate-400 mt-3 font-medium">
              www.mypdftools.it &bull; www.mypdftools.de
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

