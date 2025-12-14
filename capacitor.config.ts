import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.de5031ed3cfa4723bbb09335708a08ff',
  appName: 'transitiontracker',
  webDir: 'dist',
  server: {
    url: 'https://de5031ed-3cfa-4723-bbb0-9335708a08ff.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
