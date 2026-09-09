/**
 * FreeConvert AdSense & Monetization Configuration
 *
 * How to activate live Google AdSense:
 * 1. Set `enabled: true`
 * 2. Set `adClient: 'ca-pub-XXXXXXXXXXXXXXXX'` (your AdSense publisher ID from Hostinger domain approval)
 * 3. Fill in your ad slot IDs below
 */
export const ADS_CONFIG = {
  // Set to true once your Google AdSense account is approved
  enabled: false,

  // Your AdSense Publisher ID (e.g., 'ca-pub-1234567890123456')
  adClient: 'ca-pub-XXXXXXXXXXXXXXXX',

  slots: {
    // Top leaderboard banner (728x90 desktop / 320x50 mobile)
    topBanner: '1111111111',

    // Golden slot next to download button (highest click-through rate)
    downloadSuccessSlot: '2222222222',

    // In-page content banner
    contentBanner: '3333333333',
  },
};

