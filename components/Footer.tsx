import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, Typography, lightColors, darkColors } from '@/constants/Theme';
import { useTheme } from '@/contexts/ThemeContext';
import { ApiService } from '../services/api'; 

export default function Footer() {
  const { isDark } = useTheme();
  const Colors = isDark ? darkColors : lightColors;
  const [appVersion, setAppVersion] = useState('Fetching build data...');

  useEffect(() => {
    let isMounted = true;

    const fetchBuildMetadata = async () => {
      const version = await ApiService.getSystemVersion();
      if (isMounted) {
        setAppVersion(version);
      }
    };

    // Delay execution slightly to ensure local asset images finish loading first
    const handle = setTimeout(() => {
      fetchBuildMetadata();
    }, 1200);

    return () => { 
      isMounted = false;
      clearTimeout(handle); // Clean up the timer if component unmounts
    };
  }, []);

  return (
    <View style={[styles.footer, { borderTopColor: Colors.border }]}>
      {/* Primary Context Header Data Row Line */}
      <Text style={[styles.footerText, { color: Colors.textLight }]}>
        © 2026 <Text style={[styles.title, { color: Colors.primary }]}>Gagan Gowda K R</Text>. All Rights Reserved.
      </Text>
      
      {/* Dynamic System Version Subheader Line */}
      <Text style={[styles.versionText, { color: Colors.primaryDark }]}>
        Version : {appVersion}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  footerText: {
    ...Typography.bodySmall,
    fontSize: 14,
    letterSpacing: 0.2,
    marginBottom: 4, // Creates a balanced gap separator before the version display line
  },
  title: {
    fontSize: 14, 
    fontWeight: '600',
  },
  versionText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 3,
    opacity: 0.5,
  }
});