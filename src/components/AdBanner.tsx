import React, { useEffect } from 'react';
import { ADS_CONFIG } from '../config/ads';

interface AdBannerProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'responsive';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId,
  format = 'responsive',
  className = '',
}) => {
  useEffect(() => {
    if (ADS_CONFIG.enabled && typeof window !== 'undefined') {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense push error:', e);
      }
    }
  }, []);

  // When live AdSense is enabled
  if (ADS_CONFIG.enabled) {
    return (
      <div className={`my-4 flex justify-center overflow-hidden ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADS_CONFIG.adClient}
          data-ad-slot={slotId || ADS_CONFIG.slots.topBanner}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Visual placeholder showing monetization zone
  return (
    <div
      className={`my-4 border border-dashed border-slate-300 bg-slate-50/70 rounded-xl p-3 flex flex-col items-center justify-center text-center transition-all ${className}`}
    >
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>Advertisement Space</span>
      </div>
      <p className="text-[11px] text-slate-500 mt-0.5">
        Google AdSense slot ({format === 'horizontal' ? '728×90' : 'Responsive'})
      </p>
    </div>
  );
};

