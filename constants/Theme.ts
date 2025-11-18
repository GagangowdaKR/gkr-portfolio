export const lightColors = {
  // Brand
  primary: '#4F46E5',         // Modern soft blue
  primaryDark: '#4338CA',     // Slightly deeper blue
  // secondary: '#6366F1',       // Indigo-blue accent
  secondary: 'rgba(72, 53, 216, 0.33)',
  accent: '#94A3FF',          // Light pastel blue (matches tags)

  // Light theme surface
  background: '#FFFFFF',
  backgroundLight: '#F7F8FC', // Soft off-white for cards
  border: 'rgba(72, 53, 216, 0.33)',

  // Text
  text: '#111827',      // Strong black-ish text
  textLight: '#4B5563', // Medium gray text

  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Extras
  black: '#000000',
  gray700: '#374151',
  gray600: '#4B5563',
  white: '#FFFFFF',
};


export const darkColors = {
  // Brand
  primary: '#D97706',        // Warm orange (matches your heading)
  primaryDark: '#B45309',    // Deeper orange
  // secondary: '#F59E0B',      // Secondary orange
  secondary: 'rgba(230, 106, 23, 0.18)',
  accent: '#FFB94F',         // Soft glowing orange accent

  // Dark theme surface
  background: '#0B0B0C',     // Same as your screenshot
  backgroundLight: '#161618',// Slightly lighter for cards
  border: 'rgba(230, 106, 23, 0.18)',

  // Text
  text: '#F3F4F6',           // Off-white
  textLight: '#A0A0A5',      // Grayish text

  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',

  // Extras
  black: '#000000',
  gray700: '#2A2A2E',
  gray600: '#3A3A40',
  white: '#FFFFFF',
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

