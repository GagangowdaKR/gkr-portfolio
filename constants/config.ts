import { Platform } from 'react-native';

/**
 * Production and Development API configurations.
 * Expo looks for EXPO_PUBLIC_ prefixed environment variables at build time.
 */
const DEV_API_URL = Platform.OS === 'web' 
  ? 'http://localhost:8080' 
  : 'http://10.0.2.2:8080'; // 10.0.2.2 maps to localhost for Android Emulators

const PROD_API_URL = 'https://your-production-backend-domain.com'; // Update this when you host Spring Boot

export const CONFIG = {
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || (__DEV__ ? DEV_API_URL : PROD_API_URL),
  ENDPOINTS: {
    DOWNLOAD_RESUME: '/api/gkr/resume/download',
    REQUEST_RESUME: '/api/gkr/resume/request',
    // Future endpoints can easily be managed here:
    // PROJECTS: '/api/gkr/projects',
    // EXPERIENCE: '/api/gkr/experience',
  }
};
