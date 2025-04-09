
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ceb88f2e607142e9a863ff9bd94ea207',
  appName: 'LeanFuel – Weight Loss Meal Planner',
  webDir: 'dist',
  server: {
    url: 'https://ceb88f2e-6071-42e9-a863-ff9bd94ea207.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: false,
      androidSpinnerStyle: "large",
      spinnerColor: "#3BBAA1"
    }
  }
};

export default config;
