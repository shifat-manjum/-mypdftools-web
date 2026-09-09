import React from 'react';
import { Language } from '../i18n/translations';
import { ShieldCheck, X, WifiOff, HardDrive, CheckCircle2, XCircle, Lock } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  currentLang?: Language;
  onClose: () => void;
}

const PRIVACY_TEXT: Record<Language, any> = {
  it: {
    headerTitle: 'La Nostra Garanzia di Privacy 100% Client-Side',
    headerSub: 'Perché MyPdfTools è la piattaforma più sicura per i tuoi documenti',
    compareTitle: 'Come si posiziona MyPdfTools rispetto ai tradizionali convertitori online',
    othersTitle: 'Altri Convertitori Online',
    othersBullets: [
      'Caricano il tuo PDF privato su server cloud remoti.',
      'Memorizzati su dischi rigidi sconosciuti per ore o giorni.',
      'Vulnerabili a violazioni dei dati server, accessi illeciti e fughe di dati.',
      'Lenti a caricare file di grandi dimensioni a causa della banda internet.',
    ],
    mypdfTitle: 'MyPdfTools (Architettura Locale)',
    mypdfBadge: '100% Sicuro',
    mypdfBullets: [
      'Zero caricamenti su server: i file rimangono sul tuo computer.',
      'Motore locale: elaborati unicamente nella RAM del tuo browser.',
      'Velocità immediata: zero attesa di upload, conversione in millisecondi.',
      'Massima conformità: ideale per dichiarazioni dei redditi, fatture e ID.',
    ],
    offlineChallengeTag: 'Il Test di Disconnessione Wi-Fi',
    offlineChallengeTitle: 'Non fidarti solo delle nostre parole: prova offline!',
    offlineChallengeDesc: 'Apri un qualsiasi strumento su MyPdfTools, spegni il Wi-Fi o scollega la connessione: la conversione funzionerà comunque senza problemi!',
    zeroLogs: 'Zero Log',
    zeroLogsDesc: 'Nessun nome file o contenuto viene mai registrato.',
    zeroStorage: 'Zero Archiviazione',
    zeroStorageDesc: 'I tuoi file svaniscono dalla memoria quando chiudi la scheda.',
    gdpr: 'Compatibile GDPR',
    gdprDesc: 'Nessun dato personale viene trasmesso o venduto a terzi.',
    closeBtn: 'Ho capito, grazie!',
  },
  en: {
    headerTitle: 'Our 100% Client-Side Privacy Guarantee',
    headerSub: 'Why MyPdfTools is the safest place for your confidential files',
    compareTitle: 'How MyPdfTools compares to traditional cloud converters',
    othersTitle: 'Other Online Converters',
    othersBullets: [
      'Uploads your confidential PDF to remote cloud servers.',
      'Stored on unknown remote hard drives for hours or days.',
      'Vulnerable to server data leaks, hacks, or unauthorized access.',
      'Slow upload and download times for large documents.',
    ],
    mypdfTitle: 'MyPdfTools (Browser Engine)',
    mypdfBadge: '100% Safe',
    mypdfBullets: [
      'Zero server uploads: Files stay entirely on your device.',
      'Client-side engine: Processed in your browser\'s private memory.',
      'Instant speed: Zero upload lag, converts in milliseconds.',
      'Bank-level compliance: Safe for taxes, IDs, and financial records.',
    ],
    offlineChallengeTag: 'The Disconnect Wi-Fi Test',
    offlineChallengeTitle: 'Don\'t take our word for it: Test it offline!',
    offlineChallengeDesc: 'Open any tool on MyPdfTools, turn off your Wi-Fi or unplug your internet cable: conversion still works because everything runs locally on your machine.',
    zeroLogs: 'Zero Logs',
    zeroLogsDesc: 'No file names or contents are ever recorded.',
    zeroStorage: 'Zero Storage',
    zeroStorageDesc: 'Your files vanish from RAM when tab closes.',
    gdpr: 'GDPR & HIPAA Friendly',
    gdprDesc: 'Safe for enterprise and confidential files.',
    closeBtn: 'Got it, thanks!',
  },
  de: {
    headerTitle: 'Unsere 100% clientseitige Datenschutzgarantie',
    headerSub: 'Warum MyPdfTools der sicherste Ort für Ihre vertraulichen Dateien ist',
    compareTitle: 'Wie sich MyPdfTools von herkömmlichen Online-Diensten unterscheidet',
    othersTitle: 'Andere Online-Konverter',
    othersBullets: [
      'Lädt Ihre vertraulichen PDFs auf entfernte Cloud-Server hoch.',
      'Stunden- oder tagelange Speicherung auf unbekannten Festplatten.',
      'Anfällig für Datenlecks, Hacks oder unbefugten Zugriff.',
      'Langsame Upload- und Downloadzeiten bei größeren Dateien.',
    ],
    mypdfTitle: 'MyPdfTools (Browser-Technologie)',
    mypdfBadge: '100% Sicher',
    mypdfBullets: [
      'Kein Server-Upload: Dateien verbleiben komplett auf Ihrem Gerät.',
      'Lokaler Konverter: Verarbeitung ausschließlich im Arbeitsspeicher des Browsers.',
      'Sofortige Geschwindigkeit: Keine Upload-Wartezeit, Umwandlung in Millisekunden.',
      'Höchste Diskretion: Sicher für Steuererklärungen, Ausweise und Verträge.',
    ],
    offlineChallengeTag: 'Der WLAN-Trennungs-Test',
    offlineChallengeTitle: 'Glauben Sie uns nicht blind: Testen Sie es offline!',
    offlineChallengeDesc: 'Öffnen Sie ein beliebiges Tool auf MyPdfTools, trennen Sie Ihr WLAN oder ziehen Sie das LAN-Kabel ab: Alles funktioniert offline weiter!',
    zeroLogs: 'Null Logs',
    zeroLogsDesc: 'Dateinamen und Inhalte werden zu keinem Zeitpunkt protokolliert.',
    zeroStorage: 'Keine Speicherung',
    zeroStorageDesc: 'Dateien verschwinden beim Schließen des Tabs sofort aus dem RAM.',
    gdpr: 'DSGVO-Konform',
    gdprDesc: 'Keine Übertragung oder Weitergabe persönlicher Daten an Dritte.',
    closeBtn: 'Verstanden, danke!',
  },
};

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, currentLang = 'it', onClose }) => {
  if (!isOpen) return null;

  const p = PRIVACY_TEXT[currentLang] || PRIVACY_TEXT.it;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-indigo-700 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                {p.headerTitle}
              </h3>
              <p className="text-xs text-emerald-100 font-medium">
                {p.headerSub}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Comparison Cards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {p.compareTitle}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Other Converters */}
              <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{p.othersTitle}</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                  {p.othersBullets.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MyPdfTools */}
              <div className="bg-emerald-50/70 border-2 border-emerald-500/40 rounded-2xl p-5 space-y-3 relative shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{p.mypdfTitle}</span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                    {p.mypdfBadge}
                  </span>
                </div>
                <ul className="text-xs text-slate-700 space-y-2 leading-relaxed font-medium">
                  {p.mypdfBullets.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* The Offline Challenge Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <WifiOff className="w-7 h-7" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                {p.offlineChallengeTag}
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                {p.offlineChallengeTitle}
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {p.offlineChallengeDesc}
              </p>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-center">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <Lock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <h5 className="text-xs font-bold text-slate-900">{p.zeroLogs}</h5>
              <p className="text-[11px] text-slate-500 mt-0.5">{p.zeroLogsDesc}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <HardDrive className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <h5 className="text-xs font-bold text-slate-900">{p.zeroStorage}</h5>
              <p className="text-[11px] text-slate-500 mt-0.5">{p.zeroStorageDesc}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <h5 className="text-xs font-bold text-slate-900">{p.gdpr}</h5>
              <p className="text-[11px] text-slate-500 mt-0.5">{p.gdprDesc}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
          >
            {p.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
