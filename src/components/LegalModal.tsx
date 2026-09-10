import React, { useState } from 'react';
import { Language } from '../i18n/translations';
import { X, ShieldCheck, FileText, Cookie, Scale, Mail } from 'lucide-react';

export type LegalTab = 'privacy' | 'terms' | 'cookies';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  currentLang?: Language;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  currentLang = 'it',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                {currentLang === 'it'
                  ? 'Note Legali e Conformità'
                  : currentLang === 'de'
                  ? 'Rechtliche Hinweise & Datenschutz'
                  : 'Legal & Compliance Center'}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                MyPdfTools &bull; www.mypdftools.it &bull; www.mypdftools.de
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50/80 px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`pb-3 px-3 text-xs font-black transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{currentLang === 'it' ? 'Informativa Privacy' : currentLang === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy'}</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`pb-3 px-3 text-xs font-black transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{currentLang === 'it' ? 'Termini di Servizio' : currentLang === 'de' ? 'Nutzungsbedingungen' : 'Terms of Service'}</span>
          </button>

          <button
            onClick={() => setActiveTab('cookies')}
            className={`pb-3 px-3 text-xs font-black transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'cookies'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Cookie className="w-4 h-4" />
            <span>{currentLang === 'it' ? 'Cookie Policy' : currentLang === 'de' ? 'Cookie-Richtlinie' : 'Cookie Policy'}</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs text-slate-600 leading-relaxed font-normal">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {currentLang === 'it' ? 'Informativa sulla Privacy (GDPR UE 2016/679)' : currentLang === 'de' ? 'Datenschutzerklärung (EU-DSGVO)' : 'Privacy Policy (EU GDPR 2016/679)'}
              </h4>
              <p>
                <strong>1. Architettura Zero-Upload:</strong> MyPdfTools opera esclusivamente nel browser client tramite WebAssembly e HTML5 Canvas. Nessun file PDF, immagine o documento viene mai trasferito, archiviato o processato su server esterni.
              </p>
              <p>
                <strong>2. Titolare del Trattamento:</strong> Shifat Manjum, fondatore di Zentixx. Contatto: <a href="mailto:khshifat@gmail.com" className="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.
              </p>
              <p>
                <strong>3. Partner Pubblicitari (Google AdSense):</strong> Questo sito web può mostrare annunci pubblicitari forniti da Google LLC e dai suoi partner. Google utilizza cookie (inclusi i cookie DoubleClick) per pubblicare annunci pertinenti in base alle visite precedenti degli utenti. È possibile disattivare la pubblicità personalizzata visitando le Impostazioni annunci di Google.
              </p>
              <p>
                <strong>4. Diritti dell'Interessato:</strong> Ai sensi degli articoli 15-22 del GDPR, gli utenti hanno il diritto di richiedere l'accesso, la rettifica, la cancellazione e la limitazione del trattamento dei propri dati personali.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {currentLang === 'it' ? 'Termini e Condizioni di Utilizzo' : currentLang === 'de' ? 'Nutzungsbedingungen' : 'Terms & Conditions of Service'}
              </h4>
              <p>
                <strong>1. Licenza d'Uso:</strong> MyPdfTools concede l'accesso gratuito per uso personale e professionale a tutti gli strumenti di conversione e manipolazione di documenti PDF disponibili sulla piattaforma.
              </p>
              <p>
                <strong>2. Proprietà Intellettuale:</strong> I documenti elaborati rimangono di esclusiva proprietà dell'utente. MyPdfTools non rivendica alcun diritto di proprietà intellettuale sui contenuti elaborati tramite la piattaforma.
              </p>
              <p>
                <strong>3. Limitazione di Responsabilità:</strong> Il servizio è fornito "così com'è" senza garanzie esplicite o implicite di commerciabilità o idoneità per uno scopo particolare.
              </p>
              <p>
                <strong>4. Utilizzo Lecito:</strong> L'utente si impegna a non utilizzare la piattaforma per scopi illeciti o in violazione delle leggi vigenti sul copyright o sulla protezione dei dati.
              </p>
            </div>
          )}

          {activeTab === 'cookies' && (
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                {currentLang === 'it' ? 'Informativa Estesa sui Cookie' : currentLang === 'de' ? 'Cookie-Richtlinie' : 'Detailed Cookie Policy'}
              </h4>
              <p>
                <strong>1. Cookie Tecnici & Archiviazione Locale:</strong> Utilizziamo il LocalStorage del browser esclusivamente per memorizzare le preferenze di lingua (IT, ENG, DE). Non raccogliamo identificatori unici o dati traccianti.
              </p>
              <p>
                <strong>2. Cookie di Terze Parti (Google AdSense):</strong> I fornitori terzi, tra cui Google, utilizzano cookie per pubblicare annunci pubblicitari basati sulle precedenti visite degli utenti. I cookie pubblicitari consentono a Google e ai suoi partner di pubblicare annunci per gli utenti in base alle loro visite sui tuoi siti e/o su altri siti Internet.
              </p>
              <p>
                <strong>3. Gestione e Disabilitazione dei Cookie:</strong> Gli utenti possono gestire le proprie preferenze relative ai cookie direttamente dalle impostazioni del proprio browser (Chrome, Firefox, Safari, Edge) o visitando <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-bold underline">www.aboutads.info</a>.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Mail className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supporto: khshifat@gmail.com</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-sm transition-all cursor-pointer"
          >
            {currentLang === 'it' ? 'Ho capito' : currentLang === 'de' ? 'Verstanden' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

