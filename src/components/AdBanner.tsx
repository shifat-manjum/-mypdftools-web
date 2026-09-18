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

  // Comply with Google AdSense: Never render empty mock ad placeholders
  return null;
};

