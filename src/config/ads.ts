/**
 * MyPdfTools AdSense & Monetization Configuration
 *
 * NOTE FOR ADSENSE REVIEW:
 * Keep in-page ad banners disabled (`enabled: false`) while the site is under review.
 * This prevents the policy violation "Google-served ads on screens without publisher-content".
 * The verification script in <head> remains active for Google site ownership and domain verification.
 */
export const ADS_CONFIG = {
  // Disabled during site approval review to comply with publisher-content guidelines
  enabled: false,

  // Your AdSense Publisher ID
  adClient: 'ca-pub-3502815676488440',

  slots: {
    // Top leaderboard banner (leave empty for Google Auto-Responsive placement)
    topBanner: '',

    // Golden slot next to download button
    downloadSuccessSlot: '',

    // In-page content banner
    contentBanner: '',
  },
};

