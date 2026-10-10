import React from 'react';
import { Language } from '../i18n/translations';
import { ShieldCheck, ArrowLeft, Mail, Award, Lock, Sparkles, Scale, FileText, Cookie, MessageSquare } from 'lucide-react';

export type LegalPageType = 'impressum' | 'privacy' | 'terms' | 'about' | 'contact' | 'cookies';

interface StaticLegalPageProps {
  type: LegalPageType;
  currentLang: Language;
  onGoHome: () => void;
}

export const StaticLegalPage: React.FC<StaticLegalPageProps> = ({
  type,
  currentLang,
  onGoHome,
}) => {
  const isDe = currentLang === 'de';
  const isIt = currentLang === 'it';

  // Titles & Headings
  const titles: Record<LegalPageType, { it: string; de: string; en: string }> = {
    impressum: {
      it: 'Note Legali & Impressum',
      de: 'Impressum & Gesetzliche Anbieterkennzeichnung',
      en: 'Legal Notice & Impressum',
    },
    privacy: {
      it: 'Informativa sulla Privacy (GDPR UE 2016/679)',
      de: 'Datenschutzerklärung (EU-DSGVO)',
      en: 'Privacy Policy (EU GDPR 2016/679)',
    },
    terms: {
      it: 'Termini e Condizioni di Utilizzo',
      de: 'Allgemeine Geschäfts- & Nutzungsbedingungen (AGB)',
      en: 'Terms and Conditions of Use',
    },
    about: {
      it: 'Chi Siamo & La Nostra Missione',
      de: 'Über uns & Unsere Mission',
      en: 'About Us & Our Mission',
    },
    contact: {
      it: 'Contatti & Assistenza Tecnica',
      de: 'Kontakt & Technischer Support',
      en: 'Contact & Direct Support',
    },
    cookies: {
      it: 'Informativa Estesa sui Cookie',
      de: 'Cookie-Richtlinie & Privatsphäre',
      en: 'Detailed Cookie Policy',
    },
  };

  const pageTitle = titles[type]?.[currentLang] || titles[type]?.en || 'MyPdfTools';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-slate-800">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onGoHome}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isDe ? 'Zur Startseite' : isIt ? 'Torna alla Home' : 'Back to Home'}</span>
        </button>
        <span className="text-slate-300">/</span>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{type}</span>
      </div>

      {/* Main Container */}
      <article className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-10">
        <header className="border-b border-slate-100 pb-6 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-black border border-emerald-200 mb-3">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>MyPdfTools &bull; {isDe ? 'Transparenz & Vertrauen' : isIt ? 'Trasparenza & Fiducia' : 'Transparency & Trust'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            www.mypdftools.it &bull; www.mypdftools.de &bull; {isDe ? 'Letzte Aktualisierung: Oktober 2026' : isIt ? 'Ultimo aggiornamento: Ottobre 2026' : 'Last updated: October 2026'}
          </p>
        </header>

        {/* Content according to type */}
        {type === 'about' && (
          <div className="space-y-8 text-sm text-slate-700 leading-relaxed font-normal">
            <section className="space-y-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>{isDe ? 'Unsere Mission: Maximale Privatsphäre für Ihre Dokumente' : isIt ? 'La Nostra Missione: Restituire la Riservatezza agli Utenti' : 'Our Mission: Restoring Document Privacy'}</span>
              </h2>
              <p>
                {isDe
                  ? 'MyPdfTools wurde geschaffen, um das riskante Standardmodell herkömmlicher Online-PDF-Konverter herauszufordern. Bei uns werden keine sensiblen Dokumente, Steuerdaten oder Ausweise auf externe Cloud-Server hochgeladen: Jede Bearbeitung erfolgt zu 100% lokal im Browser Ihres Geräts.'
                  : isIt
                  ? 'MyPdfTools è nata per sfidare il modello tradizionale dei convertitori online, che obbligano gli utenti a cedere i propri file riservati a server cloud sconosciuti. Abbiamo reingegnerizzato ogni strumento affinché operi al 100% all\'interno del tuo dispositivo in totale sicurezza.'
                  : 'MyPdfTools was created to challenge the risky standard of cloud converters that require uploading sensitive documents. We engineered every single tool to execute 100% locally in your browser with zero remote storage.'}
              </p>
            </section>

            {/* Founders & Core Team Showcase */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block mb-1">
                  {isDe ? 'Gründer & Entwicklungsteam' : isIt ? 'Fondatori & Team di Sviluppo' : 'Founders & Core Development Team'}
                </span>
                <h3 className="text-xl font-black text-white">
                  {isDe ? 'Das Team hinter MyPdfTools' : isIt ? 'Il Team dietro MyPdfTools' : 'The Minds Behind MyPdfTools'}
                </h3>
              </div>

              {/* Profiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Shifat Manjum */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">
                    SM
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-black text-white">Shifat Manjum</h4>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-500/30 text-emerald-300 border border-emerald-500/40">
                        Founder
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">
                      Product Architect &amp; Founder, Zentixx
                    </p>
                  </div>
                </div>

                {/* Saiful Islam */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0">
                    SI
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-black text-white">Saiful Islam</h4>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-teal-500/30 text-teal-300 border border-teal-500/40">
                        Partner
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">
                      Co-Developer &amp; Project Partner
                    </p>
                  </div>
                </div>
              </div>

              {/* Team Story Quote */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-slate-300 italic leading-relaxed">
                {isDe
                  ? '„Wie viele Fachleute mussten auch wir regelmäßig vertrauliche Steuerunterlagen, Ausweise und Verträge online bearbeiten und hatten stets die Sorge, wer darauf zugreift. Gemeinsam haben wir MyPdfTools entwickelt, um kompromisslose Privatsphäre und Zuverlässigkeit zu garantieren: Keine Server-Uploads, kein Zwischenspeicher, reine Ausführung im Browser.“'
                  : isIt
                  ? '«Come molti professionisti, ci siamo trovati spesso a dover convertire documenti fiscali, contratti e dati sensibili su piattaforme online, con la costante apprensione di dove finissero i file. Insieme a Saiful Islam, abbiamo ingegnerizzato MyPdfTools per eliminare per sempre questo timore: niente upload, nessun intermediario, solo pura elaborazione locale protetta.»'
                  : '“Like many professionals, we frequently converted sensitive tax filings, contracts, and IDs online, always worrying where documents were stored. Together with Saiful Islam, we built MyPdfTools to eliminate this anxiety once and for all: zero uploads, zero server storage, pure private browser computation.”'}
              </div>

              {/* Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-300">
                <a
                  href="mailto:khshifat@gmail.com"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>khshifat@gmail.com</span>
                </a>
                <span>&bull;</span>
                <a
                  href="https://github.com/shifat-manjum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white font-bold"
                >
                  GitHub (Shifat Manjum)
                </a>
                <span>&bull;</span>
                <span className="text-slate-400">
                  Ecosystem: <strong>Zentixx &bull; MyPdfTools &bull; PatenteBangla</strong>
                </span>
              </div>
            </section>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed font-normal">
            <section className="space-y-3">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>{isDe ? 'Offizieller Kontakt & Support' : isIt ? 'Canale di Comunicazione Diretto' : 'Direct Support Channel'}</span>
              </h2>
              <p>
                {isDe
                  ? 'Für technischen Support, Fehlerberichte, Feature-Anfragen oder Fragen zum Datenschutz stehen wir Ihnen gerne zur Verfügung:'
                  : isIt
                  ? 'Per assistenza tecnica, segnalazione di bug, richieste di funzionalità o domande sulla conformità GDPR, siamo a tua completa disposizione:'
                  : 'For technical support, bug reports, feature requests, or privacy inquiries, please reach out to us:'}
              </p>
            </section>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                {isDe ? 'Offizielle E-Mail-Adresse' : isIt ? 'Indirizzo Email Ufficiale' : 'Official Contact Email'}
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-600">
                <a href="mailto:khshifat@gmail.com" className="hover:underline">
                  khshifat@gmail.com
                </a>
              </div>
              <p className="text-xs text-slate-500">
                {isDe
                  ? 'Entwickelt und gepflegt von Shifat Manjum & Saiful Islam (Zentixx).'
                  : isIt
                  ? 'Sviluppato e curato da Shifat Manjum & Saiful Islam (Zentixx).'
                  : 'Maintained and engineered by Shifat Manjum & Saiful Islam (Zentixx).'}
              </p>
            </div>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
              {isDe ? 'Datenschutzerklärung nach EU-DSGVO' : isIt ? 'Informativa sulla Privacy (GDPR UE 2016/679)' : 'Privacy Policy (EU GDPR)'}
            </h2>
            <p>
              <strong>1. Zero-Upload Architektur:</strong> MyPdfTools verarbeitet alle Dateien lokal im Browser des Nutzers via WebAssembly und Canvas API. Es werden zu keinem Zeitpunkt Dokumente auf externe Server hochgeladen oder gespeichert.
            </p>
            <p>
              <strong>2. Verantwortlicher:</strong> Shifat Manjum &amp; Saiful Islam, Zentixx. Kontakt:{' '}
              <a href="mailto:khshifat@gmail.com" className="text-emerald-600 font-bold underline">
                khshifat@gmail.com
              </a>.
            </p>
            <p>
              <strong>3. Google AdSense &amp; Cookies:</strong> Diese Webseite nutzt Werbedienste von Google LLC. Google verwendet Cookies zur Auslieferung von Anzeigen basierend auf vorherigen Besuchen.
            </p>
          </div>
        )}

        {type === 'impressum' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
              {isDe ? 'Impressum (§ 5 DDG & § 18 MStV)' : isIt ? 'Note Legali e Dati Societari' : 'Legal Notice & Impressum'}
            </h2>
            <p>
              <strong>Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG):</strong><br />
              Betreiber: Shifat Manjum &amp; Saiful Islam (Zentixx)<br />
              Kontakt: <a href="mailto:khshifat@gmail.com" className="text-emerald-600 underline">khshifat@gmail.com</a><br />
              Plattformen: www.mypdftools.de &bull; www.mypdftools.it
            </p>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
              {isDe ? 'Allgemeine Nutzungsbedingungen (AGB)' : isIt ? 'Termini di Servizio' : 'Terms of Service'}
            </h2>
            <p>
              <strong>1. Kostenlose Nutzung:</strong> MyPdfTools stellt alle Werkzeuge kostenlos zur Verfügung. Die Nutzung erfolgt auf eigenes Risiko ohne Gewährleistung.
            </p>
            <p>
              <strong>2. Urheberrecht an Dokumenten:</strong> Alle Rechte an den bearbeiteten Dokumenten verbleiben vollständig beim Nutzer.
            </p>
          </div>
        )}

        {type === 'cookies' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
              {isDe ? 'Cookie-Richtlinie' : isIt ? 'Cookie Policy' : 'Cookie Policy'}
            </h2>
            <p>
              <strong>1. Technische Cookies &amp; LocalStorage:</strong> Wir nutzen den Browserspeicher ausschließlich zur Speicherung der Spracheinstellung (IT, DE, EN).
            </p>
            <p>
              <strong>2. Werbe-Cookies:</strong> Drittanbieter wie Google können Cookies für personalisierte Anzeigen verwenden.
            </p>
          </div>
        )}
      </article>
    </div>
  );
};

