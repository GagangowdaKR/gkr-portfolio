import { Platform } from 'react-native';

// Set this to true when you want to test against your local Spring Boot instance
const USE_LOCAL_BACKEND = false; 

// Localhost routing configuration
const LOCAL_API_URL = Platform.OS === 'web' 
  ? 'http://localhost:8080' 
  : 'http://10.0.2.2:8080'; // Maps to localhost for Android Emulators

// Render Test instance configuration
const TEST_API_URL = 'https://gkr-portfolio-backend-test.onrender.com';

// Fallback Production instance configuration
const PROD_API_URL = 'https://gkr-portfolio-backend.com'; 

export const CONFIG = {
  /**
   * Resolution Logic order:
   * 1. Check for build-time injected environment variables (EXPO_PUBLIC_API_URL)
   * 2. If in development environment (__DEV__):
   * - Check the USE_LOCAL_BACKEND flag to decide between localhost or Render Test
   * 3. Default back to Production configuration for standard builds
   */
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || (
    __DEV__ 
      ? (USE_LOCAL_BACKEND ? LOCAL_API_URL : TEST_API_URL)
      : TEST_API_URL // Falls back to Render Test URL for staging distributions
  ),
  
  ENDPOINTS: {
    DOWNLOAD_RESUME: '/api/gkr/resume/download',
    REQUEST_RESUME: '/api/gkr/resume/request',
  }
};