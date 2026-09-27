/**
 * FreeConvert AdSense & Monetization Configuration
 *
 * How to activate live Google AdSense:
 * 1. Set `enabled: true`
 * 2. Set `adClient: 'ca-pub-XXXXXXXXXXXXXXXX'` (your AdSense publisher ID from Hostinger domain approval)
 * 3. Fill in your ad slot IDs below
 */
export const ADS_CONFIG = {
  // Activated Google AdSense
  enabled: true,

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

