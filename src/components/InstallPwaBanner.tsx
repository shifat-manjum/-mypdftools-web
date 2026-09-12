import React, { useState, useEffect } from 'react';
import { Download, Bookmark, X, Smartphone, Check, Share, PlusSquare } from 'lucide-react';
import { Language } from '../i18n/translations';

interface InstallPwaBannerProps {
  language: Language;
}

export const InstallPwaBanner: React.FC<InstallPwaBannerProps> = ({ language }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(true);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);
  const [bookmarkCopied, setBookmarkCopied] = useState<boolean>(false);

  useEffect(() => {
    // Check if previously dismissed in last 7 days
    const dismissedAt = localStorage.getItem('mypdftools_pwa_dismissed');
    if (dismissedAt) {
      const diffDays = (Date.now() - Number(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (diffDays < 7) {
        return; // stay hidden
      }
    }

    // Check if already running standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Show after 3 seconds of browsing
    const timer = setTimeout(() => {
      setIsDismissed(false);
    }, 3000);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsDismissed(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsDismissed(true);
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIos) {
      setShowIosGuide(true);
    } else {
      // Prompt bookmarking if browser doesn't support direct install
      handleBookmark();
    }
  };

  const handleBookmark = () => {
    setBookmarkCopied(true);
    setTimeout(() => setBookmarkCopied(false), 4000);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('mypdftools_pwa_dismissed', Date.now().toString());
  };

  if (isDismissed || isInstalled) return null;

  const content = {
    it: {
      title: 'Installa MyPdfTools',
      desc: 'Accesso 100% offline e privato direttamente dal desktop o telefono.',
      installBtn: 'Installa App',
      bookmarkBtn: 'Aggiungi ai Preferiti',
      bookmarkNotice: 'Premi Ctrl + D (o Cmd + D su Mac) per salvare MyPdfTools!',
      iosTitle: 'Come installare su iPhone/iPad:',
      iosStep1: 'Tocca l\'icona Condividi in basso in Safari',
      iosStep2: 'Scorri e tocca "Aggiungi alla schermata Home"',
    },
    de: {
      title: 'MyPdfTools installieren',
      desc: '100% offline und privater Schnellzugriff direkt auf Desktop oder Smartphone.',
      installBtn: 'App installieren',
      bookmarkBtn: 'Als Lesezeichen',
      bookmarkNotice: 'Drücke Strg + D (oder Cmd + D am Mac) zum Speichern!',
      iosTitle: 'So installierst du auf iPhone/iPad:',
      iosStep1: 'Tippe auf das Teilen-Symbol unten in Safari',
      iosStep2: 'Wähle "Zum Home-Bildschirm"',
    },
    en: {
      title: 'Install MyPdfTools',
      desc: '100% offline & private desktop/mobile app. Zero uploads guaranteed.',
      installBtn: 'Install App',
      bookmarkBtn: 'Bookmark Tool',
      bookmarkNotice: 'Press Ctrl + D (or Cmd + D on Mac) to bookmark MyPdfTools!',
      iosTitle: 'How to install on iPhone/iPad:',
      iosStep1: 'Tap the Share icon at the bottom of Safari',
      iosStep2: 'Scroll down and tap "Add to Home Screen"',
    },
  }[language] || {
    title: 'Install MyPdfTools',
    desc: '100% offline & private app. Zero uploads guaranteed.',
    installBtn: 'Install App',
    bookmarkBtn: 'Bookmark Tool',
    bookmarkNotice: 'Press Ctrl + D (or Cmd + D on Mac) to bookmark!',
    iosTitle: 'How to install on iPhone/iPad:',
    iosStep1: 'Tap the Share icon at the bottom of Safari',
    iosStep2: 'Scroll down and tap "Add to Home Screen"',
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl p-4 shadow-2xl ring-1 ring-white/10 text-white">
        {/* Main Banner Body */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 flex-shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{content.title}</h4>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Offline
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">{content.desc}</p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-3.5 flex items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={handleInstallClick}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-sm shadow-emerald-500/20 active:scale-98"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{content.installBtn}</span>
          </button>

          <button
            onClick={handleBookmark}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
            title="Bookmark this website"
          >
            {bookmarkCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Bookmark className="w-3.5 h-3.5" />
            )}
            <span>{content.bookmarkBtn}</span>
          </button>
        </div>

        {/* Bookmark Feedback Alert */}
        {bookmarkCopied && (
          <div className="mt-2.5 p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-[11px] text-emerald-300 text-center font-medium animate-in fade-in duration-200">
            {content.bookmarkNotice}
          </div>
        )}

        {/* iOS Step Guide Modal */}
        {showIosGuide && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>{content.iosTitle}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">1</span>
              <span>{content.iosStep1}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">2</span>
              <span>{content.iosStep2}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

