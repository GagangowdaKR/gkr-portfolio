export const lightColors = {
  // Brand
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#8b5cf6',
  accent: '#ec4899',

  // Light theme surface
  background: '#ffffff',
  backgroundLight: '#f8f9fa',
  border: '#e5e7eb',

  // Text
  text: '#1f2937',
  textLight: '#6b7280',

  // Status
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',

  // Extra neutrals for design flexibility
  black: '#000000',
  gray700: '#374151',
  gray600: '#4b5563',
  white: '#ffffff',
};

export const darkColors = {
  // Brand
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  secondary: '#8b5cf6',
  accent: '#ec4899',

  // Dark theme surface
  background: '#0b0b0c',
  backgroundLight: '#131316',
  border: '#232328',

  // Text
  text: '#f5f7fa',
  textLight: '#a0a6ae',

  // Status
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',

  // Extra neutrals for design flexibility
  black: '#000000',
  gray700: '#2a2a2e',
  gray600: '#3a3a40',
  white: '#ffffff',
};

// Default export for backwards compatibility (will be replaced by theme context)
export const Colors = darkColors;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Typography = {
  h1: {
    fontSize: 48,
    fontWeight: '700' as const,
    lineHeight: 56,
  },
  h2: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 44,
  },
  h3: {
    fontSize: 28,
    fontWeight: '600' as const,
    lineHeight: 36,
  },
  h4: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

