
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rmu.busnavigator',
  appName: 'RMU Bus Navigator',
  webDir: 'dist',
  server: {
    url: 'https://4cef032f-8ca7-447d-b9c2-0deffb5abbec.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#3b82f6",
      showSpinner: false
    }
  }
};

export default config;
