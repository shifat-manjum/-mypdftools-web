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
              {isDe ? 'Datenschutzerklärung (EU-DSGVO 2016/679)' : isIt ? 'Informativa sulla Privacy (GDPR UE 2016/679)' : 'Privacy Policy (EU GDPR 2016/679)'}
            </h2>
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 font-medium">
              {isDe
                ? 'Kurzfassung: MyPdfTools verarbeitet alle PDF- und Bilddateien zu 100% lokal im Arbeitsspeicher Ihres Browsers (Client-Side via WebAssembly). Es erfolgt keinerlei Datei-Upload auf unsere Server.'
                : isIt
                ? 'In sintesi: MyPdfTools elabora tutti i file PDF e le immagini al 100% localmente nella memoria del tuo browser (Client-Side tramite WebAssembly). Nessun documento viene mai caricato sui nostri server.'
                : 'Summary: MyPdfTools processes all PDF and image files 100% locally inside your browser memory (Client-Side via WebAssembly). No files are ever uploaded to our servers.'}
            </div>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '1. Verantwortlicher für die Datenverarbeitung' : isIt ? '1. Titolare del Trattamento dei Dati' : '1. Data Controller'}
              </h3>
              <p>
                {isDe
                  ? 'Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO): Shifat Manjum & Saiful Islam (Zentixx). Offizielle Kontakt-E-Mail: '
                  : isIt
                  ? 'Titolare del trattamento ai sensi del Regolamento UE 2016/679 (GDPR): Shifat Manjum & Saiful Islam (Zentixx). Email ufficiale di contatto: '
                  : 'Data Controller under EU GDPR: Shifat Manjum & Saiful Islam (Zentixx). Official contact email: '}
                <a href="mailto:khshifat@gmail.com" className="text-emerald-600 font-bold underline">khshifat@gmail.com</a>.
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '2. 100% Lokale Dokumentenverarbeitung (Zero-Upload)' : isIt ? '2. Elaborazione Documentale 100% Locale (Zero-Upload)' : '2. 100% Local Document Processing (Zero-Upload)'}
              </h3>
              <p>
                {isDe
                  ? 'Wenn Sie Werkzeuge auf MyPdfTools nutzen (z. B. PDF zusammenfügen, teilen, komprimieren oder konvertieren), werden Ihre Dateien ausschließlich im lokalen Arbeitsspeicher (RAM) Ihres Endgeräts verarbeitet. Es findet zu keinem Zeitpunkt eine Übertragung Ihrer Dokumente über das Internet an unsere Server oder Dritte statt (Art. 25 DSGVO — Privacy by Design).'
                  : isIt
                  ? 'Quando utilizzi gli strumenti di MyPdfTools (es. unire, dividere, comprimere o convertire PDF), i tuoi file vengono elaborati esclusivamente nella memoria RAM locale del tuo dispositivo. Non avviene alcun trasferimento dei tuoi documenti via internet verso i nostri server o verso terze parti (Art. 25 GDPR — Privacy by Design).'
                  : 'When you use tools on MyPdfTools (merging, splitting, compressing, or converting PDFs), your files are processed exclusively inside your device’s local RAM. Your documents are never transmitted over the internet to our servers or third parties (Art. 25 GDPR — Privacy by Design).'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '3. Google AdSense & Werbe-Cookies' : isIt ? '3. Google AdSense e Cookie Pubblicitari' : '3. Google AdSense & Advertising Cookies'}
              </h3>
              <p>
                {isDe
                  ? 'Diese Website nutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland). Drittanbieter, einschließlich Google, verwenden Cookies, um Anzeigen auf Grundlage vorheriger Besuche eines Nutzers auf dieser oder anderen Websites zu schalten. Nutzer können personalisierte Werbung in den Google-Anzeigeneinstellungen (https://adssettings.google.com) deaktivieren.'
                  : isIt
                  ? 'Questo sito utilizza Google AdSense, un servizio di annunci pubblicitari fornito da Google Ireland Limited (Gordon House, Barrow Street, Dublino 4, Irlanda). I fornitori di terze parti, tra cui Google, utilizzano cookie per pubblicare annunci basati sulle precedenti visite dell\'utente a questo o ad altri siti web. Gli utenti possono disattivare la pubblicità personalizzata visitando le Impostazioni annunci di Google (https://adssettings.google.com).'
                  : 'This website uses Google AdSense, an advertising service provided by Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Ireland). Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to this website or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com).'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '4. Google Analytics (GA4) & Server-Logfiles' : isIt ? '4. Google Analytics (GA4) e Log di Navigazione' : '4. Google Analytics (GA4) & Server Logs'}
              </h3>
              <p>
                {isDe
                  ? 'Zur statistischen Auswertung der Webseitennutzung setzen wir Google Analytics 4 mit aktivierter IP-Anonymisierung ein. Es werden niemals Dateiinhalte oder Dokumentnamen erfasst. Ihre Rechte nach DSGVO (Auskunft, Löschung, Widerspruch nach Art. 15–21 DSGVO) können Sie jederzeit per E-Mail an khshifat@gmail.com geltend machen.'
                  : isIt
                  ? 'Per l\'analisi statistica aggregata del traffico utilizziamo Google Analytics 4 con anonimizzazione dell\'indirizzo IP attiva. Non vengono mai tracciati i nomi o i contenuti dei file elaborati. Puoi esercitare in qualsiasi momento i tuoi diritti (accesso, cancellazione, opposizione ai sensi degli Artt. 15-21 GDPR) scrivendo a khshifat@gmail.com.'
                  : 'For aggregated traffic analysis we use Google Analytics 4 with IP anonymization enabled. File names and document contents are never tracked. You may exercise your GDPR rights (access, erasure, objection under Arts. 15–21 GDPR) at any time by emailing khshifat@gmail.com.'}
              </p>
            </section>
          </div>
        )}

        {type === 'impressum' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
              {isDe ? 'Impressum (§ 5 DDG & § 18 MStV)' : isIt ? 'Note Legali e Informazioni Societarie' : 'Legal Notice & Impressum'}
            </h2>
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <p>
                <strong>{isDe ? 'Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG):' : isIt ? 'Informazioni sul Fornitore del Servizio Web:' : 'Service Provider Information:'}</strong><br />
                <strong>{isDe ? 'Betreiber & Entwicklung:' : isIt ? 'Fondatori e Sviluppatori:' : 'Founders & Developers:'}</strong> Shifat Manjum &amp; Saiful Islam (Zentixx)<br />
                <strong>Email:</strong> <a href="mailto:khshifat@gmail.com" className="text-emerald-600 font-bold underline">khshifat@gmail.com</a><br />
                <strong>Web:</strong> www.mypdftools.it &bull; www.mypdftools.de
              </p>
            </div>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? 'Haftung für Inhalte und Werkzeuge' : isIt ? 'Responsabilità sui Contenuti e sugli Strumenti' : 'Liability for Content & Tools'}
              </h3>
              <p>
                {isDe
                  ? 'Die Inhalte und lokalen PDF-Werkzeuge unserer Seiten wurden mit größter Sorgfalt erstellt. Da sämtliche Dateiverarbeitungen direkt auf dem Endgerät des Nutzers stattfinden, übernimmt der Betreiber keine Haftung für Datenverluste auf dem Endgerät des Nutzers.'
                  : isIt
                  ? 'I contenuti editoriali e gli strumenti di elaborazione PDF sono realizzati con la massima cura tecnica. Poiché tutte le operazioni sui file avvengono localmente sul dispositivo dell\'utente, i gestori non assumono responsabilità per eventuali perdite di dati locali.'
                  : 'The editorial content and local PDF tools on our pages were created with the utmost technical care. Since all file processing takes place directly on the user’s device, the operators assume no liability for local data loss.'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? 'EU-Streitschlichtung' : isIt ? 'Risoluzione delle Controversie Online (ODR UE)' : 'EU Online Dispute Resolution'}
              </h3>
              <p>
                {isDe
                  ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.'
                  : isIt
                  ? 'La Commissione Europea mette a disposizione una piattaforma per la risoluzione delle controversie online (ODR): https://ec.europa.eu/consumers/odr/.'
                  : 'The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/.'}
              </p>
            </section>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
              {isDe ? 'Allgemeine Nutzungsbedingungen (AGB)' : isIt ? 'Termini e Condizioni di Servizio' : 'Terms of Service'}
            </h2>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '1. Leistungsumfang & Kostenlose Nutzung' : isIt ? '1. Oggetto del Servizio e Gratuità' : '1. Scope of Service & Free Use'}
              </h3>
              <p>
                {isDe
                  ? 'MyPdfTools stellt webbasierte PDF-Werkzeuge kostenlos zur Verfügung. Alle Berechnungen laufen lokal im Webbrowser des Nutzers über WebAssembly ab. Es ist keine Registrierung oder Kontoerstellung erforderlich.'
                  : isIt
                  ? 'MyPdfTools mette a disposizione gratuitamente strumenti web per la gestione, conversione e ottimizzazione di file PDF. Tutte le elaborazioni vengono eseguite localmente nel browser dell\'utente tramite tecnologia WebAssembly senza obbligo di registrazione.'
                  : 'MyPdfTools provides web-based PDF utilities free of charge. All calculations run locally inside the user’s browser via WebAssembly with no registration required.'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '2. Urheberrecht & Eigentum an Dokumenten' : isIt ? '2. Proprietà Intellettuale dei Documenti' : '2. Document Ownership & Copyright'}
              </h3>
              <p>
                {isDe
                  ? 'Alle Urheber- und Eigentumsrechte an den bearbeiteten Dateien verbleiben zu 100 % beim jeweiligen Nutzer. MyPdfTools erhebt keinerlei Ansprüche auf Ihre Dokumente und speichert diese zu keinem Zeitpunkt.'
                  : isIt
                  ? 'Tutti i diritti d\'autore e di proprietà sui documenti elaborati rimangono al 100% in capo all\'utente. MyPdfTools non acquisisce alcun diritto sui tuoi file né li memorizza in alcun modo.'
                  : 'All copyright and ownership rights to processed files remain 100% with the user. MyPdfTools claims no rights over your documents and never stores them.'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '3. Gewährleistungsausschluss' : isIt ? '3. Limitazione di Responsabilità' : '3. Disclaimer of Warranties'}
              </h3>
              <p>
                {isDe
                  ? 'Die Werkzeuge werden „wie besehen“ (as-is) bereitgestellt. Wir empfehlen Nutzern, vor der Bearbeitung wichtiger Originaldokumente stets eine lokale Sicherheitskopie aufzubewahren.'
                  : isIt
                  ? 'Gli strumenti sono forniti "così come sono" (as-is). Si consiglia agli utenti di conservare sempre una copia di backup locale dei documenti originali prima di procedere a modifiche o compressioni.'
                  : 'The tools are provided "as-is". We recommend keeping a local backup copy of important original documents before modifying or compressing them.'}
              </p>
            </section>
          </div>
        )}

        {type === 'cookies' && (
          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            <h2 className="text-base font-black text-slate-900 uppercase tracking-wider">
              {isDe ? 'Cookie-Richtlinie (EU-ePrivacy & DSGVO)' : isIt ? 'Informativa sui Cookie (Cookie Policy UE)' : 'Cookie Policy'}
            </h2>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '1. Technischer Lokaler Speicher (LocalStorage)' : isIt ? '1. Archiviazione Tecnica Locale (LocalStorage)' : '1. Technical LocalStorage'}
              </h3>
              <p>
                {isDe
                  ? 'MyPdfTools nutzt den lokalen Browserspeicher (LocalStorage unter dem Schlüssel mypdftools_lang) ausschließlich dazu, Ihre bevorzugte Spracheinstellung (Deutsch, Italienisch oder Englisch) zu speichern.'
                  : isIt
                  ? 'MyPdfTools utilizza lo spazio di archiviazione locale del browser (LocalStorage con chiave mypdftools_lang) esclusivamente per memorizzare la tua preferenza di lingua (Italiano, Tedesco o Inglese).'
                  : 'MyPdfTools uses local browser storage (LocalStorage key mypdftools_lang) strictly to remember your language preference (Italian, German, or English).'}
              </p>
            </section>
            <section className="space-y-2">
              <h3 className="font-black text-slate-900">
                {isDe ? '2. Google AdSense & Analyse-Cookies von Drittanbietern' : isIt ? '2. Cookie di Terze Parti (Google AdSense & Analytics)' : '2. Third-Party Cookies (Google AdSense & Analytics)'}
              </h3>
              <p>
                {isDe
                  ? 'Zur Finanzierung unseres kostenlosen Angebots binden wir Google AdSense sowie Google Analytics ein. Google kann Cookies (wie das DoubleClick DART-Cookie) setzen, um relevante Anzeigen zu schalten und die Nutzung der Website auszuwerten. Sie können Cookies jederzeit in Ihren Browsereinstellungen löschen oder blockieren.'
                  : isIt
                  ? 'Per sostenere i costi del servizio gratuito, utilizziamo Google AdSense e Google Analytics. Google può impostare cookie tecnici e pubblicitari (incluso il cookie DoubleClick DART) per mostrare annunci pertinenti e analizzare il traffico in forma aggregata. Puoi gestire o bloccare i cookie in qualsiasi momento dalle impostazioni del tuo browser.'
                  : 'To support our free tools, we use Google AdSense and Google Analytics. Google may set advertising and analytics cookies (including the DoubleClick DART cookie) to serve relevant ads and measure site traffic. You can manage or block cookies anytime in your browser settings.'}
              </p>
            </section>
          </div>
        )}
      </article>
    </div>
  );
};

